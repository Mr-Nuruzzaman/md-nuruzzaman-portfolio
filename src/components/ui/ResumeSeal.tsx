'use client';

import { cn } from '@/lib/utils';
import { profile } from '@/data/profile';

interface ResumeSealProps {
  href?: string;
  className?: string;
}

const RING_TEXT = `RÉSUMÉ · ${profile.name.toUpperCase()} · `;
// Circle for the textPath — radius 38 within a 100×100 box (circumference ≈ 239 user units).
const RING_PATH = 'M50,50 m-38,0 a38,38 0 1,1 76,0 a38,38 0 1,1 -76,0';

/**
 * Wax-seal résumé badge: a serif "MN" monogram under a slowly rotating ring of mono caps.
 * The whole thing is a plain anchor to the résumé PDF (static asset — never next/link).
 * Rotation pauses on hover and is disabled under reduced motion.
 */
export function ResumeSeal({ href = profile.resume, className }: ResumeSealProps) {
  return (
    <a
      href={href}
      aria-label="Download résumé (PDF)"
      className={cn(
        'group relative grid h-24 w-24 place-items-center rounded-full border border-border-glow',
        'transition-[transform,border-color] duration-300 ease-expo',
        'hover:scale-[1.03] hover:border-accent active:scale-[0.97]',
        className,
      )}
    >
      <svg
        viewBox="0 0 100 100"
        className="absolute inset-0 h-full w-full animate-[spin_60s_linear_infinite] [transform-origin:center] group-hover:[animation-play-state:paused] motion-reduce:animate-none"
        aria-hidden
      >
        <defs>
          <path id="resume-seal-ring" d={RING_PATH} fill="none" />
        </defs>
        <text
          className="fill-content-dim font-mono transition-colors duration-300 group-hover:fill-content-muted"
          style={{ fontSize: 9, letterSpacing: 2.4 }}
        >
          <textPath href="#resume-seal-ring" startOffset="0">
            {RING_TEXT}
          </textPath>
        </text>
      </svg>

      <span
        aria-hidden
        className="font-display text-[1.4rem] italic leading-none text-content transition-colors duration-300 group-hover:text-accent-2"
      >
        MN
      </span>
    </a>
  );
}
