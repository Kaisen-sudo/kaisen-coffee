import { Check } from 'lucide-react';
import { cn } from '@/lib/cn';

export interface CheckoutStep {
  id: string;
  label: string;
}

interface CheckoutStepsProps {
  steps: CheckoutStep[];
  current: number;
  className?: string;
}

export function CheckoutSteps({ steps, current, className }: CheckoutStepsProps) {
  return (
    <ol className={cn('flex items-center gap-2 sm:gap-4', className)} aria-label="Étapes du paiement">
      {steps.map((step, idx) => {
        const state = idx < current ? 'done' : idx === current ? 'current' : 'upcoming';
        return (
          <li key={step.id} className="flex flex-1 items-center gap-2">
            <div
              aria-current={state === 'current' ? 'step' : undefined}
              className={cn(
                'grid h-8 w-8 shrink-0 place-items-center rounded-full border text-xs font-semibold transition-colors',
                state === 'done' && 'border-caramel bg-caramel text-white',
                state === 'current' && 'border-espresso bg-espresso text-cream',
                state === 'upcoming' && 'border-espresso/20 bg-transparent text-espresso/40',
              )}
            >
              {state === 'done' ? <Check className="h-4 w-4" aria-hidden="true" /> : idx + 1}
            </div>
            <span
              className={cn(
                'hidden text-xs font-medium sm:inline',
                state === 'upcoming' ? 'text-espresso/40' : 'text-espresso',
              )}
            >
              {step.label}
            </span>
            {idx < steps.length - 1 && (
              <span
                aria-hidden="true"
                className={cn(
                  'ml-1 h-px flex-1 transition-colors',
                  idx < current ? 'bg-caramel' : 'bg-espresso/15',
                )}
              />
            )}
          </li>
        );
      })}
    </ol>
  );
}