"use client";

import Image from "next/image";

import type { CartLine } from "@/context/CartContext";
import { useCart } from "@/context/CartContext";
import { formatPkr } from "@/lib/formatCurrency";
import { productImageAlt } from "@/lib/seo/image-alt";
import { useLang } from "@/context/LangContext";

type CartItemProps = {
  line: CartLine;
};

export function CartItem({ line }: CartItemProps) {
  const { removeItem, setQuantity } = useCart();
  const { t } = useLang();
  const { product, quantity } = line;
  const name = product.name.en;
  const primary = product.images[0] ?? "/og-default.jpg";

  return (
    <div className="glass-card-static flex gap-4 rounded-2xl border-gold-main/18 p-3">
      <div className="relative h-24 w-20 shrink-0 overflow-hidden rounded-md bg-brand-paper">
        <Image
          src={primary}
          alt={productImageAlt(line.product, "thumbnail", 0)}
          fill
          sizes="80px"
          loading="lazy"
          className="object-cover"
        />
      </div>
      <div className="flex min-w-0 flex-1 flex-col justify-between">
        <div>
          <p className="truncate font-medium text-brand-black">{name}</p>
          <p className="text-xs text-soft-grey">{product.size}</p>
          <div className="mt-3 inline-flex items-center rounded-full border border-brand-black/[0.12] bg-white/70">
            <button
              type="button"
              aria-label={t.decreaseQty}
              onClick={() =>
                quantity <= 1
                  ? removeItem(product.id)
                  : setQuantity(product.id, quantity - 1)
              }
              className="inline-flex min-h-[44px] min-w-[40px] items-center justify-center text-brand-black hover:text-gold-main"
            >
              −
            </button>
            <span className="min-w-[2rem] text-center text-sm text-brand-black">
              {quantity}
            </span>
            <button
              type="button"
              aria-label={t.increaseQty}
              onClick={() => setQuantity(product.id, quantity + 1)}
              className="inline-flex min-h-[44px] min-w-[40px] items-center justify-center text-brand-black hover:text-gold-main"
            >
              +
            </button>
          </div>
        </div>
        <button
          type="button"
          aria-label={t.removeItem}
          onClick={() => removeItem(product.id)}
          className="mt-2 self-start rounded-full px-3 py-2 text-xs uppercase tracking-wider text-soft-grey transition hover:bg-red-600/10 hover:text-red-700 min-h-[44px]"
        >
          {t.removeItem}
        </button>
      </div>
      <div className="flex shrink-0 flex-col items-end pt-0.5 tabular-nums">
        <p className="text-sm font-semibold text-brand-black">
          {formatPkr(product.price * quantity)}
        </p>
      </div>
    </div>
  );
}
