'use client';

import { m } from 'framer-motion';
import { EASE_EXPO } from '@/lib/constants';
import { usePrefersReducedMotion } from '@/hooks/useMediaQuery';
import { cn } from '@/lib/utils';

interface RuleRevealProps {
  className?: string;
}

/** Hairline rule that draws in from the left as it scrolls into view. Static under reduced motion. */
export function RuleReveal({ className }: RuleRevealProps) {
  const reduced = usePrefersReducedMotion();

  if (reduced) {
    return <div className={cn('h-px w-full origin-left bg-border', className)} />;
  }

  return (
    <m.div
      className={cn('h-px w-full origin-left bg-border', className)}
      initial={{ scaleX: 0 }}
      whileInView={{ scaleX: 1 }}
      viewport={{ once: true, margin: '-20% 0px' }}
      transition={{ duration: 0.8, ease: EASE_EXPO }}
    />
  );
}
