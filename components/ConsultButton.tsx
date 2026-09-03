"use client";

import { usePathname, useRouter } from "next/navigation";
import { MagneticButton } from "./motion-kit";

/** The single MagneticButton on the site. The hero CTA stays a real anchor. */
export function ConsultButton({
  className = "",
  source = "cta",
}: {
  className?: string;
  source?: string;
}) {
  const router = useRouter();
  const pathname = usePathname();

  const onClick = () => {
    const params = new URLSearchParams({
      utm_source: "growthgains",
      utm_medium: "website",
      utm_campaign: "consultation",
      utm_content: `${pathname}:${source}`,
    });
    router.push(`/book?${params.toString()}`);
  };

  return (
    <MagneticButton className={`button ${className}`} onClick={onClick}>
      Book a free consultation
    </MagneticButton>
  );
}
