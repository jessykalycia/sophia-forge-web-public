# Sophia Forge

**Forge your pipeline.**

Sophia Forge is the studio operations platform built for your studio. Asset management, task tracking, real-time collaboration, and AI-powered workflows — all connected, all coherent, all in one place. A [Sophia Foundry](https://sophiafoundry.com) product.

## Sections

- **Hero** — Full-viewport headline with CTA and animated scroll indicator
- **What Is Sophia Forge** — Centered prose block describing the platform
- **Feature Pillars** — Six cards: Asset Sync, Task Tracking, Real-Time Collaboration, AI Workflows, Unreal Engine 5, More Engines
- **Founder Quote** — Statement from Jessyka Gavião
- **Early Access Waitlist** — Email capture form (powered by Resend)
- **Footer** — Sophia Foundry link, email, language selector

## Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Styling:** Tailwind CSS (dark theme, green accents)
- **Typography:** Raleway, Figtree, Space Mono (Google Fonts)
- **Localization:** next-intl (11 locales)
- **Animations:** Framer Motion
- **Email:** Resend (waitlist confirmation + notification)
- **Hosting:** Vercel

## Getting Started

```bash
# Install dependencies
npm install

# Copy environment variables
cp .env.example .env

# Run development server (default port: 3101)
npm run dev
```

Open [http://localhost:3101](http://localhost:3101) to view the site.

The port is configurable via the `PORT` variable in `.env`.

## Project Structure

```
src/
├── app/
│   ├── [locale]/          # Locale-scoped single page
│   │   ├── layout.tsx
│   │   └── page.tsx
│   ├── api/waitlist/      # Waitlist email API route (Resend)
│   └── globals.css
├── components/            # Navbar, footer, language switcher, motion, waitlist form
├── i18n/                  # Locale config, routing, request handling
├── messages/              # Translation JSON files (11 locales)
└── middleware.ts          # next-intl locale detection and routing
```

## Localization

11 languages: English, Portuguese (Brazil), Chinese (Simplified), Japanese, Korean, German, French, Spanish, Russian, Italian, and Turkish.

Locale detection and prefix routing are handled automatically via `next-intl` middleware.

## Environment Variables

| Variable | Description |
|---|---|
| `PORT` | Dev server port (default: 3101) |
| `RESEND_API_KEY` | Resend API key for waitlist emails |

## License

All rights reserved. Copyright Sophia Foundry.
