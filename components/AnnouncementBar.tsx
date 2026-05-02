"use client";

import { useLang } from "@/context/LangContext";

export function AnnouncementBar() {
  const { t } = useLang();
  const line = t.marquee;

  return (
    <div className="relative z-[60] overflow-hidden border-b border-white/[0.06] bg-noir py-2.5">
      <div className="flex w-max animate-marquee">
        {[0, 1].map((dup) => (
          <div
            key={dup}
            className="flex shrink-0 items-center gap-16 px-10"
            aria-hidden={dup === 1 ? true : undefined}
          >
            {Array.from({ length: 6 }).map((_, i) => (
              <p
                key={`${dup}-${i}`}
                className="text-xs font-semibold tracking-wide text-gold-main sm:text-sm"
              >
                {line}
              </p>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
