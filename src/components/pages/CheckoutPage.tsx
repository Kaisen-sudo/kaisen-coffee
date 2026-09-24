import { useEffect, useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Check, CreditCard, Lock, Truck } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { CheckoutSteps, type CheckoutStep } from '@/components/checkout/CheckoutSteps';
import { OrderSummary } from '@/components/checkout/OrderSummary';
import { useCart } from '@/store/CartContext';
import { useUI } from '@/store/UIContext';
import { formatPrice } from '@/lib/format';
import { BRAND } from '@/lib/config';
import { cn } from '@/lib/cn';
import type { Address, CustomerInfo, ShippingMethod } from '@/types';

const STEPS: CheckoutStep[] = [
  { id: 'info', label: 'Informations' },
  { id: 'address', label: 'Adresse' },
  { id: 'shipping', label: 'Livraison' },
  { id: 'payment', label: 'Paiement' },
  { id: 'confirm', label: 'Confirmation' },
];

const SHIPPING_METHODS: ShippingMethod[] = [
  {
    id: 'standard',
    label: 'Standard',
    description: '2 à 4 jours ouvrés',
    price: BRAND.shipping.standardFee,
    estimate: '2–4 jours',
  },
  {
    id: 'express',
    label: 'Express',
    description: '24 à 48 h à Port-au-Prince',
    price: BRAND.shipping.expressFee,
    estimate: '24–48 h',
  },
  {
    id: 'pickup',
    label: 'Retrait boutique',
    description: 'Disponible sous 2 h',
    price: 0,
    estimate: '2 h',
  },
];

const DEPARTMENTS = [
  'Ouest',
  'Nord',
  'Nord-Est',
  'Nord-Ouest',
  'Artibonite',
  'Centre',
  'Sud',
  'Sud-Est',
  'Grand\'Anse',
  'Nippes',
];

export default function CheckoutPage() {
  const navigate = useNavigate();
  const { lines, clear, shippingMethod, setShippingMethod, total, subtotal, shipping, discount } = useCart();
  const { pushToast } = useUI();
  const [step, setStep] = useState(0);

  const [customer, setCustomer] = useState<CustomerInfo>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
  });
  const [address, setAddress] = useState<Address>({
    line1: '',
    line2: '',
    city: '',
    department: DEPARTMENTS[0],
    postalCode: '',
    country: 'Haïti',
  });
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'moncash' | 'cod'>('card');

  useEffect(() => {
    document.title = 'Paiement — Kaisen Coffee';
  }, []);

  if (lines.length === 0) {
    return <Navigate to="/cart" replace />;
  }

  const next = () => setStep((s) => Math.min(STEPS.length - 1, s + 1));
  const prev = () => setStep((s) => Math.max(0, s - 1));

  const submitOrder = () => {
    // Simulate order creation — no real transaction.
    const orderId = `KC-${Date.now().toString(36).toUpperCase()}`;
    const snapshot = {
      id: orderId,
      createdAt: new Date().toISOString(),
      lines,
      subtotal,
      shipping,
      discount,
      total,
      promoCode: undefined,
      shippingMethod,
      customer,
      address,
    };

    try {
      sessionStorage.setItem('kaisen.lastOrder', JSON.stringify(snapshot));
    } catch {
      /* ignore */
    }

    clear();
    pushToast('Commande confirmée', 'success');
    navigate('/order-success');
  };

  const canContinueInfo =
    customer.firstName.trim() && customer.lastName.trim() && customer.email.trim() && customer.phone.trim();
  const canContinueAddress = address.line1.trim() && address.city.trim();

  return (
    <Container className="py-10 sm:py-14">
      <h1 className="font-display text-3xl sm:text-4xl">Paiement</h1>

      <div className="mt-8">
        <CheckoutSteps steps={STEPS} current={step} />
      </div>

      <div className="mt-10 grid gap-10 lg:grid-cols-[1fr_380px] lg:gap-12">
        <div>
          {step === 0 && (
            <section aria-labelledby="step-info">
              <h2 id="step-info" className="font-display text-2xl">Informations client</h2>
              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                <Input
                  label="Prénom"
                  name="firstName"
                  autoComplete="given-name"
                  required
                  value={customer.firstName}
                  onChange={(e) => setCustomer({ ...customer, firstName: e.target.value })}
                />
                <Input
                  label="Nom"
                  name="lastName"
                  autoComplete="family-name"
                  required
                  value={customer.lastName}
                  onChange={(e) => setCustomer({ ...customer, lastName: e.target.value })}
                />
                <Input
                  label="Email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={customer.email}
                  onChange={(e) => setCustomer({ ...customer, email: e.target.value })}
                />
                <Input
                  label="Téléphone"
                  name="phone"
                  type="tel"
                  autoComplete="tel"
                  required
                  value={customer.phone}
                  onChange={(e) => setCustomer({ ...customer, phone: e.target.value })}
                />
              </div>

              <div className="mt-8 flex justify-end">
                <Button
                  variant="primary"
                  size="lg"
                  disabled={!canContinueInfo}
                  onClick={next}
                  rightIcon={<ArrowRight className="h-4 w-4" aria-hidden="true" />}
                >
                  Continuer
                </Button>
              </div>
            </section>
          )}

          {step === 1 && (
            <section aria-labelledby="step-address">
              <h2 id="step-address" className="font-display text-2xl">Adresse de livraison</h2>
              <div className="mt-6 grid gap-4">
                <Input
                  label="Adresse"
                  name="line1"
                  autoComplete="address-line1"
                  required
                  value={address.line1}
                  onChange={(e) => setAddress({ ...address, line1: e.target.value })}
                />
                <Input
                  label="Complément (optionnel)"
                  name="line2"
                  autoComplete="address-line2"
                  value={address.line2}
                  onChange={(e) => setAddress({ ...address, line2: e.target.value })}
                />
                <div className="grid gap-4 sm:grid-cols-2">
                  <Input
                    label="Ville"
                    name="city"
                    autoComplete="address-level2"
                    required
                    value={address.city}
                    onChange={(e) => setAddress({ ...address, city: e.target.value })}
                  />
                  <Select
                    label="Département"
                    value={address.department}
                    onChange={(e) => setAddress({ ...address, department: e.target.value })}
                  >
                    {DEPARTMENTS.map((d) => (
                      <option key={d} value={d}>{d}</option>
                    ))}
                  </Select>
                </div>
                <Input
                  label="Code postal (optionnel)"
                  name="postalCode"
                  autoComplete="postal-code"
                  value={address.postalCode}
                  onChange={(e) => setAddress({ ...address, postalCode: e.target.value })}
                />
              </div>

              <div className="mt-8 flex flex-wrap justify-between gap-3">
                <Button
                  variant="outline"
                  size="lg"
                  onClick={prev}
                  leftIcon={<ArrowLeft className="h-4 w-4" aria-hidden="true" />}
                >
                  Retour
                </Button>
                <Button
                  variant="primary"
                  size="lg"
                  disabled={!canContinueAddress}
                  onClick={next}
                  rightIcon={<ArrowRight className="h-4 w-4" aria-hidden="true" />}
                >
                  Continuer
                </Button>
              </div>
            </section>
          )}

          {step === 2 && (
            <section aria-labelledby="step-shipping">
              <h2 id="step-shipping" className="font-display text-2xl">Mode de livraison</h2>
              <ul className="mt-6 grid gap-3">
                {SHIPPING_METHODS.map((m) => {
                  const selected = shippingMethod === m.id;
                  const isFree = subtotal >= BRAND.shipping.freeThreshold || m.id === 'pickup';
                  const price = isFree ? 0 : m.price;
                  return (
                    <li key={m.id}>
                      <label
                        className={cn(
                          'flex cursor-pointer items-start gap-4 rounded-2xl border p-4 transition-all',
                          selected
                            ? 'border-espresso bg-espresso/5'
                            : 'border-espresso/12 bg-warm-white hover:border-espresso/30',
                        )}
                      >
                        <input
                          type="radio"
                          name="shipping"
                          checked={selected}
                          onChange={() => setShippingMethod(m.id)}
                          className="mt-1 h-4 w-4 accent-caramel"
                        />
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <span className="font-medium text-espresso">{m.label}</span>
                            <span className="text-sm font-medium text-espresso">
                              {price === 0 ? 'Offerte' : formatPrice(price)}
                            </span>
                          </div>
                          <p className="mt-1 text-xs text-espresso/60">
                            {m.description} · {m.estimate}
                          </p>
                        </div>
                      </label>
                    </li>
                  );
                })}
              </ul>

              <div className="mt-8 flex flex-wrap justify-between gap-3">
                <Button variant="outline" size="lg" onClick={prev} leftIcon={<ArrowLeft className="h-4 w-4" aria-hidden="true" />}>
                  Retour
                </Button>
                <Button variant="primary" size="lg" onClick={next} rightIcon={<ArrowRight className="h-4 w-4" aria-hidden="true" />}>
                  Continuer
                </Button>
              </div>
            </section>
          )}

          {step === 3 && (
            <section aria-labelledby="step-payment">
              <h2 id="step-payment" className="font-display text-2xl">Paiement</h2>
              <p className="mt-2 inline-flex items-center gap-2 text-xs text-espresso/60">
                <Lock className="h-3.5 w-3.5" aria-hidden="true" />
                Démonstration — aucune transaction réelle n'est effectuée.
              </p>

              <ul className="mt-6 grid gap-3">
                {[
                  { id: 'card' as const, label: 'Carte bancaire', desc: 'Visa, Mastercard, Amex', icon: CreditCard },
                  { id: 'moncash' as const, label: 'MonCash', desc: 'Paiement mobile', icon: Truck },
                  { id: 'cod' as const, label: 'Paiement à la livraison', desc: 'Espèces à réception', icon: Truck },
                ].map(({ id, label, desc, icon: Icon }) => {
                  const selected = paymentMethod === id;
                  return (
                    <li key={id}>
                      <label
                        className={cn(
                          'flex cursor-pointer items-start gap-4 rounded-2xl border p-4 transition-all',
                          selected
                            ? 'border-espresso bg-espresso/5'
                            : 'border-espresso/12 bg-warm-white hover:border-espresso/30',
                        )}
                      >
                        <input
                          type="radio"
                          name="payment"
                          checked={selected}
                          onChange={() => setPaymentMethod(id)}
                          className="mt-1 h-4 w-4 accent-caramel"
                        />
                        <Icon className="mt-0.5 h-5 w-5 text-caramel" aria-hidden="true" />
                        <div className="flex-1">
                          <span className="font-medium text-espresso">{label}</span>
                          <p className="mt-0.5 text-xs text-espresso/60">{desc}</p>
                        </div>
                      </label>
                    </li>
                  );
                })}
              </ul>

              {paymentMethod === 'card' && (
                <div className="mt-6 grid gap-4 rounded-2xl border border-espresso/12 bg-warm-white/70 p-5">
                  <Input label="Numéro de carte" placeholder="0000 0000 0000 0000" inputMode="numeric" autoComplete="cc-number" />
                  <div className="grid grid-cols-2 gap-4">
                    <Input label="Expiration" placeholder="MM / AA" autoComplete="cc-exp" />
                    <Input label="CVC" placeholder="123" inputMode="numeric" autoComplete="cc-csc" />
                  </div>
                  <Input label="Nom sur la carte" autoComplete="cc-name" />
                </div>
              )}

              <div className="mt-8 flex flex-wrap justify-between gap-3">
                <Button variant="outline" size="lg" onClick={prev} leftIcon={<ArrowLeft className="h-4 w-4" aria-hidden="true" />}>
                  Retour
                </Button>
                <Button variant="primary" size="lg" onClick={next} rightIcon={<ArrowRight className="h-4 w-4" aria-hidden="true" />}>
                  Vérifier ma commande
                </Button>
              </div>
            </section>
          )}

          {step === 4 && (
            <section aria-labelledby="step-confirm">
              <h2 id="step-confirm" className="font-display text-2xl">Confirmer la commande</h2>

              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                <div className="rounded-2xl border border-espresso/10 bg-warm-white/70 p-5">
                  <p className="text-xs font-semibold uppercase tracking-wider text-espresso/55">
                    Livré à
                  </p>
                  <p className="mt-2 text-sm text-espresso">
                    {customer.firstName} {customer.lastName}
                    <br />
                    {address.line1}
                    {address.line2 ? `, ${address.line2}` : ''}
                    <br />
                    {address.city}, {address.department}
                    <br />
                    {customer.email} · {customer.phone}
                  </p>
                </div>
                <div className="rounded-2xl border border-espresso/10 bg-warm-white/70 p-5">
                  <p className="text-xs font-semibold uppercase tracking-wider text-espresso/55">
                    Mode
                  </p>
                  <p className="mt-2 text-sm text-espresso">
                    {SHIPPING_METHODS.find((m) => m.id === shippingMethod)?.label}
                    <br />
                    {paymentMethod === 'card'
                      ? 'Carte bancaire'
                      : paymentMethod === 'moncash'
                        ? 'MonCash'
                        : 'Paiement à la livraison'}
                  </p>
                </div>
              </div>

              <div className="mt-8 flex flex-wrap justify-between gap-3">
                <Button variant="outline" size="lg" onClick={prev} leftIcon={<ArrowLeft className="h-4 w-4" aria-hidden="true" />}>
                  Retour
                </Button>
                <Button
                  variant="accent"
                  size="lg"
                  onClick={submitOrder}
                  leftIcon={<Check className="h-4 w-4" aria-hidden="true" />}
                >
                  Confirmer et payer {formatPrice(total)}
                </Button>
              </div>
            </section>
          )}
        </div>

        <OrderSummary className="sticky top-24 h-fit" />
      </div>
    </Container>
  );
}