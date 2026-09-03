"use client";
import { motion } from "motion/react";
import { transitions } from "@/lib/site";

export function TransitionMap(){
  return <section className="section transition-map"><div className="container">
    <div className="section-head"><div><h2 className="display">A life can change before you know what to call it.</h2></div><p className="body-lg">GrowthGains is built for transitions that rearrange your roles, your direction or the way you understand yourself.</p></div>
    <div className="transition-list">{transitions.map(([name,desc],i)=><motion.div className="transition-row" key={name} initial={{opacity:0,y:15}} whileInView={{opacity:1,y:0}} viewport={{once:true,amount:.35}} transition={{delay:i*.04,duration:.45}}><span className="transition-num">0{i+1}</span><span className="transition-name">{name}</span><span className="transition-desc">{desc}</span><span className="transition-arrow">↗</span></motion.div>)}</div>
  </div></section>
}
