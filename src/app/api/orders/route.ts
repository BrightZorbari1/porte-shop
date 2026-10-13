import { inArray } from "drizzle-orm";
import { db } from "@/db";
import { orders, products, type OrderItem } from "@/db/schema";
import { FREE_SHIPPING_THRESHOLD } from "@/lib/utils";

type IncomingItem = { slug?: string; qty?: number; color?: string };

export async function POST(req: Request) {
  let body: {
    name?: string;
    email?: string;
    address?: string;
    items?: IncomingItem[];
  };
  try {
    body = await req.json();
  } catch {
    return Response.json({ error: "Invalid request body" }, { status: 400 });
  }

  const name = body.name?.trim();
  const email = body.email?.trim();
  const address = body.address?.trim();
  const items = (body.items ?? []).filter(
    (i): i is { slug: string; qty: number; color?: string } =>
      typeof i.slug === "string" && typeof i.qty === "number" && i.qty > 0,
  );

  if (!name || !email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return Response.json(
      { error: "Please provide your name and a valid email." },
      { status: 400 },
    );
  }
  if (!address) {
    return Response.json(
      { error: "A delivery address is required." },
      { status: 400 },
    );
  }
  if (items.length === 0) {
    return Response.json({ error: "Your cart is empty." }, { status: 400 });
  }

  const slugs = [...new Set(items.map((i) => i.slug))];
  const rows = await db
    .select()
    .from(products)
    .where(inArray(products.slug, slugs));

  if (rows.length !== slugs.length) {
    return Response.json(
      { error: "One of the items is no longer available." },
      { status: 400 },
    );
  }

  const snapshot: OrderItem[] = items.map((i) => {
    const p = rows.find((r) => r.slug === i.slug)!;
    return {
      slug: p.slug,
      name: p.name,
      price: p.price,
      qty: Math.min(i.qty, 99),
      color: i.color,
      image: p.image,
    };
  });

  const subtotal = snapshot.reduce(
    (acc, i) => acc + Number(i.price) * i.qty,
    0,
  );
  const shipping = subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : 8.5;
  const total = subtotal + shipping;
  const orderNo = `PT-${crypto.randomUUID().slice(0, 8).toUpperCase()}`;

  await db.insert(orders).values({
    orderNo,
    customerName: name,
    email,
    address,
    items: snapshot,
    subtotal: subtotal.toFixed(2),
    shipping: shipping.toFixed(2),
    total: total.toFixed(2),
  });

  return Response.json({
    ok: true,
    orderNo,
    total: total.toFixed(2),
  });
}
