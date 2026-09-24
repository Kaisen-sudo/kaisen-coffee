import { useEffect, useMemo, useState } from 'react';
import { Link, useParams, Navigate } from 'react-router-dom';
import {
  Check,
  ChevronRight,
  Heart,
  Minus,
  Plus,
  ShieldCheck,
  ShoppingBag,
  Truck,
} from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Rating } from '@/components/ui/Rating';
import { QuantityStepper } from '@/components/ui/QuantityStepper';
import { ProductGrid } from '@/components/products/ProductGrid';
import { Accordion } from '@/components/ui/Accordion';
import { getProductBySlug, getRelatedProducts } from '@/data/products';
import { formatPrice } from '@/lib/format';
import { cn } from '@/lib/cn';
import { useCart } from '@/store/CartContext';
import { useWishlist } from '@/store/WishlistContext';
import { useUI } from '@/store/UIContext';
import { FAQ } from '@/data/faq';

export default function ProductPage() {
  const { slug } = useParams<{ slug: string }>();
  const product = slug ? getProductBySlug(slug) : undefined;

  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [selectedVariantId, setSelectedVariantId] = useState<string | undefined>(
    product?.variants[0]?.id,
  );
  const [quantity, setQuantity] = useState(1);

  const { addItem } = useCart();
  const { has, toggle } = useWishlist();
  const { pushToast, openCart } = useUI();

  const variant = useMemo(
    () => product?.variants.find((v) => v.id === selectedVariantId),
    [product, selectedVariantId],
  );

  useEffect(() => {
    if (product) {
      document.title = `${product.name} — Kaisen Coffee`;
      window.scrollTo({ top: 0, behavior: 'auto' });
      setSelectedImageIndex(0);
      setSelectedVariantId(product.variants[0]?.id);
      setQuantity(1);
    }
  }, [product]);

  if (!product) return <Navigate to="/404" replace />;

  const inWishlist = has(product.id);
  const related = getRelatedProducts(product, 4);

  const handleAdd = () => {
    if (!variant) return;
    addItem(product, variant, quantity);
    pushToast(`${product.name} ajouté au panier`, 'success');
    openCart();
  };

  const handleBuyNow = () => {
    if (!variant) return;
    addItem(product, variant, quantity);
    window.location.href = '/checkout';
  };

  const productFaqs = FAQ.filter(
    (f) => f.category === 'conservation' || f.category === 'preparation',
  ).map((f) => ({ id: f.id, title: f.question, content: f.answer }));

  return (
    <div className="pb-16">
      <Container className="pt-6 sm:pt-8">
        {/* Breadcrumbs */}
        <nav aria-label="Fil d'Ariane" className="text-xs">
          <ol className="flex flex-wrap items-center gap-1 text-espresso/55">
            <li><Link to="/" className="hover:text-caramel">Accueil</Link></li>
            <li aria-hidden="true"><ChevronRight className="h-3 w-3" /></li>
            <li><Link to="/shop" className="hover:text-caramel">Boutique</Link></li>
            <li aria-hidden="true"><ChevronRight className="h-3 w-3" /></li>
            <li className="text-espresso/80">{product.name}</li>
          </ol>
        </nav>

        <div className="mt-8 grid gap-10 lg:grid-cols-2 lg:gap-14">
          {/* Gallery */}
          <div>
            <div className="relative overflow-hidden rounded-3xl bg-beige shadow-soft">
              <img
                src={product.images[selectedImageIndex].src}
                alt={product.images[selectedImageIndex].alt}
                className="aspect-[4/5] w-full object-cover"
              />
              {product.badge && (
                <div className="absolute left-4 top-4">
                  <Badge tone={product.badge === 'best-seller' ? 'best' : product.badge === 'new' ? 'new' : 'premium'}>
                    {product.badge === 'best-seller'
                      ? 'Best Seller'
                      : product.badge === 'new'
                        ? 'Nouveau'
                        : product.badge === 'premium'
                          ? 'Premium'
                          : product.badge === 'reserve'
                            ? 'Reserve'
                            : 'Promo'}
                  </Badge>
                </div>
              )}
            </div>

            {product.images.length > 1 && (
              <ul className="mt-4 grid grid-cols-4 gap-3">
                {product.images.map((img, i) => (
                  <li key={i}>
                    <button
                      type="button"
                      onClick={() => setSelectedImageIndex(i)}
                      aria-label={`Voir l'image ${i + 1}`}
                      aria-current={i === selectedImageIndex}
                      className={cn(
                        'block w-full overflow-hidden rounded-xl border-2 transition-all',
                        i === selectedImageIndex
                          ? 'border-caramel'
                          : 'border-transparent opacity-70 hover:opacity-100',
                      )}
                    >
                      <img
                        src={img.src}
                        alt=""
                        loading="lazy"
                        className="aspect-square w-full object-cover"
                      />
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Infos */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-caramel">
              {product.origin}
            </p>
            <h1 className="mt-3 font-display text-3xl sm:text-4xl">{product.name}</h1>

            <div className="mt-3 flex flex-wrap items-center gap-3">
              <Rating value={product.rating} reviews={product.reviewsCount} size="md" />
              {product.stock > 0 ? (
                <span className="inline-flex items-center gap-1 text-xs text-emerald-700">
                  <Check className="h-3.5 w-3.5" aria-hidden="true" /> En stock
                </span>
              ) : (
                <span className="text-xs text-red-700">Épuisé</span>
              )}
            </div>

            <p className="mt-5 text-[15px] leading-relaxed text-espresso/75">
              {product.shortDescription}
            </p>

            <div className="mt-6 flex items-baseline gap-3">
              <span className="font-display text-3xl font-bold text-espresso">
                {formatPrice(variant?.price ?? product.price)}
              </span>
              {(variant?.oldPrice || product.oldPrice) && (
                <span className="text-sm text-espresso/40 line-through">
                  {formatPrice(variant?.oldPrice ?? product.oldPrice ?? 0)}
                </span>
              )}
            </div>

            {/* Variants */}
            {product.variants.length > 1 && (
              <fieldset className="mt-6">
                <legend className="text-xs font-semibold uppercase tracking-wider text-espresso/60">
                  Poids
                </legend>
                <div className="mt-3 flex flex-wrap gap-2">
                  {product.variants.map((v) => {
                    const selected = v.id === selectedVariantId;
                    const disabled = v.stock <= 0;
                    return (
                      <button
                        key={v.id}
                        type="button"
                        disabled={disabled}
                        onClick={() => setSelectedVariantId(v.id)}
                        aria-pressed={selected}
                        className={cn(
                          'rounded-full border px-4 py-2 text-sm font-medium transition-all',
                          selected
                            ? 'border-espresso bg-espresso text-cream'
                            : 'border-espresso/20 text-espresso hover:border-espresso/50',
                          disabled && 'opacity-40 pointer-events-none',
                        )}
                      >
                        {v.label}
                      </button>
                    );
                  })}
                </div>
              </fieldset>
            )}

            {/* Notes */}
            <div className="mt-6">
              <p className="text-xs font-semibold uppercase tracking-wider text-espresso/60">
                Notes aromatiques
              </p>
              <ul className="mt-3 flex flex-wrap gap-2">
                {product.notes.map((n) => (
                  <li
                    key={n}
                    className="rounded-full border border-espresso/10 bg-beige/60 px-3 py-1 text-xs text-espresso/80"
                  >
                    {n}
                  </li>
                ))}
              </ul>
            </div>

            {/* Intensity */}
            <div className="mt-6">
              <div className="flex items-center justify-between text-xs text-espresso/60">
                <span>Intensité</span>
                <span className="font-medium text-espresso">{product.intensity} / 10</span>
              </div>
              <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-espresso/10">
                <div
                  className="h-full rounded-full bg-caramel transition-all duration-500"
                  style={{ width: `${product.intensity * 10}%` }}
                />
              </div>
            </div>

            {/* Quantity + Add */}
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <QuantityStepper value={quantity} onChange={setQuantity} />
              <Button
                variant="primary"
                size="lg"
                onClick={handleAdd}
                disabled={!variant || variant.stock <= 0}
                leftIcon={<ShoppingBag className="h-4 w-4" aria-hidden="true" />}
              >
                Ajouter au panier
              </Button>
              <Button
                variant="outline"
                size="lg"
                onClick={() => toggle(product)}
                aria-pressed={inWishlist}
                aria-label={inWishlist ? 'Retirer des favoris' : 'Ajouter aux favoris'}
              >
                <Heart
                  aria-hidden="true"
                  className={cn('h-4 w-4', inWishlist && 'fill-current text-caramel')}
                />
              </Button>
            </div>

            <Button
              variant="accent"
              size="lg"
              fullWidth
              onClick={handleBuyNow}
              disabled={!variant || variant.stock <= 0}
              className="mt-3"
            >
              Acheter maintenant
            </Button>

            {/* Trust row */}
            <ul className="mt-6 grid grid-cols-1 gap-2 text-xs text-espresso/70 sm:grid-cols-2">
              <li className="flex items-center gap-2">
                <Truck className="h-4 w-4 text-caramel" aria-hidden="true" />
                Livraison offerte dès 4 000 G
              </li>
              <li className="flex items-center gap-2">
                <ShieldCheck className="h-4 w-4 text-caramel" aria-hidden="true" />
                Paiement sécurisé
              </li>
            </ul>
          </div>
        </div>

        {/* Description + FAQ */}
        <div className="mt-16 grid gap-10 lg:grid-cols-[2fr_1fr]">
          <div>
            <h2 className="font-display text-2xl">Description</h2>
            <p className="mt-4 text-[15px] leading-relaxed text-espresso/75">
              {product.longDescription}
            </p>

            <h3 className="mt-8 font-display text-lg">Méthodes conseillées</h3>
            <ul className="mt-3 flex flex-wrap gap-2 text-xs">
              {product.brewMethods.map((m) => (
                <li
                  key={m}
                  className="rounded-full border border-espresso/12 bg-warm-white px-3 py-1.5 text-espresso/80"
                >
                  {m}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="font-display text-2xl">Questions fréquentes</h2>
            <div className="mt-4">
              <Accordion items={productFaqs} defaultOpenId={productFaqs[0]?.id} />
            </div>
          </div>
        </div>

        {/* Related */}
        {related.length > 0 && (
          <div className="mt-20">
            <div className="mb-8">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-caramel">
                Vous aimerez aussi
              </p>
              <h2 className="mt-2 font-display text-2xl sm:text-3xl">Cafés similaires</h2>
            </div>
            <ProductGrid products={related} columns={4} />
          </div>
        )}
      </Container>
    </div>
  );
}