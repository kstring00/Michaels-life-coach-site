"use client";

import Link from "next/link";
import { useLayoutEffect, useRef, useState } from "react";
import styles from "./Program.module.css";

const format = [
  ["Fully virtual", "We meet wherever you are"],
  ["60-minute sessions", "Weekly, an hour at a time"],
  ["12-week program", "Enough time to build momentum"],
] as const;

/* Three stages, not four: the old consultation and pre-session steps are one
   station now. marker is split so the line break is content, not a CSS guess. */
const arc = [
  {
    marker: ["Before", "week one"],
    markerDetail: "Free consultation, intake, and prep.",
    label: "Before we begin",
    copy: "We talk first. I want to understand what’s going on and whether GrowthGains is right for you — before anyone signs anything. You’ll get short videos beforehand, so our first hour is spent on you and not on logistics.",
    outcome: "No pressure — we’ll see if it fits",
  },
  {
    marker: ["Week one"],
    markerDetail: "Sixty minutes to set the focus.",
    label: "Setting the focus",
    copy: "We establish what the twelve weeks are for. What you want to understand, what you want to change, and what progress would actually look like for you.",
    outcome: "You leave with a direction",
  },
  {
    marker: ["Weeks", "two to twelve"],
    markerDetail: "Ten sessions, building on each other.",
    label: "The work",
    copy: "Ten sessions. Questions, patterns, goals reviewed and revised. Every week is different because every week of your life is different.",
    outcome: "The work keeps moving",
  },
] as const;

const tools = [
  ["Reflection questions and exercises", "Prompts between sessions"],
  ["Written SMART goals", "Weekly and overall, revised as needed"],
  ["A personal blueprint", "A map of your journey, built as you go"],
  ["Journaling", "During sessions and between them"],
  ["Between-session access", "Reach out when something comes up"],
] as const;

/* The read line: a station lights when its node crosses this fraction of the
   viewport. The rail fill height comes off the same number, so the line and the
   lit stations can never disagree about where the reader is. */
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
      fill.style.height = `${Math.max(0, Math.min(readLine - rect.top, rect.height))}px`;

      let changed = false;
      for (let i = 0; i < next.length; i++) {
        const node = nodesRef.current[i];
        // recomputed from the live position every time, so scrolling back up
        // un-lights. An IntersectionObserver with once:true would make the rail
        // a progress bar you cannot rewind, which is the wrong metaphor here.
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
        <style>{`.${styles.panel},.${styles.marker},.${styles.node},.${styles.deliverables}{opacity:1!important;transform:none!important}`}</style>
      </noscript>

      <div className={styles.inner}>
        <header className={styles.head}>
          <p className={styles.kicker}>The coaching journey</p>
          <h2 className={styles.title} id="program-heading">Twelve weeks, three stages.</h2>
          <p className={styles.lede}>
            Each session builds on the one before it. The structure keeps us connected to
            where you’re trying to go.
          </p>
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

          {/* sides come from :nth-of-type in CSS, so the rail and terminus
              sitting in this track cannot throw the counting off */}
          <ol className={styles.stations}>
            {arc.map((step, i) => (
              <li
                key={step.label}
                className={`${styles.station} ${lit[i] ? styles.isLit : ""}`}
              >
                <div className={styles.node} aria-hidden="true" ref={setNode(i)}>
                  <span>{String(i + 1).padStart(2, "0")}</span>
                </div>

                {/* the gutter opposite the panel — without it half of every row
                    is empty background, which is what read as unfinished */}
                <div className={styles.marker}>
                  <p className={styles.markerTime}>
                    {step.marker.map((line, n) => (
                      <span key={line}>{n > 0 && <br />}{line}</span>
                    ))}
                  </p>
                  <p className={styles.markerDetail}>{step.markerDetail}</p>
                </div>

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

        <div className={styles.close}>
          <figure>
            <blockquote>
              When I look in the mirror, I can confidently know I did the work to create the
              change I wanted in my own life.
            </blockquote>
            <figcaption>What Michael hopes you can say at week twelve</figcaption>
          </figure>

          <Link className={`button ${styles.cta}`} href="#consultation">
            Book a free consultation <span className="arrow" aria-hidden="true">→</span>
          </Link>
          <p className={styles.closeNote}>Free. Nothing is signed on the call.</p>
        </div>
      </div>
    </section>
  );
}
