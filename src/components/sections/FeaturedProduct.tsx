import { Check, Heart, ShoppingBag, Star } from 'lucide-react';
import { Section } from '@/components/ui/Section';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Rating } from '@/components/ui/Rating';
import { formatPrice } from '@/lib/format';
import { getFeaturedProducts } from '@/data/products';
import { useCart } from '@/store/CartContext';
import { useWishlist } from '@/store/WishlistContext';
import { useUI } from '@/store/UIContext';

export function FeaturedProduct() {
  const [product] = getFeaturedProducts();
  const { addItem } = useCart();
  const { has, toggle } = useWishlist();
  const { pushToast, openCart } = useUI();

  if (!product) return null;

  const inWishlist = has(product.id);
  const variant = product.variants[0];

  const handleAdd = () => {
    if (!variant) return;
    addItem(product, variant, 1);
    pushToast(`${product.name} ajouté au panier`, 'success');
    openCart();
  };

  return (
    <Section aria-labelledby="featured-title">
      <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
        <div className="relative">
          <div className="overflow-hidden rounded-3xl shadow-deep">
            <img
              src={product.images[0].src}
              alt={product.images[0].alt}
              loading="lazy"
              className="aspect-[4/5] w-full object-cover"
            />
          </div>
          <div className="absolute -bottom-5 left-5 hidden rounded-2xl border border-white/60 bg-warm-white/90 px-4 py-3 shadow-soft backdrop-blur-xl sm:block">
            <p className="text-xs uppercase tracking-wider text-espresso/50">Intensité</p>
            <p className="font-display text-2xl font-bold text-espresso">
              {product.intensity}
              <span className="ml-1 text-sm font-normal text-espresso/50">/ 10</span>
            </p>
          </div>
        </div>

        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-caramel">
            Produit vedette
          </p>
          <h2 id="featured-title" className="mt-3 font-display text-3xl sm:text-4xl">
            {product.name}
          </h2>

          <div className="mt-3 flex flex-wrap items-center gap-3">
            <Rating value={product.rating} reviews={product.reviewsCount} />
            {product.badge && <Badge tone="premium">Premium</Badge>}
          </div>

          <p className="mt-5 text-[15px] leading-relaxed text-espresso/75">
            {product.longDescription}
          </p>

          <ul className="mt-5 grid grid-cols-2 gap-2 text-sm text-espresso/80">
            {product.notes.slice(0, 4).map((note) => (
              <li key={note} className="flex items-center gap-2">
                <Check className="h-4 w-4 text-caramel" aria-hidden="true" /> {note}
              </li>
            ))}
          </ul>

          <div className="mt-6 flex items-baseline gap-3">
            <span className="font-display text-3xl font-bold text-espresso">
              {formatPrice(product.price)}
            </span>
            {product.oldPrice && (
              <span className="text-sm text-espresso/40 line-through">
                {formatPrice(product.oldPrice)}
              </span>
            )}
          </div>

          <div className="mt-6 flex flex-wrap gap-2">
            <Button
              onClick={handleAdd}
              variant="primary"
              size="lg"
              leftIcon={<ShoppingBag className="h-4 w-4" aria-hidden="true" />}
            >
              Ajouter au panier
            </Button>
            <Button
              onClick={() => toggle(product)}
              variant="outline"
              size="lg"
              aria-pressed={inWishlist}
              leftIcon={
                <Heart
                  className={inWishlist ? 'h-4 w-4 fill-current text-caramel' : 'h-4 w-4'}
                  aria-hidden="true"
                />
              }
            >
              {inWishlist ? 'Dans les favoris' : 'Favoris'}
            </Button>
          </div>

          <p className="mt-4 inline-flex items-center gap-2 text-xs text-espresso/55">
            <Star className="h-3.5 w-3.5 fill-current text-gold" aria-hidden="true" />
            {product.stock} en stock · expédié en 24 h
          </p>
        </div>
      </div>
    </Section>
  );
}