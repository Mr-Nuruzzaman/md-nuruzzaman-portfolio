'use client';

import { m, type HTMLMotionProps } from 'framer-motion';
import { EASE_EXPO } from '@/lib/constants';
import { usePrefersReducedMotion } from '@/hooks/useMediaQuery';

interface RevealProps extends Omit<HTMLMotionProps<'div'>, 'initial' | 'whileInView' | 'transition'> {
  /** Seconds to delay the entrance (use for manual staggering). */
  delay?: number;
  y?: number;
  as?: 'div' | 'li' | 'span' | 'p';
}

/** Fade + rise on scroll into view, once. No-op offset when reduced-motion is on. */
export function Reveal({ delay = 0, y = 24, as = 'div', children, ...props }: RevealProps) {
  const reduced = usePrefersReducedMotion();
  // m[as] widens to a union whose event handlers conflict; treat as the div-typed component (runtime-safe).
  const MotionTag = m[as] as typeof m.div;

  return (
    <MotionTag
      initial={{ opacity: 0, y: reduced ? 0 : y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-10% 0px' }}
      transition={{ duration: 0.7, ease: EASE_EXPO, delay }}
      {...props}
    >
      {children}
    </MotionTag>
  );
}

/** Container that staggers direct <Reveal>/motion children on scroll-in. */
export function RevealGroup({
  stagger = 0.08,
  className,
  children,
}: {
  stagger?: number;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <m.div
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: '-10% 0px' }}
      variants={{ show: { transition: { staggerChildren: stagger } }, hidden: {} }}
    >
      {children}
    </m.div>
  );
}

/** Child item for RevealGroup — inherits the parent's stagger timeline. */
export function RevealItem({ y = 24, className, children }: { y?: number; className?: string; children: React.ReactNode }) {
  const reduced = usePrefersReducedMotion();
  return (
    <m.div
      className={className}
      variants={{
        hidden: { opacity: 0, y: reduced ? 0 : y },
        show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE_EXPO } },
      }}
    >
      {children}
    </m.div>
  );
}
