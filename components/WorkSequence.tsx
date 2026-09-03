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
        <h2 className="display">How the work goes.</h2>
        <div className="sequence-list">
          {steps.map(([label, body], i) => (
            <div className="sequence-step" key={label}>
              <span className="n">0{i + 1}</span>
              <h3>{label}</h3>
              <p>{body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
