# Razzaq Luxe

Production-ready luxury fragrance storefront for **Razzaq Luxe** (EN/UR bilingual UI, WhatsApp ordering, SEO-rich metadata, JSON-LD, static checkout + COD).

## Tech stack

- Next.js 14 (App Router, TypeScript)
- Tailwind CSS + Framer Motion
- shadcn-style Radix UI primitives (`components/ui`)
- `next-intl` (client provider bridge for locale/messages)
- `next-seo` (`JsonLdScript` for schema injection)
- React Context (`CartContext`, `LangContext`)
- `@vercel/analytics`

## Run locally

```bash
npm install
npm run dev
```

Production check:

```bash
npm run build
npm start
```

## Configuration

- Canonical domain: `lib/site.ts` (`SITE_URL`, default `https://razzaqluxe.com`)
- WhatsApp number: `lib/whatsapp.ts` (`WA_NUMBER`)
- Google Search Console token: `app/layout.tsx` (`metadata.verification.google`)

## Product/photo management

All product content is centralized in `data/products.ts` (`PRODUCTS`).

Images are read only from each product `images` array:

```text
public/products/<slug>/primary.jpg
public/products/<slug>/hover.jpg
public/products/<slug>/detail-1.jpg
public/products/<slug>/detail-2.jpg
```

To replace photos, keep filenames or update paths in `PRODUCTS[].images`.

## SEO + indexing

- Global metadata: `app/layout.tsx`
- Dynamic product metadata: `app/fragrances/[slug]/page.tsx`
- Sitemap: `app/sitemap.ts`
- Robots route: `app/robots.ts`
- Static robots fallback: `public/robots.txt`
- Manifest: `public/site.webmanifest`

## WhatsApp + analytics

- Product-specific WhatsApp templates: `PRODUCTS[].whatsappMessage`
- General concierge message: `lib/contact-messages.ts`
- Link builder with encoded messages: `lib/whatsapp.ts`
- Event tracking helper: `lib/analytics.ts` (`window.gtag` fallback to `console.log`)
