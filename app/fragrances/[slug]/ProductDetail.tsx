"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Star, ChevronDown, ShoppingCart } from "lucide-react";

import { ProductGallery } from "@/components/ProductGallery";
import { ScentNotes } from "@/components/ScentNotes";
import { ProductCard } from "@/components/ProductCard";
import { useCart } from "@/context/CartContext";
import { useLang } from "@/context/LangContext";
import type { Product } from "@/data/products";
import { getRelatedProducts } from "@/data/products";
import { formatPkr } from "@/lib/formatCurrency";
import { buildWhatsAppLink } from "@/lib/whatsapp";

const RATING = 4.8;
const REVIEW_COUNT = 284;

export function ProductDetail({ product }: { product: Product }) {
  const { t } = useLang();
  const [qty, setQty] = useState(1);
  const [pulse, setPulse] = useState(false);
  const [descOpen, setDescOpen] = useState(false);
  const { addItem } = useCart();

  const waHref = buildWhatsAppLink(product.whatsappMessage);
  const related = useMemo(
    () => getRelatedProducts(product.slug, 3),
    [product.slug]
  );

  const bumpCart = () => {
    addItem(product, qty);
    setPulse(true);
    window.setTimeout(() => setPulse(false), 550);
  };

  const name = product.name.en;
  const description = product.description.en;

  return (
    <>
      {/* ── Main product section ──────────────────────────── */}
      <section
        aria-labelledby={`product-title-${product.slug}`}
        className="bg-noir pb-16 pt-8 sm:pt-14"
      >
        <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-2 lg:gap-14 lg:px-8">

          {/* Gallery — 2×2 grid */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          >
            <ProductGallery
              product={product}
              badge={product.badge}
              viewImageLabel={t.viewImage}
              priority
            />
          </motion.div>

          {/* Product info */}
          <motion.article
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.07, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col"
          >
            {/* Rating */}
            <div className="flex items-center gap-2">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className="h-4 w-4"
                    fill={i < Math.round(RATING) ? "#d4b483" : "transparent"}
                    stroke="#d4b483"
                    strokeWidth={1.5}
                  />
                ))}
              </div>
              <span className="font-sans text-sm font-light text-muted-luxury">
                {RATING} · {REVIEW_COUNT} reviews
              </span>
            </div>

            {/* Name */}
            <h1
              id={`product-title-${product.slug}`}
              className="mt-4 font-serif font-light text-ivory"
            >
              {name}
            </h1>

            {/* Price */}
            <p className="mt-5 font-sans text-3xl font-light tracking-tight text-ivory">
              {formatPkr(product.price)}
            </p>
            <p className="mt-1 font-sans text-xs font-light tracking-wide text-muted-luxury">
              Taxes included. Shipping calculated at checkout.
            </p>

            {/* Size pill */}
            <span className="mt-4 inline-flex w-fit rounded-sm border border-gold-main/25 px-3 py-1 font-sans text-xs font-light uppercase tracking-[0.2em] text-gold-main">
              {product.size}
            </span>

            {/* Qty stepper + Add to Cart */}
            <div className="mt-8 flex items-stretch gap-3">
              {/* Stepper */}
              <div className="flex items-center rounded-sm border border-white/[0.12]">
                <button
                  type="button"
                  aria-label={t.decreaseQty}
                  onClick={() => setQty((q) => Math.max(1, q - 1))}
                  className="flex min-h-[48px] min-w-[44px] items-center justify-center text-xl font-light text-ivory transition hover:text-gold-main"
                >
                  −
                </button>
                <span className="min-w-[2.5rem] text-center font-sans text-base font-light text-ivory">
                  {qty}
                </span>
                <button
                  type="button"
                  aria-label={t.increaseQty}
                  onClick={() => setQty((q) => Math.min(99, q + 1))}
                  className="flex min-h-[48px] min-w-[44px] items-center justify-center text-xl font-light text-ivory transition hover:text-gold-main"
                >
                  +
                </button>
              </div>

              {/* Add to Cart */}
              <motion.button
                type="button"
                onClick={bumpCart}
                animate={pulse ? { scale: [1, 1.03, 1] } : {}}
                transition={{ duration: 0.4 }}
                className="btn btn-outline flex flex-1 items-center justify-center gap-2"
              >
                <ShoppingCart className="h-4 w-4" />
                {t.addToCart}
              </motion.button>
            </div>

            {/* Buy It Now */}
            <a
              href={waHref}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary mt-3 flex w-full items-center justify-center"
            >
              {t.buyItNow}
            </a>

            {/* Product Description accordion */}
            <div className="mt-8 border-t border-white/[0.08]">
              <button
                type="button"
                onClick={() => setDescOpen((o) => !o)}
                className="flex w-full items-center justify-between py-4 font-sans text-sm font-light uppercase tracking-[0.2em] text-ivory transition hover:text-gold-main"
              >
                <span>
                  Product Description
                </span>
                <ChevronDown
                  className={`h-4 w-4 transition-transform duration-300 ${descOpen ? "rotate-180" : ""}`}
                />
              </button>
              <AnimatePresence initial={false}>
                {descOpen && (
                  <motion.div
                    key="desc"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <p className="pb-5 font-sans text-sm font-light leading-relaxed text-muted-luxury">
                      {description}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Scent Notes accordion-style section */}
              <div className="border-t border-white/[0.08] py-4">
                <ScentNotes product={product} />
              </div>
            </div>
          </motion.article>
        </div>
      </section>

      {/* ── Best combination with ─────────────────────────── */}
      <section className="bg-[#0a0a0a] px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-8 flex items-end justify-between">
            <h2 className="font-serif font-light text-ivory">
              Best combination with
            </h2>
            <Link
              href="/fragrances"
              className="btn-ghost font-sans text-[10px]"
            >
              {t.viewAll}
            </Link>
          </div>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((p, i) => (
              <ProductCard key={p.id} product={p} staggerIndex={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ── Mobile sticky bar ─────────────────────────────── */}
      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-white/[0.08] bg-[#0d0d0d]/95 p-3 pb-[max(env(safe-area-inset-bottom),0.75rem)] backdrop-blur-xl lg:hidden">
        <div className="mx-auto flex max-w-lg items-stretch gap-2">
          {/* Stepper */}
          <div className="flex items-center rounded-sm border border-white/[0.12]">
            <button
              type="button"
              aria-label={t.decreaseQty}
              onClick={() => setQty((q) => Math.max(1, q - 1))}
              className="flex h-11 w-10 items-center justify-center text-xl text-ivory hover:text-gold-main"
            >
              −
            </button>
            <span className="min-w-[2rem] text-center font-sans text-sm text-ivory">{qty}</span>
            <button
              type="button"
              aria-label={t.increaseQty}
              onClick={() => setQty((q) => Math.min(99, q + 1))}
              className="flex h-11 w-10 items-center justify-center text-xl text-ivory hover:text-gold-main"
            >
              +
            </button>
          </div>

          <motion.button
            type="button"
            onClick={bumpCart}
            animate={pulse ? { scale: [1, 1.03, 1] } : {}}
            transition={{ duration: 0.4 }}
            className="btn btn-outline flex flex-1 items-center justify-center gap-1 py-3 text-[10px]"
          >
            <ShoppingCart className="h-3.5 w-3.5" />
            {t.addToCart}
          </motion.button>

          <a
            href={waHref}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary flex flex-1 items-center justify-center py-3 text-[10px]"
          >
            {t.buyItNow}
          </a>
        </div>
      </div>

      <div className="h-[72px] lg:hidden" aria-hidden />
    </>
  );
}
