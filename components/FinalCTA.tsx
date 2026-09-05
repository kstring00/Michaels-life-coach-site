import { ACCENT, site } from "@/lib/site";
import styles from "./FinalCTA.module.css";

function buildEmbedUrl(base: string) {
  try {
    const url = new URL(base);
    url.searchParams.set("embed", "true");
    // theme the widget to the section it sits in rather than letting it land
    // as a white rectangle in a dark band.
    url.searchParams.set("theme", "dark");
    url.searchParams.set("brandColor", ACCENT);
    url.searchParams.set("darkBrandColor", ACCENT);
    return url.toString();
  } catch {
    return base;
  }
}

export function FinalCTA() {
  const calendarUrl = buildEmbedUrl(site.calendarUrl);

  return (
    <section className={styles.section} id="consultation" aria-labelledby="consultation-heading">
      <div className={styles.inner}>
        <div className={styles.head}>
          <div>
            <p className={styles.eyebrow}>Start with a conversation</p>
            <h2 className={styles.title} id="consultation-heading">
              Ready to see what comes <em>next?</em>
            </h2>
          </div>
          <p className={styles.copy}>
            You do not need to have everything figured out before we talk. Choose a time below,
            bring the real situation, and we will use the consultation to decide whether coaching
            is the right next step.
          </p>
        </div>

        <div className={styles.calendarShell}>
          <div className={styles.calendarBar}>
            <strong>Book a free consultation with me</strong>
            <span>Choose a time without leaving GrowthGains.</span>
          </div>
          <iframe
            className={styles.calendar}
            src={calendarUrl}
            title="Book a free GrowthGains consultation"
            loading="lazy"
            allow="payment"
          />
        </div>
        <p className={styles.note}>Free consultation. Nothing is signed on the call.</p>
      </div>
    </section>
  );
}
