import { useEffect, useMemo, useState } from 'react';
import { Container } from '@/components/ui/Container';
import { Accordion } from '@/components/ui/Accordion';
import { FAQ } from '@/data/faq';
import { cn } from '@/lib/cn';

const CATEGORY_LABELS: Record<string, string> = {
  all: 'Tout',
  commandes: 'Commandes',
  livraison: 'Livraison',
  paiement: 'Paiement',
  retours: 'Retours',
  conservation: 'Conservation',
  preparation: 'Préparation',
  abonnement: 'Abonnement',
};

export default function FaqPage() {
  const [active, setActive] = useState<string>('all');

  useEffect(() => {
    document.title = 'FAQ — Kaisen Coffee';
  }, []);

  const items = useMemo(() => {
    const list = active === 'all' ? FAQ : FAQ.filter((f) => f.category === active);
    return list.map((f) => ({ id: f.id, title: f.question, content: f.answer }));
  }, [active]);

  const categories = ['all', ...Array.from(new Set(FAQ.map((f) => f.category)))];

  return (
    <Container className="py-10 sm:py-14">
      <header className="max-w-2xl">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-caramel">FAQ</p>
        <h1 className="mt-3 font-display text-3xl sm:text-4xl lg:text-5xl">
          Questions fréquentes.
        </h1>
        <p className="mt-4 text-sm text-espresso/65 sm:text-base">
          Commandes, livraison, paiement, conservation — nous avons regroupé les réponses les plus
          utiles.
        </p>
      </header>

      <div className="mt-8 flex flex-wrap gap-2">
        {categories.map((c) => (
          <button
            key={c}
            type="button"
            onClick={() => setActive(c)}
            aria-pressed={active === c}
            className={cn(
              'rounded-full border px-4 py-2 text-sm font-medium transition-all',
              active === c
                ? 'border-espresso bg-espresso text-cream'
                : 'border-espresso/20 text-espresso hover:border-espresso/50',
            )}
          >
            {CATEGORY_LABELS[c] ?? c}
          </button>
        ))}
      </div>

      <div className="mt-8 max-w-3xl">
        {items.length === 0 ? (
          <p className="text-sm text-espresso/60">Aucune question dans cette catégorie.</p>
        ) : (
          <Accordion items={items} />
        )}
      </div>
    </Container>
  );
}