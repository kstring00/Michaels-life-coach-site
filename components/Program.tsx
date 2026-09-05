import { MaskedLines, Reveal, RevealItem } from "./motion-kit";

/** format facts — true of every engagement, so no sequence and no numbers */
const format = ["Fully virtual", "60-minute sessions, weekly", "12-week program"] as const;

/** a genuine sequence, so it is numbered */
const arc = [
  {
    label: "Consultation and intake",
    copy: "Before any commitment, you talk. This is where the two of you work out whether coaching is the right fit.",
  },
  {
    label: "Explainer videos",
    copy: "Sent to you before session one, so the first session is spent on your work rather than on logistics.",
  },
  {
    label: "Session one",
    copy: "Sets the focus for the twelve weeks — what you are actually here to change.",
  },
  {
    label: "Weeks two to twelve",
    copy: "Each session builds on the one before it, working toward the focus you set.",
  },
] as const;

const deliverables = [
  ["Reflection questions and exercises", "Between sessions, aimed at your focus."],
  ["Written SMART goals", "Weekly and for the full journey, revised as you go."],
  ["A personal blueprint of your journey", "Your own map of the twelve weeks."],
  ["Journaling", "In session and between them."],
  ["Between-session access", "Reach him when something comes up."],
] as const;

export function Program() {
  return (
    <section className="section program">
      <div className="container">
        <MaskedLines className="display" lines={["What the program", "actually is."]} />

        <Reveal className="program-format" delay={0.1}>
          {format.map((f) => <span key={f}>{f}</span>)}
        </Reveal>

        <Reveal className="program-arc" stagger={0.08}>
          {arc.map((step, i) => (
            <RevealItem className="program-step" key={step.label}>
              <span className="n">0{i + 1}</span>
              <h3>{step.label}</h3>
              <p>{step.copy}</p>
            </RevealItem>
          ))}
        </Reveal>

        <div className="program-deliverables">
          <Reveal as="h3" className="program-subhead">What you get</Reveal>
          <Reveal as="ul" className="deliverable-list" stagger={0.08}>
            {deliverables.map(([name, note]) => (
              <RevealItem as="li" key={name}>
                <strong>{name}</strong>
                <span>{note}</span>
              </RevealItem>
            ))}
          </Reveal>
        </div>
      </div>
    </section>
  );
}
