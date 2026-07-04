import { cn } from '@/lib/utils';

interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  wide?: boolean;
}

/** Centered max-width wrapper. `wide` uses the 1440px track, default is 1200px. */
export function Container({ wide, className, children, ...props }: ContainerProps) {
  return (
    <div className={cn('mx-auto w-full px-6 md:px-8', wide ? 'max-w-wide' : 'max-w-container', className)} {...props}>
      {children}
    </div>
  );
}
