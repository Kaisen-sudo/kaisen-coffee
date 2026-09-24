cat > src/store/WishlistContext.tsx << 'WISHLISTEOF'
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import type { Product } from '@/types';

const STORAGE_KEY = 'kaisen.wishlist.v1';

interface WishlistContextValue {
  ids: string[];
  count: number;
  has: (productId: string) => boolean;
  toggle: (product: Product) => void;
  add: (productId: string) => void;
  remove: (productId: string) => void;
  clear: () => void;
}

const WishlistContext = createContext<WishlistContextValue | null>(null);

export function WishlistProvider({ children }: { children: ReactNode }) {
  const [ids, setIds] = useState<string[]>([]);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed)) setIds(parsed.filter((x) => typeof x === 'string'));
      }
    } catch {
      /* ignore */
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(ids));
    } catch {
      /* ignore */
    }
  }, [ids]);

  const has = useCallback((productId: string) => ids.includes(productId), [ids]);

  const add = useCallback((productId: string) => {
    setIds((prev) => (prev.includes(productId) ? prev : [...prev, productId]));
  }, []);

  const remove = useCallback((productId: string) => {
    setIds((prev) => prev.filter((x) => x !== productId));
  }, []);

  const toggle = useCallback((product: Product) => {
    setIds((prev) =>
      prev.includes(product.id) ? prev.filter((x) => x !== product.id) : [...prev, product.id],
    );
  }, []);

  const clear = useCallback(() => setIds([]), []);

  const value = useMemo<WishlistContextValue>(
    () => ({ ids, count: ids.length, has, toggle, add, remove, clear }),
    [ids, has, toggle, add, remove, clear],
  );

  return <WishlistContext.Provider value={value}>{children}</WishlistContext.Provider>;
}

export function useWishlist(): WishlistContextValue {
  const ctx = useContext(WishlistContext);
  if (!ctx) throw new Error('useWishlist must be used within <WishlistProvider>');
  return ctx;
}
WISHLISTEOF
