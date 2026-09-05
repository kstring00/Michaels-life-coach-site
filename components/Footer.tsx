import Link from "next/link";
import styles from "./Footer.module.css";

export function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.top}>
          <div>
            <p className={styles.brand}>Growth<span>Gains</span></p>
            <p className={styles.copy}>
              Coaching for people who know something needs to change and want a thoughtful place to figure out what comes next.
            </p>
          </div>
          <nav className={styles.links} aria-label="Footer navigation">
            <Link href="/about">About</Link>
            <Link href="/privacy">Privacy</Link>
            <Link href="/disclaimer">Coaching disclaimer</Link>
          </nav>
        </div>

        <div className={styles.bottom}>
          <span>© {new Date().getFullYear()} GrowthGains. All rights reserved.</span>
          <span>Clarity · Perspective · Progress</span>
        </div>
      </div>
    </footer>
  );
}
