'use client';

import { useEffect, useRef } from 'react';
import { cn, initials } from '@/lib/utils';
import { usePrefersReducedMotion } from '@/hooks/useMediaQuery';

/** FNV-1a hash → uint32. Deterministic (SSR/client identical) — never Math.random. */
/** #rrggbb → rgba() string (canvas fillStyle can't consume CSS var() references). */
function hexToRgba(hex: string, alpha: number): string {
  const m = /^#?([0-9a-f]{6})$/i.exec(hex.trim());
  if (!m) return `rgba(230,238,251,${alpha})`;
  const v = parseInt(m[1], 16);
  return `rgba(${(v >> 16) & 255},${(v >> 8) & 255},${v & 255},${alpha})`;
}

function hashStr(s: string): number {
  let h = 2166136261;
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

/** mulberry32 PRNG seeded from a uint32 — deterministic point placement. */
function mulberry32(seed: number): () => number {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const STEP = 4; // coarse pixel-assignment resolution (px)
const DURATION = 800; // one-shot germination (ms)
const FRAME_MS = 33; // ~30fps gate

/**
 * Poster fallback that computes a REAL Voronoi partition on a canvas: seeds are placed
 * deterministically from the project slug, then each coarse grid cell is assigned to its
 * nearest seed (a genuine nearest-site partition). Cells germinate once over ~0.8s, then
 * freeze. Static single frame under reduced motion. Decorative — aria-hidden.
 */
export function VoronoiPoster({ slug, title, className }: { slug: string; title: string; className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const root = getComputedStyle(document.documentElement);
    const accentRgb = (root.getPropertyValue('--accent-rgb').trim() || '94 234 212').replace(/\s+/g, ',');
    const monoFam = root.getPropertyValue('--font-mono').trim() || 'ui-monospace, monospace';
    const borderColor = `rgba(${accentRgb},0.25)`;
    const fillColor = `rgba(${accentRgb},0.08)`;
    // Ink = the theme's content color read from the cascade (canvas can't use CSS vars directly).
    const contentHex = root.getPropertyValue('--content').trim() || '#e6eefb';
    const inkColor = hexToRgba(contentHex, 0.42);

    const label = initials(title);
    const seed = hashStr(slug);
    const nSeeds = 14 + (seed % 7); // 14–20 sites
    const accentCell = seed % nSeeds; // the one low-alpha filled cell

    // Reusable buffers — no per-frame allocation.
    const px = new Float32Array(nSeeds);
    const py = new Float32Array(nSeeds);
    let owner = new Int16Array(0);
    let w = 0;
    let h = 0;
    let gw = 0;
    let gh = 0;
    let settled = false;

    const place = () => {
      const rect = canvas.getBoundingClientRect();
      w = Math.max(1, Math.round(rect.width));
      h = Math.max(1, Math.round(rect.height));
      const dpr = Math.min(2, window.devicePixelRatio || 1);
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      gw = Math.ceil(w / STEP);
      gh = Math.ceil(h / STEP);
      if (owner.length !== gw * gh) owner = new Int16Array(gw * gh);
      // Points as stable fractions of the box, so resizing keeps the same diagram.
      const rand = mulberry32(seed);
      for (let i = 0; i < nSeeds; i++) {
        px[i] = rand() * w;
        py[i] = rand() * h;
      }
    };

    const draw = (nActive: number) => {
      ctx.clearRect(0, 0, w, h);
      // Nearest-active-seed assignment per coarse cell — the actual Voronoi partition.
      for (let gy = 0; gy < gh; gy++) {
        const cy = gy * STEP + STEP / 2;
        for (let gx = 0; gx < gw; gx++) {
          const cx = gx * STEP + STEP / 2;
          let best = 0;
          let bestD = Infinity;
          for (let i = 0; i < nActive; i++) {
            const dx = cx - px[i];
            const dy = cy - py[i];
            const d = dx * dx + dy * dy;
            if (d < bestD) {
              bestD = d;
              best = i;
            }
          }
          owner[gy * gw + gx] = best;
        }
      }
      // One accent-filled cell at low alpha, once its site has germinated.
      if (accentCell < nActive) {
        ctx.fillStyle = fillColor;
        for (let gy = 0; gy < gh; gy++) {
          for (let gx = 0; gx < gw; gx++) {
            if (owner[gy * gw + gx] === accentCell) ctx.fillRect(gx * STEP, gy * STEP, STEP, STEP);
          }
        }
      }
      // 1px cell edges wherever the nearest site changes.
      ctx.fillStyle = borderColor;
      for (let gy = 0; gy < gh; gy++) {
        for (let gx = 0; gx < gw; gx++) {
          const o = owner[gy * gw + gx];
          if (gx + 1 < gw && owner[gy * gw + gx + 1] !== o) ctx.fillRect((gx + 1) * STEP - 0.5, gy * STEP, 1, STEP);
          if (gy + 1 < gh && owner[(gy + 1) * gw + gx] !== o) ctx.fillRect(gx * STEP, (gy + 1) * STEP - 0.5, STEP, 1);
        }
      }
      // Project initials, centered.
      const fs = Math.round(Math.min(w, h) * 0.28);
      ctx.fillStyle = inkColor;
      ctx.font = `500 ${fs}px ${monoFam}`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(label, w / 2, h / 2);
    };

    place();

    // Reduced motion → one settled frame, only redrawn on resize.
    if (reduced) {
      settled = true;
      draw(nSeeds);
      const ro = new ResizeObserver(() => {
        place();
        draw(nSeeds);
      });
      ro.observe(canvas);
      return () => ro.disconnect();
    }

    let raf = 0;
    let start = 0;
    let last = -Infinity;
    const frame = (now: number) => {
      // Do not run while the tab is hidden — jump to the final frame and stop.
      if (document.hidden) {
        draw(nSeeds);
        settled = true;
        return;
      }
      if (!start) start = now;
      if (now - last >= FRAME_MS) {
        const p = Math.min(1, (now - start) / DURATION);
        const nActive = Math.max(1, Math.round(1 + p * (nSeeds - 1)));
        draw(nActive);
        last = now;
        if (p >= 1) {
          settled = true;
          return;
        }
      }
      raf = requestAnimationFrame(frame);
    };

    // Start germinating only once the poster scrolls into view, deferred past LCP.
    let started = false;
    const kick = () => {
      if (started) return;
      started = true;
      const go = () => {
        start = 0;
        last = -Infinity;
        raf = requestAnimationFrame(frame);
      };
      if ('requestIdleCallback' in window) {
        (
          window as Window & { requestIdleCallback: (cb: () => void, o?: { timeout: number }) => void }
        ).requestIdleCallback(go, { timeout: 400 });
      } else {
        setTimeout(go, 200);
      }
    };

    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          kick();
          io.disconnect();
        }
      },
      { threshold: 0.1 },
    );
    io.observe(canvas);

    // Resize: rebuild buffers; only repaint if the germination has already settled.
    const ro = new ResizeObserver(() => {
      place();
      if (settled) draw(nSeeds);
    });
    ro.observe(canvas);

    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      ro.disconnect();
    };
  }, [slug, title, reduced]);

  return <canvas ref={canvasRef} aria-hidden className={cn('block h-full w-full', className)} />;
}
