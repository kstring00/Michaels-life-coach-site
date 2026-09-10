import styles from "./TodoNote.module.css";

/* Build-time note for a fact we do not have yet. Every use site is wrapped in a
   {/* TODO: awaiting answer from Michael *\/} comment so the whole set can be
   found by grepping "TODO" and stripped before launch. */
export function TodoNote({ heading, children }: { heading: string; children: React.ReactNode }) {
  return (
    <div className={styles.note} data-todo="awaiting-michael">
      <p className={styles.heading}>{heading}</p>
      <p className={styles.body}>{children}</p>
    </div>
  );
}
