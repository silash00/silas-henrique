# Portfolio Work Modal Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Abrir um modal estilo janela MacOS ao clicar no preview dos cards de trabalhos, com mídia (placeholder) + descrição + techs + CTA opcional.

**Architecture:** `MacWindow` deixa de ser link; só o preview é botão. `MemphisMore` controla `selectedId` e monta `WorkDetailModal` (Headless UI Dialog) com chrome MacOS.

**Tech Stack:** React 19, Framer Motion, Headless UI Dialog, Tailwind v4, i18n existente.

## Global Constraints

- Só o preview abre o modal; tags/blurb do card não são links.
- Fechar: vermelho + Escape + backdrop.
- Sem deep-link, sem assets reais, sem novas rotas.
- Respeitar `prefers-reduced-motion`.
- Idiomas: pt-BR + en-US.

---

## File map

| File | Responsibility |
|------|----------------|
| `src/data/works.ts` | Dados estáticos dos trabalhos (ids, techs, CTA, media opcional) |
| `src/i18n/pt-BR.ts` / `en-US.ts` | Keys `works.*.detail`, CTA labels, `works.modal.close` |
| `src/components/memphis/MacWindow.tsx` | Card não-link; preview button; drag; placeholder animado exportável |
| `src/components/memphis/WorkDetailModal.tsx` | Dialog overlay + layout mídia \| texto |
| `src/components/memphis/MemphisMore.tsx` | State `selectedId`; wire open/close |

---

### Task 1: Dados + i18n

- [ ] Criar `src/data/works.ts` com os 4 works (techs, detailKey, cta opcional, sem media).
- [ ] Adicionar strings `works.*.detail`, `works.*.cta` (onde houver), `works.modal.close` / `works.modal.open` em pt-BR e en-US.
- [ ] Commit: `feat(works): add work detail copy and data model`

### Task 2: Refatorar MacWindow

- [ ] Remover `href`; aceitar `onOpen` e `openLabel`.
- [ ] Outer: `motion.div` (drag); preview: `button` que chama `onOpen` se não houve drag.
- [ ] Extrair/animar `WindowPlaceholder` (CSS leve); reutilizável no modal.
- [ ] Commit: `refactor(memphis): open work preview via button instead of link`

### Task 3: WorkDetailModal + wire

- [ ] Criar `WorkDetailModal` com Headless UI `Dialog`, chrome MacOS, layout 2 colunas / stack mobile.
- [ ] Motion de entrada; focus restore no close.
- [ ] `MemphisMore` usa `works` data + modal state.
- [ ] `npm run build` e `npm run lint` passam.
- [ ] Commit: `feat(works): add MacOS-style work detail modal`
