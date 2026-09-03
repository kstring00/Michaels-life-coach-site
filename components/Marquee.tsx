import { VelocityMarquee, MarqueeItem } from "./motion-kit";

const domains = ["Divorce", "Empty nest", "Career change"];

export function Marquee() {
  return (
    <VelocityMarquee className="marquee" baseVelocity={-3} copies={6}>
      {domains.map((d) => <MarqueeItem key={d}>{d}</MarqueeItem>)}
    </VelocityMarquee>
  );
}
