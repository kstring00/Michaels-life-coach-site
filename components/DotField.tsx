"use client";

import { useEffect, useRef } from "react";
import styles from "./DotField.module.css";

/* ---------------------------------------------------------------------------
   An animated halftone field. Dots sit on a fixed grid; their radius, alpha and
   colour encode a scalar excitation sampled per cell. Three things drive it: a
   slow noise swell, a soft bubble trailing the pointer, and ripples that arrive
   on their own so an idle page never goes dead.

   The whole thing is built around one rule: no allocation inside the frame. All
   buffers are sized once per resize, ripples live in a fixed pool of parallel
   typed arrays, and drawing is a counting sort into colour buckets so the frame
   costs a few dozen fillStyle writes instead of one per dot.
   --------------------------------------------------------------------------- */

const DPR_CAP = 2;
const BASE_RADIUS = 1.6;
const MAX_RADIUS = 4.2;
const BASE_ALPHA = 0.1;
const MAX_ALPHA = 0.85;
const ALPHA_FLOOR = 0.03;

const NOISE_SCALE = 0.004;
const NOISE_TIME_SCALE = 0.00012;
const NOISE_WEIGHT = 0.35;

const CURSOR_RADIUS = 180;
const CURSOR_LERP = 0.12;
const CURSOR_FADE_MS = 600;
const CURSOR_FALLOFF_POW = 1.6;
/* Spec constant. Pointer speed is px/s, which at a hard flick would collapse the
   along-travel axis to ~0.17 and read as a comet, so the factor is floored. */
const SMEAR_FACTOR = 0.004;
const SMEAR_MIN = 0.45;

const MAX_RIPPLES = 4;
const RIPPLE_SPEED_MIN = 240;
const RIPPLE_SPEED_MAX = 420;
const RIPPLE_WIDTH_MIN = 90;
const RIPPLE_WIDTH_MAX = 140;
const RIPPLE_FADE_FROM = 0.75;
const DIRECTIONAL_CHANCE = 0.25;

const CLICK_STRENGTH = 1;
const CLICK_SPEED = 520;
const CLICK_WIDTH = 70;

const COLOR_BUCKETS = 8;
const DENSITY_BUCKETS = 6;
const BUCKETS = COLOR_BUCKETS * DENSITY_BUCKETS;

const DENSITY_MIN = 0.25;
const MAX_DT = 50;
const RESIZE_DEBOUNCE = 150;
const TAU = Math.PI * 2;

/* --- 3D simplex noise ------------------------------------------------------
   Inlined rather than pulled from a package. Gradient and permutation tables
   are module-level typed arrays, and every intermediate is a scalar, so a call
   allocates nothing. Seeded so the field is identical on every load. */

const GRAD3 = new Int8Array([
  1, 1, 0, -1, 1, 0, 1, -1, 0, -1, -1, 0,
  1, 0, 1, -1, 0, 1, 1, 0, -1, -1, 0, -1,
  0, 1, 1, 0, -1, 1, 0, 1, -1, 0, -1, -1,
]);
const PERM = new Uint8Array(512);
const PERM_MOD12 = new Uint8Array(512);

(function seedPermutation() {
  const p = new Uint8Array(256);
  for (let i = 0; i < 256; i++) p[i] = i;
  // xorshift so the shuffle is deterministic across loads and environments
  let s = 0x2f6e2b1;
  for (let i = 255; i > 0; i--) {
    s ^= s << 13;
    s ^= s >>> 17;
    s ^= s << 5;
    const j = (s >>> 0) % (i + 1);
    const t = p[i];
    p[i] = p[j];
    p[j] = t;
  }
  for (let i = 0; i < 512; i++) {
    PERM[i] = p[i & 255];
    PERM_MOD12[i] = PERM[i] % 12;
  }
})();

const F3 = 1 / 3;
const G3 = 1 / 6;

function noise3(xin: number, yin: number, zin: number): number {
  const s = (xin + yin + zin) * F3;
  const i = Math.floor(xin + s);
  const j = Math.floor(yin + s);
  const k = Math.floor(zin + s);
  const t = (i + j + k) * G3;
  const x0 = xin - (i - t);
  const y0 = yin - (j - t);
  const z0 = zin - (k - t);

  let i1: number, j1: number, k1: number, i2: number, j2: number, k2: number;
  if (x0 >= y0) {
    if (y0 >= z0) { i1 = 1; j1 = 0; k1 = 0; i2 = 1; j2 = 1; k2 = 0; }
    else if (x0 >= z0) { i1 = 1; j1 = 0; k1 = 0; i2 = 1; j2 = 0; k2 = 1; }
    else { i1 = 0; j1 = 0; k1 = 1; i2 = 1; j2 = 0; k2 = 1; }
  } else {
    if (y0 < z0) { i1 = 0; j1 = 0; k1 = 1; i2 = 0; j2 = 1; k2 = 1; }
    else if (x0 < z0) { i1 = 0; j1 = 1; k1 = 0; i2 = 0; j2 = 1; k2 = 1; }
    else { i1 = 0; j1 = 1; k1 = 0; i2 = 1; j2 = 1; k2 = 0; }
  }

  const x1 = x0 - i1 + G3, y1 = y0 - j1 + G3, z1 = z0 - k1 + G3;
  const x2 = x0 - i2 + 2 * G3, y2 = y0 - j2 + 2 * G3, z2 = z0 - k2 + 2 * G3;
  const x3 = x0 - 1 + 3 * G3, y3 = y0 - 1 + 3 * G3, z3 = z0 - 1 + 3 * G3;

  const ii = i & 255, jj = j & 255, kk = k & 255;
  let n = 0;

  let t0 = 0.6 - x0 * x0 - y0 * y0 - z0 * z0;
  if (t0 > 0) {
    const g = PERM_MOD12[ii + PERM[jj + PERM[kk]]] * 3;
    t0 *= t0;
    n += t0 * t0 * (GRAD3[g] * x0 + GRAD3[g + 1] * y0 + GRAD3[g + 2] * z0);
  }
  let t1 = 0.6 - x1 * x1 - y1 * y1 - z1 * z1;
  if (t1 > 0) {
    const g = PERM_MOD12[ii + i1 + PERM[jj + j1 + PERM[kk + k1]]] * 3;
    t1 *= t1;
    n += t1 * t1 * (GRAD3[g] * x1 + GRAD3[g + 1] * y1 + GRAD3[g + 2] * z1);
  }
  let t2 = 0.6 - x2 * x2 - y2 * y2 - z2 * z2;
  if (t2 > 0) {
    const g = PERM_MOD12[ii + i2 + PERM[jj + j2 + PERM[kk + k2]]] * 3;
    t2 *= t2;
    n += t2 * t2 * (GRAD3[g] * x2 + GRAD3[g + 1] * y2 + GRAD3[g + 2] * z2);
  }
  let t3 = 0.6 - x3 * x3 - y3 * y3 - z3 * z3;
  if (t3 > 0) {
    const g = PERM_MOD12[ii + 1 + PERM[jj + 1 + PERM[kk + 1]]] * 3;
    t3 *= t3;
    n += t3 * t3 * (GRAD3[g] * x3 + GRAD3[g + 1] * y3 + GRAD3[g + 2] * z3);
  }
  return 32 * n;
}

/* --- colour ----------------------------------------------------------------
   Brass and blue sit on opposite sides of the hue circle, so a straight sRGB
   lerp would pass through a dead grey. Interpolating in OKLab keeps the ramp
   chromatic. This runs once per bucket at setup, never per frame. */

function hexToRgb(hex: string): [number, number, number] {
  let h = hex.trim().replace("#", "");
  if (h.length === 3) h = h[0] + h[0] + h[1] + h[1] + h[2] + h[2];
  const v = parseInt(h, 16);
  if (h.length !== 6 || Number.isNaN(v)) return [168, 144, 92];
  return [(v >> 16) & 255, (v >> 8) & 255, v & 255];
}

const toLinear = (c: number) => {
  const s = c / 255;
  return s <= 0.04045 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4);
};
const toSrgb = (c: number) => {
  const s = c <= 0.0031308 ? c * 12.92 : 1.055 * Math.pow(c, 1 / 2.4) - 0.055;
  return Math.max(0, Math.min(255, Math.round(s * 255)));
};

function rgbToOklab(rgb: [number, number, number]): [number, number, number] {
  const r = toLinear(rgb[0]), g = toLinear(rgb[1]), b = toLinear(rgb[2]);
  const l = Math.cbrt(0.4122214708 * r + 0.5363325363 * g + 0.0514459929 * b);
  const m = Math.cbrt(0.2119034982 * r + 0.6806995451 * g + 0.1073969566 * b);
  const s = Math.cbrt(0.0883024619 * r + 0.2817188376 * g + 0.6299787005 * b);
  return [
    0.2104542553 * l + 0.793617785 * m - 0.0040720468 * s,
    1.9779984951 * l - 2.428592205 * m + 0.4505937099 * s,
    0.0259040371 * l + 0.7827717662 * m - 0.808675766 * s,
  ];
}

function oklabToRgb(lab: [number, number, number]): [number, number, number] {
  const l_ = lab[0] + 0.3963377774 * lab[1] + 0.2158037573 * lab[2];
  const m_ = lab[0] - 0.1055613458 * lab[1] - 0.0638541728 * lab[2];
  const s_ = lab[0] - 0.0894841775 * lab[1] - 1.291485548 * lab[2];
  const l = l_ * l_ * l_, m = m_ * m_ * m_, s = s_ * s_ * s_;
  return [
    toSrgb(4.0767416621 * l - 3.3077115913 * m + 0.2309699292 * s),
    toSrgb(-1.2684380046 * l + 2.6097574011 * m - 0.3413193965 * s),
    toSrgb(-0.0041960863 * l - 0.7034186147 * m + 1.707614701 * s),
  ];
}

const smoothstep = (edge0: number, edge1: number, x: number) => {
  const u = Math.max(0, Math.min(1, (x - edge0) / (edge1 - edge0)));
  return u * u * (3 - 2 * u);
};
const easeOutCubic = (x: number) => 1 - (1 - x) * (1 - x) * (1 - x);

export interface DotFieldProps {
  spacing?: number;
  className?: string;
  baseColor?: string;
  activeColor?: string;
  rippleIntervalMs?: [number, number];
  intensity?: number;
}

export function DotField({
  spacing,
  className,
  baseColor = "#A8905C",
  activeColor = "#4A7DFF",
  rippleIntervalMs = [2500, 6000],
  intensity = 1,
}: DotFieldProps) {
  const hostRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  /* Props the loop reads every frame. Held in a ref so changing one does not
     tear down and rebuild the grid. */
  const tuning = useRef({ intensity, rippleIntervalMs });
  tuning.current.intensity = intensity;
  tuning.current.rippleIntervalMs = rippleIntervalMs;

  useEffect(() => {
    const host = hostRef.current;
    const canvas = canvasRef.current;
    if (!host || !canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    /* --- bucket palette, built once ------------------------------------- */
    const from = rgbToOklab(hexToRgb(baseColor));
    const to = rgbToOklab(hexToRgb(activeColor));
    const fills: string[] = new Array(BUCKETS);
    const bucketSkipped = new Uint8Array(BUCKETS);
    for (let cb = 0; cb < COLOR_BUCKETS; cb++) {
      const e = (cb + 0.5) / COLOR_BUCKETS;
      const rgb = oklabToRgb([
        from[0] + (to[0] - from[0]) * e,
        from[1] + (to[1] - from[1]) * e,
        from[2] + (to[2] - from[2]) * e,
      ]);
      const excitedAlpha = BASE_ALPHA + (MAX_ALPHA - BASE_ALPHA) * e;
      for (let db = 0; db < DENSITY_BUCKETS; db++) {
        const density = DENSITY_MIN + (1 - DENSITY_MIN) * ((db + 0.5) / DENSITY_BUCKETS);
        const a = excitedAlpha * density;
        const i = cb * DENSITY_BUCKETS + db;
        fills[i] = `rgba(${rgb[0]},${rgb[1]},${rgb[2]},${a.toFixed(3)})`;
        bucketSkipped[i] = a < ALPHA_FLOOR ? 1 : 0;
      }
    }

    /* --- grid buffers, resized in place --------------------------------- */
    let width = 0;
    let height = 0;
    let diagonal = 0;
    let count = 0;
    let px = new Float32Array(0);
    let py = new Float32Array(0);
    let densityBucket = new Uint8Array(0);
    let excitation = new Float32Array(0);
    let bucketOf = new Uint8Array(0);
    let order = new Int32Array(0);
    const counts = new Int32Array(BUCKETS + 1);
    const offsets = new Int32Array(BUCKETS + 2);

    /* --- ripple pool, parallel arrays so a spawn writes no object -------- */
    const rAlive = new Uint8Array(MAX_RIPPLES);
    const rX = new Float32Array(MAX_RIPPLES);
    const rY = new Float32Array(MAX_RIPPLES);
    const rBirth = new Float64Array(MAX_RIPPLES);
    const rSpeed = new Float32Array(MAX_RIPPLES);
    const rWidth = new Float32Array(MAX_RIPPLES);
    const rStrength = new Float32Array(MAX_RIPPLES);
    const rNx = new Float32Array(MAX_RIPPLES);
    const rNy = new Float32Array(MAX_RIPPLES);
    const rDirectional = new Uint8Array(MAX_RIPPLES);
    /* resolved once per frame, read by every dot */
    const rFront = new Float32Array(MAX_RIPPLES);
    const rGain = new Float32Array(MAX_RIPPLES);
    const rReach = new Float32Array(MAX_RIPPLES);

    let elapsed = 0;
    let lastFrame = 0;
    let nextSpawn = 0;
    let rafId = 0;
    let running = false;
    let visible = true;

    // pointer, in host-local coordinates
    let rawX = -9999, rawY = -9999;
    let curX = -9999, curY = -9999;
    let velX = 0, velY = 0;
    let cursorStrength = 0;
    let cursorTarget = 0;
    let pointerSeen = false;
    let hostRect: DOMRect | null = null;

    const rand = (min: number, max: number) => min + Math.random() * (max - min);

    function spawnRipple(
      x: number, y: number, speed: number, w: number, strength: number, directional: boolean,
    ) {
      let slot = -1;
      for (let i = 0; i < MAX_RIPPLES; i++) {
        if (!rAlive[i]) { slot = i; break; }
      }
      if (slot < 0) {
        // pool full: the oldest wavefront is the furthest along, so drop it
        let oldest = 0;
        for (let i = 1; i < MAX_RIPPLES; i++) if (rBirth[i] < rBirth[oldest]) oldest = i;
        slot = oldest;
      }
      rAlive[slot] = 1;
      rX[slot] = x;
      rY[slot] = y;
      rBirth[slot] = elapsed;
      rSpeed[slot] = speed;
      rWidth[slot] = w;
      rStrength[slot] = strength;
      rDirectional[slot] = directional ? 1 : 0;
      if (directional) {
        const a = Math.random() * TAU;
        rNx[slot] = Math.cos(a);
        rNy[slot] = Math.sin(a);
      } else {
        rNx[slot] = 0;
        rNy[slot] = 0;
      }
    }

    function spawnAmbientRipple() {
      const directional = Math.random() < DIRECTIONAL_CHANCE;
      // a directional sweep pivots on the centre; its wavefront starts off-screen
      const x = directional ? width * 0.5 : Math.random() * width;
      const y = directional ? height * 0.5 : Math.random() * height;
      spawnRipple(
        x, y,
        rand(RIPPLE_SPEED_MIN, RIPPLE_SPEED_MAX),
        rand(RIPPLE_WIDTH_MIN, RIPPLE_WIDTH_MAX),
        rand(0.75, 1),
        directional,
      );
    }

    function scheduleSpawn() {
      const [lo, hi] = tuning.current.rippleIntervalMs;
      nextSpawn = elapsed + rand(lo, hi);
    }

    /* --- layout ---------------------------------------------------------- */
    function build() {
      hostRect = host!.getBoundingClientRect();
      const w = Math.max(1, Math.round(hostRect.width));
      const h = Math.max(1, Math.round(hostRect.height));
      const gap = spacing ?? (window.matchMedia("(max-width: 768px)").matches ? 16 : 22);
      const dpr = Math.min(window.devicePixelRatio || 1, DPR_CAP);

      width = w;
      height = h;
      diagonal = Math.hypot(w, h);

      canvas!.width = Math.round(w * dpr);
      canvas!.height = Math.round(h * dpr);
      canvas!.style.width = `${w}px`;
      canvas!.style.height = `${h}px`;
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);

      const cols = Math.max(1, Math.ceil(w / gap) + 1);
      const rows = Math.max(1, Math.ceil(h / gap) + 1);
      const n = cols * rows;

      if (n !== count) {
        px = new Float32Array(n);
        py = new Float32Array(n);
        densityBucket = new Uint8Array(n);
        excitation = new Float32Array(n);
        bucketOf = new Uint8Array(n);
        order = new Int32Array(n);
        count = n;
      }

      // centre the lattice so the margin is even on both sides
      const offX = (w - (cols - 1) * gap) * 0.5;
      const offY = (h - (rows - 1) * gap) * 0.5;
      let i = 0;
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++, i++) {
          const x = offX + c * gap;
          const y = offY + r * gap;
          px[i] = x;
          py[i] = y;
          // static falloff: sparse at top-left, dense toward bottom-right
          const g = smoothstep(0, 1, (x / w) * 0.6 + (y / h) * 0.4);
          const db = Math.min(DENSITY_BUCKETS - 1, (g * DENSITY_BUCKETS) | 0);
          densityBucket[i] = db;
        }
      }
    }

    /* --- one frame ------------------------------------------------------- */
    function render(dt: number) {
      const gi = tuning.current.intensity;
      const nt = elapsed * NOISE_TIME_SCALE;

      // pointer bubble trails the real pointer, and fades rather than pops
      if (cursorStrength < cursorTarget) {
        cursorStrength = Math.min(cursorTarget, cursorStrength + dt / CURSOR_FADE_MS);
      } else if (cursorStrength > cursorTarget) {
        cursorStrength = Math.max(cursorTarget, cursorStrength - dt / CURSOR_FADE_MS);
      }
      if (pointerSeen) {
        const nx = curX + (rawX - curX) * CURSOR_LERP;
        const ny = curY + (rawY - curY) * CURSOR_LERP;
        if (dt > 0) {
          velX = ((nx - curX) / dt) * 1000;
          velY = ((ny - curY) / dt) * 1000;
        }
        curX = nx;
        curY = ny;
      }

      // stretch the bubble along the direction of travel
      const speed = Math.hypot(velX, velY);
      let smear = 1, vux = 0, vuy = 0;
      if (speed > 1) {
        vux = velX / speed;
        vuy = velY / speed;
        smear = Math.max(SMEAR_MIN, 1 / (1 + speed * SMEAR_FACTOR));
      }
      const cursorActive = cursorStrength > 0.001;

      // resolve each ripple once, not once per dot
      let liveRipples = 0;
      for (let i = 0; i < MAX_RIPPLES; i++) {
        if (!rAlive[i]) continue;
        const age = (elapsed - rBirth[i]) / 1000;
        const travelled = age * rSpeed[i];
        if (travelled > diagonal) { rAlive[i] = 0; continue; }
        const progress = travelled / diagonal;
        const fade = progress > RIPPLE_FADE_FROM
          ? 1 - (progress - RIPPLE_FADE_FROM) / (1 - RIPPLE_FADE_FROM)
          : 1;
        rFront[i] = rDirectional[i] ? travelled - diagonal * 0.5 : travelled;
        rGain[i] = rStrength[i] * fade;
        // beyond 3 sigma the gaussian is nothing; used to skip the exp()
        rReach[i] = rWidth[i] * 3;
        liveRipples++;
      }

      ctx!.clearRect(0, 0, width, height);
      counts.fill(0);

      /* pass 1 — excitation and bucket per dot */
      for (let i = 0; i < count; i++) {
        const x = px[i];
        const y = py[i];

        let e = ((noise3(x * NOISE_SCALE, y * NOISE_SCALE, nt) + 1) * 0.5) * NOISE_WEIGHT;

        if (cursorActive) {
          let dx = x - curX;
          let dy = y - curY;
          if (smear < 1) {
            const along = (dx * vux + dy * vuy) * smear;
            const perp = -dx * vuy + dy * vux;
            dx = along;
            dy = perp;
          }
          const d2 = dx * dx + dy * dy;
          if (d2 < CURSOR_RADIUS * CURSOR_RADIUS) {
            const falloff = 1 - smoothstep(0, CURSOR_RADIUS, Math.sqrt(d2));
            const ec = Math.pow(falloff, CURSOR_FALLOFF_POW) * cursorStrength;
            if (ec > e) e = ec;
          }
        }

        if (liveRipples > 0) {
          for (let r = 0; r < MAX_RIPPLES; r++) {
            if (!rAlive[r]) continue;
            let d: number;
            if (rDirectional[r]) {
              d = (x - rX[r]) * rNx[r] + (y - rY[r]) * rNy[r];
            } else {
              const ddx = x - rX[r];
              const ddy = y - rY[r];
              d = Math.sqrt(ddx * ddx + ddy * ddy);
            }
            const q = d - rFront[r];
            if (q < -rReach[r] || q > rReach[r]) continue;
            const k = q / rWidth[r];
            const er = rGain[r] * Math.exp(-k * k);
            if (er > e) e = er;
          }
        }

        e *= gi;
        if (e > 1) e = 1;
        else if (e < 0) e = 0;

        excitation[i] = e;
        const cb = e >= 1 ? COLOR_BUCKETS - 1 : (e * COLOR_BUCKETS) | 0;
        const b = cb * DENSITY_BUCKETS + densityBucket[i];
        if (bucketSkipped[b]) {
          bucketOf[i] = BUCKETS; // sentinel: never drawn
        } else {
          bucketOf[i] = b;
          counts[b]++;
        }
      }

      /* pass 2 — counting sort so each bucket is one contiguous run */
      let cursor = 0;
      for (let b = 0; b < BUCKETS; b++) {
        offsets[b] = cursor;
        cursor += counts[b];
      }
      offsets[BUCKETS] = cursor;
      // offsets[] is consumed as a cursor here and rebuilt from counts on draw
      for (let i = 0; i < count; i++) {
        const b = bucketOf[i];
        if (b === BUCKETS) continue;
        order[offsets[b]++] = i;
      }

      /* pass 3 — one fillStyle and one path per bucket */
      let start = 0;
      for (let b = 0; b < BUCKETS; b++) {
        const n = counts[b];
        if (n === 0) continue;
        const end = start + n;
        ctx!.fillStyle = fills[b];
        ctx!.beginPath();
        for (let k = start; k < end; k++) {
          const i = order[k];
          const radius = BASE_RADIUS + (MAX_RADIUS - BASE_RADIUS) * easeOutCubic(excitation[i]);
          const x = px[i];
          const y = py[i];
          ctx!.moveTo(x + radius, y);
          ctx!.arc(x, y, radius, 0, TAU);
        }
        ctx!.fill();
        start = end;
      }
    }

    /* --- loop ------------------------------------------------------------ */
    function frame(now: number) {
      const dt = Math.min(now - lastFrame, MAX_DT);
      lastFrame = now;
      elapsed += dt;

      if (elapsed >= nextSpawn) {
        spawnAmbientRipple();
        scheduleSpawn();
      }
      render(dt);
      rafId = requestAnimationFrame(frame);
    }

    function start() {
      if (running || reduceMotion) return;
      running = true;
      lastFrame = performance.now();
      rafId = requestAnimationFrame(frame);
    }
    function stop() {
      if (!running) return;
      running = false;
      cancelAnimationFrame(rafId);
    }
    function syncRunning() {
      if (visible && !document.hidden) start();
      else stop();
    }

    /* --- input ----------------------------------------------------------- */
    function toLocal(clientX: number, clientY: number) {
      if (!hostRect) return false;
      rawX = clientX - hostRect.left;
      rawY = clientY - hostRect.top;
      return rawX >= 0 && rawY >= 0 && rawX <= hostRect.width && rawY <= hostRect.height;
    }

    function onPointerMove(ev: PointerEvent) {
      const inside = toLocal(ev.clientX, ev.clientY);
      if (!pointerSeen && inside) {
        // first sighting: place the bubble rather than sliding it in from 0,0
        curX = rawX;
        curY = rawY;
        pointerSeen = true;
      }
      cursorTarget = inside ? 1 : 0;
    }
    function onPointerDown(ev: PointerEvent) {
      if (!toLocal(ev.clientX, ev.clientY)) return;
      spawnRipple(rawX, rawY, CLICK_SPEED, CLICK_WIDTH, CLICK_STRENGTH, false);
    }
    function onPointerLeave() {
      cursorTarget = 0;
    }

    let rectDirty = false;
    function onScroll() {
      if (rectDirty) return;
      rectDirty = true;
      requestAnimationFrame(() => {
        rectDirty = false;
        hostRect = host!.getBoundingClientRect();
      });
    }

    /* --- reduced motion: one static frame, then nothing ------------------ */
    if (reduceMotion) {
      build();
      cursorStrength = 0;
      cursorTarget = 0;
      render(0);
      const ro = new ResizeObserver(() => { build(); render(0); });
      ro.observe(host);
      return () => ro.disconnect();
    }

    build();
    spawnAmbientRipple();
    scheduleSpawn();

    let resizeTimer: ReturnType<typeof setTimeout> | undefined;
    const resizeObserver = new ResizeObserver(() => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(build, RESIZE_DEBOUNCE);
    });
    resizeObserver.observe(host);

    const io = new IntersectionObserver(
      (entries) => { visible = entries[0].isIntersecting; syncRunning(); },
      { threshold: 0 },
    );
    io.observe(host);

    window.addEventListener("pointermove", onPointerMove, { passive: true });
    window.addEventListener("pointerdown", onPointerDown, { passive: true });
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    document.addEventListener("visibilitychange", syncRunning);
    document.addEventListener("pointerleave", onPointerLeave);

    syncRunning();

    return () => {
      stop();
      clearTimeout(resizeTimer);
      resizeObserver.disconnect();
      io.disconnect();
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerdown", onPointerDown);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      document.removeEventListener("visibilitychange", syncRunning);
      document.removeEventListener("pointerleave", onPointerLeave);
    };
  }, [spacing, baseColor, activeColor]);

  return (
    <div
      ref={hostRef}
      className={className ? `${styles.field} ${className}` : styles.field}
      aria-hidden="true"
    >
      <canvas ref={canvasRef} className={styles.canvas} />
    </div>
  );
}
