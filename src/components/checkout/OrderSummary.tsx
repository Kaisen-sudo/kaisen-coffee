import { formatPrice } from '@/lib/format';
import { useCart } from '@/store/CartContext';
import { cn } from '@/lib/cn';

interface OrderSummaryProps {
  className?: string;
  showShipping?: boolean;
}

export function OrderSummary({ className, showShipping = true }: OrderSummaryProps) {
  const { lines, subtotal, discount, shipping, total, promoCode } = useCart();

  return (
    <aside
      className={cn(
        'rounded-2xl border border-espresso/10 bg-warm-white/85 p-5 backdrop-blur-xl sm:p-6',
        className,
      )}
      aria-label="Récapitulatif de commande"
    >
      <h2 className="font-display text-lg font-bold text-espresso">Récapitulatif</h2>

      <ul className="mt-4 space-y-3">
        {lines.map((line) => (
          <li key={`${line.productId}-${line.variantId}`} className="flex items-start gap-3">
            <img
              src={line.image}
              alt={line.name}
              loading="lazy"
              className="h-14 w-14 shrink-0 rounded-xl object-cover"
            />
            <div className="min-w-0 flex-1">
              <p className="line-clamp-1 text-sm font-medium text-espresso">{line.name}</p>
              <p className="text-xs text-espresso/55">
                {line.variantLabel} · ×{line.quantity}
              </p>
            </div>
            <span className="shrink-0 text-sm font-medium text-espresso">
              {formatPrice(line.unitPrice * line.quantity)}
            </span>
          </li>
        ))}
      </ul>

      <dl className="mt-5 space-y-2 border-t border-espresso/10 pt-4 text-sm">
        <div className="flex items-center justify-between text-espresso/75">
          <dt>Sous-total</dt>
          <dd>{formatPrice(subtotal)}</dd>
        </div>
        {discount > 0 && (
          <div className="flex items-center justify-between text-caramel">
            <dt>Réduction {promoCode && <span className="ml-1 text-xs">({promoCode})</span>}</dt>
            <dd>− {formatPrice(discount)}</dd>
          </div>
        )}
        {showShipping && (
          <div className="flex items-center justify-between text-espresso/75">
            <dt>Livraison</dt>
            <dd>{shipping === 0 ? 'Offerte' : formatPrice(shipping)}</dd>
          </div>
        )}
        <div className="mt-3 flex items-baseline justify-between border-t border-espresso/10 pt-3">
          <dt className="font-display text-base font-bold text-espresso">Total</dt>
          <dd className="font-display text-xl font-bold text-espresso">{formatPrice(total)}</dd>
        </div>
      </dl>
    </aside>
  );
}