"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { setLenisStopped } from "./SmoothScroll";

export type CartItem = {
  slug: string;
  name: string;
  price: number;
  image: string;
  color?: string;
  qty: number;
};

type CartContextValue = {
  items: CartItem[];
  count: number;
  subtotal: number;
  open: boolean;
  setOpen: (open: boolean) => void;
  addItem: (item: Omit<CartItem, "qty">, qty?: number) => void;
  removeItem: (slug: string, color?: string) => void;
  setQty: (slug: string, color: string | undefined, qty: number) => void;
  clear: () => void;
};

const CartContext = createContext<CartContextValue | null>(null);

const STORAGE_KEY = "porte-cart-v1";

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [open, setOpen] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setItems(JSON.parse(raw));
    } catch {
      /* ignore */
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (hydrated) localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [items, hydrated]);

  useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : "";
    setLenisStopped(open);
    return () => {
      document.documentElement.style.overflow = "";
      setLenisStopped(false);
    };
  }, [open]);

  const addItem = useCallback((item: Omit<CartItem, "qty">, qty = 1) => {
    setItems((prev) => {
      const idx = prev.findIndex(
        (p) => p.slug === item.slug && p.color === item.color,
      );
      if (idx >= 0) {
        const next = [...prev];
        next[idx] = { ...next[idx], qty: next[idx].qty + qty };
        return next;
      }
      return [...prev, { ...item, qty }];
    });
    setOpen(true);
  }, []);

  const removeItem = useCallback((slug: string, color?: string) => {
    setItems((prev) =>
      prev.filter((p) => !(p.slug === slug && p.color === color)),
    );
  }, []);

  const setQty = useCallback(
    (slug: string, color: string | undefined, qty: number) => {
      if (qty <= 0) {
        removeItem(slug, color);
        return;
      }
      setItems((prev) =>
        prev.map((p) =>
          p.slug === slug && p.color === color ? { ...p, qty } : p,
        ),
      );
    },
    [removeItem],
  );

  const clear = useCallback(() => setItems([]), []);

  const value = useMemo<CartContextValue>(() => {
    const count = items.reduce((acc, i) => acc + i.qty, 0);
    const subtotal = items.reduce((acc, i) => acc + i.qty * i.price, 0);
    return {
      items,
      count,
      subtotal,
      open,
      setOpen,
      addItem,
      removeItem,
      setQty,
      clear,
    };
  }, [items, open, addItem, removeItem, setQty, clear]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside CartProvider");
  return ctx;
}
