import { useEffect } from 'react';
import { Home, Search } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import { CoffeeCup } from '@/components/ui/CoffeeCup';

export default function NotFoundPage() {
  useEffect(() => {
    document.title = 'Page introuvable — Kaisen Coffee';
  }, []);

  return (
    <Container className="py-20">
      <div className="mx-auto max-w-lg text-center">
        <CoffeeCup size={120} className="mx-auto" />
        <p className="mt-6 font-display text-6xl font-bold text-espresso">404</p>
        <h1 className="mt-3 font-display text-2xl sm:text-3xl">
          Cette page s'est évaporée comme une tasse trop chaude.
        </h1>
        <p className="mt-4 text-sm text-espresso/65">
          La page que vous cherchez n'existe pas ou a été déplacée.
        </p>

        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Button
            to="/"
            variant="primary"
            size="lg"
            leftIcon={<Home className="h-4 w-4" aria-hidden="true" />}
          >
            Retour à l'accueil
          </Button>
          <Button
            to="/shop"
            variant="outline"
            size="lg"
            leftIcon={<Search className="h-4 w-4" aria-hidden="true" />}
          >
            Parcourir la boutique
          </Button>
        </div>
      </div>
    </Container>
  );
}