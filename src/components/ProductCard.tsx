"use client";

import { Heart, Plus, Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useCart } from "@/components/CartProvider";
import { categoryLabel, cn, formatPrice } from "@/lib/utils";

export type CardProduct = {
  slug: string;
  name: string;
  category: string;
  price: string;
  compareAt: string | null;
  blurb: string;
  image: string;
  rating: string;
  reviewCount: number;
  badge: string | null;
};

export default function ProductCard({
  product,
  className,
}: {
  product: CardProduct;
  className?: string;
}) {
  const { addItem } = useCart();
  const [hearted, setHearted] = useState(false);

  const salePct = product.compareAt
    ? Math.round((1 - Number(product.price) / Number(product.compareAt)) * 100)
    : null;

  return (
    <article className={cn("group", className)}>
      <div className="zoom-frame relative aspect-[4/5] rounded-2xl bg-parchment">
        <Image
          src={product.image}
          alt={product.name}
          fill
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          className="rounded-2xl object-cover"
        />
        <Link
          href={`/product/${product.slug}`}
          aria-label={product.name}
          className="absolute inset-0 z-[5] rounded-2xl"
        />
        <div className="absolute left-3 top-3 z-10 flex gap-2">
          {product.badge && (
            <span className="rounded-full bg-cream/90 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.14em] text-ink backdrop-blur">
              {product.badge}
            </span>
          )}
          {salePct && (
            <span className="rounded-full bg-clay px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.14em] text-cream">
              −{salePct}%
            </span>
          )}
        </div>
        <button
          aria-label="Save to wishlist"
          onClick={() => setHearted((h) => !h)}
          className={cn(
            "absolute right-3 top-3 z-20 flex size-9 items-center justify-center rounded-full bg-cream/90 backdrop-blur transition-all duration-300",
            hearted
              ? "text-clay opacity-100"
              : "text-ink/70 hover:text-clay lg:opacity-0 lg:group-hover:opacity-100",
          )}
        >
          <Heart className={cn("size-4", hearted && "fill-clay")} />
        </button>
        <button
          onClick={() =>
            addItem({
              slug: product.slug,
              name: product.name,
              price: Number(product.price),
              image: product.image,
            })
          }
          className="absolute inset-x-3 bottom-3 z-20 flex translate-y-4 items-center justify-center gap-2 rounded-full bg-ink py-3 text-[11px] font-bold uppercase tracking-[0.18em] text-cream opacity-0 transition-all duration-500 hover:bg-clay group-hover:translate-y-0 group-hover:opacity-100 max-lg:hidden"
        >
          <Plus className="size-4" /> Quick add
        </button>
      </div>

      <div className="flex items-start justify-between gap-3 px-1 pt-4">
        <div className="min-w-0">
          <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-ink/45">
            {categoryLabel(product.category)}
          </p>
          <Link href={`/product/${product.slug}`}>
            <h3 className="mt-1 truncate font-display text-lg font-semibold leading-tight transition-colors hover:text-clay">
              {product.name}
            </h3>
          </Link>
          <p className="mt-0.5 flex items-center gap-1 text-xs text-ink/50">
            <Star className="size-3 fill-clay text-clay" />
            {product.rating}
            <span className="text-ink/35">({product.reviewCount})</span>
          </p>
        </div>
        <div className="shrink-0 text-right">
          <p className="font-display text-lg font-semibold">
            {formatPrice(product.price)}
          </p>
          {product.compareAt && (
            <p className="text-sm text-ink/40 line-through">
              {formatPrice(product.compareAt)}
            </p>
          )}
        </div>
      </div>
    </article>
  );
}
