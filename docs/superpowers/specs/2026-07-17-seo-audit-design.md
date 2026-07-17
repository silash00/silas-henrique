# SEO Audit — silashenrique.dev (design)

**Date:** 2026-07-17  
**URL:** https://silashenrique.dev/  
**Stack:** React 19 + Vite 8 SPA · GitHub Pages

## Verdict

Lighthouse reporta **SEO 100 / A11y 100 / Best Practices 100 / Performance 77–78**, mas o score de SEO automático é superficial. Os gaps reais estão em descoberta (robots/sitemap), share social (OG incompleto), hierarquia de marca (nome fora do H1), alinhamento i18n↔meta, dados estruturados e LCP (~3.9s, 84% render delay por fonts + hydrate).

## Approaches considered

1. **Quick wins na SPA (recomendado)** — meta estático, robots/sitemap, hierarquia, fonts no head. Alto ROI, sem mudar stack.
2. **Prerender da home** — HTML estático para crawlers sociais. Mais trabalho de pipeline; adiar até medir necessidade.
3. **Migrar para Next.js** — SSR/i18n routing de verdade. Overkill para portfólio one-page agora.

## Success criteria (fases 1–3)

- robots.txt + sitemap.xml 200
- OG/Twitter com imagem 1200×630
- H1 = “Silas Henrique”; landmark `main`
- Performance mobile melhor que 77; LCP &lt; 3.0s alvo da primeira leva
- A11y Lighthouse permanece 100

## Implementation plan

Ver `docs/superpowers/plans/2026-07-17-seo-improvements.md`.
