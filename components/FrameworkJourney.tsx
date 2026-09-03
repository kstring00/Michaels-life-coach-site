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
    fit:
      "You may be here if something in your life has changed, but you still cannot quite name why the old way of living no longer feels like it fits.",
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
    fit:
      "You may be here if you know what ended or changed, but you are unsure who you are without the title, relationship, routine or responsibility attached to it.",
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
    fit:
      "You may be here if the old goals no longer feel convincing, yet you do not want to choose a new direction simply to escape the discomfort of not knowing.",
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
    fit:
      "You may be here if you have begun to see what matters, but keep waiting for complete certainty before making the next conversation, decision or experiment real.",
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

  // The middle of each chapter is intentionally long and quiet. Animation is
  // concentrated at the edges so the page behaves like a reading experience,
  // not a continuous transition reel.
  const opacity = useTransform(
    local,
    index === 0
      ? [0, 0.86, 0.97, 1]
      : index === items.length - 1
        ? [0, 0.06, 1]
        : [0, 0.06, 0.88, 0.98],
    index === 0 ? [1, 1, 1, 0] : index === items.length - 1 ? [0, 1, 1] : [0, 1, 1, 0],
  );

  const y = useTransform(local, [0, 0.08, 0.9, 1], [14, 0, 0, -14]);
  const scale = useTransform(local, [0, 0.1, 0.9, 1], [0.994, 1, 1, 1.006]);
  const leftX = useTransform(local, [0, 0.1, 0.9, 1], [-8, 0, 0, -5]);
  const rightX = useTransform(local, [0, 0.1, 0.9, 1], [8, 0, 0, 5]);
  const ringScale = useTransform(local, [0, 0.1, 0.78, 0.94, 1], [0.88, 1, 1.08, 1, 0.88]);
  const ringOpacity = useTransform(local, [0, 0.07, 0.9, 1], [0, 1, 1, 0]);

  // Get the information on screen early, then leave it alone for most of the
  // chapter. This gives visitors time to read and recognize themselves in it.
  const fitOpacity = useTransform(local, [0, 0.07, 0.14, 0.92, 1], [0, 0, 1, 1, 0]);
  const focusOpacity = useTransform(local, [0, 0.12, 0.19, 0.92, 1], [0, 0, 1, 1, 0]);
  const questionOpacity = useTransform(local, [0, 0.17, 0.24, 0.92, 1], [0, 0, 1, 1, 0]);
  const outcomeOpacity = useTransform(local, [0, 0.22, 0.29, 0.92, 1], [0, 0, 1, 1, 0]);

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
        <p className={styles.readPrompt}>Stay with this phase for a moment. Does it sound like where you are?</p>
      </motion.div>

      <div className={styles.center} aria-hidden="true">
        <motion.div className={styles.ring} style={{ scale: ringScale, opacity: ringOpacity }} />
        <div className={styles.node}><span>0{index + 1}</span></div>
      </div>

      <motion.div className={styles.right} style={{ x: rightX }}>
        <motion.div className={`${styles.detail} ${styles.fitDetail}`} style={{ opacity: fitOpacity }}>
          <span className={styles.detailLabel}>You may be here if</span>
          <p className={styles.fitCopy}>{item.fit}</p>
        </motion.div>

        <motion.div className={styles.detail} style={{ opacity: focusOpacity }}>
          <span className={styles.detailLabel}>What we would explore</span>
          <ul>
            {item.focus.map((point) => <li key={point}>{point}</li>)}
          </ul>
        </motion.div>

        <motion.div className={styles.detail} style={{ opacity: questionOpacity }}>
          <span className={styles.detailLabel}>A question we might use</span>
          <p className={styles.question}>“{item.question}”</p>
        </motion.div>

        <motion.div className={styles.detail} style={{ opacity: outcomeOpacity }}>
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
            Move through it slowly and notice which phase sounds most like the season you are in now.
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
            <span>Read each phase · scroll when ready</span>
            <i />
          </div>
        </div>
      </div>
    </section>
  );
}
