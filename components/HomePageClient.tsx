"use client";

import Image from "next/image";
import Link from "next/link";
import {
  Citrus,
  Droplets,
  Gem,
  Flower2,
  Heart,
  Trees,
  ChevronLeft,
  ChevronRight,
  Zap,
  Star,
  ShoppingCart,
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { useEffect, useRef, useState, useCallback } from "react";

import { HeroSection } from "@/components/HeroSection";
import { ProductCard } from "@/components/ProductCard";
import { FadeIn } from "@/components/FadeIn";
import { TestimonialsSlider } from "@/components/TestimonialsSlider";
import { useLang } from "@/context/LangContext";
import { PRODUCTS } from "@/data/products";

const scentBlocks = [
  { en: "Oud", ur: "عود", Icon: Gem },
  { en: "Rose", ur: "گلاب", Icon: Flower2 },
  { en: "Citrus", ur: "حمضی", Icon: Citrus },
  { en: "Marine", ur: "سمندری", Icon: Droplets },
  { en: "Musk", ur: "مشک", Icon: Heart },
  { en: "Wood", ur: "لکڑی", Icon: Trees },
];

const CTA_SVG = "/images/sporty/Sportysvg.svg";

function CtaBanner() {
  const { t } = useLang();

  return (
    <section className="border-t border-white/[0.06] bg-[#0a0a0a] py-24">
      <div className="mx-auto flex max-w-4xl items-center gap-12 px-6 lg:px-8">

        {/* Text — left half */}
        <FadeIn className="flex-1 text-center md:text-start">
          <p className="eyebrow mb-5">Razzaq Luxe</p>
          <h2 className="font-serif font-light italic text-ivory">
            {t.ctaRibbon}
          </h2>
          <div className="mt-10">
            <Link href="/fragrances" className="btn btn-primary">
              {t.shopNow}
            </Link>
          </div>
        </FadeIn>

        {/* Product image — right half */}
        <div className="relative hidden h-72 w-56 shrink-0 md:block">
          <Image
            src={CTA_SVG}
            alt=""
            fill
            sizes="224px"
            className="object-contain scale-[1.6] origin-center"
          />
        </div>

      </div>
    </section>
  );
}

const RANK_LABELS = ["Trending 1st", "Trending 2nd", "Trending 3rd", "Trending 4th"];

function TrendingSection() {
  const { t } = useLang();

  return (
    <section className="bg-noir py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* Eyebrow pill */}
        <FadeIn className="flex flex-col items-center gap-3">
          <div className="flex items-center gap-3">
            <Star className="h-4 w-4 text-gold-main" />
            <span className="inline-flex items-center gap-2 rounded-full border border-gold-main/40 bg-gold-main/10 px-5 py-1.5 font-sans text-[10px] font-light uppercase tracking-[0.28em] text-gold-main">
              <Zap className="h-3 w-3 fill-gold-main" />
              Trending This Week
            </span>
            <Star className="h-4 w-4 text-gold-main" />
          </div>
          <h2 className="font-sans text-3xl font-black uppercase tracking-tight text-ivory sm:text-4xl">
            Top Trending This Week
          </h2>
          <div className="h-px w-20 bg-gold-main/40" />
        </FadeIn>

        {/* Cards */}
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {PRODUCTS.map((product, i) => {
            const name = product.name.en;
            const waHref = `/fragrances/${product.slug}`;
            return (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-20px" }}
                transition={{ duration: 0.5, delay: i * 0.09, ease: [0.22, 1, 0.36, 1] }}
                className="group flex flex-col overflow-hidden rounded-xl border border-white/[0.07] bg-[#141414] transition hover:-translate-y-1 hover:border-gold-main/30 hover:shadow-[0_12px_40px_rgba(212,180,131,0.1)]"
              >
                {/* Image */}
                <div className="relative h-56 w-full overflow-hidden">
                  {/* Rank badge */}
                  <span className="absolute left-3 top-3 z-10 inline-flex items-center rounded-full bg-gold-main px-3 py-1 font-sans text-[9px] font-light uppercase tracking-[0.2em] text-noir">
                    {RANK_LABELS[i % RANK_LABELS.length]}
                  </span>
                  <Image
                    src={product.images[0]}
                    alt={name}
                    fill
                    sizes="(max-width:768px) 100vw, 25vw"
                    loading="lazy"
                    className="object-cover transition-transform duration-700 group-hover:scale-[1.05]"
                  />
                </div>

                {/* Info */}
                <div className="flex flex-1 flex-col gap-3 border-t border-white/[0.06] p-4">
                  <p className="font-serif font-light leading-snug text-ivory">
                    {name}
                  </p>
                  <p className="font-sans text-lg font-light text-gold-main">
                    {new Intl.NumberFormat("en-PK", {
                      style: "currency",
                      currency: "PKR",
                      maximumFractionDigits: 0,
                    }).format(product.price)}
                  </p>
                  <Link
                    href={waHref}
                    className="btn btn-primary mt-auto flex items-center justify-center gap-2"
                  >
                    <ShoppingCart className="h-3.5 w-3.5" />
                    {t.buyItNow ?? "Buy Now"}
                  </Link>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

const SLIDE_DURATION = 5000; // ms per slide

function SignatureCarousel() {
  const { t } = useLang();
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1); // 1 = forward, -1 = backward
  const [paused, setPaused] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const go = useCallback((next: number, dir: number) => {
    setDirection(dir);
    setIndex((next + PRODUCTS.length) % PRODUCTS.length);
  }, []);

  const prev = () => go(index - 1, -1);
  const next = useCallback(() => go(index + 1, 1), [go, index]);

  /* Auto-advance */
  useEffect(() => {
    if (paused) return;
    timerRef.current = setTimeout(() => next(), SLIDE_DURATION);
    return () => { if (timerRef.current) clearTimeout(timerRef.current); };
  }, [index, paused, next]);

  const product = PRODUCTS[index];
  const name = product.name.en;
  const description = product.description.en;
  const tagline = product.tagline.en;

  const variants = {
    enter: (d: number) => ({ opacity: 0, x: d * 60 }),
    center: { opacity: 1, x: 0 },
    exit: (d: number) => ({ opacity: 0, x: d * -60 }),
  };

  return (
    <section
      className="relative overflow-hidden bg-[#111] py-20"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Eyebrow */}
        <p className="eyebrow mb-2 text-center">Signature Fragrance</p>
        <h2 className="mb-10 text-center font-sans text-3xl font-black uppercase leading-tight tracking-tight text-white sm:text-4xl">
          Our Signature{" "}
          <span className="text-gold-main">Product</span>
        </h2>

        {/* Slide */}
        <div className="relative mx-auto flex max-w-4xl flex-col-reverse items-center gap-10 md:flex-row md:gap-16">

          {/* Left — product image */}
          <div className="relative h-80 w-64 shrink-0 sm:h-96 sm:w-72">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={product.slug + "-img"}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                className="absolute inset-0"
              >
                <Image
                  src={product.images[0]}
                  alt={name}
                  fill
                  sizes="288px"
                  className="object-contain drop-shadow-2xl"
                />
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Right — text */}
          <div className="flex-1 text-center md:text-start">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={product.slug + "-text"}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              >
                <p className="eyebrow">{tagline}</p>
                <h3 className="mt-3 font-sans text-4xl font-black uppercase leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl">
                  {name}
                </h3>
                <p className="mt-5 max-w-lg text-base font-light leading-relaxed text-white/60">
                  {description}
                </p>
                <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center md:justify-start">
                  <Link
                    href={`/fragrances/${product.slug}`}
                    className="btn btn-primary"
                  >
                    {t.viewDetails}
                  </Link>
                  <Link href="/fragrances" className="btn btn-outline">
                    {t.exploreCollection}
                  </Link>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Controls */}
        <div className="mt-10 flex items-center justify-center gap-6">
          {/* Prev */}
          <button
            type="button"
            onClick={prev}
            aria-label="Previous product"
            className="flex h-9 w-9 items-center justify-center rounded-full border border-white/20 text-white/60 transition hover:border-gold-main/60 hover:text-gold-main"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>

          {/* Dots */}
          <div className="flex gap-2">
            {PRODUCTS.map((_, i) => (
              <button
                key={i}
                type="button"
                aria-label={`Go to slide ${i + 1}`}
                onClick={() => go(i, i > index ? 1 : -1)}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  i === index
                    ? "w-6 bg-gold-main"
                    : "w-1.5 bg-white/25 hover:bg-white/50"
                }`}
              />
            ))}
          </div>

          {/* Next */}
          <button
            type="button"
            onClick={next}
            aria-label="Next product"
            className="flex h-9 w-9 items-center justify-center rounded-full border border-white/20 text-white/60 transition hover:border-gold-main/60 hover:text-gold-main"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>

        {/* Progress bar */}
        {!paused && (
          <div className="mx-auto mt-5 h-px max-w-xs overflow-hidden bg-white/10">
            <motion.div
              key={index}
              className="h-full bg-gold-main/70"
              initial={{ width: "0%" }}
              animate={{ width: "100%" }}
              transition={{ duration: SLIDE_DURATION / 1000, ease: "linear" }}
            />
          </div>
        )}
      </div>
    </section>
  );
}

export function HomePageClient() {
  const { t } = useLang();

  return (
    <>
      <HeroSection />

      {/* ── FEATURED FRAGRANCES ─────────────────────────────── */}
      <section
        id="collection"
        aria-labelledby="featured-collection-heading"
        className="scroll-mt-24 bg-noir py-14 sm:py-20"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <FadeIn className="mb-10 text-center">
            <p className="eyebrow">{t.heroEyebrow}</p>
            <h2
              id="featured-collection-heading"
              className="lang-heading mt-3 font-serif font-light text-ivory"
            >
              {t.featuredTitle}
            </h2>
            <div className="mx-auto mt-5 h-px w-20 bg-gold-main/50" />
          </FadeIn>

          <div
            className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4"
            role="list"
          >
            {PRODUCTS.map((p, i) => (
              <div key={p.id} role="listitem">
                <ProductCard product={p} staggerIndex={i} />
              </div>
            ))}
          </div>

          <FadeIn className="mt-12 text-center" delay={0.1}>
            <Link href="/fragrances" className="btn btn-outline">
              {t.viewFullCatalog}
            </Link>
          </FadeIn>
        </div>
      </section>

      {/* ── EXPLORE NEW ARRIVAL — dark promo banner ─────────── */}
      <section className="relative overflow-hidden bg-[#0d0d0d]">
        <div className="mx-auto flex max-w-7xl flex-col items-center gap-0 md:flex-row">
          {/* Text side */}
          <div className="flex flex-1 flex-col justify-center px-8 py-16 sm:px-12 lg:px-16">
            <motion.p
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-xs font-bold uppercase tracking-[0.35em] text-gold-main"
            >
              New Arrival
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, x: -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="mt-4 font-sans text-5xl font-black uppercase leading-none tracking-tight text-white sm:text-6xl lg:text-7xl"
            >
              Explore
              <br />
              <span className="text-gold-main">the New</span>
              <br />
              Arrival
            </motion.h2>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.25 }}
              className="mt-6 max-w-sm text-sm leading-relaxed text-white/60"
            >
              {PRODUCTS.find((p) => p.slug === "sporty")?.tagline.en ?? "Pure momentum. Fresh. Bold. Unstoppable."}
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.35 }}
              className="mt-8 flex gap-3"
            >
              <Link href="/fragrances/sporty" className="btn btn-primary">
                {t.shopNow}
              </Link>
            </motion.div>
          </div>

          {/* Image side */}
          <div className="relative h-[360px] w-full md:h-[520px] md:w-[480px] lg:w-[560px] shrink-0">
            <Image
              src="/images/sporty/FemalePromotion.png"
              alt="Razzaq Luxe — new arrival"
              fill
              sizes="(max-width:768px) 100vw, 560px"
              className="object-cover object-top"
            />
            {/* left-side fade into black */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#0d0d0d] via-transparent to-transparent md:block hidden" />
          </div>
        </div>
      </section>

      {/* ── OUR SIGNATURE PRODUCT — auto-rotating carousel ── */}
      <SignatureCarousel />

      {/* ── SCENT NOTES WORLD ───────────────────────────────── */}
      <section
        aria-labelledby="scent-world-heading"
        className="bg-[#0a0a0a] py-16 sm:py-24"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <FadeIn className="text-center">
            <p className="eyebrow">{t.scentWorldTitle}</p>
            <h2
              id="scent-world-heading"
              className="lang-heading mt-3 font-serif font-light text-ivory"
            >
              {t.scentWorldSubtitle}
            </h2>
          </FadeIn>
          <ul className="mt-12 flex min-w-full list-none flex-row gap-4 overflow-x-auto pb-2 [-ms-overflow-style:none] [scrollbar-width:none] sm:grid sm:grid-cols-3 lg:grid-cols-6 [&::-webkit-scrollbar]:hidden">
            {scentBlocks.map((s, i) => (
              <li key={s.en} className="shrink-0">
                <FadeIn delay={i * 0.05} className="h-full">
                  <div className="flex w-40 flex-col items-center gap-3 rounded-sm border border-gold-main/15 bg-[#141414] px-5 py-8 text-center transition hover:border-gold-main/40 sm:w-auto">
                    <s.Icon className="h-6 w-6 text-gold-main" aria-hidden />
                    <span className="font-sans text-[10px] font-light uppercase tracking-[0.22em] text-ivory/70">
                      {s.en}
                    </span>
                  </div>
                </FadeIn>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ── TESTIMONIALS ────────────────────────────────────── */}
      <section
        aria-labelledby="testimonials-heading"
        className="bg-noir py-20 sm:py-28"
      >
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <FadeIn className="text-center">
            <p className="eyebrow">{t.testimonialsTitle}</p>
            <h2
              id="testimonials-heading"
              className="lang-heading mt-3 font-serif font-light text-ivory"
            >
              {t.testimonialsSubtitle}
            </h2>
          </FadeIn>
          <FadeIn className="mt-12" delay={0.08}>
            <TestimonialsSlider lang="en" />
          </FadeIn>
        </div>
      </section>

      {/* ── TOP TRENDING THIS WEEK ──────────────────────────── */}
      <TrendingSection />

      {/* ── FINAL CTA BANNER ────────────────────────────────── */}
      <CtaBanner />
    </>
  );
}
