import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
  description:
    "The Razzaq Luxe heritage — artisanal perfumes inspired by Arabian royalty.",
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
