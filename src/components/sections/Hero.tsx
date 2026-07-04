'use client';

import { useEffect, useState } from 'react';
import { m } from 'framer-motion';
import { ArrowRight, ChevronDown, FileDown, Github, Linkedin } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import { TextReveal } from '@/components/animations/TextReveal';
import { CountUp } from '@/components/animations/CountUp';
import { Magnetic } from '@/components/animations/Magnetic';
import { usePrefersReducedMotion } from '@/hooks/useMediaQuery';
import { profile } from '@/data/profile';
import { platforms } from '@/data/competitive';
import { EASE_EXPO } from '@/lib/constants';

/** Full-viewport hero: gradient-mesh backdrop, char-reveal name, CP ticker, socials, scroll cue. */
export function Hero() {
  const reduced = usePrefersReducedMotion();
  const [scrolled, setScrolled] = useState(false);

  // Fade the scroll cue out once the visitor leaves the top of the page.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const fade = (delay: number) =>
    reduced
      ? { initial: { opacity: 0 }, animate: { opacity: 1 }, transition: { duration: 0.3, delay } }
      : {
          initial: { opacity: 0, y: 16 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.8, ease: EASE_EXPO, delay },
        };

  const iconSocials = [
    { key: 'github', href: profile.socials.github, label: 'GitHub', icon: <Github className="h-5 w-5" /> },
    { key: 'linkedin', href: profile.socials.linkedin, label: 'LinkedIn', icon: <Linkedin className="h-5 w-5" /> },
  ];
  const badgeSocials = [
    { key: 'codeforces', href: profile.socials.codeforces, label: 'Codeforces', badge: 'CF' },
    { key: 'leetcode', href: profile.socials.leetcode, label: 'LeetCode', badge: 'LC' },
  ];

  return (
    <section id="top" className="relative min-h-screen flex flex-col justify-center overflow-hidden">
      {/* Neon gradient-mesh backdrop */}
      <div className="grad-mesh" aria-hidden />
      {/* Fade the base into the next section */}
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-b from-transparent to-bg"
        aria-hidden
      />

      <Container className="relative z-10 py-24 sm:py-32">
        <div className="max-w-4xl">
          {/* Eyebrow */}
          <m.p
            {...fade(0.05)}
            className="mb-5 font-mono text-eyebrow uppercase tracking-[0.28em] text-accent"
          >
            {profile.title}
          </m.p>

          {/* Name — LCP element: painted immediately (opacity stays 1), transform-only entrance. */}
          <m.h1
            className="text-gradient font-display text-display leading-[0.95] break-words"
            initial={reduced ? false : { y: '0.18em' }}
            animate={{ y: 0 }}
            transition={{ duration: 0.7, ease: EASE_EXPO }}
          >
            {profile.brandName}
          </m.h1>

          {/* Positioning / tagline */}
          <TextReveal
            text={profile.tagline}
            by="word"
            onMount
            delay={0.6}
            as="p"
            className="mt-7 max-w-2xl text-pretty text-body-lg text-content-muted"
          />

          {/* Dual CTA */}
          <m.div
            {...fade(0.9)}
            className="mt-10 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:gap-4"
          >
            <Magnetic className="w-full sm:w-auto">
              <Button href="#projects" className="w-full sm:w-auto">
                View Work
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Magnetic>
            <Button href={profile.resume} variant="ghost" className="w-full sm:w-auto">
              Résumé
              <FileDown className="h-4 w-4" />
            </Button>
          </m.div>

          {/* Competitive-programming rating ticker */}
          <m.ul
            {...fade(1.1)}
            className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-3 sm:mt-12 sm:gap-x-8 sm:gap-y-4"
            aria-label="Competitive programming ratings"
          >
            {platforms.map((p) => (
              <li key={p.name} className="flex items-center gap-2.5">
                <span
                  className="h-2 w-2 shrink-0 rounded-full"
                  style={{ backgroundColor: p.color, boxShadow: `0 0 10px ${p.color}` }}
                  aria-hidden
                />
                <span className="font-mono text-small text-content-dim">{p.name}</span>
                <CountUp to={p.rating} className="font-mono text-small font-semibold text-content" />
                <span className="font-mono text-small text-content-dim">{p.label}</span>
              </li>
            ))}
          </m.ul>

          {/* Social links */}
          <m.div {...fade(1.25)} className="mt-9 flex flex-wrap items-center gap-3">
            {iconSocials.map((s) => (
              <Magnetic key={s.key} strength={8}>
                <Button href={s.href} variant="icon" aria-label={s.label}>
                  {s.icon}
                </Button>
              </Magnetic>
            ))}
            {badgeSocials.map((s) => (
              <Magnetic key={s.key} strength={8}>
                <Button href={s.href} variant="icon" aria-label={s.label}>
                  <span className="font-mono text-small font-semibold">{s.badge}</span>
                </Button>
              </Magnetic>
            ))}
          </m.div>
        </div>
      </Container>

      {/* Scroll cue */}
      <m.a
        href="#about"
        aria-label="Scroll to content"
        className="absolute inset-x-0 bottom-8 z-10 mx-auto flex w-fit flex-col items-center gap-1.5 text-content-dim transition-opacity duration-500 hover:text-accent"
        style={{ opacity: scrolled ? 0 : 1, pointerEvents: scrolled ? 'none' : 'auto' }}
        animate={reduced ? undefined : { y: [0, 8, 0] }}
        transition={reduced ? undefined : { duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
      >
        <span className="font-mono text-eyebrow uppercase tracking-[0.2em]">Scroll</span>
        <ChevronDown className="h-5 w-5" aria-hidden />
      </m.a>
    </section>
  );
}
