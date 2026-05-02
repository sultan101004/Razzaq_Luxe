import type { Product } from "@/data/products";

/**
 * English, keyword-conscious alt text for product imagery (SEO + accessibility).
 */
export function productImageAlt(
  product: Product,
  variant: "primary" | "hover" | "thumbnail" | "spotlight",
  index = 0
): string {
  const { en: title } = product.name;
  /** Official Sporty hero packshot — Razzaq Luxe Fragrance matte black & gold flacon */
  if (product.slug === "sporty") {
    switch (variant) {
      case "primary":
        return "Luxury matte black 50ml bottle of Sporty Extrait de Parfum by Razzaq Luxe Fragrance — gold foil R logo cap, mint leaves and lime zest accents, sporty luxury perfume Pakistan.";
      case "spotlight":
        return "Luxury matte black Sporty Extrait de Parfum bottle by Razzaq Luxe Fragrance with gold lettering — mint and lime botanical accents.";
      case "hover":
        return "Sporty by Razzaq Luxe Fragrance — alternate view of matte black and gold Signature Sporty perfume flacon.";
      case "thumbnail":
        return `Sporty Razzaq Luxe Fragrance — perfume gallery image ${index + 1}, matte black and gold Sporty bottle.`;
      default:
        return `${title} Razzaq Luxe perfume`;
    }
  }

  const profile = [product.notes.top[0], product.notes.heart[0]]
    .filter(Boolean)
    .join(" and ");

  switch (variant) {
    case "primary":
      return `Luxury artisanal ${product.size} perfume bottle — ${title} by RazzaqLuxe. ${product.tagline.en}. Notes include ${profile}. Premium EDP fragrance Pakistan.`;
    case "hover":
      return `${title} RazzaqLuxe EDP — alternate product view, boutique glass flacon, ${product.size}.`;
    case "thumbnail":
      return `${title} by RazzaqLuxe — fragrance gallery image ${index + 1}, ${product.size} luxury perfume Pakistan.`;
    case "spotlight":
      return `${title} RazzaqLuxe luxury perfume — hero product shot, gold-accent branding, ${product.size}.`;
    default:
      return `${title} RazzaqLuxe perfume`;
  }
}

/** Home / marketing hero plate (not a specific SKU). */
export const BRAND_HERO_IMAGE_ALT =
  "RazzaqLuxe luxury perfume house — editorial glass flacon and artisanal fragrance craftsmanship, gold accent branding Pakistan.";
