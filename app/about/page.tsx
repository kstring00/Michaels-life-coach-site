import Link from "next/link";
import { Portrait } from "@/components/Portrait";
import { site } from "@/lib/site";
import styles from "./about.module.css";

export const metadata = { title: "About Michael" };

const focusAreas = [
  "Identity and major decisions",
  "Life after sport",
  "Foster care and adoption",
  "Grief and loss",
  "Patterns that keep repeating",
  "Seasons where something simply has to change",
] as const;

const principles = [
  {
    number: "01",
    title: "See the whole person",
    copy: "A transition rarely lives in one box. I want to understand the roles, values, relationships and experiences around the decision, not just the decision itself.",
  },
  {
    number: "02",
    title: "Ask better questions",
    copy: "I am not here to hand you a prefabricated answer. My job is to create enough clarity and perspective for you to hear your own thinking more clearly.",
  },
  {
    number: "03",
    title: "Build movement you own",
    copy: "Insight matters, but it should lead somewhere. We turn what you are learning into goals, conversations and practical next steps that still feel like yours.",
  },
] as const;

const rhythm = [
  ["Listen", "Start with what is actually happening, not what you think you are supposed to say."],
  ["Reflect", "Slow the situation down enough to notice the patterns, assumptions and values underneath it."],
  ["Challenge", "When it is useful, I will question the story, belief or pattern that may be keeping you stuck."],
  ["Move", "Leave with something concrete to think about, practice, decide or do before we meet again."],
] as const;

export default function About() {
  return (
    <main className={styles.about}>
      <section className={styles.hero}>
        <div className={`container ${styles.heroGrid}`}>
          <div className={styles.heroCopy}>
            <p className={styles.eyebrow}>About me</p>
            <h1>I believe people move better when they can see themselves clearly.</h1>
            <p className={styles.heroLead}>
              I built GrowthGains for people who know something needs to change and want a thoughtful
              place to figure out what comes next. My role is not to choose your next chapter for you.
              It is to help you understand the season you are in, reconnect with what matters and move
              forward with intention.
            </p>

            <div className={styles.heroActions}>
              <Link className="button" href="/#consultation">
                Book a free consultation
              </Link>
              <span className={styles.credential}>Certified life coach · GrowthGains</span>
            </div>
          </div>

          <div className={styles.portraitWrap}>
            <div className={styles.portraitCard}>
              <Portrait alt="Michael, founder and life coach at GrowthGains" />
            </div>
            <div className={styles.portraitNote}>
              <span>My coaching philosophy</span>
              <p>“I can help guide the journey, but I cannot take the journey for them.”</p>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.statementSection}>
        <div className={`container ${styles.statementGrid}`}>
          <p className={styles.sectionLabel}>What GrowthGains is about</p>
          <div>
            <h2>There is no single kind of person who arrives at a turning point.</h2>
            <p>{site.statement}</p>
          </div>
        </div>

        <div className={`container ${styles.focusGrid}`}>
          {focusAreas.map((area, index) => (
            <div className={styles.focusItem} key={area}>
              <span>0{index + 1}</span>
              <p>{area}</p>
            </div>
          ))}
        </div>
      </section>

      <section className={styles.principlesSection}>
        <div className="container">
          <div className={styles.sectionHead}>
            <div>
              <p className={styles.eyebrow}>How I think about the work</p>
              <h2>Clarity first. Ownership always.</h2>
            </div>
            <p>
              Coaching should make you more able to see, choose and act for yourself, not more dependent
              on the coach.
            </p>
          </div>

          <div className={styles.principleGrid}>
            {principles.map((item) => (
              <article className={styles.principleCard} key={item.title}>
                <span>{item.number}</span>
                <h3>{item.title}</h3>
                <p>{item.copy}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.rhythmSection}>
        <div className={`container ${styles.rhythmGrid}`}>
          <div className={styles.rhythmIntro}>
            <p className={styles.eyebrow}>What working with me feels like</p>
            <h2>A real conversation with somewhere to go.</h2>
            <p>
              I listen, reflect, challenge when needed and keep the conversation connected to the life
              you are actually trying to build.
            </p>
          </div>

          <div className={styles.rhythmList}>
            {rhythm.map(([title, copy], index) => (
              <div className={styles.rhythmItem} key={title}>
                <span>0{index + 1}</span>
                <div>
                  <h3>{title}</h3>
                  <p>{copy}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.ctaSection}>
        <div className={`container ${styles.ctaInner}`}>
          <div>
            <p className={styles.eyebrow}>Start with a conversation</p>
            <h2>You do not need to have the answer before we talk.</h2>
          </div>
          <div className={styles.ctaAction}>
            <p>Bring the real situation. We can decide together whether coaching is the right next step.</p>
            <Link className="button" href="/#consultation">
              Book a free consultation
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
