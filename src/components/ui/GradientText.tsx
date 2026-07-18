import { cn } from '@/lib/utils';

interface GradientTextProps extends React.HTMLAttributes<HTMLSpanElement> {
  as?: React.ElementType;
}

/** Signature emphasis: teal accent, inheriting the surrounding font + weight. (Name kept for legacy imports.) */
export function GradientText({ as: Tag = 'span', className, children, ...props }: GradientTextProps) {
  return (
    <Tag className={cn('text-accent', className)} {...props}>
      {children}
    </Tag>
  );
}
