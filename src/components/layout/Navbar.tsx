'use client';

import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, m } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { profile } from '@/data/profile';
import { NAV_LINKS, EASE_SMOOTH } from '@/lib/constants';
import { cn } from '@/lib/utils';
import { useIsDesktop, usePrefersReducedMotion } from '@/hooks/useMediaQuery';
import { Button } from '@/components/ui/Button';

/** Sticky nav: blur-on-scroll, hide-on-scroll-down, active-section indicator, mobile drawer. */
export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [active, setActive] = useState<string>('');
  const [open, setOpen] = useState(false);
  const isDesktop = useIsDesktop();
  const reduced = usePrefersReducedMotion();
  const hamburgerRef = useRef<HTMLButtonElement>(null);

  // Blur + hide-on-scroll-down.
  useEffect(() => {
    let last = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 24);
      setHidden(y > last && y > 400 && !open);
      last = y;
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
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

  // Lock body scroll + Esc-to-close (returning focus to the hamburger) while the drawer is open.
  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = 'hidden';
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(false);
        hamburgerRef.current?.focus();
      }
    };
    document.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      document.removeEventListener('keydown', onKey);
    };
  }, [open]);

  return (
    <m.header
      initial={false}
      animate={{ y: hidden && !reduced ? '-100%' : '0%' }}
      transition={{ duration: 0.35, ease: EASE_SMOOTH }}
      className={cn(
        'fixed inset-x-0 top-0 z-50 transition-colors duration-300',
        scrolled || open ? 'border-b border-border bg-bg/70 backdrop-blur-xl' : 'border-b border-transparent',
      )}
    >
      <nav className="mx-auto flex h-16 max-w-container items-center justify-between px-6 md:px-8">
        <a href="#top" onClick={() => setOpen(false)} className="font-heading text-lg font-bold text-content">
          {profile.brandName}
        </a>

        {/* Desktop links */}
        <ul className="hidden items-center gap-1 md:flex">
          {NAV_LINKS.map((link) => (
            <li key={link.id}>
              <a
                href={`#${link.id}`}
                className={cn(
                  'relative rounded-md px-3 py-2 text-small transition-colors',
                  active === link.id ? 'text-content' : 'text-content-muted hover:text-content',
                )}
              >
                {active === link.id && (
                  <m.span
                    layoutId="nav-active"
                    className="absolute inset-0 -z-10 rounded-md bg-surface-2"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <Button href={profile.resume} variant="ghost" size="sm" className="hidden sm:inline-flex">
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
            className="grid h-11 w-11 place-items-center rounded-md border border-border bg-surface/60 text-content-muted transition-colors hover:border-accent hover:text-accent md:hidden"
          >
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </nav>

      {/* Mobile drawer */}
      <AnimatePresence>
        {open && (
          <m.div
            id="mobile-drawer"
            initial={reduced ? { opacity: 0 } : { opacity: 0, height: 0 }}
            animate={reduced ? { opacity: 1 } : { opacity: 1, height: 'auto' }}
            exit={reduced ? { opacity: 0 } : { opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: EASE_SMOOTH }}
            className="overflow-hidden border-t border-border bg-bg/95 backdrop-blur-xl md:hidden"
          >
            <ul className="flex flex-col gap-1 px-6 py-4">
              {NAV_LINKS.map((link) => (
                <li key={link.id}>
                  <a
                    href={`#${link.id}`}
                    onClick={() => setOpen(false)}
                    className={cn(
                      'block rounded-md px-3 py-3 text-body transition-colors',
                      active === link.id ? 'bg-surface-2 text-content' : 'text-content-muted hover:text-content',
                    )}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
              <li className="mt-2">
                <Button href={profile.resume} variant="ghost" size="sm" className="w-full" onClick={() => setOpen(false)}>
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
