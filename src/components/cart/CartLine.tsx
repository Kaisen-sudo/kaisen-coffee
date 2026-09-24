import { Link } from 'react-router-dom';
import { Trash2 } from 'lucide-react';
import type { CartLine as CartLineType } from '@/types';
import { formatPrice } from '@/lib/format';
import { QuantityStepper } from '@/components/ui/QuantityStepper';
import { useCart } from '@/store/CartContext';

interface CartLineProps {
  line: CartLineType;
  variant?: 'drawer' | 'page';
}

export function CartLine({ line, variant = 'drawer' }: CartLineProps) {
  const { increment, decrement, removeItem, setQuantity } = useCart();

  return (
    <article className="flex gap-3 sm:gap-4">
      <Link
        to={`/product/${line.slug}`}
        className="relative block h-20 w-20 shrink-0 overflow-hidden rounded-xl bg-beige sm:h-24 sm:w-24"
      >
        <img src={line.image} alt={line.name} loading="lazy" className="h-full w-full object-cover" />
      </Link>

      <div className="flex min-w-0 flex-1 flex-col">
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0">
            <Link
              to={`/product/${line.slug}`}
              className="line-clamp-2 font-display text-[15px] font-bold leading-snug text-espresso hover:text-caramel"
            >
              {line.name}
            </Link>
            <p className="mt-0.5 text-xs text-espresso/55">{line.variantLabel}</p>
          </div>
          <button
            type="button"
            onClick={() => removeItem(line.productId, line.variantId)}
            aria-label={`Retirer ${line.name} du panier`}
            className="grid h-8 w-8 shrink-0 place-items-center rounded-full text-espresso/50 transition-colors hover:bg-red-50 hover:text-red-700"
          >
            <Trash2 className="h-4 w-4" aria-hidden="true" />
          </button>
        </div>

        <div className="mt-2 flex items-center justify-between gap-2">
          <QuantityStepper
            value={line.quantity}
            min={1}
            onChange={(q) => setQuantity(line.productId, line.variantId, q)}
            size={variant === 'drawer' ? 'sm' : 'md'}
          />
          <div className="text-right">
            <p className="font-display text-sm font-bold text-espresso">
              {formatPrice(line.unitPrice * line.quantity)}
            </p>
            {line.quantity > 1 && (
              <p className="text-[11px] text-espresso/50">{formatPrice(line.unitPrice)} / u.</p>
            )}
          </div>
        </div>

        {/* a11y-only: keep increment/decrement functions used */}
        <button type="button" onClick={() => increment(line.productId, line.variantId)} className="sr-only">
          Augmenter
        </button>
        <button type="button" onClick={() => decrement(line.productId, line.variantId)} className="sr-only">
          Diminuer
        </button>
      </div>
    </article>
  );
}