import Image from "next/image";
import portrait from "@/public/michael.webp";

/**
 * The container sets the shape; the image fills it. A replacement portrait at
 * any aspect ratio drops in without touching layout.
 */
export function Portrait({ className = "", alt = "Michael, GrowthGains life coach" }: { className?: string; alt?: string }) {
  return (
    <Image
      className={className}
      src={portrait}
      alt={alt}
      fill
      priority
      sizes="(max-width: 680px) 100vw, (max-width: 1020px) 88vw, 45vw"
      placeholder="blur"
      style={{ objectFit: "cover", objectPosition: "center 27%" }}
    />
  );
}
