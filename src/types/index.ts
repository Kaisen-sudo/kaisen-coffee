export type ProductCategory =
  | 'espresso'
  | 'filter'
  | 'single-origin'
  | 'blend'
  | 'decaf'
  | 'cold-brew'
  | 'accessories'
  | 'gift';

export type ProductBadge = 'best-seller' | 'new' | 'premium' | 'reserve' | 'sale';

export type RoastLevel = 'light' | 'medium' | 'medium-dark' | 'dark';

export interface ProductImage {
  src: string;
  alt: string;
}

export interface ProductVariant {
  id: string;
  label: string;     // e.g. "250 g" / "500 g" / "1 kg"
  weight: number;    // grams
  price: number;     // HTG
  oldPrice?: number;
  stock: number;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  shortDescription: string;
  longDescription: string;

  price: number;
  oldPrice?: number;
  category: ProductCategory;
  origin: string;
  roast: RoastLevel;
  intensity: number;      // 1..10
  notes: string[];        // aromatic notes
  brewMethods: string[];  // espresso, V60, French press...

  images: ProductImage[];
  variants: ProductVariant[];

  rating: number;
  reviewsCount: number;

  stock: number;
  badge?: ProductBadge;
  available: boolean;
  featured?: boolean;
}

export interface Category {
  id: ProductCategory;
  slug: string;
  name: string;
  tagline: string;
  image: ProductImage;
  productCount: number;
}

export interface Testimonial {
  id: string;
  name: string;
  city: string;
  rating: number;      // 1..5
  message: string;
  avatar?: string;
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  cover: ProductImage;
  category: string;
  author: string;
  publishedAt: string; // ISO
  readMinutes: number;
  content: string[];   // paragraphs
}

export interface FaqItem {
  id: string;
  category: 'commandes' | 'livraison' | 'paiement' | 'retours' | 'conservation' | 'preparation' | 'abonnement';
  question: string;
  answer: string;
}

export interface CartLine {
  productId: string;
  variantId: string;
  slug: string;
  name: string;
  variantLabel: string;
  image: string;
  unitPrice: number;
  quantity: number;
}

export interface ShippingMethod {
  id: 'standard' | 'express' | 'pickup';
  label: string;
  description: string;
  price: number;
  estimate: string;
}

export interface CustomerInfo {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
}

export interface Address {
  line1: string;
  line2?: string;
  city: string;
  department: string;
  postalCode?: string;
  country: string;
}

export interface OrderSummary {
  id: string;
  createdAt: string;
  lines: CartLine[];
  subtotal: number;
  shipping: number;
  discount: number;
  total: number;
  promoCode?: string;
  shippingMethod: ShippingMethod['id'];
  customer: CustomerInfo;
  address: Address;
}