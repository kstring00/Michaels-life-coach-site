import Link from "next/link";
import type { Resource } from "@/lib/resources";
import styles from "./ResourcePage.module.css";

/* Reading page, not a landing page: one column at reading width, no cards, no
   icons, and no motion — the homepage has the animation budget. */
export function ResourcePage({ resource }: { resource: Resource }) {
  return (
    <main className={styles.page}>
      {/* TODO: remove before launch */}
      <aside className={styles.draft} data-todo="draft-review">
        <p className={styles.draftHeading}>Draft — needs Michael’s review</p>
        <p className={styles.draftBody}>
          The framing and questions below are a starting point for Michael to cut,
          rewrite, or replace. They go out under his name and should not publish until he
          has worked them over. The page structure and styling are final.
        </p>
      </aside>

      <article className={styles.column}>
        <p className={styles.back}>
          <Link href="/resources">← Free resources</Link>
        </p>

        <p className={styles.kicker}>{resource.kicker}</p>
        <h1 className={styles.title}>{resource.title}</h1>

        {resource.framing.map((para) => (
          <p className={styles.framing} key={para.slice(0, 24)}>{para}</p>
        ))}

        <div className={styles.howTo}>
          <p className={styles.howToLabel}>How to use this</p>
          <p className={styles.howToBody}>{resource.howToUse}</p>
        </div>

        {/* A real <ol>, so the numerals are CSS counters and screen readers still
            announce list position. Nothing is hardcoded as "01". */}
        <ol className={styles.questions}>
          {resource.questions.map((item) => (
            <li key={item.q}>
              <p>{item.q}</p>
              {item.note && <small>{item.note}</small>}
            </li>
          ))}
        </ol>

        <div className={styles.close}>
          <p className={styles.closeLine}>
            If sitting with these raised more than it settled, that is usually a sign it
            is worth talking through.
          </p>
          {/* A text link, not a pill. The restraint is the argument. */}
          <Link className={styles.closeLink} href="/#consultation">
            Book a free consultation with Michael
          </Link>
        </div>

        <p className={styles.footerLine}>
          Part of a small set of free resources from GrowthGains.{" "}
          <Link href="/resources">See the others</Link>
        </p>
      </article>
    </main>
  );
}
