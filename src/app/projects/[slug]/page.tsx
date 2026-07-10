import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, ArrowUpRight, Github } from 'lucide-react';
import { caseStudies } from '#content';
import { profile } from '@/data/profile';
import { cn } from '@/lib/utils';
import styles from './prose.module.css';

const bySlug = (slug: string) => caseStudies.find((c) => c.slug === slug);

export function generateStaticParams() {
  return caseStudies.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const study = bySlug(slug);
  if (!study) return {};
  const title = `${study.title} — ${profile.name}`;
  return {
    title,
    description: study.summary,
    alternates: { canonical: `/projects/${study.slug}` },
    openGraph: { type: 'article', title, description: study.summary, url: `/projects/${study.slug}` },
    twitter: { card: 'summary_large_image', title, description: study.summary },
  };
}

export default async function CaseStudyPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const study = bySlug(slug);
  if (!study) notFound();

  const others = caseStudies.filter((c) => c.slug !== study.slug);

  return (
    <main id="main" tabIndex={-1} className="mx-auto w-full max-w-[760px] px-6 pb-28 pt-32 outline-none sm:pt-36">
      <Link
        href="/#projects"
        className="group inline-flex items-center gap-2 font-mono text-small text-content-dim transition-colors hover:text-content-muted"
      >
        <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-0.5" aria-hidden />
        {profile.name}
      </Link>

      <header className="mt-10 border-b border-border pb-10">
        <p className="font-mono text-eyebrow uppercase text-accent">Case study</p>
        <h1 className="mt-5 font-display text-h2 font-normal leading-[1.05] text-content">{study.title}</h1>
        <p className="mt-6 max-w-[62ch] text-body-lg leading-relaxed text-content-muted">{study.summary}</p>

        <dl className="mt-9 grid grid-cols-1 gap-x-10 gap-y-5 font-mono text-small sm:grid-cols-[auto_1fr]">
          <MetaRow label="Role" value={study.role} />
          {study.period && <MetaRow label="Period" value={study.period} />}
          <div className="contents">
            <dt className="text-content-dim">Stack</dt>
            <dd className="flex flex-wrap gap-2">
              {study.stack.map((t) => (
                <span key={t} className="rounded-sm border border-border px-2 py-0.5 text-content-muted">
                  {t}
                </span>
              ))}
            </dd>
          </div>
          {(study.live || study.repo) && (
            <div className="contents">
              <dt className="text-content-dim">Links</dt>
              <dd className="flex flex-wrap gap-x-6 gap-y-2">
                {study.live && (
                  <MetaLink
                    href={study.live}
                    label="Live site"
                    icon={<ArrowUpRight className="h-3.5 w-3.5" aria-hidden />}
                  />
                )}
                {study.repo && (
                  <MetaLink href={study.repo} label="Source" icon={<Github className="h-3.5 w-3.5" aria-hidden />} />
                )}
              </dd>
            </div>
          )}
        </dl>
      </header>

      <article className={cn(styles.prose, 'mt-12')} dangerouslySetInnerHTML={{ __html: study.body }} />

      {others.length > 0 && (
        <footer className="mt-20 border-t border-border pt-10">
          <h2 className="font-mono text-eyebrow uppercase text-content-dim">More case studies</h2>
          <ul className="mt-6 flex flex-col divide-y divide-border">
            {others.map((o) => (
              <li key={o.slug}>
                <Link
                  href={`/projects/${o.slug}`}
                  className="group flex items-center justify-between gap-4 py-4 transition-colors"
                >
                  <span className="font-display text-h3 font-normal leading-tight text-content-muted transition-colors group-hover:text-content">
                    {o.title}
                  </span>
                  <ArrowUpRight
                    className="h-5 w-5 shrink-0 text-content-dim transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent-2"
                    aria-hidden
                  />
                </Link>
              </li>
            ))}
          </ul>
        </footer>
      )}
    </main>
  );
}

function MetaRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="contents">
      <dt className="text-content-dim">{label}</dt>
      <dd className="text-content-muted">{value}</dd>
    </div>
  );
}

function MetaLink({ href, label, icon }: { href: string; label: string; icon: React.ReactNode }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-1.5 text-accent-2 transition-colors hover:text-accent"
    >
      {label}
      {icon}
    </a>
  );
}
