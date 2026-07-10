import { cn } from '@/lib/utils';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Adds hover lift + border glow. On by default. */
  interactive?: boolean;
}

/**
 * Elevated surface — lightness shift + hairline border, no blur.
 * For cursor tilt/spotlight, wrap children in <TiltCard> instead of using this directly.
 */
export function Card({ interactive = true, className, children, ...props }: CardProps) {
  return (
    <div
      className={cn(
        'rounded-lg border border-border bg-surface transition-all duration-300 ease-smooth',
        interactive && 'hover:-translate-y-1 hover:border-border-glow hover:shadow-glow-violet',
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}
