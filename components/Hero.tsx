import Link from "next/link";
import { Portrait } from "./Portrait";
import { Marquee } from "./Marquee";
import FlowField from "./FlowField";
import { MaskedLines, ParallaxMedia, Reveal } from "./motion-kit";

/* module scope: a fresh array each render would retrigger FlowField's effect */
const FIELD = ["#0A121E", "#123A57", "#0E2233"];
const GLYPHS: [string, string, string] = ["|", "=", "+"];

export function Hero() {
  return (
    <section className="hero">
      <FlowField
        className="hero-field"
        gradient={FIELD}
        glyphs={GLYPHS}
        color="193,209,207"
        alpha={0.28}
        peak={0.85}
        spacing={22}
        radius={220}
        swirl={0.7}
      />

      <svg
        className="contours hero-contours"
        viewBox="0 0 1600 900"
        preserveAspectRatio="none"
        aria-hidden="true"
        focusable="false"
      >
        <path d="M-120 610 C190 455 395 525 615 430 C855 325 1090 350 1310 245 C1450 180 1555 165 1710 205" />
        <path d="M-140 735 C135 605 360 650 585 560 C845 455 1055 505 1280 405 C1450 330 1580 315 1720 340" />
        <path d="M-90 330 C205 220 420 300 655 220 C885 142 1110 190 1335 120 C1480 75 1590 78 1710 118" />
        <path d="M20 885 C315 735 510 765 720 690 C945 610 1135 620 1375 520 C1510 465 1615 455 1735 480" />
      </svg>

      <div className="hero-scrim" aria-hidden="true" />

      {/* the content band: one rectangle, both columns start and end on its edges */}
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
            <Link
              className="button"
              href="/book?utm_source=growthgains&utm_medium=website&utm_campaign=consultation&utm_content=homepage-hero"
            >
              Book a free consultation
            </Link>
            <Link className="button secondary" href="/contact">Contact</Link>
          </Reveal>
        </div>

        {/* the only parallax on the page */}
        <ParallaxMedia className="hero-portrait" range={40}>
          <div className="hero-media"><Portrait /></div>
        </ParallaxMedia>
      </div>

      <Marquee />
    </section>
  );
}
