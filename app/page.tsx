import "./home.css";
import { Hero } from "@/components/Hero";
import { Doorways } from "@/components/Doorways";
import { MichaelIntro } from "@/components/MichaelIntro";
import { Program } from "@/components/Program";
import { StraightAnswers } from "@/components/StraightAnswers";
import { FinalCTA } from "@/components/FinalCTA";

export default function Home() {
  return (
    <main>
      {/* the ticker is the foot of the hero band, not a section of its own */}
      <Hero />
      <Doorways />
      <MichaelIntro />
      <Program />
      <StraightAnswers />
      <FinalCTA />
    </main>
  );
}
