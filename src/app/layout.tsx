import type { Metadata } from "next";
import { Archivo, Fraunces } from "next/font/google";
import type { ReactNode } from "react";
import CartDrawer from "@/components/CartDrawer";
import { CartProvider } from "@/components/CartProvider";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import SmoothScroll from "@/components/SmoothScroll";
import "./globals.css";

const display = Fraunces({
  subsets: ["latin"],
  style: ["normal", "italic"],
  variable: "--font-fraunces",
  display: "swap",
});

const sans = Archivo({
  subsets: ["latin"],
  variable: "--font-archivo",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "PORTÉ — Bags, lunchboxes, shoes & travel gear",
    template: "%s · PORTÉ",
  },
  description:
    "Porté is a Lisbon-born carry goods atelier. Bags, lunchboxes, shoes and travel gear — designed slowly, guaranteed for life.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${sans.variable}`}>
      <body className="bg-cream font-sans text-ink antialiased">
        <SmoothScroll>
          <CartProvider>
            <Navbar />
            <main>{children}</main>
            <Footer />
            <CartDrawer />
          </CartProvider>
        </SmoothScroll>
        <div className="grain" aria-hidden />
      </body>
    </html>
  );
}
