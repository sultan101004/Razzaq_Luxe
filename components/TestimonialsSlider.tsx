"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Quote, Star } from "lucide-react";

import type { Lang } from "@/data/ui-strings";

const reviewsEn = [
  {
    quote:
      "Khan's Aura is regal yet refined — I wore it for Eid dinner and kept getting compliments till midnight.",
    name: "Hamza R.",
    city: "Lahore",
  },
  {
    quote:
      "Habibi feels like velvet on skin. Romantic without being sugary — my new everyday signature.",
    name: "Sana K.",
    city: "Islamabad",
  },
  {
    quote:
      "Sporty survives gym and boardroom transitions. Citrus opens clean and the vetiver dry-down is immaculate.",
    name: "Omar V.",
    city: "Karachi",
  },
];


type Props = { lang?: Lang };

export function TestimonialsSlider({ lang = "en" }: Props) {
  const [idx, setIdx] = useState(0);
  const reviews = reviewsEn;

  useEffect(() => {
    const t = setInterval(() => {
      setIdx((v) => (v + 1) % reviews.length);
    }, 6500);
    return () => clearInterval(t);
  }, [reviews.length]);

  return (
    <div className="relative mx-auto max-w-3xl">
      <Quote className="mx-auto mb-8 h-10 w-10 text-gold-main/40" />

      <div className="relative min-h-[200px]">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={`${lang}-${idx}`}
            initial={{ opacity: 0, x: 32 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -32 }}
            transition={{ duration: 0.35 }}
            className="text-center"
          >
            <div className="flex justify-center gap-1 pb-6">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className="h-5 w-5 fill-gold-main text-gold-main"
                />
              ))}
            </div>
            <p className="text-lg leading-relaxed text-brand-black sm:text-xl">
              {reviews[idx].quote}
            </p>
            <p className="mt-6 text-sm uppercase tracking-[0.2em] text-gold-main">
              {reviews[idx].name}{" "}
              <span className="text-soft-grey">• {reviews[idx].city}</span>
            </p>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="mt-10 flex justify-center gap-2 md:hidden">
        {reviews.map((_, i) => (
          <button
            key={i}
            type="button"
            aria-label={`Go to testimonial ${i + 1}`}
            aria-current={idx === i}
            onClick={() => setIdx(i)}
            className={`h-3 w-3 rounded-full border border-gold-main/35 transition ${idx === i ? "scale-110 bg-gold-main" : "bg-transparent hover:bg-gold-main/35"}`}
          />
        ))}
      </div>

      <div className="mt-16 hidden gap-6 md:grid md:grid-cols-3">
        {reviews.map((r, i) => (
          <div
            key={r.name}
            className={`glass-card rounded-2xl border-gold-main/22 p-5 text-left shadow-inner ${idx === i ? "ring-1 ring-gold-main/55" : ""}`}
          >
            <div className="flex gap-1 pb-3">
              {Array.from({ length: 5 }).map((__, j) => (
                <Star
                  key={j}
                  className="h-4 w-4 fill-gold-main text-gold-main"
                />
              ))}
            </div>
            <p className="text-sm text-medium-grey">{r.quote}</p>
            <p className="mt-4 text-xs uppercase tracking-[0.18em] text-gold-main">
              {r.name}{" "}
              <span className="text-soft-grey">• {r.city}</span>
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
