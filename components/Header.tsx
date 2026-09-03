"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Brand } from "./Brand";

const links = [
  ["About", "/about"],
  ["Coaching", "/identity-in-transition"],
  ["Approach", "/approach"],
  ["Contact", "/contact"],
] as const;

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const bookHref = `/book?utm_source=growthgains&utm_medium=website&utm_campaign=consultation&utm_content=${encodeURIComponent(`${pathname}:header`)}`;

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
          <Link className="nav-cta" href={bookHref}>Book a free consultation</Link>
        </nav>
        <button className="mobile-toggle" aria-expanded={open} aria-controls="mobile-menu" onClick={() => setOpen(!open)}>
          {open ? "Close" : "Menu"}
        </button>
      </div>
      <nav id="mobile-menu" className={`mobile-menu ${open ? "open" : ""}`} aria-label="Mobile navigation">
        {links.map(([label, href]) => <Link key={href} href={href} onClick={() => setOpen(false)}>{label}</Link>)}
        <Link href={bookHref} onClick={() => setOpen(false)}>Book a free consultation</Link>
        <Link href="/contact" onClick={() => setOpen(false)}>Contact</Link>
      </nav>
    </header>
  );
}
