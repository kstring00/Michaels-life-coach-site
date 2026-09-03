import Image from "next/image";
import Link from "next/link";

export function Brand() {
  return (
    <Link href="/" className="brand" aria-label="GrowthGains home">
      <Image src="/growthgains-mark.svg" alt="" width={30} height={34} priority />
      <span className="brand-name">GrowthGains</span>
    </Link>
  );
}
