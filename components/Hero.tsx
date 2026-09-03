import Link from "next/link";
import { Contours } from "./Contours";
import { Portrait } from "./Portrait";

export function Hero() {
  return (
    <section className="hero">
      <Contours />
      <div className="glow-orbit" />
      <div className="container hero-grid">
        <div className="hero-copy">
          <h1 className="display hero-title">
            <span>When the life you knew</span>
            <span>no longer fits.</span>
          </h1>
          <p className="hero-desc">Coaching for the space between who you were and what comes next.</p>
          <div className="hero-actions">
            <Link className="button" href="/consultation">Book a free consultation</Link>
            <Link className="button secondary" href="/contact">Contact</Link>
          </div>
        </div>
        <div className="hero-portrait-wrap">
          <div className="threshold-frame" />
          <div className="hero-threshold"><Portrait /></div>
        </div>
      </div>
    </section>
  );
}
