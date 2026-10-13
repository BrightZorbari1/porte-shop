"use client";

import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Minus,
  Plus,
  X,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState, type FormEvent } from "react";
import { useCart } from "@/components/CartProvider";
import { FREE_SHIPPING_THRESHOLD, cn, formatPrice } from "@/lib/utils";

type Step = "cart" | "checkout" | "done";

export default function CartDrawer() {
  const { items, subtotal, count, open, setOpen, setQty, removeItem, clear } =
    useCart();
  const [step, setStep] = useState<Step>("cart");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [orderNo, setOrderNo] = useState<string | null>(null);

  const shipping = subtotal >= FREE_SHIPPING_THRESHOLD || subtotal === 0 ? 0 : 8.5;
  const total = subtotal + shipping;
  const remaining = Math.max(FREE_SHIPPING_THRESHOLD - subtotal, 0);
  const progress = Math.min((subtotal / FREE_SHIPPING_THRESHOLD) * 100, 100);

  const close = () => {
    setOpen(false);
    if (step === "done") setStep("cart");
  };

  async function placeOrder(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    const fd = new FormData(e.currentTarget);
    try {
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: fd.get("name"),
          email: fd.get("email"),
          address: fd.get("address"),
          items: items.map((i) => ({ slug: i.slug, qty: i.qty, color: i.color })),
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Something went wrong");
      setOrderNo(data.orderNo);
      clear();
      setStep("done");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <div
        onClick={close}
        className={cn(
          "fixed inset-0 z-[60] bg-ink/40 backdrop-blur-sm transition-opacity duration-500",
          open ? "opacity-100" : "pointer-events-none opacity-0",
        )}
      />
      <aside
        className={cn(
          "fixed right-0 top-0 z-[70] flex h-full w-full max-w-md flex-col bg-cream shadow-2xl transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]",
          open ? "translate-x-0" : "translate-x-full",
        )}
        aria-hidden={!open}
      >
        <div className="flex items-center justify-between border-b border-ink/10 px-6 py-5">
          <h2 className="font-display text-2xl font-semibold">
            {step === "cart" && (
              <>
                Your carry{" "}
                <span className="text-clay">({count})</span>
              </>
            )}
            {step === "checkout" && "Checkout"}
            {step === "done" && "Order confirmed"}
          </h2>
          <button
            onClick={close}
            aria-label="Close cart"
            className="flex size-9 items-center justify-center rounded-full border border-ink/15 transition hover:rotate-90 hover:border-ink"
          >
            <X className="size-4" />
          </button>
        </div>

        {step === "cart" && (
          <>
            {items.length > 0 && (
              <div className="border-b border-ink/10 px-6 py-4">
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-ink/60">
                  {remaining > 0 ? (
                    <>
                      <span className="text-clay">{formatPrice(remaining)}</span>{" "}
                      away from free shipping
                    </>
                  ) : (
                    "Free shipping unlocked"
                  )}
                </p>
                <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-sand">
                  <div
                    className="h-full rounded-full bg-clay transition-all duration-700"
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </div>
            )}

            <div className="flex-1 overflow-y-auto px-6 py-5">
              {items.length === 0 ? (
                <div className="flex h-full flex-col items-center justify-center text-center">
                  <p className="font-display text-4xl font-medium italic text-ink/40">
                    Nothing carried yet.
                  </p>
                  <p className="mt-3 max-w-[26ch] text-sm text-ink/50">
                    Bags, lunchboxes, shoes and travel gear are waiting.
                  </p>
                  <button
                    onClick={close}
                    className="mt-8 rounded-full bg-ink px-7 py-3 text-xs font-semibold uppercase tracking-[0.18em] text-cream transition hover:bg-clay"
                  >
                    Start exploring
                  </button>
                </div>
              ) : (
                <ul className="space-y-6">
                  {items.map((item) => (
                    <li key={`${item.slug}-${item.color ?? ""}`} className="flex gap-4">
                      <Link
                        href={`/product/${item.slug}`}
                        onClick={close}
                        className="relative h-24 w-20 shrink-0 overflow-hidden rounded-xl bg-parchment"
                      >
                        <Image
                          src={item.image}
                          alt={item.name}
                          fill
                          sizes="80px"
                          className="object-cover"
                        />
                      </Link>
                      <div className="flex flex-1 flex-col">
                        <div className="flex items-start justify-between gap-2">
                          <div>
                            <p className="font-display text-base font-semibold leading-tight">
                              {item.name}
                            </p>
                            {item.color && (
                              <p className="mt-0.5 text-xs text-ink/50">
                                {item.color}
                              </p>
                            )}
                          </div>
                          <button
                            onClick={() => removeItem(item.slug, item.color)}
                            aria-label={`Remove ${item.name}`}
                            className="text-ink/40 transition hover:text-clay"
                          >
                            <X className="size-4" />
                          </button>
                        </div>
                        <div className="mt-auto flex items-center justify-between">
                          <div className="flex items-center gap-3 rounded-full border border-ink/15 px-2.5 py-1">
                            <button
                              onClick={() =>
                                setQty(item.slug, item.color, item.qty - 1)
                              }
                              aria-label="Decrease quantity"
                              className="text-ink/60 transition hover:text-ink"
                            >
                              <Minus className="size-3.5" />
                            </button>
                            <span className="w-4 text-center text-sm font-semibold">
                              {item.qty}
                            </span>
                            <button
                              onClick={() =>
                                setQty(item.slug, item.color, item.qty + 1)
                              }
                              aria-label="Increase quantity"
                              className="text-ink/60 transition hover:text-ink"
                            >
                              <Plus className="size-3.5" />
                            </button>
                          </div>
                          <p className="font-display text-base font-semibold">
                            {formatPrice(item.price * item.qty)}
                          </p>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {items.length > 0 && (
              <div className="border-t border-ink/10 px-6 py-5">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-ink/60">Subtotal</span>
                  <span className="font-display text-xl font-semibold">
                    {formatPrice(subtotal)}
                  </span>
                </div>
                <div className="mt-1 flex items-center justify-between text-sm">
                  <span className="text-ink/60">Shipping</span>
                  <span className="font-semibold">
                    {shipping === 0 ? "Free" : formatPrice(shipping)}
                  </span>
                </div>
                <button
                  onClick={() => setStep("checkout")}
                  className="btn-sweep mt-4 flex w-full items-center justify-center gap-2 rounded-full bg-ink py-4 text-xs font-bold uppercase tracking-[0.2em] text-cream"
                >
                  Checkout — {formatPrice(total)}
                  <ArrowRight className="size-4" />
                </button>
                <p className="mt-3 text-center text-[11px] text-ink/45">
                  30-day trial · Lifetime repairs · Carbon-neutral delivery
                </p>
              </div>
            )}
          </>
        )}

        {step === "checkout" && (
          <form onSubmit={placeOrder} className="flex flex-1 flex-col overflow-y-auto px-6 py-5">
            <button
              type="button"
              onClick={() => setStep("cart")}
              className="mb-5 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-ink/60 transition hover:text-ink"
            >
              <ArrowLeft className="size-3.5" /> Back to cart
            </button>
            <div className="space-y-4">
              <label className="block">
                <span className="mb-1.5 block text-[11px] font-semibold uppercase tracking-[0.16em] text-ink/60">
                  Full name
                </span>
                <input
                  required
                  name="name"
                  placeholder="Ana Ribeiro"
                  className="w-full rounded-xl border border-ink/15 bg-bone px-4 py-3 text-sm transition focus:border-clay"
                />
              </label>
              <label className="block">
                <span className="mb-1.5 block text-[11px] font-semibold uppercase tracking-[0.16em] text-ink/60">
                  Email
                </span>
                <input
                  required
                  type="email"
                  name="email"
                  placeholder="ana@example.com"
                  className="w-full rounded-xl border border-ink/15 bg-bone px-4 py-3 text-sm transition focus:border-clay"
                />
              </label>
              <label className="block">
                <span className="mb-1.5 block text-[11px] font-semibold uppercase tracking-[0.16em] text-ink/60">
                  Delivery address
                </span>
                <textarea
                  required
                  name="address"
                  rows={3}
                  placeholder="Rua das Flores 42, 1200-195 Lisboa, Portugal"
                  className="w-full resize-none rounded-xl border border-ink/15 bg-bone px-4 py-3 text-sm transition focus:border-clay"
                />
              </label>
            </div>
            {error && (
              <p className="mt-4 rounded-xl bg-clay/10 px-4 py-3 text-sm font-medium text-clay-deep">
                {error}
              </p>
            )}
            <div className="mt-auto pt-6">
              <div className="flex items-center justify-between border-t border-ink/10 pt-4 text-sm">
                <span className="text-ink/60">Total to pay</span>
                <span className="font-display text-2xl font-semibold">
                  {formatPrice(total)}
                </span>
              </div>
              <button
                type="submit"
                disabled={loading}
                className="btn-sweep mt-4 flex w-full items-center justify-center gap-2 rounded-full bg-ink py-4 text-xs font-bold uppercase tracking-[0.2em] text-cream disabled:opacity-60"
              >
                {loading ? "Placing order…" : "Place order"}
                {!loading && <ArrowRight className="size-4" />}
              </button>
              <p className="mt-3 text-center text-[11px] text-ink/45">
                Demo checkout — no payment is processed.
              </p>
            </div>
          </form>
        )}

        {step === "done" && (
          <div className="flex flex-1 flex-col items-center justify-center px-8 text-center">
            <CheckCircle2 className="size-16 text-clay" strokeWidth={1.4} />
            <h3 className="mt-6 font-display text-4xl font-medium">
              Obrigado<span className="text-clay">.</span>
            </h3>
            <p className="mt-3 text-sm text-ink/55">
              Order <span className="font-bold text-ink">{orderNo}</span> is
              confirmed. A receipt is on its way to your inbox.
            </p>
            <button
              onClick={close}
              className="btn-sweep mt-8 rounded-full bg-ink px-8 py-3.5 text-xs font-bold uppercase tracking-[0.2em] text-cream"
            >
              Keep exploring
            </button>
          </div>
        )}
      </aside>
    </>
  );
}
