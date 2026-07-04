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

function ProjectCard({
  project,
  compact,
  onOpen,
  titleAs: TitleTag = 'h3',
}: {
  project: IProject;
  compact?: boolean;
  onOpen: () => void;
  titleAs?: 'h3' | 'h4';
}) {
  const { title, blurb, tech, links, badge } = project;
  const gallery = galleryOf(project);
  const [errored, setErrored] = useState(false);
  const primary = !errored ? gallery[0] : undefined;

  return (
    <TiltCard className="h-full">
      <Card interactive={false} className="flex h-full flex-col overflow-hidden p-0">
        {/* Poster — opens detail modal */}
        <button
          type="button"
          onClick={onOpen}
          aria-label={`View ${title} details`}
          className="group/poster relative aspect-video w-full overflow-hidden border-b border-border text-left"
        >
          {primary ? (
            <Image
              src={primary}
              alt={`${title} preview`}
              fill
              sizes="(min-width: 768px) 50vw, 100vw"
              onError={() => setErrored(true)}
              className="object-cover transition-transform duration-500 ease-expo group-hover/poster:scale-[1.04]"
            />
          ) : (
            <span className="absolute inset-0 grid place-items-center">
              <span className="absolute inset-0 bg-grad-primary opacity-20" aria-hidden />
              <span className="absolute inset-0 bg-bg/40" aria-hidden />
              <span
                className="relative select-none font-mono text-6xl font-bold tracking-tighter text-content/80 sm:text-7xl"
                aria-hidden
              >
                {initials(title)}
              </span>
            </span>
          )}

          {/* readability gradient */}
          <span className="pointer-events-none absolute inset-0 bg-gradient-to-t from-bg/70 via-transparent to-bg/20" aria-hidden />

          {badge && (
            <span className="absolute left-3 top-3 z-10">
              <Chip glow className="border-accent/40 bg-bg/60 text-accent">
                {badge}
              </Chip>
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
              <span className="z-10 ml-1.5 rounded-full bg-bg/75 px-2 py-0.5 font-mono text-xs text-content backdrop-blur">
                {gallery.length}
              </span>
            </span>
          )}

          {/* hover hint */}
          <span className="absolute bottom-3 left-3 z-10 flex items-center gap-1 rounded-full bg-bg/70 px-3 py-1 font-mono text-xs text-content opacity-0 backdrop-blur transition-opacity duration-200 group-hover/poster:opacity-100">
            View details <ArrowUpRight className="h-3 w-3" aria-hidden />
          </span>
        </button>

        {/* Body */}
        <div className={cn('flex min-w-0 flex-1 flex-col gap-4', compact ? 'p-5' : 'p-5 sm:p-6')}>
          <div className="flex min-w-0 flex-col gap-2">
            <TitleTag
              className={cn(
                'break-words font-heading font-semibold leading-tight text-content',
                compact ? 'text-lg' : 'text-h3',
              )}
            >
              {title}
            </TitleTag>
            <p className="break-words text-sm text-content-muted">{blurb}</p>
          </div>

          <ul className="mt-auto flex flex-wrap gap-2" aria-label="Technologies used">
            {tech.slice(0, 6).map((t) => (
              <li key={t}>
                <Chip>{t}</Chip>
              </li>
            ))}
            {tech.length > 6 && (
              <li>
                <Chip>+{tech.length - 6}</Chip>
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

export function Projects() {
  const featured = projects.filter((p) => p.featured);
  const rest = projects.filter((p) => !p.featured);
  const [selected, setSelected] = useState<IProject | null>(null);

  return (
    <Section
      id="projects"
      eyebrow="Selected Work"
      heading={
        <>
          Featured <GradientText>projects</GradientText>
        </>
      }
    >
      <RevealGroup className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {featured.map((project) => (
          <RevealItem key={project.slug} className="h-full">
            <ProjectCard project={project} onOpen={() => setSelected(project)} />
          </RevealItem>
        ))}
      </RevealGroup>

      {rest.length > 0 && (
        <div className="mt-12">
          <h3 className="mb-6 font-mono text-eyebrow uppercase tracking-widest text-content-dim">More builds</h3>
          <RevealGroup className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {rest.map((project) => (
              <RevealItem key={project.slug} className="h-full">
                <ProjectCard project={project} compact titleAs="h4" onOpen={() => setSelected(project)} />
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      )}

      <ProjectModal project={selected} onClose={() => setSelected(null)} />
    </Section>
  );
}
