import { cn } from '@/lib/cn';

interface SkeletonProps {
  className?: string;
  rounded?: 'sm' | 'md' | 'lg' | 'full';
}

export function Skeleton({ className, rounded = 'md' }: SkeletonProps) {
  const roundedMap = {
    sm: 'rounded-md',
    md: 'rounded-xl',
    lg: 'rounded-2xl',
    full: 'rounded-full',
  } as const;

  return (
    <div
      aria-hidden="true"
      className={cn(
        'animate-shimmer bg-[linear-gradient(90deg,rgba(36,26,22,0.05)_0%,rgba(36,26,22,0.10)_50%,rgba(36,26,22,0.05)_100%)] bg-[length:200%_100%]',
        roundedMap[rounded],
        className,
      )}
    />
  );
}