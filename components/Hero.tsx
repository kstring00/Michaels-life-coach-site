import Link from "next/link";
import { Portrait } from "./Portrait";
import { Marquee } from "./Marquee";
import { MaskedLines, Reveal } from "./motion-kit";

/**
 * Light hero. Flat warm ground, brass accent, portrait bleeding to the right
 * edge of the viewport. No canvas, no pattern, no background animation — the
 * MaskedLines headline and the staggered reveal below it are the only motion.
 */

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

export function Hero() {
  return (
    <section className="hero">
      <div className="hero-grid">
        <div className="hero-copy">
          <Reveal as="p" className="hero-eyebrow" y={10} delay={0.15}>
            Clarity <span aria-hidden="true">/</span> Perspective <span aria-hidden="true">/</span> Progress
          </Reveal>

          {/* rag is hand-set; the closing line carries the italic */}
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
            <Link
              className="button"
              href="/book?utm_source=growthgains&utm_medium=website&utm_campaign=consultation&utm_content=homepage-hero"
            >
              Book a free consultation <span className="arrow" aria-hidden="true">→</span>
            </Link>
            <Link className="button secondary" href="/contact">Contact</Link>
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

        <div className="hero-portrait">
          <div className="hero-media"><Portrait /></div>
          <p className="hero-badge">Better<br />perspective<br />brighter<br />tomorrows</p>
          <p className="hero-tags">
            Life transitions<br />Identity<br />Purpose<br />Real progress
          </p>
        </div>
      </div>

      <Marquee />
    </section>
  );
}
