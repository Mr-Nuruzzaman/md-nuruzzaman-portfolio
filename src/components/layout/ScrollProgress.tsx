'use client';

import { m, useScroll, useSpring } from 'framer-motion';
import { SPRING } from '@/lib/constants';
import { usePrefersReducedMotion } from '@/hooks/useMediaQuery';

/** Hairline reading-progress bar pinned to the top edge. Scale-only, so it's transform-cheap. */
export function ScrollProgress() {
  const reduced = usePrefersReducedMotion();
  const { scrollYProgress } = useScroll();
  // Smooth the raw scroll value with the shared spring; bind straight through under reduced motion.
  const scaleX = useSpring(scrollYProgress, SPRING);

  return (
    <m.div
      aria-hidden
      className="fixed inset-x-0 top-0 z-[60] h-0.5 origin-left bg-accent"
      style={{ scaleX: reduced ? scrollYProgress : scaleX }}
    />
  );
}
