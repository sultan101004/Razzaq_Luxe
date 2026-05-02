"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "motion/react";
import { Menu, ShoppingBag, X } from "lucide-react";

import { useCart } from "@/context/CartContext";
import { useLang } from "@/context/LangContext";
import { cn } from "@/lib/utils";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { itemCount, openCart } = useCart();
  const { t } = useLang();
  const pathname = usePathname();
  const isHome = pathname === "/";
  const airyHeader = isHome && !scrolled;

  const links = [
    { href: "/", label: t.navHome },
    { href: "/fragrances", label: t.navFragrances },
    { href: "/about", label: t.navAbout },
    { href: "/contact", label: t.navContact },
  ];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setMobileOpen(false), [pathname]);

  useEffect(() => {
    if (mobileOpen) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <>
      <header
        className={cn(
          "sticky top-0 z-50 border-b transition-all duration-500",
          airyHeader
            ? "border-transparent bg-transparent"
            : "border-white/[0.06] bg-noir/90 shadow-[0_4px_24px_-8px_rgba(0,0,0,0.4)] backdrop-blur-xl"
        )}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-4 sm:gap-6 sm:px-6 lg:px-8">
          <Link href="/" className="flex flex-col leading-tight">
            <span
              className={cn(
                "font-sans text-[10px] font-semibold uppercase tracking-[0.32em]",
                airyHeader ? "text-gold-main/95" : "text-soft-grey"
              )}
            >
              {t.navEyebrow}
            </span>
            <span
              className={cn(
                "font-serif text-2xl font-medium tracking-tight sm:text-[1.65rem]",
                airyHeader ? "text-off-white" : "text-ivory"
              )}
            >
              {t.brandEn}
            </span>
          </Link>

          <nav className="hidden items-center gap-7 md:flex md:flex-1 md:justify-center xl:gap-10">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className={cn(
                  "type-ui-caps whitespace-nowrap transition-colors",
                  airyHeader
                    ? "text-off-white/75 hover:text-gold-light"
                    : "text-ivory/60 hover:text-gold-main",
                  pathname === l.href &&
                    (airyHeader ? "text-gold-light" : "text-gold-main")
                )}
              >
                {l.label}
              </Link>
            ))}
          </nav>

          <div className="flex shrink-0 items-center gap-2 sm:gap-3">

            <button
              type="button"
              aria-label={
                itemCount > 0
                  ? `${t.cartTitle}: ${itemCount} ${itemCount === 1 ? t.cartItemOne : t.cartItemOther}`
                  : t.cartTitle
              }
              onClick={openCart}
              className={cn(
                "relative inline-flex min-h-[44px] min-w-[44px] items-center justify-center rounded-full border transition",
                airyHeader
                  ? "border-white/22 bg-white/[0.08] text-off-white backdrop-blur-sm hover:bg-white/[0.14] hover:text-gold-light"
                  : "border-white/[0.1] bg-white/[0.05] text-ivory backdrop-blur-sm hover:border-gold-main/35 hover:text-gold-main"
              )}
            >
              <ShoppingBag className="h-5 w-5" strokeWidth={1.25} aria-hidden />
              {itemCount > 0 ? (
                <span className="absolute -top-1 flex h-5 min-w-[20px] items-center justify-center rounded-full bg-gold-main px-1 text-[10px] font-bold text-black [inset-inline-end:-0.25rem]">
                  {itemCount > 99 ? "99+" : itemCount}
                </span>
              ) : null}
            </button>

            <button
              type="button"
              aria-label={mobileOpen ? t.closeMenu : t.openMenu}
              aria-expanded={mobileOpen}
              aria-controls="mobile-primary-nav"
              className={cn(
                "inline-flex min-h-[44px] min-w-[44px] items-center justify-center rounded-full border transition md:hidden",
                airyHeader
                  ? "border-white/22 bg-white/[0.08] text-off-white backdrop-blur-sm hover:bg-white/[0.14]"
                  : "border-white/[0.1] bg-white/[0.05] text-ivory hover:border-gold-main/35"
              )}
              onClick={() => setMobileOpen((v) => !v)}
            >
              {mobileOpen ? (
                <X className="h-6 w-6" strokeWidth={1.25} aria-hidden />
              ) : (
                <Menu className="h-6 w-6" strokeWidth={1.25} aria-hidden />
              )}
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {mobileOpen ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[45] md:hidden"
          >
            <button
              type="button"
              aria-label={t.closeOverlay}
              className="absolute inset-0 bg-brand-black/25 backdrop-blur-sm"
              onClick={() => setMobileOpen(false)}
            />
            <motion.nav
              id="mobile-primary-nav"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 28, stiffness: 260 }}
              className="absolute right-0 top-0 flex h-full w-[min(100%,380px)] flex-col overflow-y-auto border-l border-white/[0.07] bg-[#0d0d0d] px-8 pb-12 pt-24 shadow-2xl"
            >
              {links.map((l, idx) => (
                <motion.div
                  key={l.href}
                  initial={{ opacity: 0, x: 24 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.05 }}
                >
                  <Link
                    href={l.href}
                    className={cn(
                      "font-serif block py-4 text-lg font-light tracking-tight text-ivory/80 transition hover:text-gold-main",
                      pathname === l.href && "text-gold-main"
                    )}
                  >
                    {l.label}
                  </Link>
                </motion.div>
              ))}
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="mt-auto border-t border-white/[0.06] pt-6 text-xs uppercase tracking-[0.3em] text-ivory/30"
              >
                {t.taglineTiny}
              </motion.p>
            </motion.nav>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
