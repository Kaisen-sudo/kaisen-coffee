import { ArrowRight } from 'lucide-react';
import { Section } from '@/components/ui/Section';
import { Button } from '@/components/ui/Button';
import { CoffeeCup } from '@/components/ui/CoffeeCup';

export function FinalCTA() {
  return (
    <Section aria-labelledby="final-cta-title">
      <div className="relative overflow-hidden rounded-3xl border border-espresso/8 bg-warm-white/80 p-8 text-center shadow-soft backdrop-blur-xl sm:p-12 lg:p-16">
        <div className="mx-auto flex max-w-2xl flex-col items-center">
          <CoffeeCup size={88} />
          <p className="mt-4 text-xs font-semibold uppercase tracking-[0.18em] text-caramel">
            Prêt à passer à table ?
          </p>
          <h2 id="final-cta-title" className="mt-3 font-display text-3xl sm:text-4xl">
            Trouvez votre café signature.
          </h2>
          <p className="mt-4 max-w-md text-sm text-espresso/70">
            Huit cafés, un seul objectif : votre meilleure tasse.
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Button
              to="/shop"
              variant="primary"
              size="lg"
              rightIcon={<ArrowRight className="h-4 w-4" aria-hidden="true" />}
            >
              Explorer la boutique
            </Button>
            <Button to="/subscription" variant="outline" size="lg">
              Voir l'abonnement
            </Button>
          </div>
        </div>
      </div>
    </Section>
  );
}