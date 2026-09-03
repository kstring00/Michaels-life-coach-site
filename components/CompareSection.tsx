import Link from "next/link";
import { MaskedLines, Reveal, RevealItem } from "./motion-kit";
import styles from "./CompareSection.module.css";

const coaching = [
  ["Primary focus", "Identity, direction, decisions and forward movement"],
  ["Best fit", "You are functioning day to day but feel stuck, unclear or in transition"],
  ["The work", "Questions, reflection, goals, choices and accountability"],
  ["Provider", "A certified life coach"],
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
  return (
    <div className={`${styles.panel} ${kind === "coaching" ? styles.coaching : styles.clinical}`}>
      <div className={styles.panelTop}>
        <div className={styles.kickerRow}>
          <span className={styles.index}>{kind === "coaching" ? "01" : "02"}</span>
          <span className={styles.eyebrow}>{eyebrow}</span>
        </div>
        <MaskedLines as="h2" className={`display ${styles.heading}`} lines={[heading]} />
        <Reveal as="p" className={styles.fitLine}>{fitLine}</Reveal>
      </div>

      <Reveal className={styles.rows} stagger={0.07}>
        {rows.map(([label, value]) => (
          <RevealItem className={styles.row} key={label}>
            <span>{label}</span>
            <strong>{value}</strong>
          </RevealItem>
        ))}
      </Reveal>
    </div>
  );
}

export function CompareSection() {
  return (
    <section className={styles.section} aria-label="Coaching versus counseling">
      <div className={styles.intro}>
        <div>
          <span className={styles.introEyebrow}>Choosing the right support</span>
          <h2>Two useful services. Different jobs.</h2>
        </div>
        <p>
          The simplest distinction: coaching helps you navigate a non-clinical transition and move
          forward. Counseling or therapy provides licensed mental-health care when treatment is needed.
        </p>
      </div>

      <div className={styles.panels}>
        <Panel
          kind="coaching"
          eyebrow="GrowthGains coaching"
          heading="Coaching"
          fitLine="Use coaching when the question is: How do I understand this season and choose what comes next?"
          rows={coaching}
        />

        <div className={styles.vs} aria-hidden="true">VS</div>

        <Panel
          kind="clinical"
          eyebrow="Licensed clinical care"
          heading="Counseling / Therapy"
          fitLine="Use therapy when the question includes: Do I need assessment, treatment or clinical mental-health support?"
          rows={clinical}
        />
      </div>

      <div className={styles.note}>
        <span>
          GrowthGains coaching is not psychotherapy and does not diagnose or treat mental-health disorders.
        </span>
        <Link href="/coaching-vs-counseling">See the full scope & fit guide →</Link>
      </div>
    </section>
  );
}
