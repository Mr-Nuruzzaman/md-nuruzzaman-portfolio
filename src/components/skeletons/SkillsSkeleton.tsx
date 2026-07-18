import { Skeleton, SkeletonSection } from './Skeleton';

/**
 * Loading placeholder for the Skills section. Mirrors Skills.tsx box math exactly
 * (Section header spacing replicated manually since the heading is skeleton bars,
 * not real text; category rows use the same grid + border rhythm) so the swap to
 * real content produces zero layout shift.
 */

const CHIP_COUNTS = [6, 7, 5, 1, 4, 6, 6, 5, 4];
const CHIP_WIDTHS = ['w-16', 'w-24', 'w-20', 'w-28', 'w-14'];

export function SkillsSkeleton() {
  return (
    <SkeletonSection label="Loading skills section" className="relative py-10 md:py-16">
      <div className="mx-auto w-full max-w-container px-6 md:px-8">
        {/* Centered header — matches Section's eyebrow + heading + rule block */}
        <div className="mb-10 text-center md:mb-12">
          <Skeleton className="mx-auto h-4 w-40" />
          <Skeleton className="mx-auto mt-3 h-10 w-72 sm:h-12 sm:w-96" />
          <Skeleton className="mx-auto mt-6 h-px w-24 md:mt-8" />
        </div>

        <ul>
          {CHIP_COUNTS.map((count, row) => (
            <li
              key={row}
              className={
                'grid gap-x-6 gap-y-3 py-6 md:grid-cols-[14rem_1fr]' + (row > 0 ? ' border-t border-border' : '')
              }
            >
              {/* Category label */}
              <Skeleton className="h-3.5 w-32" />
              {/* Chip cluster */}
              <div className="flex flex-wrap gap-2">
                {Array.from({ length: count }).map((_, i) => {
                  // First row's last chip mirrors the long AWS entry.
                  const width = row === 0 && i === count - 1 ? 'w-64' : CHIP_WIDTHS[i % CHIP_WIDTHS.length];
                  return <Skeleton key={i} className={`h-7 rounded-full ${width}`} />;
                })}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </SkeletonSection>
  );
}
