'use client';

import { m, useSpring } from 'framer-motion';
import { useEffect } from 'react';
import { useIsDesktop, usePrefersReducedMotion } from '@/hooks/useMediaQuery';

/** Fixed radial cyan blob trailing the cursor (screen blend). Desktop + motion only. */
export function CursorGlow() {
  const desktop = useIsDesktop();
  const reduced = usePrefersReducedMotion();
  const enabled = desktop && !reduced;

  const x = useSpring(-500, { stiffness: 120, damping: 20, mass: 0.5 });
  const y = useSpring(-500, { stiffness: 120, damping: 20, mass: 0.5 });

  useEffect(() => {
    if (!enabled) return;
    const onMove = (e: MouseEvent) => {
      x.set(e.clientX - 200);
      y.set(e.clientY - 200);
    };
    window.addEventListener('mousemove', onMove);
    return () => window.removeEventListener('mousemove', onMove);
  }, [enabled, x, y]);

  if (!enabled) return null;

  return (
    <m.div
      aria-hidden
      style={{ x, y, willChange: 'transform' }}
      className="pointer-events-none fixed left-0 top-0 z-[5] h-[400px] w-[400px] rounded-full"
    >
      {/* Additive glow on the dark base — no mix-blend (cheaper compositing). Color from --accent token. */}
      <div className="h-full w-full rounded-full bg-[radial-gradient(circle,rgb(var(--accent-rgb)/0.16)_0%,transparent_65%)]" />
    </m.div>
  );
}
