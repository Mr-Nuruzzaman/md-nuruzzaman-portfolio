import { Skeleton, SkeletonSection } from './Skeleton';

/**
 * Loading placeholder for the Experience section. Mirrors Experience.tsx box math
 * exactly — the ol/li/article grid (meta rail + topo rail + content), per-entry
 * divider (`first:border-t-0`) and top-pad drop (`first:pt-0`) — so the swap to
 * real content produces zero layout shift. The topo rail's animated edge/node is
 * decorative; only its static hairline + square are reproduced.
 */

// Per-entry counts mirror the real timeline: bullet lines and (wrapped) tech chips.
const ENTRIES = [
  { bullets: 5, chips: 8 },
  { bullets: 3, chips: 5 },
  { bullets: 7, chips: 7 },
] as const;

const CHIP_WIDTHS = ['w-16', 'w-20', 'w-24', 'w-20', 'w-24', 'w-16', 'w-20', 'w-24'];

export function ExperienceSkeleton() {
  return (
    <SkeletonSection label="Loading experience section" className="relative py-14 md:py-24">
      <div className="mx-auto w-full max-w-container px-6 md:px-8">
        {/* Centered header — matches Section's eyebrow + heading + rule block */}
        <div className="mb-10 text-center md:mb-12">
          <Skeleton className="mx-auto h-4 w-40" />
          <Skeleton className="mx-auto mt-3 h-10 w-80 sm:h-12" />
          <Skeleton className="mx-auto mt-6 h-px w-24 md:mt-8" />
        </div>

        <ol className="flex flex-col">
          {ENTRIES.map((entry, i) => (
            <li key={i} className="border-t border-border first:border-t-0">
              <article
                className={`grid gap-6 pb-8 md:grid-cols-[13.5rem_1.5rem_1fr] md:gap-8 ${i === 0 ? 'pt-0' : 'pt-8'}`}
              >
                {/* Meta rail — date, type·mode, location */}
                <div className="flex flex-col gap-2">
                  <Skeleton className="h-4 w-36" />
                  <Skeleton className="h-3 w-28" />
                  <Skeleton className="h-3 w-24" />
                </div>

                {/* Topo rail — static hairline + node square (animated edge omitted) */}
                <div className="relative hidden md:block">
                  <span className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-border" />
                  <span className="absolute left-1/2 top-[0.6rem] h-2 w-2 -translate-x-1/2 bg-border" />
                </div>

                {/* Content — title, bullet lines, tech chips */}
                <div className="flex min-w-0 flex-col gap-4">
                  <Skeleton className="h-6 w-3/4" />

                  <div className="flex flex-col gap-2.5">
                    {Array.from({ length: entry.bullets }).map((_, b) => (
                      <div key={b} className="grid grid-cols-[auto_1fr] gap-3">
                        <Skeleton className="mt-[0.7em] h-px w-4 shrink-0" />
                        <Skeleton className={`h-4 ${b === entry.bullets - 1 ? 'w-2/3' : 'w-full'}`} />
                      </div>
                    ))}
                  </div>

                  <div className="flex flex-wrap gap-2 pt-1">
                    {Array.from({ length: entry.chips }).map((_, c) => (
                      <Skeleton key={c} className={`h-7 rounded-full ${CHIP_WIDTHS[c % CHIP_WIDTHS.length]}`} />
                    ))}
                  </div>
                </div>
              </article>
            </li>
          ))}
        </ol>
      </div>
    </SkeletonSection>
  );
}
