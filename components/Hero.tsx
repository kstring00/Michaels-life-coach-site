import Link from "next/link";
import { Portrait } from "./Portrait";
import FlowField from "./FlowField";
import { MaskedLines, ParallaxMedia, Reveal } from "./motion-kit";

/* module scope: a fresh array each render would retrigger FlowField's effect */
const FIELD = ["#12181A", "#26383F", "#171F22"];
const GLYPHS: [string, string, string] = ["|", "=", "+"];

export function Hero() {
  return (
    <section className="hero">
      <FlowField
        className="hero-field"
        gradient={FIELD}
        glyphs={GLYPHS}
        color="193,209,207"
        alpha={0.38}
        spacing={22}
        radius={220}
        swirl={0.7}
      />
      <div className="hero-scrim" aria-hidden="true" />
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
