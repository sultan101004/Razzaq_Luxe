export type ScentNote = { top: string[]; heart: string[]; base: string[] };

export type Product = {
  id: string;
  slug: string;
  name: { en: string; ur: string };
  tagline: { en: string; ur: string };
  description: { en: string; ur: string };
  notes: ScentNote;
  price: number;
  size: string;
  badge: string;
  images: string[];
  whatsappMessage: string;
  instagramReel: string;
  tiktokVideo: string;
  metaTitle: string;
  metaDescription: string;
  metaKeywords: string[];
  ogImage: string;
};

export const PRODUCTS: Product[] = [
  {
    id: "khans-aura",
    slug: "khans-aura",
    name: { en: "Khan's Aura", ur: "خان کی اورا" },
    tagline: {
      en: "Command Every Room",
      ur: "ہر محفل پر راج کریں",
    },
    description: {
      en: "Born from the lineage of kings — Khan's Aura opens with crackling black pepper and rare saffron, blooms into rich oud and aged leather, then settles into a warm amber and sandalwood base that lingers for hours. For the man who was born to lead.",
      ur: "بادشاہوں کی نسل سے جنم لی خوشبو — خان کی اورا، سیاہ مرچ اور زعفران کی تازگی سے شروع ہو کر عود اور چمڑے کی دلکشی میں ڈھلتی ہے، اور عنبر و صندل کی گہری خوشبو پر ٹھہرتی ہے۔",
    },
    notes: {
      top: ["Black Pepper", "Saffron", "Cardamom"],
      heart: ["Oud", "Leather", "Smoky Incense"],
      base: ["Amber", "Sandalwood", "Dark Musk"],
    },
    price: 4500,
    size: "50ml EDP",
    badge: "BESTSELLER",
    images: [
      "/images/sporty/KhansAura_Flavour.png",
      "/products/khans-aura/hover.jpg",
      "/products/khans-aura/detail-1.jpg",
      "/products/khans-aura/detail-2.jpg",
    ],
    whatsappMessage:
      "السلام علیکم! میں Razzaq Luxe کا *Khan's Aura (50ml EDP)* آرڈر کرنا چاہتا ہوں۔ قیمت: PKR 4,500۔ براہ کرم رابطہ کریں۔",
    instagramReel: "https://www.instagram.com/razzaqluxe/",
    tiktokVideo: "https://www.tiktok.com/@razzaqluxe",
    metaTitle: "Khan's Aura – Oud & Amber EDP | Razzaq Luxe",
    metaDescription:
      "Shop Khan's Aura by Razzaq Luxe — a bold oud, saffron & amber fragrance for men. 50ml EDP. Authentic luxury. Order now in Pakistan.",
    metaKeywords: [
      "Khan's Aura perfume",
      "oud fragrance Pakistan",
      "luxury perfume for men",
      "Razzaq Luxe",
      "best oud EDP Pakistan",
      "خان کی اورا",
    ],
    ogImage: "/images/sporty/KhansAura_Flavour.png",
  },
  {
    id: "habibi",
    slug: "habibi",
    name: { en: "Habibi", ur: "حبیبی" },
    tagline: {
      en: "A Love Written in Scent",
      ur: "خوشبو میں لکھی محبت",
    },
    description: {
      en: "Habibi is an ode to romance — an intoxicating blend of fresh rose petals and bergamot that melts into jasmine and neroli, resting on a warm bed of musk and vanilla. Timeless, tender, unforgettable.",
      ur: "حبیبی محبت کا نغمہ ہے — گلاب اور برگاموٹ کی تازگی سے شروع ہو کر چنبیلی اور نیرولی کی نرمی میں ڈھلتی ہے، اور مشک و ونیلا کی مٹھاس پر ختم ہوتی ہے۔",
    },
    notes: {
      top: ["Rose Petals", "Bergamot", "Pink Pepper"],
      heart: ["Jasmine", "Neroli", "Peach Blossom"],
      base: ["Musk", "Vanilla", "White Sandalwood"],
    },
    price: 3800,
    size: "50ml EDP",
    badge: "NEW ARRIVAL",
    images: [
      "/images/sporty/Habibi_Flavour.png",
      "/products/habibi/hover.jpg",
      "/products/habibi/detail-1.jpg",
      "/products/habibi/detail-2.jpg",
    ],
    whatsappMessage:
      "السلام علیکم! میں Razzaq Luxe کا *Habibi (50ml EDP)* آرڈر کرنا چاہتا ہوں۔ قیمت: PKR 3,800۔ براہ کرم رابطہ کریں۔",
    instagramReel: "https://www.instagram.com/razzaqluxe/",
    tiktokVideo: "https://www.tiktok.com/@razzaqluxe",
    metaTitle: "Habibi – Rose & Jasmine EDP | Razzaq Luxe",
    metaDescription:
      "Habibi by Razzaq Luxe — a romantic floral fragrance with rose, jasmine & vanilla. 50ml EDP. Luxury perfume Pakistan. Order online.",
    metaKeywords: [
      "Habibi perfume",
      "rose jasmine fragrance Pakistan",
      "romantic perfume",
      "Razzaq Luxe",
      "حبیبی عطر",
    ],
    ogImage: "/images/sporty/Habibi_Flavour.png",
  },
  {
    id: "florine",
    slug: "florine",
    name: { en: "Florine", ur: "فلورین" },
    tagline: {
      en: "Bloom in Every Step",
      ur: "ہر قدم پر کھلیں",
    },
    description: {
      en: "Florine captures the innocence of a garden at dawn — green peony and fresh leaves open into a heart of white flowers and lily, softly landing on cedar and a whisper of musk. Light, airy, endlessly feminine.",
      ur: "فلورین صبح کے باغ کی معصومیت ہے — سبز پھولوں اور تازہ پتوں سے شروع ہو کر سفید پھولوں اور للی میں کھلتی ہے اور دیودار کی نرم خوشبو پر آرام کرتی ہے۔",
    },
    notes: {
      top: ["Peony", "Green Leaves", "Grapefruit"],
      heart: ["White Flowers", "Lily", "Freesia"],
      base: ["Soft Musk", "Cedar", "Light Musk"],
    },
    price: 3500,
    size: "50ml EDP",
    badge: "FOR HER",
    images: [
      "/images/sporty/Flourine_Flavour.png",
      "/products/florine/hover.jpg",
      "/products/florine/detail-1.jpg",
      "/products/florine/detail-2.jpg",
    ],
    whatsappMessage:
      "السلام علیکم! میں Razzaq Luxe کا *Florine (50ml EDP)* آرڈر کرنا چاہتی ہوں۔ قیمت: PKR 3,500۔ براہ کرم رابطہ کریں۔",
    instagramReel: "https://www.instagram.com/razzaqluxe/",
    tiktokVideo: "https://www.tiktok.com/@razzaqluxe",
    metaTitle: "Florine – Floral Fresh EDP for Women | Razzaq Luxe",
    metaDescription:
      "Florine by Razzaq Luxe — a light, feminine floral fragrance with peony, lily & soft musk. 50ml EDP. Luxury perfume Pakistan.",
    metaKeywords: [
      "Florine perfume",
      "floral perfume for women Pakistan",
      "feminine fragrance",
      "Razzaq Luxe",
      "فلورین عطر",
    ],
    ogImage: "/images/sporty/Flourine_Flavour.png",
  },
  {
    id: "sporty",
    slug: "sporty",
    name: { en: "Sporty", ur: "اسپورٹی" },
    tagline: {
      en: "Fresh. Bold. Unstoppable.",
      ur: "تازہ۔ جرأتمند۔ ناقابلِ روک",
    },
    description: {
      en: "Sporty is pure momentum — a sharp burst of citrus and mint that rushes into a cool marine and lavender heart, anchored by clean white musk and vetiver. For the man who never stops moving.",
      ur: "اسپورٹی خالص توانائی ہے — لیموں اور پودینے کی تازگی سمندری ٹھنڈک اور لیوینڈر میں بدلتی ہے اور سفید مشک و ویٹیور پر ٹھہرتی ہے۔",
    },
    notes: {
      top: ["Citrus", "Mint", "Lime"],
      heart: ["Marine", "Lavender", "Geranium"],
      base: ["White Musk", "Vetiver", "Oakmoss"],
    },
    price: 3200,
    size: "50ml EDP",
    badge: "FOR HIM",
    images: [
      "/images/sporty/Sporty_Flavour.png",
      "/images/sporty/hover.png",
      "/images/sporty/detail-1.png",
      "/images/sporty/detail-2.png",
    ],
    whatsappMessage:
      "السلام علیکم! میں Razzaq Luxe کا *Sporty (50ml EDP)* آرڈر کرنا چاہتا ہوں۔ قیمت: PKR 3,200۔ براہ کرم رابطہ کریں۔",
    instagramReel: "https://www.instagram.com/razzaqluxe/",
    tiktokVideo: "https://www.tiktok.com/@razzaqluxe",
    metaTitle: "Sporty – Fresh Aquatic EDP for Men | Razzaq Luxe",
    metaDescription:
      "Sporty by Razzaq Luxe — a fresh citrus, marine & musk fragrance for active men. 50ml EDP. Buy online in Pakistan. Cash on delivery.",
    metaKeywords: [
      "Sporty perfume",
      "fresh perfume for men Pakistan",
      "aquatic fragrance",
      "Razzaq Luxe",
      "اسپورٹی عطر",
    ],
    ogImage: "/images/sporty/Sporty_Flavour.png",
  },
];

export function getProductBySlug(slug: string): Product | undefined {
  return PRODUCTS.find((p) => p.slug === slug);
}

/** Related products — next items in catalogue order (deterministic). */
export function getRelatedProducts(slug: string, count = 2): Product[] {
  const start = PRODUCTS.findIndex((p) => p.slug === slug);
  if (start === -1) return PRODUCTS.filter((p) => p.slug !== slug).slice(0, count);
  const out: Product[] = [];
  for (let k = 1; k <= PRODUCTS.length && out.length < count; k += 1) {
    const p = PRODUCTS[(start + k) % PRODUCTS.length];
    if (p.slug !== slug) out.push(p);
  }
  return out;
}
