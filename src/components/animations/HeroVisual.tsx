import { cn } from '@/lib/utils';
import { platforms } from '@/data/competitive';

// Geometry for the "ink meridian" — a square SVG stage in user units, everything
// measured from the centre so the rings stay concentric at any rendered size.
const VB = 400;
const C = VB / 2;

// Compass ticks around the outer ring: 60 marks, every 5th drawn longer.
const OUTER_R = 188;
// Coordinates are pre-rounded to 2dp: raw floats stringify differently between the
// server and client renders (e.g. …8857 vs …88575) and trip a hydration mismatch.
const r2 = (n: number) => Math.round(n * 100) / 100;
const TICKS = Array.from({ length: 60 }, (_, i) => {
  const angle = (i / 60) * Math.PI * 2;
  const major = i % 5 === 0;
  const len = major ? 12 : 6;
  const cos = Math.cos(angle);
  const sin = Math.sin(angle);
  return {
    x1: r2(C + OUTER_R * cos),
    y1: r2(C + OUTER_R * sin),
    x2: r2(C + (OUTER_R - len) * cos),
    y2: r2(C + (OUTER_R - len) * sin),
    major,
  };
});

// Real rating data becomes the ring's coordinate labels, pinned to the diagonals
// so the horizontal band through the monogram stays clear. Static layer (upright).
const LABEL_R = 150;
const LABELS = platforms.map((p, i) => {
  const angle = ((i * 90 + 45) / 180) * Math.PI; // 45°, 135°, 225°, 315°
  return {
    key: p.name,
    text: `${p.name.slice(0, 2).toUpperCase()} ${p.rating}`,
    x: r2(C + LABEL_R * Math.cos(angle)),
    y: r2(C + LABEL_R * Math.sin(angle)),
  };
});

/**
 * "Ink meridian" — the hero's single focal animation. Concentric hairline rings
 * rotate at different slow rates in opposite directions; real CP ratings sit on
 * the ring as coordinate marks; the "MN" monogram breathes in ember at centre.
 * Pure CSS (transform/opacity only), visible from first paint, decorative only.
 * The global reduced-motion rule freezes every animation into a static plate.
 */
export function HeroVisual({ className }: { className?: string }) {
  return (
    <div
      className={cn('rise-in mx-auto w-full max-w-[26rem]', className)}
      style={{ '--rise-delay': '0.35s' } as React.CSSProperties}
      aria-hidden
    >
      <svg viewBox={`0 0 ${VB} ${VB}`} className="h-auto w-full overflow-visible" role="presentation">
        {/* Outer solid ring + compass ticks — static frame in the faintest ink */}
        <g className="text-border" stroke="currentColor" fill="none" strokeWidth={1}>
          <circle cx={C} cy={C} r={OUTER_R} />
          {TICKS.map((t, i) => (
            <line key={i} x1={t.x1} y1={t.y1} x2={t.x2} y2={t.y2} strokeWidth={t.major ? 1.25 : 0.75} />
          ))}
        </g>

        {/* Ring A — fine dotted, slow clockwise drift */}
        <circle
          className="meridian-ring meridian-spin-a text-content-dim"
          cx={C}
          cy={C}
          r={150}
          fill="none"
          stroke="currentColor"
          strokeWidth={1}
          strokeDasharray="2 11"
          strokeLinecap="round"
        />

        {/* Ring B — segmented arcs, slower counter-clockwise drift */}
        <circle
          className="meridian-ring meridian-spin-b text-border-glow"
          cx={C}
          cy={C}
          r={112}
          fill="none"
          stroke="currentColor"
          strokeWidth={1}
          strokeDasharray="46 26 10 26"
        />

        {/* Ring C — a single open ember arc for asymmetry, slow clockwise */}
        <circle
          className="meridian-ring meridian-spin-a text-accent-3"
          cx={C}
          cy={C}
          r={74}
          fill="none"
          stroke="currentColor"
          strokeWidth={1.25}
          strokeDasharray="150 315"
          strokeLinecap="round"
          opacity={0.6}
        />

        {/* Coordinate labels — real CP ratings, upright mono, quiet ink */}
        <g className="fill-content-dim font-mono" style={{ fontSize: 11, letterSpacing: '0.12em' }}>
          {LABELS.map((l) => (
            <text key={l.key} x={l.x} y={l.y} textAnchor="middle" dominantBaseline="central">
              {l.text}
            </text>
          ))}
        </g>

        {/* Centre crosshair — hairline registration marks */}
        <g className="text-border-glow" stroke="currentColor" strokeWidth={0.75}>
          <line x1={C - 16} y1={C} x2={C + 16} y2={C} />
          <line x1={C} y1={C - 16} x2={C} y2={C + 16} />
        </g>

        {/* Monogram — the resting point, ember serif italic, breathing opacity */}
        <text
          className="meridian-breathe fill-accent"
          x={C}
          y={C + 2}
          textAnchor="middle"
          dominantBaseline="central"
          style={{ fontFamily: 'var(--font-display)', fontStyle: 'italic', fontSize: 88 }}
        >
          MN
        </text>
      </svg>
    </div>
  );
}
