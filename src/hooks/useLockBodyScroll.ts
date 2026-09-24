import { useEffect } from 'react';

/**
 * Locks body scroll (for drawers / modals).
 * Compensates for scrollbar width to prevent layout shift.
 */
export function useLockBodyScroll(locked: boolean): void {
  useEffect(() => {
    if (typeof document === 'undefined') return;

    if (!locked) return;

    const scrollBarWidth = window.innerWidth - document.documentElement.clientWidth;
    const prevOverflow = document.body.style.overflow;
    const prevPaddingRight = document.body.style.paddingRight;

    document.body.style.overflow = 'hidden';
    if (scrollBarWidth > 0) {
      document.body.style.paddingRight = `${scrollBarWidth}px`;
    }

    return () => {
      document.body.style.overflow = prevOverflow;
      document.body.style.paddingRight = prevPaddingRight;
    };
  }, [locked]);
}