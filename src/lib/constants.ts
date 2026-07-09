/** Production site URL — single source for metadata, sitemap, robots, JSON-LD. Set NEXT_PUBLIC_SITE_URL in prod. */
export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://md-nuruzzaman-portfolio.vercel.app';

/** Anchored nav sections — id must match the <Section id> rendered on the page. */
export const NAV_LINKS = [
  { id: 'about', label: 'About' },
  { id: 'experience', label: 'Experience' },
  { id: 'projects', label: 'Projects' },
  { id: 'cp', label: 'Competitive' },
  { id: 'skills', label: 'Skills' },
  { id: 'contact', label: 'Contact' },
] as const;

/** Framer easing tokens mirroring docs/04_ANIMATION_SPEC. */
export const EASE_EXPO = [0.16, 1, 0.3, 1] as const;
export const EASE_SMOOTH = [0.4, 0, 0.2, 1] as const;
export const SPRING = { stiffness: 150, damping: 18, mass: 0.6 } as const;
