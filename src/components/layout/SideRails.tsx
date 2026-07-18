'use client';

import { m } from 'framer-motion';
import { profile } from '@/data/profile';
import { EASE_SMOOTH } from '@/lib/constants';
import { usePrefersReducedMotion } from '@/hooks/useMediaQuery';
import { GitHubIcon, LinkedInIcon, CodeforcesIcon, LeetCodeIcon } from '@/components/ui/BrandIcons';

const socialLinks = [
  { label: 'GitHub', href: profile.socials.github, Icon: GitHubIcon },
  { label: 'LinkedIn', href: profile.socials.linkedin, Icon: LinkedInIcon },
  { label: 'Codeforces', href: profile.socials.codeforces, Icon: CodeforcesIcon },
  { label: 'LeetCode', href: profile.socials.leetcode, Icon: LeetCodeIcon },
];

/**
 * Fixed dual side rails framing the page on lg+ — a bottom-anchored editorial device
 * (brittanychiang-style corner rails). Left: quiet social icon column; right: vertical
 * email wordmark. Both sit above a hairline running to the viewport bottom, below the
 * navbar (z-40), and fade in after mount. Static under reduced motion; hidden below lg
 * to avoid overlap on narrow viewports. Fixed with positive offsets only — no overflow.
 */
export function SideRails() {
  const reduced = usePrefersReducedMotion();

  const fade = reduced
    ? { initial: false as const }
    : {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        transition: { duration: 0.6, delay: 0.8, ease: EASE_SMOOTH },
      };

  return (
    <>
      {/* Left rail — social icon column above a hairline to the bottom edge */}
      <m.aside
        {...fade}
        aria-label="Social links"
        className="pointer-events-none fixed bottom-0 left-7 z-40 hidden flex-col items-center gap-6 lg:flex"
      >
        <ul className="flex flex-col items-center gap-5">
          {socialLinks.map(({ label, href, Icon }) => (
            <li key={label}>
              <a
                href={href}
                target="_blank"
                rel="noreferrer noopener"
                aria-label={label}
                className="pointer-events-auto grid size-9 place-items-center text-content-dim transition duration-200 ease-smooth hover:-translate-y-0.5 hover:text-accent"
              >
                <Icon size={18} />
              </a>
            </li>
          ))}
        </ul>
        <span aria-hidden className="h-20 w-px bg-border" />
      </m.aside>

      {/* Right rail — vertical email above the same hairline */}
      <m.aside
        {...fade}
        aria-label="Email"
        className="pointer-events-none fixed bottom-0 right-7 z-40 hidden flex-col items-center gap-6 lg:flex"
      >
        <a
          href={`mailto:${profile.email}`}
          className="pointer-events-auto font-mono text-xs tracking-[0.2em] text-content-dim transition-colors duration-200 [writing-mode:vertical-rl] hover:text-accent"
        >
          {profile.email}
        </a>
        <span aria-hidden className="h-20 w-px bg-border" />
      </m.aside>
    </>
  );
}
