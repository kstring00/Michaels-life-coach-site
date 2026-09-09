import Image from "next/image";

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
      src="/michael.webp"
      alt={alt}
      fill
      priority={priority}
      sizes="(max-width: 768px) 100vw, 50vw"
      style={{ objectFit: "cover", objectPosition: "center" }}
    />
  );
}
