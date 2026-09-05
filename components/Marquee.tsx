import { VelocityMarquee, MarqueeItem } from "./motion-kit";

/**
 * The three doorways, named the same way the section below names them.
 * Sentence case and half the old velocity: these are difficult circumstances,
 * and setting them in caps at speed reads flip.
 */
const doorways = ["Identity and major decisions", "Life after sport", "Foster care and adoption"];

export function Marquee() {
  return (
    <VelocityMarquee className="marquee" baseVelocity={-1.5} copies={6}>
      {doorways.map((d) => <MarqueeItem key={d}>{d}</MarqueeItem>)}
    </VelocityMarquee>
  );
}
