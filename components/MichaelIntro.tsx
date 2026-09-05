import { MaskedLines, Reveal, RevealItem } from "./motion-kit";

export function MichaelIntro() {
  return (
    <section className="section michael-section">
      <div className="container michael-grid">
        <div className="michael-copy">
          <MaskedLines className="display" lines={["Who you would be", "working with."]} />
          <Reveal className="michael-copy-stack" stagger={0.08}>
            <RevealItem as="p" className="body-lg">
              Michael is a certified life coach with a background in ministry, leadership and
              mentoring. Coaching started for him in undergrad, studying ministry — the idea that
              you help people find what is already in them rather than telling them what to do.
              That is still how he works.
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
