import { Skeleton, SkeletonSection } from './Skeleton';

/**
 * Loading placeholder for the About section. Mirrors About.tsx box math exactly
 * (Section header spacing replicated manually since the heading is skeleton bars,
 * not real text) so the swap to real content produces zero layout shift.
 */
export function AboutSkeleton() {
  return (
    <SkeletonSection label="Loading about section" className="relative py-14 md:py-24">
      <div className="mx-auto w-full max-w-container px-6 md:px-8">
        {/* Centered header — matches Section's eyebrow + heading + rule block */}
        <div className="mb-10 text-center md:mb-12">
          <Skeleton className="mx-auto h-4 w-40" />
          <Skeleton className="mx-auto mt-3 h-10 w-72 sm:h-12 sm:w-96" />
          <Skeleton className="mx-auto mt-6 h-px w-24 md:mt-8" />
        </div>

        <div className="grid gap-12 md:grid-cols-12 md:gap-x-10 lg:gap-x-16">
          {/* Left rail: portrait, stat ledger, quick facts */}
          <div className="flex flex-col gap-8 md:col-span-5 lg:col-span-4">
            <Skeleton className="aspect-[4/5] w-full max-w-[20rem] rounded-lg" />

            <div className="flex flex-col">
              {[0, 1, 2].map((i) => (
                <div key={i} className="flex items-center justify-between gap-4 border-b border-border py-3">
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="h-6 w-16" />
                </div>
              ))}
            </div>

            <div className="flex flex-col gap-4">
              {[0, 1, 2].map((i) => (
                <div key={i} className="flex flex-col gap-1">
                  <Skeleton className="h-3 w-20" />
                  <Skeleton className="h-4 w-40" />
                </div>
              ))}
            </div>
          </div>

          {/* Right: lead pull-quote, then bio paragraphs */}
          <div className="flex flex-col gap-10 md:col-span-7 lg:col-span-8">
            <div className="flex flex-col gap-3">
              <Skeleton className="h-8 w-full sm:h-10" />
              <Skeleton className="h-8 w-11/12 sm:h-10" />
              <Skeleton className="h-8 w-3/4 sm:h-10" />
            </div>

            <div className="flex flex-col gap-6">
              {[0, 1, 2].map((i) => (
                <div key={i} className="flex flex-col gap-2">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-2/3" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </SkeletonSection>
  );
}
