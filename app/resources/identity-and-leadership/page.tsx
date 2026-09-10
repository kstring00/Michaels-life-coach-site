import type { Metadata } from "next";
import { ResourcePage } from "@/components/ResourcePage";

export const metadata: Metadata = {
  title: "Questions for who you’re becoming | GrowthGains",
  description:
    "A free set of questions for a change in title, role, or identity. No signup.",
};

export default function IdentityAndLeadership() {
  return (
    <ResourcePage
      kicker="Identity and leadership change"
      title="Questions for who you’re becoming"
      framing="New title, new city, new role — and who you were may not be who stays. These are questions to sit with, not to answer quickly. Take what is useful and leave the rest."
      count={8}
    />
  );
}
