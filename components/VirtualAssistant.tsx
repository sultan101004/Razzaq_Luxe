"use client";

import Image from "next/image";
import Link from "next/link";

import { buildWhatsAppLink } from "@/lib/whatsapp";
import { WHATSAPP_INFO_MESSAGE } from "@/lib/contact-messages";

export function VirtualAssistant() {
  const href = buildWhatsAppLink(WHATSAPP_INFO_MESSAGE);

  return (
    <Link
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with our virtual assistant"
      className="group fixed bottom-5 left-5 z-[40] flex flex-col items-center gap-1"
    >
      {/* Tooltip */}
      <span className="pointer-events-none mb-1 hidden rounded-full border border-gold-main/30 bg-noir px-3 py-1 text-[10px] font-light tracking-widest text-gold-main opacity-0 transition-opacity duration-300 group-hover:opacity-100 sm:block whitespace-nowrap">
        Need help?
      </span>

      {/* GIF avatar */}
      <div className="relative h-16 w-16 overflow-hidden rounded-full border-2 border-gold-main/40 shadow-lg shadow-black/50 transition-transform duration-300 group-hover:scale-110 group-hover:border-gold-main/80">
        <Image
          src="/images/sporty/virtual-assistant.gif"
          alt="Virtual assistant"
          fill
          sizes="64px"
          className="object-cover"
          unoptimized
        />
      </div>
    </Link>
  );
}
