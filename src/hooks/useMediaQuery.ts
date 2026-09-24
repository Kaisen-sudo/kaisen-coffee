import { useEffect, useState } from 'react';

export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState<boolean>(() => {
    if (typeof window === 'undefined') return false;
    return window.matchMedia(query).matches;
  });

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const mql = window.matchMedia(query);
    const handler = (e: MediaQueryListEvent) => setMatches(e.matches);

    setMatches(mql.matches);

    // Safari < 14 fallback
    if ('addEventListener' in mql) {
      mql.addEventListener('change', handler);
      return () => mql.removeEventListener('change', handler);
    } else {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (mql as any).addListener(handler);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      return () => (mql as any).removeListener(handler);
    }
  }, [query]);

  return matches;
}