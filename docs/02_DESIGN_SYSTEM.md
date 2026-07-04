# Design System — Dark Premium + Neon

World-class, Awwwards-tier. Dark base, glassmorphism, neon cyan/violet accents, gradient-mesh hero, glow hovers. Everything below is implemented as tokens in `tailwind.config.ts` + CSS vars in `src/styles/globals.css`.

---

## 1. Color tokens

### Base (dark)
| Token | Hex | Use |
|---|---|---|
| `bg` / `--bg` | `#0A0A0F` | page background (near-black, slight blue) |
| `bg-elev` | `#111119` | elevated surfaces |
| `surface` | `#16161F` | cards |
| `surface-2` | `#1D1D2A` | nested / hovered cards |
| `border` | `#262633` | hairline borders |
| `border-glow` | `#3A3A55` | hovered borders |

### Text
| Token | Hex | Use |
|---|---|---|
| `text` | `#ECECF1` | primary |
| `text-muted` | `#A0A0B2` | secondary |
| `text-dim` | `#6B6B80` | tertiary / captions |

### Accents (neon)
| Token | Hex | Use |
|---|---|---|
| `accent` / cyan | `#22D3EE` | primary accent, links, focus |
| `accent-2` / violet | `#A855F7` | secondary accent, gradients |
| `accent-3` / blue | `#3B82F6` | tertiary, gradient mid-stop |
| `accent-pink` | `#EC4899` | sparingly, gradient warm stop |
| `success` | `#34D399` | CP "solved", positive metrics |
| `warning` | `#FBBF24` | ratings / stars |

### Signature gradients
- **`--grad-primary`**: `linear-gradient(135deg, #22D3EE 0%, #3B82F6 45%, #A855F7 100%)` — headings, buttons, accent lines.
- **`--grad-mesh`** (hero): radial blobs of cyan/violet/blue at low opacity over `#0A0A0F`, blurred, animated drift.
- **`--grad-text`**: clip gradient text for hero name + section eyebrows.

### Glow shadows
- `--glow-cyan`: `0 0 0 1px rgba(34,211,238,.3), 0 8px 32px -8px rgba(34,211,238,.35)`
- `--glow-violet`: `0 0 40px -10px rgba(168,85,247,.45)`
- Card hover lifts use both + translateY(-4px).

---

## 2. Typography

| Role | Font | Notes |
|---|---|---|
| Display / hero | **Clash Display** or **Satoshi** (Fontshare) | bold, modern grotesk; fallback `Space Grotesk` (Google) |
| Headings | **Space Grotesk** | geometric, techy |
| Body / UI | **Inter** | workhorse |
| Mono / code / CP stats | **JetBrains Mono** | numbers, ratings, code snippets, terminal motifs |

Free + self-hostable: Space Grotesk, Inter, JetBrains Mono via `next/font/google`. Clash Display/Satoshi via Fontshare (download to `public/`), optional upgrade.

### Scale (fluid, clamp-based)
- `display`: clamp(3rem, 8vw, 7rem) / 0.95 line-height / -0.03em tracking
- `h1`: clamp(2.25rem, 5vw, 3.75rem)
- `h2`: clamp(1.75rem, 3.5vw, 2.75rem)
- `h3`: 1.5rem
- `body-lg`: 1.125rem
- `body`: 1rem
- `small`: 0.875rem
- `eyebrow`: 0.8125rem / uppercase / 0.2em tracking / mono / accent color

---

## 3. Spacing / layout
- Max content width: `1200px` (`--container`); wide sections `1440px`.
- Section vertical rhythm: `py-24 md:py-32` (128px desktop).
- Grid gutter: 24px.
- Radius: cards `--r-lg: 20px`; buttons/pills `--r-md: 12px`; tags `--r-sm: 8px`; full `9999px` for chips.
- Generous negative space — editorial breathing room even in dark theme.

---

## 4. Component primitives (visual spec)

### Buttons
- **Primary:** gradient fill (`--grad-primary`), dark text, glow shadow on hover, slight scale 1.02, animated gradient shift on hover.
- **Ghost:** transparent, `border-glow`, text→accent on hover, border glows.
- **Icon button:** 40px square, glass bg, accent on hover.

### Cards (glassmorphism)
- `bg: rgba(22,22,31,.6)` + `backdrop-blur-xl` + `border` hairline.
- Hover: border→`border-glow`, lift `-4px`, glow shadow, inner radial spotlight following cursor (see animation spec).
- Project cards: large image/preview, gradient overlay, tech-tag row, hover reveals "View →".

### Chips / tags
- Pill, `surface-2` bg, `text-muted`, mono, small. Skill chips glow accent border on hover.

### CP stat cards
- Mono numbers BIG, platform logo, rating with gradient/colored star, animated count-up on scroll into view.

---

## 5. Motion language (overview — full spec in 05)
- **Premium = restrained + precise.** Easing `cubic-bezier(0.16, 1, 0.3, 1)` (expo-out) for entrances; `0.4,0,0.2,1` for hovers.
- Durations: micro 150–250ms, reveals 600–800ms, hero 1000ms+.
- Everything respects `prefers-reduced-motion`.
- Smooth scroll via **Lenis**. Scroll-tied parallax + reveals via **Framer Motion** `useScroll`/`whileInView` + **GSAP ScrollTrigger** for complex pinned sequences.

---

## 6. Dark-only? 
Ship **dark-only** for v1 (the premium look IS the brand). Optionally add a light theme later — tokens are CSS-var based so it's a swap, not a rewrite.

---

## 7. Accessibility
- Contrast: body text ≥ 7:1 on bg, accents ≥ 4.5:1 for text usage.
- Focus-visible: 2px accent ring + offset, never removed.
- Reduced-motion: disable parallax/auto-drift, keep instant opacity.
- All interactive elements keyboard reachable; skip-to-content link.
