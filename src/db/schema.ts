import {
  boolean,
  integer,
  jsonb,
  numeric,
  pgTable,
  text,
  timestamp,
  uuid,
} from "drizzle-orm/pg-core";

export type ProductColor = { name: string; hex: string };

export type ProductSpecs = {
  materials?: string;
  dimensions?: string;
  weight?: string;
};

export const products = pgTable("products", {
  id: uuid("id").defaultRandom().primaryKey(),
  slug: text("slug").notNull().unique(),
  name: text("name").notNull(),
  category: text("category").notNull(), // bags | lunch | shoes | travel
  price: numeric("price", { precision: 10, scale: 2 }).notNull(),
  compareAt: numeric("compare_at", { precision: 10, scale: 2 }),
  blurb: text("blurb").notNull().default(""),
  description: text("description").notNull().default(""),
  image: text("image").notNull(),
  colors: jsonb("colors").$type<ProductColor[]>().notNull().default([]),
  rating: numeric("rating", { precision: 2, scale: 1 }).notNull().default("4.8"),
  reviewCount: integer("review_count").notNull().default(0),
  featured: boolean("featured").notNull().default(false),
  bestseller: boolean("bestseller").notNull().default(false),
  badge: text("badge"),
  stock: integer("stock").notNull().default(20),
  specs: jsonb("specs").$type<ProductSpecs>().notNull().default({}),
  createdAt: timestamp("created_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
});

export type OrderItem = {
  slug: string;
  name: string;
  price: string;
  qty: number;
  color?: string;
  image: string;
};

export const orders = pgTable("orders", {
  id: uuid("id").defaultRandom().primaryKey(),
  orderNo: text("order_no").notNull().unique(),
  customerName: text("customer_name").notNull(),
  email: text("email").notNull(),
  address: text("address").notNull(),
  items: jsonb("items").$type<OrderItem[]>().notNull(),
  subtotal: numeric("subtotal", { precision: 10, scale: 2 }).notNull(),
  shipping: numeric("shipping", { precision: 10, scale: 2 }).notNull(),
  total: numeric("total", { precision: 10, scale: 2 }).notNull(),
  status: text("status").notNull().default("confirmed"),
  createdAt: timestamp("created_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
});

export const newsletterSubscribers = pgTable("newsletter_subscribers", {
  id: uuid("id").defaultRandom().primaryKey(),
  email: text("email").notNull().unique(),
  createdAt: timestamp("created_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
});
