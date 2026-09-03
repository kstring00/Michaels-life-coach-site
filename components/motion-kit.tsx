"use client";

/**
 * motion-kit.tsx — GrowthGains motion primitives
 *
 * Install:  npm i motion
 * Import:   import { MaskedLines, Reveal, VelocityMarquee, ParallaxMedia, MagneticButton } from "@/components/motion-kit";
 *
 * Design rules baked in:
 *   - travel distance stays under 24px (long slides read cheap)
 *   - expo-out easing, never the library defaults
 *   - slow durations (0.7-0.9s) for display type
 *   - transform + opacity only
 *   - prefers-reduced-motion collapses everything to a static render
 *
 * Reduced motion is handled in CSS, not by branching on useReducedMotion().
 * That hook reads `prefersReducedMotion.current`, which is null during server
 * render, into a useState that never resubscribes. Under SSR the server emits
 * the animated branch (opacity:0 inline) and the client's first render returns
 * the static branch, so React hydrates a tree mismatch, keeps the server's
 * inline style, and the content stays invisible forever. Entry animations are
 * therefore always rendered and neutralised by the [data-mk="reveal"] rule in
 * globals.css, which the browser resolves at first paint with no JS involved.
 */

import {
  motion,
  useScroll,
  useVelocity,
  useSpring,
  useTransform,
  useMotionValue,
  useAnimationFrame,
  useReducedMotion,
  type MotionValue,
} from "motion/react";
import { useRef, type ReactNode, type CSSProperties } from "react";

/* ---------------------------------------------------------------- tokens -- */

export const ease = {
  /** expo-out. the workhorse. confident, decelerates hard. */
  out: [0.16, 1, 0.3, 1] as const,
  /** slightly softer, for smaller UI elements */
  soft: [0.22, 1, 0.36, 1] as const,
  /** symmetric, only for things that move both ways (accordions) */
  inOut: [0.65, 0, 0.35, 1] as const,
};

export const dur = {
  display: 0.9, // hero + section headings
  body: 0.7, // paragraphs, list rows
  ui: 0.35, // buttons, hovers, toggles
};

/** shared viewport config: start resolving BEFORE the element is centered */
const viewport = { once: true, amount: 0.2, margin: "0px 0px -12% 0px" };

/* ------------------------------------------------------------ MaskedLines --
 * The money shot. Each line slides up out of its own clipping box.
 * Pass lines pre-split — you're hand-writing these headings anyway, and
 * hardcoded breaks give you control over the rag that auto-splitting won't.
 *
 *   <MaskedLines
 *     as="h1"
 *     lines={["When the life you knew no", "longer fits."]}
 *     className="font-serif text-[clamp(3rem,7vw,6.5rem)] leading-[0.95]"
 *   />
 */
export function MaskedLines({
  lines,
  as: Tag = "h2",
  className = "",
  stagger = 0.07,
  delay = 0,
  immediate = false, // true for above-the-fold: animates on mount, not scroll
}: {
  lines: string[];
  as?: any;
  className?: string;
  stagger?: number;
  delay?: number;
  immediate?: boolean;
}) {
  // indexing motion by tag name exceeds TS union depth; the tag is validated by callers
  const MotionTag: any = motion[Tag as keyof typeof motion] ?? motion.h2;

  const trigger = immediate
    ? { animate: "show" as const }
    : { whileInView: "show" as const, viewport };

  return (
    <MotionTag
      className={className}
      initial="hidden"
      {...trigger}
      variants={{
        hidden: {},
        show: { transition: { staggerChildren: stagger, delayChildren: delay } },
      }}
    >
      {lines.map((line, i) => (
        <span
          key={i}
          style={{
            display: "block",
            overflow: "hidden",
            // descenders (g, y, p) get clipped without this pair
            paddingBottom: "0.14em",
            marginBottom: "-0.14em",
          }}
        >
          <motion.span
            data-mk="reveal"
            style={{ display: "block", willChange: "transform" }}
            variants={{
              hidden: { y: "110%" },
              show: {
                y: "0%",
                transition: { duration: dur.display, ease: ease.out },
              },
            }}
          >
            {line}
          </motion.span>
        </span>
      ))}
    </MotionTag>
  );
}

/* ----------------------------------------------------------------- Reveal --
 * General purpose. Use for paragraphs, images, list rows.
 * Wrap a group and pass `stagger` to cascade the children.
 */
export function Reveal({
  children,
  className,
  y = 20,
  delay = 0,
  duration = dur.body,
  stagger,
  as: Tag = "div",
}: {
  children: ReactNode;
  className?: string;
  y?: number;
  delay?: number;
  duration?: number;
  stagger?: number;
  as?: any;
}) {
  // indexing motion by tag name exceeds TS union depth; the tag is validated by callers
  const MotionTag: any = motion[Tag as keyof typeof motion] ?? motion.div;

  if (stagger) {
    return (
      <MotionTag
        className={className}
        initial="hidden"
        whileInView="show"
        viewport={viewport}
        variants={{
          hidden: {},
          show: { transition: { staggerChildren: stagger, delayChildren: delay } },
        }}
      >
        {children}
      </MotionTag>
    );
  }

  return (
    <MotionTag
      className={className}
      data-mk="reveal"
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={viewport}
      transition={{ duration, ease: ease.out, delay }}
    >
      {children}
    </MotionTag>
  );
}

/** child of a <Reveal stagger={...}> group */
export function RevealItem({
  children,
  className,
  y = 20,
  as: Tag = "div",
}: {
  children: ReactNode;
  className?: string;
  y?: number;
  as?: any;
}) {
  // indexing motion by tag name exceeds TS union depth; the tag is validated by callers
  const MotionTag: any = motion[Tag as keyof typeof motion] ?? motion.div;

  return (
    <MotionTag
      className={className}
      data-mk="reveal"
      variants={{
        hidden: { opacity: 0, y },
        show: { opacity: 1, y: 0, transition: { duration: dur.body, ease: ease.out } },
      }}
    >
      {children}
    </MotionTag>
  );
}

/* -------------------------------------------------------- VelocityMarquee --
 * Drifts on its own. Accelerates with scroll speed. Reverses on scroll-up.
 * This is the upgrade over a CSS keyframe loop — it feels like physics.
 *
 *   <VelocityMarquee baseVelocity={-3}>
 *     <MarqueeItem>Career</MarqueeItem>
 *     <MarqueeItem>Parenthood</MarqueeItem>
 *   </VelocityMarquee>
 *
 * NOTE: cut this list to 3 items. Eight domains says "I coach everything."
 */
function wrap(min: number, max: number, v: number) {
  const range = max - min;
  return ((((v - min) % range) + range) % range) + min;
}

export function VelocityMarquee({
  children,
  baseVelocity = -3,
  className = "",
  copies = 4,
}: {
  children: ReactNode;
  baseVelocity?: number;
  className?: string;
  copies?: number;
}) {
  const reduce = useReducedMotion();
  const baseX = useMotionValue(0);
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);

  const smooth = useSpring(scrollVelocity, {
    damping: 50,
    stiffness: 400,
  });

  // clamp:false lets fast scrolls push past the mapped range
  const velocityFactor = useTransform(smooth, [0, 1000], [0, 4], {
    clamp: false,
  });

  const wrapEnd = -(100 / copies);
  const x = useTransform(baseX, (v) => `${wrap(2 * wrapEnd, wrapEnd, v)}%`);

  const direction = useRef(1);

  useAnimationFrame((_, delta) => {
    if (reduce) return;
    let moveBy = direction.current * baseVelocity * (delta / 1000);

    const vf = velocityFactor.get();
    if (vf < 0) direction.current = -1;
    else if (vf > 0) direction.current = 1;

    moveBy += moveBy * vf;
    baseX.set(baseX.get() + moveBy);
  });

  return (
    <div
      className={className}
      style={{ overflow: "hidden", whiteSpace: "nowrap", display: "flex" }}
    >
      <motion.div
        style={{ x, display: "flex", willChange: "transform" }}
        aria-hidden={copies > 1 ? undefined : false}
      >
        {Array.from({ length: copies }).map((_, i) => (
          <div key={i} style={{ display: "flex" }} aria-hidden={i > 0}>
            {children}
          </div>
        ))}
      </motion.div>
    </div>
  );
}

export function MarqueeItem({
  children,
  style,
}: {
  children: ReactNode;
  style?: CSSProperties;
}) {
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        paddingInline: "2.5rem",
        flexShrink: 0,
        ...style,
      }}
    >
      {children}
    </span>
  );
}

/* ---------------------------------------------------------- ParallaxMedia --
 * Image drifts slower than the page. Keep `range` small — 40-80px.
 * Anything larger and it reads as a gimmick.
 * The wrapper must have overflow:hidden and the img must overflow it slightly.
 */
export function ParallaxMedia({
  children,
  range = 60,
  className = "",
}: {
  children: ReactNode;
  range?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [-range, range]);

  return (
    <div ref={ref} className={className} style={{ overflow: "hidden" }}>
      <motion.div
        style={{
          y: reduce ? 0 : (y as MotionValue<number>),
          // grow past the mask so parallax never exposes an edge
          height: `calc(100% + ${range * 2}px)`,
          marginTop: -range,
          willChange: "transform",
        }}
      >
        {children}
      </motion.div>
    </div>
  );
}

/* --------------------------------------------------------- MagneticButton --
 * Cursor-following pull on the primary CTA. Use on ONE button, not all of them.
 * Spend the boldness in one place.
 */
export function MagneticButton({
  children,
  className = "",
  strength = 0.25,
  onClick,
}: {
  children: ReactNode;
  className?: string;
  strength?: number;
  onClick?: () => void;
}) {
  const ref = useRef<HTMLButtonElement>(null);
  const reduce = useReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 260, damping: 22, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 260, damping: 22, mass: 0.4 });

  return (
    <motion.button
      ref={ref}
      className={className}
      onClick={onClick}
      style={{ x: reduce ? 0 : sx, y: reduce ? 0 : sy }}
      onPointerMove={(e) => {
        if (reduce) return;
        const r = ref.current?.getBoundingClientRect();
        if (!r) return;
        x.set((e.clientX - (r.left + r.width / 2)) * strength);
        y.set((e.clientY - (r.top + r.height / 2)) * strength);
      }}
      onPointerLeave={() => {
        x.set(0);
        y.set(0);
      }}
      whileTap={{ scale: 0.97, transition: { duration: 0.12 } }}
    >
      {children}
    </motion.button>
  );
}
