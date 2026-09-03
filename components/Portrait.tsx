import { michael1 } from "@/lib/michael-1";
import { michael2 } from "@/lib/michael-2";
import { michael3 } from "@/lib/michael-3";

const src = `data:image/webp;base64,${michael1}${michael2}${michael3}`;

export function Portrait({ className = "", alt = "Michael, GrowthGains life coach" }: { className?: string; alt?: string }) {
  return <img className={className} src={src} alt={alt} loading="eager" decoding="async" />;
}
