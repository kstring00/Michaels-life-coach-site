import Link from "next/link";
import { site } from "@/lib/site";

export function Footer() {
  const socials = Object.entries(site.socials).filter(([, href]) => href);
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-top">
          <div>
            <div className="footer-brand">Growth<span>Gains</span></div>
            <p className="body-md" style={{maxWidth: 560, color: "#8495a6"}}>Identity and life-transition coaching for the space between who you were and what comes next.</p>
          </div>
          <div className="footer-nav">
            <Link href="/about">About Michael</Link><Link href="/identity-in-transition">Coaching</Link>
            <Link href="/approach">Approach</Link><Link href="/coaching-vs-counseling">Coaching vs. counseling</Link><Link href="/book?utm_source=growthgains&utm_medium=website&utm_campaign=consultation&utm_content=footer">Free consultation</Link>
            <Link href="/contact">Contact</Link><Link href="/start">Start coaching</Link>
            {socials.map(([label, href]) => <a key={label} href={href} target="_blank" rel="noreferrer">{label[0].toUpperCase()+label.slice(1)}</a>)}
          </div>
        </div>
        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} GrowthGains. All rights reserved.</span>
          <span><Link href="/privacy">Privacy</Link> · <Link href="/disclaimer">Coaching disclaimer</Link></span>
        </div>
      </div>
    </footer>
  );
}
