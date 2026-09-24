import type { Product } from '@/types';
import { cn } from '@/lib/cn';
import { ProductCard } from './ProductCard';

interface ProductGridProps {
  products: Product[];
  className?: string;
  columns?: 3 | 4;
}

export function ProductGrid({ products, className, columns = 4 }: ProductGridProps) {
  return (
    <div
      className={cn(
        'grid gap-4 sm:gap-5',
        columns === 4
          ? 'grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'
          : 'grid-cols-1 xs:grid-cols-2 md:grid-cols-3',
        className,
      )}
    >
      {products.map((p, i) => (
        <ProductCard key={p.id} product={p} priority={i < 4} />
      ))}
    </div>
  );
}