import { useEffect } from 'react';

/**
 * Adds the class `in` to every `.reveal` element when it enters the viewport.
 * Progressive enhancement: elements are styled invisible until observed,
 * but respects prefers-reduced-motion (handled in CSS).
 *
 * Call once, at the Layout level.
 */
export function useRevealObserver(): void {
  useEffect(() => {
    if (typeof window === 'undefined' || !('IntersectionObserver' in window)) return;

    const targets = Array.from(document.querySelectorAll<HTMLElement>('.reveal'));
    if (targets.length === 0) return;

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in');
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -60px 0px' },
    );

    targets.forEach((el) => io.observe(el));
    return () => io.disconnect();
  });
}