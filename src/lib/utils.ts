export function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

/** Build a sized Pexels CDN url */
export function px(id: number, w = 1200) {
  return `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=${w}`;
}

export function formatPrice(value: number | string) {
  return new Intl.NumberFormat("en-IE", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0,
  }).format(Number(value));
}

export const FREE_SHIPPING_THRESHOLD = 150;

export const CATEGORIES = [
  {
    slug: "bags",
    label: "Bags",
    tagline: "Totes, slings & carry-alls",
    copy: "Totes, slings and carry-alls built for the daily circuit — canvas, leather and recycled ripstop.",
    image: "/images/cat-bags.jpg",
  },
  {
    slug: "lunch",
    label: "Lunchboxes",
    tagline: "Steel, bamboo & thermal",
    copy: "Steel, bamboo and thermal icons that turn a packed lunch into a small ceremony.",
    image: "/images/cat-lunch.jpg",
  },
  {
    slug: "shoes",
    label: "Shoes",
    tagline: "Cloud-foam comfort",
    copy: "Runners, slip-ons and boots with cloud-foam bones — from first coffee to the last train.",
    image: "/images/cat-shoes.jpg",
  },
  {
    slug: "travel",
    label: "Travel",
    tagline: "Built for the long way round",
    copy: "Weekenders, rollers and organisers sized for cabin sprints and month-long detours.",
    image: "/images/cat-travel.jpg",
  },
] as const;

export type CategorySlug = (typeof CATEGORIES)[number]["slug"];

export function categoryLabel(slug?: string | null) {
  return CATEGORIES.find((c) => c.slug === slug)?.label ?? "All";
}
