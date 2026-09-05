import { MaskedLines, Reveal, RevealItem } from "./motion-kit";
import styles from "./StraightAnswers.module.css";

/**
 * Native <details> rather than a scripted accordion: the answers stay in the
 * DOM for search and for readers with JS off, and open on keyboard alone.
 */
const answers = [
  {
    q: "Do you guarantee results?",
    a: "No. This is a partnership. My responsibility is structure, questions, tools, perspective, accountability and support. Yours is engaging honestly, doing the work between sessions and taking action.",
  },
  {
    q: "What if I am not making progress?",
    a: "We revisit the goal, look at what is getting in the way and examine the patterns or beliefs creating resistance. Then we adjust the timeline or the action steps — and have an honest conversation about whether coaching is still the right fit.",
  },
  {
    q: "What are the policies?",
    a: "No refunds. Twenty-four hours’ notice to cancel or reschedule. No-shows and late cancellations are charged.",
  },
  {
    q: "How do we know if it’s a fit?",
    a: "That is what the consultation is for. We decide together, before any contract is signed.",
  },
] as const;

export function StraightAnswers() {
  return (
    <section className={styles.section} aria-labelledby="faq-heading">
      <div className={styles.inner}>
        <Reveal className={styles.topBar} y={10}>
          <p className={styles.tag}>
            Real conversations.
            <br />
            A more grounded tomorrow.
          </p>
          <span className={styles.topRule} aria-hidden="true" />
          <p className={styles.tagEnd}>Guidance for what’s next</p>
        </Reveal>

        <div className={styles.panel}>
          <div className={styles.head}>
            <p className={styles.eyebrow}>FAQ</p>
            <MaskedLines
              as="h2"
              className={styles.title}
              lines={["Straight", "answers."]}
            />
            <blockquote className={styles.lede}>
              “I can help guide the journey, but I cannot take the journey for them.”
            </blockquote>
            <span className={styles.ledeRule} aria-hidden="true" />
          </div>

          <Reveal className={styles.list} stagger={0.07}>
            {answers.map((row) => (
              <RevealItem as="details" className={styles.row} key={row.q}>
                <summary>
                  <span>{row.q}</span>
                  <span className={styles.plus} aria-hidden="true" />
                </summary>
                <p>{row.a}</p>
              </RevealItem>
            ))}
          </Reveal>
        </div>
      </div>
      <h2 className="sr-only" id="faq-heading">Straight answers</h2>
    </section>
  );
}
