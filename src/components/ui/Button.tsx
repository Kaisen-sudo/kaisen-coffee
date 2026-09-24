import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/cn';

export type ButtonVariant = 'primary' | 'accent' | 'ghost' | 'glass' | 'outline' | 'danger';
export type ButtonSize = 'sm' | 'md' | 'lg' | 'icon';

interface BaseProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  fullWidth?: boolean;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  children?: ReactNode;
  className?: string;
}

const variants: Record<ButtonVariant, string> = {
  primary:
    'bg-espresso text-cream hover:bg-[#1a1210] shadow-[0_10px_28px_-12px_rgba(36,26,22,0.7)]',
  accent:
    'bg-caramel text-white hover:bg-[#8f5934] shadow-[0_10px_28px_-12px_rgba(166,106,63,0.75)]',
  ghost:
    'bg-transparent text-espresso hover:bg-espresso/5',
  glass:
    'glass text-espresso hover:bg-white/75',
  outline:
    'border border-espresso/20 text-espresso hover:border-espresso/50 hover:bg-espresso/5',
  danger:
    'bg-red-700 text-white hover:bg-red-800',
};

const sizes: Record<ButtonSize, string> = {
  sm: 'h-10 px-4 text-sm',
  md: 'h-12 px-5 text-[15px]',
  lg: 'h-14 px-7 text-base',
  icon: 'h-11 w-11 p-0',
};

const base =
  'inline-flex items-center justify-center gap-2 rounded-full font-medium transition-all duration-300 ease-premium ' +
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-caramel focus-visible:ring-offset-2 focus-visible:ring-offset-cream ' +
  'disabled:opacity-45 disabled:pointer-events-none select-none whitespace-nowrap';

/* eslint-disable @typescript-eslint/no-explicit-any */
type ButtonAsButton = BaseProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, keyof BaseProps> & { to?: undefined; href?: undefined };

type ButtonAsLink = BaseProps & {
  to: string;
  href?: undefined;
} & Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, keyof BaseProps | 'href'>;

type ButtonAsAnchor = BaseProps & {
  href: string;
  to?: undefined;
} & Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, keyof BaseProps>;

export type ButtonProps = ButtonAsButton | ButtonAsLink | ButtonAsAnchor;

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(props, ref) {
  const {
    variant = 'primary',
    size = 'md',
    loading = false,
    fullWidth = false,
    leftIcon,
    rightIcon,
    className,
    children,
    ...rest
  } = props as any;

  const classes = cn(base, variants[variant], sizes[size], fullWidth && 'w-full', className);

  const inner = (
    <>
      {loading ? (
        <span
          aria-hidden="true"
          className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent"
        />
      ) : (
        leftIcon
      )}
      {children}
      {!loading && rightIcon}
    </>
  );

  if ('to' in props && props.to) {
    const { to, ...anchorRest } = rest;
    return (
      <Link to={to} className={classes} {...anchorRest}>
        {inner}
      </Link>
    );
  }

  if ('href' in props && props.href) {
    const { href, ...anchorRest } = rest;
    return (
      <a href={href} className={classes} {...anchorRest}>
        {inner}
      </a>
    );
  }

  return (
    <button ref={ref} className={classes} disabled={loading || (rest as any).disabled} {...rest}>
      {inner}
    </button>
  );
});