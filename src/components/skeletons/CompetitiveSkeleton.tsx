import { Skeleton, SkeletonSection } from './Skeleton';

/**
 * Loading placeholder for <CompetitiveProgramming>. Box math mirrors the real
 * section: centered apex line, terminal contest-log panel, and the 2-col
 * platform grid — so swapping in the live section causes zero layout shift.
 */
export function CompetitiveSkeleton() {
  return (
    <SkeletonSection label="Loading competitive programming…" className="relative py-10 md:py-16">
      <div className="mx-auto w-full max-w-container px-6 md:px-8">
        {/* Centered section header bars. */}
        <div className="mb-10 flex flex-col items-center md:mb-12">
          <Skeleton className="h-4 w-56" />
          <Skeleton className="mt-3 h-10 w-80 sm:h-12" />
          <Skeleton className="mt-6 h-px w-24 md:mt-8" />
        </div>
        {/* Apex line — two clamp-height bars, max-w-4xl. */}
        <div className="flex max-w-4xl flex-col gap-2">
          <Skeleton className="h-7 w-full sm:h-8" />
          <Skeleton className="h-7 w-4/5 sm:h-8" />
        </div>

        {/* Terminal contest-log panel. */}
        <div className="mt-14 rounded-lg border border-border bg-bg-elev">
          <div className="flex items-center gap-3 border-b border-border px-4 py-3">
            <span className="flex gap-1.5">
              <span className="h-2.5 w-2.5 rounded-full bg-content-dim/40" />
              <span className="h-2.5 w-2.5 rounded-full bg-content-dim/40" />
              <span className="h-2.5 w-2.5 rounded-full bg-content-dim/40" />
            </span>
            <Skeleton className="h-3.5 w-28" />
          </div>
          <div className="flex flex-col gap-2.5 p-4 sm:gap-1.5 sm:p-6">
            {Array.from({ length: 10 }).map((_, i) => (
              <div key={i} className="flex flex-wrap items-baseline gap-x-3">
                <Skeleton className="h-3.5 w-3" />
                <Skeleton className="h-3.5 w-10" />
                <Skeleton className="h-3.5 max-w-md flex-1 basis-52" />
                <Skeleton className="ml-auto h-3.5 w-32" />
              </div>
            ))}
          </div>
          <div className="border-t border-border px-4 py-3">
            <Skeleton className="h-3.5 w-40" />
          </div>
        </div>

        {/* Platform stat grid. */}
        <div className="mt-14 grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <div
              key={i}
              className="flex flex-col justify-between gap-5 rounded-lg border border-border bg-surface p-5 sm:p-6"
            >
              <div className="flex items-center justify-between gap-3">
                <span className="flex items-center gap-2.5">
                  <Skeleton className="h-4 w-4" />
                  <Skeleton className="h-3.5 w-24" />
                </span>
                <Skeleton className="h-8 w-8 rounded-md" />
              </div>
              <div className="flex items-end justify-between gap-3">
                <Skeleton className="h-10 w-28 sm:h-12" />
                <span className="flex flex-col items-end gap-1">
                  <Skeleton className="h-4 w-20" />
                  <Skeleton className="h-3.5 w-24" />
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </SkeletonSection>
  );
}
