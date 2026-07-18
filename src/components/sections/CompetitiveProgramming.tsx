'use client';

import { useState } from 'react';
import { m } from 'framer-motion';
import { ArrowUpRight, ChevronDown } from 'lucide-react';
import { EASE_EXPO } from '@/lib/constants';
import { usePrefersReducedMotion } from '@/hooks/useMediaQuery';
import { Section } from '@/components/ui/Section';
import { Card } from '@/components/ui/Card';
import { GradientText } from '@/components/ui/GradientText';
import { CodeforcesIcon, CodeChefIcon, LeetCodeIcon, AtCoderIcon } from '@/components/ui/BrandIcons';
import { Reveal, RevealGroup, RevealItem } from '@/components/animations/Reveal';
import { CountUp } from '@/components/animations/CountUp';
import { platforms, cpStats, contests, type IContest } from '@/data/competitive';
import { cn } from '@/lib/utils';

// Codeforces rank colors are the official CF handle colors — semantic brand facts, not
// theme decoration — so they're hardcoded here as a deliberate exception to the
// design-token rule. Only ranks we actually cite live in the map.
const CF_RANK_COLORS: Record<string, string> = {
  Expert: '#3B82F6', // CF "Expert" (1600–1899) tier blue, tuned to read on the dark navy ground
};

const PLATFORM_ICONS: Record<string, (props: { size?: number; className?: string }) => React.ReactElement> = {
  Codeforces: CodeforcesIcon,
  CodeChef: CodeChefIcon,
  LeetCode: LeetCodeIcon,
  AtCoder: AtCoderIcon,
};

// Spelled-out multiplier for the apex line; falls back to "N-time" past the map.
const TIMES = ['', 'one-time', 'two-time', 'three-time', 'four-time'];

// The Codeforces platform carries the rank word ("Expert") and its rank color.
const codeforces = platforms.find((p) => p.name === 'Codeforces');
const cfRank = codeforces?.label.replace(/\s*\(max\)\s*/i, '').trim();
const cfRankColor = cfRank ? CF_RANK_COLORS[cfRank] : undefined;

const icpcTimes = TIMES[cpStats.icpcRegionalist] ?? `${cpStats.icpcRegionalist}-time`;

/** A contest is a headline result when the data flags it (ICPC regionals + the won title). */
function isHeadline(c: IContest) {
  return Boolean(c.highlight);
}

/** Log rows shown before the "see all" toggle — keeps the panel phone-height. */
const LOG_PREVIEW = 10;

export function CompetitiveProgramming() {
  const [showAll, setShowAll] = useState(false);
  const reduced = usePrefersReducedMotion();

  return (
    <Section
      id="cp"
      index="04"
      eyebrow="Competitive programming"
      heading={
        <>
          Algorithmic <GradientText>depth</GradientText>
        </>
      }
    >
      {/* Apex line — the honors as one sentence, built from real data. */}
      <Reveal>
        <p className="max-w-4xl font-display text-2xl font-normal leading-snug text-content-muted sm:text-3xl">
          {icpcTimes && <>A {icpcTimes} </>}
          <span className="text-content">ICPC Asia Dhaka regionalist</span>
          {cpStats.ncpcFinalist && (
            <>
              , <span className="text-content">NCPC finalist</span>
            </>
          )}
          , and Codeforces{' '}
          {cfRank && (
            <span className="font-medium" style={cfRankColor ? { color: cfRankColor } : undefined}>
              {cfRank}
            </span>
          )}{' '}
          — with{' '}
          <span className="font-mono font-medium text-content">
            <CountUp to={cpStats.problemsSolved} suffix="+" />
          </span>{' '}
          problems solved.
        </p>
      </Reveal>

      {/* Terminal contest log — real results, revealed line-by-line on scroll-in. */}
      <Reveal delay={0.1}>
        <div className="mt-14 overflow-hidden rounded-lg border border-border bg-bg-elev">
          <div className="flex items-center gap-3 border-b border-border px-4 py-3">
            <span className="flex gap-1.5" aria-hidden>
              <span className="h-2.5 w-2.5 rounded-full bg-content-dim/40" />
              <span className="h-2.5 w-2.5 rounded-full bg-content-dim/40" />
              <span className="h-2.5 w-2.5 rounded-full bg-content-dim/40" />
            </span>
            <span className="font-mono text-small text-content-dim">contest-log — zsh</span>
          </div>
          <RevealGroup stagger={0.06} className="flex flex-col gap-2.5 p-4 sm:gap-1.5 sm:p-6">
            {(showAll ? contests : contests.slice(0, LOG_PREVIEW)).map((c, idx) => {
              const headline = isHeadline(c);
              // flex-wrap: on phones the result line breaks below the name (ml-auto keeps it
              // right-aligned) instead of colliding with wrapped contest names.
              const rowClass = 'flex flex-wrap items-baseline gap-x-3 gap-y-0.5 font-mono text-small leading-relaxed';
              const row = (
                <>
                  <span className="select-none text-accent/50" aria-hidden>
                    &gt;
                  </span>
                  <span className="shrink-0 tabular-nums text-content-dim">{c.year}</span>
                  <span className="min-w-0 flex-1 basis-52 text-content-muted">{c.name}</span>
                  <span className="hidden text-content-dim sm:inline" aria-hidden>
                    —
                  </span>
                  <span
                    className={cn(
                      'ml-auto shrink-0 whitespace-nowrap font-medium',
                      headline ? 'text-accent' : 'text-content',
                    )}
                  >
                    {c.result}
                    {c.teams && (
                      <>
                        <span className="font-normal text-content-dim"> of </span>
                        {c.teams}
                        <span className="font-normal text-content-dim"> teams</span>
                      </>
                    )}
                  </span>
                </>
              );
              // Rows past the preview mount AFTER the scroll-reveal has fired — RevealItem
              // would leave them stuck at opacity 0, so they animate on mount instead.
              return idx < LOG_PREVIEW ? (
                <RevealItem key={`${c.name}-${c.year}`} y={8} className={rowClass}>
                  {row}
                </RevealItem>
              ) : (
                <m.div
                  key={`${c.name}-${c.year}`}
                  className={rowClass}
                  initial={reduced ? false : { opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, ease: EASE_EXPO, delay: (idx - LOG_PREVIEW) * 0.05 }}
                >
                  {row}
                </m.div>
              );
            })}
          </RevealGroup>
          {contests.length > LOG_PREVIEW && (
            <div className="border-t border-border px-4 py-3 sm:px-6">
              <button
                type="button"
                onClick={() => setShowAll((v) => !v)}
                aria-expanded={showAll}
                className="flex items-center gap-2 font-mono text-small text-content-muted transition-colors hover:text-accent"
              >
                <span className="select-none text-accent/50" aria-hidden>
                  &gt;
                </span>
                {showAll ? 'show less' : `see all ${contests.length} contests`}
                <ChevronDown
                  className={cn('h-4 w-4 transition-transform duration-300 ease-smooth', showAll && 'rotate-180')}
                  aria-hidden
                />
              </button>
            </div>
          )}
        </div>
      </Reveal>

      {/* Platform stats — mono ratings, brand marks color on hover. */}
      <RevealGroup stagger={0.07} className="mt-14 grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4">
        {platforms.map((p) => {
          const Icon = PLATFORM_ICONS[p.name];
          return (
            <RevealItem key={p.name}>
              <a
                href={p.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${p.name} profile — @${p.handle}, ${p.label}, rating ${p.rating}`}
                className="group block h-full rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg"
              >
                <Card className="flex h-full flex-col justify-between gap-5 p-5 sm:p-6">
                  <div className="flex items-center justify-between gap-3">
                    <span className="flex items-center gap-2.5">
                      {Icon && <Icon size={18} />}
                      <span className="font-mono text-eyebrow uppercase tracking-[0.2em] text-content-dim">
                        {p.name}
                      </span>
                    </span>
                    <span
                      aria-hidden
                      className="grid h-8 w-8 shrink-0 place-items-center rounded-md border border-border text-content-dim transition-all duration-200 ease-smooth group-hover:border-accent group-hover:text-accent group-hover:shadow-glow-cyan"
                    >
                      <ArrowUpRight className="h-4 w-4 transition-transform duration-200 ease-smooth group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                    </span>
                  </div>
                  <div className="flex items-end justify-between gap-3">
                    <span className="font-mono text-4xl tabular-nums leading-none text-content sm:text-5xl">
                      <CountUp to={p.rating} />
                    </span>
                    <span className="text-right">
                      <span className="block font-sans text-small font-medium leading-tight text-content">
                        {p.label}
                      </span>
                      <span className="mt-0.5 block truncate font-mono text-small text-content-dim">@{p.handle}</span>
                    </span>
                  </div>
                </Card>
              </a>
            </RevealItem>
          );
        })}
      </RevealGroup>
    </Section>
  );
}
