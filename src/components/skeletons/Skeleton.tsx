import { cn } from '@/lib/utils';

/**
 * Skeleton primitive — Facebook-style shimmer placeholder.
 *
 * Shape and size come entirely from Tailwind classes at the call site so each
 * section's skeleton file mirrors its real component's box math exactly (zero
 * layout shift on swap). The `.skeleton` class (globals.css) paints one
 * viewport-synced gradient sweep shared by every instance on screen, and goes
 * static under prefers-reduced-motion.
 *
 * Individual bars are decoration — mark the REGION, not each bar: wrap a
 * section's skeleton in `role="status" aria-busy="true"` with one visually
 * hidden "Loading…" (see SkeletonSection).
 */
export function Skeleton({ className }: { className?: string }) {
  return <span aria-hidden className={cn('skeleton block rounded', className)} />;
}

/** Region wrapper: announces loading once to screen readers, hides the bars. */
export function SkeletonSection({
  label = 'Loading…',
  className,
  children,
}: {
  label?: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div role="status" aria-busy="true" className={className}>
      <span className="sr-only">{label}</span>
      <div aria-hidden>{children}</div>
    </div>
  );
}
