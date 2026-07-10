import { cn } from '@/lib/utils';

interface ChipProps extends React.HTMLAttributes<HTMLSpanElement> {
  glow?: boolean;
}

/** Pill tag — mono, small. `glow` adds an accent border on hover (skill chips). */
export function Chip({ glow, className, children, ...props }: ChipProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full border border-border bg-surface-2 px-3 py-1 font-mono text-small text-content-muted transition-all duration-200 ease-smooth',
        glow && 'hover:-translate-y-0.5 hover:border-accent hover:text-content',
        className,
      )}
      {...props}
    >
      {children}
    </span>
  );
}
