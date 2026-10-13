"use client";

import Lenis from "lenis";
import { useEffect, type ReactNode } from "react";

let lenis: Lenis | null = null;

export function setLenisStopped(stopped: boolean) {
  if (!lenis) return;
  if (stopped) lenis.stop();
  else lenis.start();
}

export default function SmoothScroll({ children }: { children: ReactNode }) {
  useEffect(() => {
    lenis = new Lenis({
      lerp: 0.09,
      wheelMultiplier: 1,
      touchMultiplier: 1.4,
    });
    let raf = 0;
    const loop = (time: number) => {
      lenis?.raf(time);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(raf);
      lenis?.destroy();
      lenis = null;
    };
  }, []);

  return <>{children}</>;
}
