import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { Section } from '@/components/ui/Section';
import { CATEGORIES } from '@/data/categories';

export function Categories() {
  return (
    <Section aria-labelledby="categories-title">
      <div className="mx-auto max-w-2xl text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-caramel">Explorer</p>
        <h2 id="categories-title" className="mt-3 font-display text-3xl sm:text-4xl">
          Nos univers
        </h2>
        <p className="mt-3 text-sm text-espresso/65 sm:text-base">
          Du grain brut à la tasse parfaite — chaque collection raconte une facette du café.
        </p>
      </div>

      <div className="mt-10 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
        {CATEGORIES.map((cat) => (
          <Link
            key={cat.id}
            to={`/shop/${cat.slug}`}
            className="group relative overflow-hidden rounded-2xl shadow-soft transition-all duration-500 ease-premium hover:-translate-y-1 hover:shadow-deep"
            style={{ aspectRatio: '3 / 4' }}
          >
            <img
              src={cat.image.src}
              alt={cat.image.alt}
              loading="lazy"
              className="h-full w-full object-cover transition-transform duration-700 ease-premium group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-espresso/90 via-espresso/25 to-transparent" />

            <div className="absolute inset-x-0 bottom-0 p-4 text-cream sm:p-5">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <h3 className="font-display text-lg font-bold">{cat.name}</h3>
                  <p className="mt-0.5 text-xs text-cream/75">{cat.tagline}</p>
                </div>
                <ArrowUpRight
                  aria-hidden="true"
                  className="h-5 w-5 shrink-0 text-gold transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                />
              </div>
            </div>
          </Link>
        ))}
      </div>
    </Section>
  );
}