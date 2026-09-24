import { useEffect, useState } from 'react';
import { Check, Coffee, Sparkles, Truck } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import { formatPrice } from '@/lib/format';
import { cn } from '@/lib/cn';
import { useUI } from '@/store/UIContext';

interface Plan {
  id: string;
  name: string;
  price: number;
  cadence: string;
  description: string;
  perks: string[];
  featured?: boolean;
}

const PLANS: Plan[] = [
  {
    id: 'decouverte',
    name: 'Découverte',
    price: 2500,
    cadence: 'par mois',
    description: 'Un café sélectionné par mois, pour explorer.',
    perks: ['1 café · 250 g', 'Frais chaque mois', 'Livraison offerte', 'Pause à tout moment'],
  },
  {
    id: 'signature',
    name: 'Signature',
    price: 4500,
    cadence: 'par mois',
    description: 'Deux cafés, dont un de notre gamme Reserve.',
    perks: [
      '2 cafés · 250 g chacun',
      '1 accès Reserve',
      'Livraison prioritaire',
      '−10 % sur la boutique',
      'Pause et annulation libres',
    ],
    featured: true,
  },
  {
    id: 'maison',
    name: 'Maison',
    price: 7900,
    cadence: 'par mois',
    description: 'Pour les foyers qui consomment régulièrement.',
    perks: [
      '3 cafés · 250 g chacun',
      '1 origine Reserve',
      'Livraison prioritaire',
      '−15 % sur la boutique',
      'Cadeau d\'anniversaire',
    ],
  },
];

export default function SubscriptionPage() {
  const [selected, setSelected] = useState('signature');
  const { pushToast } = useUI();

  useEffect(() => {
    document.title = 'Abonnement — Kaisen Coffee';
  }, []);

  return (
    <>
      <section className="relative overflow-hidden bg-espresso text-cream">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-40 right-[-10%] h-96 w-96 rounded-full bg-gold/15 blur-3xl"
        />
        <Container className="relative py-20 sm:py-24">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gold">
              Abonnement Kaisen
            </p>
            <h1 className="mt-3 font-display text-4xl text-cream sm:text-5xl">
              Votre café, chaque mois.
            </h1>
            <p className="mt-6 text-base text-cream/80 sm:text-lg">
              Choisissez votre formule, votre fréquence, vos cafés. Pause et annulation libres à
              tout moment.
            </p>
          </div>
        </Container>
      </section>

      <Container className="py-14 sm:py-20">
        <div className="grid gap-5 lg:grid-cols-3">
          {PLANS.map((plan) => {
            const isSelected = selected === plan.id;
            return (
              <article
                key={plan.id}
                className={cn(
                  'relative flex flex-col rounded-3xl border bg-warm-white p-6 shadow-soft transition-all duration-400 sm:p-8',
                  isSelected
                    ? 'border-caramel shadow-deep'
                    : 'border-espresso/10 hover:-translate-y-1 hover:shadow-deep',
                )}
              >
                {plan.featured && (
                  <span className="absolute -top-3 left-6 inline-flex items-center gap-1.5 rounded-full bg-caramel px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-white">
                    <Sparkles className="h-3 w-3" aria-hidden="true" /> Populaire
                  </span>
                )}

                <h2 className="font-display text-2xl font-bold text-espresso">{plan.name}</h2>
                <p className="mt-2 text-sm text-espresso/65">{plan.description}</p>

                <div className="mt-6 flex items-baseline gap-1">
                  <span className="font-display text-4xl font-bold text-espresso">
                    {formatPrice(plan.price)}
                  </span>
                  <span className="text-sm text-espresso/55">/ {plan.cadence}</span>
                </div>

                <ul className="mt-6 space-y-2 text-sm text-espresso/80">
                  {plan.perks.map((p) => (
                    <li key={p} className="flex items-start gap-2">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-caramel" aria-hidden="true" />
                      {p}
                    </li>
                  ))}
                </ul>

                <div className="mt-8">
                  <Button
                    variant={isSelected ? 'accent' : 'outline'}
                    fullWidth
                    onClick={() => {
                      setSelected(plan.id);
                      pushToast(`Formule « ${plan.name} » sélectionnée (démo)`, 'success');
                    }}
                  >
                    {isSelected ? 'Formule sélectionnée' : 'Choisir cette formule'}
                  </Button>
                </div>
              </article>
            );
          })}
        </div>

        <section className="mt-16 grid gap-4 sm:grid-cols-3">
          {[
            { icon: Truck, title: 'Livraison offerte', text: 'Sur chaque envoi, partout en Haïti.' },
            { icon: Coffee, title: 'Fraîcheur garantie', text: 'Torréfié dans les 7 jours précédant l\'envoi.' },
            { icon: Sparkles, title: 'Liberté totale', text: 'Pause, changement de formule et annulation en un clic.' },
          ].map(({ icon: Icon, title, text }) => (
            <div
              key={title}
              className="rounded-2xl border border-espresso/10 bg-warm-white/70 p-5 backdrop-blur-xl"
            >
              <div className="grid h-10 w-10 place-items-center rounded-full bg-caramel/12 text-caramel">
                <Icon className="h-5 w-5" aria-hidden="true" />
              </div>
              <h3 className="mt-3 font-display text-lg font-bold text-espresso">{title}</h3>
              <p className="mt-1 text-sm text-espresso/70">{text}</p>
            </div>
          ))}
        </section>
      </Container>
    </>
  );
}