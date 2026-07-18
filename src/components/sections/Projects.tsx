'use client';

import { useState } from 'react';
import Image from 'next/image';
import { ArrowUpRight, ExternalLink, Github } from 'lucide-react';

import { Section } from '@/components/ui/Section';
import { Chip } from '@/components/ui/Chip';
import { Button } from '@/components/ui/Button';
import { GradientText } from '@/components/ui/GradientText';
import { RevealGroup, RevealItem } from '@/components/animations/Reveal';
import { VoronoiPoster } from '@/components/animations/VoronoiPoster';
import { ProjectModal } from './ProjectModal';
import { projects } from '@/data/projects';
import type { IProject } from '@/data/projects';
import { cn, galleryOf } from '@/lib/utils';

const MAX_CHIPS = 4;

/** Browser-frame mockup around a project screenshot; whole frame opens the detail modal. */
function BrowserFrame({ project, onOpen }: { project: IProject; onOpen: () => void }) {
  const { title, slug } = project;
  const gallery = galleryOf(project);
  const [errored, setErrored] = useState(false);
  const poster = !errored ? gallery[0] : undefined;

  return (
    <button
      type="button"
      onClick={onOpen}
      aria-label={`View ${title} details`}
      className="group/frame block w-full overflow-hidden rounded-lg border border-border bg-surface text-left transition-[border-color,box-shadow] duration-500 ease-expo hover:border-border-glow hover:shadow-glow-cyan focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
    >
      {/* Window chrome */}
      <span className="flex items-center gap-3 border-b border-border bg-bg-elev px-4 py-2.5">
        <span className="flex gap-1.5" aria-hidden>
          <span className="h-2.5 w-2.5 rounded-full bg-border-glow" />
          <span className="h-2.5 w-2.5 rounded-full bg-border-glow" />
          <span className="h-2.5 w-2.5 rounded-full bg-border-glow" />
        </span>
        <span className="truncate font-mono text-xs text-content-dim" aria-hidden>
          {slug}.app
        </span>
        {gallery.length > 1 && (
          <span className="ml-auto rounded-full border border-border px-2 py-0.5 font-mono text-[0.6875rem] text-content-muted">
            {gallery.length}
          </span>
        )}
      </span>

      {/* Screenshot — identical aspect on every row */}
      <span className="relative block aspect-[16/9] w-full overflow-hidden bg-bg-elev">
        {poster ? (
          <Image
            src={poster}
            alt={`${title} preview`}
            fill
            sizes="(min-width: 768px) 58vw, 100vw"
            onError={() => setErrored(true)}
            className="object-cover object-top transition-transform duration-500 ease-expo group-hover/frame:scale-[1.02]"
          />
        ) : (
          <VoronoiPoster slug={slug} title={title} />
        )}
      </span>
    </button>
  );
}

function ProjectRow({ project, flip, onOpen }: { project: IProject; flip: boolean; onOpen: () => void }) {
  const { title, blurb, tech, links, badge } = project;
  const extra = tech.length - MAX_CHIPS;

  return (
    <div className="grid grid-cols-1 items-center gap-6 md:grid-cols-12 md:gap-10">
      <div className={cn('md:col-span-7', flip && 'md:order-2')}>
        <BrowserFrame project={project} onOpen={onOpen} />
      </div>

      <div className={cn('flex flex-col gap-4 md:col-span-5', flip && 'md:order-1')}>
        <p className="font-mono text-eyebrow uppercase tracking-[0.2em] text-accent">
          Featured project
          {badge && <span className="ml-3 text-content-dim">· {badge}</span>}
        </p>
        <h3 className="font-heading text-2xl leading-tight text-content sm:text-3xl">{title}</h3>
        <p className="text-content-muted">{blurb}</p>

        <ul className="flex flex-wrap gap-2" aria-label="Technologies used">
          {tech.slice(0, MAX_CHIPS).map((t) => (
            <li key={t}>
              <Chip>{t}</Chip>
            </li>
          ))}
          {extra > 0 && (
            <li>
              <Chip>+{extra}</Chip>
            </li>
          )}
        </ul>

        <div className="mt-1 flex flex-wrap items-center gap-3">
          <Button variant="ghost" size="sm" onClick={onOpen}>
            Case study
            <ArrowUpRight className="h-4 w-4" aria-hidden />
          </Button>
          {links.live && (
            <a
              href={links.live}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Open ${title} live site`}
              className="grid h-10 w-10 place-items-center rounded-md border border-border bg-surface text-content-muted transition-colors hover:border-accent hover:text-accent-2"
            >
              <ExternalLink className="h-4 w-4" aria-hidden />
            </a>
          )}
          {links.repo && (
            <a
              href={links.repo}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`View ${title} source on GitHub`}
              className="grid h-10 w-10 place-items-center rounded-md border border-border bg-surface text-content-muted transition-colors hover:border-accent hover:text-accent-2"
            >
              <Github className="h-4 w-4" aria-hidden />
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

export function Projects() {
  const featured = projects.filter((p) => p.featured);
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
      {/* Showcase rows — every project gets the identical full-width treatment, sides alternating. */}
      <RevealGroup className="flex flex-col gap-16 md:gap-24">
        {featured.map((project, i) => (
          <RevealItem key={project.slug}>
            <ProjectRow project={project} flip={i % 2 === 1} onOpen={() => setSelected(project)} />
          </RevealItem>
        ))}
      </RevealGroup>

      <ProjectModal project={selected} onClose={() => setSelected(null)} />
    </Section>
  );
}
