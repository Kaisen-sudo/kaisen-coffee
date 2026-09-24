import { cn } from '@/lib/cn';

interface CoffeeCupProps {
  className?: string;
  size?: number;
  withSteam?: boolean;
  title?: string;
}

/**
 * Kaisen Coffee — cup illustration.
 *
 * Flickering fix: only `transform` / `stroke-dashoffset` are animated.
 * No opacity, no filter, no will-change on non-composited properties.
 * GPU-friendly on Chrome / Safari / Firefox / mobile.
 */
export function CoffeeCup({
  className,
  size = 96,
  withSteam = true,
  title = 'Tasse de café Kaisen',
}: CoffeeCupProps) {
  return (
    <div
      className={cn('cup-float select-none', className)}
      style={{ width: size, height: size }}
      role="img"
      aria-label={title}
    >
      <svg
        viewBox="0 0 120 120"
        width="100%"
        height="100%"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        {withSteam && (
          <g className="cup-steam" stroke="#A66A3F" strokeWidth="2.4" strokeLinecap="round" fill="none">
            <path d="M46 28c0-4 3-6 3-10s-3-6-3-10" />
            <path d="M60 26c0-4 3-6 3-10s-3-6-3-10" />
            <path d="M74 28c0-4 3-6 3-10s-3-6-3-10" />
          </g>
        )}

        {/* Saucer */}
        <ellipse cx="60" cy="98" rx="42" ry="6" fill="#241A16" opacity="0.14" />

        {/* Cup body */}
        <path
          d="M28 48h64v22c0 14-11 24-25 24H53c-14 0-25-10-25-24V48Z"
          fill="#FCFAF7"
          stroke="#241A16"
          strokeWidth="2"
          strokeLinejoin="round"
        />

        {/* Handle */}
        <path
          d="M92 54h6a10 10 0 0 1 0 20h-6"
          fill="none"
          stroke="#241A16"
          strokeWidth="2"
          strokeLinejoin="round"
        />

        {/* Coffee surface */}
        <ellipse cx="60" cy="48" rx="32" ry="6" fill="#5A3828" />
        <ellipse cx="60" cy="47" rx="24" ry="3.5" fill="#A66A3F" opacity="0.55" />
      </svg>
    </div>
  );
}