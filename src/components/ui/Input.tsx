import { forwardRef, type InputHTMLAttributes, type ReactNode } from 'react';
import { cn } from '@/lib/cn';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  hint?: string;
  error?: string;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  { label, hint, error, leftIcon, rightIcon, className, id, ...rest },
  ref,
) {
  const inputId = id ?? rest.name ?? `input-${Math.random().toString(36).slice(2, 8)}`;
  const describedBy = error ? `${inputId}-error` : hint ? `${inputId}-hint` : undefined;

  return (
    <div className="w-full">
      {label && (
        <label
          htmlFor={inputId}
          className="mb-1.5 block text-sm font-medium text-espresso/85"
        >
          {label}
        </label>
      )}
      <div
        className={cn(
          'flex items-center gap-2 rounded-xl border bg-warm-white px-3.5 transition-all duration-200',
          'focus-within:border-caramel focus-within:ring-2 focus-within:ring-caramel/20',
          error ? 'border-red-400' : 'border-espresso/12',
          className,
        )}
      >
        {leftIcon && <span className="text-espresso/50">{leftIcon}</span>}
        <input
          ref={ref}
          id={inputId}
          aria-invalid={!!error}
          aria-describedby={describedBy}
          className="h-12 w-full bg-transparent text-[15px] text-espresso placeholder:text-espresso/40 focus:outline-none"
          {...rest}
        />
        {rightIcon && <span className="text-espresso/50">{rightIcon}</span>}
      </div>
      {error ? (
        <p id={`${inputId}-error`} className="mt-1.5 text-xs text-red-700">
          {error}
        </p>
      ) : hint ? (
        <p id={`${inputId}-hint`} className="mt-1.5 text-xs text-espresso/55">
          {hint}
        </p>
      ) : null}
    </div>
  );
});