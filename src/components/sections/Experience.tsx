'use client';

import type { ReactNode } from 'react';
import { m } from 'framer-motion';
import { Section } from '@/components/ui/Section';
import { Chip } from '@/components/ui/Chip';
import { GradientText } from '@/components/ui/GradientText';
import { Reveal } from '@/components/animations/Reveal';
import { EASE_EXPO } from '@/lib/constants';
import { usePrefersReducedMotion } from '@/hooks/useMediaQuery';
import { experience } from '@/data/experience';

// Percentages and currency amounts get the ember treatment so quantified wins read first.
const METRIC_SPLIT = /(\$\d[\d.,]*(?:\/mo)?|~?\d+(?:\.\d+)?%)/g;
const METRIC = /^(?:\$\d[\d.,]*(?:\/mo)?|~?\d+(?:\.\d+)?%)$/;

function highlightMetrics(text: string): ReactNode[] {
  return text.split(METRIC_SPLIT).map((part, i) =>
    METRIC.test(part) ? (
      <span key={i} className="font-medium text-accent-2">
        {part}
      </span>
    ) : (
      <span key={i}>{part}</span>
    ),
  );
}

export function Experience() {
  const reduced = usePrefersReducedMotion();

  return (
    <Section
      id="experience"
      index="02"
      eyebrow="Experience"
      heading={
        <>
          Where I&rsquo;ve <GradientText>built</GradientText>
        </>
      }
    >
      <ol className="flex flex-col">
        {experience.map((role, i) => (
          <li key={`${role.company}-${role.start}`} className="border-t border-border first:border-t-0">
            <Reveal as="div" delay={i * 0.06}>
              <article className="grid gap-6 py-8 first:pt-0 md:grid-cols-[13.5rem_1.5rem_1fr] md:gap-8">
                {/* Meta rail — dates and context in mono, no colored strip */}
                <div className="flex flex-col gap-2 md:sticky md:top-28 md:self-start">
                  <p className="font-mono text-sm text-content">
                    <span className="text-content-dim">[{i}]</span> {role.start} <span aria-hidden="true">–</span>{' '}
                    {role.end}
                  </p>
                  <p className="whitespace-nowrap font-mono text-eyebrow uppercase tracking-[0.14em] text-content-dim">
                    {role.type} · {role.mode}
                  </p>
                  <p className="break-words text-sm text-content-dim">{role.location}</p>
                </div>

                {/* Topo-sort rail — edge draws in dependency order, then the node lights */}
                <div className="relative hidden md:block" aria-hidden="true">
                  <span className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-border" />
                  <m.span
                    className="absolute left-1/2 top-0 h-full w-px origin-top -translate-x-1/2 bg-accent/40"
                    initial={{ scaleY: reduced ? 1 : 0 }}
                    whileInView={{ scaleY: 1 }}
                    viewport={{ once: true, margin: '-10% 0px' }}
                    transition={{ duration: 0.7, ease: EASE_EXPO, delay: i * 0.12 + 0.06 }}
                  />
                  <span className="absolute left-1/2 top-[0.6rem] flex h-2 w-2 -translate-x-1/2 items-center justify-center border border-border-glow bg-bg">
                    <m.span
                      className="h-full w-full bg-accent shadow-glow-cyan"
                      initial={{ opacity: reduced ? 1 : 0, scale: reduced ? 1 : 0.4 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true, margin: '-10% 0px' }}
                      transition={{ duration: 0.5, ease: EASE_EXPO, delay: i * 0.12 }}
                    />
                  </span>
                </div>

                <div className="flex min-w-0 flex-col gap-4">
                  <h3 className="break-words font-heading text-h3 text-content">
                    {role.title} <span className="font-normal text-content-dim">at</span>{' '}
                    <span className="text-accent">{role.company}</span>
                  </h3>

                  <ul className="flex flex-col gap-2.5">
                    {role.bullets.map((bullet) => (
                      <li
                        key={bullet}
                        className="grid grid-cols-[auto_1fr] gap-3 break-words text-[0.9375rem] leading-relaxed text-content-muted"
                      >
                        <span aria-hidden="true" className="mt-[0.7em] h-px w-4 shrink-0 bg-border" />
                        <span>{highlightMetrics(bullet)}</span>
                      </li>
                    ))}
                  </ul>

                  <ul className="flex flex-wrap gap-2 pt-1">
                    {role.tech.slice(0, 5).map((t) => (
                      <li key={t}>
                        <Chip glow>{t}</Chip>
                      </li>
                    ))}
                    {role.tech.length > 5 && (
                      <li>
                        <Chip>+{role.tech.length - 5}</Chip>
                      </li>
                    )}
                  </ul>
                </div>
              </article>
            </Reveal>
          </li>
        ))}
      </ol>
    </Section>
  );
}
