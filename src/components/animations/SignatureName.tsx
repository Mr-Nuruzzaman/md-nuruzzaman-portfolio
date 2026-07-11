'use client';

import { useEffect, useLayoutEffect, useRef, useState } from 'react';

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

// Generous per-character outline length for the dash animation. Overshooting the real
// outline just means the draw completes a touch early inside its duration — what it buys
// is a pure-CSS animation that starts at first paint instead of waiting for hydration
// and a JS measurement (which used to hold the finished name on screen, then replay).
const LEN_PER_CHAR = 170;

interface SignatureWordProps {
  text: string;
  /** tailwind fill-* + stroke-* pair for the ink colour */
  colorClass: string;
  italic?: boolean;
  delay: number;
}

/**
 * One word of the signature. The stroke draw + fill fade run as CSS keyframes (`.sig-word`
 * in globals.css) from the very first paint — no hydration dependency. A hidden twin still
 * measures the advance width, but only to tighten the viewBox after mount.
 */
function SignatureWord({ text, colorClass, italic, delay }: SignatureWordProps) {
  const measureRef = useRef<SVGTextElement>(null);
  const [length, setLength] = useState<number | null>(null);

  useIsoLayoutEffect(() => {
    if (measureRef.current) setLength(measureRef.current.getComputedTextLength());
  }, [text]);

  // Estimated width keeps layout stable until the (optional) measurement refines it.
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
      {/* invisible twin — refines the viewBox width once mounted */}
      <text ref={measureRef} x={PAD_X} y={BASELINE} className={colorClass} style={glyphStyle} visibility="hidden">
        {text}
      </text>

      <text
        x={PAD_X}
        y={BASELINE}
        className={`sig-word ${colorClass}`}
        style={
          {
            ...glyphStyle,
            strokeWidth: 1.1,
            paintOrder: 'stroke',
            '--sig-len': text.length * LEN_PER_CHAR,
            '--sig-delay': `${delay}s`,
          } as React.CSSProperties
        }
      >
        {text}
      </text>
    </svg>
  );
}

/**
 * Editorial hero name that writes itself: the serif glyphs stroke in left→right, then the
 * fill fades up ("Md" in content ink, italic "Nuruzzaman" in ember). Renders real text for
 * assistive tech; the visible glyphs are in the first-paint DOM and animate via CSS only.
 */
export function SignatureName() {
  return (
    <>
      <span className="sr-only">Md Nuruzzaman</span>
      <span aria-hidden>
        <SignatureWord text="Md" colorClass="fill-content stroke-content" delay={0.15} />{' '}
        <SignatureWord text="Nuruzzaman" italic colorClass="fill-accent-2 stroke-accent-2" delay={0.5} />
      </span>
    </>
  );
}
