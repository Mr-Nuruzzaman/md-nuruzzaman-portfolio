import { Section } from '@/components/ui/Section';
import { Card } from '@/components/ui/Card';
import { Chip } from '@/components/ui/Chip';
import { GradientText } from '@/components/ui/GradientText';
import { Reveal } from '@/components/animations/Reveal';
import { experience } from '@/data/experience';

export function Experience() {
  return (
    <Section
      id="experience"
      eyebrow="Experience"
      heading={
        <>
          Where I&rsquo;ve <GradientText>built</GradientText>
        </>
      }
    >
      <ol className="relative space-y-8 sm:space-y-10">
        {/* Vertical gradient rail — hidden on mobile */}
        <span
          aria-hidden="true"
          className="pointer-events-none absolute left-[7px] top-2 bottom-2 hidden w-px bg-grad-primary sm:block"
        />

        {experience.map((role, i) => (
          <li key={`${role.company}-${role.start}`} className="relative sm:pl-14">
            {/* Pulsing dot on the rail */}
            <span
              aria-hidden="true"
              className="absolute left-0 top-2 hidden sm:block"
            >
              <span className="relative flex h-4 w-4 items-center justify-center">
                <span className="absolute inline-flex h-full w-full rounded-full bg-accent/40 motion-safe:animate-ping" />
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-grad-primary shadow-glow-cyan" />
              </span>
            </span>

            <Reveal as="div" delay={i * 0.06}>
              <Card className="p-5 sm:p-7">
                <div className="flex flex-col gap-4">
                  <header className="flex flex-col gap-2 sm:flex-row sm:items-baseline sm:justify-between sm:gap-4">
                    <div className="min-w-0 space-y-1">
                      <h3 className="text-h3 font-heading font-semibold text-content break-words">
                        {role.title}{' '}
                        <span className="text-content-muted">@</span>{' '}
                        <GradientText>{role.company}</GradientText>
                      </h3>
                      <p className="text-sm text-content-muted break-words">
                        {role.type} <span className="text-content-dim">·</span>{' '}
                        {role.mode} <span className="text-content-dim">·</span>{' '}
                        {role.location}
                      </p>
                    </div>
                    <p className="font-mono text-sm text-content-dim sm:shrink-0">
                      {role.start} <span aria-hidden="true">–</span> {role.end}
                    </p>
                  </header>

                  <ul className="space-y-2.5">
                    {role.bullets.map((bullet) => (
                      <li
                        key={bullet}
                        className="relative pl-5 text-sm leading-relaxed text-content-muted break-words"
                      >
                        <span
                          aria-hidden="true"
                          className="absolute left-0 top-[0.55em] h-1.5 w-1.5 -translate-y-1/2 rounded-full bg-accent/70"
                        />
                        {bullet}
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
              </Card>
            </Reveal>
          </li>
        ))}
      </ol>
    </Section>
  );
}
