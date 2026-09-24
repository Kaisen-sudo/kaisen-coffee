import { Award, Heart, Leaf, ShieldCheck } from 'lucide-react';
import { Section } from '@/components/ui/Section';

const REASONS = [
  {
    icon: Leaf,
    title: 'Origines traçables',
    text: 'Chaque café est identifié : producteur, région, altitude, procédé.',
  },
  {
    icon: Award,
    title: 'Torréfaction artisanale',
    text: 'En petits lots, chaque semaine, pour une fraîcheur maximale.',
  },
  {
    icon: ShieldCheck,
    title: 'Paiement sécurisé',
    text: 'Carte bancaire, MonCash, paiement à la livraison.',
  },
  {
    icon: Heart,
    title: 'Service humain',
    text: 'Une équipe joignable sur WhatsApp, qui connaît ses cafés.',
  },
];

export function WhyKaisen() {
  return (
    <Section aria-labelledby="why-title">
      <div className="mx-auto max-w-2xl text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-caramel">
          Pourquoi Kaisen
        </p>
        <h2 id="why-title" className="mt-3 font-display text-3xl sm:text-4xl">
          Quatre promesses, tenues.
        </h2>
      </div>

      <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {REASONS.map(({ icon: Icon, title, text }) => (
          <article
            key={title}
            className="rounded-2xl border border-espresso/8 bg-warm-white p-6 shadow-soft transition-all duration-400 hover:-translate-y-1 hover:shadow-deep"
          >
            <div className="grid h-11 w-11 place-items-center rounded-full bg-caramel/12 text-caramel">
              <Icon className="h-5 w-5" aria-hidden="true" />
            </div>
            <h3 className="mt-4 font-display text-lg font-bold text-espresso">{title}</h3>
            <p className="mt-2 text-sm text-espresso/70">{text}</p>
          </article>
        ))}
      </div>
    </Section>
  );
}