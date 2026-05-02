import type { Config } from "tailwindcss";
import tailwindcssAnimate from "tailwindcss-animate";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        /** Design system tokens */
        noir:            "#0d0d0d",
        ivory:           "#f5ede0",
        "gold-main":     "#d4b483",
        "gold-dark":     "#c8976e",
        "gold-light":    "#e8ceaa",
        "muted-luxury":  "#7a6e63",
        /** Legacy aliases kept for compatibility */
        "brand-gold":    "#d4b483",
        "brand-black":   "#0d0d0d",
        "brand-paper":   "#f5ede0",
        "soft-grey":     "#7a6e63",
        "medium-grey":   "#5a5048",
        "accent-grey":   "#6a5e53",
        "deep-black":    "#0d0d0d",
        charcoal:        "#141414",
        burgundy:        "#3D0C11",
        "off-white":     "#f5ede0",
        muted:           "#1e1a17",
        "muted-foreground": "#7a6e63",
        destructive:     "#7f1d1d",
        "destructive-foreground": "#fef2f2",
      },
      fontFamily: {
        /** Cormorant Garamond — editorial serif (aliases: heading, serif) */
        serif: ["var(--font-cormorant)", "Georgia", "serif"],
        heading: ["var(--font-cormorant)", "Georgia", "serif"],
        /** Jost — clean modern sans for UI body copy */
        sans: ["var(--font-jost)", "system-ui", "sans-serif"],
        nastaliq: ["var(--font-noto-nastaliq)", "serif"],
      },
      backgroundImage: {
        "gold-shimmer":
          "linear-gradient(110deg, transparent 0%, rgba(232, 201, 106, 0.35) 45%, rgba(201, 168, 76, 0.6) 50%, rgba(232, 201, 106, 0.35) 55%, transparent 100%)",
      },
      keyframes: {
        shimmer: {
          "0%": { backgroundPosition: "200% center" },
          "100%": { backgroundPosition: "-200% center" },
        },
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0) scale(1)" },
          "50%": { transform: "translateY(-12px) scale(1.03)" },
        },
        "accordion-down": {
          from: { height: "0", opacity: "0.6" },
          to: {
            height: "var(--radix-accordion-content-height)",
            opacity: "1",
          },
        },
        "accordion-up": {
          from: {
            height: "var(--radix-accordion-content-height)",
            opacity: "1",
          },
          to: { height: "0", opacity: "0.6" },
        },
        "pulse-wa": {
          "0%, 100%": { boxShadow: "0 0 0 0 rgba(37, 211, 102, 0.45)" },
          "50%": { boxShadow: "0 0 0 14px rgba(37, 211, 102, 0)" },
        },
      },
      animation: {
        shimmer: "shimmer 4s linear infinite",
        marquee: "marquee 32s linear infinite",
        float: "float 8s ease-in-out infinite",
        "accordion-down": "accordion-down 0.24s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "pulse-wa": "pulse-wa 2.25s cubic-bezier(0.4, 0, 0.6, 1) infinite",
      },
    },
  },
  plugins: [tailwindcssAnimate],
};
export default config;
