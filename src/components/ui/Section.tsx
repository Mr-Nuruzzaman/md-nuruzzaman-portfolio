import { cn } from '@/lib/utils';
import { RuleReveal } from '@/components/animations/RuleReveal';
import { Container } from './Container';

interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  id?: string;
  wide?: boolean;
  /** Set false to opt out of the centered Container (e.g. full-bleed marquee). */
  contained?: boolean;
  /** Folio numeral (e.g. '01') rendered before the eyebrow as `01 — Eyebrow`. */
  index?: string;
  eyebrow?: string;
  heading?: React.ReactNode;
}

/**
 * Vertical-rhythm section with optional eyebrow + heading.
 * `id` doubles as the scroll anchor target for the navbar.
 */
export function Section({
  id,
  wide,
  contained = true,
  index,
  eyebrow,
  heading,
  className,
  children,
  ...props
}: SectionProps) {
  const header = (eyebrow || heading) && (
    <header className="mb-10 text-center md:mb-12">
      {eyebrow && (
        <p className="font-mono text-eyebrow uppercase tracking-[0.2em] text-accent">
          {index && <span className="text-content-dim">{index} — </span>}
          {eyebrow}
        </p>
      )}
      {heading && <h2 className="mt-3 font-heading text-h2 font-normal text-content">{heading}</h2>}
      <RuleReveal className="mx-auto mt-6 max-w-24 origin-center md:mt-8" />
    </header>
  );

  const inner = (
    <>
      {header}
      {children}
    </>
  );

  return (
    <section id={id} className={cn('relative scroll-mt-4 py-10 md:py-16', className)} {...props}>
      {contained ? <Container wide={wide}>{inner}</Container> : inner}
    </section>
  );
}
