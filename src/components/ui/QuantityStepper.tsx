import { Minus, Plus } from 'lucide-react';
import { cn } from '@/lib/cn';

interface QuantityStepperProps {
  value: number;
  min?: number;
  max?: number;
  onChange: (value: number) => void;
  className?: string;
  size?: 'sm' | 'md';
}

export function QuantityStepper({
  value,
  min = 1,
  max = 99,
  onChange,
  className,
  size = 'md',
}: QuantityStepperProps) {
  const dim = size === 'sm' ? 'h-9 w-9' : 'h-11 w-11';
  const text = size === 'sm' ? 'text-sm' : 'text-base';

  const dec = () => onChange(Math.max(min, value - 1));
  const inc = () => onChange(Math.min(max, value + 1));

  return (
    <div
      className={cn(
        'inline-flex items-center rounded-full border border-espresso/15 bg-warm-white',
        className,
      )}
    >
      <button
        type="button"
        onClick={dec}
        disabled={value <= min}
        aria-label="Diminuer la quantité"
        className={cn(
          'grid place-items-center rounded-full text-espresso/70 transition-colors hover:bg-espresso/5 disabled:opacity-30',
          dim,
        )}
      >
        <Minus className="h-4 w-4" aria-hidden="true" />
      </button>
      <span
        className={cn(
          'min-w-[2ch] select-none px-2 text-center font-medium tabular-nums',
          text,
        )}
        aria-live="polite"
      >
        {value}
      </span>
      <button
        type="button"
        onClick={inc}
        disabled={value >= max}
        aria-label="Augmenter la quantité"
        className={cn(
          'grid place-items-center rounded-full text-espresso/70 transition-colors hover:bg-espresso/5 disabled:opacity-30',
          dim,
        )}
      >
        <Plus className="h-4 w-4" aria-hidden="true" />
      </button>
    </div>
  );
}