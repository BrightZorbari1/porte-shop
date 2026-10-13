"use client";

import { Search } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { CATEGORIES, cn } from "@/lib/utils";

const SORTS: [string, string][] = [
  ["featured", "Featured"],
  ["price-asc", "Price · low to high"],
  ["price-desc", "Price · high to low"],
  ["newest", "Newest"],
  ["rating", "Top rated"],
];

function buildHref(category: string | undefined, sort: string, q?: string) {
  const params = new URLSearchParams();
  if (category) params.set("category", category);
  if (sort && sort !== "featured") params.set("sort", sort);
  if (q) params.set("q", q);
  const qs = params.toString();
  return `/shop${qs ? `?${qs}` : ""}`;
}

export default function Filters({
  category,
  sort,
  q,
}: {
  category?: string;
  sort: string;
  q?: string;
}) {
  const router = useRouter();

  return (
    <div className="mt-12 flex flex-wrap items-center justify-between gap-4 border-y border-ink/10 py-4">
      <div className="flex flex-wrap items-center gap-2">
        <Link
          href={buildHref(undefined, sort, q)}
          className={cn(
            "rounded-full border px-4 py-2 text-[11px] font-bold uppercase tracking-[0.14em] transition",
            !category
              ? "border-ink bg-ink text-cream"
              : "border-ink/15 text-ink/60 hover:border-ink",
          )}
        >
          All
        </Link>
        {CATEGORIES.map((c) => (
          <Link
            key={c.slug}
            href={buildHref(c.slug, sort, q)}
            className={cn(
              "rounded-full border px-4 py-2 text-[11px] font-bold uppercase tracking-[0.14em] transition",
              category === c.slug
                ? "border-ink bg-ink text-cream"
                : "border-ink/15 text-ink/60 hover:border-ink",
            )}
          >
            {c.label}
          </Link>
        ))}
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <form action="/shop" className="relative">
          {category && <input type="hidden" name="category" value={category} />}
          <Search className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-ink/40" />
          <input
            name="q"
            defaultValue={q}
            placeholder="Search the shelves…"
            className="w-52 rounded-full border border-ink/15 bg-bone py-2.5 pl-10 pr-4 text-sm transition focus:w-64 focus:border-clay"
          />
        </form>
        <select
          value={sort}
          onChange={(e) => {
            router.push(buildHref(category, e.target.value, q));
          }}
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
  );
}
