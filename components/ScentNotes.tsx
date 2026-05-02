"use client";

import type { Product } from "@/data/products";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { UI } from "@/data/ui-strings";

type Props = {
  product: Product;
};

function Pills({ items }: { items: string[] }) {
  return (
    <div className="flex flex-wrap gap-2">
      {items.map((n) => (
        <span
          key={n}
          className="rounded-sm border border-gold-main/30 px-3 py-1 font-sans text-[10px] font-light uppercase tracking-[0.18em] text-ivory"
        >
          {n}
        </span>
      ))}
    </div>
  );
}

export function ScentNotes({ product }: Props) {
  const t = UI.en;

  const rows = [
    { key: "top" as const, label: t.topNotes },
    { key: "heart" as const, label: t.heartNotes },
    { key: "base" as const, label: t.baseNotes },
  ];

  return (
    <div className="rounded-sm border border-white/[0.07] bg-[#141414] p-1">
      <p className="px-5 pt-4 font-sans text-xs font-light uppercase tracking-[0.25em] text-muted-luxury">
        {t.scentNotes}
      </p>
      <Accordion type="multiple" defaultValue={["top", "heart", "base"]} className="px-4 pb-4">
        {rows.map((row) => (
          <AccordionItem key={row.key} value={row.key}>
            <AccordionTrigger>{row.label}</AccordionTrigger>
            <AccordionContent className="">
              <Pills items={product.notes[row.key]} />
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}
