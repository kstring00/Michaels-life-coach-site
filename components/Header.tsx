"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Brand } from "./Brand";

const links = [
  ["About", "/about"],
  ["Coaching", "/identity-in-transition"],
  ["Approach", "/approach"],
  ["Stories", "/stories"],
  ["Contact", "/contact"],
] as const;

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className={`header ${scrolled ? "scrolled" : ""}`}>
      <div className="container header-inner">
        <Brand />
        <nav className="nav" aria-label="Main navigation">
          {links.map(([label, href]) => <Link className="nav-link" key={href} href={href}>{label}</Link>)}
          <Link className="nav-cta" href="/consultation">Book a consultation</Link>
        </nav>
        <button className="mobile-toggle" aria-expanded={open} aria-controls="mobile-menu" onClick={() => setOpen(!open)}>
          {open ? "Close" : "Menu"}
        </button>
      </div>
      <nav id="mobile-menu" className={`mobile-menu ${open ? "open" : ""}`} aria-label="Mobile navigation">
        {links.map(([label, href]) => <Link key={href} href={href} onClick={() => setOpen(false)}>{label}</Link>)}
        <Link href="/consultation" onClick={() => setOpen(false)}>Book a consultation →</Link>
        <Link href="/start" onClick={() => setOpen(false)}>Start coaching →</Link>
      </nav>
    </header>
  );
}
