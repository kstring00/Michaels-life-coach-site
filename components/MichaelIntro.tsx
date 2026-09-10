import Image from "next/image";
import michaelPortrait from "../mikenobacgrnd.png";
import styles from "./MichaelIntro.module.css";
import { TodoNote } from "./TodoNote";

export function MichaelIntro() {
  return (
    <section className={styles.section} aria-labelledby="about-heading">
      <div className={styles.inner}>
        <figure className={styles.portrait}>
          {/* The source PNG is transparent and its subject starts 1.9% from the
              top, so the image is inset from the top of the frame to buy real
              headroom above the hairline rather than cropping to it. */}
          <Image
            src={michaelPortrait}
            alt="Michael, GrowthGains life coach"
            sizes="(max-width: 900px) 320px, 380px"
          />
        </figure>

        <div className={styles.copy}>
          <p className={styles.kicker}>About</p>
          <h2 className={styles.title} id="about-heading">
            I found coaching studying ministry.
          </h2>

          <p className={styles.bio}>
            What caught me was the idea that you could ask someone a good question and help
            them move forward — instead of telling them what to do. That you could help a
            person discover what was already in them. I have not stopped being interested in
            that since.
          </p>
          <p className={styles.bio}>
            Since then I have worked with people through ministry, leadership, and mentoring.
            People have come to me for perspective when they were facing a hard decision,
            sitting in a difficult season, or trying to understand a pattern they kept
            repeating. GrowthGains is that same work, made into something structured.
          </p>
          <p className={styles.bio}>
            My approach is to get to know the whole person, not just the problem they bring
            into the session. <em>I want to understand the person, not just the problem.</em>{" "}
            From there, you lead us on the journey. I am there to ask the questions, help you
            think through what you are experiencing, and support you as you decide what to do
            next.
          </p>

          <dl className={styles.facts}>
            <div className={styles.fact}>
              <dt>Certified life coach</dt>
              <dd>Certifying body</dd>
              {/* TODO: awaiting answer from Michael */}
              <TodoNote heading="Ask Michael">
                Which certification, and from whom? ICF, a named program,
                ministry-affiliated? This is the most load-bearing unverified claim on the
                site — right now it sits alone and the thinness shows.
              </TodoNote>
            </div>

            <div className={styles.fact}>
              <dt>Ministry background</dt>
              <dd>Undergraduate study in ministry; years of leadership and mentoring work</dd>
              {/* TODO: awaiting answer from Michael */}
              <TodoNote heading="Ask Michael">
                How many years, and doing what specifically? A number here is worth more
                than the whole sentence.
              </TodoNote>
            </div>

            <div className={styles.fact}>
              <dt>Fully virtual</dt>
              <dd>Weekly 60-minute sessions, structured over 12 weeks</dd>
            </div>
          </dl>
        </div>
      </div>
    </section>
  );
}
