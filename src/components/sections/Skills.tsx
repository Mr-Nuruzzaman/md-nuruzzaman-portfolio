import { Section } from '@/components/ui/Section';
import { Chip } from '@/components/ui/Chip';
import { GradientText } from '@/components/ui/GradientText';
import { RevealGroup, RevealItem } from '@/components/animations/Reveal';
import { skills } from '@/data/skills';

export function Skills() {
  return (
    <Section
      id="skills"
      eyebrow="Toolkit"
      heading={
        <>
          Skills &amp; <GradientText>stack</GradientText>
        </>
      }
      className="py-16 md:py-24"
    >
      <RevealGroup stagger={0.06} className="grid items-start gap-x-10 gap-y-8 sm:grid-cols-2 lg:gap-x-16">
        {skills.map((category) => (
          <RevealItem key={category.label}>
            <div className="flex flex-col gap-3 border-t border-border pt-5">
              <h3 className="font-mono text-eyebrow uppercase tracking-[0.2em] text-content-dim">{category.label}</h3>
              <ul className="flex flex-wrap gap-2">
                {category.items.map((item) => (
                  <li key={item}>
                    <Chip glow>{item}</Chip>
                  </li>
                ))}
              </ul>
            </div>
          </RevealItem>
        ))}
      </RevealGroup>
    </Section>
  );
}
