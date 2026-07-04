# Build Contracts — FROZEN. Import exactly as written. Do not invent props.

You are writing ONE section component for a Next.js 15 + Tailwind + Framer Motion portfolio (dark neon theme). All shared primitives, animation components, hooks, and data already exist. Import them — never redefine.

## Import paths (alias `@/*` → `src/*`)

### UI primitives — `@/components/ui/*`
- `<Container wide?={boolean} className? />` — centered max-width (1200 / 1440 wide).
- `<Section id? wide? contained?={boolean} eyebrow?={string} heading?={ReactNode} className? >` — vertical-rhythm wrapper. `id` is the nav anchor. Renders eyebrow (mono accent) + `<h2>` heading automatically; put body as children. Use `contained={false}` for full-bleed.
- `<Button href?={string} variant?='primary'|'ghost'|'icon' size?='sm'|'md' >` — renders `<Link>` if `href` given (external auto opens new tab), else `<button>`. Gradient primary, ghost outline.
- `<Card interactive?={boolean} className? />` — glass surface, hover lift + glow. Default interactive.
- `<Chip glow?={boolean} className? />` — pill tag, mono. `glow` = accent border on hover.
- `<GradientText as?={ElementType} className? />` — gradient-clipped text.

### Animations — `@/components/animations/*`
- `<Reveal delay?={number} y?={number} as?='div'|'li'|'span' >` — fade+rise on scroll-in (once).
- `<RevealGroup stagger?={number} className? >` + `<RevealItem y? className? >` — staggered list/grid entrance. Use RevealItem for each grid child.
- `<TextReveal text={string} by?='char'|'word' onMount?={boolean} delay?={number} as?={ElementType} className? />` — mask-up split reveal. `by='char' onMount` = hero name. `by='word'` = headings/sublines.
- `<CountUp to={number} suffix?={string} prefix?={string} duration?={number} className? />` — 0→to on scroll-in.
- `<Parallax offset?={number} className? />` — subtle scroll translate.
- `<Magnetic strength?={number} className? />` — cursor pull (wrap buttons).
- `<TiltCard max?={number} className? />` — 3D tilt + cursor spotlight (wrap project/stat cards). Adds `.spotlight group` internally.
- `<Marquee items={ReactNode[]} speed?={number} reverse?={boolean} pauseOnHover?={boolean} className? />` — infinite scroll.

### Data — `@/data/*` (import the named exports, read the file for exact fields)
- `@/data/profile` → `profile` (name, brandName, title, tagline, positioning, location, openTo[], remoteFocus, email, phone, resume, socials{github,linkedin,codeforces,codechef,leetcode,atcoder,portfolioOld}, bio[3]).
- `@/data/experience` → `experience: IExperience[]` (company,title,type,start,end,location,mode,bullets[],tech[]).
- `@/data/projects` → `projects: IProject[]` (slug,title,blurb,description,tech[],links{live?,repo?},image?,featured,badge?).
- `@/data/skills` → `skills: ISkillCategory[]` (label, items[]).
- `@/data/competitive` → `platforms: IPlatform[]` (name,handle,rating,label,url,color), `cpStats` {problemsSolved,icpcRegionalist,ncpcFinalist}, `contests: IContest[]` (result,name,year,highlight?).

### Utils / hooks
- `import { cn } from '@/lib/utils'` — class merge.
- `@/hooks/useMediaQuery` → `usePrefersReducedMotion()`, `useIsDesktop()`.

## Design tokens (Tailwind classes — NEVER hardcode hex)
- Bg: `bg-bg`, `bg-bg-elev`, `bg-surface`, `bg-surface-2`. Borders: `border-border`, `border-border-glow`.
- Text: `text-content`, `text-content-muted`, `text-content-dim`.
- Accents: `text-accent`(cyan) `text-accent-2`(violet) `text-accent-3`(blue) `text-accent-pink`, `text-success`, `text-warning`.
- Type: `text-display`/`text-h1`/`text-h2` + `text-h3`(1.5rem via text-2xl-ish), `text-eyebrow`. Fonts: `font-display`, `font-heading`, `font-sans`, `font-mono`.
- Gradient: `bg-grad-primary`, or `.text-gradient` / `<GradientText>`. Glow: `shadow-glow-cyan`, `shadow-glow-violet`. Glass: `.glass` class. Ease: `ease-expo`, `ease-smooth`.

## Rules
1. `'use client'` at top ONLY if the file uses hooks/state/framer motion directly. Pure-markup sections wrapped in `<Reveal>` still need it because Reveal is a client comp imported — but importing a client comp into a server comp is fine; add `'use client'` only if the section itself calls hooks. Prefer server component when possible; add `'use client'` if unsure (safe).
2. Export a NAMED function matching the file, e.g. `export function Hero() {}`.
3. Section root: use `<Section id="..." eyebrow="..." heading={...}>` with the anchor id from the nav (about, experience, projects, cp, skills, contact). Hero/TrustMarquee/CaseStudy have no nav id (hero uses `id="top"` wrapper handled in page; you set id per spec below).
4. Responsive: mobile-first. Grids collapse to 1 col on mobile.
5. Missing assets: several `projects[].links` are empty and `image` is undefined — render a gradient poster fallback (bg-grad-primary at low opacity + title) and only render live/repo buttons when the link exists (`{p.links.live && ...}`).
6. Accessibility: real semantic tags, `aria-label` on icon-only links, keyboard reachable.
7. Only animate transform/opacity. Everything already respects reduced-motion via the shared components — just use them.

## Return
Write the single file to its given path. Keep it self-contained. Do not create extra files, do not edit page.tsx/layout.tsx (the orchestrator wires them).
