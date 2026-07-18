import { profile } from '@/data/profile';
import { NAV_LINKS } from '@/lib/constants';
import { Container } from '@/components/ui/Container';
import {
  AtCoderIcon,
  CodeChefIcon,
  CodeforcesIcon,
  GitHubIcon,
  LeetCodeIcon,
  LinkedInIcon,
} from '@/components/ui/BrandIcons';

const SOCIALS = [
  { href: profile.socials.github, label: 'GitHub', Icon: GitHubIcon },
  { href: profile.socials.linkedin, label: 'LinkedIn', Icon: LinkedInIcon },
  { href: profile.socials.codeforces, label: 'Codeforces', Icon: CodeforcesIcon },
  { href: profile.socials.codechef, label: 'CodeChef', Icon: CodeChefIcon },
  { href: profile.socials.leetcode, label: 'LeetCode', Icon: LeetCodeIcon },
  { href: profile.socials.atcoder, label: 'AtCoder', Icon: AtCoderIcon },
];

/** XXL signature close: giant name + CTA, sitemap + socials, mono metadata. */
export function Footer() {
  return (
    <footer className="border-t border-border">
      <Container className="flex flex-col gap-16 py-20 md:py-28">
        {/* Tier 1 — signature + CTA */}
        <div className="flex flex-col gap-6">
          <p className="font-mono text-eyebrow uppercase tracking-[0.2em] text-content-dim">{profile.remoteFocus}</p>
          <h2 className="font-display text-[clamp(2.5rem,10vw,6.5rem)] font-bold leading-[0.92] tracking-tight text-content">
            {profile.name}
            <span className="text-accent">.</span>
          </h2>
          <p className="max-w-2xl text-balance text-xl text-content-muted md:text-2xl">
            Have an algorithmic problem worth solving?{' '}
            <a
              href={`mailto:${profile.email}`}
              className="text-accent decoration-accent/40 underline-offset-4 transition-colors hover:text-accent-2 hover:underline"
            >
              Let’s talk.
            </a>
          </p>
        </div>

        {/* Tier 2 — sitemap + socials */}
        <div className="flex flex-col gap-8 border-t border-border pt-10 sm:flex-row sm:items-center sm:justify-between">
          <nav aria-label="Sitemap" className="flex flex-wrap gap-x-8 gap-y-3">
            {NAV_LINKS.map((link, i) => (
              <a
                key={link.id}
                href={`/#${link.id}`}
                className="group inline-flex items-baseline gap-1.5 text-content-muted transition-colors hover:text-content"
              >
                <span className="font-mono text-[0.625rem] text-content-dim transition-colors group-hover:text-accent">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span className="text-small">{link.label}</span>
              </a>
            ))}
          </nav>
          <div className="flex flex-wrap items-center gap-2">
            {SOCIALS.map(({ href, label, Icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="grid h-11 w-11 place-items-center rounded-md border border-border text-content-muted transition-colors hover:border-accent hover:text-accent-2"
              >
                <Icon size={18} />
              </a>
            ))}
          </div>
        </div>

        {/* Tier 3 — metadata */}
        <div className="flex flex-col gap-2 border-t border-border pt-8 font-mono text-small tracking-wide text-content-dim sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {profile.name} · {profile.title}
          </p>
          <p aria-hidden>$ exit 0</p>
        </div>
      </Container>
    </footer>
  );
}
