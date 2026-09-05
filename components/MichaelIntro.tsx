import { MaskedLines, Reveal, RevealItem } from "./motion-kit";
import styles from "./MichaelIntro.module.css";

export function MichaelIntro() {
  return (
    <section className={styles.section} aria-labelledby="about-heading">
      <div className={styles.inner}>
        <div className={styles.copy}>
          <Reveal as="p" className={styles.eyebrow} y={10}>About</Reveal>
          <MaskedLines
            className={styles.title}
            lines={["Who you would be", "working with."]}
          />
          <Reveal className={styles.stack} stagger={0.08} delay={0.1}>
            <RevealItem as="p" className={styles.bio}>
              I am a certified life coach with a background in ministry, leadership, and
              mentoring. I help people in seasons of transition gain clarity, process what
              they’re facing, and take practical steps toward a life that feels aligned and
              purposeful.
            </RevealItem>
            <RevealItem className={styles.credential}>
              <span className={styles.eyebrow}>Credential</span>
              <p className={styles.credentialValue}>Certified life coach.</p>
            </RevealItem>
          </Reveal>
        </div>

        <Reveal as="blockquote" className={styles.quote} delay={0.18}>
          <span className={styles.mark} aria-hidden="true">&ldquo;</span>
          <p>
            “I want to understand the person, not just the problem they are bringing into
            the session.”
          </p>
          <footer className={styles.signature}>&ndash; Michael</footer>
        </Reveal>
      </div>
    </section>
  );
}
