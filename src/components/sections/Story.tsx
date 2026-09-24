import { Section } from '@/components/ui/Section';

const STATS = [
  { value: '12', label: 'Origines partenaires' },
  { value: '100 %', label: 'Traçabilité' },
  { value: '7 jours', label: 'Après torréfaction' },
];

export function Story() {
  return (
    <section className="relative overflow-hidden bg-espresso text-cream reveal">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-24 right-[-10%] h-80 w-80 rounded-full bg-gold/10 blur-3xl"
      />
      <div className="relative mx-auto w-full max-w-6xl px-4 py-20 sm:px-6 sm:py-24 lg:px-8 lg:py-28">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <div className="relative">
            <div className="overflow-hidden rounded-3xl shadow-deep">
              <img
                src="https://images.unsplash.com/photo-1524350876685-274059332603?auto=format&fit=crop&w=1200&q=80"
                alt="Torréfacteur Kaisen Coffee travaillant les grains dans l'atelier"
                loading="lazy"
                className="aspect-[4/5] w-full object-cover"
              />
            </div>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gold">
              Notre philosophie
            </p>
            <h2 className="mt-3 font-display text-3xl text-cream sm:text-4xl">
              Le geste juste, <em className="font-medium italic text-gold">chaque jour.</em>
            </h2>
            <p className="mt-5 text-[15px] leading-relaxed text-cream/75">
              Kaisen signifie « amélioration continue » en japonais. C'est la promesse que nous
              faisons à chaque tasse : chercher sans relâche la meilleure expression du grain.
            </p>
            <p className="mt-3 text-[15px] leading-relaxed text-cream/75">
              Nous sélectionnons nos cafés directement auprès de producteurs partenaires, puis nous
              les torréfions en petits lots, chaque semaine, dans notre atelier.
            </p>

            <dl className="mt-8 grid grid-cols-3 gap-4">
              {STATS.map((s) => (
                <div key={s.label}>
                  <dt className="sr-only">{s.label}</dt>
                  <dd>
                    <span className="block font-display text-2xl font-bold text-gold sm:text-3xl">
                      {s.value}
                    </span>
                    <span className="mt-1 block text-[10px] font-semibold uppercase tracking-wider text-cream/55 sm:text-xs">
                      {s.label}
                    </span>
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>
    </section>
  );
}