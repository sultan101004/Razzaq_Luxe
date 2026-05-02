"use client";

import { useId } from "react";

function InstagramBadge({ className }: { className?: string }) {
  const gid = useId().replace(/[:]/g, "");
  const gradId = `ig-${gid}`;
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      aria-hidden
    >
      <defs>
        <linearGradient id={gradId} x1="0%" y1="100%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#fdf497" />
          <stop offset="45%" stopColor="#fd5949" />
          <stop offset="60%" stopColor="#d6249f" />
          <stop offset="90%" stopColor="#285AEB" />
        </linearGradient>
      </defs>
      <rect
        x="3"
        y="3"
        width="18"
        height="18"
        rx="6"
        fill={`url(#${gradId})`}
      />
      <circle cx="12" cy="12" r="5" stroke="white" strokeWidth="1.35" fill="none" />
      <circle cx="17" cy="7" r="1.35" fill="white" />
    </svg>
  );
}

function TikTokMono({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden>
      <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 002.31 5.74 2.89 2.89 0 012.89-3.74 3 3 0 00.58.06 2.93 2.93 0 00.3-.06V13.72a7 7 0 01-1 .07 6.33 6.33 0 01-6.33 6.32A6.34 6.34 0 0112 13.71V9.6a8.34 8.34 0 004.93 1.6V7.93a5 6 6 0 01-3-.74v-.5z" />
    </svg>
  );
}

type Props = {
  instagramUrl: string;
  tiktokUrl: string;
  watchInstagram: string;
  watchTiktok: string;
  title: string;
};

export function SocialWatchButtons({
  instagramUrl,
  tiktokUrl,
  watchInstagram,
  watchTiktok,
  title,
}: Props) {
  return (
    <div className="space-y-4">
      <p className="text-xs uppercase tracking-[0.3em] text-gold-main">
        {title}
      </p>
      <div className="flex flex-wrap gap-3">
        <a
          href={instagramUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="glass-card inline-flex min-h-[52px] min-w-[220px] flex-1 items-center justify-center gap-3 rounded-2xl border-gold-main/28 px-4 py-3 text-sm font-semibold text-brand-black"
        >
          <InstagramBadge className="h-8 w-8 rounded-md" />
          {watchInstagram}
        </a>
        <a
          href={tiktokUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="glass-card inline-flex min-h-[52px] min-w-[220px] flex-1 items-center justify-center gap-3 rounded-2xl border-brand-black/[0.1] px-4 py-3 text-sm font-semibold text-brand-black"
        >
          <TikTokMono className="h-8 w-8 text-brand-black" />
          {watchTiktok}
        </a>
      </div>
    </div>
  );
}
