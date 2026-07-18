# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Personal portfolio for **Md Nuruzzaman** (display name everywhere is "Md Nuruzzaman", not "Jaman Khan") — Next.js 15 (App Router) + React 19 + TypeScript, Tailwind, Framer Motion, Lenis (smooth scroll), Velite (MDX case studies). Deploys to Vercel. One marketing page plus `/projects/[slug]` case-study pages.

## Commands

```bash
npm run dev      # next dev — localhost:3000
npm run build    # next build (runs Velite first via webpack plugin)
npm run start    # serve production build
npm run lint     # next lint (eslint-config-next + typescript rules)
npm run format   # prettier --write src/**/*.{ts,tsx,css}
```

No test framework is configured (`@playwright/test` is in devDependencies but there is no config or test suite — it was used ad hoc for QA).

## Architecture

**Content is data, not markup — two layers.**
1. Section copy lives in typed modules under `src/data/*` (`profile`, `experience`, `projects`, `skills`, `competitive`). Sections render *from* these — to change site content, edit the data file, not a component. Each data file exports a typed const/array (`IProject`, `IExperience`, `IPlatform`, `ISkillCategory`); `profile.ts` is `as const`.
2. Case studies live in `content/projects/*.mdx`. Velite (`velite.config.ts`) compiles them to `.velite/` — frontmatter is the schema (title, summary, role, period, stack, live/repo URLs), the body is plain markdown rendered to an HTML string (no MDX runtime; injected via `dangerouslySetInnerHTML` into a hand-styled article with `prose.module.css`). Import with the `#content` alias (`import { caseStudies } from '#content'`, tsconfig path → `.velite`). Velite runs automatically before webpack compiles (`VeliteWebpackPlugin` in `next.config.mjs`, watch mode in dev) — no separate build step. `IProject.slug` must match an MDX filename; `ProjectModal` links to `/projects/[slug]`.

**Routes.** `src/app/page.tsx` composes 8 anchored sections in order: Hero → TrustMarquee → About → Experience → Projects → CompetitiveProgramming → Skills → Contact. Nav anchor ids come from `NAV_LINKS` in `src/lib/constants.ts` (`about`, `experience`, `projects`, `cp`, `skills`, `contact`) and must match each `<Section id>`. `src/app/projects/[slug]/page.tsx` prerenders every case study (`generateStaticParams`) with `dynamicParams = false` so unknown slugs hard-404 instead of soft-404ing with HTTP 200.

**Contact form is a server action.** `src/app/actions/contact.ts` (`'use server'`) — honeypot field (`company`), server-side validation, sends via Resend REST API using `RESEND_API_KEY`. Never throws to the client; returns `ContactState` (`src/app/actions/contact-state.ts`, kept separate because a `'use server'` module may only export async functions). When the key is absent it returns `reason: 'unconfigured'` and the client falls back to a plain mailto link — local dev without the key is expected to work.

**Layout shell** (`src/app/layout.tsx`): fonts (Instrument Serif for display/heading — single 400 weight, normal + italic, the serif has **no bold**; Inter; JetBrains Mono via `next/font` CSS vars) → two inline JSON-LD `<script>`s (`personJsonLd`, `projectsJsonLd`) → skip-to-content link → `<MotionProvider>` wrapping `<ScrollProgress>`, `<CursorGlow>`, `<SideRails>`, `<Navbar>`, and `<SmoothScroll>{children}<Footer></SmoothScroll>` → Vercel `<Analytics>` + `<SpeedInsights>`.

**Framer Motion is lazy + strict.** `MotionProvider` uses `LazyMotion` with `domMax` and `strict` — always import `m` from framer-motion (`<m.div>`), never `motion.*`; `motion.*` throws in dev. `src/lib/constants.ts` exports the easing tokens (`EASE_EXPO`, `EASE_SMOOTH`, `SPRING`).

**Smooth scroll.** `SmoothScroll` (Lenis wrapper) intercepts in-page `a[href^="#"]` clicks and scrolls with `-80px` offset for the fixed navbar. It disables itself entirely under `prefers-reduced-motion` (native scroll). All animation components respect reduced motion via `usePrefersReducedMotion()` from `src/hooks/useMediaQuery`.

**Hero animates from first paint.** The signature/hero entrance is pure CSS from first paint — no hydration gating, no runtime measurement (`SignatureName` word widths are hardcoded). Don't reintroduce mount-state gating or layout measurement there; it causes a pre-hydration freeze or line-wrap snap.

**Component layers:**
- `components/ui/` — primitives: `Button`, `Card`, `Chip`, `GradientText`, `Container`, `Section`, `ExperienceStat`, `BrandIcons`, `LogoMark`, `ResumeSeal`.
- `components/layout/` — `Navbar`, `Footer`, `MotionProvider`, `SmoothScroll`, `ScrollProgress`, `CursorGlow`, `SideRails`.
- `components/animations/` — `Reveal`/`RevealGroup`/`RevealItem`, `TextReveal`, `CountUp`, `Magnetic`, `TiltCard`, `Marquee`, `RuleReveal`, `SignatureName`.
- `components/sections/` — the page sections. `Projects` holds `useState<IProject|null>` and opens `ProjectModal` (a `createPortal` dialog with focus trap, gallery, AT-hiding of the background page, and a "case study" link to `/projects/[slug]`).

**Brand icons** (`BrandIcons.tsx`) must be exact originals from official sources — never hand-drawn approximations. Rendered grayscale at rest, brand color on hover. SVG gradient ids must go through `useId()` (duplicate static ids across instances break fills).

**`docs/CONTRACTS.md` is the component API reference** — exact props for every ui/animation primitive and the shape of every data export. Read it before writing or modifying a section; import primitives exactly as specified, don't invent props.

**SEO / meta.** `src/lib/metadata.ts` builds `siteMetadata`, `personJsonLd`, and `projectsJsonLd` from `profile` + `SITE_URL`. `SITE_URL` comes from `NEXT_PUBLIC_SITE_URL` env (fallback `https://md-nuruzzaman-portfolio.vercel.app`) and feeds metadata, `sitemap.ts`, `robots.ts`, and JSON-LD. OG image is generated by `src/app/opengraph-image.tsx` (next/og); `apple-icon.tsx`, `manifest.ts`, `not-found.tsx`, `error.tsx`, `global-error.tsx`, and `loading.tsx` also exist. Case-study pages build their own per-slug metadata.

**Missing assets are expected.** Some `projects[].links` entries are intentionally empty — cards render a gradient poster fallback and only show live/repo buttons when the link exists. Pending inputs tracked in `docs/05_NEXT_STEPS.md`.

**Utils.** `src/lib/utils.ts` exports `cn()` (clsx + tailwind-merge) — use for conditional class composition everywhere.

## Design system

**Warm-ink editorial monochrome with a single ember accent.** Depth comes from lightness shifts, not hue or glow; the accent family is tints/shades of one ember hue — never introduce a second hue. Serif display type (Instrument Serif, one weight — no bold), quiet elevation shadows, no glassmorphism (`.glass` is a retired legacy helper, now a solid surface with no backdrop blur).

Tokens are the source of truth — do not hardcode hex; use Tailwind theme tokens from `tailwind.config.ts`:
- Colors: `bg` (+ `.elev`), `surface` (+ `.2`), `border` (+ `.glow`), `content` (+ `.muted`/`.dim` — `dim` is the darkest AA-passing text tone), `accent` (ember `.DEFAULT`, clay tint `.2`, deep ember `.3`, muted clay `.pink`), `success`, `warning`.
- **Legacy key names survive from the old neon theme** (`border-glow`, `shadow-glow-cyan`, `shadow-glow-violet`, `accent-pink`) but their *values* are warm-ink now — keep using the keys, don't rename them, and don't infer colors from the names.
- Fonts: `font-display`/`font-heading` (Instrument Serif), `font-sans` (Inter), `font-mono` (JetBrains Mono).
- Type scale: `text-display`, `text-h1`, `text-h2` (clamp-based fluid), `text-eyebrow`.
- Layout: `max-w-container` (1200px), `max-w-wide` (1440px).
- Effects: `bg-grad-primary`, `ease-expo`/`ease-smooth`, `animate-marquee`, `animate-drift`; `.text-gradient` helper in `src/styles/globals.css`.

Only animate `transform`/`opacity`. Honor `prefers-reduced-motion` (the shared animation components already do — use them rather than raw `m.*` where possible).

## Conventions

- Import alias `@/*` → `src/*`; `#content` → `.velite` (tsconfig). Use them, not relative `../../`.
- Prettier: single quotes, semicolons, `printWidth: 120`, trailing commas `all`, `prettier-plugin-tailwindcss` (auto-sorts classes — run `npm run format`).
- TS `strict` on.
- Prefer server components; add `'use client'` only when the file itself uses hooks/state/framer-motion (importing a client component from a server component is fine).
- Sections export a named function matching the file (`export function Hero() {}`).

## Docs

`docs/CONTRACTS.md` (component/data API — read first when touching sections) · `01_PROFILE_RESEARCH.md` (content source-of-truth) · `02_DESIGN_SYSTEM.md` · `03_PROJECT_PLAN.md` · `04_ANIMATION_SPEC.md` · `05_NEXT_STEPS.md` (pending inputs). Parts of the docs and README predate the warm-ink redesign — where they contradict the code (neon/glassmorphism styling, Space Grotesk, GSAP, a CaseStudy *section* on the home page, "scaffold" status), the code wins.
