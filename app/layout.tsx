import type { Metadata } from "next";
import { Pinyon_Script } from "next/font/google";
import "./globals.css";

/* the signature under Michael's pull quote — downloaded and self-hosted at
   build time, so there is no runtime request to Google */
const signature = Pinyon_Script({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
  variable: "--font-signature",
});
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { BackToTop } from "@/components/BackToTop";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: { default: "GrowthGains | Coaching for what needs to change", template: "%s | GrowthGains" },
  description: site.description,
  keywords: ["life coach", "identity coaching", "life transition coach", "coaching for collegiate athletes", "life after sport coaching", "foster care and adoption coaching", "grief and loss coaching"],
  icons: { icon: "/growthgains-mark.svg" },
  openGraph: { title: "GrowthGains", description: site.description, type: "website" },
};

export default function RootLayout({children}:{children:React.ReactNode}) {
  return (
    <html lang="en" className={signature.variable}>
      <head>
        {/* Every entry animation renders its "hidden" state inline from the server
            and is released by JS. With scripting off nothing releases it, so the
            page loads blank. This neutralises the whole kit at first paint —
            same data-mk hook the reduced-motion rule in globals.css uses. */}
        <noscript
          dangerouslySetInnerHTML={{
            __html: '<style>[data-mk="reveal"]{opacity:1!important;transform:none!important}</style>',
          }}
        />
      </head>
      <body>
        <div className="site-shell">
          <Header/>
          {children}
          <Footer/>
          <BackToTop />
        </div>
      </body>
    </html>
  );
}
