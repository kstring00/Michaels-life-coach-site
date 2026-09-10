import styles from "./Candor.module.css";

const cards = [
  {
    heading: "I will tell you if you need someone else.",
    body: "The consultation exists partly to find that out. If what you are carrying calls for a therapist or counselor, I will say so and point you toward the right kind of help. I would rather you get the support you actually need than sign a contract with me.",
  },
  {
    heading: "I do not guarantee a result.",
    body: "This is a partnership. I bring the structure, the questions, the tools, and the accountability. You bring honest engagement and the work between sessions. I can guide the journey. I cannot take it for you.",
  },
  {
    heading: "Stalling is not failing.",
    body: "If you are not making progress, we look at all of it — the goal, what is in the way, the beliefs underneath it, the timeline. Sometimes we change the plan. Sometimes we have an honest conversation about whether this is still the right fit. Either way, it tells us something.",
  },
] as const;

/* Sits between About and the timeline on purpose: it changes how the process
   reads. The sand ground is the only one in this stretch of the page, and the
   colour change is what signals the shift in register. */
export function Candor() {
  return (
    <section className={styles.section} aria-labelledby="candor-heading">
      <div className={styles.inner}>
        <header className={styles.head}>
          <p className={styles.kicker}>Before you book</p>
          <h2 className={styles.title} id="candor-heading">
            Three things worth saying out loud.
          </h2>
        </header>

        <div className={styles.grid}>
          {cards.map((card) => (
            <article className={styles.card} key={card.heading}>
              <h3>{card.heading}</h3>
              <p>{card.body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
