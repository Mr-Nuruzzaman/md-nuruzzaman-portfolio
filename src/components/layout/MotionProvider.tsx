'use client';

import { LazyMotion, domMax } from 'framer-motion';

/**
 * Loads Framer Motion's DOM features once for the whole app so components can use
 * the lightweight `m.*` primitives instead of each bundling the full `motion` API.
 * `strict` makes any stray `motion.*` throw in dev, keeping the win enforced.
 * `domMax` retains layout animations (the navbar's layoutId indicator) + gestures.
 */
export function MotionProvider({ children }: { children: React.ReactNode }) {
  return (
    <LazyMotion features={domMax} strict>
      {children}
    </LazyMotion>
  );
}
