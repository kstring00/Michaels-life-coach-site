import Link from "next/link";
import { ConsultButton } from "./ConsultButton";
import { MaskedLines, Reveal } from "./motion-kit";

export function FinalCTA() {
  return (
    <section className="section final-cta">
      <div className="container">
        <MaskedLines
          className="display"
          lines={["You look in the mirror and know", "you did the work to create", "the change you wanted."]}
        />
        <Reveal className="cta-row" delay={0.1}>
          <p className="body-lg">
            It starts with a consultation. That call is how the two of you work out whether this
            program fits what you are carrying — before anything is signed.
          </p>
          <div className="cta-actions">
            <div className="cta-buttons">
              <ConsultButton className="cta-primary" source="final-cta" />
              <Link className="button secondary" href="/contact">Contact</Link>
            </div>
            <span className="cta-note">Free. Nothing is signed on the call.</span>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
