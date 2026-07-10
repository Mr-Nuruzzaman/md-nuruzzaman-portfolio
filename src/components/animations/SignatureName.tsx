'use client';

import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { m } from 'framer-motion';
import { usePrefersReducedMotion } from '@/hooks/useMediaQuery';
import { EASE_EXPO, EASE_SMOOTH } from '@/lib/constants';

// useLayoutEffect on the client, useEffect on the server (avoids the SSR warning).
const useIsoLayoutEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect;

// SVG user-space metrics shared by every word so their baselines line up exactly.
const FONT = 100; // internal glyph size in user units
const BASELINE = 100; // baseline y within the viewBox
const VB_TOP = 20; // room above the caps
const VB_HEIGHT = 110; // total box height (0.20em headroom + caps + 0.30em below baseline)
const PAD_X = 8; // horizontal room for italic overhang + stroke

// The svg is sized in em relative to the inherited h1 font-size, so the clamp() display
// scale drives it responsively with no per-viewport re-measure needed (aspect is constant).
const HEIGHT_EM = VB_HEIGHT / FONT; // 1.10em
const BASELINE_SHIFT_EM = (VB_TOP + VB_HEIGHT - BASELINE) / FONT; // 0.30em below baseline

interface SignatureWordProps {
  text: string;
  /** tailwind fill-* + stroke-* pair for the ink colour */
  colorClass: string;
  italic?: boolean;
  delay: number;
  reduced: boolean;
}

/**
 * One word of the signature. A hidden twin measures the advance width so we can size the
 * viewBox and drive the stroke-dash animation; the visible glyphs draw their outline in,
 * then the fill fades to the final colour.
 */
function SignatureWord({ text, colorClass, italic, delay, reduced }: SignatureWordProps) {
  const measureRef = useRef<SVGTextElement>(null);
  const [length, setLength] = useState<number | null>(null);

  useIsoLayoutEffect(() => {
    if (measureRef.current) setLength(measureRef.current.getComputedTextLength());
  }, [text]);

  // Estimated width keeps layout stable for the single frame before measurement lands.
  const width = length ?? text.length * 58;
  const glyphStyle = {
    fontFamily: 'var(--font-display)',
    fontStyle: italic ? ('italic' as const) : ('normal' as const),
    fontSize: FONT,
  };

  return (
    <svg
      viewBox={`0 ${VB_TOP} ${width + PAD_X * 2} ${VB_HEIGHT}`}
      className="inline-block"
      style={{
        height: `${HEIGHT_EM}em`,
        width: 'auto',
        overflow: 'visible',
        verticalAlign: `-${BASELINE_SHIFT_EM}em`,
      }}
      aria-hidden
    >
      {/* invisible twin — establishes the exact glyph length for the dash animation */}
      <text ref={measureRef} x={PAD_X} y={BASELINE} className={colorClass} style={glyphStyle} visibility="hidden">
        {text}
      </text>

      {reduced || length == null ? (
        // Reduced motion (or the pre-measure frame): final filled state, no motion.
        <text x={PAD_X} y={BASELINE} className={colorClass} style={glyphStyle}>
          {text}
        </text>
      ) : (
        // key={length} forces a fresh mount so `initial` applies and the draw actually runs.
        <m.text
          key={length}
          x={PAD_X}
          y={BASELINE}
          className={colorClass}
          style={{ ...glyphStyle, strokeWidth: 1.1, paintOrder: 'stroke' }}
          strokeDasharray={length}
          initial={{ strokeDashoffset: length, fillOpacity: 0 }}
          animate={{ strokeDashoffset: 0, fillOpacity: 1 }}
          transition={{
            strokeDashoffset: { duration: 0.9, ease: EASE_EXPO, delay },
            fillOpacity: { duration: 0.55, ease: EASE_SMOOTH, delay: delay + 0.7 },
          }}
        >
          {text}
        </m.text>
      )}
    </svg>
  );
}

/**
 * Editorial hero name that writes itself: the serif glyphs stroke in left→right, then the
 * fill fades up ("Md" in content ink, italic "Nuruzzaman" in ember). Renders real text for
 * assistive tech and keeps the visible glyphs in the DOM immediately for LCP.
 */
export function SignatureName() {
  const reduced = usePrefersReducedMotion();

  return (
    <>
      <span className="sr-only">Md Nuruzzaman</span>
      <span aria-hidden>
        <SignatureWord text="Md" colorClass="fill-content stroke-content" delay={0.15} reduced={reduced} />{' '}
        <SignatureWord
          text="Nuruzzaman"
          italic
          colorClass="fill-accent-2 stroke-accent-2"
          delay={0.5}
          reduced={reduced}
        />
      </span>
    </>
  );
}
