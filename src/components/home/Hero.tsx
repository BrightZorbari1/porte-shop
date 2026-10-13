"use client";

import { ArrowRight, ArrowUpRight, Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const imgRef = useRef<HTMLDivElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);

  function onMouseMove(e: React.MouseEvent) {
    const rect = sectionRef.current?.getBoundingClientRect();
    if (!rect) return;
    const nx = (e.clientX - rect.left) / rect.width - 0.5;
    const ny = (e.clientY - rect.top) / rect.height - 0.5;
    if (imgRef.current)
      imgRef.current.style.transform = `translate3d(${nx * 16}px, ${ny * 12}px, 0)`;
    if (badgeRef.current)
      badgeRef.current.style.transform = `translate3d(${nx * -22}px, ${ny * -16}px, 0)`;
  }

  return (
    <section
      ref={sectionRef}
      onMouseMove={onMouseMove}
      className="relative overflow-hidden pt-32 lg:pt-40"
    >
      {/* soft radial wash */}
      <div className="pointer-events-none absolute -top-40 right-[-10%] size-[38rem] rounded-full bg-clay/10 blur-3xl" />
      <div className="pointer-events-none absolute bottom-0 left-[-15%] size-[30rem] rounded-full bg-moss/10 blur-3xl" />

      <div className="mx-auto grid max-w-7xl items-end gap-14 px-5 pb-10 lg:grid-cols-12 lg:px-10">
        <div className="relative z-10 pb-4 lg:col-span-7 lg:pb-12">
          <div className="rise mb-8 flex items-center gap-3 [animation-delay:0.05s]">
            <span className="size-2 rounded-full bg-clay" />
            <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-ink/60">
              Est. 2019 — Lisboa, Portugal
            </p>
          </div>

          <h1 className="font-display text-[clamp(3.2rem,8.8vw,8.6rem)] font-medium leading-[0.93] tracking-[-0.02em]">
            <span className="block overflow-hidden">
              <span className="rise block [animation-delay:0.1s]">
                EVERY BAG,
              </span>
            </span>
            <span className="block overflow-hidden">
              <span className="rise block italic text-clay [animation-delay:0.2s]">
                every meal,
              </span>
            </span>
            <span className="block overflow-hidden">
              <span className="rise block [animation-delay:0.3s]">
                EVERY MILE.
              </span>
            </span>
          </h1>

          <p className="rise mt-8 max-w-[42ch] text-base leading-relaxed text-ink/60 [animation-delay:0.45s]">
            Porté designs bags, lunchboxes, shoes and travel gear that turn
            everyday hauls into small ceremonies — made slowly in Portugal,
            carried quickly everywhere else.
          </p>

          <div className="rise mt-10 flex flex-wrap items-center gap-6 [animation-delay:0.6s]">
            <Link
              href="/shop"
              className="btn-sweep group flex items-center gap-3 rounded-full bg-ink px-8 py-4 text-xs font-bold uppercase tracking-[0.2em] text-cream"
            >
              Shop the collection
              <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
            <Link
              href="/about"
              className="u-link text-xs font-bold uppercase tracking-[0.2em] text-ink/70"
            >
              Our story
            </Link>
          </div>
        </div>

        <div className="rise relative lg:col-span-5 [animation-delay:0.35s]">
          <div
            ref={imgRef}
            className="relative mx-auto aspect-[3/4] w-full max-w-md overflow-hidden rounded-t-[999px] rounded-b-[2.5rem] bg-parchment transition-transform duration-300 ease-out"
          >
            <Image
              src="/images/hero.jpg"
              alt="A sculptural still life of Porté bags, sneakers, a lunchbox and a suitcase"
              fill
              priority
              sizes="(max-width: 1024px) 90vw, 38vw"
              className="object-cover"
            />
          </div>

          {/* rotating badge */}
          <div
            ref={badgeRef}
            className="absolute -bottom-6 left-2 transition-transform duration-500 ease-out sm:left-0 lg:-left-10"
          >
            <div className="relative flex size-28 items-center justify-center sm:size-36">
              <svg viewBox="0 0 100 100" className="absolute inset-0 animate-spin-slow">
                <defs>
                  <path
                    id="badge-circle"
                    d="M 50,50 m -38,0 a 38,38 0 1,1 76,0 a 38,38 0 1,1 -76,0"
                  />
                </defs>
                <text className="fill-ink text-[8.6px] font-semibold uppercase tracking-[0.16em]">
                  <textPath href="#badge-circle">
                    Free shipping · Lifetime repairs · 30-day trial ·
                  </textPath>
                </text>
              </svg>
              <span className="flex size-14 items-center justify-center rounded-full bg-clay font-display text-2xl italic text-cream">
                P.
              </span>
            </div>
          </div>

          {/* floating rating chip */}
          <div className="absolute -top-4 right-2 animate-float rounded-2xl border border-ink/10 bg-bone/90 px-4 py-3 shadow-lg backdrop-blur sm:right-6 lg:-right-2">
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="size-3.5 fill-clay text-clay" />
              ))}
            </div>
            <p className="mt-1.5 text-[11px] font-semibold text-ink/70">
              4.9 — 12,400+ carriers
            </p>
          </div>

          {/* product mini card */}
          <Link
            href="/product/atlas-everyday-tote"
            className="group absolute bottom-16 -right-1 flex items-center gap-3 rounded-2xl border border-ink/10 bg-bone/95 py-3 pl-3 pr-4 shadow-lg backdrop-blur transition-transform duration-300 hover:-translate-y-1 sm:right-4 lg:-right-6"
          >
            <span className="relative size-11 overflow-hidden rounded-xl bg-sand">
              <Image
                src="https://images.pexels.com/photos/8148587/pexels-photo-8148587.jpeg?auto=compress&cs=tinysrgb&w=200"
                alt="Atlas Everyday Tote"
                fill
                className="object-cover"
              />
            </span>
            <span>
              <span className="block font-display text-sm font-semibold">
                The Atlas Tote
              </span>
              <span className="block text-[11px] text-ink/50">
                €148 — the icon
              </span>
            </span>
            <ArrowUpRight className="size-4 text-clay transition-transform duration-300 group-hover:rotate-45" />
          </Link>
        </div>
      </div>
    </section>
  );
}
