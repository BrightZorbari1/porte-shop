import { SearchX } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import ProductCard from "@/components/ProductCard";
import Reveal from "@/components/Reveal";
import Filters from "@/app/shop/Filters";
import { getProducts } from "@/lib/data";
import { CATEGORIES } from "@/lib/utils";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Shop all carry goods",
  description:
    "Bags, lunchboxes, shoes and travel gear — designed in Lisboa, guaranteed for life.",
};

export default async function ShopPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string; sort?: string; q?: string }>;
}) {
  const sp = await searchParams;
  const products = await getProducts({
    category: sp.category,
    sort: sp.sort,
    q: sp.q,
  });

  const activeCat = CATEGORIES.find((c) => c.slug === sp.category);

  return (
    <div className="pt-32 lg:pt-44">
      <header className="mx-auto max-w-7xl px-5 lg:px-10">
        <Reveal>
          <p className="text-[11px] font-bold uppercase tracking-[0.24em] text-clay">
            {sp.q ? `Search — “${sp.q}”` : activeCat ? "Collection" : "The full collection"}
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
              {products.length} {products.length === 1 ? "piece" : "pieces"}
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
        <Filters category={sp.category} sort={sp.sort ?? "featured"} q={sp.q} />
      </div>

      <main className="mx-auto max-w-7xl px-5 pb-28 pt-10 lg:px-10">
        {products.length === 0 ? (
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
            {products.map((p, i) => (
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
