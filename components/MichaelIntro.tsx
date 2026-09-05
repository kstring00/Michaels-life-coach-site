import { MaskedLines, Reveal, RevealItem } from "./motion-kit";

export function MichaelIntro() {
  return (
    <section className="section michael-section">
      <div className="container michael-grid">
        <div className="michael-copy">
          <MaskedLines className="display" lines={["Who you would be", "working with."]} />
          <Reveal className="michael-copy-stack" stagger={0.08}>
            <RevealItem as="p" className="body-lg">
              I am a certified life coach with a background in ministry, leadership and mentoring.
              I first found coaching in undergrad while studying ministry — the idea that instead
              of telling people what to do, you can help them discover what is already within them
              and move forward. That is still how I work.
            </RevealItem>
            <RevealItem className="credential-block">
              <span className="credential-label">Credential</span>
              <h3 className="michael-credential">Certified life coach.</h3>
            </RevealItem>
          </Reveal>
        </div>

        {/* holds the column the second portrait used to */}
        <Reveal as="blockquote" className="michael-quote" delay={0.15}>
          <p>
            “I want to understand the person, not just the problem they are bringing into
            the session.”
          </p>
        </Reveal>
      </div>
    </section>
  );
}
