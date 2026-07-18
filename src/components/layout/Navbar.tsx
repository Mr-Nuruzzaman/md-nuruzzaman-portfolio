'use client';

import { useEffect, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';
import { AnimatePresence, m } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { profile } from '@/data/profile';
import { NAV_LINKS, EASE_SMOOTH } from '@/lib/constants';
import { cn } from '@/lib/utils';
import { useIsDesktop, usePrefersReducedMotion } from '@/hooks/useMediaQuery';
import { Button } from '@/components/ui/Button';
import { LogoMark } from '@/components/ui/LogoMark';

const FOCUSABLE = 'button, a[href], input, [tabindex]:not([tabindex="-1"])';

/** Floating pill nav: backdrop-blur pill, hide-on-scroll-down/reveal-on-up, active-section indicator, mobile drawer. */
export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [active, setActive] = useState<string>('');
  const [open, setOpen] = useState(false);
  const isDesktop = useIsDesktop();
  const reduced = usePrefersReducedMotion();
  // On subpages (/projects/[slug]) bare `#id` anchors are dead — route back to the homepage section.
  const onHome = usePathname() === '/';
  const anchor = (id: string) => (onHome ? `#${id}` : `/#${id}`);
  const hamburgerRef = useRef<HTMLButtonElement>(null);
  const drawerRef = useRef<HTMLDivElement>(null);

  // Shadow-on-scroll + hide-on-scroll-down. Anchor navigation (nav/footer links) smooth-scrolls
  // a long way DOWN, which read as "scrolling down" and hid the pill right as the user landed —
  // so any in-page anchor click suppresses the auto-hide until the programmatic scroll settles.
  useEffect(() => {
    let last = window.scrollY;
    let suppressUntil = 0;
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 24);
      const now = Date.now();
      if (now < suppressUntil) {
        setHidden(false);
        // Keep suppressing while the programmatic scroll is still emitting events;
        // it ends ~300ms after the animation settles, however long Lenis takes.
        suppressUntil = Math.max(suppressUntil, now + 300);
      } else {
        setHidden(y > last && y > 400 && !open);
      }
      last = y;
    };
    const onAnchorClick = (e: MouseEvent) => {
      const a = (e.target as HTMLElement)?.closest('a[href^="#"], a[href^="/#"]');
      if (!a) return;
      suppressUntil = Date.now() + 1000;
      setHidden(false);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    document.addEventListener('click', onAnchorClick, true);
    return () => {
      window.removeEventListener('scroll', onScroll);
      document.removeEventListener('click', onAnchorClick, true);
    };
  }, [open]);

  // Active-section tracking via IntersectionObserver.
  useEffect(() => {
    const sections = NAV_LINKS.map((l) => document.getElementById(l.id)).filter(Boolean) as HTMLElement[];
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: '-45% 0px -50% 0px' },
    );
    sections.forEach((s) => obs.observe(s));
    return () => obs.disconnect();
  }, []);

  // Close the drawer when resizing up to desktop (avoids a stuck scroll-lock).
  useEffect(() => {
    if (isDesktop) setOpen(false);
  }, [isDesktop]);

  // Lock body scroll, trap focus, and Esc-to-close (returning focus to the hamburger) while the drawer is open.
  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = 'hidden';

    const focusables = () =>
      drawerRef.current
        ? Array.from(drawerRef.current.querySelectorAll<HTMLElement>(FOCUSABLE)).filter(
            (el) => !el.hasAttribute('disabled'),
          )
        : [];
    const raf = requestAnimationFrame(() => focusables()[0]?.focus());

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(false);
        hamburgerRef.current?.focus();
        return;
      }
      if (e.key !== 'Tab') return;
      const f = focusables();
      if (!f.length) return;
      const first = f[0]!;
      const last = f[f.length - 1]!;
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    document.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      cancelAnimationFrame(raf);
      document.removeEventListener('keydown', onKey);
    };
  }, [open]);

  return (
    <m.header
      initial={false}
      animate={{ y: hidden && !reduced ? '-140%' : '0%' }}
      transition={{ duration: 0.35, ease: EASE_SMOOTH }}
      className="fixed inset-x-0 top-0 z-50 flex justify-center px-4 pt-4"
    >
      <nav
        className={cn(
          'flex h-14 max-w-fit items-center gap-1 rounded-full border bg-bg/70 pl-2 pr-2 backdrop-blur-md transition-shadow duration-300',
          scrolled ? 'border-border-glow shadow-[0_10px_40px_-12px_rgba(0,0,0,0.65)]' : 'border-border shadow-none',
        )}
      >
        <a
          href={onHome ? '#top' : '/'}
          onClick={() => setOpen(false)}
          aria-label={`${profile.brandName} — home`}
          className="group inline-flex items-center rounded-full px-1"
        >
          <LogoMark size={32} />
        </a>

        {/* Desktop links */}
        <ul className="mx-1 hidden items-center gap-0.5 md:flex">
          {NAV_LINKS.map((link, i) => (
            <li key={link.id}>
              <a
                href={anchor(link.id)}
                className={cn(
                  'relative rounded-full px-3.5 py-2 text-small transition-colors',
                  active === link.id ? 'text-accent-2' : 'text-content-muted hover:text-content',
                )}
              >
                {active === link.id && (
                  <m.span
                    layoutId="nav-active"
                    className="absolute inset-0 -z-10 rounded-full bg-surface-2"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
                <span
                  className={cn(
                    'mr-1 font-mono text-[0.625rem]',
                    active === link.id ? 'text-accent' : 'text-content-dim',
                  )}
                >
                  {String(i + 1).padStart(2, '0')}
                </span>
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-1.5">
          <Button
            href={profile.resume}
            variant="ghost"
            size="sm"
            className="hidden rounded-full border-border sm:inline-flex"
          >
            Résumé
          </Button>
          {/* Hamburger */}
          <button
            ref={hamburgerRef}
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            aria-controls="mobile-drawer"
            className="grid h-10 w-10 place-items-center rounded-full border border-border bg-surface text-content-muted transition-colors hover:border-border-glow hover:text-accent-2 md:hidden"
          >
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </nav>

      {/* Mobile drawer — drops from the pill */}
      <AnimatePresence>
        {open && (
          <m.div
            ref={drawerRef}
            id="mobile-drawer"
            initial={reduced ? { opacity: 0 } : { opacity: 0, y: -8 }}
            animate={reduced ? { opacity: 1 } : { opacity: 1, y: 0 }}
            exit={reduced ? { opacity: 0 } : { opacity: 0, y: -8 }}
            transition={{ duration: 0.25, ease: EASE_SMOOTH }}
            className="absolute inset-x-4 top-[4.75rem] mx-auto max-w-xs overflow-hidden rounded-2xl border border-border bg-bg-elev shadow-[0_10px_40px_-12px_rgba(0,0,0,0.65)] md:hidden"
          >
            <ul className="flex flex-col gap-1 p-3">
              {NAV_LINKS.map((link, i) => (
                <li key={link.id}>
                  <a
                    href={anchor(link.id)}
                    onClick={() => setOpen(false)}
                    className={cn(
                      'block rounded-xl px-3 py-3 text-body transition-colors',
                      active === link.id ? 'bg-surface-2 text-accent-2' : 'text-content-muted hover:text-content',
                    )}
                  >
                    <span
                      className={cn(
                        'mr-2 font-mono text-[0.625rem]',
                        active === link.id ? 'text-accent' : 'text-content-dim',
                      )}
                    >
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    {link.label}
                  </a>
                </li>
              ))}
              <li className="mt-1">
                <Button
                  href={profile.resume}
                  variant="ghost"
                  size="sm"
                  className="w-full rounded-xl"
                  onClick={() => setOpen(false)}
                >
                  Résumé
                </Button>
              </li>
            </ul>
          </m.div>
        )}
      </AnimatePresence>
    </m.header>
  );
}
