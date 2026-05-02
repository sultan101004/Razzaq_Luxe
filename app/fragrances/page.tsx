"use client";

import { FadeIn } from "@/components/FadeIn";
import { ProductCard } from "@/components/ProductCard";
import { useLang } from "@/context/LangContext";
import { PRODUCTS } from "@/data/products";

export default function FragranceCollectionPage() {
  const { t } = useLang();

  return (
    <div className="bg-noir pb-24 pt-14 sm:pt-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <FadeIn className="mb-10 text-center">
          <p className="eyebrow">
            {t.catalogue}
          </p>
          <h1
            id="collection"
            className="scroll-mt-[7rem] lang-heading mt-3 font-serif font-light text-ivory"
          >
            {t.allFragrances}
          </h1>
          <div className="mx-auto mt-4 h-1 w-16 rounded-full bg-gold-main" />
          <p className="mt-4 font-sans font-light text-muted-luxury">{t.collectionLead}</p>
        </FadeIn>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {PRODUCTS.map((p, i) => (
            <ProductCard key={p.id} product={p} staggerIndex={i} />
          ))}
        </div>
      </div>
    </div>
  );
}
