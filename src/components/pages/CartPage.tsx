import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ShoppingBag, Tag, X } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { EmptyState } from '@/components/ui/EmptyState';
import { CartLine } from '@/components/cart/CartLine';
import { ProductGrid } from '@/components/products/ProductGrid';
import { useCart } from '@/store/CartContext';
import { useUI } from '@/store/UIContext';
import { formatPrice } from '@/lib/format';
import { BRAND } from '@/lib/config';
import { PRODUCTS } from '@/data/products';
import { useState } from 'react';

export default function CartPage() {
  const {
    lines,
    subtotal,
    discount,
    shipping,
    total,
    promoCode,
    applyPromo,
    removePromo,
    freeShippingRemaining,
  } = useCart();
  const { pushToast } = useUI();
  const [promoInput, setPromoInput] = useState('');

  useEffect(() => {
    document.title = 'Panier — Kaisen Coffee';
  }, []);

  const recommended = PRODUCTS.filter((p) => !lines.some((l) => l.productId === p.id)).slice(0, 4);

  const handleApply = (e: React.FormEvent) => {
    e.preventDefault();
    const res = applyPromo(promoInput);
    pushToast(res.message, res.ok ? 'success' : 'error');
    if (res.ok) setPromoInput('');
  };

  if (lines.length === 0) {
    return (
      <Container className="py-16">
        <h1 className="font-display text-3xl sm:text-4xl">Votre panier</h1>
        <div className="mt-10">
          <EmptyState
            icon={<ShoppingBag className="h-6 w-6" aria-hidden="true" />}
            title="Votre panier est vide"
            description="Découvrez nos cafés torréfiés en petits lots, livrés partout en Haïti."
            action={<Button to="/shop" variant="primary">Découvrir la boutique</Button>}
          />
        </div>
      </Container>
    );
  }

  return (
    <Container className="py-10 sm:py-14">
      <h1 className="font-display text-3xl sm:text-4xl">Votre panier</h1>
      <p className="mt-2 text-sm text-espresso/60">
        {lines.length} ligne{lines.length > 1 ? 's' : ''} · sous-total {formatPrice(subtotal)}
      </p>

      <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_380px] lg:gap-12">
        <section>
          <ul className="divide-y divide-espresso/10 border-y border-espresso/10">
            {lines.map((l) => (
              <li key={`${l.productId}-${l.variantId}`} className="py-5">
                <CartLine line={l} variant="page" />
              </li>
            ))}
          </ul>

          {freeShippingRemaining > 0 && (
            <p className="mt-4 rounded-xl bg-beige/60 px-4 py-3 text-xs text-espresso/80">
              Ajoutez <strong>{formatPrice(freeShippingRemaining)}</strong> pour bénéficier de la
              livraison offerte.
            </p>
          )}

          <Link
            to="/shop"
            className="mt-6 inline-flex items-center gap-1 text-sm text-espresso/70 underline-offset-4 hover:text-caramel hover:underline"
          >
            ← Continuer mes achats
          </Link>
        </section>

        <aside className="sticky top-24 h-fit rounded-2xl border border-espresso/10 bg-warm-white/85 p-6 backdrop-blur-xl">
          <h2 className="font-display text-lg font-bold text-espresso">Récapitulatif</h2>

          {/* Promo */}
          <form onSubmit={handleApply} className="mt-5">
            <label htmlFor="promo" className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-espresso/60">
              Code promo
            </label>
            {promoCode ? (
              <div className="flex items-center justify-between rounded-xl border border-caramel/40 bg-caramel/10 px-3 py-2">
                <span className="inline-flex items-center gap-2 text-sm text-caramel">
                  <Tag className="h-4 w-4" aria-hidden="true" /> {promoCode}
                </span>
                <button
                  type="button"
                  onClick={() => {
                    removePromo();
                    pushToast('Code promo retiré', 'info');
                  }}
                  aria-label="Retirer le code promo"
                  className="grid h-7 w-7 place-items-center rounded-full text-caramel/70 hover:bg-caramel/20"
                >
                  <X className="h-3.5 w-3.5" aria-hidden="true" />
                </button>
              </div>
            ) : (
              <div className="flex gap-2">
                <Input
                  id="promo"
                  placeholder="KAISEN10"
                  value={promoInput}
                  onChange={(e) => setPromoInput(e.target.value)}
                  className="!h-12"
                />
                <Button type="submit" variant="outline" size="md">Appliquer</Button>
              </div>
            )}
            <p className="mt-2 text-[11px] text-espresso/45">
              Démo : {Object.keys(BRAND.promo.codes).join(', ')}
            </p>
          </form>

          {/* Totals */}
          <dl className="mt-6 space-y-2 border-t border-espresso/10 pt-5 text-sm">
            <div className="flex items-center justify-between text-espresso/75">
              <dt>Sous-total</dt>
              <dd>{formatPrice(subtotal)}</dd>
            </div>
            {discount > 0 && (
              <div className="flex items-center justify-between text-caramel">
                <dt>Réduction</dt>
                <dd>− {formatPrice(discount)}</dd>
              </div>
            )}
            <div className="flex items-center justify-between text-espresso/75">
              <dt>Livraison</dt>
              <dd>{shipping === 0 ? 'Offerte' : formatPrice(shipping)}</dd>
            </div>
            <div className="mt-3 flex items-baseline justify-between border-t border-espresso/10 pt-3">
              <dt className="font-display text-base font-bold text-espresso">Total</dt>
              <dd className="font-display text-2xl font-bold text-espresso">{formatPrice(total)}</dd>
            </div>
          </dl>

          <Button
            to="/checkout"
            variant="primary"
            size="lg"
            fullWidth
            className="mt-6"
            rightIcon={<ArrowRight className="h-4 w-4" aria-hidden="true" />}
          >
            Passer commande
          </Button>
        </aside>
      </div>

      {recommended.length > 0 && (
        <section className="mt-20">
          <h2 className="font-display text-2xl sm:text-3xl">Complétez votre rituel</h2>
          <div className="mt-6">
            <ProductGrid products={recommended} />
          </div>
        </section>
      )}
    </Container>
  );
}