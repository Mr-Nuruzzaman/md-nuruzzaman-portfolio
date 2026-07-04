import Link from 'next/link';
import { cn } from '@/lib/utils';

type Variant = 'primary' | 'ghost' | 'icon';
type Size = 'sm' | 'md';

const base =
  'relative inline-flex items-center justify-center gap-2 rounded-md font-medium transition-all duration-200 ease-smooth focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent disabled:pointer-events-none disabled:opacity-50';

const variants: Record<Variant, string> = {
  primary: 'bg-grad-primary text-bg shadow-none hover:scale-[1.02] hover:shadow-glow-cyan active:scale-[0.98]',
  ghost:
    'border border-border-glow bg-transparent text-content hover:border-accent hover:text-accent hover:shadow-glow-cyan',
  icon: 'h-11 w-11 rounded-md border border-border bg-surface/60 text-content-muted backdrop-blur hover:border-accent hover:text-accent',
};

const sizes: Record<Size, string> = {
  sm: 'h-10 px-4 text-small',
  md: 'h-12 px-6 text-body',
};

interface CommonProps {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: React.ReactNode;
}

type ButtonAsButton = CommonProps &
  Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, keyof CommonProps> & { href?: undefined };
type ButtonAsLink = CommonProps &
  Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, keyof CommonProps> & { href: string };

export type ButtonProps = ButtonAsButton | ButtonAsLink;

/** Gradient/ghost/icon button. Renders a next/link when `href` is passed; external hrefs open in a new tab. */
export function Button(props: ButtonProps) {
  const { variant = 'primary', size = 'md', className, children } = props;
  const cls = cn(base, variants[variant], variant !== 'icon' && sizes[size], className);

  if ('href' in props && props.href !== undefined) {
    const { href, variant: _v, size: _s, className: _c, children: _ch, ...rest } = props;
    const external = /^https?:\/\//.test(href);
    return (
      <Link
        href={href}
        className={cls}
        {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
        {...rest}
      >
        {children}
      </Link>
    );
  }

  const { variant: _v, size: _s, className: _c, children: _ch, href: _h, ...rest } = props as ButtonAsButton;
  return (
    <button className={cls} {...rest}>
      {children}
    </button>
  );
}
