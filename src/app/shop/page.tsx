import type { Metadata } from "next";
import ShopClient from "@/app/shop/ShopClient";
import { getProducts } from "@/lib/data";

export const metadata: Metadata = {
  title: "Shop all carry goods",
  description:
    "Bags, lunchboxes, shoes and travel gear — designed in Lisboa, guaranteed for life.",
};

export default async function ShopPage() {
  const products = await getProducts({ limit: 500 });
  return <ShopClient products={products} />;
}
