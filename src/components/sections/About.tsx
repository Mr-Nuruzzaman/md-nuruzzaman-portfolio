import Image from 'next/image';
import { Section } from '@/components/ui/Section';
import { GradientText } from '@/components/ui/GradientText';
import { Reveal } from '@/components/animations/Reveal';
import { CountUp } from '@/components/animations/CountUp';
import { ExperienceStat } from '@/components/ui/ExperienceStat';
import { profile } from '@/data/profile';

const facts = [
  { label: 'Location', value: profile.location },
  { label: 'Open to', value: profile.openTo.join(' · ') },
  { label: 'Focus', value: profile.remoteFocus },
] as const;

export function About() {
  // Split the positioning line so its closing clause carries the ember emphasis.
  const [lead, emphasis] = profile.positioning.split(' — ');

  const stats = [
    { value: <ExperienceStat suffix="" />, label: 'yrs building' },
    { value: <CountUp to={3000} suffix="+" />, label: 'problems solved' },
    { value: <CountUp to={2} suffix="×" />, label: 'ICPC regionalist' },
  ];

  return (
    <Section
      id="about"
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

        {/* Right: serif pull-quote from the positioning line, then the bio narrative */}
        <div className="flex flex-col gap-10 md:col-span-7 lg:col-span-8">
          <Reveal as="div">
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
