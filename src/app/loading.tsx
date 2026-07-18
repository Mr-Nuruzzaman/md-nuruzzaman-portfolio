import { HeroSkeleton } from '@/components/skeletons/HeroSkeleton';
import { MarqueeSkeleton } from '@/components/skeletons/ShellSkeleton';
import { AboutSkeleton } from '@/components/skeletons/AboutSkeleton';
import { ExperienceSkeleton } from '@/components/skeletons/ExperienceSkeleton';
import { ProjectsSkeleton } from '@/components/skeletons/ProjectsSkeleton';
import { CompetitiveSkeleton } from '@/components/skeletons/CompetitiveSkeleton';
import { SkillsSkeleton } from '@/components/skeletons/SkillsSkeleton';
import { ContactSkeleton } from '@/components/skeletons/ContactSkeleton';

/**
 * Homepage loading state — Facebook-style shimmer skeleton mirroring the real
 * section order and box math (replaces the old centered-wordmark pulse). The
 * layout shell (navbar, rails, footer) persists during route loads, so only
 * page content is skeletonned. On fast connections the static page streams
 * instantly and this never paints; it exists for slow networks and
 * unprefetched navigations.
 */
export default function Loading() {
  return (
    <main className="outline-none">
      <HeroSkeleton />
      <MarqueeSkeleton />
      <AboutSkeleton />
      <ExperienceSkeleton />
      <ProjectsSkeleton />
      <CompetitiveSkeleton />
      <SkillsSkeleton />
      <ContactSkeleton />
    </main>
  );
}
