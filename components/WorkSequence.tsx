import { MaskedLines, Reveal } from "./motion-kit";

const steps = [
  ["Notice", "Slow the change down enough to see what is actually different."],
  ["Untangle", "Separate the roles and expectations from the parts of you that still belong."],
  ["Reorient", "Make room for values and direction to become visible again."],
  ["Move", "Turn clarity into deliberate next steps, not a finished plan."],
] as const;

const delays = [0, 0.08, 0.08, 0.16] as const;

export function WorkSequence() {
  return (
    <section className="section sequence">
      <div className="container">
        <MaskedLines className="display" lines={["How the work goes."]} />
        <div className="sequence-grid">
          {steps.map(([label, body], i) => (
            <Reveal className="sequence-step" delay={delays[i]} key={label}>
              <span className="n">0{i + 1}</span>
              <h3>{label}</h3>
              <p>{body}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
