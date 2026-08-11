# JulianMesa Real Estate

A modern, motion-rich real estate website built with Next.js 14 (App Router), TypeScript, Tailwind CSS, and Framer Motion. Editorial typography, scroll-triggered reveals, magnetic buttons, a custom cursor, and buttery smooth scrolling.

## Getting started

```bash
npm install
```

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Other scripts

```bash
npm run build
```

```bash
npm run start
```

```bash
npm run lint
```

## Tech stack

| Concern | Choice |
| --- | --- |
| Framework | Next.js 14 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS |
| Animation | Framer Motion |
| Smooth scroll | Lenis |
| Fonts | Poppins via `next/font/google` |

## Project structure

```
app/
  layout.tsx              Root layout: fonts, metadata, nav/footer, providers
  page.tsx                Home
  listings/page.tsx       Filterable listings index
  listings/[slug]/page.tsx Property detail (statically generated)
  about/page.tsx          About
  contact/page.tsx        Contact
  globals.css             Theme tokens, base type, grain overlay
components/
  Navbar, Footer, Cursor, SmoothScroll, PageTransition
  PropertyCard, PropertyGallery, ListingsGrid, MortgageCalculator
  Button, SectionHeading, AnimatedText, ImageReveal, StatCounter, Testimonial
  SearchBar, ContactForm
data/
  properties.ts           10 mock listings + lookup helpers
  agents.ts               Agent profiles
  testimonials.ts         Client testimonials
types/
  property.ts             Property & Agent interfaces
lib/
  utils.ts                cn(), formatPrice(), formatNumber()
```

## Design system

Colors are defined both as Tailwind theme tokens and CSS variables in `app/globals.css`.

| Token | Value | Role |
| --- | --- | --- |
| `navy` | `#0A2540` | Dominant brand color |
| `navy-light` | `#1B3A5B` | Hover / secondary surfaces |
| `brown` | `#6B4E3D` | Warm accent |
| `brown-light` | `#A9825E` | Accent highlight |
| `cream` | `#F7F5F2` | Off-white background |
| `paper` | `#FFFFFF` | Cards and elevated surfaces |

Headings use Poppins Bold (700) with tight letter-spacing; body copy uses 400/500/600.

## Data layer

All listing data lives in `data/properties.ts` and is typed by the `Property` interface in `types/property.ts`. Pages read through the helpers (`getPropertyBySlug`, `getFeaturedProperties`, `getRelatedProperties`) rather than touching the array directly, so swapping in a real API or CMS means reimplementing those helpers and leaving the components unchanged.

Property images are hosted on Unsplash. `images.unsplash.com` is allowlisted in `next.config.mjs` under `images.remotePatterns` — add any new image host there.

## Accessibility & SEO

- Semantic landmarks (`header`, `main`, `footer`, `nav`, `address`) and a single `h1` per page.
- Form fields have associated labels plus `aria-invalid` / `aria-describedby` wired to inline error messages.
- The custom cursor is disabled on touch and coarse-pointer devices, restoring the native cursor.
- `prefers-reduced-motion` collapses animation and transition durations.
- Scroll reveals are inline `opacity: 0` styles applied during SSR; a `no-js` class on `<html>` (removed by an inline script) forces content visible if JavaScript never runs.
- Per-page `metadata` exports drive titles, descriptions, and Open Graph/Twitter cards. Update `metadataBase` in `app/layout.tsx` before deploying to a real domain.

## Notes

- `tsconfig.json` targets `ES2017` so `Set` iteration in the listings filters compiles without `downlevelIteration`.
- The contact form is client-side only; it validates and simulates a send. Wire `handleSubmit` in `components/ContactForm.tsx` to a real endpoint or server action to deliver messages.
- The property detail map is a styled placeholder showing the address and coordinates — drop in Google Maps or Mapbox where that block sits.
