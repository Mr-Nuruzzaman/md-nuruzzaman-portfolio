import { Skeleton, SkeletonSection } from './Skeleton';
import { cn } from '@/lib/utils';

const ROWS = 5;

/**
 * Loading placeholder for <Projects>. Box math mirrors Projects.tsx:
 * ProjectRow's 12-col grid + BrowserFrame chrome/16:9 image, with the same
 * odd-row side alternation so the swap to the real section shifts nothing.
 */
export function ProjectsSkeleton() {
  return (
    <SkeletonSection label="Loading projects…" className="mx-auto max-w-container">
      {/* Centered section header */}
      <div className="mb-16 flex flex-col items-center gap-4 text-center">
        <Skeleton className="h-3.5 w-32" />
        <Skeleton className="h-10 w-72 max-w-full" />
      </div>

      <div className="flex flex-col gap-16 md:gap-24">
        {Array.from({ length: ROWS }).map((_, i) => {
          const flip = i % 2 === 1;
          return (
            <div key={i} className="grid grid-cols-1 items-center gap-6 md:grid-cols-12 md:gap-10">
              {/* Frame side */}
              <div className={cn('md:col-span-7', flip && 'md:order-2')}>
                <div className="overflow-hidden rounded-lg border border-border">
                  <div className="flex items-center gap-3 border-b border-border bg-bg-elev px-4 py-2.5">
                    <Skeleton className="h-2.5 w-2.5 rounded-full" />
                    <Skeleton className="h-2.5 w-2.5 rounded-full" />
                    <Skeleton className="h-2.5 w-2.5 rounded-full" />
                    <Skeleton className="h-3 w-32" />
                  </div>
                  <Skeleton className="aspect-[16/9] w-full rounded-none" />
                </div>
              </div>

              {/* Info side */}
              <div className={cn('flex flex-col gap-4 md:col-span-5', flip && 'md:order-1')}>
                <Skeleton className="h-3.5 w-44" />
                <div className="flex flex-col gap-2">
                  <Skeleton className="h-7 w-full" />
                  <Skeleton className="h-7 w-2/3" />
                </div>
                <div className="flex flex-col gap-1.5">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-3/4" />
                </div>
                <div className="flex flex-wrap gap-2">
                  <Skeleton className="h-7 w-16 rounded-full" />
                  <Skeleton className="h-7 w-20 rounded-full" />
                  <Skeleton className="h-7 w-24 rounded-full" />
                  <Skeleton className="h-7 w-14 rounded-full" />
                  <Skeleton className="h-7 w-10 rounded-full" />
                </div>
                <div className="mt-1 flex flex-wrap items-center gap-3">
                  <Skeleton className="h-10 w-32 rounded-md" />
                  <Skeleton className="h-12 w-24 rounded-md" />
                  <Skeleton className="h-10 w-10 rounded-md" />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </SkeletonSection>
  );
}
