import Link from "next/link";

export function CompareSection() {
  return (
    <section className="split-compare" aria-label="Coaching versus counseling">
      <div className="compare-side coaching">
        <div className="eyebrow">GrowthGains</div>
        <h2 className="display">Coaching</h2>
        <ul>
          <li>Present and future oriented</li>
          <li>Identity and life transitions</li>
          <li>Goals, choices and accountability</li>
          <li>Values, direction and forward movement</li>
          <li>Designed for non-clinical coaching needs</li>
        </ul>
      </div>
      <div className="compare-side counseling">
        <div className="eyebrow">Clinical care</div>
        <h2 className="display">Counseling / Therapy</h2>
        <ul>
          <li>May assess or treat mental-health concerns</li>
          <li>May include diagnosis when clinically appropriate</li>
          <li>Can focus on healing, symptoms and clinical intervention</li>
          <li>Provided by appropriately licensed mental-health professionals</li>
          <li>May be the better fit when clinical treatment is needed</li>
        </ul>
      </div>
      <div className="compare-note">
        <span>Both can be valuable. They serve different purposes. GrowthGains coaching is not psychotherapy or a substitute for mental-health treatment.</span>
        <Link href="/coaching-vs-counseling">Coaching vs. counseling</Link>
      </div>
    </section>
  );
}
