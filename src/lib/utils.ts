import { clsx, type ClassValue } from 'clsx';
import { extendTailwindMerge } from 'tailwind-merge';
import type { IProject } from '@/data/projects';

// tailwind-merge must be taught this project's custom `text-*` font-size tokens
// (tailwind.config.ts fontSize). Without this it can't tell `text-body` (a size)
// from `text-bg` (a color), assumes they conflict, and silently drops the color —
// which is how the primary Button lost its `text-bg` and rendered unreadable.
const twMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      'font-size': [{ text: ['display', 'h1', 'h2', 'h3', 'body-lg', 'body', 'small', 'eyebrow'] }],
    },
  },
});

/** Merge Tailwind classes safely. */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

/** Up to two uppercase initials from a title, for placeholder posters. */
export function initials(title: string): string {
  return title
    .replace(/[^a-zA-Z0-9\s]/g, ' ')
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0]!.toUpperCase())
    .join('');
}

/** Resolve a project's image gallery; first entry is the primary/poster. */
export function galleryOf(project: IProject | null | undefined): string[] {
  if (!project) return [];
  return project.images ?? [];
}

/**
 * Rolling years-of-experience label since `start`, auto-derived so it never goes stale.
 * Career start = first full-time role (Triple Commas, Aug 2024).
 *
 * Months are 1-based/inclusive: Aug 2024 = month 1 (so month N = the Nth month of employment).
 * Steps every 3 months, alternating "~X" (approaching) and "X+" (just past),
 * incrementing X by 0.5 each half-year:
 *   9–12 → ~1 · 13–15 → 1+ · 16–18 → ~1.5 · 19–21 → 1.5+ · 22–24 → ~2 · 25–27 → 2+ · …
 * The "X+" bands begin exactly on each anniversary — 1+ at 12 mo (1.0 yr), 2+ at 25 mo = Aug 2026 (2.0 yr).
 * Under 9 months shows "<1".
 */
export function experienceLabel(start = '2024-08-01'): string {
  const s = new Date(start);
  const now = new Date();
  // Elapsed whole calendar months (start day is the 1st, so no day adjustment), + 1 for 1-based counting.
  const elapsed = (now.getFullYear() - s.getFullYear()) * 12 + (now.getMonth() - s.getMonth());
  const months = elapsed + 1;
  if (months < 9) return '<1';

  const p = Math.floor((months - 10) / 3); // 3-month band index (month 9 clamps to 0)
  const band = Math.max(0, p);
  const value = 1 + Math.floor(band / 2) * 0.5;
  const num = value % 1 === 0 ? value.toFixed(0) : value.toFixed(1);
  return band % 2 === 0 ? `~${num}` : `${num}+`;
}
