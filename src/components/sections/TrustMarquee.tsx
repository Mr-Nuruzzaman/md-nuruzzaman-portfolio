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

const items = CREDENTIALS.map((label) => (
  <span key={label} className="flex items-center gap-5 sm:gap-8">
    <span className="whitespace-nowrap font-mono text-xs uppercase tracking-[0.12em] text-content-muted sm:text-sm sm:tracking-[0.15em]">
      {label}
    </span>
    <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-accent shadow-glow-cyan" aria-hidden />
  </span>
));

export function TrustMarquee() {
  return (
    <section
      className="relative w-full overflow-hidden border-y border-border bg-bg-elev py-6 md:py-8"
      aria-label="Technologies and competitive programming credentials"
    >
      <Marquee items={items} speed={40} />

      {/* Edge fade masks */}
      <div
        className="pointer-events-none absolute inset-y-0 left-0 w-12 bg-gradient-to-r from-bg-elev to-transparent sm:w-24 md:w-40"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-y-0 right-0 w-12 bg-gradient-to-l from-bg-elev to-transparent sm:w-24 md:w-40"
        aria-hidden
      />
    </section>
  );
}
