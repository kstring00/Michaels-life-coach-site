import { Reveal, RevealItem } from "./motion-kit";
import styles from "./Program.module.css";

type IconName = "laptop" | "clock" | "calendar" | "chat" | "video" | "target" | "steps" | "journal" | "map" | "people";

const format = [
  ["laptop", "Fully virtual", "Meet from anywhere"],
  ["clock", "60-minute sessions", "Focused, intentional time"],
  ["calendar", "12-week program", "A steady rhythm for change"],
] as const;

const arc = [
  {
    icon: "chat" as IconName,
    label: "Consultation & intake",
    copy: "Before any commitment, you talk. Michael gets to know the whole person, understand where you are now, and decide with you whether coaching is the right fit.",
    tag: "No pressure. Just a conversation.",
  },
  {
    icon: "video" as IconName,
    label: "Pre-session clarity",
    copy: "You receive short explainer videos before session one, so your first session is spent on your story, your questions, and your work rather than logistics.",
    tag: "Come prepared. Start strong.",
  },
  {
    icon: "target" as IconName,
    label: "Session one",
    copy: "Together you define the focus for the twelve weeks: what you want to understand, what you want to change, and what meaningful progress would look like.",
    tag: "Clarity creates momentum.",
  },
  {
    icon: "steps" as IconName,
    label: "Weeks 2–12",
    copy: "Each weekly session builds on the last. You listen, reflect, look at patterns, review goals, challenge thinking when needed, and turn insight into practical action.",
    tag: "A steady rhythm for lasting change.",
  },
] as const;

const tools = [
  ["journal", "Reflection questions & exercises", "Go deeper between sessions."],
  ["target", "Written SMART goals", "Stay focused and revise as needed."],
  ["map", "A personal blueprint", "See the bigger picture of your journey."],
  ["journal", "Journaling", "Process what is changing."],
  ["people", "Between-session access", "Reach out when something comes up."],
] as const;

function Icon({ name }: { name: IconName }) {
  if (name === "laptop") return <svg viewBox="0 0 24 24" aria-hidden="true"><rect x="4" y="5" width="16" height="11" rx="1.5"/><path d="M2.5 19h19"/></svg>;
  if (name === "clock") return <svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="8"/><path d="M12 7v5l3 2"/></svg>;
  if (name === "calendar") return <svg viewBox="0 0 24 24" aria-hidden="true"><rect x="4" y="5" width="16" height="15" rx="2"/><path d="M8 3v4M16 3v4M4 9h16"/></svg>;
  if (name === "chat") return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 17.5 4 21l4-2a9 9 0 1 0-3-1.5Z"/></svg>;
  if (name === "video") return <svg viewBox="0 0 24 24" aria-hidden="true"><rect x="4" y="5" width="16" height="14" rx="2"/><path d="m10 9 5 3-5 3V9Z"/></svg>;
  if (name === "target") return <svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="8"/><circle cx="12" cy="12" r="4"/><path d="m12 12 7-7"/></svg>;
  if (name === "steps") return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 18h3v-5h4V9h4V5h3"/></svg>;
  if (name === "map") return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="m4 6 5-2 6 2 5-2v14l-5 2-6-2-5 2V6Z"/><path d="M9 4v14M15 6v14"/></svg>;
  if (name === "people") return <svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="9" cy="9" r="3"/><circle cx="17" cy="10" r="2.5"/><path d="M4 19c0-3 2.2-5 5-5s5 2 5 5M14 15c2.8 0 5 1.6 5 4"/></svg>;
  return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 4h12l2 2v14H5V4Z"/><path d="M8 9h8M8 13h8M8 17h5"/></svg>;
}

export function Program() {
  return (
    <section className={styles.section} aria-labelledby="program-heading">
      <div className={styles.inner}>
        <div className={styles.top}>
          <div>
            <p className={styles.eyebrow}>The coaching journey</p>
            <h2 className={styles.title} id="program-heading">A clear path <em>forward.</em></h2>
            <p className={styles.lede}>
              A structured 12-week coaching journey built around Michael’s approach: understand the whole person, gain perspective, define what matters, and keep moving with intention.
            </p>
          </div>

          <Reveal className={styles.quote}>
            <p>“I can help guide the journey, but I cannot take the journey for them.”</p>
            <span>Michael’s coaching philosophy</span>
          </Reveal>
        </div>

        <Reveal className={styles.format} delay={0.08} stagger={0.06}>
          {format.map(([icon, label, note]) => (
            <RevealItem className={styles.fact} key={label}>
              <span className={styles.factIcon}><Icon name={icon} /></span>
              <span><strong>{label}</strong><small>{note}</small></span>
            </RevealItem>
          ))}
        </Reveal>

        <div className={styles.journey}>
          <span className={styles.pathLine} aria-hidden="true" />
          <Reveal className={styles.steps} stagger={0.08}>
            {arc.map((step, i) => (
              <RevealItem className={styles.step} key={step.label}>
                <span className={styles.stepNumber}>0{i + 1}</span>
                <span className={styles.stepIcon}><Icon name={step.icon} /></span>
                <h3>{step.label}</h3>
                <p>{step.copy}</p>
                <span className={styles.stepTag}>{step.tag}</span>
              </RevealItem>
            ))}
          </Reveal>
        </div>

        <div className={styles.tools}>
          <div>
            <p className={styles.toolsEyebrow}>What you walk away with</p>
            <h3>Tools for a stronger <em>tomorrow.</em></h3>
          </div>

          <Reveal as="ul" className={styles.toolList} stagger={0.06}>
            {tools.map(([icon, name, note]) => (
              <RevealItem as="li" className={styles.tool} key={name}>
                <span className={styles.toolIcon}><Icon name={icon as IconName} /></span>
                <strong>{name}</strong>
                <span>{note}</span>
              </RevealItem>
            ))}
          </Reveal>
        </div>
      </div>
    </section>
  );
}
