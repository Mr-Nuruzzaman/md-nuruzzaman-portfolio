import { Section } from '@/components/ui/Section';
import { Chip } from '@/components/ui/Chip';
import { GradientText } from '@/components/ui/GradientText';
import { RevealGroup, RevealItem } from '@/components/animations/Reveal';
import { skills } from '@/data/skills';
import { cn } from '@/lib/utils';

export function Skills() {
  return (
    <Section
      id="skills"
      index="05"
      eyebrow="Toolkit"
      heading={
        <>
          Skills &amp; <GradientText>stack</GradientText>
        </>
      }
      className="py-16 md:py-24"
    >
      <RevealGroup stagger={0.06}>
        {skills.map((category, index) => (
          <RevealItem key={category.label}>
            <div
              className={cn(
                'grid gap-x-6 gap-y-3 py-6 md:grid-cols-[11rem_1fr]',
                index > 0 && 'border-t border-border',
              )}
            >
              <h3 className="font-mono text-eyebrow uppercase tracking-[0.2em] text-content-dim">{category.label}</h3>
              <ul className="flex flex-wrap gap-2">
                {category.items.map((item) => (
                  <li key={item}>
                    <Chip>{item}</Chip>
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
