"use client";
import { useState } from "react";
import Link from "next/link";

const options=["Identity and a major decision","Life after sport","Foster care or adoption","Grief or loss","A pattern I want to change","Something else"];
export function StartFlow(){
  const [step,setStep]=useState(0); const [choice,setChoice]=useState(""); const [goal,setGoal]=useState("");
  return <main className="start-shell"><div className="start-card"><div className="eyebrow" style={{color:"var(--accent)"}}>Start coaching</div><div className="progress">{[0,1,2].map(i=><span key={i} className={i<=step?"active":""}/>)}</div>
  {step===0&&<><h1 className="display">What are you navigating?</h1><p className="lead body-lg">Choose the closest fit. It does not have to describe your situation perfectly.</p><div className="option-list">{options.map(o=><button className={`option ${choice===o?"selected":""}`} key={o} onClick={()=>setChoice(o)}>{o}<span>↗</span></button>)}</div></>}
  {step===1&&<><h1 className="display">What would you most like to change?</h1><p className="lead body-lg">This is not a test. One or two honest sentences are enough to give me a useful starting point.</p><div className="field" style={{marginTop:45}}><label htmlFor="goal" style={{color:"var(--accent)"}}>Your answer</label><textarea id="goal" value={goal} onChange={e=>setGoal(e.target.value)} style={{color:"white",borderColor:"var(--rule-dark)"}} placeholder="I want to understand…"/></div></>}
  {step===2&&<><h1 className="display">You&apos;ve given the conversation a starting point.</h1><p className="lead body-lg">The next step is to choose a consultation time or send me a direct message with the context you just clarified.</p><div style={{display:"flex",gap:12,flexWrap:"wrap",marginTop:40}}><Link className="button" href={`/book?utm_source=growthgains&utm_medium=website&utm_campaign=consultation&utm_content=start-flow&transition=${encodeURIComponent(choice)}&goal=${encodeURIComponent(goal)}`}>Choose a consultation time →</Link><Link className="button secondary" href={`/contact?transition=${encodeURIComponent(choice)}&goal=${encodeURIComponent(goal)}`}>Contact me directly ↗</Link></div></>}
  {step<2&&<div className="start-nav"><button className="button secondary" disabled={step===0} onClick={()=>setStep(Math.max(0,step-1))}>← Back</button><button className="button" disabled={(step===0&&!choice)||(step===1&&!goal.trim())} onClick={()=>setStep(Math.min(2,step+1))}>Continue →</button></div>}</div></main>
}
