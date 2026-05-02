"use client";

import Image from "next/image";
import { Award, Gem, HeartHandshake } from "lucide-react";

import { FadeIn } from "@/components/FadeIn";
import { useLang } from "@/context/LangContext";

export default function AboutPage() {
  const { t } = useLang();

  const pillars = [
    {
      title: t.pillar1t,
      body: t.pillar1b,
      Icon: Award,
    },
    {
      title: t.pillar2t,
      body: t.pillar2b,
      Icon: Gem,
    },
    {
      title: t.pillar3t,
      body: t.pillar3b,
      Icon: HeartHandshake,
    },
  ];

  return (
    <>
      <section className="relative overflow-hidden border-b border-brand-black/[0.08] bg-white/[0.12] pb-24 pt-20 backdrop-blur-sm sm:pt-28">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(212,175,55,0.14),_transparent_62%)]" />
        <div className="relative mx-auto max-w-5xl px-4 text-center sm:px-6">
          <FadeIn>
            <p className="text-xs uppercase tracking-[0.4em] text-gold-main">
              Razzaq Luxe
            </p>
            <h1 className="lang-heading mt-4 font-heading text-5xl text-brand-black sm:text-6xl">
              <span className="gold-text-shimmer">{t.aboutTitle}</span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-medium-grey">
              {t.aboutHeroLead}
            </p>
          </FadeIn>
        </div>
      </section>

      <section className="border-b border-brand-black/[0.08] bg-white/[0.08] py-20 backdrop-blur-sm sm:py-28">
        <div className="mx-auto max-w-4xl px-4 sm:px-6">
          <FadeIn>
            <h2 className="lang-heading font-heading text-3xl text-brand-black">
              {t.aboutStoryHeading}
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-medium-grey">
              {t.aboutStoryPara1}
            </p>
          </FadeIn>
          <FadeIn className="mt-16" delay={0.06}>
            <div className="glass-card-static relative mx-auto overflow-hidden rounded-3xl border-gold-main/28 shadow-xl">
              <Image
                src="/og-default.jpg"
                alt="Razzaq Luxe artisan studio moodboard"
                width={1200}
                height={720}
                className="aspect-[21/11] h-auto w-full object-cover opacity-90"
              />
              <div className="pointer-events-none absolute inset-0 border border-brand-black/[0.06]" />
            </div>
          </FadeIn>
        </div>
      </section>

      <section className="border-t border-brand-black/[0.06] bg-white/[0.1] py-20 backdrop-blur-sm sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <FadeIn className="text-center">
            <p className="text-xs uppercase tracking-[0.35em] text-gold-main">
              Standards
            </p>
            <h2 className="lang-heading mt-4 font-heading text-4xl text-brand-black">
              {t.pillarsTitle}
            </h2>
          </FadeIn>
          <div className="mt-14 grid gap-8 md:grid-cols-3">
            {pillars.map((p, i) => (
              <FadeIn key={p.title} delay={i * 0.06}>
                <div className="glass-card h-full rounded-3xl border-gold-main/22 p-8 text-left shadow-lg">
                  <p.Icon className="h-9 w-9 text-gold-main" aria-hidden />
                  <h3 className="lang-heading mt-6 font-heading text-2xl text-brand-black">
                    {p.title}
                  </h3>
                  <p className="mt-4 text-sm leading-relaxed text-medium-grey">
                    {p.body}
                  </p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
