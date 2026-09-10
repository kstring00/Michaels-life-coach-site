import "./home.css";
import "./hero-cutout.css";
import { Hero } from "@/components/Hero";
import { Doorways } from "@/components/Doorways";
import { MichaelIntro } from "@/components/MichaelIntro";
import { Candor } from "@/components/Candor";
import { Program } from "@/components/Program";
import { FinalCTA } from "@/components/FinalCTA";

export default function Home() {
  return (
    <main>
      {/* the ticker is the foot of the hero band, not a section of its own */}
      <Hero />
      <Doorways />
      <MichaelIntro />
      <Candor />
      <Program />
      <FinalCTA />
    </main>
  );
}
