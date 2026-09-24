import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, Truck, X } from 'lucide-react';
import { cn } from '@/lib/cn';
import { BRAND } from '@/lib/config';
import { formatPrice } from '@/lib/format';
import { useLockBodyScroll } from '@/hooks/useLockBodyScroll';
import { useCart } from '@/store/CartContext';
import { useUI } from '@/store/UIContext';
import { Button } from '@/components/ui/Button';
import { EmptyState } from '@/components/ui/EmptyState';
import { CartLine } from './CartLine';

export function CartDrawer() {
  const { cartOpen, closeCart } = useUI();
  const { lines, subtotal, discount, shipping, total, itemCount, freeShippingRemaining } = useCart();
  useLockBodyScroll(cartOpen);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeCart();
    };
    if (cartOpen) window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [cartOpen, closeCart]);

  const freeProgress = Math.min(
    100,
    Math.round(((BRAND.shipping.freeThreshold - freeShippingRemaining) / BRAND.shipping.freeThreshold) * 100),
  );

  return (
    <div
      className={cn(
        'fixed inset-0 z-[90] transition-opacity duration-300',
        cartOpen ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0',
      )}
      aria-hidden={!cartOpen}
    >
      <div className="absolute inset-0 bg-espresso/55 backdrop-blur-sm" onClick={closeCart} />

      <aside
        role="dialog"
        aria-modal="true"
        aria-label="Panier"
        className={cn(
          'absolute inset-y-0 right-0 flex w-full max-w-md flex-col bg-cream shadow-deep transition-transform duration-400 ease-premium',
          cartOpen ? 'translate-x-0' : 'translate-x-full',
        )}
      >
        <header className="flex items-center justify-between border-b border-espresso/10 px-5 py-4">
          <div className="flex items-center gap-2">
            <ShoppingBag className="h-5 w-5 text-caramel" aria-hidden="true" />
            <h2 className="font-display text-lg font-bold text-espresso">
              Panier{itemCount > 0 && <span className="ml-2 text-sm font-normal text-espresso/55">({itemCount})</span>}
            </h2>
          </div>
          <button
            type="button"
            onClick={closeCart}
            aria-label="Fermer le panier"
            className="grid h-10 w-10 place-items-center rounded-full text-espresso transition-colors hover:bg-espresso/8"
          >
            <X className="h-5 w-5" aria-hidden="true" />
          </button>
        </header>

        {lines.length === 0 ? (
          <div className="flex flex-1 items-center justify-center p-6">
            <EmptyState
              icon={<ShoppingBag className="h-6 w-6" aria-hidden="true" />}
              title="Votre panier est vide"
              description="Découvrez nos cafés torréfiés en petits lots."
              action={
                <Button to="/shop" variant="primary" onClick={closeCart}>
                  Découvrir la boutique
                </Button>
              }
            />
          </div>
        ) : (
          <>
            {freeShippingRemaining > 0 && (
              <div className="border-b border-espresso/10 bg-beige/50 px-5 py-3 text-xs text-espresso/75">
                <div className="flex items-center gap-2">
                  <Truck className="h-4 w-4 text-caramel" aria-hidden="true" />
                  <span>
                    Plus que <strong>{formatPrice(freeShippingRemaining)}</strong> pour la livraison offerte.
                  </span>
                </div>
                <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-espresso/10">
                  <div
                    className="h-full rounded-full bg-caramel transition-all duration-500"
                    style={{ width: `${freeProgress}%` }}
                  />
                </div>
              </div>
            )}

            <div className="flex-1 overflow-y-auto px-5 py-5">
              <ul className="flex flex-col gap-5">
                {lines.map((line) => (
                  <li key={`${line.productId}-${line.variantId}`}>
                    <CartLine line={line} />
                  </li>
                ))}
              </ul>
            </div>

            <footer className="border-t border-espresso/10 bg-warm-white/70 px-5 py-5">
              <dl className="space-y-1.5 text-sm">
                <div className="flex items-center justify-between text-espresso/75">
                  <dt>Sous-total</dt>
                  <dd>{formatPrice(subtotal)}</dd>
                </div>
                {discount > 0 && (
                  <div className="flex items-center justify-between text-caramel">
                    <dt>Réduction</dt>
                    <dd>− {formatPrice(discount)}</dd>
                  </div>
                )}
                <div className="flex items-center justify-between text-espresso/75">
                  <dt>Livraison</dt>
                  <dd>{shipping === 0 ? 'Offerte' : formatPrice(shipping)}</dd>
                </div>
                <div className="mt-3 flex items-baseline justify-between border-t border-espresso/10 pt-3">
                  <dt className="font-display text-base font-bold text-espresso">Total</dt>
                  <dd className="font-display text-xl font-bold text-espresso">{formatPrice(total)}</dd>
                </div>
              </dl>

              <div className="mt-4 flex flex-col gap-2">
                <Button to="/checkout" variant="primary" fullWidth onClick={closeCart}>
                  Passer commande
                </Button>
                <Link
                  to="/cart"
                  onClick={closeCart}
                  className="text-center text-xs text-espresso/60 underline-offset-4 hover:text-caramel hover:underline"
                >
                  Voir le panier détaillé
                </Link>
              </div>
            </footer>
          </>
        )}
      </aside>
    </div>
  );
}