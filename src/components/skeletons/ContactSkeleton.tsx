import { Skeleton, SkeletonSection } from '@/components/skeletons/Skeleton';

/**
 * Contact section skeleton — mirrors Contact.tsx box math (Section header +
 * 5fr/6fr editorial/form split) so the swap to the real client component is
 * layout-shift free. Server component; no hooks, no A* ornament.
 */
export function ContactSkeleton() {
  return (
    <SkeletonSection label="Loading contact" className="mx-auto w-full max-w-container px-6 py-24 sm:px-8 lg:py-32">
      {/* Centered header */}
      <div className="mb-14 flex flex-col items-center gap-4 text-center">
        <Skeleton className="h-3.5 w-24" />
        <Skeleton className="h-9 w-80 max-w-full" />
      </div>

      <div className="grid gap-14 lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] lg:gap-20">
        {/* Editorial column */}
        <div className="flex flex-col">
          {/* Availability */}
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-2.5">
              <Skeleton className="h-2.5 w-2.5 rounded-full" />
              <Skeleton className="h-4 w-48" />
            </div>
            <Skeleton className="h-4 w-full max-w-md" />
            <Skeleton className="h-4 w-2/3" />
            <Skeleton className="h-3 w-56" />
          </div>

          {/* Email row */}
          <div className="mt-10 flex flex-wrap items-center gap-3">
            <Skeleton className="h-11 w-64 rounded-md" />
            <Skeleton className="h-11 w-11 rounded-md" />
          </div>

          {/* Résumé + socials */}
          <div className="mt-8 flex flex-wrap items-center gap-2.5">
            <Skeleton className="h-10 w-28 rounded-md" />
            {Array.from({ length: 6 }).map((_, i) => (
              <Skeleton key={i} className="h-11 w-11 rounded-md" />
            ))}
          </div>
        </div>

        {/* Form card */}
        <div className="rounded-2xl border border-border bg-surface p-6 sm:p-8">
          <Skeleton className="h-3.5 w-32" />
          <div className="mt-6 flex flex-col gap-5">
            <div className="flex flex-col gap-2">
              <Skeleton className="h-3.5 w-16" />
              <Skeleton className="h-12 w-full rounded-md" />
            </div>
            <div className="flex flex-col gap-2">
              <Skeleton className="h-3.5 w-16" />
              <Skeleton className="h-12 w-full rounded-md" />
            </div>
            <div className="flex flex-col gap-2">
              <Skeleton className="h-3.5 w-16" />
              <Skeleton className="h-32 w-full rounded-md" />
            </div>
            <Skeleton className="mt-1 h-12 w-40 rounded-md" />
          </div>
        </div>
      </div>
    </SkeletonSection>
  );
}
