'use client';

import { useEffect, useState } from 'react';
import { m } from 'framer-motion';
import { ArrowRight, ChevronDown, FileDown } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import { GradientText } from '@/components/ui/GradientText';
import {
  AtCoderIcon,
  CodeChefIcon,
  CodeforcesIcon,
  GitHubIcon,
  LeetCodeIcon,
  LinkedInIcon,
} from '@/components/ui/BrandIcons';
import { TextReveal } from '@/components/animations/TextReveal';
import { CountUp } from '@/components/animations/CountUp';
import { Magnetic } from '@/components/animations/Magnetic';
import { usePrefersReducedMotion } from '@/hooks/useMediaQuery';
import { profile } from '@/data/profile';
import { platforms } from '@/data/competitive';
import { EASE_EXPO } from '@/lib/constants';

/** Editorial hero: monumental Instrument Serif name, left-aligned, quiet bottom metadata rail. */
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
          transition: { duration: 0.7, ease: EASE_EXPO, delay },
        };

  // Signature headline reveal — masked per-word rise, staggered. No opacity so the name paints in place.
  const nameContainer = {
    hidden: {},
    show: { transition: { staggerChildren: 0.08, delayChildren: 0.05 } },
  };
  const nameWord = {
    hidden: { y: reduced ? '0%' : '110%' },
    show: { y: '0%', transition: { duration: 0.7, ease: EASE_EXPO } },
  };

  const socials = [
    { key: 'github', href: profile.socials.github, label: 'GitHub', icon: <GitHubIcon size={20} /> },
    { key: 'linkedin', href: profile.socials.linkedin, label: 'LinkedIn', icon: <LinkedInIcon size={20} /> },
    { key: 'codeforces', href: profile.socials.codeforces, label: 'Codeforces', icon: <CodeforcesIcon size={20} /> },
    { key: 'codechef', href: profile.socials.codechef, label: 'CodeChef', icon: <CodeChefIcon size={20} /> },
    { key: 'leetcode', href: profile.socials.leetcode, label: 'LeetCode', icon: <LeetCodeIcon size={20} /> },
    { key: 'atcoder', href: profile.socials.atcoder, label: 'AtCoder', icon: <AtCoderIcon size={20} /> },
  ];

  return (
    <section id="top" className="relative min-h-screen overflow-hidden">
      {/* Toned-down gradient-mesh backdrop */}
      <div className="grad-mesh" aria-hidden />
      {/* Fade the base into the next section */}
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-b from-transparent to-bg"
        aria-hidden
      />

      <Container className="relative z-10 flex min-h-screen flex-col py-28 sm:py-32">
        {/* Centered statement block */}
        <div className="flex flex-1 flex-col justify-center">
          <div className="max-w-4xl">
            {/* Eyebrow — quiet mono metadata */}
            <m.p {...fade(0.05)} className="mb-6 font-mono text-eyebrow uppercase tracking-[0.28em] text-content-dim">
              {profile.title} · {profile.location}
            </m.p>

            {/* Name — signature moment: masked rise per word, transform-only so the LCP text paints in place. */}
            <m.h1
              className="font-display text-display leading-[0.92] text-content"
              variants={nameContainer}
              initial="hidden"
              animate="show"
            >
              <span className="inline-flex overflow-hidden whitespace-nowrap pb-[0.1em] align-bottom">
                <m.span className="inline-block" variants={nameWord}>
                  Md
                </m.span>
              </span>{' '}
              <span className="inline-flex overflow-hidden whitespace-nowrap pb-[0.1em] align-bottom">
                <m.span className="inline-block" variants={nameWord}>
                  <GradientText>Nuruzzaman</GradientText>
                </m.span>
              </span>
            </m.h1>

            {/* Positioning / tagline */}
            <TextReveal
              text={profile.tagline}
              by="word"
              onMount
              delay={0.25}
              as="p"
              className="mt-8 max-w-2xl text-pretty text-body-lg text-content-muted"
            />

            {/* Dual CTA */}
            <m.div
              {...fade(0.4)}
              className="mt-10 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:gap-4"
            >
              <Magnetic className="w-full sm:w-auto">
                <Button href="#projects" className="w-full sm:w-auto">
                  View work
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Magnetic>
              <Button href={profile.resume} variant="ghost" className="w-full sm:w-auto">
                Résumé
                <FileDown className="h-4 w-4" />
              </Button>
            </m.div>
          </div>
        </div>

        {/* Bottom metadata rail — CP ratings + socials, quiet mono treatment */}
        <m.div
          {...fade(0.5)}
          className="mt-16 flex flex-col gap-8 border-t border-border pt-8 sm:flex-row sm:items-end sm:justify-between"
        >
          <ul className="flex flex-wrap items-baseline gap-x-8 gap-y-3" aria-label="Competitive programming ratings">
            {platforms.map((p) => (
              <li key={p.name} className="flex items-baseline gap-2 font-mono text-small">
                <span className="text-content-dim">{p.name}</span>
                <CountUp to={p.rating} className="font-semibold text-content" />
                <span className="text-content-dim">{p.label}</span>
              </li>
            ))}
          </ul>

          <div className="flex flex-wrap items-center gap-2 sm:shrink-0 sm:flex-nowrap">
            {socials.map((s) => (
              <Magnetic key={s.key} strength={8}>
                <Button href={s.href} variant="icon" aria-label={`Md Nuruzzaman on ${s.label}`}>
                  {s.icon}
                </Button>
              </Magnetic>
            ))}
          </div>
        </m.div>
      </Container>

      {/* Scroll cue */}
      <m.a
        href="#about"
        aria-label="Scroll to content"
        className="absolute inset-x-0 bottom-4 z-10 mx-auto flex w-fit flex-col items-center gap-1.5 text-content-dim transition-opacity duration-500 hover:text-accent"
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
