# elisym.network

Landing site for [elisym.network](https://elisym.network) — React + TypeScript + Vite, pre-rendered to static HTML (SSG) and deployed to Vercel. `CLAUDE.md` is a symlink to this file.

## Commands

```
npm run dev       # Vite dev server
npm run build     # tsc -b + vite build + SSG (pre-renders all routes)
npm run lint      # oxlint
npm run preview   # serve dist/ locally
```

No test suite. **Run `npm run lint && npm run build` before considering any change done.** The parent `elisym/CLAUDE.md` mandates `bun qa` — it does not apply here. Tilde-versioning (`~`) for dependencies does apply.

## SSG architecture (the critical non-obvious part)

Every component renders twice — once in Node (SSG), once in browser (hydration). Three files form the contract:

- `src/entry-server.tsx` — `pages` map + `render(url)` for SSG (no router, renders page component directly)
- `src/Router.tsx` — wouter `<Route>` list for client navigation
- `scripts/ssg.ts` — walks `pages` map, writes `dist/<route>/index.html` + `sitemap.xml`

**New route = update both `entry-server.tsx` AND `Router.tsx`.** Nothing checks they match at build time.

## Rules that break the build

- **`import type { Foo }`** for type-only imports — `verbatimModuleSyntax: true`
- **No `enum`, parameter properties, value `namespace`** — `erasableSyntaxOnly: true`
- **No `window`/`document`/`navigator` at module scope or in render** — SSG runs in Node. Gate behind `useEffect` / event handlers only
- **No `typeof window !== "undefined"` branches in render** — initial render must match server output
- **No `Math.random()` / `Date.now()` in render** — hydration mismatch
- **No floating promises** — `void someAsync()` or await it (`no-floating-promises: error`)
- **No wouter hooks** (`useLocation`, `useRoute`, `<Link>`) in SSG-rendered components — no router context during SSG. Use plain `<a href>`
- **No `!` non-null assertions** — narrow with a check instead
- **`exhaustive-deps` is `error`**, not warn

## Gotchas

- **`id="white-block"` in `App.tsx` is load-bearing.** `Header.tsx` reads it on every scroll to toggle light/dark mode (logo, nav colors, backdrop). Don't rename or remove it
- **`font-sans` on headings does nothing.** `app.css` forces `Georgia, serif` on all `h1-h6`. To use Inter on a heading: `style={{ fontFamily: "'Inter', sans-serif" }}`
- **`NAV_LINKS` in `Header.tsx`** is the single source for nav items (desktop + mobile). Only edit there
- **`Hero.tsx` and `Header.tsx` use imperative ref-based DOM animation**, not React state. This is intentional — don't refactor into state-driven animations
- **`useState` defaults must be server-safe** (typically `false`/`null`). Update in `useEffect` after mount to avoid hydration mismatch
- **New keyframe animations need `@media (prefers-reduced-motion: reduce)` guard**
- **Vertical section padding is hand-tuned** per visual neighbor, not formulaic. Copy from the adjacent section, verify visually
- **Brand green `#1D9E75`** — use `bg-accent` / `text-accent` tokens, not the literal hex

## Project structure

- Vite alias `~` -> `src/` for cross-directory imports
- Tailwind CSS v4, config in `src/app.css` (`@theme`), no `tailwind.config.js`
- `src/config.ts` — external URLs and canonical site URL
- One component per file, PascalCase. Layout primitives in `src/components/Layout/`
- Icons are inline SVGs in JSX, not files in `/public`
- Two background contexts: dark (`#101012`) and white (`#white-block` wrapping `HowItWorks` + `FeaturedAgents`). Text colors must match the background — look at nearest existing section
- No state management lib, no Context, no UI kit, no animation lib — check `package.json` if unsure
- Compress images before committing (squoosh/tinypng)

## Adding a section

1. Create `src/components/MySection.tsx` — copy structure from nearest existing section
2. Import in `App.tsx`, inside or outside `#white-block` per background needed
3. Wrap in `<RevealSection>` for scroll fade-in
4. If nav target: add `id` + entry in `NAV_LINKS` (Header.tsx), add `scrollMarginTop: "100px"`
