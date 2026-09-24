import { useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import { SlidersHorizontal, Search as SearchIcon } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { Button } from '@/components/ui/Button';
import { EmptyState } from '@/components/ui/EmptyState';
import { ProductGrid } from '@/components/products/ProductGrid';
import {
  ProductFilters,
  type FilterState,
} from '@/components/products/ProductFilters';
import { PRODUCTS } from '@/data/products';
import { CATEGORIES } from '@/data/categories';
import type { ProductCategory } from '@/types';
import { cn } from '@/lib/cn';
import { useLockBodyScroll } from '@/hooks/useLockBodyScroll';

type SortKey = 'featured' | 'price-asc' | 'price-desc' | 'rating' | 'newest';

const SORT_LABELS: Record<SortKey, string> = {
  featured: 'Recommandés',
  'price-asc': 'Prix croissant',
  'price-desc': 'Prix décroissant',
  rating: 'Mieux notés',
  newest: 'Nouveautés',
};

export default function ShopPage() {
  const { category } = useParams<{ category?: string }>();
  const [filters, setFilters] = useState<FilterState>({
    categories: [],
    roast: [],
    intensity: null,
    maxPrice: null,
  });
  const [sort, setSort] = useState<SortKey>('featured');
  const [query, setQuery] = useState('');
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  useLockBodyScroll(mobileFiltersOpen);

  // Sync route param → filter state
  useEffect(() => {
    if (category) {
      const found = CATEGORIES.find((c) => c.slug === category);
      if (found) {
        setFilters((f) => ({ ...f, categories: [found.id] }));
        document.title = `${found.name} — Boutique Kaisen Coffee`;
        return;
      }
    }
    document.title = 'Boutique — Kaisen Coffee';
  }, [category]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();

    let list = PRODUCTS.filter((p) => {
      if (filters.categories.length > 0 && !filters.categories.includes(p.category as ProductCategory)) {
        return false;
      }
      if (filters.roast.length > 0 && !filters.roast.includes(p.roast)) return false;
      if (filters.intensity !== null && p.intensity < filters.intensity) return false;
      if (filters.maxPrice !== null && p.price > filters.maxPrice) return false;
      if (q) {
        const haystack = `${p.name} ${p.origin} ${p.notes.join(' ')}`.toLowerCase();
        if (!haystack.includes(q)) return false;
      }
      return true;
    });

    switch (sort) {
      case 'price-asc':
        list = [...list].sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        list = [...list].sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        list = [...list].sort((a, b) => b.rating - a.rating);
        break;
      case 'newest':
        list = [...list].sort((a, b) => (b.badge === 'new' ? 1 : 0) - (a.badge === 'new' ? 1 : 0));
        break;
      default:
        list = [...list].sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
    }

    return list;
  }, [filters, sort, query]);

  const activeCategory = category
    ? CATEGORIES.find((c) => c.slug === category)
    : undefined;

  return (
    <div className="pb-16">
      <section className="border-b border-espresso/8 bg-warm-white/50 backdrop-blur-xl">
        <Container className="py-10 sm:py-14">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-caramel">
            Boutique
          </p>
          <h1 className="mt-3 font-display text-3xl sm:text-4xl lg:text-5xl">
            {activeCategory ? activeCategory.name : 'Tous nos cafés'}
          </h1>
          <p className="mt-3 max-w-xl text-sm text-espresso/65 sm:text-base">
            {activeCategory
              ? activeCategory.tagline
              : 'Sélection artisanale, torréfiée en petits lots, livrée partout en Haïti.'}
          </p>
        </Container>
      </section>

      <Container className="mt-8">
        <div className="grid gap-8 lg:grid-cols-[260px_1fr]">
          {/* Desktop filters */}
          <aside className="hidden lg:block">
            <div className="sticky top-24">
              <ProductFilters value={filters} onChange={setFilters} />
            </div>
          </aside>

          <div>
            {/* Toolbar */}
            <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center">
              <div className="flex-1">
                <Input
                  type="search"
                  placeholder="Rechercher…"
                  leftIcon={<SearchIcon className="h-4 w-4" aria-hidden="true" />}
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  aria-label="Rechercher un produit"
                />
              </div>

              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setMobileFiltersOpen(true)}
                  className="inline-flex h-12 items-center gap-2 rounded-xl border border-espresso/15 bg-warm-white px-4 text-sm font-medium text-espresso transition-colors hover:border-caramel/40 lg:hidden"
                  aria-label="Ouvrir les filtres"
                >
                  <SlidersHorizontal className="h-4 w-4" aria-hidden="true" />
                  Filtres
                </button>

                <div className="min-w-[180px]">
                  <Select
                    value={sort}
                    onChange={(e) => setSort(e.target.value as SortKey)}
                    aria-label="Trier les produits"
                  >
                    {Object.entries(SORT_LABELS).map(([key, label]) => (
                      <option key={key} value={key}>
                        {label}
                      </option>
                    ))}
                  </Select>
                </div>
              </div>
            </div>

            <p className="mb-4 text-xs text-espresso/55">
              {filtered.length} produit{filtered.length > 1 ? 's' : ''} trouvé
              {filtered.length > 1 ? 's' : ''}
            </p>

            {filtered.length === 0 ? (
              <EmptyState
                title="Aucun produit ne correspond"
                description="Essayez d'ajuster vos filtres ou votre recherche."
                action={
                  <Button
                    variant="outline"
                    onClick={() => {
                      setFilters({ categories: [], roast: [], intensity: null, maxPrice: null });
                      setQuery('');
                    }}
                  >
                    Réinitialiser
                  </Button>
                }
              />
            ) : (
              <ProductGrid products={filtered} />
            )}
          </div>
        </div>
      </Container>

      {/* Mobile filters drawer */}
      <div
        className={cn(
          'fixed inset-0 z-[80] lg:hidden',
          mobileFiltersOpen ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0',
        )}
        aria-hidden={!mobileFiltersOpen}
      >
        <div
          className="absolute inset-0 bg-espresso/55 backdrop-blur-sm"
          onClick={() => setMobileFiltersOpen(false)}
        />
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Filtres"
          className={cn(
            'absolute inset-y-0 left-0 w-full max-w-sm overflow-y-auto bg-cream p-4 shadow-deep transition-transform duration-400 ease-premium',
            mobileFiltersOpen ? 'translate-x-0' : '-translate-x-full',
          )}
        >
          <ProductFilters
            value={filters}
            onChange={setFilters}
            onClose={() => setMobileFiltersOpen(false)}
          />
          <div className="mt-4">
            <Button
              variant="primary"
              fullWidth
              onClick={() => setMobileFiltersOpen(false)}
            >
              Voir les résultats ({filtered.length})
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}