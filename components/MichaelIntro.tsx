import { MaskedLines, Reveal, RevealItem } from "./motion-kit";

export function MichaelIntro() {
  return (
    <section className="section michael-section">
      <div className="container michael-grid">
        <MaskedLines className="display" lines={["Start with who", "you are becoming."]} />
        <Reveal className="michael-copy" stagger={0.08}>
          <RevealItem as="p" className="body-lg">
            Michael works with identity and life transitions: the moments when an old role or
            direction no longer fits and the next chapter has not taken shape.
          </RevealItem>
          <RevealItem as="p" className="michael-credential">Certified life coach.</RevealItem>
        </Reveal>
      </div>
    </section>
  );
}
