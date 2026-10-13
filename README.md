# PORTÉ — Carry Goods Atelier

An award-caliber e-commerce experience for a brand selling **bags, lunchboxes, shoes and travel gear** — designed slowly in Lisboa, carried everywhere else.

Built with **Next.js 16 (App Router)**, **PostgreSQL + Drizzle ORM**, **Tailwind CSS v4**, **Lenis** smooth scrolling and **Lucide** icons.

## Features

- Editorial home page: parallax hero, category mosaic, scroll-driven horizontal product showcase, craft story, testimonials, newsletter
- Full catalog with **server-side filtering, sorting and search** (`/shop?category=bags&sort=price-asc&q=tote`)
- Product detail pages with color swatches, quantity stepper, accordions and related items
- **Cart drawer** with localStorage persistence + free-shipping progress, and a **3-step checkout** that writes real orders to Postgres
- API routes: `GET /api/products`, `POST /api/orders`, `POST /api/newsletter`
- 18 seeded products across 4 collections

## Getting started

```bash
npm install

# configure Postgres, then:
cp .env.example .env        # set DATABASE_URL

npx drizzle-kit push        # create tables
npx tsx src/db/seed.ts      # seed the 18-piece catalog

npm run dev
```

## Live demo (GitHub Pages)

A **static export** of the storefront is published on GitHub Pages:

**https://brightzorbari1.github.io/porte-shop/**

In the static build, pages are pre-rendered from the database at build time
and the cart is fully client-side (checkout + newsletter are confirmed
locally instead of hitting `/api/*`).

To re-publish after changes (requires Postgres running + seeded locally):

```bash
GITHUB_TOKEN=<token-with-repo-scope> bash scripts/publish-gh-pages.sh
```

For the **full-stack** experience (real orders written to Postgres, live
search APIs), run the app on a Node host (Vercel/Railway/Fly) with a hosted
Postgres — no code changes needed.

## Scripts

| command | purpose |
| --- | --- |
| `npm run dev` | start the dev server |
| `npm run build && npm start` | production build / serve |
| `STATIC_EXPORT=1 npm run build` | static GitHub Pages build → `./out` |
| `npx drizzle-kit push` | apply schema to the database |
| `npx tsx src/db/seed.ts` | (re)seed products |
