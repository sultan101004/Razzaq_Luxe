"use client";

import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { CartItem } from "@/components/CartItem";
import { useCart } from "@/context/CartContext";
import { useLang } from "@/context/LangContext";
import { formatPkr } from "@/lib/formatCurrency";

export function CartDrawer() {
  const {
    items,
    subtotal,
    isOpen,
    closeCart,
  } = useCart();
  const { t } = useLang();
  const itemLabel = items.length === 1 ? t.cartItemOne : t.cartItemOther;
  const side = "right";

  return (
    <Sheet open={isOpen} onOpenChange={(open) => !open && closeCart()}>
      <SheetContent
        side={side}
        className="flex w-full flex-col gap-0 border-gold-main/22 px-4 pb-8 pt-12 sm:max-w-md sm:px-6"
      >
        <SheetHeader className="text-start">
          <SheetTitle>{t.cartTitle}</SheetTitle>
          <p className="text-sm text-medium-grey">
            {items.length === 0
              ? t.cartEmpty
              : `${items.length} ${itemLabel} • ${formatPkr(subtotal)}`}
          </p>
        </SheetHeader>

        <Separator className="my-6 bg-gold-main/20" />

        <div className="flex flex-1 flex-col gap-4 overflow-y-auto pe-1">
          <AnimatePresence initial={false}>
            {items.map((line) => (
              <motion.div layout key={line.product.id}>
                <CartItem line={line} />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        <div className="mt-6 space-y-4 border-t border-brand-black/[0.08] pt-6">
          <div className="flex items-center justify-between text-sm text-brand-black">
            <span>{t.subtotalLabel}</span>
            <span className="text-lg font-semibold text-gold-main">
              {formatPkr(subtotal)}
            </span>
          </div>
          <Button
            size="lg"
            className="w-full"
            disabled={items.length === 0}
            asChild={items.length > 0}
          >
            {items.length > 0 ? (
              <Link href="/checkout" onClick={closeCart}>
                {t.checkout}
              </Link>
            ) : (
              <span>{t.checkout}</span>
            )}
          </Button>
          <button
            type="button"
            onClick={closeCart}
            className="w-full text-center text-sm text-soft-grey underline-offset-4 transition hover:text-gold-main hover:underline min-h-[44px]"
          >
            {t.continueShopping}
          </button>
        </div>
      </SheetContent>
    </Sheet>
  );
}
