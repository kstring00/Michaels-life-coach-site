import Image from "next/image";
import portrait from "@/public/michael.webp";

/**
 * The container sets the shape; the image fills it. A replacement portrait at
 * any aspect ratio drops in without touching layout.
 *
 * object-position lives in globals.css (keyed off data-portrait) so the hero
 * can reframe the crop per breakpoint without a second component.
 */
export function Portrait({
  className = "",
  alt = "Michael, GrowthGains life coach",
  priority = true,
}: {
  className?: string;
  alt?: string;
  priority?: boolean;
}) {
  return (
    <Image
      className={className}
      data-portrait=""
      src={portrait}
      alt={alt}
      fill
      priority={priority}
      sizes="(max-width: 768px) 100vw, 42vw"
      placeholder="blur"
      style={{ objectFit: "cover" }}
    />
  );
}
