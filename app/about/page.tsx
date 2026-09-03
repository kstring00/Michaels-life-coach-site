import Link from "next/link";
import { FinalCTA } from "@/components/FinalCTA";
import { Portrait } from "@/components/Portrait";
import { site } from "@/lib/site";
import styles from "./about.module.css";

export const metadata = { title: "About Michael" };

const interview = [
  {
    question: "What is GrowthGains really about?",
    answer: site.statement,
  },
  {
    question: "What happens when the old role no longer fits?",
    answer:
      "The work creates a structured place to examine what changed, what still belongs to you, what no longer does and what deliberate movement could look like from here.",
  },
  {
    question: "What is Michael's role in the room?",
    answer:
      "Michael does not decide your next chapter for you. Coaching is designed to help you slow the situation down, see it more clearly and make choices you can actually own.",
  },
] as const;

const principles = [
  {
    title: "Identity before performance",
    copy: "The question is not only ‘What should I do next?’ but also ‘Who am I becoming as I decide?’",
  },
  {
    title: "Clarity without pretending",
    copy: "Good coaching does not require certainty on day one. It gives uncertainty somewhere useful to go.",
  },
  {
    title: "Movement with ownership",
    copy: "The goal is not a prescribed answer. It is a next step that still feels like yours when the conversation ends.",
  },
] as const;

export default function About() {
  return (
    <main className={styles.about}>
      <section className={styles.hero}>
        <div className={`container ${styles.heroInner}`}>
          <div className={styles.heroMeta}>
            <span>About Michael</span>
            <span>Identity &amp; life transitions</span>
          </div>

          <h1>Know who is walking with you.</h1>
          <p className={styles.heroLead}>
            GrowthGains centers the human part of transition: identity, direction, values and the
            space where the old answer no longer fits.
          </p>

          <div className={styles.profileStrip}>
            <div className={styles.portraitStamp}>
              <Portrait alt="Michael, GrowthGains coach" />
            </div>
            <div>
              <span className={styles.profileName}>Michael</span>
              <span className={styles.profileRole}>Certified life coach · GrowthGains</span>
            </div>
            <Link className={styles.textLink} href="/approach">
              See the approach →
            </Link>
          </div>
        </div>
      </section>

      <section className={styles.interview}>
        <div className="container">
          <div className={styles.interviewIntro}>
            <span className={styles.interviewEyebrow}>In Michael&apos;s words</span>
            <h2>Less biography. More of how he actually thinks about the work.</h2>
          </div>

          <div className={styles.qaList}>
            {interview.map((item, index) => (
              <article className={styles.qa} key={item.question}>
                <span className={styles.qaNumber}>0{index + 1}</span>
                <h3>{item.question}</h3>
                <p>{item.answer}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.principles}>
        <div className="container">
          <div className={styles.principlesHead}>
            <span>The posture behind the process</span>
            <h2>Coaching should make your own thinking more visible to you.</h2>
          </div>

          <div className={styles.principleGrid}>
            {principles.map((item, index) => (
              <article className={styles.principle} key={item.title}>
                <span className={styles.principleNumber}>0{index + 1}</span>
                <h3>{item.title}</h3>
                <p>{item.copy}</p>
              </article>
            ))}
          </div>

          <div className={styles.principleAction}>
            <Link className="button" href="/book?utm_source=growthgains&utm_medium=website&utm_campaign=consultation&utm_content=about">
              Book a free consultation
            </Link>
          </div>
        </div>
      </section>

      <FinalCTA />
    </main>
  );
}
