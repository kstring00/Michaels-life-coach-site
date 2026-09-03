import Link from "next/link";
import { MaskedLines, Reveal, RevealItem } from "./motion-kit";
import styles from "./CompareSection.module.css";

const coaching = [
  ["Primary focus", "Identity, direction, decisions and forward movement"],
  ["Best fit", "You are functioning day to day but feel stuck, unclear or in transition"],
  ["The work", "Questions, reflection, goals, choices and accountability"],
  ["Provider", "A certified life coach focused on identity and life transitions"],
] as const;

const clinical = [
  ["Primary focus", "Mental-health symptoms, healing, assessment and treatment"],
  ["Best fit", "You need clinical support, diagnosis, trauma care or symptom treatment"],
  ["The work", "Therapeutic assessment and interventions within a clinical scope"],
  ["Provider", "An appropriately licensed mental-health professional"],
] as const;

function Panel({
  kind,
  eyebrow,
  heading,
  fitLine,
  rows,
}: {
  kind: "coaching" | "clinical";
  eyebrow: string;
  heading: string;
  fitLine: string;
  rows: readonly (readonly [string, string])[];
}) {
  const coachingPanel = kind === "coaching";

  return (
    <div className={`${styles.panel} ${coachingPanel ? styles.coaching : styles.clinical}`}>
      <div className={styles.panelTop}>
        <div className={styles.kickerRow}>
          <span className={styles.index}>{coachingPanel ? "01" : "02"}</span>
          <span className={styles.eyebrow}>{eyebrow}</span>
          {coachingPanel && <span className={styles.recommended}>Likely fit for this site</span>}
        </div>

        <MaskedLines as="h2" className={`display ${styles.heading}`} lines={[heading]} />
        <Reveal as="p" className={styles.fitLine}>{fitLine}</Reveal>

        {coachingPanel ? (
          <Reveal className={styles.confirmation}>
            <span className={styles.confirmationLabel}>Coaching probably fits if</span>
            <p>
              You are not looking for diagnosis or treatment. You are trying to understand a major
              life transition, reconnect with who you are, and make thoughtful decisions about what comes next.
            </p>
          </Reveal>
        ) : (
          <Reveal className={styles.clinicalCallout}>
            <span>Choose clinical care instead when</span>
            <p>Symptoms, safety, trauma, diagnosis or mental-health treatment are the primary concern.</p>
          </Reveal>
        )}
      </div>

      <Reveal className={styles.rows} stagger={0.07}>
        {rows.map(([label, value]) => (
          <RevealItem className={styles.row} key={label}>
            <span>{label}</span>
            <strong>{value}</strong>
          </RevealItem>
        ))}
      </Reveal>

      {coachingPanel && (
        <Reveal className={styles.coachingAction}>
          <div>
            <span>Built for this kind of transition</span>
            <strong>GrowthGains centers on the space between who you were and what comes next.</strong>
          </div>
          <Link className={styles.primaryAction} href="/book">
            Talk with Michael <span aria-hidden="true">→</span>
          </Link>
        </Reveal>
      )}
    </div>
  );
}

export function CompareSection() {
  return (
    <section className={styles.section} aria-label="Coaching versus counseling">
      <div className={styles.intro}>
        <div>
          <span className={styles.introEyebrow}>Confirming your fit</span>
          <h2>If this is a life transition, coaching may be the right lane.</h2>
        </div>
        <p>
          If you are functioning day to day and looking for identity, direction and forward movement—not
          clinical treatment—GrowthGains is built for that kind of work.
        </p>
      </div>

      <div className={styles.panels}>
        <Panel
          kind="coaching"
          eyebrow="GrowthGains coaching"
          heading="Coaching"
          fitLine="A place to understand this season, reconnect with yourself and choose what comes next."
          rows={coaching}
        />

        <div className={styles.vs} aria-hidden="true">OR</div>

        <Panel
          kind="clinical"
          eyebrow="Licensed clinical care"
          heading="Counseling / Therapy"
          fitLine="The better lane when assessment, treatment or clinical mental-health support is the primary need."
          rows={clinical}
        />
      </div>

      <div className={styles.note}>
        <span>GrowthGains coaching is not psychotherapy and does not diagnose or treat mental-health disorders.</span>
        <Link href="/coaching-vs-counseling">See the full scope & fit guide →</Link>
      </div>
    </section>
  );
}
