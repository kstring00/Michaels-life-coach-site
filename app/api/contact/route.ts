import { NextResponse } from "next/server";

function clean(value: unknown, max=3000){ return String(value ?? "").trim().slice(0,max); }

export async function POST(request: Request){
  let body: Record<string, unknown>;
  try { body = await request.json(); } catch { return NextResponse.json({message:"Please check the form and try again."},{status:400}); }
  const name=clean(body.name,120), email=clean(body.email,200), phone=clean(body.phone,80), heard=clean(body.heard,120), navigate=clean(body.navigate,3500), preferred=clean(body.preferred,80);
  if(!name || !email || !navigate || !email.includes("@")) return NextResponse.json({message:"Please include your name, a valid email and what you are trying to navigate."},{status:400});
  const apiKey=process.env.RESEND_API_KEY, to=process.env.CONTACT_TO_EMAIL, from=process.env.CONTACT_FROM_EMAIL || "GrowthGains <onboarding@resend.dev>";
  if(!apiKey || !to){ return NextResponse.json({message:"The form is built, but Michael's notification inbox has not been connected yet. Please use the consultation page while the site is being configured."},{status:503}); }
  const subject=`GrowthGains inquiry — ${name}`;
  const text=[`Name: ${name}`,`Email: ${email}`,`Phone: ${phone || "Not provided"}`,`Preferred contact: ${preferred || "Not provided"}`,`How they heard about GrowthGains: ${heard || "Not provided"}`,"","What they are navigating:",navigate].join("\n");
  const res=await fetch("https://api.resend.com/emails",{method:"POST",headers:{Authorization:`Bearer ${apiKey}`,"Content-Type":"application/json"},body:JSON.stringify({from,to:[to],reply_to:email,subject,text})});
  if(!res.ok) return NextResponse.json({message:"Your message could not be delivered right now. Please try the consultation route instead."},{status:502});
  return NextResponse.json({ok:true});
}
