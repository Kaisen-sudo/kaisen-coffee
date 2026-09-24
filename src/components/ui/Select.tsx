import { forwardRef, type SelectHTMLAttributes } from 'react';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/lib/cn';

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(function Select(
  { label, className, id, children, ...rest },
  ref,
) {
  const inputId = id ?? rest.name ?? `select-${Math.random().toString(36).slice(2, 8)}`;

  return (
    <div className="w-full">
      {label && (
        <label htmlFor={inputId} className="mb-1.5 block text-sm font-medium text-espresso/85">
          {label}
        </label>
      )}
      <div className="relative">
        <select
          ref={ref}
          id={inputId}
          className={cn(
            'h-12 w-full appearance-none rounded-xl border border-espresso/12 bg-warm-white px-3.5 pr-10 text-[15px] text-espresso',
            'focus:border-caramel focus:outline-none focus:ring-2 focus:ring-caramel/20',
            className,
          )}
          {...rest}
        >
          {children}
        </select>
        <ChevronDown
          aria-hidden="true"
          className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-espresso/50"
        />
      </div>
    </div>
  );
});