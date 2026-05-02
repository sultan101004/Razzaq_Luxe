"use client";

import Image from "next/image";
import { useMemo, useState } from "react";

import type { Product } from "@/data/products";
import { productImageAlt } from "@/lib/seo/image-alt";
import { cn } from "@/lib/utils";

type Props = {
  product: Product;
  badge?: string;
  viewImageLabel?: string;
  priority?: boolean;
};

const BADGE_VARIANTS = [
  { label: "Selling Fast!",       bg: "bg-gold-main text-noir" },
  { label: "Top seller!",         bg: "bg-[#1a1a1a] text-gold-main border border-gold-main/40" },
  { label: "Top seller!",         bg: "bg-[#1a1a1a] text-gold-main border border-gold-main/40" },
  { label: "Selling Fast!",       bg: "bg-gold-main text-noir" },
];

export function ProductGallery({
  product,
  badge,
  viewImageLabel = "View image",
  priority,
}: Props) {
  const list = useMemo(
    () => (product.images.length >= 4 ? product.images.slice(0, 4) : product.images),
    [product.images]
  );
  const [active, setActive] = useState<number | null>(null);

  const thumbs = list.map((_, i) => productImageAlt(product, "thumbnail", i));
  const mainAlt = productImageAlt(product, "spotlight");

  /* When a cell is active, show it large + a 3-thumb row below */
  if (active !== null) {
    const mainSrc = list[active];
    return (
      <div className="space-y-3">
        {/* Expanded main */}
        <div className="relative aspect-[4/5] overflow-hidden rounded-xl border border-white/[0.07] bg-[#141414]">
          <span className={cn(
            "absolute left-3 top-3 z-10 rounded-sm px-2.5 py-1 text-[9px] font-normal uppercase tracking-[0.2em]",
            BADGE_VARIANTS[active].bg
          )}>
            {badge ?? BADGE_VARIANTS[active].label}
          </span>
          <Image
            src={mainSrc}
            alt={mainAlt}
            fill
            priority={priority}
            sizes="(max-width:1024px) 100vw, 50vw"
            className="object-cover"
          />
        </div>
        {/* Thumbnail row */}
        <div className="grid grid-cols-4 gap-2">
          {list.map((src, i) => (
            <button
              key={src}
              type="button"
              aria-label={`${viewImageLabel} ${i + 1}: ${product.name.en}`}
              onClick={() => setActive(i === active ? null : i)}
              className={cn(
                "relative aspect-square overflow-hidden rounded-lg border bg-[#141414] transition hover:border-gold-main/60",
                i === active
                  ? "border-gold-main ring-1 ring-gold-main/40"
                  : "border-white/[0.07]"
              )}
            >
              <Image src={src} alt={thumbs[i]} fill sizes="120px" loading="lazy" className="object-cover" />
            </button>
          ))}
        </div>
      </div>
    );
  }

  /* Default: 2×2 grid */
  return (
    <div className="grid grid-cols-2 gap-3">
      {list.map((src, i) => (
        <button
          key={src}
          type="button"
          aria-label={`${viewImageLabel} ${i + 1}: ${product.name.en}`}
          onClick={() => setActive(i)}
          className="group relative aspect-square overflow-hidden rounded-xl border border-white/[0.07] bg-[#141414] transition hover:border-gold-main/40"
        >
          {/* Badge */}
          <span className={cn(
            "absolute left-2 top-2 z-10 rounded-sm px-2 py-0.5 text-[8px] font-normal uppercase tracking-[0.18em]",
            BADGE_VARIANTS[i % BADGE_VARIANTS.length].bg
          )}>
            {i === 0 ? (badge ?? "Selling Fast!") : BADGE_VARIANTS[i % BADGE_VARIANTS.length].label}
          </span>
          <Image
            src={src}
            alt={i === 0 ? mainAlt : thumbs[i]}
            fill
            priority={i === 0 && priority}
            sizes="(max-width:768px) 50vw, 25vw"
            loading={i === 0 && priority ? "eager" : "lazy"}
            className="object-cover transition duration-500 group-hover:scale-[1.04]"
          />
        </button>
      ))}
    </div>
  );
}
