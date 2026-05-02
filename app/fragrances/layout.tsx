import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Our Fragrances — Luxury EDP Collection Pakistan | RazzaqLuxe",
  description:
    "Browse Khan's Aura (oud amber), Habibi (rose vanilla), Florine (floral), Sporty (citrus marine) — 50ml artisan EDP by RazzaqLuxe. COD across Pakistan.",
  openGraph: {
    title: "RazzaqLuxe fragrance catalogue — artisan luxury EDP",
    description:
      "Shop the full RazzaqLuxe collection: niche perfumes crafted for Pakistan with cash on delivery.",
    type: "website",
  },
};

export default function FragranceSectionLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
