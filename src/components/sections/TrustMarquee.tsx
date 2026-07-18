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
      className="w-full border-b border-border py-4"
      aria-label="Technologies and competitive programming credentials"
    >
      {/* Static copy for screen readers; the moving track below is aria-hidden. */}
      <p className="sr-only">{CREDENTIALS.join(', ')}</p>
      <div className="[mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
        <Marquee
          speed={24}
          items={CREDENTIALS.map((label) => (
            <span
              key={label}
              className="flex items-center gap-8 whitespace-nowrap font-mono text-[0.6875rem] uppercase tracking-[0.2em] text-content-dim"
            >
              {label}
              <span aria-hidden className="inline-block h-1 w-1 rounded-full bg-border" />
            </span>
          ))}
        />
      </div>
    </section>
  );
}
