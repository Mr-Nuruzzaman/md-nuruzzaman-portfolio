import { Container } from '@/components/ui/Container';
import { Skeleton, SkeletonSection } from '@/components/skeletons/Skeleton';

/** Floating pill nav placeholder — mirrors Navbar's fixed centered pill box math. */
export function NavbarSkeleton() {
  return (
    <div aria-hidden className="fixed inset-x-0 top-0 z-50 flex justify-center px-4 pt-4">
      <div className="flex h-14 items-center gap-1 rounded-full border border-border bg-bg/70 pl-2 pr-2">
        <Skeleton className="h-8 w-8 rounded-full" />
        <div className="mx-3 hidden items-center gap-4 md:flex">
          {['w-14', 'w-20', 'w-16', 'w-24', 'w-12', 'w-16'].map((w) => (
            <Skeleton key={w} className={`h-4 ${w}`} />
          ))}
        </div>
        <Skeleton className="h-9 w-20 rounded-full" />
        <Skeleton className="h-10 w-10 rounded-full md:hidden" />
      </div>
    </div>
  );
}

/** Credibility strip placeholder — single scrolling mono line. */
export function MarqueeSkeleton() {
  return (
    <SkeletonSection label="Loading credentials…" className="w-full border-b border-border py-4">
      <div className="flex gap-8 overflow-hidden">
        {Array.from({ length: 8 }).map((_, i) => (
          <Skeleton key={i} className="h-3 w-28" />
        ))}
      </div>
    </SkeletonSection>
  );
}

/** XXL signature footer placeholder — giant name + CTA, sitemap + socials, metadata. */
export function FooterSkeleton() {
  return (
    <SkeletonSection label="Loading footer…" className="border-t border-border">
      <Container className="flex flex-col gap-16 py-20 md:py-28">
        {/* Tier 1 — signature + CTA */}
        <div className="flex flex-col gap-6">
          <Skeleton className="h-3.5 w-64" />
          <Skeleton className="h-16 w-4/5 max-w-3xl rounded-md md:h-24" />
          <Skeleton className="h-6 w-96 max-w-full" />
        </div>

        {/* Tier 2 — sitemap + socials */}
        <div className="flex flex-col gap-8 border-t border-border pt-10 sm:flex-row sm:justify-between">
          <div className="flex flex-wrap gap-x-8 gap-y-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <Skeleton key={i} className="h-4 w-16" />
            ))}
          </div>
          <div className="flex flex-wrap gap-2">
            {Array.from({ length: 6 }).map((_, i) => (
              <Skeleton key={i} className="h-11 w-11 rounded-md" />
            ))}
          </div>
        </div>

        {/* Tier 3 — metadata */}
        <div className="flex justify-between border-t border-border pt-8">
          <Skeleton className="h-3.5 w-72" />
          <Skeleton className="h-3.5 w-16" />
        </div>
      </Container>
    </SkeletonSection>
  );
}
