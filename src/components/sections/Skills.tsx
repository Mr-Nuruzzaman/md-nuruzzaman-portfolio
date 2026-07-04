import { Section } from '@/components/ui/Section';
import { Chip } from '@/components/ui/Chip';
import { RevealGroup, RevealItem } from '@/components/animations/Reveal';
import { skills } from '@/data/skills';

export function Skills() {
  return (
    <Section id="skills" eyebrow="Toolkit" heading="Skills & stack">
      <RevealGroup stagger={0.08} className="flex flex-col gap-8 sm:gap-12">
        {skills.map((category) => (
          <RevealItem key={category.label}>
            <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:gap-8">
              <h3 className="font-heading text-h3 text-content shrink-0 break-words sm:w-44 lg:w-56">
                {category.label}
              </h3>
              <ul className="flex min-w-0 flex-wrap gap-2 sm:gap-3">
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
