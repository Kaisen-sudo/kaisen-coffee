import { Link } from 'react-router-dom';
import { Heart, Plus } from 'lucide-react';
import type { Product } from '@/types';
import { cn } from '@/lib/cn';
import { formatPrice } from '@/lib/format';
import { Badge, type BadgeTone } from '@/components/ui/Badge';
import { Rating } from '@/components/ui/Rating';
import { useCart } from '@/store/CartContext';
import { useWishlist } from '@/store/WishlistContext';
import { useUI } from '@/store/UIContext';

const badgeToneMap: Record<NonNullable<Product['badge']>, { tone: BadgeTone; label: string }> = {
  'best-seller': { tone: 'best', label: 'Best Seller' },
  new: { tone: 'new', label: 'Nouveau' },
  premium: { tone: 'premium', label: 'Premium' },
  reserve: { tone: 'reserve', label: 'Reserve' },
  sale: { tone: 'sale', label: 'Promo' },
};

interface ProductCardProps {
  product: Product;
  className?: string;
  priority?: boolean;
}

export function ProductCard({ product, className, priority = false }: ProductCardProps) {
  const { addItem } = useCart();
  const { has, toggle } = useWishlist();
  const { pushToast, openCart } = useUI();

  const inWishlist = has(product.id);
  const [primary] = product.images;
  const badge = product.badge ? badgeToneMap[product.badge] : null;

  const handleQuickAdd = () => {
    const variant = product.variants[0];
    if (!variant || !product.available) return;
    addItem(product, variant, 1);
    pushToast(`${product.name} ajouté au panier`, 'success');
    openCart();
  };

  const handleWishlist = () => {
    toggle(product);
  };

  return (
    <article
      className={cn(
        'group relative flex flex-col overflow-hidden rounded-2xl border border-espresso/8 bg-warm-white shadow-soft transition-all duration-400 ease-premium hover:-translate-y-1.5 hover:border-caramel/30 hover:shadow-deep',
        className,
      )}
    >
      <Link to={`/product/${product.slug}`} className="relative block aspect-[4/5] overflow-hidden bg-beige">
        <img
          src={primary.src}
          alt={primary.alt}
          loading={priority ? 'eager' : 'lazy'}
          className="h-full w-full object-cover transition-transform duration-700 ease-premium group-hover:scale-[1.04]"
        />

        {badge && (
          <div className="absolute left-3 top-3 flex flex-wrap gap-1.5">
            <Badge tone={badge.tone}>{badge.label}</Badge>
          </div>
        )}

        {!product.available && (
          <div className="absolute inset-0 grid place-items-center bg-espresso/55 backdrop-blur-sm">
            <span className="rounded-full bg-cream/95 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-espresso">
              Épuisé
            </span>
          </div>
        )}
      </Link>

      <button
        type="button"
        onClick={handleWishlist}
        aria-label={inWishlist ? 'Retirer des favoris' : 'Ajouter aux favoris'}
        aria-pressed={inWishlist}
        className={cn(
          'absolute right-3 top-3 grid h-10 w-10 place-items-center rounded-full border border-white/60 backdrop-blur-xl transition-all duration-300',
          inWishlist
            ? 'bg-caramel text-white opacity-100'
            : 'bg-white/70 text-espresso opacity-0 group-hover:opacity-100 focus-visible:opacity-100',
        )}
      >
        <Heart
          aria-hidden="true"
          className={cn('h-4 w-4', inWishlist && 'fill-current')}
        />
      </button>

      <button
        type="button"
        onClick={handleQuickAdd}
        disabled={!product.available}
        className="absolute bottom-3 left-3 right-3 hidden items-center justify-center gap-2 rounded-full border border-white/20 bg-espresso/70 py-2.5 text-sm font-medium text-cream backdrop-blur-xl transition-all duration-300 hover:bg-espresso/85 disabled:opacity-40 sm:flex sm:translate-y-3 sm:opacity-0 sm:group-hover:translate-y-0 sm:group-hover:opacity-100"
      >
        <Plus className="h-4 w-4" aria-hidden="true" /> Ajout rapide
      </button>

      <div className="flex flex-1 flex-col gap-1 p-4 sm:p-5">
        <span className="text-[10px] font-semibold uppercase tracking-[0.14em] text-caramel">
          {product.origin}
        </span>
        <Link to={`/product/${product.slug}`} className="block">
          <h3 className="font-display text-base font-bold leading-snug text-espresso sm:text-lg">
            {product.name}
          </h3>
        </Link>
        <p className="line-clamp-1 text-xs text-espresso/60">{product.notes.join(' · ')}</p>

        <div className="mt-2">
          <Rating value={product.rating} reviews={product.reviewsCount} />
        </div>

        <div className="mt-auto flex items-center justify-between gap-2 pt-3">
          <div className="flex items-baseline gap-1.5">
            <span className="font-display text-base font-bold text-espresso sm:text-lg">
              {formatPrice(product.price)}
            </span>
            {product.oldPrice && (
              <span className="text-xs text-espresso/40 line-through">
                {formatPrice(product.oldPrice)}
              </span>
            )}
          </div>

          <button
            type="button"
            onClick={handleQuickAdd}
            disabled={!product.available}
            aria-label="Ajouter au panier"
            className="grid h-9 w-9 place-items-center rounded-full bg-espresso text-cream transition-all duration-300 hover:bg-caramel disabled:opacity-40 sm:hidden"
          >
            <Plus className="h-4 w-4" aria-hidden="true" />
          </button>
        </div>
      </div>
    </article>
  );
}