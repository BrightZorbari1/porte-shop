"use client";

import {
  Check,
  Minus,
  Plus,
  RefreshCcw,
  ShoppingBag,
  Star,
  Truck,
  Wrench,
} from "lucide-react";
import { useState } from "react";
import { useCart } from "@/components/CartProvider";
import type { ProductColor, ProductSpecs } from "@/db/schema";
import { categoryLabel, cn, formatPrice } from "@/lib/utils";

type PurchaseProduct = {
  slug: string;
  name: string;
  category: string;
  price: string;
  compareAt: string | null;
  blurb: string;
  description: string;
  image: string;
  rating: string;
  reviewCount: number;
  colors: ProductColor[];
  specs: ProductSpecs;
  stock: number;
};

function Accordion({ title, children }: { title: string; children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-ink/10">
      <button
        onClick={() => setOpen((o) => !o)}
        className="flex w-full items-center justify-between py-5 text-left"
      >
        <span className="text-[11px] font-bold uppercase tracking-[0.2em]">
          {title}
        </span>
        <Plus
          className={cn(
            "size-4 text-clay transition-transform duration-300",
            open && "rotate-45",
          )}
        />
      </button>
      <div
        className={cn(
          "grid transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]",
          open ? "grid-template-rows-[1fr] pb-6 opacity-100" : "grid-template-rows-[0fr] opacity-0",
        )}
        style={{ gridTemplateRows: open ? "1fr" : "0fr" }}
      >
        <div className="overflow-hidden text-sm leading-relaxed text-ink/60">
          {children}
        </div>
      </div>
    </div>
  );
}

export default function Purchase({ product }: { product: PurchaseProduct }) {
  const { addItem } = useCart();
  const [color, setColor] = useState<ProductColor | undefined>(product.colors[0]);
  const [qty, setQtyLocal] = useState(1);
  const [added, setAdded] = useState(false);

  const savePct = product.compareAt
    ? Math.round((1 - Number(product.price) / Number(product.compareAt)) * 100)
    : null;

  function add() {
    addItem(
      {
        slug: product.slug,
        name: product.name,
        price: Number(product.price),
        image: product.image,
        color: color?.name,
      },
      qty,
    );
    setAdded(true);
    setTimeout(() => setAdded(false), 1600);
  }

  return (
    <div>
      <p className="text-[11px] font-bold uppercase tracking-[0.24em] text-clay">
        {categoryLabel(product.category)}
      </p>
      <h1 className="mt-3 font-display text-4xl font-medium leading-[1.02] lg:text-6xl">
        {product.name}
      </h1>

      <div className="mt-4 flex flex-wrap items-center gap-3">
        <span className="flex gap-0.5">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className={cn(
                "size-4",
                i < Math.round(Number(product.rating))
                  ? "fill-clay text-clay"
                  : "text-ink/20",
              )}
            />
          ))}
        </span>
        <span className="text-sm font-semibold">{product.rating}</span>
        <span className="text-sm text-ink/45">
          {product.reviewCount.toLocaleString()} reviews
        </span>
        <span className="rounded-full bg-parchment px-3 py-1 text-[10px] font-bold uppercase tracking-[0.14em] text-ink/60">
          30-day trial
        </span>
      </div>

      <div className="mt-6 flex items-baseline gap-3">
        <p className="font-display text-4xl font-semibold">
          {formatPrice(product.price)}
        </p>
        {product.compareAt && (
          <>
            <p className="font-display text-xl text-ink/40 line-through">
              {formatPrice(product.compareAt)}
            </p>
            <span className="rounded-full bg-clay px-3 py-1 text-[10px] font-bold uppercase tracking-[0.14em] text-cream">
              Save {savePct}%
            </span>
          </>
        )}
      </div>

      <p className="mt-5 max-w-[52ch] text-base leading-relaxed text-ink/60">
        {product.blurb}
      </p>

      {product.colors.length > 0 && (
        <div className="mt-8">
          <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-ink/60">
            Colour — <span className="text-ink">{color?.name}</span>
          </p>
          <div className="mt-3 flex gap-3">
            {product.colors.map((c) => (
              <button
                key={c.name}
                onClick={() => setColor(c)}
                aria-label={c.name}
                className={cn(
                  "size-9 rounded-full border border-ink/10 transition-all duration-300",
                  color?.name === c.name
                    ? "ring-2 ring-clay ring-offset-2 ring-offset-cream"
                    : "hover:scale-110",
                )}
                style={{ backgroundColor: c.hex }}
              />
            ))}
          </div>
        </div>
      )}

      <div className="mt-8 flex items-stretch gap-3">
        <div className="flex items-center gap-4 rounded-full border border-ink/15 px-4">
          <button
            onClick={() => setQtyLocal((q) => Math.max(1, q - 1))}
            aria-label="Decrease quantity"
            className="text-ink/60 transition hover:text-ink"
          >
            <Minus className="size-4" />
          </button>
          <span className="w-5 text-center font-display text-lg font-semibold">
            {qty}
          </span>
          <button
            onClick={() => setQtyLocal((q) => Math.min(product.stock, q + 1))}
            aria-label="Increase quantity"
            className="text-ink/60 transition hover:text-ink"
          >
            <Plus className="size-4" />
          </button>
        </div>
        <button
          onClick={add}
          className={cn(
            "btn-sweep flex flex-1 items-center justify-center gap-3 rounded-full py-4 text-xs font-bold uppercase tracking-[0.2em] text-cream transition-colors",
            added ? "bg-moss" : "bg-ink",
          )}
        >
          {added ? (
            <>
              <Check className="size-4" /> Added to cart
            </>
          ) : (
            <>
              <ShoppingBag className="size-4" />
              Add to cart — {formatPrice(Number(product.price) * qty)}
            </>
          )}
        </button>
      </div>

      <div className="mt-8 grid grid-cols-3 gap-3">
        {(
          [
            { Icon: Truck, a: "Free shipping", b: "over €150" },
            { Icon: RefreshCcw, a: "30-day trial", b: "easy returns" },
            { Icon: Wrench, a: "Lifetime", b: "free repairs" },
          ] as const
        ).map(({ Icon, a, b }) => (
          <div
            key={a}
            className="rounded-2xl border border-ink/10 bg-bone p-4 text-center"
          >
            <Icon className="mx-auto size-5 text-clay" />
            <p className="mt-2 text-xs font-bold">{a}</p>
            <p className="text-[11px] text-ink/50">{b}</p>
          </div>
        ))}
      </div>

      <div className="mt-10 border-t border-ink/10">
        <Accordion title="Description">
          <p>{product.description}</p>
        </Accordion>
        <Accordion title="Details & care">
          <ul className="space-y-2">
            {product.specs.materials && (
              <li>
                <span className="font-semibold text-ink">Materials — </span>
                {product.specs.materials}
              </li>
            )}
            {product.specs.dimensions && (
              <li>
                <span className="font-semibold text-ink">Dimensions — </span>
                {product.specs.dimensions}
              </li>
            )}
            {product.specs.weight && (
              <li>
                <span className="font-semibold text-ink">Weight — </span>
                {product.specs.weight}
              </li>
            )}
            <li>
              <span className="font-semibold text-ink">Care — </span>
              Wipe clean with a damp cloth; leather parts love an occasional
              balm. If anything ever breaks, we repair it free, forever.
            </li>
          </ul>
        </Accordion>
        <Accordion title="Shipping & returns">
          <p>
            Orders leave our Porto atelier within 24 hours, carbon-neutral.
            EU delivery in 2–4 days, worldwide in 5–9. Free over €150. Try it
            for 30 days — if it doesn&apos;t earn a place in your routine,
            send it back on us.
          </p>
        </Accordion>
      </div>
    </div>
  );
}
