import { PageHero } from "@/components/PageHero";
import { StoriesSection } from "@/components/StoriesSection";
import { FinalCTA } from "@/components/FinalCTA";
export const metadata={title:"Client Stories"};
export default function Stories(){return <main><PageHero eyebrow="Client stories" title="Trust is not built with invented proof." lead="Testimonials will be published only when a GrowthGains client chooses to share their experience and the appropriate permission is in place."/><StoriesSection/><FinalCTA/></main>}
