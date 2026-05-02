import type { Metadata } from "next";
import { JsonLdScript } from "next-seo";

import { HomePageClient } from "@/components/HomePageClient";
import { PRODUCTS } from "@/data/products";
import { SITE_URL } from "@/lib/site";

const OG_IMAGE = "/og-default.jpg";

export const metadata: Metadata = {
  title: "Luxury Artisan Perfumes Pakistan | RazzaqLuxe Collection",
  description:
    "Shop RazzaqLuxe artisan EDP perfumes in Pakistan — Khan's Aura oud amber, Habibi rose vanilla, Florine feminine floral & Sporty fresh citrus-marine. Authentic 50ml luxury bottles. Cash on delivery.",
  keywords: [
    "RazzaqLuxe perfume",
    "luxury EDP Pakistan",
    "buy niche fragrance Pakistan",
    "oud perfume Pakistan",
    "Habibi Florine Khan's Aura Sporty",
    "cash on delivery perfume",
  ],
  openGraph: {
    type: "website",
    locale: "en_PK",
    url: SITE_URL,
    siteName: "Razzaq Luxe",
    title: "RazzaqLuxe — Luxury Artisan Perfumes & EDP Pakistan",
    description:
      "Discover premium handcrafted fragrances by RazzaqLuxe. Editorial luxury bottles, COD nationwide — Khan's Aura, Habibi, Florine & Sporty.",
    images: [
      {
        url: OG_IMAGE,
        width: 1200,
        height: 630,
        alt: "RazzaqLuxe luxury perfume collection — artisan EDP fragrances Pakistan",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "RazzaqLuxe — Luxury Artisan Perfumes Pakistan",
    description:
      "Premium EDP by RazzaqLuxe. Shop Khan's Aura, Habibi, Florine & Sporty with cash on delivery.",
    images: [OG_IMAGE],
  },
  alternates: { canonical: SITE_URL },
};

function homeItemListJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "RazzaqLuxe signature fragrances",
    description: "Featured luxury EDP perfumes available in Pakistan.",
    numberOfItems: PRODUCTS.length,
    itemListElement: PRODUCTS.map((p, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: p.name.en,
      url: `${SITE_URL}/fragrances/${p.slug}`,
    })),
  };
}

export default function HomePage() {
  return (
    <>
      <JsonLdScript
        scriptKey="home-itemlist-jsonld"
        id="schema-itemlist-home"
        data={homeItemListJsonLd()}
      />
      <JsonLdScript
        scriptKey="home-website-jsonld"
        id="schema-website"
        data={{
          "@context": "https://schema.org",
          "@type": "WebSite",
          name: "Razzaq Luxe",
          url: SITE_URL,
          description:
            "Luxury artisan perfumes and Eau de Parfum delivered across Pakistan.",
          publisher: { "@id": `${SITE_URL}#organization` },
        }}
      />
      <HomePageClient />
    </>
  );
}
