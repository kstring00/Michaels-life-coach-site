"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Brand } from "./Brand";
import styles from "./HeaderActions.module.css";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

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
        <div className={styles.actions}>
          <Link
            className={styles.aboutLink}
            href="/about"
            aria-current={pathname === "/about" ? "page" : undefined}
          >
            About
          </Link>
          <Link className="nav-cta" href="/#consultation">Book a free consultation</Link>
        </div>
      </div>
    </header>
  );
}
