import { Quote, Star } from "lucide-react";
import Reveal from "@/components/Reveal";

const QUOTES = [
  {
    text: "My Atlas Tote has survived three jobs, two toddlers and one very rainy Camino. It still looks brand new.",
    name: "Mara V.",
    city: "Helsinki",
    product: "Atlas Everyday Tote",
  },
  {
    text: "The Bento Stack turned me into the person who actually brings lunch. Colleagues are openly jealous.",
    name: "Jonas K.",
    city: "Berlin",
    product: "Bento Stack Lunchbox",
  },
  {
    text: "Sixteen days walking through Tokyo in the Stratus. Zero blisters, endless compliments, one very happy podiatrist.",
    name: "Aitana R.",
    city: "Madrid",
    product: "Stratus Knit Runner",
  },
  {
    text: "The Aria Roller swallows a suspicious amount of clothing and still glides through the airport like it's empty.",
    name: "Omar B.",
    city: "Casablanca",
    product: "Aria Carry-On Roller",
  },
];

export default function Testimonials() {
  return (
    <section className="bg-ink py-24 text-cream lg:py-32">
      <div className="mx-auto max-w-7xl px-5 lg:px-10">
        <Reveal className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.24em] text-clay">
              04 · From the road
            </p>
            <h2 className="mt-3 font-display text-5xl font-medium leading-[1.02] lg:text-6xl">
              Postcards from <span className="italic text-clay">carriers</span>
            </h2>
          </div>
          <p className="max-w-[30ch] text-sm text-cream/50">
            Unedited notes from the people dragging our prototypes around the
            planet.
          </p>
        </Reveal>
      </div>

      <Reveal delay={120}>
        <div className="no-scrollbar mt-12 flex snap-x snap-mandatory gap-5 overflow-x-auto px-5 lg:px-10">
          {QUOTES.map((q) => (
            <figure
              key={q.name}
              className="w-[85vw] max-w-[26rem] shrink-0 snap-start rounded-3xl border border-cream/10 bg-soot p-8 transition-colors duration-500 hover:border-clay/50"
            >
              <div className="flex items-center justify-between">
                <div className="flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="size-4 fill-clay text-clay" />
                  ))}
                </div>
                <Quote className="size-6 text-clay/60" />
              </div>
              <blockquote className="mt-6 font-display text-xl font-medium italic leading-snug text-cream/90">
                “{q.text}”
              </blockquote>
              <figcaption className="mt-8 flex items-center justify-between border-t border-cream/10 pt-5">
                <div>
                  <p className="text-sm font-bold">{q.name}</p>
                  <p className="text-xs text-cream/45">{q.city}</p>
                </div>
                <span className="rounded-full border border-cream/15 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-cream/55">
                  {q.product}
                </span>
              </figcaption>
            </figure>
          ))}
          <div className="w-1 shrink-0" />
        </div>
      </Reveal>
    </section>
  );
}
