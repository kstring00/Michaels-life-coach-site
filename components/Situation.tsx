import { MaskedLines, Reveal } from "./motion-kit";

export function Situation() {
  return (
    <section className="section situation">
      <div className="container situation-grid">
        <MaskedLines className="display" lines={["Something changed."]} />
        <Reveal as="p" className="body-lg">
          A life can change before you know what to call it. The hard part is not the ending; it is
          working out who you are without the role or direction that used to organize everything.
        </Reveal>
      </div>
    </section>
  );
}
