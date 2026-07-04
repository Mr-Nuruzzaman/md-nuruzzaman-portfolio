'use client';

import { useEffect, useState } from 'react';
import { experienceLabel } from '@/lib/utils';

/**
 * Live years-of-experience label. Recomputes on the client on every page load,
 * so the value rolls forward on its own — no redeploy or edit needed.
 * suppressHydrationWarning guards the rare case where the band ticked over
 * between the static build and the visit.
 */
export function ExperienceStat({ suffix = ' yrs' }: { suffix?: string }) {
  const [label, setLabel] = useState(() => experienceLabel());

  useEffect(() => {
    setLabel(experienceLabel());
  }, []);

  return (
    <span suppressHydrationWarning>
      {label}
      {suffix}
    </span>
  );
}
