"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useMemo, useState } from "react";

import { SuccessModal } from "@/components/SuccessModal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { FadeIn } from "@/components/FadeIn";
import { useCart } from "@/context/CartContext";
import { useLang } from "@/context/LangContext";
import { computeDeliveryFee } from "@/lib/delivery";
import { formatPkr } from "@/lib/formatCurrency";
import { productImageAlt } from "@/lib/seo/image-alt";

const PK_PHONE_REGEX = /^\+92[0-9]{10}$/;

const SIMPLE_EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const CITIES_PK = [
  { en: "Karachi", ur: "کراچی" },
  { en: "Lahore", ur: "لاہور" },
  { en: "Islamabad", ur: "اسلام آباد" },
  { en: "Rawalpindi", ur: "راولپنڈی" },
  { en: "Peshawar", ur: "پشاور" },
  { en: "Multan", ur: "ملتان" },
  { en: "Faisalabad", ur: "فیصل آباد" },
  { en: "Quetta", ur: "کوئٹہ" },
  { en: "Hyderabad", ur: "حیدرآباد" },
  { en: "Sialkot", ur: "سیالکوٹ" },
  { en: "Gujranwala", ur: "گوجرانوالہ" },
  { en: "Sargodha", ur: "سرگودھا" },
];

export function CheckoutForm() {
  const router = useRouter();
  const { t } = useLang();
  const { items, subtotal, clearCart } = useCart();
  const [successOpen, setSuccessOpen] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  const delivery = useMemo(() => computeDeliveryFee(subtotal), [subtotal]);
  const grandTotal = subtotal + delivery;

  const finishCheckout = () => {
    clearCart();
    setSuccessOpen(false);
    router.push("/");
    router.refresh();
  };

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormError(null);
    if (items.length === 0) return;

    const fd = new FormData(e.currentTarget);
    const phone = String(fd.get("phone") ?? "").trim();
    const email = String(fd.get("email") ?? "").trim();

    if (!PK_PHONE_REGEX.test(phone)) {
      setFormError(t.validationPhone);
      return;
    }

    if (email && !SIMPLE_EMAIL_REGEX.test(email)) {
      setFormError(t.validationEmail);
      return;
    }

    if (!e.currentTarget.reportValidity()) return;

    setSuccessOpen(true);
  };

  return (
    <>
      <div className="border-b border-brand-black/[0.08] pb-24 pt-12 sm:pt-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <FadeIn className="max-w-3xl text-start">
            <p className="text-xs uppercase tracking-[0.35em] text-gold-main">
              {t.checkout}
            </p>
            <h1 className="mt-3 font-heading text-4xl text-brand-black sm:text-5xl">
              {t.checkoutTitle}
            </h1>
            <p className="mt-4 text-medium-grey">{t.checkoutLead}</p>
          </FadeIn>

          <div className="mt-12 grid gap-12 lg:grid-cols-[1.05fr_minmax(0,0.9fr)]">
            <FadeIn delay={0.05}>
              <form
                className="glass-card-static space-y-8 rounded-3xl border-gold-main/22 p-6 text-start sm:p-10"
                onSubmit={onSubmit}
                noValidate={false}
              >
                <div className="grid gap-6 sm:grid-cols-2">
                  <div className="space-y-2 sm:col-span-2">
                    <Label htmlFor="fullName">{t.fullName}</Label>
                    <Input id="fullName" name="fullName" required autoComplete="name" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">{t.phone}</Label>
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      required
                      inputMode="tel"
                      placeholder={t.phoneHint}
                      autoComplete="tel"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">{t.email}</Label>
                    <Input id="email" name="email" type="email" autoComplete="email" />
                  </div>
                  <div className="space-y-2 sm:col-span-2">
                    <Label htmlFor="city">{t.city}</Label>
                    <select
                      id="city"
                      name="city"
                      required
                      className="flex h-11 w-full min-h-[44px] cursor-pointer rounded-md border border-brand-black/[0.12] bg-white/80 px-3 text-sm text-brand-black outline-none ring-offset-brand-paper focus-visible:ring-2 focus-visible:ring-gold-main focus-visible:ring-offset-2"
                      defaultValue=""
                    >
                      <option value="" disabled>
                        {t.cityPlaceholder}
                      </option>
                      {CITIES_PK.map((c) => (
                        <option key={c.en} value={c.en}>
                          {c.en}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="space-y-2 sm:col-span-2">
                    <Label htmlFor="address">{t.address}</Label>
                    <textarea
                      id="address"
                      name="address"
                      rows={4}
                      required
                      placeholder={t.addressPlaceholder}
                      className="flex w-full min-h-[120px] resize-y rounded-md border border-brand-black/[0.12] bg-white/80 px-3 py-2 text-sm text-brand-black placeholder:text-accent-grey focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-main focus-visible:ring-offset-2 focus-visible:ring-offset-brand-paper"
                    />
                  </div>
                  <div className="space-y-2 sm:col-span-2">
                    <Label htmlFor="instructions">{t.instructions}</Label>
                    <textarea
                      id="instructions"
                      name="instructions"
                      rows={3}
                      placeholder={t.instrPlaceholder}
                      className="flex w-full min-h-[90px] resize-y rounded-md border border-brand-black/[0.12] bg-white/80 px-3 py-2 text-sm text-brand-black placeholder:text-accent-grey focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-main focus-visible:ring-offset-2 focus-visible:ring-offset-brand-paper"
                    />
                  </div>
                </div>

                <fieldset className="space-y-3">
                  <legend className="text-sm font-medium text-brand-black">
                    {t.paymentMethod}
                  </legend>
                  <RadioGroup
                    defaultValue="cod"
                    className="gap-4 rounded-xl border border-brand-black/[0.1] bg-white/70 p-4"
                  >
                    <div className="flex items-center gap-3">
                      <RadioGroupItem value="cod" id="cod" />
                      <Label htmlFor="cod" className="cursor-default">
                        {t.cod}
                      </Label>
                    </div>
                  </RadioGroup>
                </fieldset>

                {formError ? (
                  <p className="text-sm font-medium text-amber-900" role="alert">
                    {formError}
                  </p>
                ) : null}

                <Button
                  type="submit"
                  size="lg"
                  className="w-full sm:w-auto"
                  disabled={items.length === 0}
                >
                  {t.placeOrder}
                </Button>

                <p className="text-xs text-soft-grey">{t.formNote}</p>
              </form>
            </FadeIn>

            <FadeIn delay={0.1}>
              <div className="glass-card-static space-y-6 rounded-3xl border-gold-main/22 p-6 sm:p-8">
                <h2 className="font-heading text-2xl text-brand-black">
                  {t.orderSummary}
                </h2>
                <div className="space-y-4">
                  {items.length === 0 ? (
                    <p className="text-sm text-medium-grey">
                      <Link
                        href="/fragrances"
                        className="text-gold-main underline-offset-4 hover:underline"
                      >
                        {t.emptyCartCta}
                      </Link>
                    </p>
                  ) : (
                    items.map((line) => (
                      <div
                        key={line.product.id}
                        className="flex gap-4 border-b border-gold-main/18 pb-4 last:border-0 last:pb-0"
                      >
                        <div className="relative h-20 w-16 shrink-0 overflow-hidden rounded-md bg-brand-paper">
                          <Image
                            src={
                              line.product.images[0] ?? "/og-default.jpg"
                            }
                            alt={productImageAlt(line.product, "thumbnail", 0)}
                            fill
                            loading="lazy"
                            className="object-cover"
                            sizes="64px"
                          />
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="truncate font-medium text-brand-black">
                            {line.product.name.en}
                          </p>
                          <p className="text-xs text-soft-grey">
                            {t.qty} {line.quantity}
                          </p>
                          <p className="mt-1 text-sm text-gold-main">
                            {formatPkr(
                              line.product.price * line.quantity,
                              "en"
                            )}
                          </p>
                        </div>
                      </div>
                    ))
                  )}
                </div>
                <div className="space-y-3 border-t border-brand-black/[0.08] pt-4 text-sm text-brand-black">
                  <div className="flex justify-between">
                    <span>{t.subtotalLabel}</span>
                    <span>{formatPkr(subtotal, "en")}</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span>{t.deliveryFee}</span>
                    <span>{formatPkr(delivery, "en")}</span>
                  </div>
                  <div className="flex items-center justify-between border-t border-gold-main/18 pt-3 text-lg font-semibold">
                    <span>{t.grandTotal}</span>
                    <span className="text-gold-main">
                      {formatPkr(grandTotal, "en")}
                    </span>
                  </div>
                </div>
                <p className="text-xs text-soft-grey">{t.freeDeliveryHint}</p>
              </div>
            </FadeIn>
          </div>
        </div>
      </div>

      <SuccessModal
        open={successOpen}
        onClose={finishCheckout}
        title={t.orderSuccessTitle}
        message={t.orderSuccessMsg}
        continueLabel={t.continueShopping}
      />
    </>
  );
}
