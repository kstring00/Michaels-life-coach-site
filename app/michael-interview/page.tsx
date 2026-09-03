import type { Metadata } from "next";
import InterviewStudio from "./InterviewStudio";

export const metadata: Metadata = {
  title: "Michael Interview Draft",
  robots: { index: false, follow: false, nocache: true },
};

export default function MichaelInterviewPage() {
  return <InterviewStudio />;
}
