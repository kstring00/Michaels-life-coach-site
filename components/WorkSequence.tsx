import { MaskedLines, Reveal, RevealItem } from "./motion-kit";

const steps = [
  ["Notice", "Slow the change down enough to see what is actually different."],
  ["Untangle", "Separate the roles and expectations from the parts of you that still belong."],
  ["Reorient", "Make room for values and direction to become visible again."],
  ["Move", "Turn clarity into deliberate next steps, not a finished plan."],
];

export function WorkSequence() {
  return (
    <section className="section sequence">
      <div className="container">
        <MaskedLines className="display" lines={["How the work goes."]} />
        <Reveal className="sequence-list" stagger={0.08}>
          {steps.map(([label, body], i) => (
            <RevealItem className="sequence-step" key={label}>
              <span className="n">0{i + 1}</span>
              <h3>{label}</h3>
              <p>{body}</p>
            </RevealItem>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
