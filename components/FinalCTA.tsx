import Link from "next/link";
import { ConsultButton } from "./ConsultButton";
import { MaskedLines, Reveal } from "./motion-kit";

export function FinalCTA() {
  return (
    <section className="section final-cta">
      <div className="container">
        <MaskedLines className="display" lines={["You do not need it", "figured out yet."]} />
        <Reveal className="cta-row" delay={0.1}>
          <p className="body-lg">Start with a conversation about what you are navigating and whether coaching fits. No public pricing.</p>
          <div className="cta-buttons">
            <ConsultButton className="cta-primary" />
            <Link className="button secondary" href="/contact">Contact</Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
