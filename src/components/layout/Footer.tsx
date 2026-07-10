import { profile } from '@/data/profile';
import { Container } from '@/components/ui/Container';
import { CodeforcesIcon, GitHubIcon, LinkedInIcon } from '@/components/ui/BrandIcons';

const SOCIALS = [
  { href: profile.socials.github, label: 'GitHub', Icon: GitHubIcon },
  { href: profile.socials.linkedin, label: 'LinkedIn', Icon: LinkedInIcon },
  { href: profile.socials.codeforces, label: 'Codeforces', Icon: CodeforcesIcon },
];

export function Footer() {
  return (
    <footer className="border-t border-border py-12">
      <Container className="flex flex-col items-center justify-between gap-4 sm:flex-row">
        <p className="font-mono text-small tracking-wide text-content-dim">
          © {new Date().getFullYear()} {profile.name} · {profile.title}
        </p>
        <div className="flex items-center gap-2">
          {SOCIALS.map(({ href, label, Icon }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              className="grid h-11 w-11 place-items-center text-content-muted transition-colors hover:text-accent-2"
            >
              <Icon size={18} />
            </a>
          ))}
        </div>
      </Container>
    </footer>
  );
}
