import { redirect } from "next/navigation";
import { site } from "@/lib/site";

export const metadata = { title: "Book a Free Consultation" };

type SearchParams = Record<string, string | string[] | undefined>;

function first(value: string | string[] | undefined) {
  return Array.isArray(value) ? value[0] : value;
}

function buildBookingUrl(base: string, params: SearchParams) {
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

  return url.toString();
}

export default async function Book({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const params = await searchParams;
  redirect(buildBookingUrl(site.calendarUrl, params));
}
