import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, X } from 'lucide-react';
import { cn } from '@/lib/cn';
import { formatPrice } from '@/lib/format';
import { PRODUCTS } from '@/data/products';
import { useLockBodyScroll } from '@/hooks/useLockBodyScroll';
import { useUI } from '@/store/UIContext';

export function SearchOverlay() {
  const { searchOpen, closeSearch } = useUI();
  const [query, setQuery] = useState('');
  useLockBodyScroll(searchOpen);

  useEffect(() => {
    if (searchOpen) setQuery('');
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeSearch();
    };
    if (searchOpen) window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [searchOpen, closeSearch]);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];
    return PRODUCTS.filter((p) =>
      `${p.name} ${p.origin} ${p.notes.join(' ')}`.toLowerCase().includes(q),
    ).slice(0, 6);
  }, [query]);

  return (
    <div
      className={cn(
        'fixed inset-0 z-[80] transition-opacity duration-300',
        searchOpen ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0',
      )}
      aria-hidden={!searchOpen}
    >
      <div className="absolute inset-0 bg-espresso/60 backdrop-blur-md" onClick={closeSearch} />

      <div className="relative mx-auto mt-20 w-[min(680px,92%)] rounded-3xl border border-white/60 bg-warm-white/95 shadow-deep backdrop-blur-2xl">
        <div className="flex items-center gap-3 border-b border-espresso/10 px-5 py-4">
          <Search className="h-5 w-5 text-espresso/50" aria-hidden="true" />
          <label htmlFor="kaisen-search" className="sr-only">
            Rechercher un café, une origine
          </label>
          <input
            id="kaisen-search"
            autoFocus={searchOpen}
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Rechercher un café, une origine, une note…"
            className="h-10 flex-1 bg-transparent text-[15px] text-espresso placeholder:text-espresso/40 focus:outline-none"
          />
          <button
            type="button"
            onClick={closeSearch}
            aria-label="Fermer la recherche"
            className="grid h-9 w-9 place-items-center rounded-full text-espresso/60 transition-colors hover:bg-espresso/8"
          >
            <X className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>

        <div className="max-h-[60vh] overflow-y-auto p-3">
          {query.trim() === '' ? (
            <p className="px-3 py-6 text-center text-sm text-espresso/55">
              Tapez le nom d'un café, d'une origine ou d'une note aromatique.
            </p>
          ) : results.length === 0 ? (
            <p className="px-3 py-6 text-center text-sm text-espresso/55">
              Aucun résultat pour « {query} ».
            </p>
          ) : (
            <ul className="flex flex-col">
              {results.map((p) => (
                <li key={p.id}>
                  <Link
                    to={`/product/${p.slug}`}
                    onClick={closeSearch}
                    className="flex items-center gap-3 rounded-2xl p-3 transition-colors hover:bg-espresso/5"
                  >
                    <img
                      src={p.images[0].src}
                      alt={p.images[0].alt}
                      loading="lazy"
                      className="h-14 w-14 rounded-xl object-cover"
                    />
                    <div className="min-w-0 flex-1">
                      <p className="truncate font-medium text-espresso">{p.name}</p>
                      <p className="truncate text-xs text-espresso/60">
                        {p.origin} · {p.notes.slice(0, 2).join(' · ')}
                      </p>
                    </div>
                    <span className="shrink-0 font-display text-sm font-bold text-espresso">
                      {formatPrice(p.price)}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}