import { Contours } from "./Contours";
export function PageHero({eyebrow,title,lead}:{eyebrow:string;title:string;lead:string}){return <section className="page-hero"><Contours/><div className="container"><div className="eyebrow" style={{color:"var(--ink-secondary)"}}>{eyebrow}</div><h1 className="display">{title}</h1><p className="body-lg">{lead}</p></div></section>}
