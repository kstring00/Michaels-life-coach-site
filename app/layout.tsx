import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { BackToTop } from "@/components/BackToTop";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: { default: "GrowthGains | Identity & Life Transition Coaching", template: "%s | GrowthGains" },
  description: site.description,
  keywords: ["life coach", "identity coaching", "life transition coach", "empty nest coaching", "divorce transition coaching", "career transition coaching"],
  icons: { icon: "/growthgains-mark.svg" },
  openGraph: { title: "GrowthGains", description: site.description, type: "website" },
};

export default function RootLayout({children}:{children:React.ReactNode}) {
  return (
    <html lang="en">
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
