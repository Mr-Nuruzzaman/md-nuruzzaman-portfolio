'use client';

import Image from 'next/image';
import { m } from 'framer-motion';
import { Section } from '@/components/ui/Section';
import { GradientText } from '@/components/ui/GradientText';
import { Reveal } from '@/components/animations/Reveal';
import { CountUp } from '@/components/animations/CountUp';
import { ExperienceStat } from '@/components/ui/ExperienceStat';
import { usePrefersReducedMotion } from '@/hooks/useMediaQuery';
import { EASE_EXPO } from '@/lib/constants';
import { cn } from '@/lib/utils';
import { profile } from '@/data/profile';

const facts = [
  { label: 'Location', value: profile.location },
  { label: 'Open to', value: profile.openTo.join(' · ') },
  { label: 'Focus', value: profile.remoteFocus },
] as const;

/**
 * Ambient binary-search motif: two hairline bounds (`lo`/`hi`) slide inward in
 * discrete halving steps and settle tight against the lead statement, then an
 * accent `mid` tick lands — the interval collapsing onto its answer. Decorative,
 * aria-hidden, md+ only, transform/opacity only; instant + settled under reduced motion.
 */
function BinarySearchBrackets() {
  const reduced = usePrefersReducedMotion();

  // Stepped keyframes (value held between jumps) read as discrete search steps rather than a slide.
  const times = [0, 0.12, 0.25, 0.45, 0.55, 0.78, 1];
  const bound = (dir: 'lo' | 'hi') => {
    const sign = dir === 'lo' ? -1 : 1;
    const x = [56, 56, 28, 28, 14, 14, 0].map((v) => sign * v);
    return {
      initial: { x: reduced ? 0 : sign * 56, opacity: reduced ? 1 : 0 },
      whileInView: reduced
        ? { x: 0, opacity: 1 }
        : { x, opacity: [0, 1, 1, 1, 1, 1, 1], transition: { duration: 1.1, times, ease: 'linear' } },
    };
  };

  return (
    <div aria-hidden className="pointer-events-none absolute -inset-x-4 inset-y-0 hidden md:block">
      {(['lo', 'hi'] as const).map((dir) => {
        const b = bound(dir);
        return (
          <m.div
            key={dir}
            initial={b.initial}
            whileInView={b.whileInView}
            viewport={{ once: true, margin: '-15% 0px' }}
            className={cn('absolute inset-y-0 w-px bg-content-dim/40', dir === 'lo' ? 'left-0' : 'right-0')}
          >
            <span className="absolute -top-5 left-1/2 -translate-x-1/2 font-mono text-[10px] uppercase tracking-[0.2em] text-content-dim">
              {dir}
            </span>
          </m.div>
        );
      })}
      <m.div
        initial={{ opacity: reduced ? 1 : 0, scaleY: reduced ? 1 : 0 }}
        whileInView={{ opacity: 1, scaleY: 1 }}
        viewport={{ once: true, margin: '-15% 0px' }}
        transition={{ duration: 0.3, delay: reduced ? 0 : 1.05, ease: EASE_EXPO }}
        className="absolute left-1/2 top-0 h-3 w-px origin-top -translate-x-1/2 bg-accent shadow-glow-cyan"
      >
        <span className="absolute -top-5 left-1/2 -translate-x-1/2 font-mono text-[10px] uppercase tracking-[0.2em] text-accent">
          mid
        </span>
      </m.div>
    </div>
  );
}

export function About() {
  // Split the positioning line so its closing clause carries the accent emphasis.
  const [lead, emphasis] = profile.positioning.split(' — ');

  const stats = [
    { value: <ExperienceStat suffix="" />, label: 'yrs building' },
    { value: <CountUp to={3000} suffix="+" />, label: 'problems solved' },
    { value: <CountUp to={2} suffix="×" />, label: 'ICPC regionalist' },
  ];

  return (
    <Section
      id="about"
      index="01"
      eyebrow="About"
      heading={
        <>
          Builder &amp; <GradientText>competitive programmer</GradientText>
        </>
      }
      className="py-20 md:py-40"
    >
      <div className="grid gap-12 md:grid-cols-12 md:gap-x-10 lg:gap-x-16">
        {/* Left rail: portrait, mono stat ledger, quick facts */}
        <Reveal as="div" className="md:col-span-5 lg:col-span-4">
          <div className="flex flex-col gap-8">
            {/* Headshot (cropped from an ICPC Asia Dhaka Regional Contest photo) */}
            <div className="relative aspect-[4/5] w-full max-w-[20rem] overflow-hidden rounded-lg border border-border">
              <Image
                src="/images/headshot.jpg"
                alt={`${profile.name}, ${profile.title}`}
                fill
                sizes="(min-width: 768px) 20rem, 100vw"
                className="object-cover"
              />
            </div>

            <dl className="flex flex-col">
              {stats.map((stat, i) => (
                <div
                  key={i}
                  className="flex items-baseline justify-between gap-4 border-b border-border py-3 first:pt-0 last:border-b-0"
                >
                  <dt className="font-mono text-eyebrow uppercase tracking-[0.2em] text-content-dim">{stat.label}</dt>
                  <dd className="font-mono text-xl tabular-nums text-content">{stat.value}</dd>
                </div>
              ))}
            </dl>

            <dl className="flex flex-col gap-4">
              {facts.map((fact) => (
                <div key={fact.label} className="flex flex-col gap-1">
                  <dt className="font-mono text-eyebrow uppercase tracking-[0.2em] text-content-dim">{fact.label}</dt>
                  <dd className="break-words text-sm text-content-muted">{fact.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </Reveal>

        {/* Right: lead pull-quote from the positioning line, then the bio narrative */}
        <div className="flex flex-col gap-10 md:col-span-7 lg:col-span-8">
          <Reveal as="div" className="relative">
            <BinarySearchBrackets />
            <blockquote className="font-display text-[1.75rem] leading-[1.15] text-content sm:text-[2.25rem] lg:text-[2.6rem]">
              {lead}
              {emphasis && (
                <>
                  {' — '}
                  <GradientText>{emphasis}</GradientText>
                </>
              )}
            </blockquote>
          </Reveal>

          <div className="flex flex-col gap-6">
            {profile.bio.map((paragraph, i) => (
              <Reveal key={i} as="p" delay={i * 0.08}>
                <span className="break-words text-base leading-relaxed text-content-muted sm:text-lg">{paragraph}</span>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}
