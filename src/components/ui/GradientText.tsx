import { cn } from '@/lib/utils';

interface GradientTextProps extends React.HTMLAttributes<HTMLSpanElement> {
  as?: React.ElementType;
}

/** Clips the signature primary gradient into its text. */
export function GradientText({ as: Tag = 'span', className, children, ...props }: GradientTextProps) {
  return (
    <Tag className={cn('text-gradient', className)} {...props}>
      {children}
    </Tag>
  );
}
