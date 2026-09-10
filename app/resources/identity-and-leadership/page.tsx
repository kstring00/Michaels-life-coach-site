import type { Metadata } from "next";
import { ResourcePage } from "@/components/ResourcePage";
import { bySlug } from "@/lib/resources";

const resource = bySlug("identity-and-leadership");
const description = resource.framing[0];

export const metadata: Metadata = {
  title: resource.title,
  description,
  openGraph: {
    title: resource.title,
    description,
    type: "article",
    url: "/resources/identity-and-leadership",
  },
};

export default function IdentityAndLeadership() {
  return <ResourcePage resource={resource} />;
}
