# Jaman Khan — Portfolio

World-class personal portfolio for **MD. Nuruzzaman (Jaman Khan)** — Software Engineer & Competitive Programmer.

> **Status:** Scaffold complete (P0). Development not yet started. See `docs/` for the full plan.

## Stack
Next.js 15 (App Router, TS) · Tailwind CSS · Framer Motion · Lenis · Vercel.
Design: dark premium + neon (cyan/violet), glassmorphism, gradient-mesh hero, glow/tilt/magnetic interactions.

## Docs (read in order)
| File | What |
|---|---|
| `docs/01_PROFILE_RESEARCH.md` | All researched facts (CV + LinkedIn + GitHub), source-of-truth content |
| `docs/02_DESIGN_SYSTEM.md` | Colors, type, tokens, components, a11y |
| `docs/03_PROJECT_PLAN.md` | Architecture, sections, build phases, directory map |
| `docs/04_ANIMATION_SPEC.md` | Exact motion/interaction catalogue ("premium" defined) |
| `docs/05_NEXT_STEPS.md` | What's pending from Jaman + build checklist |

## Getting started (when ready to build)
```bash
cd /home/jaman/Documents/jaman-portfolio
npm install          # installs deps (not run yet)
npm run dev          # localhost:3000
```

## Structure
```
src/
  app/          layout.tsx, page.tsx, globals (via styles/)
  components/   layout · sections · ui · animations  (to build P1–P3)
  data/         profile · experience · projects · competitive · skills  (real content, typed)
  hooks/ lib/   utils, metadata, custom hooks
  styles/       globals.css (tokens)
public/
  resume/       Md._Nuruzzaman_CV.pdf
  images/       project shots, og.png, headshot  (pending)
```

## Content data
All copy lives in `src/data/*` (typed). Edit there — sections render from it. No CMS for v1.

## Pending inputs
See `docs/05_NEXT_STEPS.md` — live project URLs, screenshots, headshot, final domain.
