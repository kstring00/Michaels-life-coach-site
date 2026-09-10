import type { Metadata } from "next";
import Link from "next/link";
import { resources } from "@/lib/resources";
import styles from "./resources.module.css";

const title = "Questions worth sitting with.";
const description =
  "Three short sets of questions, depending on what is changing. No signup, nothing to fill in.";

export const metadata: Metadata = {
  title,
  description,
  openGraph: { title, description, type: "website", url: "/resources" },
};

/* Deliberately plain, and deliberately not the 3D doors from the homepage.
   This exists so the three pages have a parent, not as a destination. */
export default function Resources() {
  return (
    <main className={styles.page}>
      <header className={styles.head}>
        <p className={styles.kicker}>Free resources</p>
        <h1 className={styles.title}>{title}</h1>
        <p className={styles.lede}>
          Three short sets, depending on what is changing. No signup, nothing to fill in.
          Take them or leave them.
        </p>
      </header>

      <ul className={styles.list}>
        {resources.map((r) => (
          <li key={r.slug}>
            <Link href={`/resources/${r.slug}`}>
              <span className={styles.rowKicker}>{r.kicker}</span>
              <span className={styles.rowTitle}>{r.title}</span>
              <span className={styles.rowTeaser}>{r.teaser}</span>
            </Link>
          </li>
        ))}
      </ul>

      <div className={styles.close}>
        <p className={styles.closeLine}>
          If sitting with these raised more than it settled, that is usually a sign it is
          worth talking through.
        </p>
        <Link className={styles.closeLink} href="/#consultation">
          Book a free consultation with Michael
        </Link>
      </div>
    </main>
  );
}
