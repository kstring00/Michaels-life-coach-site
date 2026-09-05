"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Brand } from "./Brand";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
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
        <Link className="nav-cta" href={bookHref}>Book a free consultation</Link>
      </div>
    </header>
  );
}
