import type { ReactNode } from 'react';
import { Section } from '@/components/ui/Section';
import { Chip } from '@/components/ui/Chip';
import { GradientText } from '@/components/ui/GradientText';
import { Reveal } from '@/components/animations/Reveal';
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
              <article className="grid gap-6 py-10 first:pt-0 md:grid-cols-[13rem_1fr] md:gap-10">
                {/* Meta rail — dates and context in mono, no colored strip */}
                <div className="flex flex-col gap-2">
                  <p className="font-mono text-sm text-content">
                    {role.start} <span aria-hidden="true">–</span> {role.end}
                  </p>
                  <p className="font-mono text-eyebrow uppercase tracking-[0.2em] text-content-dim">
                    {role.type} · {role.mode}
                  </p>
                  <p className="break-words text-sm text-content-dim">{role.location}</p>
                </div>

                <div className="flex min-w-0 flex-col gap-4">
                  <h3 className="break-words font-heading text-h3 text-content">
                    {role.title} <span className="font-display italic text-content-dim">at</span>{' '}
                    <GradientText>{role.company}</GradientText>
                  </h3>

                  <ul className="flex flex-col gap-3">
                    {role.bullets.map((bullet) => (
                      <li
                        key={bullet}
                        className="grid grid-cols-[auto_1fr] gap-3 break-words text-base leading-relaxed text-content-muted"
                      >
                        <span aria-hidden="true" className="mt-[0.7em] h-px w-4 shrink-0 bg-border" />
                        <span>{highlightMetrics(bullet)}</span>
                      </li>
                    ))}
                  </ul>

                  <ul className="flex flex-wrap gap-2 pt-1">
                    {role.tech.map((t) => (
                      <li key={t}>
                        <Chip glow>{t}</Chip>
                      </li>
                    ))}
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
