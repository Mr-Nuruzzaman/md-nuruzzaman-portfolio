'use client';

import { Section } from '@/components/ui/Section';
import { Card } from '@/components/ui/Card';
import { Chip } from '@/components/ui/Chip';
import { GradientText } from '@/components/ui/GradientText';
import { CodeforcesIcon, CodeChefIcon, LeetCodeIcon, AtCoderIcon } from '@/components/ui/BrandIcons';
import { Reveal, RevealGroup, RevealItem } from '@/components/animations/Reveal';
import { CountUp } from '@/components/animations/CountUp';
import { platforms, cpStats, contests } from '@/data/competitive';
import { cn } from '@/lib/utils';

const PLATFORM_ICONS: Record<string, (props: { size?: number; className?: string }) => React.ReactElement> = {
  Codeforces: CodeforcesIcon,
  CodeChef: CodeChefIcon,
  LeetCode: LeetCodeIcon,
  AtCoder: AtCoderIcon,
};

export function CompetitiveProgramming() {
  return (
    <Section
      id="cp"
      eyebrow="Competitive programming"
      heading={
        <>
          Algorithmic <GradientText>depth</GradientText>
        </>
      }
    >
      {/* Lead: achievements first, raw count as supporting metadata */}
      <Reveal>
        <div className="flex flex-col gap-8 border-b border-border pb-10 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="font-mono text-eyebrow uppercase tracking-[0.2em] text-content-dim">Problems solved</p>
            <p className="mt-2 font-mono text-6xl tabular-nums leading-none text-content sm:text-7xl">
              <CountUp to={cpStats.problemsSolved} suffix="+" />
            </p>
          </div>
          <ul className="flex flex-wrap gap-2.5">
            {cpStats.icpcRegionalist > 0 && (
              <li>
                <Chip className="border-accent/40 text-content">
                  ICPC Asia Dhaka regionalist ×{cpStats.icpcRegionalist}
                </Chip>
              </li>
            )}
            {cpStats.ncpcFinalist && (
              <li>
                <Chip className="border-accent/40 text-content">NCPC finalist</Chip>
              </li>
            )}
          </ul>
        </div>
      </Reveal>

      {/* Platforms — brand color muted to a dot; achievement label leads, rating is metadata */}
      <RevealGroup stagger={0.08} className="mt-10 grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4">
        {platforms.map((p) => {
          const Icon = PLATFORM_ICONS[p.name];
          return (
            <RevealItem key={p.name}>
              <a
                href={p.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${p.name} profile — @${p.handle}`}
                className="group block h-full rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg"
              >
                <Card className="flex h-full items-center justify-between gap-4 p-5 sm:p-6">
                  <div className="flex min-w-0 items-center gap-3">
                    {Icon && (
                      <Icon
                        size={20}
                        className="shrink-0 text-content-muted transition-colors duration-300 ease-smooth group-hover:text-accent-2"
                      />
                    )}
                    <div className="min-w-0">
                      <p className="font-heading text-xl leading-tight text-content">{p.name}</p>
                      <p className="truncate font-mono text-small text-content-dim">@{p.handle}</p>
                    </div>
                  </div>
                  <div className="shrink-0 text-right">
                    <p className="font-sans text-small font-medium leading-tight text-content">{p.label}</p>
                    <p className="mt-0.5 font-mono text-small tabular-nums text-content-dim">{p.rating}</p>
                  </div>
                </Card>
              </a>
            </RevealItem>
          );
        })}
      </RevealGroup>

      {/* Contest log — lead with placement/rank */}
      <Reveal delay={0.1}>
        <h3 className="mb-6 mt-16 font-mono text-eyebrow uppercase tracking-[0.2em] text-content-dim">Contest log</h3>
      </Reveal>
      <RevealGroup stagger={0.05} className="grid grid-cols-1 gap-3 md:grid-cols-2">
        {contests.map((c) => (
          <RevealItem key={`${c.name}-${c.year}`}>
            <Card className={cn('flex h-full items-center gap-4 p-4', c.highlight && 'border-border-glow')}>
              <span
                className={cn(
                  'shrink-0 rounded-md px-3 py-1.5 font-mono text-base tabular-nums',
                  c.highlight ? 'bg-accent/10 text-accent-2' : 'bg-surface-2 text-content-muted',
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
