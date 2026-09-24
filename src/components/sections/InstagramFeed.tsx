import { Instagram } from 'lucide-react';
import { Section } from '@/components/ui/Section';
import { BRAND } from '@/lib/config';

const PHOTOS = [
  { src: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=600&q=80', alt: 'Préparation d’un café filtre' },
  { src: 'https://images.unsplash.com/photo-1510707577719-ae7c14805e3a?auto=format&fit=crop&w=600&q=80', alt: 'Espresso en cours d’extraction' },
  { src: 'https://images.unsplash.com/photo-1447933601403-0c6688de566e?auto=format&fit=crop&w=600&q=80', alt: 'Grains de café torréfiés en gros plan' },
  { src: 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?auto=format&fit=crop&w=600&q=80', alt: 'Sac de café Kaisen Coffee' },
  { src: 'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?auto=format&fit=crop&w=600&q=80', alt: 'Latte art sur une tasse Kaisen' },
  { src: 'https://images.unsplash.com/photo-1518057111178-44a106bad636?auto=format&fit=crop&w=600&q=80', alt: 'Plantation de café à l’aube' },
];

export function InstagramFeed() {
  return (
    <Section aria-labelledby="insta-title">
      <div className="mb-8 text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-caramel">Suivez-nous</p>
        <h2 id="insta-title" className="mt-3 font-display text-3xl sm:text-4xl">
          @kaisencoffee
        </h2>
        <a
          href={BRAND.contact.instagramUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-3 inline-flex items-center gap-2 text-sm text-espresso/65 hover:text-caramel"
        >
          <Instagram className="h-4 w-4" aria-hidden="true" />
          Voir le profil complet
        </a>
      </div>

      <ul className="grid grid-cols-3 gap-2 sm:gap-3 lg:grid-cols-6">
        {PHOTOS.map((p, i) => (
          <li key={i}>
            <a
              href={BRAND.contact.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative block overflow-hidden rounded-xl"
              style={{ aspectRatio: '1 / 1' }}
            >
              <img
                src={p.src}
                alt={p.alt}
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <span className="absolute inset-0 grid place-items-center bg-espresso/0 text-cream opacity-0 transition-all duration-300 group-hover:bg-espresso/50 group-hover:opacity-100">
                <Instagram className="h-5 w-5" aria-hidden="true" />
              </span>
            </a>
          </li>
        ))}
      </ul>
    </Section>
  );
}