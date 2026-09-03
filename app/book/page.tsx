import Link from "next/link";
import Script from "next/script";
import { PageHero } from "@/components/PageHero";
import { site } from "@/lib/site";
import "./book.css";

export const metadata = { title: "Book a Free Consultation" };

type SearchParams = Record<string, string | string[] | undefined>;

function first(value: string | string[] | undefined) {
  return Array.isArray(value) ? value[0] : value;
}

function buildCalendlyUrl(base: string, params: SearchParams) {
  try {
    const url = new URL(base);
    const passthrough = [
      "utm_source",
      "utm_medium",
      "utm_campaign",
      "utm_content",
      "utm_term",
      "name",
      "email",
    ] as const;

    for (const key of passthrough) {
      const value = first(params[key]);
      if (value) url.searchParams.set(key, value.slice(0, 180));
    }

    if (!url.searchParams.has("utm_source")) url.searchParams.set("utm_source", "growthgains");
    if (!url.searchParams.has("utm_medium")) url.searchParams.set("utm_medium", "website");
    if (!url.searchParams.has("utm_campaign")) url.searchParams.set("utm_campaign", "consultation");
    url.searchParams.set("hide_gdpr_banner", "1");

    return url.toString();
  } catch {
    return base;
  }
}

export default async function Book({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const params = await searchParams;
  const calendarUrl = site.calendarUrl ? buildCalendlyUrl(site.calendarUrl, params) : "";

  return (
    <main className="booking-page">
      <PageHero
        eyebrow="Free consultation"
        title="Bring the real version."
        lead="You do not need to have the transition figured out before the conversation. Start with what changed, what feels unclear and what you want to understand next."
      />

      <section className="section booking-section">
        <div className="container booking-grid">
          <div className="booking-context">
            <div className="eyebrow">What to expect</div>
            <h2 className="display">A first conversation, not a commitment.</h2>
            <p className="body-lg">
              Michael will use the consultation to understand what you are navigating, what kind of
              support you are looking for and whether coaching is the right fit.
            </p>
            <div className="booking-steps">
              <div><span>01</span><p>Share what changed and what feels unresolved.</p></div>
              <div><span>02</span><p>Talk through what you want from coaching.</p></div>
              <div><span>03</span><p>Decide together whether a next step makes sense.</p></div>
            </div>
          </div>

          <div className="booking-calendar" aria-label="Consultation scheduling">
            {calendarUrl ? (
              <>
                <link rel="stylesheet" href="https://assets.calendly.com/assets/external/widget.css" />
                <div
                  className="calendly-inline-widget"
                  data-url={calendarUrl}
                  style={{ minWidth: 320, height: 760 }}
                />
                <Script
                  src="https://assets.calendly.com/assets/external/widget.js"
                  strategy="lazyOnload"
                />
              </>
            ) : (
              <div className="booking-fallback">
                <div>
                  <div className="eyebrow">Calendar connection</div>
                  <h3>Scheduling is ready for Michael&apos;s live Calendly link.</h3>
                  <p className="body-md">
                    Until the calendar URL is connected, send a consultation request directly and
                    Michael can follow up with scheduling.
                  </p>
                  <Link className="button" href="/contact">Request a consultation</Link>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}
