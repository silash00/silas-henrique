# Silas Henrique — Site pessoal (v1)

Portfólio estático de [Silas Henrique](https://silashenrique.dev), construído com React 19, TypeScript, Vite 8 e Tailwind CSS v4.

## Stack

| Camada | Tecnologia |
| --- | --- |
| UI | React 19 + TypeScript |
| Build | Vite 8 |
| Estilo | Tailwind CSS v4 (`@tailwindcss/vite`) |
| Motion | GSAP (`@gsap/react`) + Framer Motion |
| UI primitives | Headless UI |
| Runtime | Node.js 24 (Active LTS) — ver `.nvmrc` |

## Pré-requisitos

- Node.js `^24.0.0` (recomendado via [nvm](https://github.com/nvm-sh/nvm): `nvm use`)
- npm (vem com o Node)

O projeto usa o registry público do npm (`.npmrc`).

## Scripts

| Comando | Descrição |
| --- | --- |
| `npm run dev` | Servidor de desenvolvimento em `http://localhost:5173/` |
| `npm run build` | Typecheck (`tsc -b`) + build de produção |
| `npm run preview` | Serve a build localmente |
| `npm run lint` | ESLint |
| `npm run format` | Formata `src/**` com Prettier |
| `npm run format:check` | Verifica formatação |
| `npm run check` | Typecheck + ESLint + Prettier (use antes de merge) |

## Desenvolvimento

```bash
nvm use
npm install
npm run dev
```

Antes de abrir PR ou considerar o trabalho pronto:

```bash
npm run check
npm run build
```

## Deploy

Pushes em `main` geram build e deploy via GitHub Pages (workflow em `.github/workflows/deploy.yml`). PRs contra `main` rodam o CI (`.github/workflows/ci.yml`).

Site em produção: [https://silashenrique.dev](https://silashenrique.dev)

## Versão

Este repositório está na **v1.0.0** (`package.json`), correspondente à primeira versão estável do site (home Memphis, i18n, modal de trabalhos, SEO e CTA).
