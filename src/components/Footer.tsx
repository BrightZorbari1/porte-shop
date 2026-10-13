import Link from "next/link";

const COLS = [
  {
    title: "Shop",
    links: [
      ["All products", "/shop"],
      ["Bags", "/shop?category=bags"],
      ["Lunchboxes", "/shop?category=lunch"],
      ["Shoes", "/shop?category=shoes"],
      ["Travel", "/shop?category=travel"],
    ],
  },
  {
    title: "Company",
    links: [
      ["Our story", "/about"],
      ["Atelier visits", "/about#atelier"],
      ["Journal", "/about"],
      ["Careers", "/about"],
    ],
  },
  {
    title: "Support",
    links: [
      ["Shipping & delivery", "/about"],
      ["Returns & exchanges", "/about"],
      ["Lifetime repairs", "/about"],
      ["Contact us", "/about"],
    ],
  },
] as const;

const SOCIALS: { label: string; path: string }[] = [
  {
    label: "Instagram",
    path: "M7.75 2h8.5A5.75 5.75 0 0 1 22 7.75v8.5A5.75 5.75 0 0 1 16.25 22h-8.5A5.75 5.75 0 0 1 2 16.25v-8.5A5.75 5.75 0 0 1 7.75 2Zm0 1.5A4.25 4.25 0 0 0 3.5 7.75v8.5a4.25 4.25 0 0 0 4.25 4.25h8.5a4.25 4.25 0 0 0 4.25-4.25v-8.5a4.25 4.25 0 0 0-4.25-4.25h-8.5ZM12 7a5 5 0 1 1 0 10 5 5 0 0 1 0-10Zm0 1.5a3.5 3.5 0 1 0 0 7 3.5 3.5 0 0 0 0-7Zm5.25-2.75a1 1 0 1 1 0 2 1 1 0 0 1 0-2Z",
  },
  {
    label: "X",
    path: "M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231 5.45-6.231Zm-1.161 17.52h1.833L7.084 4.126H5.117l11.966 15.644Z",
  },
  {
    label: "YouTube",
    path: "M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814ZM9.545 15.568V8.432L15.818 12l-6.273 3.568Z",
  },
];

export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-ink text-cream">
      <div className="mx-auto max-w-7xl px-5 pb-8 pt-20 lg:px-10">
        <div className="grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <p className="font-display text-3xl font-black tracking-tight">
              PORTÉ<span className="text-clay">.</span>
            </p>
            <p className="mt-4 max-w-[38ch] text-sm leading-relaxed text-cream/55">
              Bags, lunchboxes, shoes and travel gear — designed slowly in
              Lisboa, carried quickly everywhere else. Every stitch guaranteed
              for life.
            </p>
            <div className="mt-7 flex gap-3">
              {SOCIALS.map((s) => (
                <a
                  key={s.label}
                  href="#"
                  aria-label={s.label}
                  className="flex size-11 items-center justify-center rounded-full border border-cream/20 transition-all duration-300 hover:border-clay hover:bg-clay"
                >
                  <svg viewBox="0 0 24 24" className="size-4 fill-current">
                    <path d={s.path} />
                  </svg>
                </a>
              ))}
            </div>
          </div>
          {COLS.map((col) => (
            <div key={col.title} className="lg:col-span-2">
              <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-cream/40">
                {col.title}
              </p>
              <ul className="mt-5 space-y-3">
                {col.links.map(([label, href]) => (
                  <li key={label}>
                    <Link
                      href={href}
                      className="u-link text-sm text-cream/70 transition hover:text-cream"
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
          <div className="lg:col-span-1" />
        </div>

        <div
          className="mt-20 select-none text-center font-display text-[18vw] font-black leading-[0.78] tracking-tight text-transparent lg:text-[15rem]"
          style={{ WebkitTextStroke: "1px rgba(244,240,231,0.22)" }}
        >
          PORTÉ
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-cream/10 pt-7 text-[11px] uppercase tracking-[0.18em] text-cream/40 sm:flex-row">
          <p>© 2026 Porté Carry Goods — Lisboa, PT</p>
          <div className="flex gap-6">
            <a href="#" className="transition hover:text-cream">
              Privacy
            </a>
            <a href="#" className="transition hover:text-cream">
              Terms
            </a>
            <a href="#" className="transition hover:text-cream">
              Cookies
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
