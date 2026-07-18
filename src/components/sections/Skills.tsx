'use client';

import { m } from 'framer-motion';
import { Section } from '@/components/ui/Section';
import { Chip } from '@/components/ui/Chip';
import { GradientText } from '@/components/ui/GradientText';
import { EASE_EXPO } from '@/lib/constants';
import { usePrefersReducedMotion } from '@/hooks/useMediaQuery';
import { skills } from '@/data/skills';
import { cn } from '@/lib/utils';

export function Skills() {
  const reduced = usePrefersReducedMotion();

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
      {/* Union-find motif: each row is a "set"; chips scatter in from a deterministic offset and settle into their cluster. */}
      <m.ul
        className="group/skills"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: '-10% 0px' }}
        variants={{ hidden: {}, show: { transition: { staggerChildren: 0.08 } } }}
      >
        {skills.map((category, index) => (
          <m.li
            key={category.label}
            variants={{ hidden: {}, show: {} }}
            className={cn(
              'group/row grid gap-x-6 gap-y-3 py-6 transition-opacity duration-300 ease-smooth md:grid-cols-[14rem_1fr]',
              'hover:!opacity-100 group-has-[:hover]/skills:opacity-70 motion-reduce:transition-none',
              index > 0 && 'border-t border-border',
            )}
          >
            <m.h3
              variants={{
                hidden: { opacity: 0, x: reduced ? 0 : -8 },
                show: { opacity: 1, x: 0, transition: { duration: 0.5, ease: EASE_EXPO } },
              }}
              className="font-mono text-eyebrow uppercase tracking-[0.2em] text-content-muted transition-colors duration-200 ease-smooth group-hover/row:text-accent"
            >
              {category.label} <span className="text-content-dim">— {category.items.length}</span>
            </m.h3>
            <m.ul
              variants={{ hidden: {}, show: { transition: { delayChildren: 0.04, staggerChildren: 0.05 } } }}
              className="flex flex-wrap gap-2"
            >
              {category.items.map((item, i) => (
                <m.li
                  key={item}
                  variants={{
                    hidden: { opacity: 0, x: reduced ? 0 : ((i % 3) - 1) * 10, y: reduced ? 0 : (i % 2) * 8 },
                    show: { opacity: 1, x: 0, y: 0, transition: { duration: 0.5, ease: EASE_EXPO } },
                  }}
                >
                  <Chip glow className="group-hover/row:border-border-glow">
                    {item}
                  </Chip>
                </m.li>
              ))}
            </m.ul>
          </m.li>
        ))}
      </m.ul>
    </Section>
  );
}
