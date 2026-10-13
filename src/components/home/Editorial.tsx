import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import Reveal from "@/components/Reveal";

const STATS = [
  ["98%", "of our canvas is recycled"],
  ["40k+", "carriers in 38 countries"],
  ["∞", "repairs, for the life of the piece"],
];

export default function Editorial() {
  return (
    <section id="craft" className="mx-auto max-w-7xl px-5 py-24 lg:px-10 lg:py-32">
      <div className="grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
        <Reveal className="relative">
          <div className="zoom-frame relative aspect-[4/5] rounded-[2.5rem] bg-parchment">
            <Image
              src="/images/atelier.jpg"
              alt="An artisan stitching leather in the Porté atelier"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="rounded-[2.5rem] object-cover"
            />
          </div>
          <span className="absolute -bottom-5 left-8 rotate-[-3deg] rounded-full bg-clay px-6 py-3 text-[11px] font-bold uppercase tracking-[0.2em] text-cream shadow-lg">
            Atelier Nº7 — Porto
          </span>
        </Reveal>

        <div>
          <Reveal>
            <p className="text-[11px] font-bold uppercase tracking-[0.24em] text-clay">
              03 · The craft
            </p>
            <h2 className="mt-3 font-display text-5xl font-medium leading-[1.02] lg:text-6xl">
              Made slowly<span className="text-clay">.</span>
              <br />
              <span className="italic">Carried fast.</span>
            </h2>
          </Reveal>
          <Reveal delay={100}>
            <p className="mt-7 max-w-[52ch] text-base leading-relaxed text-ink/60">
              Every Porté piece starts as a paper sketch pinned to the atelier
              wall, and ends months later — after seventeen prototypes, a
              dissertation-level debate about zippers, and one final test we
              call “the overloaded sprint to the train”.
            </p>
            <p className="mt-4 max-w-[52ch] text-base leading-relaxed text-ink/60">
              If it survives that, it earns the mark. If it doesn&apos;t, we
              start again. That&apos;s why we can promise repairs for life:
              we already know exactly how every seam was sewn.
            </p>
          </Reveal>
          <Reveal delay={180}>
            <div className="mt-10 grid grid-cols-3 gap-6 border-t border-ink/10 pt-8">
              {STATS.map(([num, label]) => (
                <div key={label}>
                  <p className="font-display text-4xl font-semibold text-clay lg:text-5xl">
                    {num}
                  </p>
                  <p className="mt-2 text-xs leading-relaxed text-ink/55">
                    {label}
                  </p>
                </div>
              ))}
            </div>
          </Reveal>
          <Reveal delay={240}>
            <Link
              href="/about"
              className="btn-sweep group mt-10 inline-flex items-center gap-3 rounded-full bg-ink px-8 py-4 text-xs font-bold uppercase tracking-[0.2em] text-cream"
            >
              Read our story
              <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
