<!--
  Purpose: Provide concise, actionable guidance to AI coding agents working in this repo.
  Keep this file short (20-50 lines) and strictly tied to discoverable project facts.
-->

# Copilot / AI agent instructions — contact-manager-app

- Project type: Next.js (app router) TypeScript project located under `src/app`.
- Important files: `src/app/layout.tsx`, `src/app/page.tsx`, `src/app/globals.css`.
- Scripts (use these exact commands):
  - Development: `npm run dev` (starts Next dev server on http://localhost:3000)
  - Build: `npm run build`
  - Start (production preview): `npm run start`
  - Lint: `npm run lint` (calls `eslint`)

Key project-specific knowledge for code changes
- Next.js version: `16.2.0` (see `package.json`). This repo includes an embedded warning
  in `AGENTS.md` that Next.js v16 has breaking changes — consult `node_modules/next/dist/docs/`
  if you rely on runtime or routing behavior that differs from public training data.

- App router conventions: this project uses the app directory (`src/app`). Add new pages,
  layouts or nested routing under `src/app`. Server Components are the default — add
  `"use client"` at the top of a file when a client component is required.

- Styling: Tailwind is configured and imported in `src/app/globals.css` via
  `@import "tailwindcss"`. Prefer utility classes in JSX; keep global CSS limited to
  theme variables and resets (see `globals.css`).

- Fonts: `next/font` is used in `layout.tsx` (Geist/Geist_Mono). Follow that pattern
  when adding fonts — export variables and apply them on the `<html>` root class.

Repository conventions and patterns
- TypeScript is enabled (see `tsconfig.json`); keep component props typed.
- Image assets live in `public/` (examples: `next.svg`, `vercel.svg`). Use `next/image`
  for optimized images (see `page.tsx` example).
- No API routes detected in the current repo state. If adding server endpoints for
  contact data, add them under `src/app/api` following Next.js app-router conventions.

What to avoid / quick gotchas
- Don't assume older Next.js conventions (pages directory, getServerSideProps) —
  the app router and server components change patterns.
- When editing layout or global CSS, keep CSS variables names consistent with
  `globals.css` (e.g., `--background`, `--foreground`, `--font-geist-sans`).

Examples (copyable patterns)
- Client component header (if you need client interactivity):
  ```tsx
  "use client";
  export default function Widget() { /* ... */ }
  ```
- Adding a new route: create `src/app/my-route/page.tsx` (export default component).

If anything in this file is unclear or you want the agent to include additional
rules (tests, preferred lint rules, API shape examples), tell me what to add and
I will iterate.
