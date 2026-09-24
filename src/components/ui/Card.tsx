import type { HTMLAttributes, ReactNode } from 'react';
import { cn } from '@/lib/cn';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  variant?: 'solid' | 'glass' | 'dark';
  interactive?: boolean;
}

export function Card({
  children,
  variant = 'solid',
  interactive = false,
  className,
  ...rest
}: CardProps) {
  return (
    <div
      className={cn(
        'rounded-2xl',
        variant === 'solid' && 'bg-warm-white border border-espresso/8 shadow-soft',
        variant === 'glass' && 'glass-card',
        variant === 'dark' && 'glass-dark text-cream',
        interactive &&
          'transition-all duration-400 ease-premium hover:-translate-y-1 hover:shadow-deep',
        className,
      )}
      {...rest}
    >
      {children}
    </div>
  );
}