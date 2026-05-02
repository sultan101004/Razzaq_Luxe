import type { Lang } from "@/data/ui-strings";

export function formatPkr(amount: number, lang: Lang = "en"): string {
  const locale = lang === "ur" ? "ur-PK" : "en-PK";
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency: "PKR",
    maximumFractionDigits: 0,
  }).format(amount);
}
