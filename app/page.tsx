import { Hero } from "@/components/Hero";
import { Marquee } from "@/components/Marquee";
import { Situation } from "@/components/Situation";
import { MichaelIntro } from "@/components/MichaelIntro";
import { WorkSequence } from "@/components/WorkSequence";
import { CompareSection } from "@/components/CompareSection";
import { FinalCTA } from "@/components/FinalCTA";

export default function Home() {
  return (
    <main>
      <Hero />
      <Marquee />
      <Situation />
      <MichaelIntro />
      <WorkSequence />
      <CompareSection />
      <FinalCTA />
    </main>
  );
}
