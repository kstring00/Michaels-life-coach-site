import type { Metadata } from "next";
import Link from "next/link";
import styles from "./resources.module.css";

export const metadata: Metadata = {
  title: "Free resources | GrowthGains",
  description:
    "Free question sets for life transitions. No signup, no email capture — take them or leave them.",
};

const resources = [
  {
    slug: "life-after-sport",
    niche: "Life after sport",
    title: "Questions for when a season ends",
    desc: "The identity that carried you for years ends on a Tuesday. What replaces it isn’t obvious.",
  },
  {
    slug: "foster-care-and-adoption",
    niche: "Foster care and adoption",
    title: "Questions for a changing family",
    desc: "Building a family, or leaving a system, reshapes more than a household.",
  },
  {
    slug: "identity-and-leadership",
    niche: "Identity and leadership change",
    title: "Questions for who you’re becoming",
    desc: "New title, new city, new role. Who you were may not be who stays.",
  },
];

/* Deliberately plain. This exists so the question sets have a parent, not as a
   destination of its own. */
export default function Resources() {
  return (
    <main className={styles.page}>
      <div className={styles.column}>
        <p className={styles.kicker}>Free resources</p>
        <h1 className={styles.title}>Questions worth sitting with.</h1>
        <p className={styles.lede}>
          Free, no signup. Pick whichever is closest to what’s changing.
        </p>

        <ul className={styles.list}>
          {resources.map((r) => (
            <li key={r.slug}>
              <Link href={`/resources/${r.slug}`}>
                <span className={styles.niche}>{r.niche}</span>
                <span className={styles.name}>{r.title}</span>
                <span className={styles.desc}>{r.desc}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}
