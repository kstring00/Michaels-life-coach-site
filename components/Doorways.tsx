import { Reveal, RevealItem } from "./motion-kit";

/**
 * The recognition beat. Three doorways, not eight — the umbrella line beneath
 * does the broadening, so each doorway can stay specific enough to be found.
 * The staggered reveal on the row is the section's only motion.
 */
const doorways = [
  {
    name: "Identity and major decisions",
    copy: "You are facing a choice that changes things, or you keep watching the same pattern come back around and you want to understand why.",
  },
  {
    name: "Life after sport — collegiate athletes",
    copy: "The last game has been played. The thing that organised your days and told you who you were is over, and nobody prepared you for after.",
  },
  {
    name: "Foster care and adoption",
    copy: "You are inside a family story most people only see from the outside — as a parent, or as the person who grew up in it.",
  },
] as const;

export function Doorways() {
  return (
    <section className="section doorways" aria-labelledby="doorways-heading">
      <div className="container">
        {/* the resolution below is deliberately not the heading, so the heading is hidden */}
        <h2 className="sr-only" id="doorways-heading">Who this is for</h2>

        <Reveal className="doorway-row" stagger={0.08}>
          {doorways.map((d) => (
            <RevealItem className="doorway" key={d.name}>
              <h3>{d.name}</h3>
              <p>{d.copy}</p>
            </RevealItem>
          ))}
        </Reveal>

        <p className="display doorway-umbrella">
          You know something needs to change, and you want support figuring out where you are going next.
        </p>
      </div>
    </section>
  );
}
