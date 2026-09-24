import { useEffect } from 'react';
import { Leaf, Sparkles, Target, Users } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';

const VALUES = [
  { icon: Target, title: 'Exigence', text: 'Sélection à la main, torréfaction en petits lots, contrôle qualité à chaque étape.' },
  { icon: Leaf, title: 'Origine', text: 'Traçabilité complète : producteur, région, altitude, procédé.' },
  { icon: Users, title: 'Communauté', text: 'Une relation directe avec nos clients, et avec les producteurs.' },
  { icon: Sparkles, title: 'Détail', text: 'L\'art du café se joue dans les détails — de la tasse à l\'emballage.' },
];

export default function AboutPage() {
  useEffect(() => {
    document.title = 'À propos — Kaisen Coffee';
  }, []);

  return (
    <>
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <img
            src="https://images.unsplash.com/photo-1524350876685-274059332603?auto=format&fit=crop&w=2000&q=80"
            alt=""
            aria-hidden="true"
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-espresso/70" />
        </div>
        <Container className="py-24 sm:py-32">
          <div className="max-w-2xl text-cream">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gold">Notre histoire</p>
            <h1 className="mt-3 font-display text-4xl sm:text-5xl lg:text-6xl">
              Le café, comme un art.
            </h1>
            <p className="mt-6 text-base text-cream/80 sm:text-lg">
              Kaisen signifie « amélioration continue ». C'est notre promesse à chaque tasse :
              chercher sans relâche la meilleure expression du grain.
            </p>
          </div>
        </Container>
      </section>

      <Container className="py-16 sm:py-20">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <h2 className="font-display text-3xl sm:text-4xl">Une idée simple</h2>
            <p className="mt-5 text-[15px] leading-relaxed text-espresso/75">
              Kaisen Coffee est née d'une frustration : trop peu de cafés, même bons, racontent
              réellement d'où ils viennent et comment ils sont torréfiés. Nous avons voulu
              construire une maison de café qui prend le temps de l'expliquer — et de le prouver en
              tasse.
            </p>
            <p className="mt-3 text-[15px] leading-relaxed text-espresso/75">
              Chaque origine que nous proposons est sélectionnée à la main, torréfiée en petits
              lots, puis testée sur plusieurs méthodes pour vérifier qu'elle donne le meilleur
              d'elle-même.
            </p>
          </div>
          <div>
            <div className="overflow-hidden rounded-3xl shadow-deep">
              <img
                src="https://images.unsplash.com/photo-1447933601403-0c6688de566e?auto=format&fit=crop&w=1200&q=80"
                alt="Grains de café torréfiés en gros plan"
                loading="lazy"
                className="aspect-[4/5] w-full object-cover"
              />
            </div>
          </div>
        </div>

        <div className="mt-20">
          <h2 className="font-display text-3xl sm:text-4xl">Nos valeurs</h2>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {VALUES.map(({ icon: Icon, title, text }) => (
              <article
                key={title}
                className="rounded-2xl border border-espresso/8 bg-warm-white p-6 shadow-soft"
              >
                <div className="grid h-11 w-11 place-items-center rounded-full bg-caramel/12 text-caramel">
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </div>
                <h3 className="mt-4 font-display text-lg font-bold text-espresso">{title}</h3>
                <p className="mt-2 text-sm text-espresso/70">{text}</p>
              </article>
            ))}
          </div>
        </div>

        <div className="mt-20 rounded-3xl bg-espresso p-8 text-cream sm:p-12">
          <div className="grid gap-8 lg:grid-cols-[1.4fr_1fr] lg:items-center">
            <div>
              <h2 className="font-display text-3xl text-cream">Prêt·e à passer à table ?</h2>
              <p className="mt-3 max-w-lg text-cream/75">
                Huit cafés, une seule promesse : votre meilleure tasse.
              </p>
            </div>
            <div className="flex flex-wrap gap-3 lg:justify-end">
              <Button to="/shop" variant="accent" size="lg">Découvrir la boutique</Button>
              <Button to="/contact" variant="glass" size="lg" className="!bg-white/10 !text-cream !border-white/25">
                Nous contacter
              </Button>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
}