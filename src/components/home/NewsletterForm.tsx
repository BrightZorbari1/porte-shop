"use client";

import { ArrowRight, CheckCircle2 } from "lucide-react";
import { useState, type FormEvent } from "react";
import Reveal from "@/components/Reveal";

export default function NewsletterSection() {
  const [state, setState] = useState<"idle" | "loading" | "done" | "error">(
    "idle",
  );

  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setState("loading");
    const fd = new FormData(e.currentTarget);
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: fd.get("email") }),
      });
      if (!res.ok) throw new Error();
      setState("done");
    } catch {
      setState("error");
    }
  }

  return (
    <section className="relative overflow-hidden bg-clay py-24 text-cream lg:py-32">
      <span
        aria-hidden
        className="pointer-events-none absolute -bottom-14 left-1/2 -translate-x-1/2 select-none whitespace-nowrap font-display text-[22vw] font-black leading-none text-transparent"
        style={{ WebkitTextStroke: "1px rgba(244,240,231,0.16)" }}
      >
        CARRY ON
      </span>

      <div className="relative mx-auto max-w-3xl px-5 text-center">
        <Reveal>
          <p className="text-[11px] font-bold uppercase tracking-[0.24em] text-cream/70">
            05 · The carry club
          </p>
          <h2 className="mt-4 font-display text-5xl font-medium leading-[1.02] lg:text-7xl">
            Letters worth <span className="italic">opening</span>
          </h2>
          <p className="mx-auto mt-6 max-w-[44ch] text-sm leading-relaxed text-cream/75">
            One slow email every Sunday. New drops, repair tutorials, packing
            philosophies and the occasional strong opinion about pockets.
          </p>
        </Reveal>

        <Reveal delay={120}>
          {state === "done" ? (
            <div className="mx-auto mt-10 flex w-fit items-center gap-3 rounded-full bg-cream px-7 py-4 text-sm font-bold text-ink">
              <CheckCircle2 className="size-5 text-clay" />
              You&apos;re in — first letter lands Sunday.
            </div>
          ) : (
            <form
              onSubmit={submit}
              className="mx-auto mt-10 flex max-w-md items-center rounded-full bg-cream p-1.5 shadow-xl"
            >
              <input
                required
                type="email"
                name="email"
                placeholder="you@somewhere.com"
                className="w-full flex-1 bg-transparent px-5 py-3 text-sm text-ink placeholder:text-ink/40"
              />
              <button
                type="submit"
                disabled={state === "loading"}
                className="group flex shrink-0 items-center gap-2 rounded-full bg-ink px-6 py-3 text-[11px] font-bold uppercase tracking-[0.2em] text-cream transition hover:bg-soot disabled:opacity-60"
              >
                {state === "loading" ? "Joining…" : "Join"}
                <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-1" />
              </button>
            </form>
          )}
          {state === "error" && (
            <p className="mt-4 text-sm font-semibold text-cream">
              Something went sideways — try again.
            </p>
          )}
        </Reveal>
      </div>
    </section>
  );
}
