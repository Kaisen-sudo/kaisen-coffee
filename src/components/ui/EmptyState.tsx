import type { ReactNode } from 'react';
import { cn } from '@/lib/cn';

interface EmptyStateProps {
  icon?: ReactNode;
  title: string;
  description?: string;
  action?: ReactNode;
  className?: string;
}

export function EmptyState({ icon, title, description, action, className }: EmptyStateProps) {
  return (
    <div
      className={cn(
        'mx-auto flex max-w-md flex-col items-center gap-4 rounded-2xl border border-espresso/10 bg-warm-white/70 px-6 py-14 text-center',
        className,
      )}
    >
      {icon && (
        <div className="grid h-14 w-14 place-items-center rounded-full bg-espresso/5 text-espresso/70">
          {icon}
        </div>
      )}
      <h3 className="font-display text-xl text-espresso">{title}</h3>
      {description && <p className="text-sm text-espresso/65">{description}</p>}
      {action && <div className="mt-2">{action}</div>}
    </div>
  );
}