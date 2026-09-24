import { ArrowRight } from 'lucide-react';
import { Section } from '@/components/ui/Section';
import { Button } from '@/components/ui/Button';
import { ProductGrid } from '@/components/products/ProductGrid';
import { getBestSellers } from '@/data/products';

export function BestSellers() {
  const products = getBestSellers(4);

  return (
    <Section aria-labelledby="best-sellers-title" className="bg-warm-white/40">
      <div className="mb-8 flex flex-col items-start justify-between gap-4 sm:mb-10 sm:flex-row sm:items-end">
        <div className="max-w-xl">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-caramel">
            Les incontournables
          </p>
          <h2 id="best-sellers-title" className="mt-3 font-display text-3xl sm:text-4xl">
            Best-sellers Kaisen
          </h2>
          <p className="mt-3 text-sm text-espresso/65">
            Les cafés les plus appréciés de notre communauté.
          </p>
        </div>
        <Button
          to="/shop"
          variant="outline"
          rightIcon={<ArrowRight className="h-4 w-4" aria-hidden="true" />}
        >
          Voir la boutique
        </Button>
      </div>

      <ProductGrid products={products} />
    </Section>
  );
}