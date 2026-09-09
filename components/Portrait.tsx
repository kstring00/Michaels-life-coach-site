import Image from "next/image";
import michaelCutout from "../mikenobacgrnd.png";

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
      src={michaelCutout}
      alt={alt}
      fill
      priority={priority}
      sizes="(max-width: 768px) 100vw, 50vw"
      style={{ objectFit: "contain", objectPosition: "center bottom" }}
    />
  );
}
