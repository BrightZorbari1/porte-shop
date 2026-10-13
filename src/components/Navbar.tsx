"use client";

import { Menu, Search, ShoppingBag, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import Marquee from "@/components/Marquee";
import { useCart } from "@/components/CartProvider";
import { cn } from "@/lib/utils";

const LINKS = [
  { href: "/shop", label: "Shop All" },
  { href: "/shop?category=bags", label: "Bags" },
  { href: "/shop?category=lunch", label: "Lunchboxes" },
  { href: "/shop?category=shoes", label: "Shoes" },
  { href: "/shop?category=travel", label: "Travel" },
  { href: "/about", label: "Story" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { count, setOpen } = useCart();
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (menuOpen) {
      document.documentElement.style.overflow = "hidden";
    } else {
      document.documentElement.style.overflow = "";
    }
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50">
        {/* Announcement marquee */}
        <div
          className={cn(
            "bg-ink text-cream transition-all duration-500 overflow-hidden",
            scrolled ? "max-h-0" : "max-h-9",
          )}
        >
          <Marquee
            items={[
              "Free worldwide shipping over €150",
              "Lifetime repair guarantee",
              "30-day trial on every carry",
              "Carbon-neutral delivery",
              "4.9 / 5 from 12,400+ carriers",
            ]}
            className="py-2"
            itemClassName="text-[10px] font-semibold uppercase tracking-[0.22em]"
          />
        </div>

        <nav
          className={cn(
            "flex items-center justify-between px-5 transition-all duration-500 lg:px-10",
            scrolled
              ? "border-b border-ink/10 bg-cream/85 py-3 backdrop-blur-xl"
              : "bg-transparent py-5",
          )}
        >
          <div className="flex flex-1 items-center gap-6">
            <button
              className="flex size-10 items-center justify-center rounded-full border border-ink/15 transition hover:border-ink lg:hidden"
              onClick={() => setMenuOpen(true)}
              aria-label="Open menu"
            >
              <Menu className="size-4" />
            </button>
            <div className="hidden items-center gap-7 lg:flex">
              {LINKS.slice(1, 5).map((l) => (
                <Link
                  key={l.label}
                  href={l.href}
                  className="u-link text-[11px] font-semibold uppercase tracking-[0.18em] text-ink/70 transition hover:text-ink"
                >
                  {l.label}
                </Link>
              ))}
            </div>
          </div>

          <Link
            href="/"
            className="font-display text-2xl font-black tracking-tight lg:text-[1.7rem]"
          >
            PORTÉ<span className="text-clay">.</span>
          </Link>

          <div className="flex flex-1 items-center justify-end gap-3">
            {LINKS.slice(0, 1)
              .concat(LINKS.slice(5))
              .map((l) => (
                <Link
                  key={l.label}
                  href={l.href}
                  className={cn(
                    "u-link hidden text-[11px] font-semibold uppercase tracking-[0.18em] text-ink/70 transition hover:text-ink lg:block",
                  )}
                >
                  {l.label}
                </Link>
              ))}
            <Link
              href="/shop"
              aria-label="Search products"
              className="hidden size-10 items-center justify-center rounded-full border border-ink/15 transition hover:border-ink hover:bg-ink hover:text-cream sm:flex"
            >
              <Search className="size-4" />
            </Link>
            <button
              onClick={() => setOpen(true)}
              aria-label="Open cart"
              className="relative flex h-10 items-center gap-2 rounded-full bg-ink px-4 text-cream transition hover:bg-clay"
            >
              <ShoppingBag className="size-4" />
              <span className="hidden text-[11px] font-semibold uppercase tracking-[0.18em] sm:inline">
                Cart
              </span>
              <span className="absolute -right-1 -top-1 flex size-5 items-center justify-center rounded-full bg-clay text-[10px] font-bold text-cream">
                {count}
              </span>
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile menu overlay */}
      <div
        className={cn(
          "fixed inset-0 z-[80] flex flex-col bg-ink text-cream transition-all duration-500",
          menuOpen
            ? "pointer-events-auto opacity-100"
            : "pointer-events-none opacity-0",
        )}
      >
        <div className="flex items-center justify-between px-5 py-5">
          <span className="font-display text-2xl font-black">
            PORTÉ<span className="text-clay">.</span>
          </span>
          <button
            onClick={() => setMenuOpen(false)}
            aria-label="Close menu"
            className="flex size-10 items-center justify-center rounded-full border border-cream/25 transition hover:border-cream"
          >
            <X className="size-4" />
          </button>
        </div>
        <nav className="flex flex-1 flex-col justify-center gap-1 px-8">
          {LINKS.map((l, i) => (
            <Link
              key={l.label}
              href={l.href}
              style={{ transitionDelay: `${80 + i * 60}ms` }}
              className={cn(
                "font-display text-[2.6rem] font-medium leading-[1.15] transition-all duration-500",
                menuOpen
                  ? "translate-y-0 opacity-100"
                  : "translate-y-6 opacity-0",
                "hover:italic hover:text-clay",
              )}
            >
              {l.label}
            </Link>
          ))}
        </nav>
        <div className="px-8 pb-10 text-[11px] uppercase tracking-[0.2em] text-cream/50">
          Designed in Lisboa — carried everywhere
        </div>
      </div>
    </>
  );
}
