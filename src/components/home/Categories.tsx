import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import { CATEGORIES, cn } from "@/lib/utils";

function Tile({
  cat,
  index,
  count,
  className,
  tall = false,
}: {
  cat: (typeof CATEGORIES)[number];
  index: number;
  count: number;
  className?: string;
  tall?: boolean;
}) {
  return (
    <Link
      href={`/shop?category=${cat.slug}`}
      className={cn(
        "zoom-frame group relative block overflow-hidden rounded-[2rem] bg-parchment",
        className,
      )}
    >
      <Image
        src={cat.image}
        alt={cat.label}
        fill
        sizes="(max-width: 1024px) 100vw, 58vw"
        className="object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-ink/75 via-ink/10 to-transparent" />
      <span className="absolute right-5 top-5 rounded-full bg-cream/90 px-3.5 py-1.5 text-[11px] font-bold uppercase tracking-[0.14em] text-ink backdrop-blur">
        {count} pieces
      </span>
      <div className="absolute bottom-0 left-0 right-0 flex items-end justify-between p-7 lg:p-9">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-cream/60">
            {String(index + 1).padStart(2, "0")} — Collection
          </p>
          <h3
            className={cn(
              "mt-2 font-display font-medium text-cream transition-all duration-500 group-hover:italic group-hover:text-clay",
              tall ? "text-4xl lg:text-6xl" : "text-3xl lg:text-4xl",
            )}
          >
            {cat.label}
          </h3>
          <p className="mt-1.5 max-w-[30ch] text-sm text-cream/70">
            {cat.tagline}
          </p>
        </div>
        <span className="mb-1 flex size-12 shrink-0 items-center justify-center rounded-full border border-cream/40 text-cream opacity-0 transition-all duration-500 group-hover:bg-clay group-hover:opacity-100 lg:group-hover:scale-110">
          <ArrowUpRight className="size-5" />
        </span>
      </div>
    </Link>
  );
}

export default function Categories({ counts }: { counts: Record<string, number> }) {
  return (
    <section className="mx-auto max-w-7xl px-5 py-24 lg:px-10 lg:py-32">
      <Reveal className="mb-12 flex flex-wrap items-end justify-between gap-6 lg:mb-16">
        <div>
          <p className="text-[11px] font-bold uppercase tracking-[0.24em] text-clay">
            01 · Collections
          </p>
          <h2 className="mt-3 font-display text-5xl font-medium leading-[1.02] lg:text-7xl">
            Choose your <span className="italic text-clay">carry</span>
          </h2>
        </div>
        <Link
          href="/shop"
          className="u-link text-xs font-bold uppercase tracking-[0.2em] text-ink/70"
        >
          View all products
        </Link>
      </Reveal>

      <div className="grid gap-5 lg:grid-cols-12">
        <Reveal className="lg:col-span-7" delay={0}>
          <Tile
            cat={CATEGORIES[0]}
            index={0}
            count={counts.bags ?? 0}
            tall
            className="h-[24rem] lg:h-[35rem]"
          />
        </Reveal>
        <div className="grid gap-5 lg:col-span-5">
          <Reveal delay={90}>
            <Tile
              cat={CATEGORIES[1]}
              index={1}
              count={counts.lunch ?? 0}
              className="h-[17rem]"
            />
          </Reveal>
          <Reveal delay={160}>
            <Tile
              cat={CATEGORIES[2]}
              index={2}
              count={counts.shoes ?? 0}
              className="h-[17rem]"
            />
          </Reveal>
        </div>
        <Reveal className="lg:col-span-12" delay={100}>
          <Tile
            cat={CATEGORIES[3]}
            index={3}
            count={counts.travel ?? 0}
            className="h-[19rem] lg:h-[23rem]"
          />
        </Reveal>
      </div>
    </section>
  );
}
