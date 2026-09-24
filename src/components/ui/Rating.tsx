import { Star } from 'lucide-react';
import { cn } from '@/lib/cn';

interface RatingProps {
  value: number;
  reviews?: number;
  size?: 'sm' | 'md';
  className?: string;
  showValue?: boolean;
}

export function Rating({ value, reviews, size = 'sm', className, showValue = true }: RatingProps) {
  const starSize = size === 'sm' ? 'h-3.5 w-3.5' : 'h-4 w-4';
  const rounded = Math.round(value);

  return (
    <div className={cn('inline-flex items-center gap-1.5', className)}>
      <div
        className="inline-flex items-center gap-0.5 text-gold"
        aria-label={`Note ${value.toFixed(1)} sur 5`}
        role="img"
      >
        {[1, 2, 3, 4, 5].map((i) => (
          <Star
            key={i}
            aria-hidden="true"
            className={cn(starSize, i <= rounded ? 'fill-current' : 'opacity-30')}
          />
        ))}
      </div>
      {showValue && (
        <span className={cn('text-espresso/65', size === 'sm' ? 'text-xs' : 'text-sm')}>
          {value.toFixed(1)}
          {typeof reviews === 'number' && ` · ${reviews}`}
        </span>
      )}
    </div>
  );
}