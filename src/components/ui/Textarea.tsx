import { forwardRef, type TextareaHTMLAttributes } from 'react';
import { cn } from '@/lib/cn';

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  hint?: string;
  error?: string;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(function Textarea(
  { label, hint, error, className, id, ...rest },
  ref,
) {
  const inputId = id ?? rest.name ?? `textarea-${Math.random().toString(36).slice(2, 8)}`;

  return (
    <div className="w-full">
      {label && (
        <label htmlFor={inputId} className="mb-1.5 block text-sm font-medium text-espresso/85">
          {label}
        </label>
      )}
      <textarea
        ref={ref}
        id={inputId}
        aria-invalid={!!error}
        className={cn(
          'min-h-[120px] w-full rounded-xl border bg-warm-white px-3.5 py-3 text-[15px] text-espresso placeholder:text-espresso/40',
          'focus:border-caramel focus:outline-none focus:ring-2 focus:ring-caramel/20',
          error ? 'border-red-400' : 'border-espresso/12',
          className,
        )}
        {...rest}
      />
      {error ? (
        <p className="mt-1.5 text-xs text-red-700">{error}</p>
      ) : hint ? (
        <p className="mt-1.5 text-xs text-espresso/55">{hint}</p>
      ) : null}
    </div>
  );
});