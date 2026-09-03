"use client";

import { motion, useScroll, useTransform, type MotionValue } from "motion/react";
import { useRef } from "react";
import styles from "./Situation.module.css";

const seasons = [
  {
    name: "Winter",
    eyebrow: "An ending",
    title: "The old structure goes quiet.",
    copy:
      "A role, relationship or direction can end before you know what replaces it. The silence after it can feel like losing part of yourself.",
  },
  {
    name: "Spring",
    eyebrow: "An emergence",
    title: "New questions arrive before answers.",
    copy:
      "The next chapter often begins as a possibility rather than a plan. Something in you is changing before you have language for what it is becoming.",
  },
  {
    name: "Summer",
    eyebrow: "An inhabiting",
    title: "Growth can change you, too.",
    copy:
      "Marriage, a new role, a new responsibility or a long-awaited opportunity can still ask you to become someone you have never had to be before.",
  },
  {
    name: "Autumn",
    eyebrow: "A release",
    title: "Not everything belongs in the next season.",
    copy:
      "Some transitions ask you to carry what still matters and let the rest become part of the chapter that shaped you rather than the one that defines you.",
  },
] as const;

const flakes = [8, 19, 31, 44, 58, 72, 84, 94] as const;
const petals = [12, 25, 39, 51, 66, 79, 90] as const;
const leaves = [10, 23, 37, 49, 63, 77, 89] as const;

function SeasonCopy({
  season,
  index,
  progress,
}: {
  season: (typeof seasons)[number];
  index: number;
  progress: MotionValue<number>;
}) {
  const start = index / seasons.length;
  const end = (index + 1) / seasons.length;
  const local = useTransform(progress, [start, end], [0, 1], { clamp: true });
  const opacity = useTransform(
    local,
    index === 0 ? [0, 0.78, 0.96, 1] : index === seasons.length - 1 ? [0, 0.08, 1] : [0, 0.08, 0.82, 0.96],
    index === 0 ? [1, 1, 1, 0] : index === seasons.length - 1 ? [0, 1, 1] : [0, 1, 1, 0],
  );
  const y = useTransform(local, [0, 0.12, 0.86, 1], [18, 0, 0, -18]);

  return (
    <motion.article className={styles.seasonCopy} style={{ opacity, y }}>
      <div className={styles.seasonMeta}>
        <span>0{index + 1}</span>
        <span>{season.name}</span>
      </div>
      <div className={styles.eyebrow}>{season.eyebrow}</div>
      <h3>{season.title}</h3>
      <p>{season.copy}</p>
    </motion.article>
  );
}

export function Situation() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  const winter = useTransform(scrollYProgress, [0, 0.18, 0.29], [1, 1, 0]);
  const spring = useTransform(scrollYProgress, [0.16, 0.28, 0.43, 0.54], [0, 1, 1, 0]);
  const summer = useTransform(scrollYProgress, [0.42, 0.54, 0.68, 0.79], [0, 1, 1, 0]);
  const autumn = useTransform(scrollYProgress, [0.68, 0.8, 1], [0, 1, 1]);

  const snowOpacity = useTransform(scrollYProgress, [0, 0.17, 0.27], [0.72, 0.72, 0]);
  const blossomOpacity = useTransform(scrollYProgress, [0.17, 0.3, 0.46, 0.54], [0, 0.7, 0.42, 0]);
  const summerMoteOpacity = useTransform(scrollYProgress, [0.43, 0.56, 0.7, 0.78], [0, 0.7, 0.55, 0]);
  const leafOpacity = useTransform(scrollYProgress, [0.68, 0.82, 1], [0, 0.82, 0.72]);

  const springLeaves = useTransform(scrollYProgress, [0.16, 0.29, 0.47, 0.55], [0, 0.58, 0.42, 0]);
  const summerLeaves = useTransform(scrollYProgress, [0.42, 0.55, 0.71, 0.8], [0, 0.95, 0.88, 0]);
  const autumnLeaves = useTransform(scrollYProgress, [0.68, 0.8, 1], [0, 0.92, 0.68]);

  const sunX = useTransform(scrollYProgress, [0, 0.33, 0.66, 1], [70, 15, -5, 46]);
  const sunY = useTransform(scrollYProgress, [0, 0.33, 0.66, 1], [22, -12, -32, -6]);
  const sunScale = useTransform(scrollYProgress, [0, 0.33, 0.66, 1], [0.65, 0.9, 1.2, 0.82]);
  const progressFill = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section ref={ref} className={styles.section} aria-label="The seasons of life">
      <div className={styles.stage}>
        <div className={styles.atmosphere} aria-hidden="true">
          <motion.div className={`${styles.seasonLayer} ${styles.winter}`} style={{ opacity: winter }} />
          <motion.div className={`${styles.seasonLayer} ${styles.spring}`} style={{ opacity: spring }} />
          <motion.div className={`${styles.seasonLayer} ${styles.summer}`} style={{ opacity: summer }} />
          <motion.div className={`${styles.seasonLayer} ${styles.autumn}`} style={{ opacity: autumn }} />
          <div className={styles.flowLines} />
        </div>

        <div className={`container ${styles.layout}`}>
          <div className={styles.copyColumn}>
            <div className={styles.kicker}>Seasons of life</div>
            <h2>Something changed.</h2>
            <p className={styles.lead}>
              Life rarely changes all at once. More often, one season stops fitting before the next one has a name.
            </p>

            <div className={styles.copyStack}>
              {seasons.map((season, index) => (
                <SeasonCopy key={season.name} season={season} index={index} progress={scrollYProgress} />
              ))}
            </div>
          </div>

          <div className={styles.visual} aria-hidden="true">
            <motion.div className={styles.sun} style={{ x: sunX, y: sunY, scale: sunScale }} />

            <svg className={styles.tree} viewBox="0 0 560 680" role="presentation">
              <g className={styles.trunk}>
                <path d="M282 650 C282 560 276 480 286 390 C292 335 287 275 277 220" />
                <path d="M285 421 C244 380 216 333 187 277" />
                <path d="M283 381 C330 342 363 301 392 246" />
                <path d="M279 318 C247 286 224 246 211 203" />
                <path d="M293 307 C324 279 347 244 360 204" />
                <path d="M211 277 C177 251 150 219 133 181" />
                <path d="M392 246 C424 221 449 188 465 153" />
                <path d="M187 277 C193 239 186 205 168 168" />
                <path d="M360 204 C365 169 359 137 347 108" />
              </g>

              <motion.g className={`${styles.canopy} ${styles.springCanopy}`} style={{ opacity: springLeaves }}>
                <circle cx="172" cy="177" r="52" /><circle cx="229" cy="143" r="56" />
                <circle cx="289" cy="132" r="61" /><circle cx="355" cy="150" r="58" />
                <circle cx="413" cy="184" r="51" /><circle cx="324" cy="204" r="58" />
                <circle cx="232" cy="215" r="57" />
              </motion.g>

              <motion.g className={`${styles.canopy} ${styles.summerCanopy}`} style={{ opacity: summerLeaves }}>
                <circle cx="151" cy="174" r="70" /><circle cx="217" cy="126" r="76" />
                <circle cx="291" cy="112" r="84" /><circle cx="369" cy="129" r="80" />
                <circle cx="432" cy="177" r="70" /><circle cx="384" cy="223" r="74" />
                <circle cx="300" cy="224" r="83" /><circle cx="215" cy="224" r="77" />
              </motion.g>

              <motion.g className={`${styles.canopy} ${styles.autumnCanopy}`} style={{ opacity: autumnLeaves }}>
                <circle cx="164" cy="180" r="64" /><circle cx="225" cy="137" r="67" />
                <circle cx="294" cy="125" r="72" /><circle cx="366" cy="143" r="68" />
                <circle cx="422" cy="185" r="60" /><circle cx="360" cy="215" r="64" />
                <circle cx="274" cy="220" r="70" /><circle cx="209" cy="220" r="62" />
              </motion.g>
            </svg>

            <motion.div className={styles.snow} style={{ opacity: snowOpacity }}>
              {flakes.map((left, i) => <i key={left} style={{ left: `${left}%`, animationDelay: `${-i * 0.7}s` }} />)}
            </motion.div>

            <motion.div className={styles.petals} style={{ opacity: blossomOpacity }}>
              {petals.map((left, i) => <i key={left} style={{ left: `${left}%`, animationDelay: `${-i * 0.9}s` }} />)}
            </motion.div>

            <motion.div className={styles.motes} style={{ opacity: summerMoteOpacity }}>
              {petals.map((left, i) => <i key={left} style={{ left: `${left}%`, animationDelay: `${-i * 1.1}s` }} />)}
            </motion.div>

            <motion.div className={styles.fallingLeaves} style={{ opacity: leafOpacity }}>
              {leaves.map((left, i) => <i key={left} style={{ left: `${left}%`, animationDelay: `${-i * 0.8}s` }} />)}
            </motion.div>

            <div className={styles.horizon} />
            <div className={styles.visualCaption}>The work often happens between seasons.</div>
          </div>
        </div>

        <div className={styles.timeline} aria-hidden="true">
          <div className={styles.timelineTrack}><motion.i style={{ width: progressFill }} /></div>
          <div className={styles.timelineLabels}>
            {seasons.map((season) => <span key={season.name}>{season.name}</span>)}
          </div>
        </div>
      </div>
    </section>
  );
}
