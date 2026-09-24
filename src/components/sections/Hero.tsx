import { ArrowRight, Leaf, ShieldCheck, Truck } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import { Rating } from '@/components/ui/Rating';
import { Badge } from '@/components/ui/Badge';
import { formatPrice } from '@/lib/format';
import { getFeaturedProducts } from '@/data/products';
import { Link } from 'react-router-dom';

export function Hero() {
  const [featured] = getFeaturedProducts();

  return (
    <section className="relative overflow-hidden" aria-labelledby="hero-title">
      {/* Background image */}
      <div className="absolute inset-0 -z-10">
        <img
          src="https://images.unsplash.com/photo-1497935586351-b67a49e012bf?auto=format&fit=crop&w=2000&q=80"
          alt=""
          aria-hidden="true"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-espresso/70 via-espresso/45 to-espresso/85" />
        <div
          aria-hidden="true"
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(circle at 20% 30%, rgba(201,164,92,0.18), transparent 55%)',
          }}
        />
      </div>

      <Container className="relative">
        <div className="grid min-h-[92vh] items-center gap-10 py-24 lg:min-h-[88vh] lg:grid-cols-[1.15fr_0.85fr] lg:gap-16 lg:py-28">
          <div className="text-cream">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gold">
              Torréfaction artisanale · Haïti
            </p>
            <h1
              id="hero-title"
              className="mt-5 font-display text-[clamp(2.75rem,7vw,5rem)] font-bold leading-[1.05] text-cream"
            >
              L'art du café,{' '}
              <em className="font-medium italic text-gold">révélé.</em>
            </h1>
            <p className="mt-6 max-w-lg text-base leading-relaxed text-cream/85 sm:text-lg">
              Des grains sélectionnés à la main, torréfiés en petits lots. Chaque tasse devient un
              moment d'exception — livré partout en Haïti.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Button to="/shop" variant="accent" size="lg" rightIcon={<ArrowRight className="h-4 w-4" aria-hidden="true" />}>
                Découvrir nos cafés
              </Button>
              <Button
                to="/shop/origines"
                variant="glass"
                size="lg"
                className="!bg-white/10 !text-cream !border-white/25 hover:!bg-white/20"
              >
                Explorer la collection
              </Button>
            </div>

            <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-3 text-xs text-cream/80">
              <span className="inline-flex items-center gap-2">
                <Truck className="h-4 w-4 text-gold" aria-hidden="true" />
                Livraison offerte dès 4 000 G
              </span>
              <span className="inline-flex items-center gap-2">
                <Leaf className="h-4 w-4 text-gold" aria-hidden="true" />
                Origines 100 % traçables
              </span>
              <span className="inline-flex items-center gap-2">
                <ShieldCheck className="h-4 w-4 text-gold" aria-hidden="true" />
                Paiement sécurisé
              </span>
            </div>
          </div>

          {/* Floating product card */}
          {featured && (
            <div className="mx-auto w-full max-w-sm">
              <article className="glass-dark rounded-3xl border border-white/15 p-4 shadow-deep backdrop-blur-2xl">
                <Link to={`/product/${featured.slug}`} className="block overflow-hidden rounded-2xl">
                  <img
                    src={featured.images[0].src}
                    alt={featured.images[0].alt}
                    className="aspect-[4/5] w-full object-cover"
                  />
                </Link>

                <div className="mt-4 flex flex-wrap gap-1.5">
                  <Badge tone="premium">Premium</Badge>
                  {featured.badge === 'best-seller' && <Badge tone="best">Best Seller</Badge>}
                </div>

                <h3 className="mt-3 font-display text-lg font-bold text-cream">{featured.name}</h3>
                <p className="mt-1 text-xs text-cream/70">{featured.notes.join(' · ')}</p>

                <div className="mt-2">
                  <Rating value={featured.rating} reviews={featured.reviewsCount} className="[&_span]:text-cream/70" />
                </div>

                <div className="mt-4 flex items-center justify-between gap-3">
                  <div>
                    <span className="font-display text-2xl font-bold text-cream">
                      {formatPrice(featured.price)}
                    </span>
                    {featured.oldPrice && (
                      <span className="ml-2 text-xs text-cream/45 line-through">
                        {formatPrice(featured.oldPrice)}
                      </span>
                    )}
                  </div>
                  <Button to={`/product/${featured.slug}`} variant="glass" size="sm" className="!bg-white/10 !text-cream !border-white/25">
                    Voir
                  </Button>
                </div>
              </article>
            </div>
          )}
        </div>
      </Container>
    </section>
  );
}