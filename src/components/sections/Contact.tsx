'use client';

import { useState } from 'react';
import { Check, Code2, Copy, Github, Linkedin, Mail, Terminal } from 'lucide-react';
import { Section } from '@/components/ui/Section';
import { Button } from '@/components/ui/Button';
import { GradientText } from '@/components/ui/GradientText';
import { Reveal } from '@/components/animations/Reveal';
import { TextReveal } from '@/components/animations/TextReveal';
import { Magnetic } from '@/components/animations/Magnetic';
import { profile } from '@/data/profile';
import { cn } from '@/lib/utils';

const socialLinks = [
  { label: 'GitHub', href: profile.socials.github, Icon: Github },
  { label: 'LinkedIn', href: profile.socials.linkedin, Icon: Linkedin },
  { label: 'Codeforces', href: profile.socials.codeforces, Icon: Code2 },
  { label: 'LeetCode', href: profile.socials.leetcode, Icon: Terminal },
] as const;

export function Contact() {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  };

  return (
    <Section id="contact">
      <Reveal>
        <div className="relative overflow-hidden rounded-3xl border border-border-glow bg-surface/40 px-6 py-16 text-center backdrop-blur-xl sm:px-10 md:px-16 md:py-24">
          {/* drifting neon mesh backdrop (absolute child of this relative panel) */}
          <div className="grad-mesh -z-10 rounded-3xl" aria-hidden />
          {/* gradient wash */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 -z-10 bg-grad-primary opacity-[0.06]"
          />

          <p className="font-mono text-eyebrow uppercase tracking-[0.2em] text-accent">
            Contact
          </p>

          <TextReveal
            as="h2"
            by="word"
            text="Let's build something"
            className="mx-auto mt-5 block max-w-3xl text-h2 font-heading font-bold leading-tight text-content md:text-display"
          />

          <Reveal delay={0.1} className="mx-auto mt-5 max-w-xl">
            <p className="text-body text-content-muted md:text-lg">
              <GradientText>{profile.remoteFocus}</GradientText>
            </p>
            <p className="mt-3 text-small text-content-dim">
              Based in {profile.location} — {profile.openTo.join(' · ')}.
            </p>
          </Reveal>

          {/* Polite live region announces the copy result to screen readers. */}
          <span className="sr-only" role="status" aria-live="polite">
            {copied ? 'Email address copied to clipboard' : ''}
          </span>

          {/* Copy-email interaction */}
          <Reveal delay={0.18} className="mt-10 flex justify-center">
            <Magnetic strength={8} className="inline-flex max-w-full">
              <button
                type="button"
                onClick={handleCopy}
                aria-label={copied ? 'Email copied to clipboard' : `Copy email address ${profile.email}`}
                className="group relative inline-flex max-w-full items-center justify-center gap-2 rounded-full border border-border-glow bg-bg-elev/70 px-4 py-3 font-mono text-xs text-content backdrop-blur transition-all duration-200 ease-smooth hover:border-accent hover:text-accent hover:shadow-glow-cyan focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent sm:gap-3 sm:px-5 sm:text-small md:text-body"
              >
                <span className="min-w-0 break-all tabular-nums tracking-tight">{profile.email}</span>
                <span
                  aria-hidden
                  className="relative grid h-6 w-6 shrink-0 place-items-center rounded-md border border-border bg-surface/60 transition-colors group-hover:border-accent"
                >
                  {copied ? (
                    <Check className="h-4 w-4 text-success" strokeWidth={2.5} />
                  ) : (
                    <Copy className="h-4 w-4" strokeWidth={2} />
                  )}
                </span>
                <span
                  aria-hidden
                  className={cn(
                    'pointer-events-none absolute -top-9 left-1/2 -translate-x-1/2 rounded-md border border-border-glow bg-bg px-2.5 py-1 text-xs font-medium text-accent shadow-glow-cyan transition-all duration-200 ease-expo',
                    copied ? 'translate-y-0 opacity-100' : 'translate-y-1 opacity-0',
                  )}
                >
                  Copied!
                </span>
              </button>
            </Magnetic>
          </Reveal>

          {/* Primary actions */}
          <Reveal delay={0.24} className="mx-auto mt-8 flex max-w-sm flex-col items-center justify-center gap-4 sm:max-w-none sm:flex-row">
            <Magnetic className="flex w-full sm:inline-flex sm:w-auto [&>a]:w-full [&>a]:justify-center sm:[&>a]:w-auto">
              <Button href={`mailto:${profile.email}`} variant="primary" size="md">
                <Mail className="h-4 w-4" strokeWidth={2} />
                Send an email
              </Button>
            </Magnetic>
            <Magnetic className="flex w-full sm:inline-flex sm:w-auto [&>a]:w-full [&>a]:justify-center sm:[&>a]:w-auto">
              <Button href={profile.resume} variant="ghost" size="md">
                View résumé
              </Button>
            </Magnetic>
          </Reveal>

          {/* Social icon links */}
          <Reveal delay={0.3} className="mt-12">
            <ul className="flex flex-wrap items-center justify-center gap-3 sm:gap-4">
              {socialLinks.map(({ label, href, Icon }) => (
                <li key={label}>
                  <Magnetic strength={10} className="inline-flex">
                    <Button href={href} variant="icon" aria-label={label}>
                      <Icon className="h-5 w-5" strokeWidth={1.75} />
                    </Button>
                  </Magnetic>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </Reveal>
    </Section>
  );
}
