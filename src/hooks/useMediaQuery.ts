'use client';

import { useEffect, useState } from 'react';

/** SSR-safe media-query hook. Returns false on the server / first paint. */
export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const mql = window.matchMedia(query);
    const onChange = () => setMatches(mql.matches);
    onChange();
    mql.addEventListener('change', onChange);
    return () => mql.removeEventListener('change', onChange);
  }, [query]);

  return matches;
}

/** True when the user asked for reduced motion. Gate all transforms/auto-motion on this. */
export function usePrefersReducedMotion(): boolean {
  return useMediaQuery('(prefers-reduced-motion: reduce)');
}

/** True on pointer-fine (desktop-ish) devices. Use to disable cursor/tilt on touch. */
export function useIsDesktop(): boolean {
  return useMediaQuery('(min-width: 768px) and (pointer: fine)');
}
