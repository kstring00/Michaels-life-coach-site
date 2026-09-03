"use client";

import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from "motion/react";
import { useEffect, useRef, useState } from "react";
import { MaskedLines, Reveal } from "./motion-kit";
import styles from "./Situation.module.css";

const START_GREEN = "#587044";
const LAND_Y = 468;

const leafShapes = {
  a: "M0 -82 C-18 -112 -46 -140 -53 -180 C-61 -226 -35 -272 0 -302 C36 -273 62 -226 53 -180 C45 -139 18 -111 0 -82 Z",
  b: "M0 -82 C-10 -126 -57 -157 -53 -205 C-49 -249 -20 -282 0 -314 C21 -282 49 -248 53 -205 C58 -157 10 -125 0 -82 Z",
  c: "M0 -82 C-9 -104 -28 -124 -51 -136 C-34 -147 -28 -166 -35 -184 C-9 -182 -2 -202 -8 -222 C15 -216 28 -234 27 -254 C48 -243 64 -251 76 -268 C79 -219 67 -177 48 -143 C34 -117 15 -96 0 -82 Z",
} as const;

type LeafConfig = {
  shape: keyof typeof leafShapes;
  scale: number;
  landX: number;
  attachX: number;
  attachY: number;
  final: string;
  mid: string;
  arc: readonly [number, number, number];
  rotations: readonly [number, number, number, number, number];
  blue?: boolean;
};

const desktopLeaves: readonly LeafConfig[] = [
  {
    shape: "a",
    scale: 0.5,
    landX: 115,
    attachX: 430,
    attachY: 154,
    final: "#78964A",
    mid: "#B88D2D",
    arc: [-54, -18, 22],
    rotations: [7, -10, 9, -4, 0],
  },
  {
    shape: "b",
    scale: 0.54,
    landX: 270,
    attachX: 468,
    attachY: 145,
    final: "#C0962F",
    mid: "#C9782D",
    arc: [48, 20, -24],
    rotations: [-8, 11, -9, 5, 0],
  },
  {
    shape: "c",
    scale: 0.5,
    landX: 425,
    attachX: 506,
    attachY: 151,
    final: "#C96B32",
    mid: "#B94E32",
    arc: [-44, 28, 12],
    rotations: [10, -12, 8, -5, 0],
  },
  {
    shape: "a",
    scale: 0.58,
    landX: 580,
    attachX: 544,
    attachY: 143,
    final: "#AB4737",
    mid: "#C06A30",
    arc: [46, -30, -8],
    rotations: [-7, 12, -10, 6, 0],
  },
  {
    shape: "c",
    scale: 0.53,
    landX: 735,
    attachX: 582,
    attachY: 151,
    final: "#7F3040",
    mid: "#A94435",
    arc: [-46, 24, 18],
    rotations: [8, -10, 11, -5, 0],
  },
  {
    shape: "b",
    scale: 0.6,
    landX: 890,
    attachX: 620,
    attachY: 146,
    final: "#1B5CFF",
    mid: "#9C3D39",
    arc: [54, -22, -12],
    rotations: [-9, 10, -8, 5, 0],
    blue: true,
  },
] as const;

const mobileLeaves: readonly LeafConfig[] = [
  { ...desktopLeaves[0], landX: 145, attachX: 448 },
  { ...desktopLeaves[2], landX: 382, attachX: 500 },
  { ...desktopLeaves[3], landX: 618, attachX: 552 },
  { ...desktopLeaves[5], landX: 855, attachX: 604 },
] as const;

function StaticLeafRow({ leaves, className }: { leaves: readonly LeafConfig[]; className: string }) {
  return (
    <svg
      className={`${styles.leaves} ${className}`}
      viewBox="0 0 1000 520"
      role="presentation"
      aria-hidden="true"
      focusable="false"
    >
      {leaves.map((leaf, index) => (
        <g key={index} transform={`translate(${leaf.landX} ${LAND_Y}) scale(${leaf.scale})`}>
          <path className={styles.stem} d="M0 0 L0 -92" />
          <path d={leafShapes[leaf.shape]} fill={leaf.final} />
        </g>
      ))}
    </svg>
  );
}

function AnimatedLeaf({
  leaf,
  index,
  progress,
}: {
  leaf: LeafConfig;
  index: number;
  progress: MotionValue<number>;
}) {
  const start = leaf.blue ? 0.35 : index * 0.07;
  const end = leaf.blue ? 0.98 : Math.min(0.9, start + 0.56);
  const span = end - start;
  const points = [
    start,
    start + span * 0.24,
    start + span * 0.5,
    start + span * 0.76,
    end,
  ];

  const startX = leaf.attachX - leaf.landX;
  const startY = leaf.attachY - LAND_Y;

  const x = useTransform(
    progress,
    points,
    [startX, startX + leaf.arc[0], startX + leaf.arc[1], leaf.arc[2], 0],
    { clamp: true },
  );
  const y = useTransform(
    progress,
    points,
    [startY, startY * 0.8, startY * 0.53, startY * 0.23, 0],
    { clamp: true },
  );
  const rotate = useTransform(progress, points, leaf.rotations, { clamp: true });
  const fill = useTransform(
    progress,
    points,
    [START_GREEN, "#A88431", leaf.mid, leaf.final, leaf.final],
    { clamp: true },
  );

  return (
    <motion.g style={{ x, y, rotate, transformOrigin: "50% 92%" }}>
      <g transform={`translate(${leaf.landX} ${LAND_Y}) scale(${leaf.scale})`}>
        <path className={styles.stem} d="M0 0 L0 -92" />
        <motion.path d={leafShapes[leaf.shape]} style={{ fill }} />
      </g>
    </motion.g>
  );
}

function AnimatedLeafSequence({
  progress,
  leaves,
  className,
}: {
  progress: MotionValue<number>;
  leaves: readonly LeafConfig[];
  className: string;
}) {
  const branchOpacity = useTransform(progress, [0, 0.32, 0.64], [0.38, 0.24, 0]);

  return (
    <svg
      className={`${styles.leaves} ${className}`}
      viewBox="0 0 1000 520"
      role="presentation"
      aria-hidden="true"
      focusable="false"
    >
      <motion.path
        className={styles.branch}
        d="M365 151 C430 128 505 124 575 137 C620 145 660 158 694 177"
        style={{ opacity: branchOpacity }}
      />
      {leaves.map((leaf, index) => (
        <AnimatedLeaf key={`${leaf.shape}-${index}`} leaf={leaf} index={index} progress={progress} />
      ))}
    </svg>
  );
}

export function Situation() {
  const wrapperRef = useRef<HTMLElement>(null);
  const [motionEnabled, setMotionEnabled] = useState(false);
  const { scrollYProgress } = useScroll({
    target: wrapperRef,
    offset: ["start start", "end end"],
  });
  const progress = useSpring(scrollYProgress, {
    stiffness: 60,
    damping: 30,
    mass: 0.6,
  });

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const syncPreference = () => setMotionEnabled(!query.matches);

    syncPreference();
    query.addEventListener("change", syncPreference);
    return () => query.removeEventListener("change", syncPreference);
  }, []);

  return (
    <section ref={wrapperRef} className={styles.section} data-situation-leaves>
      <div className={styles.stage}>
        <div className={`container ${styles.layout}`}>
          <div className={styles.copy}>
            <MaskedLines className={`display ${styles.heading}`} lines={["Something changed."]} />
            <Reveal as="p" className={`body-lg ${styles.body}`}>
              A role changed. A relationship ended. The house got quieter. You are still here—figuring out who you are and what comes next.
            </Reveal>
          </div>

          <div className={styles.visual} aria-hidden="true">
            {motionEnabled ? (
              <>
                <AnimatedLeafSequence progress={progress} leaves={desktopLeaves} className={styles.desktopLeaves} />
                <AnimatedLeafSequence progress={progress} leaves={mobileLeaves} className={styles.mobileLeaves} />
              </>
            ) : (
              <>
                <StaticLeafRow leaves={desktopLeaves} className={styles.desktopLeaves} />
                <StaticLeafRow leaves={mobileLeaves} className={styles.mobileLeaves} />
              </>
            )}
          </div>
        </div>
      </div>
      <noscript>
        <style>{`[data-situation-leaves]{height:auto!important}`}</style>
      </noscript>
    </section>
  );
}
