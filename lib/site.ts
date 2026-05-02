/** Base URL for canonical links, JSON-LD, sitemap. Override locally via APP_URL in `.env.local`. */
function normalizeBase(url: string) {
  return url.replace(/\/$/, "");
}

export const SITE_URL = normalizeBase(
  process.env.APP_URL ||
    process.env.NEXT_PUBLIC_SITE_URL ||
    "https://razzaqluxe.com"
);

export function absoluteUrl(path: string): string {
  const p = path.startsWith("/") ? path : `/${path}`;
  return `${SITE_URL}${p}`;
}
