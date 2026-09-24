import { Section } from '@/components/ui/Section';

const ORIGINS = [
  {
    country: 'Éthiopie',
    region: 'Yirgacheffe',
    altitude: '1 900 m',
    flavor: 'Floral · Bergamote · Pêche blanche',
    image: 'https://images.unsplash.com/photo-1518057111178-44a106bad636?auto=format&fit=crop&w=800&q=80',
    alt: 'Plantation de café en Éthiopie',
  },
  {
    country: 'Colombie',
    region: 'Huila',
    altitude: '1 750 m',
    flavor: 'Caramel · Pomme rouge · Cacao',
    image: 'https://images.unsplash.com/photo-1524350876685-274059332603?auto=format&fit=crop&w=800&q=80',
    alt: 'Grains de café colombiens',
  },
  {
    country: 'Brésil',
    region: 'Cerrado',
    altitude: '1 100 m',
    flavor: 'Chocolat · Noisette · Caramel',
    image: 'https://images.unsplash.com/photo-1447933601403-0c6688de566e?auto=format&fit=crop&w=800&q=80',
    alt: 'Grains de café brésiliens',
  },
];

export function Origin() {
  return (
    <Section aria-labelledby="origin-title">
      <div className="mx-auto max-w-2xl text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-caramel">Origines</p>
        <h2 id="origin-title" className="mt-3 font-display text-3xl sm:text-4xl">
          Un terroir, une signature
        </h2>
        <p className="mt-3 text-sm text-espresso/65 sm:text-base">
          Chaque café porte la mémoire de sa terre. Nous en sélectionnons trois, aujourd'hui.
        </p>
      </div>

      <div className="mt-10 grid gap-5 md:grid-cols-3">
        {ORIGINS.map((o) => (
          <article
            key={o.country}
            className="group overflow-hidden rounded-2xl border border-espresso/8 bg-warm-white shadow-soft transition-all duration-400 ease-premium hover:-translate-y-1 hover:shadow-deep"
          >
            <div className="aspect-[4/3] overflow-hidden">
              <img
                src={o.image}
                alt={o.alt}
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </div>
            <div className="p-5">
              <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-caramel">
                {o.country}
              </p>
              <h3 className="mt-1 font-display text-xl font-bold text-espresso">{o.region}</h3>
              <p className="mt-1 text-xs text-espresso/55">Altitude · {o.altitude}</p>
              <p className="mt-3 text-sm text-espresso/75">{o.flavor}</p>
            </div>
          </article>
        ))}
      </div>
    </Section>
  );
}