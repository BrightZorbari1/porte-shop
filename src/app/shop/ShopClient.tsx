"use client";

import { Search, SearchX } from "lucide-react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useEffect, useMemo, useState } from "react";
import ProductCard from "@/components/ProductCard";
import Reveal from "@/components/Reveal";
import type { Product } from "@/lib/data";
import { CATEGORIES, cn } from "@/lib/utils";

const SORTS: [string, string][] = [
  ["featured", "Featured"],
  ["price-asc", "Price · low to high"],
  ["price-desc", "Price · high to low"],
  ["newest", "Newest"],
  ["rating", "Top rated"],
];

function buildHref(
  base: { category?: string; sort: string; q?: string },
  overrides: Partial<{ category?: string; sort: string; q?: string }> & {
    clearCategory?: boolean;
    clearQ?: boolean;
  },
) {
  const next = { ...base };
  if ("sort" in overrides && overrides.sort) next.sort = overrides.sort;
  if (overrides.clearCategory) next.category = undefined;
  else if ("category" in overrides) next.category = overrides.category;
  if (overrides.clearQ) next.q = undefined;
  else if ("q" in overrides) next.q = overrides.q;

  const params = new URLSearchParams();
  if (next.category) params.set("category", next.category);
  if (next.sort && next.sort !== "featured") params.set("sort", next.sort);
  if (next.q) params.set("q", next.q);
  const qs = params.toString();
  return `/shop${qs ? `?${qs}` : ""}`;
}

function sortProducts(list: Product[], sort: string): Product[] {
  const copy = [...list];
  const time = (p: Product) => new Date(p.createdAt).getTime();
  switch (sort) {
    case "price-asc":
      return copy.sort((a, b) => Number(a.price) - Number(b.price));
    case "price-desc":
      return copy.sort((a, b) => Number(b.price) - Number(a.price));
    case "newest":
      return copy.sort((a, b) => time(b) - time(a));
    case "rating":
      return copy.sort((a, b) => Number(b.rating) - Number(a.rating));
    default: // featured
      return copy.sort(
        (a, b) =>
          Number(b.featured) - Number(a.featured) ||
          Number(b.bestseller) - Number(a.bestseller) ||
          time(b) - time(a),
      );
  }
}

function ShopInner({ products }: { products: Product[] }) {
  const searchParams = useSearchParams();
  const router = useRouter();

  const category = searchParams.get("category") ?? undefined;
  const sort = searchParams.get("sort") ?? "featured";
  const q = searchParams.get("q") ?? undefined;

  const [term, setTerm] = useState(q ?? "");
  useEffect(() => setTerm(q ?? ""), [q]);

  const filtered = useMemo(() => {
    let list = products;
    if (category) list = list.filter((p) => p.category === category);
    if (q) {
      const needle = q.toLowerCase();
      list = list.filter((p) =>
        `${p.name} ${p.blurb} ${p.category}`.toLowerCase().includes(needle),
      );
    }
    return sortProducts(list, sort);
  }, [products, category, q, sort]);

  const activeCat = CATEGORIES.find((c) => c.slug === category);
  const base = { category, sort, q };

  return (
    <div className="pt-32 lg:pt-44">
      <header className="mx-auto max-w-7xl px-5 lg:px-10">
        <Reveal>
          <p className="text-[11px] font-bold uppercase tracking-[0.24em] text-clay">
            {q ? `Search — “${q}”` : activeCat ? "Collection" : "The full collection"}
          </p>
          <div className="mt-3 flex flex-wrap items-end justify-between gap-6">
            <h1 className="font-display text-5xl font-medium leading-[0.98] lg:text-8xl">
              {activeCat ? (
                activeCat.label
              ) : (
                <>
                  Everything,
                  <br />
                  <span className="italic text-clay">beautifully carried</span>
                </>
              )}
            </h1>
            <p className="mb-2 font-display text-2xl italic text-ink/40">
              {filtered.length} {filtered.length === 1 ? "piece" : "pieces"}
            </p>
          </div>
          {activeCat && (
            <p className="mt-5 max-w-[52ch] text-base leading-relaxed text-ink/60">
              {activeCat.copy}
            </p>
          )}
        </Reveal>
      </header>

      <div className="mx-auto max-w-7xl px-5 lg:px-10">
        <div className="mt-12 flex flex-wrap items-center justify-between gap-4 border-y border-ink/10 py-4">
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => router.replace(buildHref(base, { clearCategory: true }))}
              className={cn(
                "rounded-full border px-4 py-2 text-[11px] font-bold uppercase tracking-[0.14em] transition",
                !category
                  ? "border-ink bg-ink text-cream"
                  : "border-ink/15 text-ink/60 hover:border-ink",
              )}
            >
              All
            </button>
            {CATEGORIES.map((c) => (
              <button
                key={c.slug}
                onClick={() =>
                  router.replace(buildHref(base, { category: c.slug }))
                }
                className={cn(
                  "rounded-full border px-4 py-2 text-[11px] font-bold uppercase tracking-[0.14em] transition",
                  category === c.slug
                    ? "border-ink bg-ink text-cream"
                    : "border-ink/15 text-ink/60 hover:border-ink",
                )}
              >
                {c.label}
              </button>
            ))}
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <form
              className="relative"
              onSubmit={(e) => {
                e.preventDefault();
                const value = term.trim();
                router.replace(
                  buildHref(base, value ? { q: value } : { clearQ: true }),
                );
              }}
            >
              <Search className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-ink/40" />
              <input
                value={term}
                onChange={(e) => setTerm(e.target.value)}
                placeholder="Search the shelves…"
                className="w-52 rounded-full border border-ink/15 bg-bone py-2.5 pl-10 pr-4 text-sm transition focus:w-64 focus:border-clay"
              />
            </form>
            <select
              value={sort}
              onChange={(e) =>
                router.replace(buildHref(base, { sort: e.target.value }))
              }
              aria-label="Sort products"
              className="cursor-pointer appearance-none rounded-full border border-ink/15 bg-bone py-2.5 pl-5 pr-10 text-[11px] font-bold uppercase tracking-[0.12em] transition hover:border-ink"
              style={{
                backgroundImage:
                  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%231b1712' stroke-width='2.4'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E\")",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "right 1rem center",
              }}
            >
              {SORTS.map(([value, label]) => (
                <option key={value} value={value}>
                  {label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <main className="mx-auto max-w-7xl px-5 pb-28 pt-10 lg:px-10">
        {filtered.length === 0 ? (
          <div className="flex flex-col items-center py-24 text-center">
            <span className="flex size-20 items-center justify-center rounded-full bg-parchment">
              <SearchX className="size-8 text-clay" />
            </span>
            <p className="mt-8 font-display text-4xl font-medium italic text-ink/50">
              Nothing on that shelf.
            </p>
            <p className="mt-3 max-w-[40ch] text-sm text-ink/55">
              Try another word, or browse the full collection — we promise
              it&apos;s good.
            </p>
            <Link
              href="/shop"
              className="btn-sweep mt-8 rounded-full bg-ink px-8 py-3.5 text-xs font-bold uppercase tracking-[0.2em] text-cream"
            >
              View everything
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-x-5 gap-y-12 lg:grid-cols-3 xl:grid-cols-4">
            {filtered.map((p, i) => (
              <Reveal key={p.slug} delay={(i % 4) * 70}>
                <ProductCard product={p} />
              </Reveal>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}

export default function ShopClient({ products }: { products: Product[] }) {
  return (
    <Suspense
      fallback={<div className="min-h-svh pt-44 text-center font-display text-2xl italic text-ink/40">Loading the shelves…</div>}
    >
      <ShopInner products={products} />
    </Suspense>
  );
}
