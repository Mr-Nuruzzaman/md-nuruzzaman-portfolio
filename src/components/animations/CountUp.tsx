'use client';

import { useEffect, useRef } from 'react';
import { useInView } from 'framer-motion';
import { usePrefersReducedMotion } from '@/hooks/useMediaQuery';

interface CountUpProps {
  to: number;
  duration?: number;
  suffix?: string;
  prefix?: string;
  className?: string;
}

const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);

/**
 * Animates 0→`to` when scrolled into view (once). Reduced-motion shows the final value instantly.
 * Writes the interpolated number straight to the DOM node each frame (no per-tick React re-render).
 */
export function CountUp({ to, duration = 1.2, suffix = '', prefix = '', className }: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const numRef = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: '-10% 0px' });
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    const node = numRef.current;
    if (!node) return;
    const write = (v: number) => (node.textContent = Math.round(v).toLocaleString());
    if (!inView) {
      write(0);
      return;
    }
    if (reduced) {
      write(to);
      return;
    }
    let raf = 0;
    let start: number | null = null;
    const ms = duration * 1000;
    const tick = (now: number) => {
      if (start === null) start = now;
      const p = Math.min(1, (now - start) / ms);
      write(easeOut(p) * to);
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, reduced, to, duration]);

  return (
    <span ref={ref} className={className}>
      {/* Stable accessible value (screen readers never announce the animating "0"). */}
      <span className="sr-only">
        {prefix}
        {to.toLocaleString()}
        {suffix}
      </span>
      <span aria-hidden="true">
        {prefix}
        <span ref={numRef}>0</span>
        {suffix}
      </span>
    </span>
  );
}
