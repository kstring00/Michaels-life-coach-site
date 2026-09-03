"use client";

import { motion, useScroll, useTransform, type MotionValue } from "motion/react";
import { useRef } from "react";
import styles from "./FrameworkJourney.module.css";

const items = [
  {
    phase: "Notice",
    title: "Name what changed",
    summary:
      "Slow the transition down enough to see what is actually different—not just what feels uncomfortable.",
    focus: [
      "What changed on the outside?",
      "What feels different on the inside?",
      "Which part of the old chapter are you actually grieving or outgrowing?",
    ],
    question:
      "Are you missing the role itself, the rhythm it gave you, or the version of yourself that role reinforced?",
    outcome: "A clearer description of the transition before trying to solve it.",
  },
  {
    phase: "Untangle",
    title: "Separate role from identity",
    summary:
      "Look at the roles, expectations and stories that have been carrying more weight than they should.",
    focus: [
      "What belongs to you versus the role?",
      "Which expectations are inherited rather than chosen?",
      "What can end without taking your whole identity with it?",
    ],
    question:
      "If the title, relationship, routine or responsibility disappeared, what would still be true about you?",
    outcome: "Less noise around what deserves to carry forward and what can be released.",
  },
  {
    phase: "Reorient",
    title: "Find what still matters",
    summary:
      "Clarify values, needs and direction without rushing to replace the old chapter with a new performance.",
    focus: [
      "What matters now—not five years ago?",
      "What needs more room in this season?",
      "Which values should guide the next decision?",
    ],
    question:
      "What would you choose if the old answer were no longer making the decision for you?",
    outcome: "A smaller set of principles you can use to make real decisions.",
  },
  {
    phase: "Move",
    title: "Act with intention",
    summary:
      "Choose practical next steps that reflect what you are learning about yourself and where you want to go.",
    focus: [
      "What conversation needs to happen?",
      "What small experiment could create useful information?",
      "What can you do now without pretending the whole future is settled?",
    ],
    question:
      "What next action would teach you something useful rather than force you to prove everything at once?",
    outcome: "Movement with ownership instead of a rushed reinvention.",
  },
] as const;

function Chapter({
  item,
  index,
  progress,
}: {
  item: (typeof items)[number];
  index: number;
  progress: MotionValue<number>;
}) {
  const start = index / items.length;
  const end = (index + 1) / items.length;
  const local = useTransform(progress, [start, end], [0, 1], { clamp: true });

  const opacity = useTransform(
    local,
    index === 0
      ? [0, 0.72, 0.96, 1]
      : index === items.length - 1
        ? [0, 0.08, 1]
        : [0, 0.08, 0.78, 0.96],
    index === 0 ? [1, 1, 1, 0] : index === items.length - 1 ? [0, 1, 1] : [0, 1, 1, 0],
  );

  const y = useTransform(local, [0, 0.12, 0.78, 1], [28, 0, 0, -28]);
  const scale = useTransform(local, [0, 0.18, 0.72, 1], [0.985, 1, 1, 1.018]);
  const leftX = useTransform(local, [0, 0.18, 0.78, 1], [-18, 0, 0, -10]);
  const rightX = useTransform(local, [0, 0.22, 0.82, 1], [18, 0, 0, 10]);
  const ringScale = useTransform(local, [0, 0.14, 0.56, 0.86, 1], [0.72, 1, 1.2, 1, 0.72]);
  const ringOpacity = useTransform(local, [0, 0.1, 0.84, 1], [0, 1, 1, 0]);

  const detailOne = useTransform(local, [0, 0.18, 0.3, 0.9, 1], [0, 0, 1, 1, 0]);
  const detailTwo = useTransform(local, [0, 0.34, 0.46, 0.9, 1], [0, 0, 1, 1, 0]);
  const detailThree = useTransform(local, [0, 0.5, 0.62, 0.9, 1], [0, 0, 1, 1, 0]);

  return (
    <motion.article
      className={styles.scene}
      style={{ opacity, y, scale }}
      aria-labelledby={`approach-phase-${index}`}
    >
      <motion.div className={styles.left} style={{ x: leftX }}>
        <div className={styles.phase}>0{index + 1} / {item.phase}</div>
        <h3 id={`approach-phase-${index}`}>{item.title}</h3>
        <p className={styles.summary}>{item.summary}</p>
      </motion.div>

      <div className={styles.center} aria-hidden="true">
        <motion.div className={styles.ring} style={{ scale: ringScale, opacity: ringOpacity }} />
        <div className={styles.node}><span>0{index + 1}</span></div>
      </div>

      <motion.div className={styles.right} style={{ x: rightX }}>
        <motion.div className={styles.detail} style={{ opacity: detailOne }}>
          <span className={styles.detailLabel}>Look closer</span>
          <ul>
            {item.focus.map((point) => <li key={point}>{point}</li>)}
          </ul>
        </motion.div>
        <motion.div className={styles.detail} style={{ opacity: detailTwo }}>
          <span className={styles.detailLabel}>A question we might use</span>
          <p className={styles.question}>“{item.question}”</p>
        </motion.div>
        <motion.div className={styles.detail} style={{ opacity: detailThree }}>
          <span className={styles.detailLabel}>What this phase gives you</span>
          <p>{item.outcome}</p>
        </motion.div>
      </motion.div>
    </motion.article>
  );
}

export function FrameworkJourney() {
  const trackRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ["start start", "end end"],
  });

  return (
    <section className={`framework ${styles.frameworkStory}`}>
      <div className={styles.ambientLines} aria-hidden="true">
        <i /><i /><i /><i /><i />
      </div>

      <div className="container">
        <div className={styles.intro}>
          <div>
            <div className="eyebrow" style={{ color: "#9fc8ff" }}>The GrowthGains approach</div>
            <h2 className="display">Clarity is not a lightning bolt. It is built through better questions.</h2>
          </div>
          <p className="body-lg">
            This is not a rigid clinical protocol or a promise that change follows four perfect steps.
            It is the rhythm the coaching conversation is designed to support.
          </p>
        </div>
      </div>

      <div ref={trackRef} className={styles.track}>
        <div className={styles.stage}>
          <div className={styles.rail} aria-hidden="true">
            <div className={styles.railBase} />
            <motion.div className={styles.railFill} style={{ scaleY: scrollYProgress }} />
            <div className={styles.depthLabel}>DEEPER</div>
          </div>

          <div className={`container ${styles.sceneContainer}`}>
            {items.map((item, index) => (
              <Chapter key={item.phase} item={item} index={index} progress={scrollYProgress} />
            ))}
          </div>

          <div className={styles.scrollCue} aria-hidden="true">
            <span>Scroll through the approach</span>
            <i />
          </div>
        </div>
      </div>
    </section>
  );
}
