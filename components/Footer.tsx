"use client";

import Link from "next/link";

import { useLang } from "@/context/LangContext";
import { buildWhatsAppLink } from "@/lib/whatsapp";
import { WHATSAPP_INFO_MESSAGE } from "@/lib/contact-messages";

function InstagramIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden {...props}>
      <path d="M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5Zm0 2a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V7a3 3 0 0 0-3-3H7Zm10 1.5a1.25 1.25 0 1 1 0 2.5 1.25 1.25 0 0 1 0-2.5ZM12 7a5 5 0 1 1 0 10 5 5 0 0 1 0-10Zm0 2a3 3 0 1 0 0 6 3 3 0 0 0 0-6Z" />
    </svg>
  );
}

function FacebookIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden {...props}>
      <path d="M13.5 22v-8.2h2.7l.5-3.3H13.5V8.6c0-.9.26-1.5 1.6-1.5h1.7V4.1c-.3 0-1.4-.14-2.6-.14-2.6 0-4.4 1.58-4.4 4.5v2.8H7v3.3h2.6V22h3.9Z" />
    </svg>
  );
}

function TikTokIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden
      className={props.className}
      {...props}
    >
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
    </svg>
  );
}

function WhatsIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden {...props}>
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
    </svg>
  );
}

export function Footer() {
  const { t } = useLang();
  const whatsHref = buildWhatsAppLink(WHATSAPP_INFO_MESSAGE);

  const footerLinks = [
    { href: "/", label: t.navHome },
    { href: "/fragrances", label: t.navFragrances },
    { href: "/about", label: t.navAbout },
    { href: "/contact", label: t.navContact },
  ];

  return (
    <footer className="border-t border-white/[0.06] bg-[#0a0a0a]">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-10 lg:flex-row lg:items-start lg:justify-between">

          {/* Brand */}
          <div>
            <Link
              href="/"
              className="font-heading text-2xl tracking-[0.14em] text-gold-main"
            >
              {t.brandCaps}
            </Link>
            <p className="mt-3 max-w-xs text-sm font-light text-ivory/50">
              {t.footerTagline}
            </p>
          </div>

          {/* Nav links */}
          <div>
            <p className="text-xs uppercase tracking-[0.25em] text-gold-main/60">
              {t.footerExplore}
            </p>
            <ul className="mt-4 space-y-2">
              {footerLinks.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="text-sm font-light text-ivory/70 transition-colors duration-200 hover:text-gold-main"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Socials */}
          <div>
            <p className="text-xs uppercase tracking-[0.25em] text-gold-main/60">
              {t.footerFollow}
            </p>
            <div className="mt-4 flex flex-wrap gap-3">
              {/* Instagram — brand gradient pink/purple */}
              <a
                href="https://www.instagram.com/razzaqluxe/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-[44px] min-w-[44px] items-center justify-center rounded-full border border-white/[0.08] bg-white/[0.04] transition-all duration-200 hover:border-[#E1306C]/50 hover:bg-[#E1306C]/10"
                style={{ color: "#E1306C" }}
              >
                <InstagramIcon className="h-5 w-5" />
                <span className="sr-only">Instagram</span>
              </a>

              {/* TikTok — brand cyan */}
              <a
                href="https://www.tiktok.com/@razzaqluxe"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-[44px] min-w-[44px] items-center justify-center rounded-full border border-white/[0.08] bg-white/[0.04] transition-all duration-200 hover:border-[#69C9D0]/50 hover:bg-[#69C9D0]/10"
                style={{ color: "#69C9D0" }}
              >
                <TikTokIcon className="h-5 w-5" />
                <span className="sr-only">TikTok</span>
              </a>

              {/* Facebook — brand blue */}
              <a
                href="https://www.facebook.com/razzaqluxe"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-[44px] min-w-[44px] items-center justify-center rounded-full border border-white/[0.08] bg-white/[0.04] transition-all duration-200 hover:border-[#1877F2]/50 hover:bg-[#1877F2]/10"
                style={{ color: "#1877F2" }}
              >
                <FacebookIcon className="h-5 w-5" />
                <span className="sr-only">Facebook</span>
              </a>

              {/* WhatsApp — brand green (unchanged) */}
              <a
                href={whatsHref}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-[44px] min-w-[44px] items-center justify-center rounded-full border border-emerald-500/30 bg-emerald-500/[0.08] text-emerald-400 transition-all duration-200 hover:border-emerald-500/60 hover:bg-emerald-500/20"
              >
                <WhatsIcon className="h-5 w-5" />
                <span className="sr-only">WhatsApp</span>
              </a>
            </div>
          </div>

        </div>
        <div className="mt-12 border-t border-white/[0.06] pt-8 text-center text-xs font-light tracking-wide text-ivory/30">
          {t.copyright}
        </div>
      </div>
    </footer>
  );
}
