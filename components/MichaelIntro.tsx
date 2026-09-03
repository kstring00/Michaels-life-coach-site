import { MaskedLines, Reveal, RevealItem } from "./motion-kit";

export function MichaelIntro() {
  return (
    <section className="section michael-section">
      <div className="container michael-grid">
        <div className="michael-copy">
          <MaskedLines className="display" lines={["Start with who", "you are becoming."]} />
          <Reveal className="michael-copy-stack" stagger={0.08}>
            <RevealItem as="p" className="body-lg">
              Michael works with identity and life transitions: the moments when an old role or
              direction no longer fits and the next chapter has not taken shape.
            </RevealItem>
            <RevealItem className="credential-block">
              <span className="credential-label">Credential</span>
              <h3 className="michael-credential">Certified life coach.</h3>
            </RevealItem>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
