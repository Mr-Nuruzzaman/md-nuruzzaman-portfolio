'use client';

import { useEffect, useState } from 'react';
import { AnimatePresence, m } from 'framer-motion';
import { ArrowUp } from 'lucide-react';
import { EASE_SMOOTH } from '@/lib/constants';
import { usePrefersReducedMotion } from '@/hooks/useMediaQuery';

/**
 * Floating back-to-top control. Appears only after scrolling past one viewport and
 * links to #top (the hero) so SmoothScroll's anchor interception carries the smooth
 * Lenis scroll. Under reduced motion it toggles instantly with no entrance and the
 * browser handles the jump natively. Sits below the navbar/drawer (z-40); on lg+ it
 * rides above the bottom-right email rail so the two never overlap.
 */
export function BackToTop() {
  const reduced = usePrefersReducedMotion();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > window.innerHeight);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const anim = reduced
    ? { initial: false as const }
    : {
        initial: { opacity: 0, scale: 0.8 },
        animate: { opacity: 1, scale: 1 },
        exit: { opacity: 0, scale: 0.8 },
        transition: { duration: 0.2, ease: EASE_SMOOTH },
      };

  return (
    <AnimatePresence>
      {visible && (
        <m.a
          {...anim}
          href="#top"
          aria-label="Back to top"
          className="fixed bottom-6 right-6 z-40 grid size-11 place-items-center rounded-full border border-border bg-bg-elev/90 text-content-dim shadow-lg backdrop-blur-sm transition-colors duration-200 hover:border-accent hover:text-accent lg:bottom-28"
        >
          <ArrowUp size={18} aria-hidden />
        </m.a>
      )}
    </AnimatePresence>
  );
}
