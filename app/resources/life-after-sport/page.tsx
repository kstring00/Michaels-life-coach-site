import type { Metadata } from "next";
import { ResourcePage } from "@/components/ResourcePage";

export const metadata: Metadata = {
  title: "Questions for when a season ends | GrowthGains",
  description:
    "A free set of questions for athletes working out what comes after the sport. No signup.",
};

export default function LifeAfterSport() {
  return (
    <ResourcePage
      kicker="Life after sport"
      title="Questions for when a season ends"
      framing="The identity that carried you for years ends on a Tuesday, and what replaces it isn't obvious. These are questions to sit with, not to answer quickly. Take what is useful and leave the rest."
      count={8}
    />
  );
}
