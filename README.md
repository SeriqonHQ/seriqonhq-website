# Seriqon

Production-ready marketing website for **Seriqon** — intelligent automation for healthcare clinics and small businesses.

> More time for what matters.

## Tech Stack

- **Next.js 15** (App Router)
- **TypeScript**
- **Tailwind CSS v4**
- **React 19**

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

## Scripts

| Command         | Description              |
| --------------- | ------------------------ |
| `npm run dev`   | Start development server |
| `npm run build` | Production build         |
| `npm run start` | Start production server  |
| `npm run lint`  | Run ESLint               |

## Project Structure

```
src/
├── app/
│   ├── globals.css      # Design tokens & animations
│   ├── layout.tsx       # Root layout with SEO metadata
│   └── page.tsx         # Homepage
├── components/
│   ├── layout/          # Navbar, Footer
│   ├── sections/        # Hero, Features, Services, FAQ, etc.
│   └── ui/              # Button, Card, Section primitives
└── lib/
    ├── site.ts          # Site config & metadata
    └── utils.ts         # Utility helpers
```

## Sections

- **Hero** — Mission statement with primary CTA
- **Features** — Six capability cards
- **Why Seriqon** — Value cards and differentiators
- **Services** — Seriqon Inbox™, Voice™, Workflow Automation, AI Knowledge Bases
- **FAQ** — Accordion with common questions
- **CTA** — Conversion banner
- **Contact** — Lead capture form

## Deployment

Deploy to [Vercel](https://vercel.com) or any platform that supports Next.js:

```bash
npm run build
```

## License

Private — Seriqon © 2026
