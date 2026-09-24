import { Section } from '@/components/ui/Section';

const METHODS = [
  {
    name: 'Espresso',
    description: "Extraction rapide, sous pression. Corps intense, crema dense.",
    grind: 'Mouture fine',
    ratio: '1:2 · 25 s',
    image: 'https://images.unsplash.com/photo-1510707577719-ae7c14805e3a?auto=format&fit=crop&w=800&q=80',
    alt: 'Extraction d’un espresso dans une machine professionnelle',
  },
  {
    name: 'V60 / Filtre',
    description: 'Extraction douce et lente. Clarté, précision, notes délicates.',
    grind: 'Mouture moyenne',
    ratio: '1:15 · 2 min 30',
    image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=800&q=80',
    alt: 'Préparation d’un café filtre en V60',
  },
  {
    name: 'French Press',
    description: 'Immersion totale. Texture riche, huiles préservées.',
    grind: 'Mouture grossière',
    ratio: '1:14 · 4 min',
    image: 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?auto=format&fit=crop&w=800&q=80',
    alt: 'Cafetière French press avec du café',
  },
];

export function Brewing() {
  return (
    <Section aria-labelledby="brewing-title" className="bg-warm-white/40">
      <div className="mx-auto max-w-2xl text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-caramel">
          Méthodes
        </p>
        <h2 id="brewing-title" className="mt-3 font-display text-3xl sm:text-4xl">
          Le geste, à chaque méthode
        </h2>
        <p className="mt-3 text-sm text-espresso/65 sm:text-base">
          Chaque préparation révèle une facette différente du grain.
        </p>
      </div>

      <div className="mt-10 grid gap-5 md:grid-cols-3">
        {METHODS.map((m) => (
          <article
            key={m.name}
            className="overflow-hidden rounded-2xl border border-espresso/8 bg-warm-white shadow-soft"
          >
            <div className="aspect-[4/3] overflow-hidden">
              <img src={m.image} alt={m.alt} loading="lazy" className="h-full w-full object-cover" />
            </div>
            <div className="p-5">
              <h3 className="font-display text-lg font-bold text-espresso">{m.name}</h3>
              <p className="mt-2 text-sm text-espresso/70">{m.description}</p>
              <dl className="mt-4 space-y-1 text-xs text-espresso/60">
                <div className="flex justify-between">
                  <dt>Mouture</dt>
                  <dd className="font-medium text-espresso">{m.grind}</dd>
                </div>
                <div className="flex justify-between">
                  <dt>Ratio</dt>
                  <dd className="font-medium text-espresso">{m.ratio}</dd>
                </div>
              </dl>
            </div>
          </article>
        ))}
      </div>
    </Section>
  );
}