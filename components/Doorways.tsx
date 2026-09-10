"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import styles from "./Doorways.module.css";

const doors = [
  {
    slug: "life-after-sport",
    title: "Life after sport",
    desc: "The identity that carried you for years ends on a Tuesday. What replaces it isn’t obvious.",
    go: "Questions for when a season ends",
    season: styles.seasonCool,
  },
  {
    slug: "foster-care-and-adoption",
    title: "Foster care and adoption",
    desc: "Building a family, or leaving a system, reshapes more than a household.",
    go: "Questions for a changing family",
    season: styles.seasonClay,
  },
  {
    slug: "identity-and-leadership",
    title: "Identity and leadership change",
    desc: "New title, new city, new role. Who you were may not be who stays.",
    go: "Questions for who you’re becoming",
    season: styles.seasonTurn,
  },
] as const;

const alsoWorksWith = [
  "Grief and loss",
  "Major decisions",
  "Repeating patterns",
  "Collegiate athletes",
  "Difficult seasons",
];

const STAGGER_MS = 160;

export function Doorways() {
  const gridRef = useRef<HTMLDivElement>(null);

  /* Touch has no hover, and leaving the doors simply open would throw away the
     swing, which is the whole point. On those devices each door opens as it
     scrolls into view instead, staggered so they read as a sequence. */
  useEffect(() => {
    const grid = gridRef.current;
    if (!grid) return;
    if (!window.matchMedia("(hover: none)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const frames = Array.from(grid.querySelectorAll<HTMLElement>(`.${styles.frame}`));
    const timers: ReturnType<typeof setTimeout>[] = [];

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const el = entry.target as HTMLElement;
          const i = frames.indexOf(el);
          if (entry.isIntersecting) {
            timers.push(setTimeout(() => el.classList.add(styles.isOpen), i * STAGGER_MS));
          } else {
            el.classList.remove(styles.isOpen);
          }
        }
      },
      { threshold: 0.4 },
    );

    frames.forEach((f) => io.observe(f));
    return () => {
      io.disconnect();
      timers.forEach(clearTimeout);
    };
  }, []);

  return (
    <section className={styles.section} aria-labelledby="doorways-heading">
      <div className={styles.inner}>
        <header className={styles.head}>
          <p className={styles.kicker}>Life transitions</p>
          <h2 className={styles.title} id="doorways-heading">Start where you already are.</h2>
          <p className={styles.lede}>
            A few questions worth sitting with, depending on what’s changing. Free, no
            signup — take them or leave them.
          </p>
        </header>

        <div className={styles.grid} ref={gridRef}>
          {doors.map((door) => (
            <Link className={styles.frame} href={`/resources/${door.slug}`} key={door.slug}>
              {/* what's through the doorway — sits under the door panel */}
              <div className={styles.beyond}>
                <div className={`${styles.season} ${door.season}`} />
                <div className={styles.spill} />
              </div>

              {/* the door */}
              <div className={styles.panel}>
                <h3>{door.title}</h3>
                <span className={styles.handle} aria-hidden="true" />
                <span className={styles.edge} aria-hidden="true" />
              </div>

              {/* At 42 degrees the door's projected width is cos(42) of the frame,
                  so the opening is a ~25% sliver — too narrow to read a paragraph
                  in. The copy therefore comes forward PAST the door rather than
                  sitting inside the gap, which is also what "comes forward through
                  the opening toward the viewer" describes. Hence it is a sibling
                  of the panel with a higher z-index, not a child of .beyond. */}
              <div className={styles.through}>
                <p>{door.desc}</p>
                <span className={styles.go}>{door.go}</span>
              </div>
            </Link>
          ))}
        </div>

        <div className={styles.also}>
          <p className={styles.alsoLabel}>Michael also works with</p>
          <ul className={styles.alsoList}>
            {alsoWorksWith.map((item) => <li key={item}>{item}</li>)}
          </ul>
        </div>
      </div>
    </section>
  );
}
