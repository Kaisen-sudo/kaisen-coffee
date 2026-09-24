import type { Product, ProductVariant } from '@/types';

/**
 * Demo catalogue — prices in HTG (G).
 * These are fictional data, for demonstration only.
 */

const v = (
  id: string,
  label: string,
  weight: number,
  price: number,
  stock: number,
  oldPrice?: number,
): ProductVariant => ({ id, label, weight, price, stock, oldPrice });

export const PRODUCTS: Product[] = [
  {
    id: 'p-signature-espresso',
    slug: 'kaisen-signature-espresso',
    name: 'Kaisen Signature Espresso',
    shortDescription: 'Torréfaction foncée, équilibrée et intense.',
    longDescription:
      "Notre signature. Un blend Brésil / Colombie torréfié foncé, pensé pour l'espresso mais aussi excellent en moka. Corps rond, amertume noble, finale cacaotée persistante. La crema est dense, couleur noisette.",
    price: 1850,
    oldPrice: 2200,
    category: 'espresso',
    origin: 'Brésil · Colombie',
    roast: 'dark',
    intensity: 9,
    notes: ['Cacao amer', 'Noisette grillée', 'Caramel'],
    brewMethods: ['Espresso', 'Moka', 'French press'],
    images: [
      { src: 'https://images.unsplash.com/photo-1611854779393-1b2da9d400fe?auto=format&fit=crop&w=1200&q=80', alt: 'Sachet Kaisen Signature Espresso' },
      { src: 'https://images.unsplash.com/photo-1510707577719-ae7c14805e3a?auto=format&fit=crop&w=1200&q=80', alt: 'Extraction espresso Signature' },
      { src: 'https://images.unsplash.com/photo-1497935586351-b67a49e012bf?auto=format&fit=crop&w=1200&q=80', alt: 'Tasse d’espresso sur marbre' },
    ],
    variants: [
      v('p-signature-espresso-250', '250 g', 250, 1850, 42, 2200),
      v('p-signature-espresso-500', '500 g', 500, 3350, 24),
      v('p-signature-espresso-1kg', '1 kg', 1000, 6200, 8),
    ],
    rating: 4.8,
    reviewsCount: 124,
    stock: 74,
    badge: 'best-seller',
    available: true,
    featured: true,
  },
  {
    id: 'p-house-blend',
    slug: 'kaisen-house-blend',
    name: 'Kaisen House Blend',
    shortDescription: 'Le quotidien, sublimé.',
    longDescription:
      "Notre blend maison : 70 % Brésil, 30 % Éthiopie. Une torréfaction médium qui préserve la douceur du chocolat au lait et laisse apparaître une pointe fruitée en fin de tasse. Idéal pour la journée entière.",
    price: 1650,
    category: 'blend',
    origin: 'Brésil · Éthiopie',
    roast: 'medium',
    intensity: 7,
    notes: ['Chocolat au lait', 'Amande', 'Fruits rouges'],
    brewMethods: ['Espresso', 'V60', 'French press'],
    images: [
      { src: 'https://images.unsplash.com/photo-1587734195503-904fca47e0e9?auto=format&fit=crop&w=1200&q=80', alt: 'Sachet Kaisen House Blend' },
      { src: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=1200&q=80', alt: 'Tasse de café filtre House Blend' },
    ],
    variants: [
      v('p-house-blend-250', '250 g', 250, 1650, 61),
      v('p-house-blend-500', '500 g', 500, 2950, 32),
    ],
    rating: 4.7,
    reviewsCount: 312,
    stock: 93,
    badge: 'best-seller',
    available: true,
    featured: true,
  },
  {
    id: 'p-ethiopia',
    slug: 'ethiopia-single-origin',
    name: 'Ethiopia Single Origin',
    shortDescription: 'Floral, vif, éclatant.',
    longDescription:
      "Un Yirgacheffe lavé, cultivé à 1 900 m. Une explosion florale : jasmin, bergamote, pêche blanche. Acidité vive mais soyeuse, corps délicat. À préparer en filtre pour en révéler toutes les nuances.",
    price: 2450,
    category: 'single-origin',
    origin: 'Yirgacheffe, Éthiopie',
    roast: 'light',
    intensity: 6,
    notes: ['Jasmin', 'Bergamote', 'Pêche blanche'],
    brewMethods: ['V60', 'Chemex', 'Aeropress'],
    images: [
      { src: 'https://images.unsplash.com/photo-1595246140625-573b715d11dc?auto=format&fit=crop&w=1200&q=80', alt: 'Sachet Ethiopia Single Origin' },
      { src: 'https://images.unsplash.com/photo-1518057111178-44a106bad636?auto=format&fit=crop&w=1200&q=80', alt: 'Tasse de café éthiopien clair' },
    ],
    variants: [
      v('p-ethiopia-200', '200 g', 200, 2450, 28),
      v('p-ethiopia-500', '500 g', 500, 5250, 12),
    ],
    rating: 4.9,
    reviewsCount: 87,
    stock: 40,
    badge: 'new',
    available: true,
    featured: true,
  },
  {
    id: 'p-colombia',
    slug: 'colombia-reserve',
    name: 'Colombia Reserve',
    shortDescription: 'Rond, sucré, élégant.',
    longDescription:
      "Un Huila lavé, cultivé par une coopérative de petits producteurs. Sucrosité prononcée, finale cacaotée, acidité équilibrée. Un café élégant qui plaît à tous les palais.",
    price: 2300,
    category: 'single-origin',
    origin: 'Huila, Colombie',
    roast: 'medium',
    intensity: 7,
    notes: ['Caramel', 'Pomme rouge', 'Cacao'],
    brewMethods: ['Espresso', 'V60', 'French press'],
    images: [
      { src: 'https://images.unsplash.com/photo-1559525839-b184a4d698c7?auto=format&fit=crop&w=1200&q=80', alt: 'Sachet Colombia Reserve' },
      { src: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=1200&q=80', alt: 'Tasse de café colombien' },
    ],
    variants: [
      v('p-colombia-250', '250 g', 250, 2300, 34),
      v('p-colombia-500', '500 g', 500, 4400, 18),
    ],
    rating: 4.8,
    reviewsCount: 156,
    stock: 52,
    badge: 'premium',
    available: true,
    featured: true,
  },
  {
    id: 'p-midnight',
    slug: 'midnight-roast',
    name: 'Midnight Roast',
    shortDescription: "Pour les amateurs d'intensité.",
    longDescription:
      "Torréfaction poussée à la limite : notes de réglisse, cacao 70 %, bois de cèdre. Un café profond, presque tellurique, pour les palais qui cherchent la puissance.",
    price: 1950,
    category: 'espresso',
    origin: 'Sumatra · Brésil',
    roast: 'dark',
    intensity: 10,
    notes: ['Réglisse', 'Cacao 70 %', 'Bois de cèdre'],
    brewMethods: ['Espresso', 'Moka'],
    images: [
      { src: 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?auto=format&fit=crop&w=1200&q=80', alt: 'Sachet Midnight Roast' },
    ],
    variants: [
      v('p-midnight-250', '250 g', 250, 1950, 22),
    ],
    rating: 4.6,
    reviewsCount: 98,
    stock: 22,
    available: true,
  },
  {
    id: 'p-golden',
    slug: 'golden-roast',
    name: 'Golden Roast',
    shortDescription: 'Torréfaction claire, lumineuse.',
    longDescription:
      "Un blend Kenya / Éthiopie torréfié très clair. Agrumes éclatants, miel, thé noir. Un café de spécialité à réserver aux méthodes douces.",
    price: 2100,
    category: 'filter',
    origin: 'Kenya · Éthiopie',
    roast: 'light',
    intensity: 4,
    notes: ['Agrumes', 'Miel', 'Thé noir'],
    brewMethods: ['V60', 'Chemex'],
    images: [
      { src: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=1200&q=80', alt: 'Sachet Golden Roast torréfaction claire' },
    ],
    variants: [
      v('p-golden-200', '200 g', 200, 2100, 19),
    ],
    rating: 4.7,
    reviewsCount: 74,
    stock: 19,
    badge: 'premium',
    available: true,
  },
  {
    id: 'p-cold-brew',
    slug: 'cold-brew-blend',
    name: 'Cold Brew Blend',
    shortDescription: "Conçu pour l'extraction à froid.",
    longDescription:
      "Un blend Brésil / Guatemala spécialement torréfié pour l'extraction à froid. Chocolat noir, cerise, canne à sucre. Parfait pour un cold brew 16 h ou un iced latte.",
    price: 1750,
    category: 'cold-brew',
    origin: 'Brésil · Guatemala',
    roast: 'medium-dark',
    intensity: 8,
    notes: ['Chocolat noir', 'Cerise', 'Canne à sucre'],
    brewMethods: ['Cold brew', 'Iced latte'],
    images: [
      { src: 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?auto=format&fit=crop&w=1200&q=80', alt: 'Sachet Cold Brew Blend' },
    ],
    variants: [
      v('p-cold-brew-250', '250 g', 250, 1750, 30),
    ],
    rating: 4.5,
    reviewsCount: 61,
    stock: 30,
    available: true,
  },
  {
    id: 'p-decaf',
    slug: 'decaf-selection',
    name: 'Decaf Selection',
    shortDescription: 'Tout le goût, sans la caféine.',
    longDescription:
      "Un Colombie décaféiné à l'eau, méthode naturelle sans solvant. Cacao, noisette, fruits secs. Idéal pour les fins de soirée et les sensibilités à la caféine.",
    price: 2000,
    category: 'decaf',
    origin: 'Huila, Colombie',
    roast: 'medium',
    intensity: 6,
    notes: ['Cacao', 'Noisette', 'Fruits secs'],
    brewMethods: ['Espresso', 'V60', 'French press'],
    images: [
      { src: 'https://images.unsplash.com/photo-1610889556528-9a770e32642f?auto=format&fit=crop&w=1200&q=80', alt: 'Sachet Decaf Selection' },
    ],
    variants: [
      v('p-decaf-250', '250 g', 250, 2000, 25),
    ],
    rating: 4.4,
    reviewsCount: 43,
    stock: 25,
    available: true,
  },
];

export const getProductBySlug = (slug: string): Product | undefined =>
  PRODUCTS.find((p) => p.slug === slug);

export const getProductById = (id: string): Product | undefined =>
  PRODUCTS.find((p) => p.id === id);

export const getFeaturedProducts = (): Product[] =>
  PRODUCTS.filter((p) => p.featured);

export const getRelatedProducts = (product: Product, limit = 4): Product[] =>
  PRODUCTS.filter((p) => p.id !== product.id && p.category === product.category)
    .concat(PRODUCTS.filter((p) => p.id !== product.id && p.category !== product.category))
    .slice(0, limit);

export const getBestSellers = (limit = 4): Product[] =>
  PRODUCTS.filter((p) => p.badge === 'best-seller')
    .concat(PRODUCTS.filter((p) => p.badge !== 'best-seller'))
    .slice(0, limit);