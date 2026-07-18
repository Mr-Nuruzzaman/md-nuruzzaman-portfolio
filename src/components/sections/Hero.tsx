'use client';

import { useEffect, useState } from 'react';
import { m } from 'framer-motion';
import { ArrowRight, ChevronDown, FileDown } from 'lucide-react';
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
import { SignatureName } from '@/components/animations/SignatureName';
import { HeroVisual } from '@/components/animations/HeroVisual';
import { usePrefersReducedMotion } from '@/hooks/useMediaQuery';
import { profile } from '@/data/profile';
import { platforms } from '@/data/competitive';

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
        {/* Statement block — single column on mobile, two-column composition from lg up */}
        <div className="flex flex-1 flex-col justify-center">
          <div className="lg:grid lg:grid-cols-12 lg:items-center lg:gap-12">
            {/* Left — the words (~58% at lg) */}
            <div className="max-w-4xl lg:col-span-7">
              {/* Eyebrow — quiet mono metadata. CSS entrance: visible from first paint, no hydration wait. */}
              <p
                className="rise-in mb-6 font-mono text-eyebrow uppercase tracking-[0.28em] text-content-dim"
                style={{ '--rise-delay': '0.05s' } as React.CSSProperties}
              >
                {profile.title} · {profile.location}
              </p>

              {/* Name — signature moment: serif glyphs stroke themselves in, then the fill fades up. */}
              <h1 className="font-display text-display leading-[0.95] text-content">
                <SignatureName />
              </h1>

              {/* Positioning / tagline */}
              <p
                className="rise-in mt-8 max-w-2xl text-pretty text-body-lg text-content-muted"
                style={{ '--rise-delay': '0.25s' } as React.CSSProperties}
              >
                {profile.tagline}
              </p>

              {/* Dual CTA — primary work link + ghost résumé, both on every breakpoint */}
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

            {/* Right — focal visual (~42% at lg), centred; absent below lg so mobile is unchanged */}
            <div className="hidden lg:col-span-5 lg:flex lg:justify-center">
              <HeroVisual />
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
