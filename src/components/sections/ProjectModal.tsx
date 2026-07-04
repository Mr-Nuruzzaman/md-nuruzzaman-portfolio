'use client';

import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import Image from 'next/image';
import { AnimatePresence, m } from 'framer-motion';
import { Check, ExternalLink, Github, X } from 'lucide-react';
import { Chip } from '@/components/ui/Chip';
import { Button } from '@/components/ui/Button';
import type { IProject } from '@/data/projects';
import { EASE_EXPO } from '@/lib/constants';
import { cn, galleryOf, initials } from '@/lib/utils';
import { usePrefersReducedMotion } from '@/hooks/useMediaQuery';

const FOCUSABLE = 'button, a[href], input, [tabindex]:not([tabindex="-1"])';

export function ProjectModal({ project, onClose }: { project: IProject | null; onClose: () => void }) {
  const [active, setActive] = useState(0);
  const [mounted, setMounted] = useState(false);
  const [errored, setErrored] = useState<Set<string>>(new Set());

  // Portal target only exists on the client.
  useEffect(() => setMounted(true), []);
  const panelRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<Element | null>(null);
  const reduced = usePrefersReducedMotion();
  const gallery = galleryOf(project);

  // Reset per-project view state.
  useEffect(() => {
    setActive(0);
    setErrored(new Set());
  }, [project]);

  // Focus management (trap + initial + return), Esc, and scroll-lock while open.
  useEffect(() => {
    if (!project) return;
    triggerRef.current = document.activeElement;
    const focusables = () =>
      panelRef.current
        ? Array.from(panelRef.current.querySelectorAll<HTMLElement>(FOCUSABLE)).filter((el) => !el.hasAttribute('disabled'))
        : [];
    const raf = requestAnimationFrame(() => focusables()[0]?.focus());

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
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
    document.body.style.overflow = 'hidden';
    // Hide the rest of the page from AT / the tab order while the dialog is open.
    const bg = [document.getElementById('main'), document.querySelector('header')].filter(Boolean) as HTMLElement[];
    bg.forEach((el) => {
      el.setAttribute('inert', '');
      el.setAttribute('aria-hidden', 'true');
    });
    return () => {
      cancelAnimationFrame(raf);
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
      bg.forEach((el) => {
        el.removeAttribute('inert');
        el.removeAttribute('aria-hidden');
      });
      (triggerRef.current as HTMLElement | null)?.focus?.();
    };
  }, [project, onClose]);

  const panelMotion = reduced
    ? { initial: { opacity: 0 }, animate: { opacity: 1 }, exit: { opacity: 0 } }
    : {
        initial: { opacity: 0, y: 40, scale: 0.98 },
        animate: { opacity: 1, y: 0, scale: 1 },
        exit: { opacity: 0, y: 40, scale: 0.98 },
      };

  const activeSrc = gallery[active];
  const showImage = activeSrc && !errored.has(activeSrc);

  if (!mounted) return null;

  return createPortal(
    <AnimatePresence>
      {project && (
        <m.div
          data-lenis-prevent
          className="fixed inset-0 z-[60] flex items-end justify-center p-0 sm:items-center sm:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          {/* Backdrop */}
          <button aria-label="Close details" onClick={onClose} className="absolute inset-0 bg-bg/70 backdrop-blur-sm" />

          {/* Panel */}
          <m.div
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="project-modal-title"
            {...panelMotion}
            transition={{ duration: 0.4, ease: EASE_EXPO }}
            className="glass relative z-10 flex max-h-[90vh] w-full max-w-2xl flex-col overflow-hidden rounded-t-2xl border-border-glow sm:rounded-2xl"
          >
            {/* Close */}
            <button
              onClick={onClose}
              aria-label="Close"
              className="absolute right-4 top-4 z-20 grid h-11 w-11 place-items-center rounded-md border border-border bg-bg/60 text-content-muted backdrop-blur transition-colors hover:border-accent hover:text-accent"
            >
              <X size={18} />
            </button>

            <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain" data-lenis-prevent>
              {/* Main preview */}
              <div className="relative aspect-[16/9] w-full overflow-hidden border-b border-border">
                {showImage ? (
                  <Image
                    key={activeSrc}
                    src={activeSrc}
                    alt={`${project.title} preview ${active + 1}`}
                    fill
                    sizes="672px"
                    className="object-cover"
                    onError={() => setErrored((s) => new Set(s).add(activeSrc))}
                  />
                ) : (
                  <div className="absolute inset-0 grid place-items-center">
                    <div className="absolute inset-0 bg-grad-primary opacity-20" aria-hidden />
                    <span className="relative select-none font-mono text-6xl font-bold tracking-tighter text-content/80" aria-hidden>
                      {initials(project.title)}
                    </span>
                  </div>
                )}
                <div className="absolute left-4 top-4 flex flex-wrap gap-2">
                  {project.badge && (
                    <Chip glow className="border-accent/40 text-accent">
                      {project.badge}
                    </Chip>
                  )}
                  {project.status && <Chip className="bg-bg/60">{project.status}</Chip>}
                </div>
              </div>

              {/* Thumbnail strip */}
              {gallery.length > 1 && (
                <div className="flex gap-2 overflow-x-auto border-b border-border p-3">
                  {gallery.map((src, i) => (
                    <button
                      key={src + i}
                      onClick={() => setActive(i)}
                      aria-label={`Show image ${i + 1}`}
                      aria-current={i === active}
                      className={cn(
                        'relative aspect-video h-14 shrink-0 overflow-hidden rounded-md border transition-all',
                        i === active ? 'border-accent shadow-glow-cyan' : 'border-border opacity-60 hover:opacity-100',
                      )}
                    >
                      <Image src={src} alt="" fill sizes="120px" className="object-cover" />
                    </button>
                  ))}
                </div>
              )}

              {/* Body */}
              <div className="flex flex-col gap-6 p-6 sm:p-8">
                <div className="flex flex-col gap-2">
                  <h3 id="project-modal-title" className="pr-10 font-heading text-h3 font-bold leading-tight text-content">
                    {project.title}
                  </h3>
                  {project.role && <p className="font-mono text-small text-accent">{project.role}</p>}
                </div>

                <p className="text-body leading-relaxed text-content-muted">{project.description}</p>

                {project.highlights && project.highlights.length > 0 && (
                  <div>
                    <h4 className="mb-3 font-mono text-eyebrow uppercase tracking-widest text-content-dim">Highlights</h4>
                    <ul className="flex flex-col gap-2">
                      {project.highlights.map((h) => (
                        <li key={h} className="flex gap-3 text-content-muted">
                          <Check className="mt-0.5 h-4 w-4 shrink-0 text-accent" strokeWidth={2.5} aria-hidden />
                          <span className="text-small leading-relaxed sm:text-body">{h}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {project.integrations && project.integrations.length > 0 && (
                  <div>
                    <h4 className="mb-3 font-mono text-eyebrow uppercase tracking-widest text-content-dim">Integrations</h4>
                    <ul className="flex flex-wrap gap-2">
                      {project.integrations.map((i) => (
                        <li key={i}>
                          <Chip>{i}</Chip>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                <div>
                  <h4 className="mb-3 font-mono text-eyebrow uppercase tracking-widest text-content-dim">Stack</h4>
                  <ul className="flex flex-wrap gap-2">
                    {project.tech.map((t) => (
                      <li key={t}>
                        <Chip glow>{t}</Chip>
                      </li>
                    ))}
                  </ul>
                </div>

                {(project.links.live || project.links.repo) && (
                  <div className="flex flex-wrap gap-3 pt-1">
                    {project.links.live && (
                      <Button href={project.links.live} size="md">
                        Visit live
                        <ExternalLink className="h-4 w-4" aria-hidden />
                      </Button>
                    )}
                    {project.links.repo && (
                      <Button href={project.links.repo} variant="ghost" size="md">
                        <Github className="h-4 w-4" aria-hidden />
                        Code
                      </Button>
                    )}
                  </div>
                )}
              </div>
            </div>
          </m.div>
        </m.div>
      )}
    </AnimatePresence>,
    document.body,
  );
}
