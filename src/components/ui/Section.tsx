import { cn } from '@/lib/utils';
import { Container } from './Container';

interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  id?: string;
  wide?: boolean;
  /** Set false to opt out of the centered Container (e.g. full-bleed marquee). */
  contained?: boolean;
  eyebrow?: string;
  heading?: React.ReactNode;
}

/**
 * Vertical-rhythm section with optional eyebrow + heading.
 * `id` doubles as the scroll anchor target for the navbar.
 */
export function Section({ id, wide, contained = true, eyebrow, heading, className, children, ...props }: SectionProps) {
  const header = (eyebrow || heading) && (
    <header className="mb-12 md:mb-16">
      {eyebrow && <p className="font-mono text-eyebrow uppercase tracking-[0.2em] text-accent">{eyebrow}</p>}
      {heading && <h2 className="mt-3 font-heading text-h2 font-normal text-content">{heading}</h2>}
    </header>
  );

  const inner = (
    <>
      {header}
      {children}
    </>
  );

  return (
    <section id={id} className={cn('relative scroll-mt-4 py-16 md:py-32', className)} {...props}>
      {contained ? <Container wide={wide}>{inner}</Container> : inner}
    </section>
  );
}
