import type { Metadata } from "next";
import { Cinzel, Cormorant_Garamond, Jost, Noto_Nastaliq_Urdu } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import { JsonLdScript } from "next-seo";

import "./globals.css";
import { AnnouncementBar } from "@/components/AnnouncementBar";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { CartDrawer } from "@/components/CartDrawer";
import { FloatingWhatsApp } from "@/components/FloatingWhatsApp";
import { VirtualAssistant } from "@/components/VirtualAssistant";
import { Providers } from "@/components/Providers";
import { SplashWrapper } from "@/components/SplashWrapper";
import { SITE_URL } from "@/lib/site";

const cinzel = Cinzel({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-cinzel",
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
});

const jost = Jost({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--font-jost",
});

const notoUrdu = Noto_Nastaliq_Urdu({
  subsets: ["arabic", "latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-noto-nastaliq",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Razzaq Luxe | Luxury Fragrances Pakistan",
    template: "%s | Razzaq Luxe",
  },
  description:
    "Razzaq Luxe — Premium luxury fragrances crafted for royalty. Shop Khan's Aura, Habibi, Florine & Sporty. Authentic EDP. Cash on delivery across Pakistan.",
  keywords: [
    "luxury perfume Pakistan",
    "EDP Pakistan",
    "best perfume brand Pakistan",
    "oud fragrance",
    "Razzaq Luxe",
    "رزاق لکس",
    "خوشبو پاکستان",
    "buy perfume Pakistan",
  ],
  authors: [{ name: "Razzaq Luxe", url: SITE_URL }],
  creator: "Razzaq Luxe",
  publisher: "Razzaq Luxe",
  category: "Luxury Fragrances",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
    },
  },
  openGraph: {
    type: "website",
    locale: "en_PK",
    alternateLocale: ["ur_PK"],
    url: SITE_URL,
    siteName: "Razzaq Luxe",
    title: "Razzaq Luxe | Luxury Fragrances Pakistan",
    description:
      "Premium luxury fragrances. Shop Khan's Aura, Habibi, Florine & Sporty. Cash on delivery across Pakistan.",
    images: [
      {
        url: "/og-default.jpg",
        width: 1200,
        height: 630,
        alt: "Razzaq Luxe — Wear the Royalty",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@razzaqluxe",
    creator: "@razzaqluxe",
    title: "Razzaq Luxe | Luxury Fragrances Pakistan",
    description:
      "Premium fragrances crafted for royalty. Shop online. Cash on delivery.",
    images: ["/og-default.jpg"],
  },
  manifest: "/site.webmanifest",
  verification: {
    google: "REPLACE_WITH_GOOGLE_SEARCH_CONSOLE_TOKEN",
  },
  alternates: {
    canonical: SITE_URL,
    languages: {
      "en-PK": `${SITE_URL}/en`,
      "ur-PK": `${SITE_URL}/ur`,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en-PK" dir="ltr" suppressHydrationWarning>
      <body
        className={`${cinzel.variable} ${cormorant.variable} ${jost.variable} ${notoUrdu.variable} min-h-screen font-sans antialiased`}
      >
        <JsonLdScript
          scriptKey="organization-jsonld"
          id="schema-org"
          data={{
            "@context": "https://schema.org",
            "@type": "Organization",
            "@id": `${SITE_URL}#organization`,
            name: "Razzaq Luxe",
            alternateName: ["RazzaqLuxe", "رزاق لکس"],
            url: SITE_URL,
            logo: `${SITE_URL}/og-default.jpg`,
            contactPoint: {
              "@type": "ContactPoint",
              telephone: "+923001234567",
              contactType: "Customer Service",
              availableLanguage: ["Urdu", "English"],
            },
            sameAs: [
              "https://www.instagram.com/razzaqluxe/",
              "https://www.tiktok.com/@razzaqluxe",
              "https://www.facebook.com/razzaqluxe",
            ],
          }}
        />
        <JsonLdScript
          scriptKey="brand-jsonld"
          id="schema-brand"
          data={{
            "@context": "https://schema.org",
            "@type": "Brand",
            "@id": `${SITE_URL}#brand`,
            name: "RazzaqLuxe",
            logo: `${SITE_URL}/og-default.jpg`,
            url: SITE_URL,
            description:
              "Minimalist luxury fragrance house crafting artisan EDP perfumes in Pakistan.",
            parentOrganization: { "@id": `${SITE_URL}#organization` },
          }}
        />
        <Providers>
          <SplashWrapper>
            <AnnouncementBar />
            <Navbar />
            <main className="min-h-[50vh]">{children}</main>
            <Footer />
          </SplashWrapper>
          <CartDrawer />
          <FloatingWhatsApp />
          <VirtualAssistant />
        </Providers>
        <Analytics />
      </body>
    </html>
  );
}
