import { Marquee } from '@/components/animations/Marquee';

const CREDENTIALS = [
  'Codeforces Expert',
  'FastAPI',
  'Next.js',
  'AWS',
  '3000+ solved',
  'Spring Boot',
  'PostgreSQL',
  'ICPC Regionalist',
  'Clean Architecture',
  'TypeScript',
  'Docker',
  'React',
];

/** Single-line scrolling credibility strip — quiet mono type, seamless loop, frozen under reduced-motion. */
export function TrustMarquee() {
  return (
    <section
      className="w-full border-y border-border bg-bg-elev py-5"
      aria-label="Technologies and competitive programming credentials"
    >
      {/* Static copy for screen readers; the moving track below is aria-hidden. */}
      <p className="sr-only">{CREDENTIALS.join(', ')}</p>
      <Marquee
        speed={36}
        items={CREDENTIALS.map((label) => (
          <span
            key={label}
            className="flex items-center gap-8 whitespace-nowrap font-mono text-xs uppercase tracking-[0.15em] text-content-dim"
          >
            {label}
            <span aria-hidden className="inline-block h-1 w-1 rounded-full bg-border-glow" />
          </span>
        ))}
      />
    </section>
  );
}
