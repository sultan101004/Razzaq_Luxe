"use client";

import { MessageCircle } from "lucide-react";

import { cn } from "@/lib/utils";
import { trackEvent } from "@/lib/analytics";

type Base = {
  href: string;
  trackingId?: string;
  className?: string;
};

type FloatingProps = Base & {
  variant: "floating";
  tooltip: string;
};

type ProductProps = Base & {
  variant: "product";
  label: React.ReactNode;
  subtitle?: string;
};

export function WhatsAppButton(props: FloatingProps | ProductProps) {
  const fire = () => {
    trackEvent(props.trackingId ?? "whatsapp_click", {
      placement: props.variant === "floating" ? "floating" : "product",
      link: props.href.slice(0, 80),
    });
  };

  if (props.variant === "floating") {
    const { href, tooltip, className } = props;
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        title={tooltip}
        aria-label={tooltip}
        onClick={fire}
        className={cn(
          "fixed bottom-6 z-[40] inline-flex min-h-[52px] min-w-[52px] animate-pulse-wa items-center justify-center rounded-full bg-[#25D366] text-white shadow-xl shadow-black/40 transition hover:brightness-105",
          "right-5",
          className
        )}
      >
        <MessageCircle className="h-6 w-6" />
      </a>
    );
  }

  const { href, label, subtitle, className } = props;
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      onClick={fire}
      className={cn(
        "inline-flex w-full min-h-[52px] items-center justify-center gap-3 rounded-xl border border-transparent bg-[#25D366] px-5 py-3 text-[15px] font-semibold text-white shadow-inner transition hover:brightness-110 active:brightness-95",
        className
      )}
    >
      <MessageCircle className="h-5 w-5 shrink-0" />
      <span className="flex flex-col leading-tight text-center">
        <span>{label}</span>
        {subtitle ? (
          <span className="text-xs font-normal text-white/85">{subtitle}</span>
        ) : null}
      </span>
    </a>
  );
}
