import "dotenv/config";
import { db } from "./index";
import { newsletterSubscribers, orders, products } from "./schema";

const px = (id: number, w = 1200) =>
  `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=${w}`;

const C = {
  sand: { name: "Sand", hex: "#d9c9a8" },
  moss: { name: "Moss", hex: "#7a7460" },
  noir: { name: "Noir", hex: "#2a241e" },
  cognac: { name: "Cognac", hex: "#9a5b36" },
  espresso: { name: "Espresso", hex: "#4a3626" },
  bone: { name: "Bone", hex: "#e5ded0" },
  clay: { name: "Clay", hex: "#c0562f" },
  sage: { name: "Sage", hex: "#8b907a" },
  fog: { name: "Fog", hex: "#c8c6c0" },
  blush: { name: "Blush", hex: "#d9a8a0" },
};

const SEED = [
  // ─── BAGS ────────────────────────────────────────────────
  {
    slug: "atlas-everyday-tote",
    name: "Atlas Everyday Tote",
    category: "bags",
    price: "148.00",
    compareAt: null,
    badge: "Icon",
    featured: true,
    bestseller: true,
    rating: "4.9",
    reviewCount: 1240,
    image: px(8148587),
    blurb:
      "The one-bag answer to groceries, laptops, library hauls and spontaneous flowers. 18L of honestly indestructible canvas.",
    description:
      "The Atlas is the tote that started the company — cut from 18oz recycled canvas with vegetable-tanned leather handles that soften to your grip in a fortnight. A padded 16\" laptop sleeve hides inside, the base is reinforced against market-day melons, and the whole thing is guaranteed for as long as you both shall live.",
    colors: [C.sand, C.moss, C.noir],
    specs: {
      materials: "18oz recycled canvas, vegetable-tanned leather handles",
      dimensions: "38 × 33 × 14 cm · 18 L",
      weight: "640 g",
    },
    stock: 42,
  },
  {
    slug: "miro-crossbody-sling",
    name: "Miro Crossbody Sling",
    category: "bags",
    price: "96.00",
    compareAt: "128.00",
    badge: null,
    featured: false,
    bestseller: false,
    rating: "4.7",
    reviewCount: 512,
    image: px(36492560),
    blurb:
      "Phone, keys, wallet, camera, one very good sandwich — worn across the chest, forgotten on the shoulder.",
    description:
      "The Miro rides high on the chest or low on the hip thanks to a one-pull strap system we stole from climbing gear. Full-grain leather outside, recycled twill inside, and a back pocket angled so your phone never falls out mid-sprint. Warning: extremely pickpocket-proof, extremely pickpocket-provoking.",
    colors: [C.cognac, C.espresso, C.noir],
    specs: {
      materials: "Full-grain leather, recycled twill lining, YKK zippers",
      dimensions: "26 × 17 × 8 cm · 3.5 L",
      weight: "480 g",
    },
    stock: 35,
  },
  {
    slug: "vista-commuter-backpack",
    name: "Vista Commuter Backpack",
    category: "bags",
    price: "178.00",
    compareAt: null,
    badge: "Bestseller",
    featured: false,
    bestseller: true,
    rating: "4.8",
    reviewCount: 986,
    image: px(3731256),
    blurb:
      "A 22L commuter that swallows a laptop, gym kit and rain shell — and still stands up politely on its own.",
    description:
      "The Vista is our most reordered bag, and we understand why. Rolltop or zipped, it carries 22 litres flat against your spine with an airflow back panel that keeps linen shirts linen-dry. There are nine pockets, one of which is deliberately secret. We will not tell you which.",
    colors: [C.noir, C.moss, C.fog],
    specs: {
      materials: "Recycled 900D ripstop, waterproof zips, aluminium hardware",
      dimensions: "46 × 30 × 16 cm · 22 L",
      weight: "980 g",
    },
    stock: 28,
  },
  {
    slug: "ora-leather-shoulder-bag",
    name: "Ora Leather Shoulder Bag",
    category: "bags",
    price: "265.00",
    compareAt: null,
    badge: null,
    featured: true,
    bestseller: false,
    rating: "5.0",
    reviewCount: 341,
    image: px(27292673),
    blurb:
      "Vegetable-tanned, hand-burnished, quietly perfect. The bag that makes strangers ask 'where is that from?'",
    description:
      "Ora is cut from a single hide of Tuscan vegetable-tanned leather and stitched at Atelier Nº7 with saddle-seam linen thread. It arrives stiff and perfect; it leaves you years later soft, sculpted and impossible to replace — which is fine, because you will never have to.",
    colors: [C.cognac, C.espresso],
    specs: {
      materials: "Tuscan vegetable-tanned leather, linen saddle stitching",
      dimensions: "30 × 24 × 10 cm",
      weight: "820 g",
    },
    stock: 14,
  },
  {
    slug: "bloom-mini-tote",
    name: "Bloom Mini Tote",
    category: "bags",
    price: "88.00",
    compareAt: null,
    badge: "New",
    featured: false,
    bestseller: false,
    rating: "4.6",
    reviewCount: 128,
    image: px(19197736),
    blurb:
      "The Atlas, shrink-rayed. Carries lunch, a paperback and exactly one impulse purchase.",
    description:
      "Bloom is the Atlas re-proportioned for lighter days: A4-adjacent, lunch-friendly, dangerously charming. Same recycled canvas, same lifetime promise, smaller carbon footprint — and a blush colourway somehow flattering to every outfit it meets.",
    colors: [C.blush, C.sand, C.moss],
    specs: {
      materials: "16oz recycled canvas, leather short handles",
      dimensions: "28 × 24 × 12 cm · 8 L",
      weight: "420 g",
    },
    stock: 50,
  },

  // ─── LUNCH ───────────────────────────────────────────────
  {
    slug: "bento-stack-lunchbox",
    name: "Bento Stack Lunchbox",
    category: "lunch",
    price: "54.00",
    compareAt: null,
    badge: null,
    featured: false,
    bestseller: true,
    rating: "4.8",
    reviewCount: 1102,
    image: px(12861383),
    blurb:
      "Two tiers, one band, zero leaks. The lunchbox that made packed lunch something to look forward to.",
    description:
      "Two stackable tiers in matte-finish steel with a silicone seal we tested by dropping it, full, from a moving bicycle. (It passed. The bicycle did not.) Microwave-safe base tier, cutlery band, and a footprint designed to slide upright into any of our bags.",
    colors: [C.sage, C.clay, C.bone],
    specs: {
      materials: "Matte stainless steel, food-grade silicone seals",
      dimensions: "19 × 11 × 11 cm · 1.1 L",
      weight: "480 g",
    },
    stock: 64,
  },
  {
    slug: "kilo-stainless-lunch-set",
    name: "Kilo Stainless Lunch Set",
    category: "lunch",
    price: "78.00",
    compareAt: null,
    badge: "Atelier pick",
    featured: true,
    bestseller: false,
    rating: "4.9",
    reviewCount: 433,
    image: "/images/cat-lunch.jpg",
    blurb:
      "The full setup: two-tier bento, thermal flask and cutlery roll, bundled like a proper gift to your future self.",
    description:
      "Kilo is the complete noon-time kit: our two-tier steel bento, a 350 ml thermal flask that keeps soup accusingly hot until 2 p.m., and a waxed-canvas cutlery roll with bamboo tools. Buy the set and we throw in the repairs-for-life promise on all three, plus a smug sense of superiority at office lunch o'clock.",
    colors: [C.bone, C.sage],
    specs: {
      materials: "Stainless steel, waxed canvas, bamboo",
      dimensions: "Bento 19 × 11 × 11 cm · Flask 350 ml",
      weight: "920 g (set)",
    },
    stock: 22,
  },
  {
    slug: "terra-insulated-lunch-tote",
    name: "Terra Insulated Lunch Tote",
    category: "lunch",
    price: "62.00",
    compareAt: null,
    badge: null,
    featured: false,
    bestseller: false,
    rating: "4.7",
    reviewCount: 287,
    image: px(27850567),
    blurb:
      "A soft thermal carry in heathered grey that keeps things cold for 8 hours and looks like it doesn't try.",
    description:
      "Terra wraps an 8-hour thermal core in recycled heather felt, with a flat base sized exactly for our bento stack and a shoulder strap for hands-free coffee balancing. The rolltop spills nothing, forgives everything, wipes clean.",
    colors: [C.fog, C.moss],
    specs: {
      materials: "Recycled heather felt, PEVA-free thermal lining",
      dimensions: "25 × 30 × 15 cm · 9 L",
      weight: "390 g",
    },
    stock: 40,
  },
  {
    slug: "oku-bento-box",
    name: "Oku Bento Box",
    category: "lunch",
    price: "44.00",
    compareAt: "56.00",
    badge: "New",
    featured: false,
    bestseller: false,
    rating: "4.6",
    reviewCount: 96,
    image: px(12726231),
    blurb:
      "A single-tier show pony with four compartments — for lunches that deserve plating.",
    description:
      "Oku takes its cues from Tokyo station masters' ekiben: one wide tier, four compartments, a bamboo lid that doubles as a board for slicing the emergency apple. For arrangement-inclined eaters and desk-lunch romantics.",
    colors: [C.bone, C.clay],
    specs: {
      materials: "Stainless compartments, bamboo lid",
      dimensions: "24 × 18 × 6 cm · 0.9 L",
      weight: "520 g",
    },
    stock: 45,
  },

  // ─── SHOES ───────────────────────────────────────────────
  {
    slug: "stratus-knit-runner",
    name: "Stratus Knit Runner",
    category: "shoes",
    price: "168.00",
    compareAt: null,
    badge: null,
    featured: true,
    bestseller: false,
    rating: "4.8",
    reviewCount: 764,
    image: px(26852035),
    blurb:
      "A knit runner with cloud-foam bones — 16 days in Tokyo approved, zero blisters reported.",
    description:
      "The Stratus wraps your foot in a one-piece recycled knit upper over our proprietary CloudForm midsole — 58% bio-based foam that returns energy like it's showing off. Machine washable, resoleable, and quiet enough for museum floors at jog pace.",
    colors: [C.fog, C.noir, C.sand],
    specs: {
      materials: "Recycled knit upper, CloudForm bio-foam midsole, natural rubber outsole",
      dimensions: "True to size · EU 36–46",
      weight: "289 g (EU 42)",
    },
    stock: 58,
  },
  {
    slug: "cloudform-slip-on",
    name: "Cloudform Slip-On",
    category: "shoes",
    price: "128.00",
    compareAt: "158.00",
    badge: null,
    featured: false,
    bestseller: false,
    rating: "4.7",
    reviewCount: 402,
    image: px(7193625),
    blurb:
      "Laceless, bone-white, airport-security friendly. Five seconds from door to street.",
    description:
      "Cloudform is our five-second shoe: elasticated panels, the same bio-foam midsole as the Stratus, and an off-white full-grain upper that somehow resists coffee, metro grime and judgement. The shoe you keep by the door and reach for 340 days a year.",
    colors: [C.bone, C.sand, C.noir],
    specs: {
      materials: "Full-grain leather, elasticated side panel, bio-foam midsole",
      dimensions: "True to size · EU 36–46",
      weight: "310 g (EU 42)",
    },
    stock: 36,
  },
  {
    slug: "dune-chelsea-boot",
    name: "Dune Leather Chelsea Boot",
    category: "shoes",
    price: "224.00",
    compareAt: null,
    badge: "Bestseller",
    featured: false,
    bestseller: true,
    rating: "4.9",
    reviewCount: 690,
    image: px(6316211),
    blurb:
      "Goodyear-welted, workshop-cognac, rain-agnostic. Boots that will see more winters than most relationships.",
    description:
      "Dune is Goodyear-welted in the traditional way — a labour-intensive stitch that lets us resole them forever — from waxy cognac leather that scuffs beautifully and brushes back. They arrive structured; a month later they've moulded to you like memory foam with manners.",
    colors: [C.cognac, C.espresso],
    specs: {
      materials: "Waxy full-grain leather, Goodyear welt, leather-rubber stud sole",
      dimensions: "True to size · EU 36–47",
      weight: "720 g (EU 42)",
    },
    stock: 26,
  },
  {
    slug: "ridge-trail-hiker",
    name: "Ridge Trail Hiker",
    category: "shoes",
    price: "196.00",
    compareAt: null,
    badge: null,
    featured: false,
    bestseller: false,
    rating: "4.8",
    reviewCount: 355,
    image: px(30229956),
    blurb:
      "Mountain manners with city manners. Waterproof to the ankle, gripped for wet granite.",
    description:
      "Ridge pairs a waterproof membrane with a Vibram compound outsole and a recycled-leather upper that doesn't scream 'expedition' at the office. Broken-in straight out of the box — we pre-flex every pair on a mechanical foot mockingly named Gerald.",
    colors: [C.espresso, C.moss],
    specs: {
      materials: "Recycled leather, waterproof membrane, Vibram outsole",
      dimensions: "True to size · EU 36–47",
      weight: "540 g (EU 42)",
    },
    stock: 33,
  },
  {
    slug: "vela-court-sneaker",
    name: "Vela Court Sneaker",
    category: "shoes",
    price: "142.00",
    compareAt: null,
    badge: "New",
    featured: false,
    bestseller: false,
    rating: "4.6",
    reviewCount: 84,
    image: px(20191567),
    blurb:
      "A beige court classic with atelier-grade stitching — the quiet flex of the sneaker world.",
    description:
      "Vela is our love letter to the 70s court shoe: cream leather, gum rubber, zero logos shouting. Margom-style soles set by hand, lining of undyed calfskin, and a toe shape that took eleven lasts to get boring in exactly the right way.",
    colors: [C.bone, C.fog],
    specs: {
      materials: "Cream full-grain leather, gum rubber cupsole, calfskin lining",
      dimensions: "True to size · EU 36–46",
      weight: "340 g (EU 42)",
    },
    stock: 47,
  },

  // ─── TRAVEL ──────────────────────────────────────────────
  {
    slug: "nomad-weekender-duffel",
    name: "Nomad Weekender Duffel",
    category: "travel",
    price: "218.00",
    compareAt: null,
    badge: null,
    featured: true,
    bestseller: false,
    rating: "4.9",
    reviewCount: 578,
    image: "/images/cat-travel.jpg",
    blurb:
      "45L of vegetable-tanned leather weekend escape — cabin-sized, shoulder-friendly, jealousy-inducing.",
    description:
      "Nomad is sized to the millimetre for overhead bins and styled for the hotel lobby. Full-grain leather with a cotton webbing shoulder strap, a separate ventilated shoe garage underneath, and brass hardware that will out-patina us all. Fits 3 days of a well-planned life, or 2 days of an optimistic one.",
    colors: [C.cognac, C.espresso, C.noir],
    specs: {
      materials: "Full-grain leather, brass hardware, cotton webbing strap",
      dimensions: "55 × 28 × 28 cm · 45 L · cabin approved",
      weight: "1.9 kg",
    },
    stock: 19,
  },
  {
    slug: "aria-carry-on-roller",
    name: "Aria Carry-On Roller",
    category: "travel",
    price: "348.00",
    compareAt: null,
    badge: "Icon",
    featured: true,
    bestseller: false,
    rating: "4.9",
    reviewCount: 823,
    image: px(7368312),
    blurb:
      "A whisper-quiet hard-shell in bone white that glides like it's empty, even when it absolutely isn't.",
    description:
      "Aria's shell is German polycarbonate wrapped in a recycled-aluminium frame — no zip to fail at 30,000 feet. Hinomoto wheels run on sealed bearings (audibly smug), the handle is aircraft-grade, and inside there are two compression boards that turn chaotic packers into suspicious optimists. TSA lock included; drama not.",
    colors: [C.bone, C.sage, C.noir],
    specs: {
      materials: "Polycarbonate shell, aluminium frame, Hinomoto wheels",
      dimensions: "55 × 40 × 23 cm · 38 L · cabin approved",
      weight: "3.1 kg",
    },
    stock: 16,
  },
  {
    slug: "meridian-packing-trio",
    name: "Meridian Packing Cube Trio",
    category: "travel",
    price: "44.00",
    compareAt: null,
    badge: "New",
    featured: false,
    bestseller: false,
    rating: "4.7",
    reviewCount: 231,
    image: px(18999368),
    blurb:
      "Three ripstop cubes that compress a week of clothes into a suspiciously neat grid.",
    description:
      "Meridian cubes divide your weekender into wardrobe, laundry and 'I'll explain at customs'. Double zips compress bulk by 30%, mesh tops identify contents at a glance, and the set nests inside itself when off duty. Sized to tessellate perfectly in the Aria and Nomad — obviously.",
    colors: [C.sage, C.clay, C.noir],
    specs: {
      materials: "Recycled ripstop nylon, mesh panels, YKK zips",
      dimensions: "S 30 × 20 · M 36 × 26 · L 42 × 32 cm",
      weight: "240 g (set)",
    },
    stock: 80,
  },
  {
    slug: "drift-packable-daypack",
    name: "Drift Packable Daypack",
    category: "travel",
    price: "78.00",
    compareAt: null,
    badge: null,
    featured: false,
    bestseller: true,
    rating: "4.8",
    reviewCount: 467,
    image: px(18510449),
    blurb:
      "Folds into its own pocket to the size of a sandwich; unfolds into a 16L olive-green summit buddy.",
    description:
      "Drift lives in your luggage taking up almost nothing until the day needs a bag — then it deploys into a full 16L daypack with padded straps, a water-bottle sleeve and weatherproof zips. Weighs less than your phone's charging brick. Have we mentioned it fits in its own pocket? We find it charming.",
    colors: [C.moss, C.noir, C.sand],
    specs: {
      materials: "Recycled 70D ripstop, weatherproof zips",
      dimensions: "41 × 26 × 14 cm · 16 L · packs to 20 × 12 cm",
      weight: "210 g",
    },
    stock: 52,
  },
];

async function seed() {
  console.log("Seeding Porté catalog…");
  await db.delete(orders);
  await db.delete(newsletterSubscribers);
  await db.delete(products);
  await db.insert(products).values(SEED);
  console.log(`Inserted ${SEED.length} products.`);
  process.exit(0);
}

seed().catch((err) => {
  console.error(err);
  process.exit(1);
});
