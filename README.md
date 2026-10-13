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

## Scripts

| command | purpose |
| --- | --- |
| `npm run dev` | start the dev server |
| `npm run build && npm start` | production build / serve |
| `npx drizzle-kit push` | apply schema to the database |
| `npx tsx src/db/seed.ts` | (re)seed products |
