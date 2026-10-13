import { and, asc, desc, eq, ilike, ne, or, sql } from "drizzle-orm";
import { db } from "@/db";
import { products } from "@/db/schema";

export type Product = typeof products.$inferSelect;

export type ProductQuery = {
  category?: string;
  q?: string;
  sort?: string;
  limit?: number;
};

function orderClause(sort?: string) {
  switch (sort) {
    case "price-asc":
      return [asc(sql`${products.price}::numeric`)];
    case "price-desc":
      return [desc(sql`${products.price}::numeric`)];
    case "newest":
      return [desc(products.createdAt)];
    case "rating":
      return [desc(sql`${products.rating}::numeric`)];
    default: // featured
      return [
        desc(products.featured),
        desc(products.bestseller),
        desc(products.createdAt),
      ];
  }
}

export async function getProducts(query: ProductQuery = {}) {
  const conditions = [];
  if (query.category) conditions.push(eq(products.category, query.category));
  if (query.q) {
    const like = `%${query.q}%`;
    conditions.push(
      or(ilike(products.name, like), ilike(products.blurb, like))!,
    );
  }
  return db
    .select()
    .from(products)
    .where(conditions.length ? and(...conditions) : undefined)
    .orderBy(...orderClause(query.sort))
    .limit(query.limit ?? 100);
}

export async function getFeaturedProducts(limit = 6) {
  return db
    .select()
    .from(products)
    .where(eq(products.featured, true))
    .orderBy(asc(products.createdAt))
    .limit(limit);
}

export async function getBestsellers(limit = 4) {
  return db
    .select()
    .from(products)
    .where(eq(products.bestseller, true))
    .orderBy(desc(products.reviewCount))
    .limit(limit);
}

export async function getProductBySlug(slug: string) {
  const rows = await db
    .select()
    .from(products)
    .where(eq(products.slug, slug))
    .limit(1);
  return rows[0] ?? null;
}

export async function getRelatedProducts(category: string, slug: string) {
  return db
    .select()
    .from(products)
    .where(and(eq(products.category, category), ne(products.slug, slug)))
    .orderBy(desc(products.reviewCount))
    .limit(4);
}

export async function getCategoryCounts(): Promise<Record<string, number>> {
  const rows = await db
    .select({ category: products.category, count: sql<number>`count(*)` })
    .from(products)
    .groupBy(products.category);
  return Object.fromEntries(rows.map((r) => [r.category, Number(r.count)]));
}
