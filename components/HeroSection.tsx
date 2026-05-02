"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";

import { Button } from "@/components/ui/button";
import { useLang } from "@/context/LangContext";
import { cn } from "@/lib/utils";

export function HeroSection() {
  const { t } = useLang();
  const ref = useRef<HTMLElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "14%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.55], [1, 0.15]);

  return (
    <section
      ref={ref}
      className="relative flex min-h-[100svh] items-center overflow-hidden bg-deep-black pt-10"
    >
      {/* ── Split background ───────────────────────────────────── */}
      <div className="pointer-events-none absolute inset-0 z-0">

        {/* Left half — product bottle (clips to left 50%) */}
        <div className="absolute inset-y-0 left-0 w-1/2 overflow-hidden">
          <Image
            src="/images/sporty/Sporty_Flavour.png"
            alt="Sporty fragrance bottle"
            fill
            priority
            fetchPriority="high"
            sizes="50vw"
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/80" />
        </div>

        {/* Right half — model / promotion (clips to right 50%) */}
        <div className="absolute inset-y-0 right-0 w-1/2 overflow-hidden">
          <Image
            src="/images/sporty/Promotion.jpg"
            alt="Razzaq Luxe Sporty — model"
            fill
            priority
            fetchPriority="high"
            sizes="50vw"
            className="object-cover object-top"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/80" />
        </div>

        {/* Centre blend — fades both images into each other */}
        <div className="absolute inset-y-0 left-[35%] w-[30%] bg-gradient-to-r from-transparent via-black/80 to-transparent" />

        {/* Outer edge vignettes */}
        <div className="absolute inset-y-0 left-0 w-[15%] bg-gradient-to-r from-black/80 to-transparent" />
        <div className="absolute inset-y-0 right-0 w-[15%] bg-gradient-to-l from-black/80 to-transparent" />
      </div>

      {/* Gold radial glow at center */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-[1] bg-[radial-gradient(ellipse_60%_50%_at_50%_50%,rgba(212,175,55,0.07),transparent_70%)]"
      />

      {/* Floating particles */}
      <div className="pointer-events-none absolute inset-0 z-[2]">
        {[...Array(8)].map((_, i) => (
          <motion.span
            key={`p-${i}`}
            className="absolute h-1 w-1 rounded-full bg-gold-light/30"
            style={{
              left: `${12 + ((i * 19) % 76)}%`,
              top: `${18 + ((i * 29) % 62)}%`,
            }}
            animate={{ opacity: [0.1, 0.5, 0.1], y: [0, -10, 0] }}
            transition={{
              duration: 5 + (i % 3),
              repeat: Infinity,
              delay: i * 0.22,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      {/* ── Content ────────────────────────────────────────────── */}
      <motion.div
        style={{ y, opacity }}
        className="relative z-10 mx-auto flex w-full max-w-5xl flex-col items-center px-4 text-center sm:px-6"
      >
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.15 }}
          className="mb-4 text-[10px] font-semibold uppercase tracking-[0.38em] text-gold-main sm:text-[11px]"
        >
          {t.heroEyebrow}
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.85, delay: 0.22, ease: [0.22, 1, 0.36, 1] }}
          className="lang-heading font-heading text-5xl leading-[1.05] tracking-tight text-off-white sm:text-6xl md:text-7xl lg:text-[5.1rem]"
        >
          <span className="block">{t.heroTitleLine1}</span>
          <span
            className={cn(
              "mt-1 block text-gold-light",
              "italic"
            )}
          >
            {t.heroTitleLine2Italic}
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, delay: 0.35 }}
          className="mt-6 max-w-xl text-sm font-light leading-relaxed text-off-white/75 sm:text-base"
        >
          {t.heroSub}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 0.48 }}
          className="mt-10 flex w-full flex-col items-stretch gap-3 sm:flex-row sm:justify-center sm:gap-4"
        >
          <Button variant="heroSolid" className="w-full sm:w-auto" asChild>
            <Link href="/fragrances">{t.shopNow}</Link>
          </Button>
          <Button variant="heroGhost" className="w-full sm:w-auto" asChild>
            <Link href="/fragrances#collection">{t.exploreCollection}</Link>
          </Button>
        </motion.div>
      </motion.div>

      {/* Scroll hint */}
      <div className="pointer-events-none absolute bottom-10 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-3">
        <span className="text-[9px] font-bold uppercase tracking-[0.34em] text-white/35">
          {t.heroScrollHint}
        </span>
        <div className="relative h-12 w-px overflow-hidden bg-white/15">
          <motion.div
            aria-hidden
            className="absolute inset-x-0 top-0 h-1/2 w-full bg-gold-main/90"
            animate={{ y: ["-100%", "200%"] }}
            transition={{ repeat: Infinity, duration: 2.2, ease: "linear" }}
          />
        </div>
      </div>
    </section>
  );
}
