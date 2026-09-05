import { Reveal, RevealItem } from "./motion-kit";
import styles from "./Doorways.module.css";

type IconName = "compass" | "fork" | "person" | "heart" | "cycle" | "mountain";

type Doorway = {
  name: string;
  copy: string;
  icon: IconName;
  tone: string;
};

const doorways: Doorway[] = [
  {
    name: "You feel stuck",
    copy: "You know something needs to move, but you’re not sure where to begin.",
    icon: "compass",
    tone: styles.mist,
  },
  {
    name: "You’re facing a major decision",
    copy: "The next choice feels like it could change everything.",
    icon: "fork",
    tone: styles.stone,
  },
  {
    name: "Your identity is shifting",
    copy: "Who you’ve been doesn’t fully fit where you’re going.",
    icon: "person",
    tone: styles.leaf,
  },
  {
    name: "You’re carrying grief or loss",
    copy: "Life changed, and you’re learning what comes after.",
    icon: "heart",
    tone: styles.dawn,
  },
  {
    name: "You keep seeing the same patterns",
    copy: "You want to understand why they keep returning and what you can do differently.",
    icon: "cycle",
    tone: styles.water,
  },
  {
    name: "You’re entering a new chapter",
    copy: "Life after sport, foster care or adoption, leadership change, or another major transition can reshape what comes next.",
    icon: "mountain",
    tone: styles.ridge,
  },
];

const otherAreas = [
  "Collegiate athletes",
  "Foster care and adoption",
  "Leadership transitions",
  "Grief and loss",
  "Difficult seasons",
  "And more",
] as const;

function DoorwayIcon({ name }: { name: IconName }) {
  if (name === "compass") {
    return (
      <svg viewBox="0 0 48 48" aria-hidden="true">
        <circle cx="24" cy="24" r="16" />
        <path d="M29.7 18.3 26 26l-7.7 3.7L22 22l7.7-3.7Z" />
      </svg>
    );
  }

  if (name === "fork") {
    return (
      <svg viewBox="0 0 48 48" aria-hidden="true">
        <path d="M24 36V15" />
        <path d="m24 15-7 7" />
        <path d="m24 15 7 7" />
        <path d="M17 22h-5v-5" />
        <path d="M31 22h5v-5" />
      </svg>
    );
  }

  if (name === "person") {
    return (
      <svg viewBox="0 0 48 48" aria-hidden="true">
        <circle cx="24" cy="17" r="6" />
        <path d="M14 36c0-6 4.5-10 10-10s10 4 10 10" />
      </svg>
    );
  }

  if (name === "heart") {
    return (
      <svg viewBox="0 0 48 48" aria-hidden="true">
        <path d="M24 36S10 28.2 10 18.8C10 13.9 13.6 11 17.8 11c2.7 0 5 1.4 6.2 3.5C25.2 12.4 27.5 11 30.2 11c4.2 0 7.8 2.9 7.8 7.8C38 28.2 24 36 24 36Z" />
      </svg>
    );
  }

  if (name === "cycle") {
    return (
      <svg viewBox="0 0 48 48" aria-hidden="true">
        <path d="M35.5 18A13 13 0 0 0 14 15.8" />
        <path d="m14 15.8 1-6.2" />
        <path d="m14 15.8 6.2 1" />
        <path d="M12.5 30A13 13 0 0 0 34 32.2" />
        <path d="m34 32.2-1 6.2" />
        <path d="m34 32.2-6.2-1" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 48 48" aria-hidden="true">
      <path d="m8 35 11-17 7 10 5-7 9 14H8Z" />
      <path d="m19 18 3 4 4-2" />
    </svg>
  );
}

export function Doorways() {
  return (
    <section className={styles.section} aria-labelledby="doorways-heading">
      <div className={styles.inner}>
        <div className={styles.heading}>
          <span className={styles.kicker}>Life transitions</span>
          <h2 id="doorways-heading">
            You may be here <em>because…</em>
          </h2>
          <p>
            Different stories. A common truth — something needs to change.
            <br />
            Wherever you are, you don’t have to figure it out alone.
          </p>
        </div>

        <Reveal className={styles.grid} stagger={0.06}>
          {doorways.map((doorway) => (
            <RevealItem className={`${styles.card} ${doorway.tone}`} key={doorway.name}>
              <div className={styles.icon}>
                <DoorwayIcon name={doorway.icon} />
              </div>
              <span className={styles.divider} aria-hidden="true" />
              <div className={styles.copy}>
                <h3>{doorway.name}</h3>
                <p>{doorway.copy}</p>
              </div>
            </RevealItem>
          ))}
        </Reveal>

        <div className={styles.otherAreas}>
          <span className={styles.otherLabel}>Other areas Michael works with</span>
          <div className={styles.areaList}>
            {otherAreas.map((area) => (
              <span className={styles.areaItem} key={area}>{area}</span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
