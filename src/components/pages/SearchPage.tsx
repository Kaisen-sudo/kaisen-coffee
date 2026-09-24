import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search as SearchIcon } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { Input } from '@/components/ui/Input';
import { EmptyState } from '@/components/ui/EmptyState';
import { Button } from '@/components/ui/Button';
import { ProductGrid } from '@/components/products/ProductGrid';
import { PRODUCTS } from '@/data/products';

export default function SearchPage() {
  const [params, setParams] = useSearchParams();
  const initial = params.get('q') ?? '';
  const [query, setQuery] = useState(initial);

  useEffect(() => {
    document.title = `Recherche — Kaisen Coffee`;
  }, []);

  useEffect(() => {
    setQuery(params.get('q') ?? '');
  }, [params]);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];
    return PRODUCTS.filter((p) =>
      `${p.name} ${p.origin} ${p.notes.join(' ')}`.toLowerCase().includes(q),
    );
  }, [query]);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setParams(query ? { q: query } : {});
  };

  return (
    <Container className="py-10 sm:py-14">
      <header className="max-w-2xl">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-caramel">Recherche</p>
        <h1 className="mt-3 font-display text-3xl sm:text-4xl">Que cherchez-vous ?</h1>
      </header>

      <form onSubmit={onSubmit} className="mt-6 max-w-xl">
        <Input
          type="search"
          placeholder="Nom, origine, note aromatique…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          leftIcon={<SearchIcon className="h-4 w-4" aria-hidden="true" />}
          aria-label="Rechercher"
        />
      </form>

      <div className="mt-10">
        {query.trim() === '' ? (
          <p className="text-sm text-espresso/60">
            Tapez un mot-clé pour lancer la recherche.
          </p>
        ) : results.length === 0 ? (
          <EmptyState
            title={`Aucun résultat pour « ${query} »`}
            description="Essayez un autre nom, une origine ou une note aromatique."
            action={<Button to="/shop" variant="primary">Voir toute la boutique</Button>}
          />
        ) : (
          <>
            <p className="mb-4 text-xs text-espresso/55">
              {results.length} résultat{results.length > 1 ? 's' : ''}
            </p>
            <ProductGrid products={results} />
          </>
        )}
      </div>
    </Container>
  );
}