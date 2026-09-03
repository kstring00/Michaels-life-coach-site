import { Hero } from "@/components/Hero";
import { Situation } from "@/components/Situation";
import { MichaelIntro } from "@/components/MichaelIntro";
import { WorkSequence } from "@/components/WorkSequence";
import { CompareSection } from "@/components/CompareSection";
import { FinalCTA } from "@/components/FinalCTA";

export default function Home() {
  return (
    <main>
      <Hero />
      <Situation />
      <MichaelIntro />
      <WorkSequence />
      <CompareSection />
      <FinalCTA />
    </main>
  );
}
