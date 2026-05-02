"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";

import { FadeIn } from "@/components/FadeIn";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useLang } from "@/context/LangContext";
import { buildWhatsAppLink } from "@/lib/whatsapp";
import { WHATSAPP_INFO_MESSAGE } from "@/lib/contact-messages";

export default function ContactPage() {
  const { t } = useLang();
  const [sent, setSent] = useState(false);
  const whatsHref = buildWhatsAppLink(WHATSAPP_INFO_MESSAGE);

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <div className="min-h-screen bg-noir pb-28 pt-16 sm:pt-20">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <FadeIn className="max-w-2xl">
          <p className="eyebrow">{t.contactEyebrow}</p>
          <h1 className="lang-heading mt-4 font-serif text-4xl font-light text-ivory sm:text-5xl">
            {t.contactTitle}
          </h1>
          <p className="mt-4 font-sans font-light text-ivory/50">{t.contactLead}</p>
        </FadeIn>

        <div className="mt-12 grid gap-12 lg:grid-cols-[1.05fr_minmax(0,0.8fr)]">
          <FadeIn delay={0.05}>
            <form
              onSubmit={onSubmit}
              className="rounded-2xl border border-white/[0.07] bg-[#141414] p-6 sm:p-10"
            >
              <div className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="cname">{t.fullName}</Label>
                  <Input id="cname" name="cname" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="cphone">{t.phone}</Label>
                  <Input
                    id="cphone"
                    name="cphone"
                    type="tel"
                    required
                    placeholder={t.phoneHint}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="cemail">{t.email}</Label>
                  <Input id="cemail" name="cemail" type="email" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="cmsg">{t.messageLabel}</Label>
                  <textarea
                    id="cmsg"
                    name="cmsg"
                    required
                    rows={6}
                    className="flex min-h-[160px] w-full resize-y rounded-md border border-white/[0.10] bg-white/[0.05] px-3 py-2 text-sm font-light text-ivory placeholder:text-ivory/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-main focus-visible:ring-offset-2 focus-visible:ring-offset-noir"
                  />
                </div>
                <button type="submit" className="btn btn-primary">
                  {t.submitMessage}
                </button>
                {sent ? (
                  <p className="text-sm text-gold-main" role="status">
                    {t.messageReceived}
                  </p>
                ) : null}
              </div>
            </form>
          </FadeIn>

          <FadeIn delay={0.08} className="space-y-6">
            <div className="rounded-2xl border border-white/[0.07] bg-[#141414] p-6 sm:p-8">
              <h2 className="font-serif text-2xl font-light text-ivory">{t.hubTitle}</h2>
              <p className="mt-4 text-sm font-light leading-relaxed text-ivory/60">
                {t.atelierLabel}
                <br />
                {t.hubAddress}
              </p>

              <p className="mt-8 text-xs uppercase tracking-[0.25em] text-gold-main/60">
                {t.hoursTitle}
              </p>
              <p className="mt-3 text-sm font-light text-ivory/80">{t.hoursValue}</p>

              <Link
                href={whatsHref}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-outline mt-10 w-full justify-center"
              >
                {t.conciergeWhatsApp}
              </Link>

              <p className="mt-6 text-xs font-light text-ivory/30">{t.contactFootnote}</p>
            </div>
          </FadeIn>
        </div>
      </div>
    </div>
  );
}
