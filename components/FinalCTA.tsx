import Link from "next/link";

export function FinalCTA() {
  return (
    <section className="section final-cta">
      <div className="container">
        <h2 className="display">You do not need it figured out yet.</h2>
        <div className="cta-row">
          <p className="body-lg">Start with a conversation about what you are navigating and whether coaching fits. No public pricing.</p>
          <div className="cta-buttons">
            <Link className="button cta-primary" href="/consultation">Book a free consultation</Link>
            <Link className="button secondary" href="/contact">Contact</Link>
          </div>
        </div>
      </div>
    </section>
  );
}
