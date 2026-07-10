import { cn } from '@/lib/utils';

interface LogoMarkProps {
  size?: number;
  className?: string;
}

/**
 * Brand mark — an ember serif-italic "N" set in a hairline-framed tile with a
 * notched corner (letterpress plate look). Pairs with the wax-seal résumé badge.
 * Hover (via parent `group`): frame warms to accent, the N lifts to full ember.
 */
export function LogoMark({ size = 36, className }: LogoMarkProps) {
  return (
    <span
      aria-hidden
      style={{ width: size, height: size }}
      className={cn(
        'relative grid shrink-0 select-none place-items-center overflow-hidden rounded-sm border border-border-glow bg-surface transition-colors duration-200 group-hover:border-accent',
        className,
      )}
    >
      {/* Notched corner — tiny ember triangle, the "printer's mark" */}
      <span
        aria-hidden
        className="absolute right-0 top-0 h-2 w-2 bg-accent opacity-80 transition-opacity duration-200 [clip-path:polygon(100%_0,0_0,100%_100%)] group-hover:opacity-100"
      />
      <span className="font-display text-xl italic leading-none text-accent-2 transition-colors duration-200 group-hover:text-accent">
        N
      </span>
    </span>
  );
}
