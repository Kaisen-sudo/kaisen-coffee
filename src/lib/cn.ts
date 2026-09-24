type ClassValue =
  | string
  | number
  | null
  | undefined
  | false
  | ClassValue[]
  | { [key: string]: boolean | undefined | null };

/**
 * Minimal, dependency-free className combiner.
 * (Avoids pulling in clsx/tailwind-merge for a boutique of this size.)
 */
export function cn(...inputs: ClassValue[]): string {
  const out: string[] = [];

  const walk = (v: ClassValue) => {
    if (!v) return;
    if (typeof v === 'string' || typeof v === 'number') {
      out.push(String(v));
      return;
    }
    if (Array.isArray(v)) {
      v.forEach(walk);
      return;
    }
    if (typeof v === 'object') {
      for (const key in v) {
        if (v[key]) out.push(key);
      }
    }
  };

  inputs.forEach(walk);
  return out.join(' ');
}