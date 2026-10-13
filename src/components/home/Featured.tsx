"use client";

import { ArrowUpRight, Plus } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { useCart } from "@/components/CartProvider";
import { categoryLabel, formatPrice } from "@/lib/utils";

type FProduct = {
  slug: string;
  name: string;
  category: string;
  price: string;
  compareAt: string | null;
  image: string;
  badge: string | null;
};

export default function Featured({ products }: { products: FProduct[] }) {
  const { addItem } = useCart();
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let ticking = false;
    const update = () => {
      ticking = false;
      const section = sectionRef.current;
      const track = trackRef.current;
      if (!section || !track) return;
      const rect = section.getBoundingClientRect();
      const total = section.offsetHeight - window.innerHeight;
      const p = Math.min(Math.max(-rect.top / total, 0), 1);
      setProgress(p);
      const dist = Math.max(track.scrollWidth - window.innerWidth + 80, 0);
      track.style.transform = `translate3d(${-p * dist}px,0,0)`;
      if (barRef.current) barRef.current.style.width = `${p * 100}%`;
    };
    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  const idx = Math.min(products.length - 1, Math.floor(progress * products.length + 0.0001));

  return (
    <div ref={sectionRef} className="relative h-[340svh] bg-ink text-cream">
      <div className="sticky top-0 flex h-svh flex-col justify-center overflow-hidden">
        <div className="flex items-end justify-between px-5 pb-8 lg:px-10 lg:pb-12">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.24em] text-clay">
              02 · The icons
            </p>
            <h2 className="mt-2 font-display text-4xl font-medium leading-none lg:text-6xl">
              Carried everywhere<span className="text-clay">.</span>
            </h2>
          </div>
          <p className="hidden font-display text-2xl italic text-cream/50 sm:block">
            {String(idx + 1).padStart(2, "0")}
            <span className="mx-1 not-italic text-cream/25">/</span>
            {String(products.length).padStart(2, "0")}
          </p>
        </div>

        <div
          ref={trackRef}
          className="flex w-max items-stretch gap-6 pl-5 pr-[10vw] will-change-transform lg:gap-8 lg:pl-10"
        >
          <div className="flex w-[85vw] max-w-[26rem] shrink-0 flex-col justify-center">
            <p className="font-display text-3xl font-medium italic leading-snug text-cream/85 lg:text-4xl">
              “Six pieces the world keeps reaching for — restocked and
              re-loved, season after season.”
            </p>
            <Link
              href="/shop"
              className="group mt-8 inline-flex w-fit items-center gap-2 rounded-full border border-cream/30 px-6 py-3 text-[11px] font-bold uppercase tracking-[0.2em] transition hover:border-clay hover:bg-clay"
            >
              Shop everything
              <ArrowUpRight className="size-4 transition-transform group-hover:rotate-45" />
            </Link>
          </div>

          {products.map((p, i) => (
            <article key={p.slug} className="group w-[78vw] max-w-[22rem] shrink-0 lg:w-[24rem]">
              <div className="zoom-frame relative aspect-[4/5] rounded-3xl bg-soot">
                <Image
                  src={p.image}
                  alt={p.name}
                  fill
                  sizes="(max-width: 640px) 78vw, 24rem"
                  className="rounded-3xl object-cover"
                />
                <Link
                  href={`/product/${p.slug}`}
                  aria-label={p.name}
                  className="absolute inset-0 z-[5] rounded-3xl"
                />
                {p.badge && (
                  <span className="absolute left-4 top-4 z-10 rounded-full bg-cream px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.14em] text-ink">
                    {p.badge}
                  </span>
                )}
                <span className="absolute right-4 top-4 z-10 font-display text-sm italic text-cream/80">
                  Nº{i + 1}
                </span>
              </div>
              <div className="mt-5 flex items-start justify-between gap-4 px-1">
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-cream/45">
                    {categoryLabel(p.category)}
                  </p>
                  <Link href={`/product/${p.slug}`}>
                    <h3 className="mt-1 font-display text-2xl font-semibold leading-tight transition-colors hover:text-clay">
                      {p.name}
                    </h3>
                  </Link>
                  <p className="mt-1 font-display text-lg text-cream/70">
                    {formatPrice(p.price)}
                    {p.compareAt && (
                      <span className="ml-2 text-sm text-cream/35 line-through">
                        {formatPrice(p.compareAt)}
                      </span>
                    )}
                  </p>
                </div>
                <button
                  onClick={() =>
                    addItem({
                      slug: p.slug,
                      name: p.name,
                      price: Number(p.price),
                      image: p.image,
                    })
                  }
                  aria-label={`Add ${p.name} to cart`}
                  className="mt-1 flex size-12 shrink-0 items-center justify-center rounded-full bg-cream text-ink transition-all duration-300 hover:rotate-90 hover:bg-clay hover:text-cream"
                >
                  <Plus className="size-5" />
                </button>
              </div>
            </article>
          ))}
        </div>

        <div className="mx-5 mt-10 h-px bg-cream/15 lg:mx-10">
          <div
            ref={barRef}
            className="h-full bg-clay transition-[width] duration-150 ease-out"
            style={{ width: "0%" }}
          />
        </div>
      </div>
    </div>
  );
}
