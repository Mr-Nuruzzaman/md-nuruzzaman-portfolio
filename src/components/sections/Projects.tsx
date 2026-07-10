'use client';

import { useState } from 'react';
import Image from 'next/image';
import { ArrowUpRight, ExternalLink, Github } from 'lucide-react';

import { Section } from '@/components/ui/Section';
import { Card } from '@/components/ui/Card';
import { Chip } from '@/components/ui/Chip';
import { Button } from '@/components/ui/Button';
import { GradientText } from '@/components/ui/GradientText';
import { TiltCard } from '@/components/animations/TiltCard';
import { RevealGroup, RevealItem } from '@/components/animations/Reveal';
import { ProjectModal } from './ProjectModal';
import { projects } from '@/data/projects';
import type { IProject } from '@/data/projects';
import { cn, galleryOf, initials } from '@/lib/utils';

function ProjectCard({ project, feature, onOpen }: { project: IProject; feature?: boolean; onOpen: () => void }) {
  const { title, blurb, tech, links, badge } = project;
  const gallery = galleryOf(project);
  const [errored, setErrored] = useState(false);
  const primary = !errored ? gallery[0] : undefined;

  return (
    <TiltCard className="h-full">
      <Card
        interactive={false}
        className={cn('flex h-full overflow-hidden p-0', feature ? 'flex-col lg:flex-row' : 'flex-col')}
      >
        {/* Poster — opens detail modal */}
        <button
          type="button"
          onClick={onOpen}
          aria-label={`View ${title} details`}
          className={cn(
            'group/poster relative w-full overflow-hidden border-border text-left',
            feature
              ? 'aspect-[16/10] border-b lg:aspect-auto lg:min-h-[24rem] lg:w-[45%] lg:border-b-0 lg:border-r'
              : 'aspect-video border-b',
          )}
        >
          {primary ? (
            <Image
              src={primary}
              alt={`${title} preview`}
              fill
              sizes={feature ? '(min-width: 1024px) 45vw, 100vw' : '(min-width: 768px) 50vw, 100vw'}
              onError={() => setErrored(true)}
              className="object-cover transition-transform duration-500 ease-expo group-hover/poster:scale-[1.03]"
            />
          ) : (
            <span className="absolute inset-0 grid place-items-center">
              <span className="absolute inset-0 bg-gradient-to-br from-accent-3/25 via-surface-2 to-bg" aria-hidden />
              <span
                className="relative select-none font-mono text-6xl tracking-tighter text-content/50 sm:text-7xl"
                aria-hidden
              >
                {initials(title)}
              </span>
            </span>
          )}

          {badge && (
            <span className="absolute left-3 top-3 z-10">
              <Chip className="border-accent/40 bg-bg/80 text-accent-2">{badge}</Chip>
            </span>
          )}

          {/* mini photo-stack — signals the gallery */}
          {gallery.length > 1 && (
            <span className="absolute bottom-3 right-3 z-10 flex items-center" aria-hidden>
              {gallery.slice(1, 3).map((src, i) => (
                <span
                  key={src + i}
                  className="relative -ml-4 h-9 w-14 overflow-hidden rounded-md border border-border-glow shadow-lg"
                  style={{ zIndex: 5 - i }}
                >
                  <Image src={src} alt="" fill sizes="80px" className="object-cover" />
                </span>
              ))}
              <span className="z-10 ml-1.5 rounded-full bg-bg/85 px-2 py-0.5 font-mono text-xs text-content">
                {gallery.length}
              </span>
            </span>
          )}

          {/* hover hint */}
          <span className="absolute bottom-3 left-3 z-10 flex items-center gap-1 rounded-full bg-bg/85 px-3 py-1 font-mono text-xs text-content opacity-0 transition-opacity duration-200 group-hover/poster:opacity-100">
            View details <ArrowUpRight className="h-3 w-3" aria-hidden />
          </span>
        </button>

        {/* Body */}
        <div
          className={cn('flex min-w-0 flex-1 flex-col gap-4', feature ? 'p-6 sm:p-8 lg:justify-center' : 'p-5 sm:p-6')}
        >
          <div className="flex min-w-0 flex-col gap-2">
            <h3
              className={cn(
                'break-words font-heading leading-tight text-content',
                feature ? 'text-3xl sm:text-4xl' : 'text-2xl',
              )}
            >
              {title}
            </h3>
            <p className={cn('break-words text-content-muted', feature ? 'max-w-prose' : 'text-sm')}>{blurb}</p>
          </div>

          <ul className="mt-auto flex flex-wrap gap-2" aria-label="Technologies used">
            {tech.slice(0, feature ? 8 : 6).map((t) => (
              <li key={t}>
                <Chip>{t}</Chip>
              </li>
            ))}
            {tech.length > (feature ? 8 : 6) && (
              <li>
                <Chip>+{tech.length - (feature ? 8 : 6)}</Chip>
              </li>
            )}
          </ul>

          <div className="flex flex-wrap items-center gap-3 pt-1">
            <Button variant="ghost" size="sm" onClick={onOpen}>
              Details
              <ArrowUpRight className="h-4 w-4" aria-hidden />
            </Button>
            {links.live && (
              <Button href={links.live} size="sm">
                Live
                <ExternalLink className="h-4 w-4" aria-hidden />
              </Button>
            )}
            {links.repo && (
              <Button href={links.repo} variant="ghost" size="sm">
                <Github className="h-4 w-4" aria-hidden />
                Code
              </Button>
            )}
          </div>
        </div>
      </Card>
    </TiltCard>
  );
}

// Editorial rhythm: the lead spans full width; the rest alternate 7/5 · 5/7 column widths.
const SPANS = ['md:col-span-7', 'md:col-span-5', 'md:col-span-5', 'md:col-span-7'];

export function Projects() {
  const list = projects.filter((p) => p.featured);
  const [lead, ...rest] = list;
  const [selected, setSelected] = useState<IProject | null>(null);

  return (
    <Section
      id="projects"
      index="03"
      eyebrow="Selected work"
      heading={
        <>
          Featured <GradientText>projects</GradientText>
        </>
      }
    >
      <RevealGroup className="grid grid-cols-1 gap-5 md:grid-cols-12 md:gap-6">
        {lead && (
          <RevealItem className="md:col-span-12">
            <ProjectCard project={lead} feature onOpen={() => setSelected(lead)} />
          </RevealItem>
        )}
        {rest.map((project, i) => (
          <RevealItem key={project.slug} className={cn('h-full', SPANS[i] ?? 'md:col-span-6')}>
            <ProjectCard project={project} onOpen={() => setSelected(project)} />
          </RevealItem>
        ))}
      </RevealGroup>

      <ProjectModal project={selected} onClose={() => setSelected(null)} />
    </Section>
  );
}
