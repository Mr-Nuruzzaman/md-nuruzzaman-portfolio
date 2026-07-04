'use client';

import { useRef } from 'react';
import { m, useScroll, useTransform } from 'framer-motion';
import { usePrefersReducedMotion } from '@/hooks/useMediaQuery';
import { cn } from '@/lib/utils';

interface ParallaxProps {
  /** Total travel in px across the element's scroll range. Subtle: ±40. */
  offset?: number;
  className?: string;
  children: React.ReactNode;
}

/** Translates children on the Y axis relative to scroll. Disabled under reduced-m. */
export function Parallax({ offset = 40, className, children }: ParallaxProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = usePrefersReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], [offset, -offset]);

  return (
    <div ref={ref} className={cn('will-change-transform', className)}>
      <m.div style={reduced ? undefined : { y }}>{children}</m.div>
    </div>
  );
}
