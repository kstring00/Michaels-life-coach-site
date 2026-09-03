"use client";

import { useRouter } from "next/navigation";
import { MagneticButton } from "./motion-kit";

/** The single MagneticButton on the site. The hero CTA stays a real anchor. */
export function ConsultButton({ className = "" }: { className?: string }) {
  const router = useRouter();
  return (
    <MagneticButton className={`button ${className}`} onClick={() => router.push("/consultation")}>
      Book a free consultation
    </MagneticButton>
  );
}
