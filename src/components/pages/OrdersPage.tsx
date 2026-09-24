import { useEffect } from 'react';
import { Package } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { EmptyState } from '@/components/ui/EmptyState';
import { Button } from '@/components/ui/Button';

export default function OrdersPage() {
  useEffect(() => {
    document.title = 'Mes commandes — Kaisen Coffee';
  }, []);

  return (
    <Container className="py-10 sm:py-14">
      <header>
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-caramel">Compte</p>
        <h1 className="mt-2 font-display text-3xl sm:text-4xl">Mes commandes</h1>
      </header>

      <div className="mt-10">
        <EmptyState
          icon={<Package className="h-6 w-6" aria-hidden="true" />}
          title="Aucune commande pour l'instant"
          description="Vos prochaines commandes apparaîtront ici, avec leur statut et leur suivi."
          action={<Button to="/shop" variant="primary">Découvrir la boutique</Button>}
        />
      </div>
    </Container>
  );
}