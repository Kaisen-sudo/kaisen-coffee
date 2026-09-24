import { BRAND } from './config';

/**
 * Central price formatter — every displayed price MUST use this.
 * formatPrice(2500) → "2 500 G"
 */
export function formatPrice(amount: number): string {
  if (!Number.isFinite(amount)) return `0 ${BRAND.currency.symbol}`;

  const rounded = Math.round(amount);
  const formatted = new Intl.NumberFormat('fr-FR', {
    maximumFractionDigits: 0,
    useGrouping: true,
  })
    .format(rounded)
    // Intl uses U+202F (narrow no-break space). Force a regular non-breaking space
    // for consistent rendering across fonts.
    .replace(/\u202f/g, '\u00a0')
    .replace(/\u00a0/g, ' ');

  return `${formatted} ${BRAND.currency.symbol}`;
}

export function formatNumber(value: number): string {
  return new Intl.NumberFormat('fr-FR').format(value);
}

export function formatDate(iso: string): string {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  return new Intl.DateTimeFormat('fr-FR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(d);
}

export function slugify(input: string): string {
  return input
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

export function truncate(text: string, max = 120): string {
  if (text.length <= max) return text;
  return `${text.slice(0, max).trimEnd()}…`;
}