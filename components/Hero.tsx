import Link from "next/link";
import { Portrait } from "./Portrait";
import { Marquee } from "./Marquee";
import { MaskedLines, Reveal } from "./motion-kit";
import styles from "./Hero.module.css";

/**
 * The background is CSS only: one radial light over deep navy, plus a tiled
 * grain overlay (globals.css). No canvas, no SVG pattern, no animation — all
 * of the hero's movement is in the type below.
 */
export function Hero() {
  return (
    <section className={`hero ${styles.compact}`}>
      {/* the content band: one rectangle, both columns start and end on its two edges */}
      <div className={`container hero-grid ${styles.gridCompact}`}>
        <div className="hero-copy">
          <MaskedLines
            as="h1"
            immediate
            className="display hero-title"
            lines={["You know something", "needs to change."]}
          />
          <Reveal as="p" className="hero-desc" delay={0.45}>
            Coaching for people ready to figure out where they go next — through a decision,
            a loss, a change in identity, or a pattern they want to understand.
          </Reveal>
          <Reveal className="hero-actions" delay={0.6}>
            <Link
              className="button"
              href="/book?utm_source=growthgains&utm_medium=website&utm_campaign=consultation&utm_content=homepage-hero"
            >
              Book a free consultation
            </Link>
            <Link className="button secondary" href="/contact">Contact</Link>
          </Reveal>
        </div>

        <div className="hero-portrait">
          <div className="hero-media"><Portrait /></div>
        </div>
      </div>

      <Marquee />
    </section>
  );
}
