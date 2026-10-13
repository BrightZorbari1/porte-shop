import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Truck } from "lucide-react";
import ProductCard from "@/components/ProductCard";
import Reveal from "@/components/Reveal";
import Purchase from "@/app/product/[slug]/Purchase";
import { getProductBySlug, getRelatedProducts } from "@/lib/data";
import { categoryLabel } from "@/lib/utils";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) return { title: "Not found" };
  return { title: product.name, description: product.blurb };
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) notFound();

  const related = await getRelatedProducts(product.category, product.slug);

  return (
    <div className="pt-28 lg:pt-40">
      <div className="mx-auto max-w-7xl px-5 lg:px-10">
        <nav className="flex flex-wrap items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-ink/45">
          <Link href="/" className="transition hover:text-ink">
            Home
          </Link>
          <span>/</span>
          <Link href="/shop" className="transition hover:text-ink">
            Shop
          </Link>
          <span>/</span>
          <Link
            href={`/shop?category=${product.category}`}
            className="transition hover:text-ink"
          >
            {categoryLabel(product.category)}
          </Link>
          <span>/</span>
          <span className="text-clay">{product.name}</span>
        </nav>

        <div className="mt-8 grid gap-12 lg:grid-cols-2 lg:gap-16">
          <Reveal>
            <div className="lg:sticky lg:top-32">
              <div className="zoom-frame relative aspect-[4/5] rounded-[2.5rem] bg-parchment">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 46vw"
                  className="rounded-[2.5rem] object-cover"
                />
                {product.badge && (
                  <span className="absolute left-5 top-5 rounded-full bg-cream/90 px-4 py-2 text-[11px] font-bold uppercase tracking-[0.14em] backdrop-blur">
                    {product.badge}
                  </span>
                )}
              </div>
              <p className="mt-4 flex items-center gap-2 px-1 text-xs text-ink/50">
                <Truck className="size-4 text-clay" />
                Ships within 24 hours from Porto — photographed by the atelier.
              </p>
            </div>
          </Reveal>

          <Reveal delay={120}>
            <Purchase
              product={{
                slug: product.slug,
                name: product.name,
                category: product.category,
                price: product.price,
                compareAt: product.compareAt,
                blurb: product.blurb,
                description: product.description,
                image: product.image,
                rating: product.rating,
                reviewCount: product.reviewCount,
                colors: product.colors,
                specs: product.specs,
                stock: product.stock,
              }}
            />
          </Reveal>
        </div>

        {related.length > 0 && (
          <section className="pb-28 pt-24 lg:pt-32">
            <Reveal className="mb-10 flex flex-wrap items-end justify-between gap-6">
              <h2 className="font-display text-4xl font-medium lg:text-6xl">
                Pairs well <span className="italic text-clay">with</span>
              </h2>
              <Link
                href={`/shop?category=${product.category}`}
                className="u-link text-xs font-bold uppercase tracking-[0.2em] text-ink/70"
              >
                More {categoryLabel(product.category).toLowerCase()}
              </Link>
            </Reveal>
            <div className="grid grid-cols-2 gap-x-5 gap-y-10 lg:grid-cols-4">
              {related.map((p, i) => (
                <Reveal key={p.slug} delay={i * 70}>
                  <ProductCard product={p} />
                </Reveal>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
