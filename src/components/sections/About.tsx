import Image from 'next/image';
import { Section } from '@/components/ui/Section';
import { Card } from '@/components/ui/Card';
import { GradientText } from '@/components/ui/GradientText';
import { Reveal } from '@/components/animations/Reveal';
import { ExperienceStat } from '@/components/ui/ExperienceStat';
import { profile } from '@/data/profile';

const facts = [
  { label: 'Location', value: profile.location },
  { label: 'Open to', value: profile.openTo.join(' · ') },
  { label: 'Focus', value: profile.remoteFocus },
] as const;

export function About() {
  return (
    <Section
      id="about"
      eyebrow="About"
      heading={
        <>
          Builder &amp; <GradientText>competitive programmer</GradientText>
        </>
      }
    >
      <div className="grid gap-8 md:grid-cols-[1.4fr_1fr] md:gap-14 lg:gap-20">
        {/* Left: bio narrative */}
        <div className="min-w-0 space-y-6">
          {profile.bio.map((paragraph, i) => (
            <Reveal key={i} as="p" delay={i * 0.08}>
              <span className="text-content-muted text-base leading-relaxed break-words sm:text-lg">
                {paragraph}
              </span>
            </Reveal>
          ))}
        </div>

        {/* Right: quick-facts glass card */}
        <Reveal delay={0.12}>
          <Card className="flex flex-col gap-6 p-6 sm:gap-8 sm:p-8">
            {/* Headshot (cropped from an ICPC Asia Dhaka Regional Contest photo) */}
            <div className="relative mx-auto aspect-square w-full max-w-[16rem] overflow-hidden rounded-2xl border border-border sm:max-w-none">
              <Image
                src="/images/headshot.jpg"
                alt={`${profile.name}, ${profile.title}`}
                fill
                sizes="(min-width: 768px) 20rem, 16rem"
                className="object-cover"
              />
            </div>

            <dl className="flex flex-col gap-5">
              <div className="flex flex-col gap-1 border-b border-border pb-4">
                <dt className="font-mono text-eyebrow uppercase tracking-widest text-accent">Experience</dt>
                <dd className="text-content-muted break-words">
                  <ExperienceStat />
                </dd>
              </div>
              {facts.map((fact) => (
                <div
                  key={fact.label}
                  className="flex flex-col gap-1 border-b border-border pb-4 last:border-none last:pb-0"
                >
                  <dt className="font-mono text-eyebrow uppercase tracking-widest text-accent">
                    {fact.label}
                  </dt>
                  <dd className="text-content-muted break-words">{fact.value}</dd>
                </div>
              ))}
            </dl>
          </Card>
        </Reveal>
      </div>
    </Section>
  );
}
