# Md Nuruzzaman — Portfolio

Personal portfolio for **Md Nuruzzaman** — Software Engineer & Competitive Programmer. Single-page site: Hero, TrustMarquee, About, Experience, Projects (with detail modal), Competitive Programming, Skills, Contact.

> **Status:** Built. Pending final inputs (some live project URLs, final domain) — see `docs/05_NEXT_STEPS.md`.

## Stack
Next.js 15 (App Router, TS) · React 19 · Tailwind CSS · Framer Motion · Lenis · Vercel.
Design: dark premium + neon (cyan/violet), glassmorphism, gradient-mesh hero, glow/tilt/magnetic interactions.

## Getting started
```bash
npm install
npm run dev          # localhost:3000
```

Other scripts: `npm run build` · `npm run start` · `npm run lint` · `npm run format`.

Set `NEXT_PUBLIC_SITE_URL` in production — it drives metadata, sitemap, robots, and JSON-LD (fallback: `https://md-nuruzzaman-portfolio.vercel.app`).

## Structure
```
src/
  app/          layout.tsx, page.tsx, opengraph-image, sitemap, robots, 404, loading
  components/   layout · sections · ui · animations
  data/         profile · experience · projects · competitive · skills  (real content, typed)
  hooks/ lib/   utils, metadata, constants, media-query hooks
  styles/       globals.css (tokens, .text-gradient, .glass)
public/
  resume/       Md._Nuruzzaman_CV.pdf
  images/       project screenshots, headshot
```

## Content data
All copy lives in `src/data/*` (typed). Edit there — sections render from it. No CMS.

## Docs
| File | What |
|---|---|
| `docs/CONTRACTS.md` | Component & data API reference — exact props for ui/animation primitives |
| `docs/01_PROFILE_RESEARCH.md` | All researched facts (CV + LinkedIn + GitHub), source-of-truth content |
| `docs/02_DESIGN_SYSTEM.md` | Colors, type, tokens, components, a11y |
| `docs/03_PROJECT_PLAN.md` | Architecture, sections, build phases, directory map |
| `docs/04_ANIMATION_SPEC.md` | Exact motion/interaction catalogue |
| `docs/05_NEXT_STEPS.md` | Pending inputs + checklist |

Docs predate the finished build — where a doc contradicts the code, the code wins.
