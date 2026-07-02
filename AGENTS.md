# AGENTS.md

## Cursor Cloud specific instructions

This is a single static frontend app (React 19 + TypeScript + Vite 6 + Tailwind CSS v4). There is no backend, database, or external service — only the Vite dev server is needed to run the product end to end.

- Standard commands live in `package.json` (`dev`, `build`, `lint`, `preview`, `format`, `format:check`). No test framework is configured.
- Dev server: `npm run dev` serves at `http://localhost:5173/silas-henrique/`. Note the `/silas-henrique` base path (set in `vite.config.ts`); the bare `/` root returns 404, so always include the base path when opening the app or curling it.
- Build (`npm run build`) runs `tsc -b` first, then `vite build`, so it will also catch TypeScript type errors.
