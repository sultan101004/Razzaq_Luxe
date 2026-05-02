"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";
import { useState } from "react";
import { ShoppingCart } from "lucide-react";

import { useCart } from "@/context/CartContext";
import { useLang } from "@/context/LangContext";
import type { Product } from "@/data/products";
import { buildWhatsAppLink } from "@/lib/whatsapp";
import { formatPkr } from "@/lib/formatCurrency";
import { productImageAlt } from "@/lib/seo/image-alt";
import { cn } from "@/lib/utils";

/** Subtle dark accent tint per product — keeps noir canvas, adds identity */
const CARD_ACCENT: Record<string, string> = {
  "khans-aura": "hover:shadow-[0_12px_40px_rgba(212,180,131,0.15)]",
  habibi:       "hover:shadow-[0_12px_40px_rgba(200,151,110,0.15)]",
  florine:      "hover:shadow-[0_12px_40px_rgba(180,212,160,0.12)]",
  sporty:       "hover:shadow-[0_12px_40px_rgba(130,180,212,0.12)]",
};

type ProductCardProps = {
  product: Product;
  /** `large` = slightly taller image; default is compact for dense grids */
  size?: "default" | "large";
  /** Grid stagger index for motion reveal */
  staggerIndex?: number;
};

export function ProductCard({
  product,
  size = "default",
  staggerIndex = 0,
}: ProductCardProps) {
  const { addItem } = useCart();
  const { t } = useLang();
  const [, setImgLoaded] = useState(false);

  const isLarge = size === "large";
  const imgHeight = isLarge
    ? "h-[280px] sm:h-[320px]"
    : "h-[220px] sm:h-[260px]";

  const accentShadow = CARD_ACCENT[product.slug] ?? "";

  const primary = product.images[0] ?? "/og-default.jpg";
  const hover = product.images[1] ?? primary;
  const name = product.name.en;
  const waHref = buildWhatsAppLink(product.whatsappMessage);
  const altPrimary = productImageAlt(product, "primary");
  const altHover = productImageAlt(product, "hover");

  const gridSizes = isLarge
    ? "(max-width:768px) 100vw, (max-width:1280px) 50vw, 25vw"
    : "(max-width:768px) 100vw, (max-width:1024px) 50vw, 25vw";

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-24px" }}
      transition={{
        duration: 0.5,
        delay: staggerIndex * 0.09,
        ease: [0.22, 1, 0.36, 1],
      }}
      className={cn(
        "group relative flex w-full flex-col overflow-hidden rounded-xl border border-white/[0.07] bg-[#141414] transition-all duration-300 ease-out hover:-translate-y-1 hover:border-[#d4b483]/30",
        accentShadow
      )}
    >
      {/* Image */}
      <Link
        href={`/fragrances/${product.slug}`}
        className={cn(
          "relative block w-full shrink-0 overflow-hidden",
          imgHeight
        )}
      >
        <Image
          src={primary}
          alt={altPrimary}
          fill
          sizes={gridSizes}
          loading="lazy"
          className={cn(
            "object-cover transition-all duration-700 ease-out group-hover:scale-[1.06]",
            "opacity-100 md:group-hover:opacity-0"
          )}
          onLoad={() => setImgLoaded(true)}
        />
        <Image
          src={hover}
          alt={altHover}
          fill
          sizes={gridSizes}
          loading="lazy"
          className={cn(
            "object-cover transition-all duration-700 ease-out md:group-hover:scale-[1.08]",
            "opacity-0 md:group-hover:opacity-100"
          )}
        />

        {/* Badge — bottom-left of image */}
        <div className="absolute bottom-2.5 z-20 [inset-inline-start:0.625rem]">
          <span className="inline-flex items-center gap-1 rounded-sm bg-gold-main px-2.5 py-1 text-[9px] font-normal uppercase tracking-[0.22em] text-noir shadow-sm">
            <span className="h-1.5 w-1.5 rounded-full bg-noir/50" />
            {product.badge}
          </span>
        </div>
      </Link>

      {/* Content */}
      <div className="flex flex-1 flex-col gap-2.5 border-t border-white/[0.06] px-4 pb-4 pt-3">
        {/* Product name */}
        <Link href={`/fragrances/${product.slug}`}>
          <h3
            className={cn(
              "font-serif font-light leading-snug text-ivory transition-colors group-hover:text-gold-main",
              isLarge ? "text-base sm:text-lg" : "text-sm sm:text-base"
            )}
          >
            {name}
          </h3>
        </Link>

        {/* Price */}
        <p
          className={cn(
            "font-sans font-light text-gold-main",
            isLarge ? "text-lg sm:text-xl" : "text-base sm:text-lg"
          )}
        >
          {formatPkr(product.price, "en")}
          <span className="ms-1.5 text-[10px] font-normal uppercase tracking-wider text-muted-luxury">
            · {product.size}
          </span>
        </p>

        {/* Buttons */}
        <div className="mt-auto flex flex-col gap-2">
          {/* Primary CTA — gold (one per card) */}
          <button
            type="button"
            onClick={() => addItem(product, 1)}
            className="btn btn-primary flex min-h-[44px] w-full items-center justify-center gap-2"
          >
            <ShoppingCart className="h-4 w-4" />
            {t.addToCart}
          </button>

          {/* Secondary — outline */}
          <a
            href={waHref}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-outline flex min-h-[44px] w-full items-center justify-center"
          >
            {t.buyItNow}
          </a>
        </div>
      </div>
    </motion.article>
  );
}
