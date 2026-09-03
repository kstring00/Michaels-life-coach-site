import Link from "next/link";
const steps=[
  ["Where you are","Name the transition clearly enough to stop moving around it."],
  ["What is changing","Separate roles, expectations and old assumptions from the parts of you that still belong."],
  ["What matters now","Create room for values, needs and direction to become visible again."],
  ["How you move","Turn clarity into deliberate next actions without pretending every answer has to arrive at once."],
];
export function OfferSection(){return <section className="section offer"><div className="container offer-shell"><div><div className="eyebrow">The main offer</div><h2 className="display">Identity in Transition Coaching</h2></div><div className="offer-copy"><p className="body-lg">You do not need someone to hand you a new identity. You need a place to understand what is changing, what is worth carrying forward and what you want to build next.</p><div className="offer-steps">{steps.map(([h,p],i)=><div className="offer-step" key={h}><span className="n">0{i+1}</span><div><strong>{h}</strong><span>{p}</span></div></div>)}</div><div style={{marginTop:32}}><Link className="button" href="/identity-in-transition">Explore the coaching offer <span className="arrow">→</span></Link></div></div></div></section>}
