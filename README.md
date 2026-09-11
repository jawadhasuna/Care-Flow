# New England CareFlow — company website

Marketing site for **New England CareFlow LLC**. Layout follows the classic
medical-company pattern: full-screen photo hero, alternating white and
parallax-photo sections, thin uppercase headings, outline pill buttons.

## Run it locally

```bash
npm install
```

```bash
npm run dev
```

Then open <http://localhost:3000>.

## Deploy

Hosted on Vercel. Push to GitHub, import the repo at <https://vercel.com/new>,
and accept the defaults — Vercel detects Next.js on its own.

## Where things live

```
src/
  app/
    page.tsx            home
    about/ products/ research/ contact/
    layout.tsx          fonts, header, footer, smooth scroll
    globals.css         brand tokens (navy #052C52, seagreen #04ACAF)
    manifest.ts         "Add to Home Screen" name + icons
  components/
    Logo.tsx            NC mark + wordmark (same artwork as Visual Notes)
    SiteHeader.tsx      white top bar, dropdown menus, mobile menu
    Hero.tsx            first screen
    PhotoSection.tsx    full-bleed parallax photo band
    Section.tsx         white sections, headings, pill buttons
    Blocks.tsx          team, method steps, study numbers
    motion/             Reveal (fade-up on scroll), SmoothScroll (Lenis)
  lib/site.ts           company facts, nav, team — edit text here
  assets/photos/        background photos
  assets/team/          team portraits
```

## Stack

- **Next.js 16** (App Router) + React 19 + TypeScript
- **Tailwind CSS v4**
- **motion** — fade-ins and parallax
- **lenis** — smooth scrolling

All animation respects the visitor's reduced-motion setting.

## Photo credits

All photos are from [Unsplash](https://unsplash.com) under the Unsplash
License (free for commercial use, attribution not required).

| File | Photographer | Unsplash id |
|---|---|---|
| `hero.jpg` | Piron Guillaume | `y5hQCIn1c6o` |
| `documentation.jpg` | National Cancer Institute | `NFvdKIhxYlU` |
| `monitor.jpg` | Jair Lázaro | `0lrJo37r6Nk` |
| `nurse.jpg` | SJ Objio | `8hHxO3iYuU0` |
| `iv-stand.jpg` | Marcelo Leal | `6pcGTJDuf6M` |
| `hallway.jpg` | Luis Melendez | `Pd4lRfKo16U` |
| `icu.jpg` | Richard Catabay | `05kHY7AYCp8` |
