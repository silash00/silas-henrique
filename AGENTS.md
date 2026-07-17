# AGENTS.md

## Cursor Cloud specific instructions

This is a single static frontend app (React 19 + TypeScript + Vite 8 + Tailwind CSS v4). There is no backend, database, or external service — only the Vite dev server is needed to run the product end to end.

- Node.js is pinned to Active LTS major `24` via `.nvmrc` and `package.json` `engines` (`^24.0.0`). CI/deploy read `.nvmrc`.
- Standard commands live in `package.json` (`dev`, `build`, `lint`, `preview`, `format`, `format:check`, `check`). No test framework is configured.
- Dev server: `npm run dev` serves at `http://localhost:5173/` (`base: '/'` in `vite.config.ts`).
- `npm run check` runs typecheck (`tsc -b`), ESLint, and Prettier check — use this before claiming work is done.
- Build (`npm run build`) runs `tsc -b` first, then `vite build`, so it will also catch TypeScript type errors.
- PRs to `main` run the CI workflow (`.github/workflows/ci.yml`); pushes to `main` build and deploy to GitHub Pages.
