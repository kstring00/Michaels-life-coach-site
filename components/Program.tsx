"use client";

import Link from "next/link";
import { useLayoutEffect, useRef, useState } from "react";
import styles from "./Program.module.css";

const format = [
  ["Fully virtual", "We meet wherever you are."],
  ["60-minute sessions", "An hour to slow down and do the work."],
  ["12-week program", "Enough time to build real momentum."],
] as const;

const arc = [
  {
    label: "Consultation & intake",
    copy: "We start with a conversation. I want to understand what is going on in your life, what you want help with, and whether I am the right coach for you.",
    outcome: "No pressure — we see if it fits",
  },
  {
    label: "Pre-session clarity",
    copy: "Before our first session, I will send you a few short videos so you know what to expect and we can spend our time talking about you, not logistics.",
    outcome: "You will know what to expect",
  },
  {
    label: "Session one",
    copy: "In our first session, we will get clear on what you want to understand, what you want to change, and what meaningful progress would look like for you.",
    outcome: "You leave with a direction",
  },
  {
    label: "Weeks two through twelve",
    copy: "From there, we keep building. I will ask questions, help you notice patterns, challenge your thinking when needed, and help you turn insight into practical action.",
    outcome: "The work keeps moving",
  },
] as const;

const tools = [
  ["Reflection questions & exercises", "Prompts to keep thinking between sessions."],
  ["Written SMART goals", "Your next steps, put in writing."],
  ["A personal blueprint", "A map of what you are learning about yourself."],
  ["Journaling", "A place to process what is changing."],
  ["Between-session access", "You can reach out when something comes up."],
] as const;

/* The read line: a station lights when its node crosses this fraction of the
   viewport. Everything below derives from it, so the fill line and the lit
   stations can never disagree about where the reader is. */
const READ_LINE = 0.66;

export function Program() {
  const spineRef = useRef<HTMLDivElement>(null);
  const railFillRef = useRef<HTMLSpanElement>(null);
  const nodesRef = useRef<HTMLElement[]>([]);
  // one entry per station plus the terminus
  const [lit, setLit] = useState<boolean[]>(() => new Array(arc.length + 1).fill(false));
  // mirrors `lit` so measure() can diff without re-subscribing the listener
  const litRef = useRef<boolean[]>(new Array(arc.length + 1).fill(false));

  // useLayoutEffect so the first measurement lands before paint: the server
  // renders everything unlit, and without this the section would flash dim.
  useLayoutEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      litRef.current = new Array(arc.length + 1).fill(true);
      setLit(litRef.current);
      if (railFillRef.current) railFillRef.current.style.height = "100%";
      return;
    }

    let queued = false;
    // reused between measurements so scrolling allocates nothing
    const next: boolean[] = new Array(arc.length + 1).fill(false);

    const measure = () => {
      queued = false;
      const spine = spineRef.current;
      const fill = railFillRef.current;
      if (!spine || !fill) return;

      const readLine = window.innerHeight * READ_LINE;
      const rect = spine.getBoundingClientRect();
      const height = Math.max(0, Math.min(readLine - rect.top, rect.height));
      fill.style.height = `${height}px`;

      let changed = false;
      for (let i = 0; i < next.length; i++) {
        const node = nodesRef.current[i];
        // recomputed from the live position every time, so scrolling back up
        // un-lights rather than latching at max-scroll-reached
        const on = node ? node.getBoundingClientRect().top <= readLine : false;
        next[i] = on;
        if (on !== litRef.current[i]) changed = true;
      }
      if (changed) {
        litRef.current = next.slice();
        setLit(litRef.current);
      }
    };

    const onScroll = () => {
      if (queued) return;
      queued = true;
      requestAnimationFrame(measure);
    };

    measure();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  const setNode = (i: number) => (el: HTMLElement | null) => {
    if (el) nodesRef.current[i] = el;
  };

  return (
    <section className={styles.section} aria-labelledby="program-heading">
      {/* Without JS nothing ever lights, so the whole section is forced on. */}
      <noscript>
        <style>{`.${styles.panel},.${styles.stub},.${styles.node},.${styles.deliverables}{opacity:1!important;transform:none!important}`}</style>
      </noscript>

      <div className={styles.inner}>
        <header className={styles.head}>
          <p className={styles.kicker}>The coaching journey</p>
          <h2 className={styles.title} id="program-heading">Twelve weeks, four stations.</h2>
          <p className={styles.lede}>
            I built this 12-week process around the way I coach: understand the whole person,
            get clear on what matters, and turn that clarity into practical movement.
          </p>

          <figure className={styles.philosophy}>
            <blockquote>
              “I can help guide your journey, but I can’t take the journey for you.”
            </blockquote>
            <figcaption>My coaching philosophy</figcaption>
          </figure>
        </header>

        <ul className={styles.meta}>
          {format.map(([label, note]) => (
            <li key={label}>
              {/* label is a block so it sits on its own line — these used to be
                  two inline elements and rendered as "Fully virtualWe meet…" */}
              <strong>{label}</strong>
              <span>{note}</span>
            </li>
          ))}
        </ul>

        <div className={styles.spine} ref={spineRef}>
          <div className={styles.rail} aria-hidden="true">
            <span className={styles.railFill} ref={railFillRef} />
          </div>

          <ol className={styles.stations}>
            {arc.map((step, i) => (
              <li
                key={step.label}
                className={`${styles.station} ${i % 2 === 0 ? styles.left : styles.right} ${lit[i] ? styles.isLit : ""}`}
              >
                <div className={styles.node} aria-hidden="true" ref={setNode(i)}>
                  <span>{String(i + 1).padStart(2, "0")}</span>
                </div>
                <span className={styles.stub} aria-hidden="true" />
                <article className={styles.panel}>
                  <h3>{step.label}</h3>
                  <p>{step.copy}</p>
                  <p className={styles.outcome}>{step.outcome}</p>
                </article>
              </li>
            ))}
          </ol>

          <div className={`${styles.terminus} ${lit[arc.length] ? styles.isLit : ""}`}>
            <div
              className={`${styles.node} ${styles.nodeEnd}`}
              aria-hidden="true"
              ref={setNode(arc.length)}
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
                strokeLinecap="round" strokeLinejoin="round">
                <path d="m5 12.5 4.5 4.5L19 7.5" />
              </svg>
            </div>
          </div>
        </div>

        <div className={`${styles.deliverables} ${lit[arc.length] ? styles.isLit : ""}`}>
          <h3>What you walk away with</h3>
          <ul>
            {tools.map(([name, note]) => (
              <li key={name}>
                <span className={styles.dot} aria-hidden="true" />
                <strong>{name}</strong>
                <span>{note}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className={styles.closing}>
          <p>Twelve weeks from now, the question you are sitting with could be a decision you already made.</p>
          <Link className="button" href="#consultation">
            Book a free consultation <span className="arrow" aria-hidden="true">→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
