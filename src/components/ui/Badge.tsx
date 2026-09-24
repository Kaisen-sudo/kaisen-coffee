import type { ReactNode } from 'react';
import { cn } from '@/lib/cn';

export type BadgeTone = 'premium' | 'best' | 'new' | 'reserve' | 'sale' | 'muted' | 'success' | 'danger';

interface BadgeProps {
  children: ReactNode;
  tone?: BadgeTone;
  className?: string;
  size?: 'sm' | 'md';
}

const tones: Record<BadgeTone, string> = {
  premium: 'bg-gold/15 text-[#7a5f2e] border-gold/40',
  best: 'bg-caramel/15 text-caramel border-caramel/35',
  new: 'bg-espresso/10 text-espresso border-espresso/20',
  reserve: 'bg-coffee/15 text-coffee border-coffee/30',
  sale: 'bg-red-100 text-red-800 border-red-200',
  muted: 'bg-espresso/6 text-espresso/70 border-espresso/10',
  success: 'bg-emerald-100 text-emerald-800 border-emerald-200',
  danger: 'bg-red-100 text-red-800 border-red-200',
};

export function Badge({ children, tone = 'muted', className, size = 'sm' }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1 rounded-full border font-semibold uppercase tracking-wider',
        size === 'sm' ? 'px-2.5 py-1 text-[10px]' : 'px-3 py-1.5 text-xs',
        tones[tone],
        className,
      )}
    >
      {children}
    </span>
  );
}