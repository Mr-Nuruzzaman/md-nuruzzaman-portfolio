'use client';

import { useState } from 'react';
import Image from 'next/image';
import { ArrowUpRight, ExternalLink, Github } from 'lucide-react';

import { Section } from '@/components/ui/Section';
import { Chip } from '@/components/ui/Chip';
import { Button } from '@/components/ui/Button';
import { GradientText } from '@/components/ui/GradientText';
import { RevealGroup, RevealItem } from '@/components/animations/Reveal';
import { ProjectModal } from './ProjectModal';
import { projects } from '@/data/projects';
import type { IProject } from '@/data/projects';
import { cn, galleryOf, initials } from '@/lib/utils';

const MAX_CHIPS = 4;

function ProjectRow({ project, flip, onOpen }: { project: IProject; flip: boolean; onOpen: () => void }) {
  const { title, blurb, tech, links, badge } = project;
  const gallery = galleryOf(project);
  const [errored, setErrored] = useState(false);
  const primary = !errored ? gallery[0] : undefined;

  return (
    <div className="grid grid-cols-1 items-center gap-6 md:grid-cols-12">
      {/* Imagery — spans 7 cols, whole frame opens the detail modal */}
      <button
        type="button"
        onClick={onOpen}
        aria-label={`View ${title} details`}
        className={cn(
          'group relative aspect-[16/10] w-full overflow-hidden rounded-xl border border-border bg-surface-2 text-left md:row-start-1',
          flip ? 'md:col-span-7 md:col-start-6' : 'md:col-span-7 md:col-start-1',
        )}
      >
        {primary ? (
          <Image
            src={primary}
            alt={`${title} preview`}
            fill
            sizes="(min-width: 768px) 58vw, 100vw"
            onError={() => setErrored(true)}
            className="object-contain transition-transform duration-500 ease-expo group-hover:scale-[1.03]"
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

        {/* gallery photo-stack — quiet signal that a detail view exists */}
        {gallery.length > 1 && (
          <span className="absolute bottom-3 right-3 z-10 flex items-center" aria-hidden>
            {gallery.slice(1, 3).map((src, i) => (
              <span
                key={src + i}
                className="relative -ml-4 h-9 w-14 overflow-hidden rounded-md border border-border-glow shadow-lg"
                style={{ zIndex: 5 - i }}
              >
                <Image src={src} alt="" fill sizes="80px" className="bg-surface-2 object-contain" />
              </span>
            ))}
            <span className="z-10 ml-1.5 rounded-full bg-bg/85 px-2 py-0.5 font-mono text-xs text-content">
              {gallery.length}
            </span>
          </span>
        )}
      </button>

      {/* Copy — spans 6 cols, overlaps the imagery by one column via col-start + z-index */}
      <div
        className={cn(
          'flex min-w-0 flex-col gap-4 md:z-10 md:row-start-1',
          flip
            ? 'md:col-span-6 md:col-start-1 md:items-start md:text-left'
            : 'md:col-span-6 md:col-start-7 md:items-end md:text-right',
        )}
      >
        <div className={cn('flex items-center gap-3', !flip && 'md:flex-row-reverse')}>
          <span className="font-mono text-eyebrow uppercase tracking-widest text-content-dim">Featured project</span>
          {badge && <Chip className="border-accent/40 bg-bg/80 text-accent-2">{badge}</Chip>}
        </div>

        <h3 className="break-words font-heading text-3xl leading-tight text-content sm:text-4xl">{title}</h3>

        {/* Overlap panel — opaque surface floating over the imagery edge on md+ */}
        <p className="max-w-prose break-words rounded-xl border border-border bg-bg-elev p-5 text-left text-content-muted">
          {blurb}
        </p>

        <ul className={cn('flex flex-wrap gap-2', !flip && 'md:justify-end')} aria-label="Technologies used">
          {tech.slice(0, MAX_CHIPS).map((t) => (
            <li key={t}>
              <Chip>{t}</Chip>
            </li>
          ))}
          {tech.length > MAX_CHIPS && (
            <li>
              <Chip>+{tech.length - MAX_CHIPS}</Chip>
            </li>
          )}
        </ul>

        <div className={cn('flex flex-wrap items-center gap-3 pt-1', !flip && 'md:justify-end')}>
          <Button variant="ghost" size="sm" onClick={onOpen}>
            Case study
            <ArrowUpRight className="h-4 w-4" aria-hidden />
          </Button>
          {links.live && (
            <Button href={links.live} variant="icon" aria-label={`Open ${title} live site`}>
              <ExternalLink className="h-4 w-4" aria-hidden />
            </Button>
          )}
          {links.repo && (
            <Button href={links.repo} variant="icon" aria-label={`View ${title} source on GitHub`}>
              <Github className="h-4 w-4" aria-hidden />
            </Button>
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
      <RevealGroup className="flex flex-col gap-y-20 md:gap-y-28">
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
