import { Skeleton, SkeletonSection } from './Skeleton';

/**
 * Loading placeholder for the /projects/[slug] case-study route.
 *
 * Box math mirrors src/app/projects/[slug]/page.tsx verbatim — same main
 * container (max-w-[760px] px-6 pb-28 pt-32 sm:pt-36), same header/meta/article
 * spacing — so hydration swaps in with zero layout shift.
 */
export function CaseStudySkeleton() {
  return (
    <SkeletonSection label="Loading case study…" className="mx-auto w-full max-w-[760px] px-6 pb-28 pt-32 sm:pt-36">
      {/* Back link */}
      <Skeleton className="h-4 w-36" />

      {/* Header */}
      <header className="mt-10 border-b border-border pb-10">
        <Skeleton className="h-3.5 w-40" />
        <div className="mt-5 flex flex-col gap-2">
          <Skeleton className="h-10 w-full sm:h-12" />
          <Skeleton className="h-10 w-2/3 sm:h-12" />
        </div>
        <div className="mt-6 flex max-w-[62ch] flex-col gap-2">
          <Skeleton className="h-5 w-full" />
          <Skeleton className="h-5 w-3/4" />
        </div>

        {/* Meta list */}
        <dl className="mt-9 grid grid-cols-1 gap-x-10 gap-y-5 sm:grid-cols-[auto_1fr]">
          <div className="contents">
            <dt>
              <Skeleton className="h-3.5 w-16" />
            </dt>
            <dd>
              <Skeleton className="h-4 w-48" />
            </dd>
          </div>
          <div className="contents">
            <dt>
              <Skeleton className="h-3.5 w-16" />
            </dt>
            <dd>
              <Skeleton className="h-4 w-32" />
            </dd>
          </div>
          <div className="contents">
            <dt>
              <Skeleton className="h-3.5 w-16" />
            </dt>
            <dd className="flex flex-wrap gap-2">
              {['w-16', 'w-20', 'w-14', 'w-24', 'w-16', 'w-20'].map((w, i) => (
                <Skeleton key={i} className={`h-7 rounded-full ${w}`} />
              ))}
            </dd>
          </div>
        </dl>
      </header>

      {/* Article prose */}
      <div className="mt-12">
        {[0, 1, 2].map((block) => (
          <div key={block}>
            <Skeleton className="mt-10 h-7 w-56" />
            <div className="mt-4 flex flex-col gap-2">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-2/3" />
            </div>
            {block < 2 && <Skeleton className="mt-8 aspect-[16/9] w-full rounded-lg" />}
          </div>
        ))}
      </div>
    </SkeletonSection>
  );
}
