# Portfolio Work Modal — Design Spec

**Date:** 2026-07-17  
**Status:** Approved  
**Branch:** `feat/portfolio-work-modal`

## Goal

Ao clicar na área de preview dos cards de trabalhos, abrir um popup estilo janela MacOS com mídia do projeto (placeholder animado por enquanto) e, ao lado, descrição + tecnologias + CTA opcional — em vez de navegar para um link externo.

## Decisions (locked)

| Topic | Choice |
|-------|--------|
| Open trigger | Só a área de imagem/preview do card |
| Content | Título + parágrafo + techs + CTA opcional |
| Close | Botão vermelho (traffic light) + Escape + clique no backdrop |
| Architecture | Modal dedicado `WorkDetailModal`; cards deixam de ser `<a>` |
| Media | Campo opcional; sem asset → placeholder animado |
| Deep-link / URL | Fora de escopo |
| Galeria multi-imagem | Fora de escopo |

## Interaction

1. `MacWindow` deixa de ser link. Vira `article` (ou equivalente) com drag intacto.
2. Só a região `aspect-[16/10]` é um `button` que chama `onOpen`.
3. `MemphisMore` guarda `selectedId: string | null` e renderiza `WorkDetailModal` quando há seleção.
4. Ao fechar: limpa `selectedId` e devolve o foco ao preview que abriu.
5. Clique após drag não abre o modal (mesmo padrão `moved` atual).

## Modal UI

- Overlay fullscreen + backdrop.
- Janela MacOS (traffic lights; vermelho fecha; amarelo/verde decorativos).
- Título na barra = `work.title` (ex.: `busca.trips.app`).
- **Desktop:** ~`min(920px, 92vw)`; corpo 2 colunas — mídia ~55% | texto ~45%.
- **Mobile:** coluna única (mídia em cima, texto embaixo); scroll no corpo se necessário.
- Painel de texto: título legível, parágrafo `detail`, lista/chips de techs, CTA opcional no estilo memphis.
- A11y: `role="dialog"`, `aria-modal`, focus trap, Escape. Preferir Headless UI `Dialog` (já no projeto).

## Data model

Cada item em `WORKS`:

```ts
{
  id: string
  title: string
  blurbKey: MessageKey      // card curto
  detailKey: MessageKey     // modal
  tags: string              // card (mono line)
  techs: string[]           // modal chips
  accent: 'pink' | 'teal' | 'yellow'
  rotate: string
  z: string
  cta?: { href: string; labelKey: MessageKey }
  media?: { type: 'image' | 'video' | 'gif'; src: string; altKey?: MessageKey }
}
```

- Sem `media` → placeholder animado (memphis / “print em breve”).
- Copy `detail` e labels de CTA no i18n (`pt-BR` + `en-US`).
- Remover `href` do card; links externos só via CTA do modal quando existirem.

## Motion

- Entrada: fade do backdrop + scale curto da janela.
- Respeitar `prefers-reduced-motion` (só fade / sem scale).
- Drag dos cards inalterado.

## Out of scope

- Deep-link (`#work=…`)
- Assets reais de mídia (Silas adiciona depois)
- Novas rotas
- Galeria / carrossel no modal
