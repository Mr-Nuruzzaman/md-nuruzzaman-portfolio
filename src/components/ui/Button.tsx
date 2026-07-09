import Link from 'next/link';
import { cn } from '@/lib/utils';

type Variant = 'primary' | 'ghost' | 'icon';
type Size = 'sm' | 'md';

const base =
  'relative inline-flex items-center justify-center gap-2 rounded-md font-medium transition-all duration-200 ease-smooth focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent disabled:pointer-events-none disabled:opacity-50';

const variants: Record<Variant, string> = {
  primary: 'bg-accent text-bg hover:brightness-110 active:scale-[0.97]',
  ghost: 'border border-border-glow bg-transparent text-content hover:border-accent hover:text-accent-2 active:scale-[0.97]',
  icon: 'h-11 w-11 rounded-md border border-border bg-surface text-content-muted hover:border-accent hover:text-accent-2 active:scale-[0.97]',
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

/** Solid/ghost/icon button. Renders a next/link when `href` is passed; external hrefs open in a new tab. */
export function Button(props: ButtonProps) {
  const { variant = 'primary', size = 'md', className, children } = props;
  const cls = cn(base, variants[variant], variant !== 'icon' && sizes[size], className);

  if ('href' in props && props.href !== undefined) {
    const { href, variant: _v, size: _s, className: _c, children: _ch, ...rest } = props;
    const external = /^https?:\/\//.test(href);
    // Static assets (e.g. the resume PDF) must not go through next/link — its router
    // prefetch requests them as an RSC route and 404s in the console.
    const asset = !external && /\.[a-z0-9]+$/i.test(href);
    if (external || asset) {
      return (
        <a href={href} className={cls} target="_blank" rel="noopener noreferrer" {...rest}>
          {children}
        </a>
      );
    }
    return (
      <Link href={href} className={cls} {...rest}>
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
