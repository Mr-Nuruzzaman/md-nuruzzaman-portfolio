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

// Generous per-character outline length for the dash animation (overshoot only means the
// draw completes a touch early inside its duration; keeps the animation pure CSS).
const LEN_PER_CHAR = 170;

interface SignatureWordProps {
  text: string;
  /** Exact advance width at FONT size, measured once with the shipped Instrument Serif.
   *  Hardcoded so the viewBox never changes after hydration — a runtime re-measure used
   *  to snap the layout (two lines → one line) once JS loaded. */
  width: number;
  /** tailwind fill-* + stroke-* pair for the ink colour */
  colorClass: string;
  italic?: boolean;
  delay: number;
}

/**
 * One word of the signature. The stroke draw + fill fade run as CSS keyframes (`.sig-word`
 * in globals.css) from the very first paint — no hydration dependency, no layout shift.
 */
function SignatureWord({ text, width, colorClass, italic, delay }: SignatureWordProps) {
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
      <text
        x={PAD_X}
        y={BASELINE}
        className={`sig-word ${colorClass}`}
        style={
          {
            fontFamily: 'var(--font-display)',
            fontStyle: italic ? 'italic' : 'normal',
            fontSize: FONT,
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
 * Word widths are compile-time constants measured from the shipped font (Instrument Serif
 * 400 at 100 user units): "Md" 111.2, italic "Nuruzzaman" 491.
 */
export function SignatureName() {
  return (
    <>
      <span className="sr-only">Md Nuruzzaman</span>
      <span aria-hidden>
        <SignatureWord text="Md" width={111.2} colorClass="fill-content stroke-content" delay={0.15} />{' '}
        <SignatureWord text="Nuruzzaman" width={491} italic colorClass="fill-accent-2 stroke-accent-2" delay={0.5} />
      </span>
    </>
  );
}
