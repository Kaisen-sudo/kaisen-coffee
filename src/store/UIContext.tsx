import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from 'react';

export type ToastVariant = 'success' | 'error' | 'info';

export interface Toast {
  id: string;
  message: string;
  variant: ToastVariant;
}

interface UIContextValue {
  // Drawers / overlays
  cartOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  searchOpen: boolean;
  openSearch: () => void;
  closeSearch: () => void;
  mobileMenuOpen: boolean;
  openMobileMenu: () => void;
  closeMobileMenu: () => void;

  // Toasts
  toasts: Toast[];
  pushToast: (message: string, variant?: ToastVariant) => void;
  dismissToast: (id: string) => void;
}

const UIContext = createContext<UIContextValue | null>(null);

export function UIProvider({ children }: { children: ReactNode }) {
  const [cartOpen, setCartOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [toasts, setToasts] = useState<Toast[]>([]);

  const openCart = useCallback(() => {
    setCartOpen(true);
    setMobileMenuOpen(false);
  }, []);
  const closeCart = useCallback(() => setCartOpen(false), []);

  const openSearch = useCallback(() => {
    setSearchOpen(true);
    setMobileMenuOpen(false);
  }, []);
  const closeSearch = useCallback(() => setSearchOpen(false), []);

  const openMobileMenu = useCallback(() => {
    setMobileMenuOpen(true);
    setSearchOpen(false);
  }, []);
  const closeMobileMenu = useCallback(() => setMobileMenuOpen(false), []);

  const dismissToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const pushToast = useCallback(
    (message: string, variant: ToastVariant = 'success') => {
      const id = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
      setToasts((prev) => [...prev, { id, message, variant }]);
      window.setTimeout(() => dismissToast(id), 3400);
    },
    [dismissToast],
  );

  const value = useMemo<UIContextValue>(
    () => ({
      cartOpen,
      openCart,
      closeCart,
      searchOpen,
      openSearch,
      closeSearch,
      mobileMenuOpen,
      openMobileMenu,
      closeMobileMenu,
      toasts,
      pushToast,
      dismissToast,
    }),
    [
      cartOpen,
      openCart,
      closeCart,
      searchOpen,
      openSearch,
      closeSearch,
      mobileMenuOpen,
      openMobileMenu,
      closeMobileMenu,
      toasts,
      pushToast,
      dismissToast,
    ],
  );

  return <UIContext.Provider value={value}>{children}</UIContext.Provider>;
}

export function useUI(): UIContextValue {
  const ctx = useContext(UIContext);
  if (!ctx) throw new Error('useUI must be used within <UIProvider>');
  return ctx;
}