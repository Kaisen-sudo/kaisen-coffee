import { useEffect } from 'react';
import { Heart } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import { EmptyState } from '@/components/ui/EmptyState';
import { ProductGrid } from '@/components/products/ProductGrid';
import { useWishlist } from '@/store/WishlistContext';
import { PRODUCTS } from '@/data/products';

export default function WishlistPage() {
  const { ids } = useWishlist();

  useEffect(() => {
    document.title = 'Favoris — Kaisen Coffee';
  }, []);

  const products = PRODUCTS.filter((p) => ids.includes(p.id));

  return (
    <Container className="py-10 sm:py-14">
      <header>
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-caramel">Favoris</p>
        <h1 className="mt-2 font-display text-3xl sm:text-4xl">Vos cafés préférés</h1>
        <p className="mt-2 text-sm text-espresso/60">
          {products.length} produit{products.length !== 1 ? 's' : ''} enregistré
          {products.length !== 1 ? 's' : ''}
        </p>
      </header>

      <div className="mt-8">
        {products.length === 0 ? (
          <EmptyState
            icon={<Heart className="h-6 w-6" aria-hidden="true" />}
            title="Aucun favori pour l'instant"
            description="Enregistrez vos cafés préférés pour les retrouver facilement."
            action={<Button to="/shop" variant="primary">Explorer la boutique</Button>}
          />
        ) : (
          <ProductGrid products={products} />
        )}
      </div>
    </Container>
  );
}