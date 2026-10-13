import { ArrowRight } from "lucide-react";
import Link from "next/link";
import Marquee from "@/components/Marquee";
import ProductCard from "@/components/ProductCard";
import Reveal from "@/components/Reveal";
import Categories from "@/components/home/Categories";
import Editorial from "@/components/home/Editorial";
import Featured from "@/components/home/Featured";
import Hero from "@/components/home/Hero";
import NewsletterSection from "@/components/home/NewsletterForm";
import Testimonials from "@/components/home/Testimonials";
import {
  getBestsellers,
  getCategoryCounts,
  getFeaturedProducts,
} from "@/lib/data";
import { Asterisk } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function Home() {
  const [featured, bestsellers, counts] = await Promise.all([
    getFeaturedProducts(6),
    getBestsellers(4),
    getCategoryCounts(),
  ]);

  return (
    <>
      <Hero />

      <Marquee
        items={[
          "Bags",
          "Lunchboxes",
          "Shoes",
          "Travel gear",
          "Free shipping over €150",
          "Lifetime repairs",
        ]}
        className="border-y border-ink bg-ink py-5 text-cream"
        itemClassName="font-display text-2xl font-medium uppercase tracking-tight lg:text-4xl"
        separator={<Asterisk className="size-6 text-clay lg:size-8" />}
      />

      <Categories counts={counts} />
      <Featured products={featured} />
      <Editorial />

      {/* Bestsellers */}
      <section className="mx-auto max-w-7xl px-5 py-24 lg:px-10 lg:py-32">
        <Reveal className="mb-12 flex flex-wrap items-end justify-between gap-6 lg:mb-16">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.24em] text-clay">
              Tried · Tested · Reordered
            </p>
            <h2 className="mt-3 font-display text-5xl font-medium leading-[1.02] lg:text-7xl">
              Most <span className="italic text-clay">carried</span>
            </h2>
          </div>
          <Link
            href="/shop?sort=rating"
            className="u-link text-xs font-bold uppercase tracking-[0.2em] text-ink/70"
          >
            Shop bestsellers
          </Link>
        </Reveal>
        <div className="grid grid-cols-2 gap-x-5 gap-y-10 lg:grid-cols-4">
          {bestsellers.map((p, i) => (
            <Reveal key={p.slug} delay={i * 80}>
              <ProductCard product={p} />
            </Reveal>
          ))}
        </div>
        <Reveal className="mt-14 text-center lg:hidden">
          <Link
            href="/shop"
            className="btn-sweep inline-flex items-center gap-3 rounded-full bg-ink px-8 py-4 text-xs font-bold uppercase tracking-[0.2em] text-cream"
          >
            Shop everything <ArrowRight className="size-4" />
          </Link>
        </Reveal>
      </section>

      <Testimonials />
      <NewsletterSection />
    </>
  );
}
