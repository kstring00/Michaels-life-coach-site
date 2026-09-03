import Link from "next/link";
import { MaskedLines, Reveal, RevealItem } from "./motion-kit";

const coaching = [
  "Present and future oriented",
  "Identity and life transitions",
  "Goals, choices and accountability",
  "Values, direction and forward movement",
  "Designed for non-clinical coaching needs",
];

const clinical = [
  "May assess or treat mental-health concerns",
  "May include diagnosis when clinically appropriate",
  "Can focus on healing, symptoms and clinical intervention",
  "Provided by appropriately licensed mental-health professionals",
  "May be the better fit when clinical treatment is needed",
];

function Panel({ side, label, heading, items }: { side: string; label: string; heading: string[]; items: string[] }) {
  return (
    <div className={`compare-side ${side}`}>
      <div className="eyebrow">{label}</div>
      <MaskedLines className="display" lines={heading} />
      <Reveal as="ul" stagger={0.08}>
        {items.map((t) => <RevealItem as="li" key={t}>{t}</RevealItem>)}
      </Reveal>
    </div>
  );
}

export function CompareSection() {
  return (
    <section className="split-compare" aria-label="Coaching versus counseling">
      <Panel side="coaching" label="GrowthGains" heading={["Coaching"]} items={coaching} />
      <Panel side="counseling" label="Clinical care" heading={["Counseling / Therapy"]} items={clinical} />
      <div className="compare-note">
        <span>Both can be valuable. They serve different purposes. GrowthGains coaching is not psychotherapy or a substitute for mental-health treatment.</span>
        <Link href="/coaching-vs-counseling">Coaching vs. counseling</Link>
      </div>
    </section>
  );
}
