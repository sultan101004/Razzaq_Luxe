"use client";

import { CartProvider } from "@/context/CartContext";
import { IntlBridge } from "@/components/IntlBridge";
import { LangProvider } from "@/context/LangContext";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <LangProvider>
      <IntlBridge>
        <CartProvider>{children}</CartProvider>
      </IntlBridge>
    </LangProvider>
  );
}
