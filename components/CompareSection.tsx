import Link from "next/link";
import { Reveal, RevealItem } from "./motion-kit";
import styles from "./CompareSection.module.css";

const outcomes = [
  {
    index: "01",
    label: "Clarity",
    copy: "Name what changed and what still matters now.",
  },
  {
    index: "02",
    label: "Direction",
    copy: "Sort through choices without rushing the next chapter.",
  },
  {
    index: "03",
    label: "Momentum",
    copy: "Turn reflection into practical next steps you choose.",
  },
  {
    index: "04",
    label: "Ownership",
    copy: "Make decisions from your values, not only the role you left.",
  },
] as const;

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
              Coaching with Michael creates space to understand the season you are in,
              reconnect with what matters to you and decide how you want to move forward.
            </p>
          </div>

          <Reveal className={styles.outcomes} stagger={0.07}>
            {outcomes.map((item) => (
              <RevealItem className={styles.outcome} key={item.label}>
                <span className={styles.outcomeIndex}>{item.index}</span>
                <strong>{item.label}</strong>
                <p>{item.copy}</p>
              </RevealItem>
            ))}
          </Reveal>

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
              <span className={styles.actionNote}>No pressure. Just a conversation.</span>
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
              You deserve the right kind of care. If clinical support is what you need,
              connecting with an appropriately licensed mental-health professional is the better next step.
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
