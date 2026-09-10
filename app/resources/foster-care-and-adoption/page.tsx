import type { Metadata } from "next";
import { ResourcePage } from "@/components/ResourcePage";

export const metadata: Metadata = {
  title: "Questions for a changing family | GrowthGains",
  description:
    "A free set of questions for families in foster care and adoption transitions. No signup.",
};

export default function FosterCareAndAdoption() {
  return (
    <ResourcePage
      kicker="Foster care and adoption"
      title="Questions for a changing family"
      framing="Building a family, or leaving a system, reshapes more than a household. These are questions to sit with, not to answer quickly. Take what is useful and leave the rest."
      count={8}
    />
  );
}
