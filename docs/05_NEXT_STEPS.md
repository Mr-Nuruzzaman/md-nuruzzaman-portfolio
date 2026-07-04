# Next Steps & Pending Inputs

## Inputs needed from Jaman (blockers for best result)
1. **Live URLs** for RestoZen, Zentopos, and (if shareable) the Vehicle Marketplace. CV says "Live Link" but URLs weren't captured.
2. **Screenshots / preview images** for the 4 featured projects → drop in `public/images/`.
3. **Professional headshot** (hero/about) → `public/images/headshot.jpg`.
4. **Final domain** — buy a domain (e.g. `jamankhan.dev`) or use Vercel subdomain? Update `src/lib/metadata.ts` + OG.
5. **Primary email to display** — default `nuruzzaman.prog@gmail.com` (recommended, professional).
6. **Blog/Notes section?** — pull your viral LinkedIn posts (AWS cost-cut, AI workflow). Yes/no.
7. **GitHub repos to feature?** (Weather-App-Flutter, etc.)

## Build checklist (resume here)
- [x] **P0** Scaffold: configs, tokens, fonts, typed data, docs.
- [ ] **P1 Foundation** — `npm install`; build `SmoothScroll` (Lenis), `CursorGlow`, `Navbar`, `Footer`, UI primitives (`Button`, `Card`, `Chip`, `GradientText`, `Container`, `Section`).
- [ ] **P2 Animation kit** — `Reveal`, `TextReveal`, `CountUp`, `Parallax`, `Magnetic`, `TiltCard`, `Marquee`.
- [ ] **P3 Sections** — Hero, TrustMarquee, About, Experience, Projects, CompetitiveProgramming, Skills, CaseStudy, Contact.
- [ ] **P4 Polish** — JSON-LD (next/script), OG image, 404, loader, a11y + reduced-motion audit, responsive sweep (mobile/tablet/laptop/desktop), Lighthouse ≥95, deploy to Vercel.

## Quick wins to prep now
- Copy resume: already placed at `public/resume/Md._Nuruzzaman_CV.pdf`.
- Update old portfolio link or 301 once new site is live.

## Separate track (requested) — LinkedIn revamp for remote US roles
After this scaffold, a dedicated effort: research senior/remote-US LinkedIn architecture, then rewrite headline, About, experience bullets, featured, skills, and keyword strategy for recruiter discoverability. Jaman to supply: current full LinkedIn export, target job titles, target companies/locations, and any salary/role preferences. Tracked separately from the portfolio build.
