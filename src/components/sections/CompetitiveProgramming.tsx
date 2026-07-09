'use client';

import { Section } from '@/components/ui/Section';
import { Card } from '@/components/ui/Card';
import { GradientText } from '@/components/ui/GradientText';
import { Reveal, RevealGroup, RevealItem } from '@/components/animations/Reveal';
import { CountUp } from '@/components/animations/CountUp';
import { TiltCard } from '@/components/animations/TiltCard';
import { platforms, cpStats, contests } from '@/data/competitive';
import { cn } from '@/lib/utils';

export function CompetitiveProgramming() {
  return (
    <Section
      id="cp"
      eyebrow="Competitive Programming"
      heading={
        <>
          Algorithmic <GradientText>depth</GradientText>
        </>
      }
    >
      {/* Faux terminal */}
      <Reveal>
        <Card interactive={false} className="overflow-hidden p-0">
          <div className="flex items-center gap-2 border-b border-border bg-surface-2 px-4 py-3">
            <span className="h-3 w-3 rounded-full bg-accent-pink/70" aria-hidden />
            <span className="h-3 w-3 rounded-full bg-warning/70" aria-hidden />
            <span className="h-3 w-3 rounded-full bg-success/70" aria-hidden />
            <span className="ml-3 font-mono text-small text-content-dim">~/md-nuruzzaman — algorithms</span>
          </div>
          <div className="px-4 py-5 font-mono text-sm break-words sm:px-5 sm:py-6 sm:text-lg">
            <span className="text-accent">&gt;</span>{' '}
            <span className="text-content-muted">solved:</span>{' '}
            <CountUp to={cpStats.problemsSolved} suffix="+" className="font-bold text-success" />
            <span className="ml-1 inline-block h-5 w-2 translate-y-0.5 animate-pulse bg-accent align-middle" aria-hidden />
          </div>
        </Card>
      </Reveal>

      {/* Platform stat cards */}
      <RevealGroup stagger={0.09} className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-4">
        {platforms.map((p) => (
          <RevealItem key={p.name}>
            <a
              href={p.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${p.name} profile — ${p.handle}, rating ${p.rating}, ${p.label}`}
              className="block h-full rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg"
            >
              <TiltCard className="h-full">
                <Card className="relative h-full overflow-hidden p-5 sm:p-6">
                  <div
                    className="pointer-events-none absolute -right-8 -top-8 h-28 w-28 rounded-full opacity-20 blur-2xl transition-opacity duration-300 group-hover:opacity-40"
                    style={{ backgroundColor: p.color }}
                    aria-hidden
                  />
                  <div className="flex flex-col gap-0.5">
                    <h3 className="font-heading text-h3 font-semibold leading-tight text-content">{p.name}</h3>
                    <span className="truncate font-mono text-small text-content-dim">@{p.handle}</span>
                  </div>
                  <p
                    className="mt-6 break-words font-mono text-4xl font-bold tabular-nums tracking-tight sm:text-5xl lg:text-6xl"
                    style={{ color: p.color }}
                  >
                    <CountUp to={p.rating} />
                  </p>
                  <p className="mt-3 font-mono text-small uppercase tracking-[0.15em] text-content-muted">{p.label}</p>
                </Card>
              </TiltCard>
            </a>
          </RevealItem>
        ))}
      </RevealGroup>

      {/* Highlight row */}
      <Reveal delay={0.1}>
        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5">
          <Card className="flex items-center gap-4 p-5 sm:p-6">
            <span className="shrink-0 font-mono text-4xl font-bold text-accent">{cpStats.icpcRegionalist}×</span>
            <span className="min-w-0 font-heading text-base font-medium text-content sm:text-lg">
              ICPC Asia Dhaka <GradientText>Regionalist</GradientText>
            </span>
          </Card>
          {cpStats.ncpcFinalist && (
            <Card className="flex items-center gap-4 p-5 sm:p-6">
              <span className="shrink-0 font-mono text-4xl font-bold text-accent-2">★</span>
              <span className="min-w-0 font-heading text-base font-medium text-content sm:text-lg">
NCPC <GradientText>Finalist</GradientText>
              </span>
            </Card>
          )}
        </div>
      </Reveal>

      {/* Contests grid */}
      <Reveal delay={0.15}>
        <h3 className="mb-5 mt-12 font-mono text-eyebrow uppercase tracking-[0.2em] text-content-dim md:mt-16">
          {'// contest_log'}
        </h3>
      </Reveal>
      <RevealGroup stagger={0.06} className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {contests.map((c) => (
          <RevealItem key={`${c.name}-${c.year}`}>
            <Card className={cn('flex h-full items-center gap-4 p-4', c.highlight && 'border-accent/40 shadow-glow-cyan')}>
              <span
                className={cn(
                  'shrink-0 rounded-md px-3 py-1.5 font-mono text-base font-bold',
                  c.highlight ? 'bg-accent/10 text-accent' : 'bg-surface-2 text-content-muted',
                )}
              >
                {c.result}
              </span>
              <span className="min-w-0 flex-1 break-words font-sans text-small leading-snug text-content sm:text-base">
                {c.name}
              </span>
              <span className="shrink-0 font-mono text-small text-content-dim">{c.year}</span>
            </Card>
          </RevealItem>
        ))}
      </RevealGroup>
    </Section>
  );
}
