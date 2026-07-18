'use client';

import { useEffect, useRef } from 'react';
import { usePrefersReducedMotion } from '@/hooks/useMediaQuery';

/**
 * Ambient hero background: a real A* pathfinder solving toward the cursor.
 *
 * Not a canned lookalike — this runs genuine A* (binary-heap open set, octile
 * heuristic, lazy-deletion, generation-stamped scores so no per-solve array
 * clears) over a coarse ~46px grid with a smooth weighted terrain field. The
 * open-set frontier floods a few nodes per frame; the solved polyline snaps to
 * the cursor cell; superseded paths fade out as ghost trails.
 *
 * Restraint is the point: dim frontier, single bright path, single accent hue —
 * ambient, not a demo. Perf: init after LCP, DPR capped at 2, 30fps gate, paused
 * off-viewport and on hidden tabs; reduced motion draws one static solved frame.
 */
export function PathfinderCanvas({ className }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    let disposed = false;
    const cleanups: Array<() => void> = [];

    // Defer everything until the main thread is idle (post-LCP) so the pathfinder
    // never competes with first paint. rIC where available, timeout fallback.
    const start = () => {
      if (!disposed) setup(canvas, reduced, cleanups);
    };
    let cancelSchedule: () => void;
    if (typeof window.requestIdleCallback === 'function') {
      const id = window.requestIdleCallback(start, { timeout: 1500 });
      cancelSchedule = () => window.cancelIdleCallback(id);
    } else {
      const id = window.setTimeout(start, 300);
      cancelSchedule = () => window.clearTimeout(id);
    }

    return () => {
      disposed = true;
      cancelSchedule();
      cleanups.forEach((fn) => fn());
    };
  }, [reduced]);

  return <canvas ref={canvasRef} className={className} aria-hidden />;
}

// ── A* pathfinder engine ──────────────────────────────────────────────────────

const CELL = 46; // grid cell size in CSS px (~48px per the brief)
const EXPAND_PER_FRAME = 26; // nodes expanded per animation frame (flood speed)
const FRAME_MS = 1000 / 30; // 30fps cap
const DPR_CAP = 2;
const WANDER_MS = 2600; // goal cadence when there is no pointer
const TRAIL_FADE = 0.08; // ghost-trail erase per frame (≈ ×0.92 alpha)
const SQRT2 = Math.SQRT2;

/** Reads --accent-rgb ("94 234 212") from the document root; falls back to teal. */
function readAccent(): [number, number, number] {
  try {
    const raw = getComputedStyle(document.documentElement).getPropertyValue('--accent-rgb').trim();
    const parts = raw.split(/[\s,]+/).map(Number);
    if (parts.length === 3 && parts.every((n) => Number.isFinite(n))) {
      return [parts[0], parts[1], parts[2]];
    }
  } catch {
    /* SSR / unavailable — use fallback */
  }
  return [94, 234, 212];
}

function setup(canvas: HTMLCanvasElement, reduced: boolean, cleanups: Array<() => void>) {
  const ctx0 = canvas.getContext('2d');
  const parent0 = canvas.parentElement;
  if (!ctx0 || !parent0) return;
  const ctx = ctx0; // narrowed non-null; closures below capture these
  const parent = parent0;

  const [ar, ag, ab] = readAccent();
  const rgba = (a: number) => `rgba(${ar},${ag},${ab},${a})`;
  const accentSolid = rgba(1);
  const dotColor = rgba(0.08);
  const closedColor = rgba(0.03);
  const frontierColor = rgba(0.06);

  // Offscreen buffers (device-pixel sized, drawn in CSS px via matching scale):
  //   lattice — static node dots, rebuilt on resize.
  //   trails  — ghost paths, faded ×0.92 per frame.
  const lattice = document.createElement('canvas');
  const lctx = lattice.getContext('2d')!;
  const trails = document.createElement('canvas');
  const tctx = trails.getContext('2d')!;

  // ── Grid state (typed arrays, reallocated on resize only — zero per-frame GC) ──
  let cssW = 0;
  let cssH = 0;
  let cols = 0;
  let rows = 0;
  let n = 0;
  let terrain = new Float32Array(0); // per-cell movement cost, ≥ 1
  let gScore = new Float64Array(0);
  let fScore = new Float64Array(0);
  let cameFrom = new Int32Array(0);
  let gGen = new Int32Array(0); // stamp: gScore/cameFrom valid iff gGen[i] === gen
  let closedGen = new Int32Array(0); // stamp: node closed this solve iff === gen
  let heap = new Int32Array(0); // min-heap of node indices, keyed by fScore
  let heapSize = 0;
  let gen = 0; // bumped per solve to invalidate all stamps

  let startIdx = 0;
  let goalIdx = 0;
  let solveDone = false;
  let needResolve = false;

  let pathBuf = new Int32Array(0);
  let pathLen = 0; // active solved path (drawn bright on main canvas)
  let trailLife = 0; // frames the ghost trails still need to animate

  let anchors: number[] = [];
  let anchorAt = 0;
  let pointerActive = false; // true once a real in-bounds pointer move arrives

  // ── Loop control ──
  let loopOn = false;
  let rafId = 0;
  let lastFrame = 0;
  let onScreen = true;
  let pageVisible = true;

  const cx = (c: number) => c * CELL + CELL / 2;
  const cy = (r: number) => r * CELL + CELL / 2;

  // ── Heap (lazy deletion: stale pops are skipped via closedGen) ──
  function heapPush(idx: number) {
    if (heapSize >= heap.length) return; // guard; only degrades the viz cosmetically
    heap[heapSize] = idx;
    let ci = heapSize;
    heapSize++;
    while (ci > 0) {
      const pi = (ci - 1) >> 1;
      if (fScore[heap[pi]] <= fScore[heap[ci]]) break;
      const t = heap[pi];
      heap[pi] = heap[ci];
      heap[ci] = t;
      ci = pi;
    }
  }
  function heapPop(): number {
    const top = heap[0];
    heapSize--;
    if (heapSize > 0) {
      heap[0] = heap[heapSize];
      let pi = 0;
      for (;;) {
        const l = 2 * pi + 1;
        const r = l + 1;
        let sm = pi;
        if (l < heapSize && fScore[heap[l]] < fScore[heap[sm]]) sm = l;
        if (r < heapSize && fScore[heap[r]] < fScore[heap[sm]]) sm = r;
        if (sm === pi) break;
        const t = heap[pi];
        heap[pi] = heap[sm];
        heap[sm] = t;
        pi = sm;
      }
    }
    return top;
  }

  // Octile heuristic. min terrain cost is 1, so distance × 1 stays admissible.
  function heuristic(idx: number): number {
    const c = idx % cols;
    const r = (idx / cols) | 0;
    const gc = goalIdx % cols;
    const gr = (goalIdx / cols) | 0;
    const dx = Math.abs(c - gc);
    const dy = Math.abs(r - gr);
    return dx + dy + (SQRT2 - 2) * Math.min(dx, dy);
  }

  function beginSolve() {
    // Retire the current path into the ghost-trail buffer before re-solving.
    if (pathLen > 0) stampGhost();
    gen++;
    heapSize = 0;
    solveDone = false;
    needResolve = false;
    pathLen = 0;
    gGen[startIdx] = gen;
    gScore[startIdx] = 0;
    cameFrom[startIdx] = -1;
    fScore[startIdx] = heuristic(startIdx);
    heapPush(startIdx);
  }

  function step() {
    if (needResolve) beginSolve();
    if (solveDone) return;

    let expanded = 0;
    while (expanded < EXPAND_PER_FRAME && heapSize > 0) {
      const cur = heapPop();
      if (closedGen[cur] === gen) continue; // stale duplicate
      closedGen[cur] = gen;
      expanded++;

      if (cur === goalIdx) {
        reconstruct();
        solveDone = true;
        return;
      }

      const cc = cur % cols;
      const cr = (cur / cols) | 0;
      const gCur = gScore[cur];
      for (let dr = -1; dr <= 1; dr++) {
        for (let dc = -1; dc <= 1; dc++) {
          if (dc === 0 && dr === 0) continue;
          const nc = cc + dc;
          const nr = cr + dr;
          if (nc < 0 || nr < 0 || nc >= cols || nr >= rows) continue;
          const ni = nr * cols + nc;
          if (closedGen[ni] === gen) continue;
          const move = dc !== 0 && dr !== 0 ? SQRT2 : 1;
          const tentative = gCur + move * terrain[ni];
          const known = gGen[ni] === gen ? gScore[ni] : Infinity;
          if (tentative < known) {
            gGen[ni] = gen;
            gScore[ni] = tentative;
            cameFrom[ni] = cur;
            fScore[ni] = tentative + heuristic(ni);
            heapPush(ni);
          }
        }
      }
    }
    if (heapSize === 0) solveDone = true; // unreachable (no walls) — settle
  }

  function reconstruct() {
    let node = goalIdx;
    let count = 0;
    while (node !== -1 && count < pathBuf.length) {
      pathBuf[count++] = node;
      if (node === startIdx) break;
      node = cameFrom[node];
    }
    pathLen = count;
  }

  // ── Rendering ──
  function drawPolyline(target: CanvasRenderingContext2D) {
    target.beginPath();
    for (let k = 0; k < pathLen; k++) {
      const idx = pathBuf[k];
      const x = cx(idx % cols);
      const y = cy((idx / cols) | 0);
      if (k === 0) target.moveTo(x, y);
      else target.lineTo(x, y);
    }
    target.stroke();
  }

  function stampGhost() {
    tctx.save();
    tctx.globalAlpha = 0.4;
    tctx.strokeStyle = accentSolid;
    tctx.lineWidth = 1.5;
    tctx.lineJoin = 'round';
    tctx.lineCap = 'round';
    drawPolyline(tctx);
    tctx.restore();
    trailLife = 60;
  }

  function fadeTrails() {
    tctx.save();
    tctx.globalCompositeOperation = 'destination-out';
    tctx.fillStyle = `rgba(0,0,0,${TRAIL_FADE})`;
    tctx.fillRect(0, 0, cssW, cssH);
    tctx.restore();
  }

  function render() {
    ctx.clearRect(0, 0, cssW, cssH);

    // Node lattice (cached static dots).
    ctx.drawImage(lattice, 0, 0, cssW, cssH);

    // Closed set + open frontier — only while the solve is live. Once the path
    // lands the flood clears, so the idle frame is just lattice + path (the
    // full-viewport tile carpet read as noise, not ambience).
    if (!solveDone) {
      const s = CELL * 0.5;
      const half = s / 2;
      for (let i = 0; i < n; i++) {
        const closed = closedGen[i] === gen;
        const open = !closed && gGen[i] === gen;
        if (!closed && !open) continue;
        ctx.fillStyle = closed ? closedColor : frontierColor;
        ctx.fillRect(cx(i % cols) - half, cy((i / cols) | 0) - half, s, s);
      }
    }

    // Ghost trails (previous paths, fading).
    if (trailLife > 0) {
      fadeTrails();
      trailLife--;
    }
    ctx.drawImage(trails, 0, 0, cssW, cssH);

    // Goal + start wayfinding marks (subtle).
    ctx.strokeStyle = rgba(0.22);
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.arc(cx(goalIdx % cols), cy((goalIdx / cols) | 0), 5, 0, Math.PI * 2);
    ctx.stroke();
    ctx.fillStyle = rgba(0.35);
    ctx.beginPath();
    ctx.arc(cx(startIdx % cols), cy((startIdx / cols) | 0), 2.5, 0, Math.PI * 2);
    ctx.fill();

    // The bright solved path — single accent stroke, small glow.
    if (pathLen > 1) {
      ctx.save();
      ctx.globalAlpha = 0.5;
      ctx.strokeStyle = accentSolid;
      ctx.lineWidth = 2;
      ctx.lineJoin = 'round';
      ctx.lineCap = 'round';
      ctx.shadowColor = accentSolid;
      ctx.shadowBlur = 6;
      drawPolyline(ctx);
      ctx.restore();
    }
  }

  function hasWork() {
    return needResolve || !solveDone || trailLife > 0;
  }

  // ── Loop ──
  function frame(now: number) {
    if (!loopOn) return;
    rafId = requestAnimationFrame(frame);
    const dt = now - lastFrame;
    if (dt < FRAME_MS) return;
    lastFrame = now - (dt % FRAME_MS);
    step();
    render();
    if (!hasWork()) stopLoop(); // idle: leave the last frame on screen
  }
  function startLoop() {
    if (loopOn || !onScreen || !pageVisible) return;
    loopOn = true;
    lastFrame = 0;
    rafId = requestAnimationFrame(frame);
  }
  function stopLoop() {
    loopOn = false;
    if (rafId) cancelAnimationFrame(rafId);
  }
  function wake() {
    if (!loopOn && hasWork()) startLoop();
  }

  // ── Goal control ──
  function setGoal(c: number, r: number) {
    const idx = r * cols + c;
    if (idx === goalIdx) return;
    goalIdx = idx;
    needResolve = true;
    wake();
  }

  // ── Build / resize ──
  function build() {
    cssW = Math.max(1, parent.clientWidth);
    cssH = Math.max(1, parent.clientHeight);
    const dpr = Math.min(window.devicePixelRatio || 1, DPR_CAP);

    for (const cv of [canvas, lattice, trails]) {
      cv.width = Math.round(cssW * dpr);
      cv.height = Math.round(cssH * dpr);
    }
    canvas.style.width = `${cssW}px`;
    canvas.style.height = `${cssH}px`;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    lctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    tctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    cols = Math.max(2, Math.ceil(cssW / CELL));
    rows = Math.max(2, Math.ceil(cssH / CELL));
    n = cols * rows;

    terrain = new Float32Array(n);
    gScore = new Float64Array(n);
    fScore = new Float64Array(n);
    cameFrom = new Int32Array(n);
    gGen = new Int32Array(n); // 0 while gen starts at 1, so all stamps read invalid
    closedGen = new Int32Array(n);
    heap = new Int32Array(n * 4);
    pathBuf = new Int32Array(n);
    gen = 0;
    heapSize = 0;
    pathLen = 0;
    trailLife = 0;

    // Smooth deterministic terrain field (value cost in ~[1, 2.6]). A weighted
    // grid — not walls — keeps the frontier flooding and the path gently curved
    // while staying genuinely subtle.
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const wave =
          Math.sin(c * 0.55) * Math.cos(r * 0.5) + 0.6 * Math.sin((c + r) * 0.35) + 0.5 * Math.cos(c * 0.2 - r * 0.3);
        terrain[r * cols + c] = 1 + 1.6 * (0.5 + 0.5 * (wave / 2.1));
      }
    }

    // Start ≈ behind the name (left third, vertically centred).
    const sc = Math.min(cols - 1, Math.max(0, Math.round(cols * 0.16)));
    const sr = Math.min(rows - 1, Math.max(0, Math.round(rows * 0.42)));
    startIdx = sr * cols + sc;

    // Wander anchors spread across the field for the no-pointer case.
    anchors = [
      Math.round(rows * 0.25) * cols + Math.round(cols * 0.82),
      Math.round(rows * 0.7) * cols + Math.round(cols * 0.68),
      Math.round(rows * 0.5) * cols + Math.round(cols * 0.55),
      Math.round(rows * 0.32) * cols + Math.round(cols * 0.9),
      Math.round(rows * 0.78) * cols + Math.round(cols * 0.4),
    ].map((v) => Math.min(n - 1, Math.max(0, v)));
    anchorAt = 0;
    goalIdx = anchors[0];
    needResolve = true;

    // Fresh trails buffer (transparent) + cached lattice dots.
    tctx.clearRect(0, 0, cssW, cssH);
    lctx.clearRect(0, 0, cssW, cssH);
    lctx.fillStyle = dotColor;
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        lctx.fillRect(cx(c) - 0.5, cy(r) - 0.5, 1, 1);
      }
    }
  }

  // ── Reduced motion: one static solved frame, no loop, no listeners ──
  if (reduced) {
    build();
    goalIdx = anchors[2]; // a pleasant mid-field resting goal
    beginSolve();
    let guard = 0;
    while (!solveDone && guard++ < n * 2) step();
    render();
    return;
  }

  // ── Interactive wiring ──
  build();
  startLoop();

  const onPointerMove = (e: PointerEvent) => {
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    if (x < 0 || y < 0 || x > rect.width || y > rect.height) return;
    pointerActive = true;
    const c = Math.min(cols - 1, Math.max(0, Math.floor(x / CELL)));
    const r = Math.min(rows - 1, Math.max(0, Math.floor(y / CELL)));
    setGoal(c, r);
  };
  window.addEventListener('pointermove', onPointerMove, { passive: true });
  cleanups.push(() => window.removeEventListener('pointermove', onPointerMove));

  // No pointer → goal wanders between anchors on a slow timer.
  const wanderTimer = window.setInterval(() => {
    if (pointerActive) return;
    anchorAt = (anchorAt + 1) % anchors.length;
    const g = anchors[anchorAt];
    setGoal(g % cols, (g / cols) | 0);
  }, WANDER_MS);
  cleanups.push(() => window.clearInterval(wanderTimer));

  // Pause off-viewport and on hidden tabs.
  const io = new IntersectionObserver(
    ([entry]) => {
      onScreen = entry.isIntersecting;
      if (onScreen) wake();
      else stopLoop();
    },
    { threshold: 0 },
  );
  io.observe(canvas);
  cleanups.push(() => io.disconnect());

  const onVisibility = () => {
    pageVisible = !document.hidden;
    if (pageVisible) wake();
    else stopLoop();
  };
  document.addEventListener('visibilitychange', onVisibility);
  cleanups.push(() => document.removeEventListener('visibilitychange', onVisibility));

  // Rebuild the grid on resize (coalesced to one rAF).
  let resizePending = false;
  const ro = new ResizeObserver(() => {
    if (resizePending) return;
    resizePending = true;
    requestAnimationFrame(() => {
      resizePending = false;
      pointerActive = false;
      build();
      wake();
    });
  });
  ro.observe(parent);
  cleanups.push(() => ro.disconnect());

  cleanups.push(() => stopLoop());
}
