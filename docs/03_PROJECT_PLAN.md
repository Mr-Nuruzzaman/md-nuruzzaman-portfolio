# Project Plan — Architecture, Sections, Build Phases

## 1. Stack (locked)
| Layer | Choice |
|---|---|
| Framework | **Next.js 15** (App Router, TypeScript, RSC where possible) |
| Styling | **Tailwind CSS** + CSS variables (design tokens) |
| Animation | **Framer Motion** (component reveals, layout, gestures) |
| Scroll FX | **GSAP + ScrollTrigger** (pinned/complex sequences), **Lenis** (smooth scroll) |
| Icons | **lucide-react** + custom platform SVGs (CF/CC/LeetCode) |
| Fonts | `next/font` — Space Grotesk, Inter, JetBrains Mono (+ optional Clash Display) |
| Deploy | **Vercel** |
| Analytics | Vercel Analytics (optional) |
| Content | Typed data files in `src/data/` (no CMS needed for v1) |

## 2. Directory structure
```
jaman-portfolio/
├── docs/                       # this documentation
├── public/
│   ├── images/                 # project shots, og image, headshot
│   └── resume/                 # Md._Nuruzzaman_CV.pdf
├── src/
│   ├── app/
│   │   ├── layout.tsx          # fonts, metadata, Lenis provider, theme
│   │   ├── page.tsx            # single-page composition of sections
│   │   ├── globals.css         # (in styles/) imported here
│   │   └── (routes)/           # future: /projects/[slug], /blog
│   ├── components/
│   │   ├── layout/             # Navbar, Footer, SmoothScroll, CursorGlow
│   │   ├── sections/           # Hero, About, Experience, Projects, CP, Skills, Contact
│   │   ├── ui/                 # Button, Card, Chip, GradientText, Magnetic, Marquee
│   │   └── animations/         # Reveal, TextReveal, CountUp, Parallax, TiltCard
│   ├── data/                   # profile, experience, projects, cp, skills (typed)
│   ├── hooks/                  # useMousePosition, useScrollProgress, useMediaQuery
│   ├── lib/                    # utils (cn), constants, metadata
│   └── styles/                 # globals.css, tokens
├── tailwind.config.ts
├── next.config.mjs
├── tsconfig.json
└── package.json
```

## 3. Page sections (single-page, anchored nav)
Order + intent:

1. **Hero** — gradient-mesh bg, animated name (gradient text reveal), role line, one-sentence positioning ("Full-stack engineer + competitive programmer building scalable systems"), dual CTA (View Work / Resume), live CP rating ticker, social row. Magnetic buttons, cursor glow.
2. **Trust band / marquee** — infinite marquee of tech + CP credentials (Codeforces Expert · FastAPI · AWS · Next.js · 3000+ solved …).
3. **About** — short bio (builder + CP narrative), the "tool is a tool / AI force-multiplier" ethos, headshot, quick facts (location, experience, open-to-remote). Reveal on scroll.
4. **Experience** — vertical timeline, glass cards per role (Hedaya → BRAC EPL → Triple Commas), expandable bullets, tech tags, dates. Scroll-linked line draw.
5. **Featured Projects** — big cards: Vehicle Marketplace, Brokerage Platform, RestoZen, Zentopos. Image/preview, hover tilt + spotlight, tech stack, live/repo links, "case study" badge where applicable.
6. **Competitive Programming** — signature section. Stat cards w/ count-up (CF 1633 Expert, CC 1939 4★, LC 1957 top 3.44%, 3000+ solved), contest-results grid, ICPC highlight. Terminal/mono aesthetic.
7. **Skills** — categorized chip cloud (Languages / Backend / Frontend / Cloud-DevOps / DB / Tools), hover glow, optional proficiency.
8. **Case study spotlight (optional)** — AWS 47% cost-cut story as a mini visual case study (problem → insight → result, with the $175.96→$92.65 metric). Strong signal for senior/remote roles.
9. **Contact** — gradient CTA panel, email, social links, "open to remote (US)" line, copy-email interaction. Footer.

## 4. Component inventory (build order)
**Foundation (Phase 1):** tokens, globals.css, `cn` util, fonts, Button, Card, Chip, GradientText, Container, Section, SmoothScroll (Lenis), Navbar, Footer.
**Animation primitives (Phase 2):** Reveal, TextReveal (word/char stagger), CountUp, Parallax, Magnetic, TiltCard (spotlight), Marquee, CursorGlow.
**Sections (Phase 3):** Hero → About → Experience → Projects → CP → Skills → CaseStudy → Contact.
**Polish (Phase 4):** SEO/OG image, loader/page-transition, 404, Lighthouse pass, reduced-motion audit, responsive sweep (4 breakpoints), deploy.

## 5. Data model (typed — see src/data)
- `profile.ts` — name, title, tagline, bio, contacts, socials, openTo.
- `experience.ts` — array of roles {company, title, type, start, end, location, mode, bullets[], tech[]}.
- `projects.ts` — array {slug, title, blurb, description, tech[], links{live,repo}, image, featured, badge}.
- `competitive.ts` — platforms[] {name, handle, rating, label, url, color}, stats {solved}, contests[].
- `skills.ts` — categories[] {label, items[]}.

## 6. Performance budget
- Lighthouse ≥ 95 all categories. LCP < 2.0s, CLS < 0.05.
- Lazy-load heavy animation libs (GSAP) per-section; defer offscreen.
- `next/image` for all images, AVIF/WebP. Self-hosted fonts, `display: swap`.
- Animations GPU-friendly (transform/opacity only).

## 7. SEO
- Per-page metadata, OpenGraph + Twitter card, custom OG image (name + role + neon).
- JSON-LD `Person` schema (name, jobTitle, sameAs socials) — boosts search presence (good for recruiters).
- Sitemap + robots.

## 8. Build phases / milestones
- [ ] **P0 Setup** — scaffold, configs, tokens, fonts, data files (THIS STEP, no dev run).
- [ ] **P1 Foundation** — layout, smooth scroll, navbar/footer, UI primitives.
- [ ] **P2 Animation kit** — reveal/text/count/magnetic/tilt/marquee/cursor.
- [ ] **P3 Sections** — all 9, wired to data.
- [ ] **P4 Polish + deploy** — SEO, OG, a11y, perf, responsive, Vercel.

## 9. Commands (after `npm install`)
```bash
npm run dev      # localhost:3000
npm run build
npm run start
npm run lint
```
> NOT run yet per request. Run `npm install` first when ready to start P1.
