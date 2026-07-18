'use client';

import { useState } from 'react';
import Image from 'next/image';
import { ArrowUpRight, ExternalLink, Github } from 'lucide-react';

import { Section } from '@/components/ui/Section';
import { Chip } from '@/components/ui/Chip';
import { GradientText } from '@/components/ui/GradientText';
import { RevealGroup, RevealItem } from '@/components/animations/Reveal';
import { VoronoiPoster } from '@/components/animations/VoronoiPoster';
import { ProjectModal } from './ProjectModal';
import { projects } from '@/data/projects';
import type { IProject } from '@/data/projects';
import { cn, galleryOf } from '@/lib/utils';

const MAX_CHIPS = 3;

/**
 * Bento cell span for card `i` of `total`: a flagship 4×2 hero, two 2-col cells stacked
 * beside it, then the remainder fills the bottom row (2 → 3-col pair, 3 → 2-col trio).
 */
function cellSpan(i: number, total: number): string {
  if (i === 0) return 'md:col-span-4 md:row-span-2';
  if (i === 1 || i === 2) return 'md:col-span-2';
  const bottom = total - 3;
  if (bottom === 1) return 'md:col-span-6';
  if (bottom === 2) return 'md:col-span-3';
  return 'md:col-span-2';
}

function ProjectCard({
  project,
  large,
  dimmed,
  onOpen,
  onHoverStart,
  onHoverEnd,
}: {
  project: IProject;
  large: boolean;
  dimmed: boolean;
  onOpen: () => void;
  onHoverStart: () => void;
  onHoverEnd: () => void;
}) {
  const { title, blurb, tech, links } = project;
  const gallery = galleryOf(project);
  const [errored, setErrored] = useState(false);
  const poster = !errored ? gallery[0] : undefined;
  const extra = tech.length - MAX_CHIPS;

  return (
    <article
      onMouseEnter={onHoverStart}
      onMouseLeave={onHoverEnd}
      className={cn(
        'group relative flex h-full flex-col overflow-hidden rounded-lg border border-border bg-surface',
        'transition-[transform,opacity,border-color,box-shadow] duration-500 ease-expo',
        'hover:border-border-glow hover:shadow-glow-cyan',
        dimmed && 'opacity-60',
      )}
    >
      {/* Whole-card click target → detail modal. Sits above the image, below the body links. */}
      <button
        type="button"
        onClick={onOpen}
        aria-label={`View ${title} details`}
        className="absolute inset-0 z-10 rounded-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
      />

      {/* Image / poster */}
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-bg-elev md:aspect-auto md:min-h-0 md:flex-1">
        {poster ? (
          <Image
            src={poster}
            alt={`${title} preview`}
            fill
            sizes={large ? '(min-width: 768px) 66vw, 100vw' : '(min-width: 768px) 33vw, 100vw'}
            onError={() => setErrored(true)}
            className="object-cover transition-transform duration-500 ease-expo group-hover:scale-[1.03]"
          />
        ) : (
          <VoronoiPoster
            slug={project.slug}
            title={title}
            className="transition-transform duration-500 ease-expo group-hover:scale-[1.03]"
          />
        )}
        {gallery.length > 1 && (
          <span className="pointer-events-none absolute right-3 top-3 z-20 rounded-full border border-border-glow bg-bg/80 px-2 py-0.5 font-mono text-xs text-content-muted">
            {gallery.length}
          </span>
        )}
      </div>

      {/* Body — pointer-events-none so clicks fall through to the overlay button; links opt back in. */}
      <div className="pointer-events-none relative z-20 flex flex-col gap-2.5 p-5">
        <div className="flex items-start justify-between gap-3">
          <h3
            className={cn(
              'line-clamp-2 min-w-0 font-heading leading-tight text-content',
              large ? 'text-xl sm:text-2xl' : 'text-lg',
            )}
          >
            {title}
          </h3>
          <ArrowUpRight
            className="mt-0.5 h-5 w-5 shrink-0 text-content-dim transition-colors duration-300 group-hover:text-accent"
            aria-hidden
          />
        </div>

        <p className="line-clamp-2 text-small text-content-muted">{blurb}</p>

        <div className="mt-1 flex flex-wrap items-center gap-2">
          {tech.slice(0, MAX_CHIPS).map((t) => (
            <Chip key={t}>{t}</Chip>
          ))}
          {extra > 0 && <Chip>+{extra}</Chip>}

          {(links.live || links.repo) && (
            <span className="pointer-events-auto ml-auto flex items-center gap-1.5">
              {links.live && (
                <a
                  href={links.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  aria-label={`Open ${title} live site`}
                  className="grid h-8 w-8 place-items-center rounded-md border border-border bg-surface-2 text-content-muted transition-colors hover:border-accent hover:text-accent-2"
                >
                  <ExternalLink className="h-4 w-4" aria-hidden />
                </a>
              )}
              {links.repo && (
                <a
                  href={links.repo}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  aria-label={`View ${title} source on GitHub`}
                  className="grid h-8 w-8 place-items-center rounded-md border border-border bg-surface-2 text-content-muted transition-colors hover:border-accent hover:text-accent-2"
                >
                  <Github className="h-4 w-4" aria-hidden />
                </a>
              )}
            </span>
          )}
        </div>
      </div>
    </article>
  );
}

export function Projects() {
  const featured = projects.filter((p) => p.featured);
  const [selected, setSelected] = useState<IProject | null>(null);
  const [hovered, setHovered] = useState<number | null>(null);

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
      {/* Bento: flagship 4×2 cell, two 2-col cells stacked beside it, a 3-col pair below. */}
      <RevealGroup className="grid grid-cols-1 gap-4 md:grid-cols-6 md:grid-rows-[260px_260px_260px] md:gap-5">
        {featured.map((project, i) => (
          <RevealItem key={project.slug} className={cn('h-full min-w-0', cellSpan(i, featured.length))}>
            <ProjectCard
              project={project}
              large={i === 0}
              dimmed={hovered !== null && hovered !== i}
              onOpen={() => setSelected(project)}
              onHoverStart={() => setHovered(i)}
              onHoverEnd={() => setHovered(null)}
            />
          </RevealItem>
        ))}
      </RevealGroup>

      <ProjectModal project={selected} onClose={() => setSelected(null)} />
    </Section>
  );
}
