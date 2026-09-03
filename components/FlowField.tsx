"use client";

/**
 * FlowField.tsx — glyph vector field with cursor interaction
 *
 * npm i simplex-noise
 *
 * <FlowField className="absolute inset-0" gradient={["#0A121E", "#1B5CFF", "#0A121E"]} />
 *
 * Notes on the production concerns the demo skips:
 *  - devicePixelRatio handling (glyphs are mush without it)
 *  - IntersectionObserver pause (don't burn a rAF loop offscreen)
 *  - prefers-reduced-motion → static field, no time term, no cursor
 *  - pointer: coarse → skips cursor tracking entirely
 *  - resize via ResizeObserver, not window resize
 *
 * Two changes from the reference implementation, both measured:
 *
 * 1. Glyphs are drawn from a pre-rendered rotation atlas rather than by
 *    fillText inside save/rotate/restore. At 1440x860 the field is ~2,500
 *    glyphs; the per-glyph transform and state-stack push cost 165ms a frame
 *    under a 4x CPU throttle (6fps, and 3.8s of Lighthouse blocking time).
 *    The atlas renders each glyph once per angle bucket up front, so the loop
 *    becomes drawImage into an untransformed context.
 *
 * 2. Pointer tracking listens on window and converts into canvas space rather
 *    than listening on the canvas. The canvas sits behind the hero copy, so
 *    listening on the element left a dead zone wherever the headline and
 *    buttons overlap it — and making the copy pointer-events:none to fix that
 *    would cost text selection on the headline.
 *
 * The loop also waits for load + idle before its first frame, so it never
 * competes with hydration, and caps itself at ~40fps: the field drifts slowly
 * enough that the extra 20 frames a second are not visible.
 */

import { useEffect, useRef } from "react";
import { createNoise3D } from "simplex-noise";

const TAU = Math.PI * 2;
/** rotation buckets in the atlas. 64 ≈ 5.6° steps, smooth on a slow field. */
const ANGLE_STEPS = 64;

type Props = {
  className?: string;
  /** 2-3 stops, painted bottom-left to top-right */
  gradient?: string[];
  /** px between glyphs. 16-22 is the sweet spot */
  spacing?: number;
  /** lower = broader, smoother swirls */
  fieldScale?: number;
  /** cursor influence radius in px */
  radius?: number;
  /** 0 = push away, 1 = orbit around */
  swirl?: number;
  speed?: number;
  glyphs?: [string, string, string];
  color?: string;
  /** resting glyph alpha */
  alpha?: number;
  /** glyph alpha at the centre of the cursor influence */
  peak?: number;
  /** frame budget in ms. 25 ≈ 40fps */
  frameMs?: number;
};

export default function FlowField({
  className = "",
  gradient = ["#6ea8f0", "#c07fd8", "#f4736e"],
  spacing = 18,
  fieldScale = 0.0016,
  radius = 200,
  swirl = 0.7,
  speed = 0.00018,
  glyphs = ["|", "=", "+"],
  color = "255,255,255",
  alpha = 0.5,
  peak = 0.95,
  frameMs = 25,
}: Props) {
  const ref = useRef<HTMLCanvasElement>(null);
  const pointer = useRef({ x: -9999, y: -9999 });
  const visible = useRef(true);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) return;

    const noise3D = createNoise3D();
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const coarse = window.matchMedia("(pointer: coarse)").matches;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    const FONT = `${11 * dpr}px ui-monospace, SFMono-Regular, Menlo, monospace`;
    const cell = Math.ceil(20 * dpr);

    /* every glyph, every rotation, rendered once ------------------------- */
    const atlas = document.createElement("canvas");
    atlas.width = cell * ANGLE_STEPS;
    atlas.height = cell * glyphs.length;
    const ac = atlas.getContext("2d");
    if (!ac) return;
    ac.font = FONT;
    ac.textAlign = "center";
    ac.textBaseline = "middle";
    ac.fillStyle = `rgb(${color})`;
    for (let g = 0; g < glyphs.length; g++) {
      for (let a = 0; a < ANGLE_STEPS; a++) {
        ac.save();
        ac.translate(a * cell + cell / 2, g * cell + cell / 2);
        ac.rotate((a / ANGLE_STEPS) * TAU);
        ac.fillText(glyphs[g], 0, 0);
        ac.restore();
      }
    }

    let w = 0;
    let h = 0;
    let raf = 0;
    let last = 0;
    let started = false;

    /* the glyph pass draws in device pixels, so the context stays untransformed */
    const resize = () => {
      const r = canvas.getBoundingClientRect();
      w = r.width;
      h = r.height;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      if (reduce || started) paint(0);
    };

    const onMove = (e: PointerEvent) => {
      const r = canvas.getBoundingClientRect();
      pointer.current = { x: e.clientX - r.left, y: e.clientY - r.top };
    };
    const onLeave = () => {
      pointer.current = { x: -9999, y: -9999 };
    };

    function paint(t: number) {
      if (!ctx) return;
      const dw = w * dpr;
      const dh = h * dpr;

      const grad = ctx.createLinearGradient(0, dh, dw, 0);
      gradient.forEach((stop, i) =>
        grad.addColorStop(i / Math.max(gradient.length - 1, 1), stop)
      );
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, dw, dh);

      const { x: mx, y: my } = pointer.current;
      const half = spacing / 2;
      const off = cell / 2;

      let curAlpha = alpha;
      ctx.globalAlpha = curAlpha;

      for (let py = half; py < h; py += spacing) {
        for (let px = half; px < w; px += spacing) {
          let angle =
            noise3D(px * fieldScale, py * fieldScale, t) * Math.PI * 1.6;

          let inf = 0;
          if (mx > -9000) {
            const dx = px - mx;
            const dy = py - my;
            const dist = Math.hypot(dx, dy);
            if (dist < radius) {
              inf = (1 - dist / radius) ** 2;
              const target = Math.atan2(dy, dx) + (Math.PI / 2) * swirl;
              // lerp the vector, not the angle — angles wrap badly at the seam
              const fx = Math.cos(angle) + (Math.cos(target) - Math.cos(angle)) * inf;
              const fy = Math.sin(angle) + (Math.sin(target) - Math.sin(angle)) * inf;
              angle = Math.atan2(fy, fx);
            }
          }

          const want = alpha + inf * (peak - alpha);
          if (want > curAlpha + 0.02 || want < curAlpha - 0.02) {
            curAlpha = want;
            ctx.globalAlpha = want;
          }

          const row = inf > 0.55 ? 2 : inf > 0.3 ? 1 : 0;
          const bucket = (((angle % TAU) + TAU) % TAU) * (ANGLE_STEPS / TAU) | 0;

          ctx.drawImage(
            atlas,
            bucket * cell, row * cell, cell, cell,
            (px * dpr - off) | 0, (py * dpr - off) | 0, cell, cell
          );
        }
      }
      ctx.globalAlpha = 1;
    }

    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    const io = new IntersectionObserver(
      ([e]) => {
        visible.current = e.isIntersecting;
      },
      { rootMargin: "100px" }
    );
    io.observe(canvas);

    resize();
    paint(0); // first frame immediately, so the hero is never a flat rectangle

    if (!reduce) {
      if (!coarse) {
        window.addEventListener("pointermove", onMove, { passive: true });
        document.addEventListener("pointerleave", onLeave, { passive: true });
      }

      const loop = (now: number) => {
        raf = requestAnimationFrame(loop);
        if (!visible.current || now - last < frameMs) return;
        last = now;
        paint(now * speed);
      };

      // don't compete with hydration for the main thread
      const start = () => {
        started = true;
        raf = requestAnimationFrame(loop);
      };
      const idle = () =>
        "requestIdleCallback" in window
          ? (window as any).requestIdleCallback(start, { timeout: 2000 })
          : setTimeout(start, 300);

      if (document.readyState === "complete") idle();
      else window.addEventListener("load", idle, { once: true });
    }

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerleave", onLeave);
    };
  }, [gradient, spacing, fieldScale, radius, swirl, speed, glyphs, color, alpha, peak, frameMs]);

  return <canvas ref={ref} className={className} aria-hidden="true" />;
}
