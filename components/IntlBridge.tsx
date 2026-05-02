"use client";

import { NextIntlClientProvider } from "next-intl";

import { UI } from "@/data/ui-strings";

export function IntlBridge({ children }: { children: React.ReactNode }) {
  return (
    <NextIntlClientProvider locale="en" messages={UI.en}>
      {children}
    </NextIntlClientProvider>
  );
}
