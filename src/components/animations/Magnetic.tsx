'use client';

import { useRef } from 'react';
import { m, useSpring } from 'framer-motion';
import { SPRING } from '@/lib/constants';
import { useIsDesktop, usePrefersReducedMotion } from '@/hooks/useMediaQuery';

interface MagneticProps {
  /** Max pull toward the cursor, px. */
  strength?: number;
  className?: string;
  children: React.ReactNode;
}

/** Pulls its child toward the cursor on hover (spring). No-op on touch / reduced-m. */
export function Magnetic({ strength = 12, className, children }: MagneticProps) {
  const ref = useRef<HTMLDivElement>(null);
  const rectRef = useRef<DOMRect | null>(null);
  const desktop = useIsDesktop();
  const reduced = usePrefersReducedMotion();
  const enabled = desktop && !reduced;

  const x = useSpring(0, SPRING);
  const y = useSpring(0, SPRING);

  // Cache the rect on enter to avoid a forced reflow on every mousemove.
  const cacheRect = () => {
    if (enabled && ref.current) rectRef.current = ref.current.getBoundingClientRect();
  };

  const onMove = (e: React.MouseEvent) => {
    if (!enabled || !ref.current) return;
    const r = rectRef.current ?? ref.current.getBoundingClientRect();
    const px = (e.clientX - (r.left + r.width / 2)) / (r.width / 2);
    const py = (e.clientY - (r.top + r.height / 2)) / (r.height / 2);
    x.set(Math.max(-1, Math.min(1, px)) * strength);
    y.set(Math.max(-1, Math.min(1, py)) * strength);
  };

  const reset = () => {
    rectRef.current = null;
    x.set(0);
    y.set(0);
  };

  return (
    <m.div
      ref={ref}
      className={className}
      style={enabled ? { x, y } : undefined}
      onMouseEnter={cacheRect}
      onMouseMove={onMove}
      onMouseLeave={reset}
    >
      {children}
    </m.div>
  );
}
