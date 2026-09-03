const items=[
  ["Notice","Name what changed","Slow the transition down enough to see what is actually different—not just what feels uncomfortable."],
  ["Untangle","Separate role from identity","Look at the roles, expectations and stories that have been carrying more weight than they should."],
  ["Reorient","Find what still matters","Clarify values, needs and direction without rushing to replace the old chapter with a new performance."],
  ["Move","Act with intention","Choose practical next steps that reflect what you are learning about yourself and where you want to go."],
];
export function FrameworkJourney(){return <section className="section framework"><div className="container"><div className="framework-head"><div className="eyebrow" style={{color:"#75b7ff"}}>The GrowthGains approach</div><h2 className="display">Clarity is not a lightning bolt. It is built through better questions.</h2><p className="body-lg">This is not a rigid clinical protocol or a promise that change follows four perfect steps. It is the rhythm the coaching conversation is designed to support.</p></div><div>{items.map(([phase,h,p],i)=><div className="journey-step" key={phase}><div className="journey-node" aria-hidden="true"></div><div className="journey-content"><div className="phase">0{i+1} / {phase}</div><h3>{h}</h3><p>{p}</p></div></div>)}</div></div></section>}
