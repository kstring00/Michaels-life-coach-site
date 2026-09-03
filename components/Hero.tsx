import Link from "next/link";
import { Contours } from "./Contours";
import { Portrait } from "./Portrait";
import { MaskedLines, ParallaxMedia, Reveal } from "./motion-kit";

export function Hero() {
  return (
    <section className="hero">
      <Contours />
      <div className="glow-orbit" />
      <div className="container hero-grid">
        <div className="hero-copy">
          <MaskedLines
            as="h1"
            immediate
            className="display hero-title"
            lines={["When the life you knew", "no longer fits."]}
          />
          <Reveal as="p" className="hero-desc" delay={0.45}>
            Coaching for the space between who you were and what comes next.
          </Reveal>
          <Reveal className="hero-actions" delay={0.6}>
            <Link className="button" href="/consultation">Book a free consultation</Link>
            <Link className="button secondary" href="/contact">Contact</Link>
          </Reveal>
        </div>
        <div className="hero-portrait-wrap">
          <div className="threshold-frame" />
          {/* the only parallax on the page */}
          <ParallaxMedia className="hero-threshold" range={60}>
            <div className="hero-media"><Portrait /></div>
          </ParallaxMedia>
        </div>
      </div>
    </section>
  );
}
