import { ThresholdHero } from "@/components/ThresholdHero";
import { RoleStrip } from "@/components/RoleStrip";
import { TransitionMap } from "@/components/TransitionMap";
import { MichaelIntro } from "@/components/MichaelIntro";
import { OfferSection } from "@/components/OfferSection";
import { CompareSection } from "@/components/CompareSection";
import { FrameworkJourney } from "@/components/FrameworkJourney";
import { StoriesSection } from "@/components/StoriesSection";
import { FinalCTA } from "@/components/FinalCTA";

export default function Home(){return <main><ThresholdHero/><RoleStrip/><section className="section inbetween"><div className="container statement-grid"><h2 className="display">Something changed.</h2><div className="statement-copy"><p className="body-lg">Sometimes the hardest part is not knowing that something has ended. It is figuring out who you are without the role, relationship, plan or direction that used to organize your life.</p><div className="statement-quote">You do not have to figure out the next chapter alone.</div></div></div></section><TransitionMap/><MichaelIntro/><OfferSection/><CompareSection/><FrameworkJourney/><StoriesSection/><FinalCTA/></main>}
