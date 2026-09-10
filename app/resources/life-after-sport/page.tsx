import type { Metadata } from "next";
import { ResourcePage } from "@/components/ResourcePage";
import { bySlug } from "@/lib/resources";

const resource = bySlug("life-after-sport");
const description = resource.framing[0];

export const metadata: Metadata = {
  title: resource.title,
  description,
  openGraph: {
    title: resource.title,
    description,
    type: "article",
    url: "/resources/life-after-sport",
  },
};

export default function LifeAfterSport() {
  return <ResourcePage resource={resource} />;
}
