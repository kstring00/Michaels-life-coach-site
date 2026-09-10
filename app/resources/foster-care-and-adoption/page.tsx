import type { Metadata } from "next";
import { ResourcePage } from "@/components/ResourcePage";
import { bySlug } from "@/lib/resources";

const resource = bySlug("foster-care-and-adoption");
const description = resource.framing[0];

export const metadata: Metadata = {
  title: resource.title,
  description,
  openGraph: {
    title: resource.title,
    description,
    type: "article",
    url: "/resources/foster-care-and-adoption",
  },
};

export default function FosterCareAndAdoption() {
  return <ResourcePage resource={resource} />;
}
