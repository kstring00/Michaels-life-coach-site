import Link from "next/link";
import { Reveal } from "./motion-kit";
import styles from "./CompareSection.module.css";

const clinicalSignals = [
  "Mental-health symptoms are interfering with day-to-day functioning.",
  "Trauma, safety, diagnosis or treatment is the primary concern.",
  "You are looking for psychotherapy or licensed clinical mental-health care.",
] as const;

export function CompareSection() {
  return (
    <section className={styles.section} aria-labelledby="coaching-fit-heading">
      <div className={styles.intro}>
        <span className={styles.introEyebrow}>Confirm you are in the right place</span>
        <h2 id="coaching-fit-heading">Is coaching the right kind of support for you?</h2>
        <p>
          If you are navigating a non-clinical life transition and asking what comes next,
          GrowthGains was built around that kind of conversation.
        </p>
      </div>

      <div className={styles.contentGrid}>
        <Reveal className={styles.coachingPanel}>
          <div className={styles.brandRow}>
            <span className={styles.brandMark} aria-hidden="true">G</span>
            <span>GrowthGains coaching</span>
          </div>

          <div className={styles.coachingIntro}>
            <h3>For life transitions and what comes next.</h3>
            <p>
              Coaching with me creates space to understand the season you are in,
              reconnect with what matters to you and decide how you want to move forward.
              I screen for that fit at the consultation, before anyone signs a contract.
            </p>
          </div>

          <div className={styles.coachingBottom}>
            <div className={styles.credential}>
              <span className={styles.credentialIcon} aria-hidden="true">✓</span>
              <div>
                <strong>Certified life coach</strong>
                <p>Focused on identity, life transitions and forward movement.</p>
              </div>
            </div>

            <div className={styles.actionWrap}>
              <Link className={styles.primaryAction} href="/book">
                Book a free consultation <span aria-hidden="true">→</span>
              </Link>
              <span className={styles.actionNote}>Fit is decided on the call, before any contract.</span>
            </div>
          </div>
        </Reveal>

        <Reveal className={styles.clinicalPanel}>
          <div className={styles.clinicalLabel}>
            <span className={styles.clinicalIcon} aria-hidden="true">◇</span>
            <span>Clinical care</span>
          </div>

          <h3>A different kind of support may fit better if:</h3>

          <ul className={styles.clinicalList}>
            {clinicalSignals.map((signal) => (
              <li key={signal}>{signal}</li>
            ))}
          </ul>

          <div className={styles.clinicalAside}>
            <p>
              I screen for fit at the consultation for exactly this reason, so I can
              refer you to a licensed clinician before anyone signs a contract. You deserve the
              right kind of care more than I need you as a client.
            </p>
            <Link href="/coaching-vs-counseling">Read the full coaching vs. counseling guide →</Link>
          </div>
        </Reveal>
      </div>

      <div className={styles.note}>
        <span>GrowthGains coaching is not psychotherapy and does not diagnose or treat mental-health disorders.</span>
        <Link href="/coaching-vs-counseling">See the full scope &amp; fit guide →</Link>
      </div>
    </section>
  );
}
