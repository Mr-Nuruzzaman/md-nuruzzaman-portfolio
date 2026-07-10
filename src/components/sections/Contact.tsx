'use client';

import { useActionState, useState } from 'react';
import { Check, Copy, Mail, Send } from 'lucide-react';
import { Section } from '@/components/ui/Section';
import { Button } from '@/components/ui/Button';
import { GradientText } from '@/components/ui/GradientText';
import {
  AtCoderIcon,
  CodeChefIcon,
  CodeforcesIcon,
  GitHubIcon,
  LeetCodeIcon,
  LinkedInIcon,
} from '@/components/ui/BrandIcons';
import { Reveal } from '@/components/animations/Reveal';
import { submitContact } from '@/app/actions/contact';
import { initialContactState } from '@/app/actions/contact-state';
import { profile } from '@/data/profile';
import { cn } from '@/lib/utils';

const socialLinks = [
  { site: 'GitHub', href: profile.socials.github, Icon: GitHubIcon },
  { site: 'LinkedIn', href: profile.socials.linkedin, Icon: LinkedInIcon },
  { site: 'Codeforces', href: profile.socials.codeforces, Icon: CodeforcesIcon },
  { site: 'CodeChef', href: profile.socials.codechef, Icon: CodeChefIcon },
  { site: 'LeetCode', href: profile.socials.leetcode, Icon: LeetCodeIcon },
  { site: 'AtCoder', href: profile.socials.atcoder, Icon: AtCoderIcon },
] as const;

const fieldClass =
  'w-full rounded-md border border-border bg-surface px-4 py-3 font-sans text-body text-content transition-colors duration-200 ease-smooth placeholder:text-content-dim hover:border-border-glow focus:border-accent';

export function Contact() {
  const [state, formAction, isPending] = useActionState(submitContact, initialContactState);
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

  const errors = state.errors ?? {};

  return (
    <Section id="contact">
      <div className="grid gap-14 lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] lg:gap-20">
        {/* Editorial column — heading + availability + direct affordances */}
        <div className="flex flex-col">
          <Reveal>
            <p className="font-mono text-eyebrow uppercase tracking-[0.2em] text-accent">Contact</p>
            <h2 className="mt-5 max-w-lg font-heading text-h2 font-normal leading-[1.05] text-content md:text-display">
              Let&apos;s build something <GradientText>worthwhile</GradientText>.
            </h2>
          </Reveal>

          <Reveal delay={0.08} className="mt-8 flex flex-col gap-3">
            <p className="flex items-center gap-2.5 text-body text-content-muted">
              <span aria-hidden className="relative grid h-2.5 w-2.5 place-items-center">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-success/60 motion-reduce:hidden" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-success" />
              </span>
              Open to new opportunities
            </p>
            <p className="max-w-md text-body text-content-muted">
              {profile.remoteFocus} Based in {profile.location}.
            </p>
            <p className="font-mono text-small uppercase tracking-[0.14em] text-content-dim">
              Usually replies within 48 hours
            </p>
          </Reveal>

          {/* Direct email: copy + mailto, kept alongside the form */}
          <Reveal delay={0.16} className="mt-10">
            {/* Polite live region announces the copy result to screen readers. */}
            <span className="sr-only" role="status" aria-live="polite">
              {copied ? 'Email address copied to clipboard' : ''}
            </span>
            <div className="flex flex-wrap items-center gap-3">
              <a
                href={`mailto:${profile.email}`}
                className="group inline-flex min-h-11 items-center gap-2.5 rounded-md border border-border bg-surface px-4 py-2.5 font-mono text-small text-content transition-all duration-200 ease-smooth hover:-translate-y-px hover:border-border-glow hover:text-accent-2 active:scale-[0.97]"
              >
                <Mail className="h-4 w-4 shrink-0" strokeWidth={1.75} />
                <span className="break-all">{profile.email}</span>
              </a>
              <button
                type="button"
                onClick={handleCopy}
                aria-label={copied ? 'Email copied to clipboard' : `Copy email address ${profile.email}`}
                className="inline-grid h-11 w-11 shrink-0 place-items-center rounded-md border border-border bg-surface text-content-muted transition-all duration-200 ease-smooth hover:-translate-y-px hover:border-border-glow hover:text-accent-2 active:scale-[0.97]"
              >
                {copied ? (
                  <Check className="h-4 w-4 text-success" strokeWidth={2.25} />
                ) : (
                  <Copy className="h-4 w-4" strokeWidth={2} />
                )}
              </button>
            </div>
          </Reveal>

          {/* Résumé + socials */}
          <Reveal delay={0.22} className="mt-8 flex flex-wrap items-center gap-3">
            <Button href={profile.resume} variant="ghost" size="sm">
              View résumé
            </Button>
            <ul className="flex flex-wrap items-center gap-2.5">
              {socialLinks.map(({ site, href, Icon }) => (
                <li key={site}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Md Nuruzzaman on ${site}`}
                    className="inline-grid h-11 w-11 place-items-center rounded-md border border-border bg-surface text-content-muted transition-all duration-200 ease-smooth hover:-translate-y-px hover:border-accent hover:text-accent-2 active:scale-[0.97]"
                  >
                    <Icon size={20} />
                  </a>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>

        {/* Form column */}
        <Reveal delay={0.1} className="lg:pt-2">
          <form action={formAction} className="rounded-2xl border border-border bg-surface p-6 sm:p-8">
            <p className="font-mono text-small uppercase tracking-[0.14em] text-content-dim">Send a message</p>

            <div className="mt-6 flex flex-col gap-5">
              <div className="flex flex-col gap-2">
                <label htmlFor="contact-name" className="font-mono text-small text-content-muted">
                  Name
                </label>
                <input
                  id="contact-name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  required
                  maxLength={100}
                  aria-invalid={errors.name ? true : undefined}
                  aria-describedby={errors.name ? 'contact-name-error' : undefined}
                  className={cn(fieldClass, errors.name && 'border-warning')}
                  placeholder="Your name"
                />
                {errors.name && (
                  <p id="contact-name-error" className="text-small text-warning">
                    {errors.name}
                  </p>
                )}
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="contact-email" className="font-mono text-small text-content-muted">
                  Email
                </label>
                <input
                  id="contact-email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  maxLength={200}
                  aria-invalid={errors.email ? true : undefined}
                  aria-describedby={errors.email ? 'contact-email-error' : undefined}
                  className={cn(fieldClass, errors.email && 'border-warning')}
                  placeholder="you@company.com"
                />
                {errors.email && (
                  <p id="contact-email-error" className="text-small text-warning">
                    {errors.email}
                  </p>
                )}
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="contact-message" className="font-mono text-small text-content-muted">
                  Message
                </label>
                <textarea
                  id="contact-message"
                  name="message"
                  rows={5}
                  required
                  minLength={10}
                  maxLength={4000}
                  aria-invalid={errors.message ? true : undefined}
                  aria-describedby={errors.message ? 'contact-message-error' : undefined}
                  className={cn(fieldClass, 'min-h-32 resize-y', errors.message && 'border-warning')}
                  placeholder="Tell me a little about the role or project…"
                />
                {errors.message && (
                  <p id="contact-message-error" className="text-small text-warning">
                    {errors.message}
                  </p>
                )}
              </div>

              {/* Honeypot — hidden from users, catches naive bots. */}
              <div aria-hidden className="absolute left-[-9999px] h-0 w-0 overflow-hidden" tabIndex={-1}>
                <label htmlFor="contact-company">Company (leave blank)</label>
                <input id="contact-company" name="company" type="text" tabIndex={-1} autoComplete="off" />
              </div>

              <div className="mt-1 flex flex-wrap items-center gap-4">
                <Button type="submit" variant="primary" size="md" disabled={isPending}>
                  <Send className="h-4 w-4" strokeWidth={2} />
                  {isPending ? 'Sending…' : 'Send message'}
                </Button>
              </div>

              {/* Live region: success / error / not-configured feedback */}
              <div role="status" aria-live="polite" className="min-h-[1.25rem]">
                {state.message && (
                  <p className={cn('text-small', state.ok ? 'text-success' : 'text-warning')}>
                    {state.message}
                    {state.reason === 'unconfigured' && (
                      <>
                        {' '}
                        <a
                          href={`mailto:${profile.email}`}
                          className="font-medium text-accent-2 underline underline-offset-4 hover:text-accent"
                        >
                          {profile.email}
                        </a>
                        .
                      </>
                    )}
                  </p>
                )}
              </div>
            </div>
          </form>
        </Reveal>
      </div>
    </Section>
  );
}
