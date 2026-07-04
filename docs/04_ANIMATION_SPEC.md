# Animation & Interaction Spec — "Premium" defined

Premium ≠ more motion. Premium = **precise, restrained, physically-plausible** motion with great easing and zero jank. Below is the exact catalogue to implement.

## Global rules
- Easing entrances: `expoOut = cubic-bezier(0.16, 1, 0.3, 1)`.
- Easing hovers/micro: `cubic-bezier(0.4, 0, 0.2, 1)`.
- Spring (Framer) for magnetic/tilt: `{ stiffness: 150, damping: 18, mass: 0.6 }`.
- Stagger children: 0.06–0.09s.
- **Respect `prefers-reduced-motion`** — gate all transforms/auto-motion; keep instant fades.
- Only animate `transform` + `opacity` (+ `filter` sparingly). Never animate layout-triggering props.

## Smooth scroll
- **Lenis** wraps the app (`SmoothScroll` provider). `lerp: 0.1`, `duration: 1.2`. Sync GSAP ScrollTrigger to Lenis' scroll event. Disable on reduced-motion / touch if janky.

## Hero
- **Name reveal:** split into chars, mask-up reveal (translateY 100%→0 + opacity) staggered 0.04s, expoOut, 0.9s. Gradient-text clip.
- **Sub-line:** word stagger fade-up after name.
- **Gradient mesh bg:** 3 radial blobs (cyan/violet/blue), `filter: blur(80px)`, slow infinite drift via GSAP (`yoyo`, 12–18s) — paused on reduced-motion.
- **CP rating ticker:** mono numbers, subtle count-up on mount.
- **Scroll cue:** bouncing chevron, fades out on first scroll.

## Cursor glow (desktop only)
- Fixed radial-gradient blob (cyan, ~400px, low opacity) following cursor with spring lag. `mix-blend-mode: screen`. Hidden on touch + reduced-motion.

## Magnetic buttons / links
- On hover within radius, element translates toward cursor (max ~12px) via spring; returns on leave. Icon inside lags slightly for depth.

## Tilt + spotlight cards (projects, CP stats)
- 3D tilt: `rotateX/rotateY` from cursor offset (max ±8°), `perspective: 1000px`, spring.
- Spotlight: radial highlight at cursor position inside card (`--mx/--my` CSS vars → `radial-gradient`), accent glow.
- Border glow intensifies on hover.

## Scroll reveals
- **Reveal:** `whileInView` opacity 0→1 + y 24→0, expoOut 0.7s, `viewport={{ once: true, margin: "-10% 0px" }}`.
- **TextReveal:** per-word/char mask reveal for section headings.
- **Stagger groups:** lists/grids stagger children.

## Parallax
- Background layers + large images move at 0.85–1.15× scroll speed via Framer `useScroll` + `useTransform`. Subtle (±40px), never dizzying.

## Experience timeline
- Vertical gradient line **draws** as you scroll (GSAP ScrollTrigger `scaleY` or SVG stroke-dashoffset). Each role card reveals + line dot pulses when in view.

## CP section
- **CountUp:** ratings/solved animate from 0→value on scroll-in (easeOut, 1.2s, mono). Star ratings fill sequentially.
- Optional: faux terminal type-in of a one-line `solved: 3000+`.

## Marquee / trust band
- Infinite horizontal scroll (CSS/GSAP), pauses on hover, 2 rows opposite directions optional. Tech + CP credentials.

## Page / route transitions
- Subtle fade + slight scale on mount (Framer `AnimatePresence` if routes added). Single-page v1: just a one-time loader (logo/name draw) ≤ 1.2s, skip on repeat visits.

## Micro-interactions
- Buttons: gradient shift + glow + scale 1.02 on hover, 0.98 on press.
- Links: animated underline (gradient, left→right wipe).
- Chips: border glow + slight lift on hover.
- Copy-email: click → checkmark morph + "Copied!" toast.
- Nav: active-section indicator slides (layoutId), blur-backdrop on scroll, hide-on-scroll-down/show-on-up.

## Performance guardrails
- `will-change` only during active animation, removed after.
- Throttle mouse-move handlers (rAF).
- Lazy-init GSAP/ScrollTrigger per section via dynamic import + IntersectionObserver.
- Test: no long tasks > 50ms on scroll; 60fps on mid hardware.
