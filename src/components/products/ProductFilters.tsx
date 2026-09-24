import { Filter, X } from 'lucide-react';
import { cn } from '@/lib/cn';
import { formatPrice } from '@/lib/format';
import { CATEGORIES } from '@/data/categories';
import type { ProductCategory } from '@/types';

export interface FilterState {
  categories: ProductCategory[];
  roast: ('light' | 'medium' | 'medium-dark' | 'dark')[];
  intensity: number | null;
  maxPrice: number | null;
}

interface ProductFiltersProps {
  value: FilterState;
  onChange: (next: FilterState) => void;
  maxPrice?: number;
  className?: string;
  onClose?: () => void;
}

const ROAST_LABELS: { value: FilterState['roast'][number]; label: string }[] = [
  { value: 'light', label: 'Claire' },
  { value: 'medium', label: 'Médium' },
  { value: 'medium-dark', label: 'Médium-foncée' },
  { value: 'dark', label: 'Foncée' },
];

export function ProductFilters({ value, onChange, maxPrice = 7000, className, onClose }: ProductFiltersProps) {
  const toggleCategory = (id: ProductCategory) => {
    const next = value.categories.includes(id)
      ? value.categories.filter((c) => c !== id)
      : [...value.categories, id];
    onChange({ ...value, categories: next });
  };

  const toggleRoast = (id: FilterState['roast'][number]) => {
    const next = value.roast.includes(id)
      ? value.roast.filter((r) => r !== id)
      : [...value.roast, id];
    onChange({ ...value, roast: next });
  };

  const clearAll = () => {
    onChange({ categories: [], roast: [], intensity: null, maxPrice: null });
  };

  return (
    <div className={cn('rounded-2xl border border-espresso/10 bg-warm-white/80 p-5 backdrop-blur-xl', className)}>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-espresso">
          <Filter className="h-4 w-4" aria-hidden="true" />
          <span className="text-sm font-semibold">Filtres</span>
        </div>
        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={clearAll}
            className="text-xs text-espresso/60 underline-offset-4 hover:text-caramel hover:underline"
          >
            Réinitialiser
          </button>
          {onClose && (
            <button
              type="button"
              onClick={onClose}
              aria-label="Fermer les filtres"
              className="grid h-8 w-8 place-items-center rounded-full text-espresso/60 hover:bg-espresso/8 lg:hidden"
            >
              <X className="h-4 w-4" aria-hidden="true" />
            </button>
          )}
        </div>
      </div>

      <div className="mt-5 space-y-6">
        <fieldset>
          <legend className="mb-2 text-xs font-semibold uppercase tracking-wider text-espresso/60">
            Catégorie
          </legend>
          <ul className="space-y-2">
            {CATEGORIES.map((c) => {
              const checked = value.categories.includes(c.id);
              return (
                <li key={c.id}>
                  <label className="flex cursor-pointer items-center gap-2.5 text-sm text-espresso/85">
                    <input
                      type="checkbox"
                      checked={checked}
                      onChange={() => toggleCategory(c.id)}
                      className="h-4 w-4 accent-caramel"
                    />
                    <span className="flex-1">{c.name}</span>
                    <span className="text-xs text-espresso/45">{c.productCount}</span>
                  </label>
                </li>
              );
            })}
          </ul>
        </fieldset>

        <fieldset>
          <legend className="mb-2 text-xs font-semibold uppercase tracking-wider text-espresso/60">
            Torréfaction
          </legend>
          <ul className="space-y-2">
            {ROAST_LABELS.map((r) => {
              const checked = value.roast.includes(r.value);
              return (
                <li key={r.value}>
                  <label className="flex cursor-pointer items-center gap-2.5 text-sm text-espresso/85">
                    <input
                      type="checkbox"
                      checked={checked}
                      onChange={() => toggleRoast(r.value)}
                      className="h-4 w-4 accent-caramel"
                    />
                    {r.label}
                  </label>
                </li>
              );
            })}
          </ul>
        </fieldset>

        <fieldset>
          <legend className="mb-2 text-xs font-semibold uppercase tracking-wider text-espresso/60">
            Intensité minimale
          </legend>
          <input
            type="range"
            min={1}
            max={10}
            value={value.intensity ?? 1}
            onChange={(e) => onChange({ ...value, intensity: Number(e.target.value) })}
            className="w-full accent-caramel"
            aria-valuemin={1}
            aria-valuemax={10}
            aria-valuenow={value.intensity ?? 1}
          />
          <p className="mt-1 text-xs text-espresso/60">
            {value.intensity ? `${value.intensity} / 10` : 'Toutes'}
          </p>
        </fieldset>

        <fieldset>
          <legend className="mb-2 text-xs font-semibold uppercase tracking-wider text-espresso/60">
            Prix maximum
          </legend>
          <input
            type="range"
            min={1000}
            max={maxPrice}
            step={100}
            value={value.maxPrice ?? maxPrice}
            onChange={(e) => onChange({ ...value, maxPrice: Number(e.target.value) })}
            className="w-full accent-caramel"
            aria-valuemin={1000}
            aria-valuemax={maxPrice}
            aria-valuenow={value.maxPrice ?? maxPrice}
          />
          <p className="mt-1 text-xs text-espresso/60">
            Jusqu'à {formatPrice(value.maxPrice ?? maxPrice)}
          </p>
        </fieldset>
      </div>
    </div>
  );
}