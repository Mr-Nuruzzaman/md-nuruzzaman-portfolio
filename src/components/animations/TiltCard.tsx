'use client';

import { useRef } from 'react';
import { m, useSpring, useTransform } from 'framer-motion';
import { SPRING } from '@/lib/constants';
import { useIsDesktop, usePrefersReducedMotion } from '@/hooks/useMediaQuery';
import { cn } from '@/lib/utils';

interface TiltCardProps {
  className?: string;
  /** Max rotation in degrees. */
  max?: number;
  children: React.ReactNode;
}

/**
 * 3D tilt toward cursor + a radial spotlight following the pointer.
 * Sets CSS vars --mx/--my (percent) consumed by the .spotlight overlay.
 * Flat + spotlight-off under touch / reduced-m.
 */
export function TiltCard({ className, max = 8, children }: TiltCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const rectRef = useRef<DOMRect | null>(null);
  const desktop = useIsDesktop();
  const reduced = usePrefersReducedMotion();
  const enabled = desktop && !reduced;

  const rx = useSpring(0, SPRING);
  const ry = useSpring(0, SPRING);
  const rotateX = useTransform(rx, (v) => `${v}deg`);
  const rotateY = useTransform(ry, (v) => `${v}deg`);

  // Cache the rect on enter — it only changes on scroll/resize, not while hovering.
  const cacheRect = () => {
    if (enabled && ref.current) rectRef.current = ref.current.getBoundingClientRect();
  };

  const onMove = (e: React.MouseEvent) => {
    if (!enabled || !ref.current) return;
    const r = rectRef.current ?? ref.current.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width;
    const py = (e.clientY - r.top) / r.height;
    ry.set((px - 0.5) * 2 * max);
    rx.set(-(py - 0.5) * 2 * max);
    ref.current.style.setProperty('--mx', `${px * 100}%`);
    ref.current.style.setProperty('--my', `${py * 100}%`);
  };

  const reset = () => {
    rectRef.current = null;
    rx.set(0);
    ry.set(0);
  };

  return (
    <m.div
      ref={ref}
      onMouseEnter={cacheRect}
      onMouseMove={onMove}
      onMouseLeave={reset}
      style={enabled ? { rotateX, rotateY, transformPerspective: 1000 } : undefined}
      className={cn('spotlight group relative [transform-style:preserve-3d]', className)}
    >
      {children}
    </m.div>
  );
}
