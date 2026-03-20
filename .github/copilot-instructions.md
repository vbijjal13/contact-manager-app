<!--
  Purpose: Provide concise, actionable guidance to AI coding agents working in this repo.
  Keep this file short (20-50 lines) and strictly tied to discoverable project facts.
-->

# Copilot / AI agent instructions — contact-manager-app

- Project type: Next.js (app router) TypeScript project located under `src/app`.
- Important files: `src/app/layout.tsx`, `src/app/page.tsx`, `src/app/globals.css`.
- Scripts (use these exact commands):
  - Development: `npm run dev` (starts Next dev server on http://localhost:3000)
  <!--
    Copilot / AI agent instructions — contact-manager-app
    Short, actionable facts for code changes in this repo.
  -->

  # Quick facts
  - Project: Next.js (app router) + TypeScript under `src/app` (Next 16.2.0).
  - Tailwind is used; global styles in `src/app/globals.css`.
  - Important files: `src/app/layout.tsx`, `src/app/page.tsx`, `src/app/register/page.tsx`, `src/app/login/page.tsx`.
  - Shared helpers/components:
    - Validators: `src/app/_helpers/validator.ts` (email/password validation)
    - Icons: `src/app/_components/Icons.tsx` (Eye/EyeOff)

  # Scripts (use these exact commands)
  - Development: `npm run dev` (Next dev on http://localhost:3000)
  - Build: `npm run build`
  - Start (production): `npm run start`
  - Lint: `npm run lint` (ESLint)
  - Tests: `npm run test` (runs Vitest unit tests)

  # Conventions / gotchas
  - App router + Server Components by default — add `"use client"` for client behavior.
  - Keep component props typed (TypeScript). Place new routes under `src/app`.
  - `package.json` sets `"type": "module"`; Node ESM semantics apply for scripts/tests.

  # Patterns
  - Client component header:
    ```tsx
    "use client";
    export default function Widget() { /* ... */ }
    ```
  - Add a new route: `src/app/my-route/page.tsx` (export default component).
  - Reuse validators/icons from the shared paths above.

  If you want more rules (testing patterns, API shapes, or stricter lint rules), say which and I will extend this file.
