import Link from "next/link";
import styles from "./ResourcePage.module.css";

/* The questions are Michael's to write. They carry his professional judgment on
   grief, identity and family, so each page renders numbered placeholders naming
   what is missing rather than invented ones under his name. */
export function ResourcePage({
  kicker,
  title,
  framing,
  count,
}: {
  kicker: string;
  title: string;
  framing: string;
  count: number;
}) {
  return (
    <main className={styles.page}>
      <article className={styles.column}>
        <p className={styles.kicker}>{kicker}</p>
        <h1 className={styles.title}>{title}</h1>
        <p className={styles.framing}>{framing}</p>

        <ol className={styles.questions}>
          {Array.from({ length: count }, (_, i) => (
            /* TODO: awaiting questions from Michael */
            <li key={i}>
              <div className={styles.todo} data-todo="awaiting-michael">
                <p className={styles.todoHeading}>Awaiting Michael’s question</p>
                <p className={styles.todoBody}>
                  This question is still being written. It will be in Michael’s own
                  words, not a placeholder rewritten to sound like them.
                </p>
              </div>
            </li>
          ))}
        </ol>

        <p className={styles.closing}>
          If sitting with these raised more than it settled, that’s usually a sign it’s
          worth talking through.{" "}
          <Link href="/consultation">Book a free consultation</Link>.
        </p>

        <p className={styles.back}>
          <Link href="/resources">← All resources</Link>
        </p>
      </article>
    </main>
  );
}
