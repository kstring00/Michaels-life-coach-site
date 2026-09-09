import Image from "next/image";
import Link from "next/link";
import michaelPortrait from "../mikenobacgrnd.png";
import { Marquee } from "./Marquee";
import { MaskedLines, Reveal } from "./motion-kit";

/* thin line icons, drawn inline so the page pulls in no icon library */
const icons = {
  clarity: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4"
      strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="12" cy="12" r="9" />
      <path d="m15.6 8.4-2.3 5.5-5.5 2.3 2.3-5.5z" />
    </svg>
  ),
  forward: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"
      strokeLinecap="round" aria-hidden="true">
      <path d="M5 19v-5M12 19V9M19 19V4.5" />
    </svg>
  ),
  stronger: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4"
      strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="9.2" cy="8.6" r="3.1" />
      <path d="M3.6 19a5.6 5.6 0 0 1 11.2 0" />
      <path d="M16.4 6.6a3 3 0 0 1 0 5.7" />
      <path d="M17.8 14.4A5.6 5.6 0 0 1 20.8 19" />
    </svg>
  ),
};

const pillars = [
  ["clarity", "Gain clarity", "Understand what matters most right now."],
  ["forward", "Move forward", "Take focused, practical steps."],
  ["stronger", "A stronger you", "Build a life that fits who you’re becoming."],
] as const;

/* The ripples are concentric arcs struck from a single point that sits behind
   Michael's near shoulder, so they read as something spreading outward from
   him. Every arc is kept in the half-plane left of that point — the face and
   neck are to its right — which is what guarantees no ring can cross him.
   Strokes are non-scaling so they stay hairlines at any panel width. */
const ripples = [
  { r: 17, d: "M -9.75 -13.93 A 17 17 0 0 0 -9.75 13.93" },
  { r: 25, d: "M -12.5 -21.65 A 25 25 0 0 0 -12.5 21.65" },
  { r: 34, d: "M -13.83 -31.06 A 34 34 0 0 0 -13.83 31.06" },
  { r: 44, d: "M -14.33 -41.6 A 44 44 0 0 0 -14.33 41.6" },
];

export function Hero() {
  return (
    <section className="hero">
      <div className="hero-grid">
        <div className="hero-copy">
          <Reveal as="p" className="hero-eyebrow" y={10} delay={0.15}>
            Clarity / Perspective / Progress
          </Reveal>

          <MaskedLines
            as="h1"
            immediate
            className="display hero-title"
            lines={["You know", "something", "needs to change."]}
          />

          <Reveal as="p" className="hero-desc" delay={0.45}>
            Coaching for people ready to figure out where they go next — through a decision,
            a loss, a change in identity, or a pattern they want to understand.
          </Reveal>

          <Reveal className="hero-actions" delay={0.58}>
            <Link className="button" href="#consultation">
              Book a free consultation <span className="arrow" aria-hidden="true">→</span>
            </Link>
          </Reveal>

          <Reveal as="ul" className="hero-pillars" delay={0.68}>
            {pillars.map(([icon, label, copy]) => (
              <li className="hero-pillar" key={label}>
                {icons[icon]}
                <div>
                  <b>{label}</b>
                  <span>{copy}</span>
                </div>
              </li>
            ))}
          </Reveal>
        </div>

        {/* Back to front: cream field + halo, line art, portrait, floating card. */}
        <div className="hero-portrait hero-portrait--cutout">
          <div className="hero-stage">
            <svg className="hero-lines" viewBox="-50 -50 100 100" fill="none" aria-hidden="true">
              <defs>
                {/* the ripples have to end somewhere; this dissolves the ends
                    that finish in open field instead of behind him */}
                <linearGradient id="hero-ripple-fade" gradientUnits="userSpaceOnUse"
                  x1="0" y1="-46" x2="0" y2="-8">
                  <stop offset="0" stopColor="#A8905C" stopOpacity="0" />
                  <stop offset="1" stopColor="#A8905C" stopOpacity=".45" />
                </linearGradient>
              </defs>
              {ripples.map(({ r, d }, i) => (
                <path key={r} className={`hero-ripple hero-ripple--${i + 1}`} d={d}
                  stroke="url(#hero-ripple-fade)" vectorEffect="non-scaling-stroke" />
              ))}
              {/* the path forward: it leaves the diagram, passes behind his
                  shoulder and runs off the right edge of the panel */}
              <path className="hero-lines-path" d="M -43.3 25 A 50 50 0 1 1 49.51 -6.96"
                vectorEffect="non-scaling-stroke" />
            </svg>

            <p className="hero-stage-kicker" aria-hidden="true">
              <span>Current</span><i /><b>Next chapter</b>
            </p>

            <ul className="hero-orbit" aria-hidden="true">
              <li className="hero-orbit-node hero-orbit-node--one">Clarity</li>
              <li className="hero-orbit-node hero-orbit-node--two">Direction</li>
              <li className="hero-orbit-node hero-orbit-node--three">Action</li>
            </ul>

            <Image
              className="hero-figure"
              src={michaelPortrait}
              alt="Michael, GrowthGains life coach"
              priority
              sizes="(max-width: 640px) 88vw, (max-width: 1023px) 48vw, 34vw"
            />

            <div className="hero-hook-card">
              <span className="hero-hook-index">01</span>
              <p>
                <strong>The next chapter doesn’t need every answer.</strong>
                <span>It needs the next clear move.</span>
              </p>
            </div>
          </div>
        </div>
      </div>

      <Marquee />
    </section>
  );
}
