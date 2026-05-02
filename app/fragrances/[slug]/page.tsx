import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { JsonLdScript } from "next-seo";

import {
  PRODUCTS,
  getProductBySlug,
  type Product,
} from "@/data/products";
import { productImageAlt } from "@/lib/seo/image-alt";
import { SITE_URL, absoluteUrl } from "@/lib/site";

import { ProductDetail } from "./ProductDetail";

type Props = { params: { slug: string } };

export function generateStaticParams() {
  return PRODUCTS.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }: Props): Metadata {
  const product = getProductBySlug(params.slug);
  if (!product) return { title: "Not Found", robots: { index: false } };

  const url = `${SITE_URL}/fragrances/${product.slug}`;
  const ogAlt = productImageAlt(product, "primary");

  return {
    title: product.metaTitle,
    description: product.metaDescription,
    keywords: product.metaKeywords,
    openGraph: {
      type: "website",
      locale: "en_PK",
      url,
      siteName: "RazzaqLuxe",
      title: product.metaTitle,
      description: product.metaDescription,
      images: [
        {
          url: product.ogImage.startsWith("http")
            ? product.ogImage
            : absoluteUrl(product.ogImage),
          width: 1200,
          height: 630,
          alt: ogAlt.slice(0, 200),
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: product.metaTitle,
      description: product.metaDescription,
      images: [
        product.ogImage.startsWith("http")
          ? product.ogImage
          : absoluteUrl(product.ogImage),
      ],
    },
    alternates: { canonical: url },
  };
}

function buildProductJsonLd(product: Product) {
  const url = `${SITE_URL}/fragrances/${product.slug}`;
  const images = product.images.map((path) =>
    path.startsWith("http") ? path : absoluteUrl(path)
  );

  return {
    "@context": "https://schema.org",
    "@type": "Product",
    "@id": `${url}#product`,
    name: product.name.en,
    description: product.description.en,
    sku: product.id,
    category: "Health & Beauty > Personal Care > Perfume & Cologne",
    brand: { "@type": "Brand", "@id": `${SITE_URL}#brand`, name: "RazzaqLuxe" },
    image: images,
    offers: {
      "@type": "Offer",
      "@id": `${url}#offer`,
      url,
      priceCurrency: "PKR",
      price: String(product.price),
      priceValidUntil: "2027-12-31",
      availability: "https://schema.org/InStock",
      itemCondition: "https://schema.org/NewCondition",
      seller: { "@id": `${SITE_URL}#organization` },
    },
  };
}

export default function FragranceSlugPage({ params }: Props) {
  const product = getProductBySlug(params.slug);
  if (!product) notFound();

  return (
    <>
      <JsonLdScript
        scriptKey={`product-jsonld-${product.slug}`}
        id={`schema-product-${product.slug}`}
        data={buildProductJsonLd(product)}
      />
      <ProductDetail product={product} />
    </>
  );
}
