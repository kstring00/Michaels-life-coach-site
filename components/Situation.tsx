"use client";

import { motion, useScroll, useTransform } from "motion/react";
import { useEffect, useRef, useState, type RefObject } from "react";
import { MaskedLines, Reveal } from "./motion-kit";
import styles from "./Situation.module.css";

const START_GREEN = "#55685C";

const leafShapes = {
  a: "M0 -82 C-18 -112 -46 -140 -53 -180 C-61 -226 -35 -272 0 -302 C36 -273 62 -226 53 -180 C45 -139 18 -111 0 -82 Z",
  b: "M0 -82 C-10 -126 -57 -157 -53 -205 C-49 -249 -20 -282 0 -314 C21 -282 49 -248 53 -205 C58 -157 10 -125 0 -82 Z",
  c: "M0 -82 C-9 -104 -28 -124 -51 -136 C-34 -147 -28 -166 -35 -184 C-9 -182 -2 -202 -8 -222 C15 -216 28 -234 27 -254 C48 -243 64 -251 76 -268 C79 -219 67 -177 48 -143 C34 -117 15 -96 0 -82 Z",
} as const;

const leaves = [
  {
    shape: "a",
    transform: "translate(302 422) rotate(-55) scale(.70)",
    target: "#74806A",
    mobileOptional: false,
    label: ["Career", "change"],
    labelRotation: 35,
  },
  {
    shape: "b",
    transform: "translate(302 422) rotate(-34) scale(.78)",
    target: "#9A7B46",
    mobileOptional: true,
    label: ["Divorce"],
    labelRotation: 24,
  },
  {
    shape: "c",
    transform: "translate(302 422) rotate(-12) scale(.86)",
    target: "#87503E",
    mobileOptional: false,
    label: ["Empty", "nest"],
    labelRotation: 12,
  },
  {
    shape: "a",
    transform: "translate(302 422) rotate(12) scale(.94)",
    target: "#6A343B",
    mobileOptional: true,
    label: ["New", "marriage"],
    labelRotation: -12,
  },
  {
    shape: "b",
    transform: "translate(302 422) rotate(36) scale(1.02)",
    target: "#1B5CFF",
    mobileOptional: false,
    label: ["Next", "chapter"],
    labelRotation: -26,
  },
] as const;

function LeafLabel({ leaf }: { leaf: (typeof leaves)[number] }) {
  return (
    <text
      className={styles.leafLabel}
      x="0"
      y="-194"
      textAnchor="middle"
      transform={`rotate(${leaf.labelRotation} 0 -194)`}
    >
      {leaf.label.map((line, index) => (
        <tspan key={line} x="0" dy={index === 0 ? 0 : 24}>
          {line}
        </tspan>
      ))}
    </text>
  );
}

function StaticLeafFan() {
  return (
    <svg
      className={styles.leaves}
      viewBox="0 0 900 460"
      role="presentation"
      aria-hidden="true"
      focusable="false"
    >
      {leaves.map((leaf, index) => (
        <g
          key={index}
          transform={leaf.transform}
          className={leaf.mobileOptional ? styles.mobileOptional : undefined}
        >
          <path className={styles.stem} d="M0 0 L0 -92" />
          <path d={leafShapes[leaf.shape]} fill={leaf.target} />
          <LeafLabel leaf={leaf} />
        </g>
      ))}
    </svg>
  );
}

function AnimatedLeaf({
  index,
  progress,
}: {
  index: number;
  progress: ReturnType<typeof useScroll>["scrollYProgress"];
}) {
  const leaf = leaves[index];
  const start = index === leaves.length - 1 ? 0.44 : index * 0.11;
  const end = index === leaves.length - 1 ? 0.89 : start + 0.45;
  const fill = useTransform(progress, [start, end], [START_GREEN, leaf.target], { clamp: true });

  return (
    <g
      transform={leaf.transform}
      className={leaf.mobileOptional ? styles.mobileOptional : undefined}
    >
      <path className={styles.stem} d="M0 0 L0 -92" />
      <motion.path d={leafShapes[leaf.shape]} style={{ fill }} />
      <LeafLabel leaf={leaf} />
    </g>
  );
}

function AnimatedLeafFan({ sectionRef }: { sectionRef: RefObject<HTMLElement | null> }) {
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  return (
    <svg
      className={styles.leaves}
      viewBox="0 0 900 460"
      role="presentation"
      aria-hidden="true"
      focusable="false"
    >
      {leaves.map((_, index) => (
        <AnimatedLeaf key={index} index={index} progress={scrollYProgress} />
      ))}
    </svg>
  );
}

export function Situation() {
  const sectionRef = useRef<HTMLElement>(null);
  const [motionEnabled, setMotionEnabled] = useState(false);

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const syncPreference = () => setMotionEnabled(!query.matches);

    syncPreference();
    query.addEventListener("change", syncPreference);
    return () => query.removeEventListener("change", syncPreference);
  }, []);

  return (
    <section ref={sectionRef} className={styles.section}>
      <div className={`container ${styles.layout}`}>
        <div className={styles.copy}>
          <MaskedLines className={`display ${styles.heading}`} lines={["Something changed."]} />
          <Reveal as="p" className={`body-lg ${styles.body}`}>
            A role changed. A relationship ended. The house got quieter. You are still here—figuring out who you are and what comes next.
          </Reveal>
        </div>

        <div className={styles.visual} aria-hidden="true">
          {motionEnabled ? <AnimatedLeafFan sectionRef={sectionRef} /> : <StaticLeafFan />}
        </div>
      </div>
    </section>
  );
}
