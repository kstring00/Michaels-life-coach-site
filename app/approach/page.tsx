import "./approach.css";
import { PageHero } from "@/components/PageHero";
import { FrameworkJourney } from "@/components/FrameworkJourney";
import { FinalCTA } from "@/components/FinalCTA";

export const metadata={title:"Approach"};

export default function Approach(){return <main className="approach-page"><PageHero eyebrow="Approach" title="Better questions. Clearer ownership." lead="GrowthGains is designed to help you understand a transition, reclaim your own direction and convert insight into deliberate action."/><FrameworkJourney/><section className="section page-body approach-definition"><div className="container editorial-grid"><h2 className="display">What the work is—and what it is not.</h2><div className="prose"><p>Coaching is collaborative. I bring structure, questions, reflection and accountability. You bring the lived experience, choices and authority over your own life.</p><p>The work is not a script, diagnosis or clinical treatment. It is not about giving you a prefabricated answer or turning a complex season into a productivity challenge.</p><blockquote>A useful coaching conversation should leave you more able to see, choose and act—not more dependent on the coach.</blockquote></div></div></section><FinalCTA/></main>}
