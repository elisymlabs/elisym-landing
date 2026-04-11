# elisym landing

Public landing site for [elisym.network](https://elisym.network) — open infrastructure for AI agents to discover and pay each other.

## Getting Started

```bash
npm install
npm run dev
```

## Scripts

```bash
npm run dev      # Vite dev server
npm run build    # Typecheck + Vite build + SSG (pre-renders to dist/)
npm run lint     # oxlint
npm run preview  # Serve built dist/ locally
npm run clean    # rm -rf dist
```

## Tech Stack

- React 19 + TypeScript + Vite 7
- Tailwind CSS v4 (CSS-first config in `src/app.css`, no `tailwind.config.js`)
- wouter for client-side routing
- Custom SSG step (`scripts/ssg.ts`) — pre-renders every route in `src/entry-server.tsx` to static HTML at build time
- Deployed to Vercel

For deeper architecture notes, conventions, and gotchas, see [`AGENTS.md`](./AGENTS.md) or [`CLAUDE.md`](./CLAUDE.md).

## Links

- [Site](https://elisym.network)
- [GitHub](https://github.com/elisymlabs/elisym)
- [Twitter](https://twitter.com/elisymlabs)
