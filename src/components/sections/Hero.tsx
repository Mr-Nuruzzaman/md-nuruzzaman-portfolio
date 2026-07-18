'use client';

import { useEffect, useState } from 'react';
import { m } from 'framer-motion';
import { ArrowRight, FileDown } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import {
  AtCoderIcon,
  CodeChefIcon,
  CodeforcesIcon,
  GitHubIcon,
  LeetCodeIcon,
  LinkedInIcon,
} from '@/components/ui/BrandIcons';
import { CountUp } from '@/components/animations/CountUp';
import { Magnetic } from '@/components/animations/Magnetic';
import { PathfinderCanvas } from '@/components/animations/PathfinderCanvas';
import { usePrefersReducedMotion } from '@/hooks/useMediaQuery';
import { profile } from '@/data/profile';
import { platforms } from '@/data/competitive';

// Shell-prompt path from the real location: "Dhaka, Bangladesh" → "~/dhaka/bangladesh".
const shellPath = `~/${profile.location
  .toLowerCase()
  .split(',')
  .map((s) => s.trim())
  .filter(Boolean)
  .join('/')}`;

// Accent a key identity phrase in the tagline only when it genuinely appears — never forced.
const KEY_PHRASE = 'competitive programmer';
const taglineIdx = profile.tagline.toLowerCase().indexOf(KEY_PHRASE);

/** Hero: A* pathfinder canvas behind a left-aligned, terminal-flavoured statement block. */
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
      {/* A* pathfinder — ambient background layer, behind everything, non-interactive */}
      <PathfinderCanvas className="pointer-events-none absolute inset-0 z-0 h-full w-full" />
      {/* Faint blueprint graph-paper behind the words */}
      <div className="blueprint-grid z-0" aria-hidden />
      {/* One quiet teal bloom for atmosphere */}
      <div className="grad-mesh z-0" aria-hidden />
      {/* Fade the base into the next section */}
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 z-0 h-32 bg-gradient-to-b from-transparent to-bg"
        aria-hidden
      />

      <Container className="relative z-10 flex min-h-screen flex-col py-28 sm:py-32">
        {/* Statement block — single left-aligned column */}
        <div className="flex flex-1 flex-col justify-center">
          <div className="max-w-4xl">
            {/* Eyebrow — shell prompt in mono, one slow-blinking block caret */}
            <p
              className="rise-in mb-7 flex items-center font-mono text-small tracking-tight"
              style={{ '--rise-delay': '0.05s' } as React.CSSProperties}
            >
              <span className="text-content-dim">{shellPath}</span>
              <span className="mx-2 text-accent-2">$</span>
              <span className="text-content-muted">whoami</span>
              <span
                aria-hidden
                className="caret-blink ml-2 inline-block h-[1.05em] w-[0.5em] translate-y-[0.08em] bg-accent"
              />
            </p>

            {/* Name — plain display text, CSS rise-in from first paint (no hydration gating).
                Custom clamp (not text-display) so the long single word "Nuruzzaman" clears
                narrow phones; the 8.5rem cap keeps the same monumental size on desktop. */}
            <h1
              className="rise-in font-display text-[clamp(2.9rem,10vw,8.5rem)] font-bold leading-[0.92] tracking-[-0.015em] text-content"
              style={{ '--rise-delay': '0.12s' } as React.CSSProperties}
            >
              {profile.name}
            </h1>

            {/* Positioning / tagline — key phrase accented only if naturally present */}
            <p
              className="rise-in mt-8 max-w-2xl text-pretty text-body-lg text-content-muted"
              style={{ '--rise-delay': '0.25s' } as React.CSSProperties}
            >
              {taglineIdx === -1 ? (
                profile.tagline
              ) : (
                <>
                  {profile.tagline.slice(0, taglineIdx)}
                  <span className="text-accent">
                    {profile.tagline.slice(taglineIdx, taglineIdx + KEY_PHRASE.length)}
                  </span>
                  {profile.tagline.slice(taglineIdx + KEY_PHRASE.length)}
                </>
              )}
            </p>

            {/* Dual CTA — primary work link + ghost résumé */}
            <div
              className="rise-in mt-10 flex flex-col gap-4 sm:flex-row sm:flex-wrap sm:items-center sm:gap-5"
              style={{ '--rise-delay': '0.4s' } as React.CSSProperties}
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
            </div>
          </div>
        </div>

        {/* Bottom metadata rail — CP ratings + socials, quiet mono treatment */}
        <div
          className="rise-in mt-16 flex flex-col gap-8 border-t border-border pt-8 sm:flex-row sm:items-end sm:justify-between"
          style={{ '--rise-delay': '0.5s' } as React.CSSProperties}
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
                <Button href={s.href} variant="icon" className="group" aria-label={`Md Nuruzzaman on ${s.label}`}>
                  {s.icon}
                </Button>
              </Magnetic>
            ))}
          </div>
        </div>
      </Container>

      {/* Scroll cue — refined mouse-wheel outline with a drifting accent dot */}
      <a
        href="#about"
        aria-label="Scroll to content"
        className="absolute inset-x-0 bottom-4 z-10 mx-auto flex w-fit flex-col items-center gap-2.5 text-content-dim transition-opacity duration-500 hover:text-accent"
        style={{ opacity: scrolled ? 0 : 1, pointerEvents: scrolled ? 'none' : 'auto' }}
      >
        <span className="font-mono text-eyebrow uppercase tracking-[0.2em]">Scroll</span>
        <span
          aria-hidden
          className="flex h-[34px] w-[22px] items-start justify-center rounded-full border border-border-glow pt-2"
        >
          <m.span
            className="h-[6px] w-[1.5px] rounded-full bg-accent"
            animate={reduced ? undefined : { y: [0, 10], opacity: [1, 0] }}
            transition={reduced ? undefined : { duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
          />
        </span>
      </a>
    </section>
  );
}
