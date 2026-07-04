# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Personal portfolio for **MD. Nuruzzaman (Jaman Khan)** — single-page marketing site. Next.js 15 (App Router) + React 19 + TypeScript, Tailwind, Framer Motion, Lenis (smooth scroll). Deploys to Vercel. (GSAP/ScrollTrigger was planned in `docs/` but is not currently used — re-add if you wire pinned sequences.)

**Status: scaffold (P0) only.** `src/app/page.tsx` is a placeholder shell; components in `src/components/{layout,sections,ui,animations}` are empty (`.gitkeep`). Deps are declared in `package.json` but not yet installed. Run `npm install` before the first `npm run dev`.

## Commands

```bash
npm run dev      # next dev — localhost:3000
npm run build    # next build (production)
npm run start    # serve production build
npm run lint     # next lint (eslint-config-next + typescript rules)
npm run format   # prettier --write src/**/*.{ts,tsx,css}
```

No test framework is configured.

## Architecture

**Content is data, not markup.** All real copy lives in typed modules under `src/data/*` (`profile`, `experience`, `projects`, `skills`, `competitive`). Sections render *from* these — to change site content, edit the data file, not a component. No CMS. Each data file exports a typed const/array (e.g. `IProject`, `IExperience`, `IPlatform`); `profile.ts` is `as const`.

**Page composition.** Single page, anchored nav. `src/app/page.tsx` composes sections in order: Hero → TrustMarquee → About → Experience → Projects → CompetitiveProgramming → Skills → CaseStudy → Contact. Build these in `src/components/sections/`.

**Component layers** (build order per `docs/03_PROJECT_PLAN.md §4`):
- `components/ui/` — primitives: Button, Card, Chip, GradientText, Container, Section.
- `components/layout/` — Navbar, Footer, SmoothScroll (Lenis wrapper).
- `components/animations/` — Reveal, TextReveal, CountUp, Parallax, Magnetic, TiltCard, Marquee, CursorGlow.
- `components/sections/` — the 9 page sections, wired to `src/data`.

**Metadata / SEO.** `src/lib/metadata.ts` builds `siteMetadata` (Metadata) and `personJsonLd` (schema.org Person) from `profile`. `layout.tsx` has TODOs to inject the JSON-LD via `next/script` and wrap children in `<SmoothScroll>` + `<CursorGlow />`. Update the `url` const in `metadata.ts` when the final domain is set.

**Utils.** `src/lib/utils.ts` exports `cn()` (clsx + tailwind-merge) — use for conditional class composition everywhere.

## Design system

Dark premium + neon (cyan/violet), glassmorphism, gradient-mesh hero. Tokens are the source of truth — do not hardcode hex; use Tailwind theme tokens from `tailwind.config.ts`:
- Colors: `bg`, `surface`, `border`, `content` (+ `.muted`/`.dim`), `accent` (cyan `.DEFAULT`, violet `.2`, blue `.3`, `.pink`).
- Fonts (via CSS vars set in `layout.tsx`): `font-display`/`font-heading` (Space Grotesk), `font-sans` (Inter), `font-mono` (JetBrains Mono).
- Type scale: `text-display`, `text-h1`, `text-h2` (clamp-based fluid).
- Layout: `max-w-container` (1200px), `max-w-wide` (1440px).
- Effects: `bg-grad-primary`, `shadow-glow-cyan`, `shadow-glow-violet`, `ease-expo`/`ease-smooth`, `animate-marquee`, `animate-drift`.
- `.text-gradient` helper class lives in `src/styles/globals.css`.

Full spec: `docs/02_DESIGN_SYSTEM.md` (colors/type/a11y), `docs/04_ANIMATION_SPEC.md` (exact motion catalogue). Honor `prefers-reduced-motion`.

## Conventions

- Import alias `@/*` → `src/*` (tsconfig). Use it, not relative `../../`.
- Prettier: single quotes, semicolons, `printWidth: 120`, trailing commas `all`, `prettier-plugin-tailwindcss` (auto-sorts classes — run `npm run format`).
- TS `strict` on.
- Pending inputs (live project URLs, screenshots, headshot, OG image, final domain) are tracked in `docs/05_NEXT_STEPS.md`; several `projects[].links` are intentionally empty until provided.

## Docs (read in order)

`docs/01_PROFILE_RESEARCH.md` (content source-of-truth) · `02_DESIGN_SYSTEM.md` · `03_PROJECT_PLAN.md` (architecture + build phases P0–P4) · `04_ANIMATION_SPEC.md` · `05_NEXT_STEPS.md`.
