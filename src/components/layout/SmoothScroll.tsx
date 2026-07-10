'use client';

import { useEffect } from 'react';
import Lenis from 'lenis';
import { usePrefersReducedMotion } from '@/hooks/useMediaQuery';

/**
 * Lenis smooth-scroll provider. Wrap the app body once.
 * Skips entirely under prefers-reduced-motion (native scroll instead).
 */
export function SmoothScroll({ children }: { children: React.ReactNode }) {
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    if (reduced) return;
    const lenis = new Lenis({ lerp: 0.1, duration: 1.2 });
    let raf = 0;
    const loop = (time: number) => {
      lenis.raf(time);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    // Honor a hash deep-link on initial load (e.g. /#projects from a case-study page) —
    // Lenis takes over before the browser's native hash jump can land. Use native scrollTo
    // (Lenis syncs to it); retry once after load in case late layout shifted the target.
    const jumpToHash = () => {
      if (!window.location.hash) return;
      const target = document.querySelector(window.location.hash) as HTMLElement | null;
      if (!target) return;
      const top = target.getBoundingClientRect().top + window.scrollY - 12;
      window.scrollTo({ top, behavior: 'instant' as ScrollBehavior });
    };
    const hashTimer = window.setTimeout(jumpToHash, 0);
    const settleTimer = window.setTimeout(jumpToHash, 250);

    // Route in-page anchor clicks through Lenis for smooth section jumps.
    const onClick = (e: MouseEvent) => {
      const a = (e.target as HTMLElement)?.closest('a[href^="#"]') as HTMLAnchorElement | null;
      if (!a) return;
      const id = a.getAttribute('href');
      if (!id || id === '#') return;
      const el = document.querySelector(id);
      if (el) {
        e.preventDefault();
        // Tiny offset only: sections carry their own top padding, and the navbar
        // hides on scroll-down — a large offset just exposes the previous section.
        lenis.scrollTo(el as HTMLElement, { offset: -12 });
      }
    };
    document.addEventListener('click', onClick);

    return () => {
      cancelAnimationFrame(raf);
      window.clearTimeout(hashTimer);
      window.clearTimeout(settleTimer);
      document.removeEventListener('click', onClick);
      lenis.destroy();
    };
  }, [reduced]);

  return <>{children}</>;
}
