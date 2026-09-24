import { ArrowRight, Check } from 'lucide-react';
import { Section } from '@/components/ui/Section';
import { Button } from '@/components/ui/Button';

const PERKS = [
  'Choisissez votre fréquence : 2, 4 ou 8 semaines.',
  'Sélectionnez vos cafés préférés.',
  'Pause et annulation libres à tout moment.',
  'Livraison offerte sur chaque envoi.',
];

export function Subscription() {
  return (
    <Section aria-labelledby="subscription-title">
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-coffee via-espresso to-[#160f0c] p-8 text-cream shadow-deep sm:p-12 lg:p-16">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-40 right-[-10%] h-96 w-96 rounded-full bg-gold/15 blur-3xl"
        />

        <div className="relative grid gap-10 lg:grid-cols-[1.3fr_1fr] lg:items-center">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gold">
              Abonnement Kaisen
            </p>
            <h2
              id="subscription-title"
              className="mt-3 font-display text-3xl text-cream sm:text-4xl lg:text-5xl"
            >
              Votre café,{' '}
              <em className="font-medium italic text-gold">chaque mois.</em>
            </h2>
            <p className="mt-5 max-w-xl text-[15px] leading-relaxed text-cream/80">
              Recevez une sélection fraîchement torréfiée, directement chez vous. Aucun
              engagement, aucune surprise — juste du bon café.
            </p>

            <ul className="mt-6 space-y-2 text-sm text-cream/85">
              {PERKS.map((p) => (
                <li key={p} className="flex items-start gap-2">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-gold" aria-hidden="true" />
                  {p}
                </li>
              ))}
            </ul>
          </div>

          <div className="relative">
            <div className="rounded-2xl border border-white/12 bg-white/[0.06] p-6 backdrop-blur-xl">
              <p className="text-xs uppercase tracking-[0.18em] text-gold">À partir de</p>
              <p className="mt-2 font-display text-4xl font-bold text-cream">2 500 G</p>
              <p className="text-sm text-cream/65">par mois · livraison incluse</p>
              <Button
                to="/subscription"
                variant="accent"
                size="lg"
                fullWidth
                className="mt-6"
                rightIcon={<ArrowRight className="h-4 w-4" aria-hidden="true" />}
              >
                Découvrir les offres
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}