import { Hammer, HeartHandshake, Recycle } from "lucide-react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Reveal from "@/components/Reveal";

export const metadata: Metadata = {
  title: "Our story",
  description:
    "Porté is a Lisbon-born carry goods atelier making bags, lunchboxes, shoes and travel gear — slowly, and for life.",
};

const VALUES = [
  {
    icon: Hammer,
    title: "Craft over churn",
    copy: "Seventeen prototypes per piece. A dissertation-level debate per zipper. We release four collections a decade's worth of thought, not four a year.",
  },
  {
    icon: Recycle,
    title: "Circular by default",
    copy: "98% recycled canvas, vegetable-tanned offcut leather, and a repair bench that keeps every Porté in circulation — and out of landfill — for life.",
  },
  {
    icon: HeartHandshake,
    title: "Carriers, not customers",
    copy: "A 40,000-strong club that votes on colours, road-tests prototypes on actual commutes, and writes us postcards we genuinely frame.",
  },
];

const TIMELINE = [
  ["2019", "One sewing machine, a garage in Lisboa, and a tote that outlived its maker's patience for bad bags."],
  ["2021", "The first Bento Stack ships — lunch stops being an afterthought and becomes an event."],
  ["2023", "The repair for life promise launches. 40,000 carriers across 38 countries."],
  ["2026", "Atelier Nº7 opens in Porto. Seventeen people, four crafts, one obsession."],
];

export default function AboutPage() {
  return (
    <div className="pt-32 lg:pt-44">
      <header className="mx-auto max-w-5xl px-5 text-center lg:px-10">
        <Reveal>
          <p className="text-[11px] font-bold uppercase tracking-[0.24em] text-clay">
            Our story — Est. 2019
          </p>
          <h1 className="mt-5 font-display text-5xl font-medium leading-[1.0] tracking-[-0.02em] lg:text-8xl">
            We make things for
            <br />
            <span className="italic text-clay">the way you move.</span>
          </h1>
          <p className="mx-auto mt-8 max-w-[54ch] text-base leading-relaxed text-ink/60">
            Porté began with a simple irritation: everything we carried —
            bags, lunch gear, shoes, suitcases — was either beautiful and
            fragile, or tough and joyless. We thought the aisle between
            &ldquo;fashion&rdquo; and &ldquo;function&rdquo; was a failure of
            imagination. So we built an atelier in the middle of it.
          </p>
        </Reveal>
      </header>

      <Reveal className="mx-auto mt-16 max-w-7xl px-5 lg:px-10" delay={100}>
        <div className="zoom-frame relative aspect-[16/9] rounded-[2.5rem] bg-parchment lg:aspect-[16/7]">
          <Image
            src="/images/atelier.jpg"
            alt="Inside the Porté atelier in Porto"
            fill
            sizes="100vw"
            className="rounded-[2.5rem] object-cover"
          />
        </div>
      </Reveal>

      <section id="atelier" className="mx-auto max-w-7xl px-5 py-24 lg:px-10 lg:py-32">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-20">
          <Reveal>
            <p className="font-display text-3xl font-medium italic leading-snug lg:text-4xl">
              “The suitcase that survives baggage claim, the lunchbox that
              survives the commuter crush, the tote that survives your life —
              that is our entire business plan.”
            </p>
            <p className="mt-6 text-[11px] font-bold uppercase tracking-[0.2em] text-ink/50">
              Inês Duarte — Founder & Head of Making
            </p>
          </Reveal>
          <Reveal delay={120}>
            <div className="space-y-5 text-base leading-relaxed text-ink/60">
              <p>
                Today we are seventeen people in a sun-flooded atelier in
                Porto, making the four things humans never leave home without:
                something to carry, something to eat from, something to walk
                in, and something to run for the gate with.
              </p>
              <p>
                Every material is chosen for how it ages, not how it
                photographs. Canvas that softens like a favourite jacket.
                Leather that keeps receipts of every trip in its patina. Soles
                that re-grip instead of wearing out — because the most
                sustainable product is the one you never replace.
              </p>
              <p>
                And when life eventually wins — a strap, a sole, a zipper —
                our repair bench takes it from there. Free. Forever. That is
                not a warranty; it is a relationship.
              </p>
            </div>
          </Reveal>
        </div>

        <div className="mt-24 grid gap-5 md:grid-cols-3">
          {VALUES.map((v, i) => (
            <Reveal key={v.title} delay={i * 90}>
              <div className="h-full rounded-3xl border border-ink/10 bg-bone p-8 transition-all duration-500 hover:-translate-y-1.5 hover:border-clay/40 hover:shadow-xl">
                <span className="flex size-12 items-center justify-center rounded-full bg-clay/10 text-clay">
                  <v.icon className="size-5" />
                </span>
                <h3 className="mt-6 font-display text-2xl font-semibold">
                  {v.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-ink/55">
                  {v.copy}
                </p>
              </div>
            </Reveal>
          ))}
        </div>

        <div className="mt-24">
          <Reveal>
            <p className="text-[11px] font-bold uppercase tracking-[0.24em] text-clay">
              The road so far
            </p>
          </Reveal>
          <div className="mt-8">
            {TIMELINE.map(([year, copy], i) => (
              <Reveal key={year} delay={i * 60}>
                <div className="grid items-baseline gap-2 border-t border-ink/10 py-7 sm:grid-cols-12 sm:gap-6">
                  <p className="font-display text-4xl font-semibold text-clay sm:col-span-3 lg:text-5xl">
                    {year}
                  </p>
                  <p className="max-w-[64ch] text-base leading-relaxed text-ink/60 sm:col-span-9">
                    {copy}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-ink py-24 text-center text-cream lg:py-28">
        <Reveal className="mx-auto max-w-3xl px-5">
          <h2 className="font-display text-5xl font-medium leading-[1.0] lg:text-7xl">
            Come carry <span className="italic text-clay">something.</span>
          </h2>
          <p className="mx-auto mt-6 max-w-[42ch] text-sm leading-relaxed text-cream/60">
            Lifetime repairs, 30-day trials, and a Sunday letter worth
            opening. The collection is waiting.
          </p>
          <Link
            href="/shop"
            className="mt-10 inline-flex items-center gap-3 rounded-full bg-cream px-9 py-4 text-xs font-bold uppercase tracking-[0.2em] text-ink transition hover:bg-clay hover:text-cream"
          >
            Shop the collection
          </Link>
        </Reveal>
      </section>
    </div>
  );
}
