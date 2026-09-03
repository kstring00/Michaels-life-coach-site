"use client";
import { FormEvent, useState } from "react";

export function ContactForm({compact=false}:{compact?:boolean}){
  const [status,setStatus]=useState(""); const [sending,setSending]=useState(false);
  async function submit(e:FormEvent<HTMLFormElement>){
    e.preventDefault(); setSending(true); setStatus("");
    const data=Object.fromEntries(new FormData(e.currentTarget));
    try{
      const res=await fetch("/api/contact",{method:"POST",headers:{"content-type":"application/json"},body:JSON.stringify(data)});
      const json=await res.json();
      if(!res.ok) throw new Error(json.message||"Message could not be sent.");
      setStatus("Your message is on its way to Michael. You can also choose a consultation time whenever you are ready.");
      e.currentTarget.reset();
    }catch(err){setStatus(err instanceof Error?err.message:"Message could not be sent right now.");}
    finally{setSending(false)}
  }
  return <form className="form-panel" onSubmit={submit}><div className="form-grid"><div className="field"><label htmlFor="name">Name</label><input id="name" name="name" required autoComplete="name"/></div><div className="field"><label htmlFor="email">Email</label><input id="email" name="email" type="email" required autoComplete="email"/></div><div className="field"><label htmlFor="phone">Phone number</label><input id="phone" name="phone" type="tel" autoComplete="tel"/></div><div className="field"><label htmlFor="heard">How did you hear about GrowthGains?</label><select id="heard" name="heard" defaultValue=""><option value="" disabled>Select one</option><option>Google</option><option>Instagram</option><option>TikTok</option><option>YouTube</option><option>LinkedIn</option><option>Friend / referral</option><option>Event</option><option>Other</option></select></div><div className="field full"><label htmlFor="navigate">What are you trying to navigate?</label><textarea id="navigate" name="navigate" required placeholder="Tell Michael what has changed, what feels unclear, or what you would like help thinking through."/></div>{!compact&&<div className="field full"><label htmlFor="preferred">Best way to reach you</label><select id="preferred" name="preferred" defaultValue="Email"><option>Email</option><option>Phone</option><option>Text</option></select></div>}</div><button className="button" type="submit" disabled={sending} style={{marginTop:30}}>{sending?"Sending…":"Send to Michael"} <span className="arrow">→</span></button><p className="form-status" aria-live="polite">{status||"Your information is used only to respond to your inquiry. Coaching is not emergency or crisis care."}</p></form>
}
