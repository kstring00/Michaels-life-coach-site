"use client";

import Link from "next/link";
import { motion, useMotionValue, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { Contours } from "./Contours";
import { Portrait } from "./Portrait";

export function ThresholdHero() {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const portraitY = useTransform(scrollYProgress, [0,1], [0, reduced ? 0 : 90]);
  const frameScale = useTransform(scrollYProgress, [0,.8], [1, reduced ? 1 : 1.045]);
  const glowY = useTransform(scrollYProgress, [0,1], [0, -80]);

  const pointer = (e: React.PointerEvent<HTMLElement>) => {
    if (reduced) return;
    const r = e.currentTarget.getBoundingClientRect();
    x.set(((e.clientX-r.left)/r.width-.5)*10);
    y.set(((e.clientY-r.top)/r.height-.5)*8);
  };

  return (
    <section ref={ref} className="hero" onPointerMove={pointer} onPointerLeave={() => {x.set(0);y.set(0)}}>
      <Contours />
      <motion.div className="glow-orbit" style={{ y: glowY }} />
      <div className="container hero-grid">
        <div className="hero-copy">
          <motion.div className="eyebrow hero-kicker" initial={{opacity:0,y:10}} animate={{opacity:1,y:0}} transition={{delay:.12,duration:.5}}>Coaching for the in-between</motion.div>
          <h1 className="display hero-title">
            {[["When the life",.05],["you knew no",.11],["longer ",.17]] .map(([text,delay]) => (
              <span className="line" key={String(text)}><motion.span style={{display:"block"}} initial={reduced?false:{y:"112%"}} animate={{y:0}} transition={{delay:Number(delay),duration:.72,ease:[.16,1,.3,1]}}>{text}</motion.span></span>
            ))}
            <span className="line"><motion.span className="accent" style={{display:"block"}} initial={reduced?false:{y:"112%"}} animate={{y:0}} transition={{delay:.23,duration:.72,ease:[.16,1,.3,1]}}>fits.</motion.span></span>
          </h1>
          <motion.p className="hero-desc" initial={{opacity:0,y:16}} animate={{opacity:1,y:0}} transition={{delay:.52,duration:.6}}>
            GrowthGains helps you navigate the space between who you were and what comes next—without forcing clarity before it is ready.
          </motion.p>
          <motion.div className="hero-actions" initial={{opacity:0,y:14}} animate={{opacity:1,y:0}} transition={{delay:.64,duration:.5}}>
            <Link className="button" href="/consultation">Book a free consultation <span className="arrow">→</span></Link>
            <Link className="button secondary" href="/start">Start coaching <span className="arrow">↗</span></Link>
          </motion.div>
          <motion.div className="hero-note" initial={{opacity:0}} animate={{opacity:1}} transition={{delay:.9}}>Identity · transition · deliberate forward movement</motion.div>
        </div>
        <motion.div className="hero-portrait-wrap" style={{ x, y }}>
          <motion.div className="threshold-frame" style={{ scale: frameScale }} />
          <motion.div className="hero-threshold" style={{ y: portraitY }} initial={reduced?false:{clipPath:"inset(100% 0 0 0)", scale:.98}} animate={{clipPath:"inset(0% 0 0 0)",scale:1}} transition={{delay:.18,duration:1.05,ease:[.16,1,.3,1]}}>
            <Portrait className="hero-image" />
            <div className="hero-index">IDENTITY / TRANSITION / 01</div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
