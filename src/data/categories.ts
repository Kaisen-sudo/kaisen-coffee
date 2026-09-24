import type { Category } from '@/types';

export const CATEGORIES: Category[] = [
  {
    id: 'espresso',
    slug: 'espresso',
    name: 'Espresso',
    tagline: 'Corps, intensité, crema parfaite.',
    image: {
      src: 'https://images.unsplash.com/photo-1510707577719-ae7c14805e3a?auto=format&fit=crop&w=900&q=80',
      alt: 'Espresso en train d’être extrait dans une tasse blanche',
    },
    productCount: 3,
  },
  {
    id: 'filter',
    slug: 'filtre',
    name: 'Filtre',
    tagline: 'Clarté, douceur, précision.',
    image: {
      src: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=900&q=80',
      alt: 'Café filtre préparé en V60 avec balance',
    },
    productCount: 2,
  },
  {
    id: 'single-origin',
    slug: 'origines',
    name: 'Origines',
    tagline: 'Un terroir, une signature.',
    image: {
      src: 'https://images.unsplash.com/photo-1447933601403-0c6688de566e?auto=format&fit=crop&w=900&q=80',
      alt: 'Grains de café torréfiés en gros plan',
    },
    productCount: 3,
  },
  {
    id: 'accessories',
    slug: 'accessoires',
    name: 'Accessoires',
    tagline: 'Le geste juste, outillé.',
    image: {
      src: 'https://images.unsplash.com/photo-1521405924368-64c5b84bec60?auto=format&fit=crop&w=900&q=80',
      alt: 'Moulin à café manuel en bois et inox',
    },
    productCount: 4,
  },
];