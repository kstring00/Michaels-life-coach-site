import { MaskedLines, Reveal, RevealItem } from "./motion-kit";

/**
 * The objection stage. Everything visible — no accordion. Most coaching sites
 * hide the policies; publishing them plainly is the point of the section.
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
    a: "No refunds. Twenty-four hours' notice to cancel or reschedule. No-shows and late cancellations are charged.",
  },
  {
    q: "How do we know if it is a fit?",
    a: "That is what the consultation is for. We decide together, before any contract is signed.",
  },
] as const;

export function StraightAnswers() {
  return (
    <section className="section straight-answers">
      <div className="container">
        <MaskedLines className="display" lines={["Straight answers."]} />

        <Reveal as="p" className="answers-lede" delay={0.1}>
          “I can help guide your journey, but I can’t take the journey for you.”
        </Reveal>

        <Reveal className="answer-list" stagger={0.08}>
          {answers.map((row) => (
            <RevealItem className="answer-row" key={row.q}>
              <h3>{row.q}</h3>
              <p>{row.a}</p>
            </RevealItem>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
