import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useReducer,
  type ReactNode,
} from 'react';
import type { CartLine, Product, ProductVariant, ShippingMethod } from '@/types';
import { BRAND } from '@/lib/config';

const STORAGE_KEY = 'kaisen.cart.v1';
const PROMO_KEY = 'kaisen.cart.promo.v1';

/* ---------------- Types ---------------- */

interface CartState {
  lines: CartLine[];
  promoCode: string | null;
  shippingMethod: ShippingMethod['id'];
}

type CartAction =
  | { type: 'ADD'; line: CartLine }
  | { type: 'REMOVE'; productId: string; variantId: string }
  | { type: 'INCREMENT'; productId: string; variantId: string }
  | { type: 'DECREMENT'; productId: string; variantId: string }
  | { type: 'SET_QTY'; productId: string; variantId: string; quantity: number }
  | { type: 'CLEAR' }
  | { type: 'SET_PROMO'; code: string | null }
  | { type: 'SET_SHIPPING'; method: ShippingMethod['id'] }
  | { type: 'HYDRATE'; state: CartState };

/* ---------------- Reducer ---------------- */

const initialState: CartState = {
  lines: [],
  promoCode: null,
  shippingMethod: 'standard',
};

function reducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case 'HYDRATE':
      return action.state;

    case 'ADD': {
      const existing = state.lines.find(
        (l) => l.productId === action.line.productId && l.variantId === action.line.variantId,
      );
      if (existing) {
        return {
          ...state,
          lines: state.lines.map((l) =>
            l.productId === action.line.productId && l.variantId === action.line.variantId
              ? { ...l, quantity: l.quantity + action.line.quantity }
              : l,
          ),
        };
      }
      return { ...state, lines: [...state.lines, action.line] };
    }

    case 'REMOVE':
      return {
        ...state,
        lines: state.lines.filter(
          (l) => !(l.productId === action.productId && l.variantId === action.variantId),
        ),
      };

    case 'INCREMENT':
      return {
        ...state,
        lines: state.lines.map((l) =>
          l.productId === action.productId && l.variantId === action.variantId
            ? { ...l, quantity: l.quantity + 1 }
            : l,
        ),
      };

    case 'DECREMENT':
      return {
        ...state,
        lines: state.lines
          .map((l) =>
            l.productId === action.productId && l.variantId === action.variantId
              ? { ...l, quantity: l.quantity - 1 }
              : l,
          )
          .filter((l) => l.quantity > 0),
      };

    case 'SET_QTY':
      return {
        ...state,
        lines: state.lines
          .map((l) =>
            l.productId === action.productId && l.variantId === action.variantId
              ? { ...l, quantity: Math.max(0, action.quantity) }
              : l,
          )
          .filter((l) => l.quantity > 0),
      };

    case 'CLEAR':
      return { ...state, lines: [], promoCode: null };

    case 'SET_PROMO':
      return { ...state, promoCode: action.code };

    case 'SET_SHIPPING':
      return { ...state, shippingMethod: action.method };

    default:
      return state;
  }
}

/* ---------------- Context ---------------- */

interface CartContextValue {
  lines: CartLine[];
  promoCode: string | null;
  shippingMethod: ShippingMethod['id'];
  itemCount: number;
  subtotal: number;
  shipping: number;
  discount: number;
  total: number;
  freeShippingRemaining: number;

  addItem: (product: Product, variant: ProductVariant, quantity?: number) => void;
  removeItem: (productId: string, variantId: string) => void;
  increment: (productId: string, variantId: string) => void;
  decrement: (productId: string, variantId: string) => void;
  setQuantity: (productId: string, variantId: string, quantity: number) => void;
  clear: () => void;
  applyPromo: (code: string) => { ok: boolean; message: string };
  removePromo: () => void;
  setShippingMethod: (method: ShippingMethod['id']) => void;
}

const CartContext = createContext<CartContextValue | null>(null);

/* ---------------- Provider ---------------- */

export function CartProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  // Hydrate from localStorage
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      const promo = localStorage.getItem(PROMO_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as Partial<CartState>;
        dispatch({
          type: 'HYDRATE',
          state: {
            lines: Array.isArray(parsed.lines) ? parsed.lines : [],
            promoCode: promo ?? parsed.promoCode ?? null,
            shippingMethod: parsed.shippingMethod ?? 'standard',
          },
        });
      } else if (promo) {
        dispatch({ type: 'SET_PROMO', code: promo });
      }
    } catch {
      /* ignore */
    }
  }, []);

  // Persist
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
      if (state.promoCode) localStorage.setItem(PROMO_KEY, state.promoCode);
      else localStorage.removeItem(PROMO_KEY);
    } catch {
      /* ignore */
    }
  }, [state]);

  /* ---------------- Derived values ---------------- */

  const subtotal = useMemo(
    () => state.lines.reduce((sum, l) => sum + l.unitPrice * l.quantity, 0),
    [state.lines],
  );

  const itemCount = useMemo(
    () => state.lines.reduce((sum, l) => sum + l.quantity, 0),
    [state.lines],
  );

  const discount = useMemo(() => {
    if (!state.promoCode) return 0;
    const promo = BRAND.promo.codes[state.promoCode];
    if (!promo || promo.type !== 'percent') return 0;
    return Math.round((subtotal * promo.value) / 100);
  }, [state.promoCode, subtotal]);

  const shipping = useMemo(() => {
    // Pickup is always free
    if (state.shippingMethod === 'pickup') return 0;
    // Promo shipping = free
    if (state.promoCode && BRAND.promo.codes[state.promoCode]?.type === 'shipping') return 0;
    // Free over threshold
    if (subtotal >= BRAND.shipping.freeThreshold) return 0;
    return state.shippingMethod === 'express'
      ? BRAND.shipping.expressFee
      : BRAND.shipping.standardFee;
  }, [state.shippingMethod, state.promoCode, subtotal]);

  const total = Math.max(0, subtotal - discount + shipping);

  const freeShippingRemaining = Math.max(0, BRAND.shipping.freeThreshold - subtotal);

  /* ---------------- Actions ---------------- */

  const addItem = useCallback(
    (product: Product, variant: ProductVariant, quantity = 1) => {
      const line: CartLine = {
        productId: product.id,
        variantId: variant.id,
        slug: product.slug,
        name: product.name,
        variantLabel: variant.label,
        image: product.images[0]?.src ?? '',
        unitPrice: variant.price,
        quantity,
      };
      dispatch({ type: 'ADD', line });
    },
    [],
  );

  const removeItem = useCallback((productId: string, variantId: string) => {
    dispatch({ type: 'REMOVE', productId, variantId });
  }, []);

  const increment = useCallback((productId: string, variantId: string) => {
    dispatch({ type: 'INCREMENT', productId, variantId });
  }, []);

  const decrement = useCallback((productId: string, variantId: string) => {
    dispatch({ type: 'DECREMENT', productId, variantId });
  }, []);

  const setQuantity = useCallback((productId: string, variantId: string, quantity: number) => {
    dispatch({ type: 'SET_QTY', productId, variantId, quantity });
  }, []);

  const clear = useCallback(() => dispatch({ type: 'CLEAR' }), []);

  const applyPromo = useCallback((code: string) => {
    const normalized = code.trim().toUpperCase();
    const promo = BRAND.promo.codes[normalized];
    if (!promo) return { ok: false, message: 'Code promo invalide.' };
    dispatch({ type: 'SET_PROMO', code: normalized });
    return { ok: true, message: promo.label };
  }, []);

  const removePromo = useCallback(() => dispatch({ type: 'SET_PROMO', code: null }), []);

  const setShippingMethod = useCallback((method: ShippingMethod['id']) => {
    dispatch({ type: 'SET_SHIPPING', method });
  }, []);

  /* ---------------- Value ---------------- */

  const value = useMemo<CartContextValue>(
    () => ({
      lines: state.lines,
      promoCode: state.promoCode,
      shippingMethod: state.shippingMethod,
      itemCount,
      subtotal,
      shipping,
      discount,
      total,
      freeShippingRemaining,
      addItem,
      removeItem,
      increment,
      decrement,
      setQuantity,
      clear,
      applyPromo,
      removePromo,
      setShippingMethod,
    }),
    [
      state.lines,
      state.promoCode,
      state.shippingMethod,
      itemCount,
      subtotal,
      shipping,
      discount,
      total,
      freeShippingRemaining,
      addItem,
      removeItem,
      increment,
      decrement,
      setQuantity,
      clear,
      applyPromo,
      removePromo,
      setShippingMethod,
    ],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart(): CartContextValue {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within <CartProvider>');
  return ctx;
}