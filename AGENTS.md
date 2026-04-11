# elisym.network

This file (`AGENTS.md`) is the canonical onboarding doc for AI agents (Claude Code, Cursor, Aider, Windsurf, etc.) and team members working in this repository. `CLAUDE.md` is a symlink to this file — Claude Code reads it via that name automatically.

See @README.md for the project overview and the public-facing scripts table, and @package.json for dependency versions.

## Project

`elisym-landing` is the public landing site for elisym.network (https://elisym.network) — a React + TypeScript + Vite app **pre-rendered to static HTML** at build time and deployed to Vercel. The "public" half of the project; the authenticated dashboard lives in `elisym-app`.

## General Code Principles

- **Code should be self-documenting.** Reserve comments for non-obvious trade-offs, not narration of what the code does.
- **Strong typing wherever possible.** Avoid `as` casts unless absolutely necessary. Non-null assertions (`!`) are forbidden — narrow with a check or refactor the type.
- **Meaningful names.** Full descriptive identifiers everywhere except `i`/`j`/`k` in loops. Prefer `items.map((agent) => ...)` over `items.map((a) => ...)`.
- **Don't manually fix lint/format/type errors.** Run `npm run lint` (and `npm run build` for type errors) and fix based on the actual output. Don't disable a rule inline without a good reason and a comment.

### What this site is NOT (current state)

Facts about the codebase **today** — not bans. None of these are off-limits, but the existing components don't assume any of them exist. Talk to the team before adding the first one.

- **No backend, no data fetching.** Auth/wallets/jobs belong in `elisym-app`; newsletter / GitHub stars / live counters are reasonable to add here.
- **No environment variables.** `src/config.ts` holds the only "config." Add `.env.local` if you need a key.
- **No forms, no auth, no cookies, no client-side storage.**
- **English only, no i18n library.** Copy is hardcoded; migrating touches every section.
- **Umami pageviews only — no custom analytics events.** Adding `umami.track(...)` is fine, just deliberate.

## Commands

- `npm run dev` — Vite dev server (CSR only, no SSG step)
- `npm run build` — full production build: `tsc -b` typecheck → `vite build` → `vite-node scripts/ssg.ts` (pre-renders every route in the `pages` map to `dist/<route>/index.html` and emits `dist/sitemap.xml`)
- `npm run lint` — `oxlint` (config in `.oxlintrc.json`)
- `npm run preview` — serve the built `dist/` locally
- `npm run clean` — `rm -rf dist`

There is no test suite. `npm run lint && npm run build` are the only verification gates — run both before considering a change done.

> The parent `elisym/CLAUDE.md` mandates `bun qa` as a universal verification command. **It does not apply here** — this repo uses plain npm scripts. The tilde-versioning rule from the parent CLAUDE.md does still apply to `package.json`.

## Architecture

The dual-entry SSG/CSR setup is the only non-obvious part of the codebase:

- **`src/main.tsx`** — browser entry. `hydrateRoot` mounts `<Router>` (wouter-based) onto pre-rendered HTML.
- **`src/entry-server.tsx`** — Node entry used by SSG. Exports a `pages` map and a `render(url)` function that calls `renderToString`. **It deliberately does not use a router** — it renders the page component directly.
- **`scripts/ssg.ts`** — runs after `vite build`. For each route in the `pages` map, renders to a string, injects into `dist/index.html`, writes per-route `dist/<route>/index.html`, and generates `sitemap.xml` (uses `siteUrl` from `src/config.ts`).

**Every component is rendered twice** — once in Node during SSG, once in the browser during hydration. The implications (no `window` in render, hydration-safe state defaults, wouter limitations, etc.) live in **Gotchas** and the **Hard rules** cheatsheet — they are not duplicated here.

- **Vite alias `~` → `src/`** (see `vite.config.ts`). Use `~/components/...` for cross-directory imports.
- **`App.tsx`** is a single long-scrolling page composed of section components from `src/components/`, each wrapped in `<RevealSection>` for the scroll fade-in.
- **Tailwind CSS v4** via `@tailwindcss/vite`. **No `tailwind.config.js`** — config lives in `src/app.css` (`@theme` + global rules).
- **`src/config.ts`** centralizes external URLs and the canonical site URL.

## TypeScript & lint constraints

Two settings in `tsconfig.app.json` produce errors that look surprising if you don't know they're enabled:

- **`verbatimModuleSyntax: true`** — every type-only import **must** use the `import type` form. `import { ReactNode } from "react"` will fail to compile; write `import type { ReactNode } from "react"`. The same applies to mixed imports — split them: `import { useState } from "react"; import type { ReactNode } from "react"`. Oxlint's `typescript/consistent-type-imports` rule enforces the same thing, so the autofix will usually rescue you.
- **`erasableSyntaxOnly: true`** — bans TypeScript constructs that emit runtime code (enums, parameter properties, namespaces with values). Use `const` objects + `as const` instead of enums; use plain class fields instead of parameter properties.
- **`noUnusedLocals` / `noUnusedParameters`** are on. Prefix with `_` to intentionally keep an unused parameter (`function foo(_event: MouseEvent)`); the oxlint config already whitelists the `^_` pattern.
- **`react/exhaustive-deps` is `error`, not `warn`.** Every value referenced inside a `useEffect`/`useCallback`/`useMemo` must be in the dependency array. Use `useCallback` to stabilize functions referenced from effects.
- **`typescript/no-floating-promises` is `error`.** Any promise-returning call must be `await`-ed, `.then()`-chained, or explicitly `void`-ed (`void someAsync()`). Click handlers that call async functions need `void` in front or an inner `async` IIFE.

## React conventions

**Project shape** (the truth lives in `package.json` and `src/`; this is just orientation):

- **State is purely local `useState`.** No state-management library installed.
- **No Context providers.** Introduce one only when ≥3 components genuinely need shared state.
- **No `index.ts` barrel files.** Import each component from its own file. (Convention, not a tree-shaking concern.)
- **One component per file**, PascalCase. `Hero.tsx` exports `Hero`. Layout primitives in `src/components/Layout/`.
- **Always use the `~` alias** for cross-directory imports; relative `./` only for same-folder siblings.
- **Refs over `getElementById`** for component-owned DOM. `Header.tsx`'s `getElementById("white-block")` is the one exception — that element lives in `App.tsx`.
- **Inline arrow functions in event handlers by default.** Reach for `useCallback` only when in an effect's dep list or passed to a memoized child.
- **No `React.memo` / `useMemo` without a measured problem.** Current sections are static enough that re-renders are free.
- **No UI kit, icon library, or animation library installed today** — check `package.json` if in doubt. The README's shadcn/ui mention is aspirational.

**Code-style rules:**

- **No `renderX()` helper functions inside components.** Extract into a separate component. (Assigning JSX to a `let` via control flow is fine — that's not a render helper.)
- **Props interface naming: `Props`**, not `MySectionProps`. Only use a longer name if the interface is exported and needs to be distinguishable at the import site. Most components keep props inline anyway.
- **Module-level constants: data → `UPPER_SNAKE_CASE`, style objects → `camelCase`.** See existing constants in `src/components/` for examples.

**React 19 + performance rules** (cherry-picked from Vercel React best practices):

- **Don't define components inside components.** A component declared in a parent's render body has a new identity on every render — children remount, state resets, refs detach. Hoist it to module scope.
- **Derive state during render, not in effects.** `const isOpen = items.length > 0` beats `useState` + `useEffect(() => setIsOpen(items.length > 0))`. Effects-for-derivation cause double renders and stale-state bugs.
- **Hoist static JSX (and SVG paths) outside the render body.** If a piece of JSX doesn't depend on props or state, declare it as a module-level constant — same reason as the `UPPER_SNAKE_CASE` data constants.
- **Conditional rendering: use `cond ? <X /> : null`, not `cond && <X />`.** `&&` will render the literal `0` or `""` to the DOM if `cond` is a number or empty string. Ternary is always safe.
- **Avoid boolean-prop proliferation** (`<Card primary outlined large icon dismissable />`). When a component grows three boolean props, split it into explicit variants or compose smaller pieces.
- **React 19: don't use `forwardRef`.** Refs are now passable as a regular prop: `function Button({ ref, ...props }) { return <button ref={ref} {...props} /> }`. The old `forwardRef` API still works but is deprecated.
- **React 19: prefer `use(MyContext)` over `useContext(MyContext)`** if you do introduce a Context. `use()` works inside conditionals and loops; `useContext` doesn't.

## Design tokens

All tokens live in `src/app.css` under `@theme` — Tailwind v4 picks them up automatically. Never hardcode brand colors when a token exists.

- **Brand accent** — the green `--color-accent` (and its `-hover` / `-dim` variants). Used for eyebrows, active states, focus outlines. Use `bg-accent` / `text-accent`, never the literal hex.
- **Surfaces** — `--color-surface` and `--color-surface-elevated` (dark greys). The page background is set on `body` directly, not as a token.
- **Status palettes** — standard Tailwind color names (`emerald-*`, `amber-*`, `blue-*`, `red-*`, `violet-*`) are pre-declared in `@theme` so the usual class names work.

**Intentionally raw colors in components** (don't promote unless reused in 3+ places): body text on dark, greys on the white block, and glass-morphism rgba values. The glass-morphism pattern is codified as `pillStyle` / `glassButtonStyle` in `Hero.tsx` and re-derived ad hoc in `Header.tsx` — lift to a shared module if you need it in a third place.

## Typography

- **Body / UI** — `Inter` (loaded from Google Fonts in `index.html`), set globally on `body`.
- **Headings** — `Georgia, serif` is forced on **all** `h1`–`h6` via a global rule in `app.css`. There is also a `--font-serif` token if you need it explicitly. Do not add `font-sans` to a heading expecting Inter — the global rule wins. If you want an Inter heading (e.g. card titles in `HowItWorks`), set `style={{ fontFamily: "'Inter', sans-serif" }}` inline, the same way existing components do.
- **Code / commands** — `'JetBrains Mono', monospace`, also loaded from Google Fonts. Used inline in copyable command pills.
- **Heading sizes are not in tokens — copy from the closest analogous section.** Most section `<h2>` follow a single shared pair of values; Hero `<h1>` is bigger; card titles are smaller. Two intentional outliers worth knowing about: **JoinCTA's `<h2>`** is intentionally bigger because the final CTA wants visual weight, and **Mission** uses a `<p>` instead of `<h2>` because it's an editorial quote.

## Responsive breakpoints

Mobile-first. Every section must look correct on a 360px phone before any prefix is added.

- **`sm:` (640px)** — main "tablet and up" jump in this codebase. Most padding/font/gap upgrades happen here. **When in doubt, use `sm:`.**
- **`md:` (768px)** — for grid column count switches in card layouts (`grid-cols-1 md:grid-cols-2|3`). Don't use it for spacing/typography.
- **`lg:` (1024px)** — desktop layout differences only (e.g. burger → inline nav, gradient direction flip). Not for typography tweaks.
- **`xl:` / `2xl:`** — unused today (`max-w-[1320px]` caps content near `xl`). Not forbidden; use only if you have a real visual problem on wide screens.
- **Custom `min-[900px]:`** breakpoints are fine when the standard tiers don't fit. Prefer the standard four when they do.

## Public assets & images

- **`/public` is the only static asset location** — Vite serves it at the root. No `import logo from "./logo.png"` patterns; reference assets by URL string.
- **Naming: `kebab-case.ext`.** Hero variants use suffixes (`hero-bg.png` / `.webp`); per-entity assets prefixed (`agent1-avatar.png`).
- **Large hero/banner images** ship as a `<picture>` with `.webp` primary + `.png` fallback (see `Hero.tsx`).
- **Smaller raster images** (avatars, logos) stay PNG. Don't add `.webp` for small files where the win isn't worth duplication.
- **Icons are inline SVGs in JSX**, not files in `/public`. Copy from an existing component.
- **Favicon set / `og-image.jpeg` / `site.webmanifest`** are referenced from `index.html`. If you replace any, regenerate the full set and verify `site.webmanifest` still points at valid files.
- **Compress before committing.** Git history has multiple "Decreased image size" commits — image weight has been a real problem. Run new PNG/JPEG through a compressor (squoosh, tinypng) before adding it.

## Accessibility minimums

These are not aspirational — the existing components already follow them, so violations stand out in review:

- **`<img>` always has a real `alt`.** Decorative images use `alt=""` (empty, not omitted). Logos use `alt="elisym"`.
- **Icon-only buttons and links require `aria-label`.** See the GitHub/Twitter links in `Header.tsx` and the burger button. Don't ship a clickable SVG without one.
- **Use semantic HTML.** Sections are `<section>` with an `id`, the page chrome is `<header>` / `<footer>` / `<nav>`. Don't reach for `<div>` when a sectioning element fits.
- **Don't override `:focus-visible`.** `app.css` defines a 2px brand-green outline for all `<a>` and `<button>` — that's the keyboard-nav indicator. Don't add `outline: none` anywhere without replacing it.
- **Respect `prefers-reduced-motion`.** Already handled for the existing reveal/hero animations in `app.css`. Any new keyframe animation must add a matching `@media (prefers-reduced-motion: reduce)` override.
- **Color contrast on the white block** — primary text needs strong contrast against white. Use the dark/mid greys established by existing components on the white block; the lightest greys are reserved for muted/secondary elements only.

## Section / page structure

The landing page is a stack of full-width sections. To stay visually coherent, every new section should follow this skeleton:

```tsx
<section id="kebab-id" className="py-[60px] sm:py-[100px] px-4 sm:px-6" style={{ scrollMarginTop: "100px" }}>
  <div className="mx-auto max-w-[1320px]">
    <div className="text-[11px] font-medium tracking-[0.1em] text-[#1D9E75] mb-3">
      SECTION EYEBROW
    </div>
    <h2 className="text-[28px] sm:text-[40px] text-white mb-3">Section title</h2>
    <p className="text-base text-[#888] mb-10">Optional subtitle…</p>
    {/* content */}
  </div>
</section>
```

Conventions baked into this skeleton:

- **Container width** is `max-w-[1320px]` centered. Hero (full-bleed rounded card) and JoinCTA are exceptions; new content sections should use `max-w-[1320px]`.
- **Vertical rhythm is hand-tuned, not formulaic.** Most sections use asymmetric `pt-[X] pb-[Y]` calibrated to their neighbors; a few are symmetric. **Copy padding from your visual neighbor**, not from this skeleton, then verify the gap by scrolling the rendered page.
- **Eyebrow** — uppercase, `tracking-[0.1em]`, brand green, `text-[11px]`. Above the `<h2>` in most sections; editorial-quote and full-bleed sections deliberately omit it.
- **`scrollMarginTop: "100px"`** required for nav targets (fixed header overlaps anchor scrolls). Set on the `<section>` or on a wrapping `<div>` if a parent component owns the id.
- **Anchor IDs** are kebab-case and must match `NAV_LINKS` in `Header.tsx`. Only nav targets need an `id`.

### Two background contexts: dark vs the "white block"

`App.tsx` wraps `HowItWorks` and `FeaturedAgents` in `<div id="white-block" className="bg-white rounded-[40px]">`. Everything else sits on the `#101012` page background. This split is structural — it drives several behaviors:

- **Text colors invert.** On dark sections, headings are `text-white`, body is `text-white/70`, muted is `text-[#888]` or `text-white/45`. On the white block, headings are `text-[#111]`, body is `text-[#888]`, muted is `text-[#bbb]`. Eyebrow color stays brand green in both.
- **Header auto-adapts** to the current background. `Header.tsx` measures `#white-block`'s position on every scroll and toggles `onLight` / `menuOnLight`, which swaps the logo (`logo.png` ↔ `logo-black.png`), the nav-link colors, the CTA fill, and the glass-vs-solid backdrop. **Do not remove the `#white-block` id** or rename it, and if you add another light-background section, extend the same detection logic rather than building a parallel one.
- A new section's `text-*` classes must match the background it lives on. Look at the nearest existing section in the same context before authoring colors.

### Adding a section to the existing page

1. Create `src/components/MySection.tsx` following the skeleton above.
2. Import it into `App.tsx`, inside or outside the `#white-block` div per the background you want.
3. Wrap the JSX in `<RevealSection>` for the standard scroll fade-in.
4. If it's a nav target, add an `id` and append `{ label, href }` to the `NAV_LINKS` constant in `Header.tsx`.

### Adding a new page (route)

The dual-entry SSG architecture means a new route requires two touch-points:

1. **Create the page component** (e.g. `src/pages/About.tsx`).
2. **Register it for SSG** — add it to the `pages` map in `src/entry-server.tsx`. This is what `scripts/ssg.ts` walks; if you skip this, the page won't be pre-rendered and `/about/index.html` won't exist in `dist/`.
3. **Register it for client navigation** — add a `<Route>` in `src/Router.tsx` so wouter resolves it after hydration. **Nothing checks at build time that this matches the `pages` map** — see the warning in Architecture.
4. The new page should reuse `Header` / `Footer` and the same section skeleton so it visually belongs to the site. SEO meta tags currently live only in `index.html` and apply to every pre-rendered page; per-page `<title>`/`<meta>` injection does not exist yet — if you need it, add it to `scripts/ssg.ts` rather than reaching for a head-management library.

## Animation & interaction conventions

- **Easings** — the codebase uses two main curves: a soft "ease-in-out-like" `cubic-bezier(0.25, 0.1, 0.25, 1)` for content transitions (reveals, hero entrance, slow zoom), and a sharper `cubic-bezier(0.4, 0, 0, 1)` for layout-morphing (header collapse, tab pill slide, mobile menu). One section uses an "expo-out" `cubic-bezier(0.16, 1, 0.3, 1)` for card-grid entrance — match it if you build something similar, otherwise prefer one of the first two. Don't introduce a fourth easing without a reason.
- **Scroll reveal** — wrap new sections in `<RevealSection>`. The `.reveal` / `.reveal-children` CSS classes + `useReveal` are the only declarative primitives.
- **Reduced motion** — already handled in `app.css`. Any new keyframe animation must include a `@media (prefers-reduced-motion: reduce)` override.
- **Inline styles vs Tailwind** — inline `style={{...}}` for anything dynamic (computed positions, glass blur, gradient overlays); Tailwind for static layout/spacing/typography. Match the surrounding pattern. If you systematize a recurring inline pattern (e.g. lift glass-morphism into `~/styles/glass.ts`), do it deliberately across all call sites, not piecemeal.

## Gotchas

Non-obvious failure modes that have already tripped someone up — or are likely to. Skim this list when something behaves "weirdly."

- **Hydration mismatch from server-vs-client state defaults.** `Header.tsx` defaults `scrolled`/`menuOpen`/`onLight`/`menuOnLight` to `false` because the SSG render happens on a server with no scroll position and no DOM. Any `useState` whose initial value would differ between server and client will throw a hydration mismatch and discard the pre-rendered HTML. Pattern: default to the server-safe value, update inside `useEffect` after mount.
- **Touching `window` in render or at module scope crashes the build.** Not just dev — `npm run build` runs `vite-node scripts/ssg.ts` which executes every component in Node. A bare `const x = window.innerWidth` at module top throws `ReferenceError: window is not defined`. Always gate browser globals behind `useEffect` / event handlers.
- **`pages` map and `<Route>` list silently desync.** Nothing checks at build time that `src/entry-server.tsx`'s `pages` map and `src/Router.tsx`'s `<Route>` list agree. If `pages` has `/about` but `Router.tsx` doesn't, SSG will produce `dist/about/index.html` (and `npm run build` will succeed) but client-side navigation to `/about` will fall through to the wouter fallback. Always update both.
- **`#white-block` id is load-bearing for the header.** `Header.tsx` calls `document.getElementById("white-block")` on every scroll to flip light/dark mode (logo, nav text, CTA fill, glass backdrop). Renaming or removing the id silently breaks the header on the white sections. There's no test for this — it's only visible in the browser.
- **Adding a section to the nav requires editing one place: the `NAV_LINKS` constant** at the top of `Header.tsx`. Both desktop nav and mobile dropdown read from it. (Earlier versions of this codebase had two duplicated arrays — if you see a PR that re-introduces the duplication, push back.)
- **Tailwind `font-sans` on a heading does nothing.** `app.css` has a global `h1, h2, h3, h4, h5, h6 { font-family: Georgia, serif }` rule that wins against any class. To make a heading use Inter, set `style={{ fontFamily: "'Inter', sans-serif" }}` inline (see `HowItWorks.tsx` card titles).
- **`useLayoutEffect` logs a warning during SSG** but does not crash. `HowItWorks.tsx` uses it intentionally for the sliding tab pill (it needs pre-paint measurement on the client). The console warning during `vite build` is expected. Prefer `useEffect` unless you specifically need `useLayoutEffect`'s timing.
- **Wouter is not active during SSG.** `entry-server.tsx` renders the page component directly without `<Router>`. Components that call `useLocation`/`useRoute`/`useParams` or render `<Link>` will misbehave when pre-rendered. Use plain `<a href="/foo">` for navigation; wouter intercepts it after hydration.
- **`Hero.tsx` and `Header.tsx` animate via direct DOM mutation through refs**, not via React state or framer-motion. This is intentional (12s slow zoom, staggered children entrance, header morph-on-scroll). It looks like "non-React code" — don't refactor it into state-driven animations.
- **JoinCTA's `<h2>` is intentionally bigger** than other section `<h2>`s — the final CTA wants extra visual weight. Not a bug to "normalize."
- **One section uses an "expo-out" easing** (`cubic-bezier(0.16, 1, 0.3, 1)`) for card-grid entrance that no other component uses. If you copy from a section with grid cards, you may inherit it — copy from elsewhere if you want consistency.
- **Vertical section padding is hand-tuned, not formulaic.** Most sections use asymmetric `pt-[X] pb-[Y]` calibrated to their visual neighbors. Don't try to "normalize" them — copy padding from the section that will be the new section's neighbor, then verify the gap visually.
- **Per-page `<title>` / `<meta>` tags do not exist.** Every pre-rendered route gets the same SEO tags from `index.html`. If you add a second page that needs distinct metadata, extend `scripts/ssg.ts` to inject per-route head tags from a manifest — don't reach for `react-helmet`.

## Environment

No environment variables are required to build, run, or deploy this project. There is no `.env`, no `.env.local`, no `import.meta.env` usage anywhere in `src/`. If you add an integration that needs a key (e.g., a newsletter signup), create `.env.local` (already in `.gitignore`) and document the key in `src/config.ts`.

## Deployment

`vercel.json` configures Vercel; the build output is `dist/`. Umami analytics is loaded via `<script>` tag in `index.html` — preserve it when editing the HTML template.

## Hard rules — quick reference

Non-negotiable rules enforced by config, web standards, or load-bearing structure. Soft conventions live inline above.

**Will break the build or hydration:**

- `import type { Foo }` for type-only imports (never `import { Foo }`) — `verbatimModuleSyntax: true`
- No TypeScript `enum`, parameter properties, or value-emitting `namespace` — `erasableSyntaxOnly: true`
- No `window`/`document`/`navigator`/`IntersectionObserver`/`matchMedia` at module scope or in render — only inside `useEffect` / event handlers / refs
- No `typeof window !== "undefined"` branches in render — initial render must match server output
- No `Math.random()` / `Date.now()` / locale-formatted strings in render
- No floating promises — `void someAsync()` or inner `async` IIFE (`no-floating-promises: error`)
- No unused locals/params (prefix with `_` if intentional)
- No wouter hooks (`useLocation`, `useRoute`, `<Link>`) in pre-rendered components — no router context during SSG
- No `!` non-null assertions (forbidden as a project rule, not by config)

**Will break visual design or accessibility:**

- Don't override `:focus-visible` or set `outline: none` without a replacement
- New keyframe animations must include a `@media (prefers-reduced-motion: reduce)` guard
- Icon-only `<button>` / `<a>` requires `aria-label`
- `<img>` requires `alt` (use `alt=""` if decorative)
- Brand green `#1D9E75` → use the `accent` token (`bg-accent`, `text-accent`)
- Heading-on-Inter → inline `style={{ fontFamily: "'Inter', sans-serif" }}`, not `font-sans` (the global rule wins)

**Load-bearing — touch with care:**

- `src/entry-server.tsx`, `src/Router.tsx`, `scripts/ssg.ts` — the SSG/CSR contract
- `src/app.css` — design tokens, global typography rules, animation primitives
- `src/components/Layout/Header.tsx` — background-aware chrome with non-trivial scroll logic and imperative ref animations
- `src/components/Hero.tsx` — imperative ref-driven entrance animations; not a typical React component
- `index.html` — SEO meta, structured data, Umami script, font preconnects
- The `id="white-block"` in `App.tsx` and the `NAV_LINKS` constant in `Header.tsx` (see Gotchas)

Section components in `src/components/*.tsx` (other than `Hero.tsx`) are independent and safe to edit freely.
