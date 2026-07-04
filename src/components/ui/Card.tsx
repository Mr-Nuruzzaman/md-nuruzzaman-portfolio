import { cn } from '@/lib/utils';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Adds hover lift + border glow. On by default. */
  interactive?: boolean;
}

/**
 * Glassmorphism surface (rgba bg + backdrop-blur + hairline border).
 * For cursor tilt/spotlight, wrap children in <TiltCard> instead of using this directly.
 */
export function Card({ interactive = true, className, children, ...props }: CardProps) {
  return (
    <div
      className={cn(
        'glass rounded-lg transition-all duration-300 ease-smooth',
        interactive && 'hover:-translate-y-1 hover:border-border-glow hover:shadow-glow-violet',
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}
