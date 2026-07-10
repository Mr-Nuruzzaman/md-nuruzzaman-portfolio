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

export function TrustMarquee() {
  return (
    <section
      className="w-full border-y border-border bg-bg-elev"
      aria-label="Technologies and competitive programming credentials"
    >
      <ul className="mx-auto flex max-w-container flex-wrap items-center justify-center gap-x-6 gap-y-3 px-6 py-6 sm:gap-x-10 sm:px-8">
        {CREDENTIALS.map((label) => (
          <li key={label} className="whitespace-nowrap font-mono text-xs uppercase tracking-[0.15em] text-content-dim">
            {label}
          </li>
        ))}
      </ul>
    </section>
  );
}
