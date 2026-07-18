import { Container } from '@/components/ui/Container';
import { Skeleton, SkeletonSection } from '@/components/skeletons/Skeleton';

/**
 * Hero skeleton — mirrors Hero.tsx box math verbatim (section min-h-screen,
 * Container py-28 sm:py-32, centered max-w-4xl statement block + bottom rail)
 * so the placeholder occupies the identical box at every breakpoint. Ambient
 * canvas / blueprint / scroll-cue layers are decorative and intentionally omitted.
 */
export function HeroSkeleton() {
  return (
    <section id="top" className="relative min-h-screen overflow-hidden">
      <Container className="relative z-10 flex min-h-screen flex-col py-28 sm:py-32">
        <SkeletonSection label="Loading hero…" className="flex flex-1 flex-col justify-center">
          <div className="max-w-4xl">
            {/* Eyebrow — shell prompt line */}
            <Skeleton className="mb-7 h-5 w-64" />

            {/* Name — two stacked bars matching clamp(2.9rem,10vw,8.5rem) leading-[0.92] */}
            <div className="flex flex-col gap-2">
              <Skeleton className="h-16 w-[45%] rounded-md sm:h-24 lg:h-32" />
              <Skeleton className="h-16 w-full max-w-3xl rounded-md sm:h-24 lg:h-32" />
            </div>

            {/* Tagline — two lines */}
            <div className="mt-8 flex max-w-2xl flex-col gap-3">
              <Skeleton className="h-5 w-full" />
              <Skeleton className="h-5 w-2/3" />
            </div>

            {/* Dual CTA row */}
            <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:flex-wrap sm:items-center sm:gap-5">
              <Skeleton className="h-12 w-full rounded-md sm:w-36" />
              <Skeleton className="h-12 w-full rounded-md sm:w-32" />
            </div>
          </div>
        </SkeletonSection>

        {/* Bottom metadata rail — CP ratings + socials */}
        <div className="mt-16 flex flex-col gap-8 border-t border-border pt-8 sm:flex-row sm:items-end sm:justify-between">
          <div className="flex flex-wrap items-baseline gap-x-8 gap-y-3">
            {Array.from({ length: 4 }).map((_, i) => (
              <Skeleton key={i} className="h-4 w-40" />
            ))}
          </div>
          <div className="flex flex-wrap items-center gap-2 sm:shrink-0 sm:flex-nowrap">
            {Array.from({ length: 6 }).map((_, i) => (
              <Skeleton key={i} className="h-11 w-11 rounded-md" />
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
