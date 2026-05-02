"use client";

import { createContext, useContext, useMemo } from "react";

import { UI } from "@/data/ui-strings";

type LangContextValue = {
  lang: "en";
  t: typeof UI.en;
};

const LangContext = createContext<LangContextValue | undefined>(undefined);

export function LangProvider({ children }: { children: React.ReactNode }) {
  const value = useMemo(() => ({ lang: "en" as const, t: UI.en }), []);
  return <LangContext.Provider value={value}>{children}</LangContext.Provider>;
}

export function useLang() {
  const ctx = useContext(LangContext);
  if (!ctx) throw new Error("useLang must be within LangProvider");
  return ctx;
}
