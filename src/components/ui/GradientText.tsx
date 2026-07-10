import { cn } from '@/lib/utils';

interface GradientTextProps extends React.HTMLAttributes<HTMLSpanElement> {
  as?: React.ElementType;
}

/** Signature emphasis: ember italic serif. (Name kept for legacy imports — gradient retired.) */
export function GradientText({ as: Tag = 'span', className, children, ...props }: GradientTextProps) {
  return (
    <Tag className={cn('font-display italic text-accent-2', className)} {...props}>
      {children}
    </Tag>
  );
}
