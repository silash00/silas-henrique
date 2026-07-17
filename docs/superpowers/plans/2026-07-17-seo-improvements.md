# SEO & Performance Improvements Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Fechar gaps reais de SEO, share social, hierarquia semântica e LCP em `silashenrique.dev`, sem migrar de stack na primeira leva.

**Architecture:** Manter SPA React + Vite + GitHub Pages. Entregar metadados estáticos no `index.html` + arquivos em `public/`, corrigir semântica no lab Memphis, e otimizar fontes (maior culpado do LCP). Locale continua client-side; title/description passam a sincronizar com o locale. Prerender fica opcional (fase 5).

**Tech Stack:** React 19, Vite 8, GitHub Pages, Lighthouse 12 para verificação (sem framework de testes no repo).

## Global Constraints

- Domínio canônico: `https://silashenrique.dev`
- Base path Vite: `/` (já configurado)
- Não introduzir Next.js / SSR nesta leva
- Não inventar cases de trabalho — só trocar placeholders quando houver URLs/conteúdo reais do autor
- Preferir self-host de fontes ou `preconnect` + links no `<head>`; evitar carregar fontes só no `useEffect`
- Remover `Martian Mono` se não for usado no lab Memphis
- Verificar com Lighthouse mobile após fases 1–3: Performance ≥ 90 alvo aspiracional; mínimo LCP < 3.0s e FCP < 2.5s na primeira leva

---

## File map

| File | Responsibility |
|------|----------------|
| `index.html` | title, description, OG/Twitter, canonical, theme-color, preconnect, font links |
| `public/robots.txt` | Allow + sitemap URL |
| `public/sitemap.xml` | URL única da home |
| `public/og-image.png` (ou `.jpg`) | Imagem 1200×630 para share |
| `public/favicon/site.webmanifest` | Nome + paths corretos dos ícones |
| `src/pages/LabPage.tsx` | `<main>`, parar de injetar fonts no effect |
| `src/components/lab/PitchCopy.tsx` | H1 = marca; pitch como parágrafo |
| `src/components/lab/heroes/MemphisPop.tsx` | Floaters `aria-hidden` (decorativos) |
| `src/index.css` | Remover `@import` Martian Mono se morto |
| `src/context/LocaleContext.tsx` + i18n | Atualizar `document.title` + meta description por locale |
| `src/components/lab/SeoJsonLd.tsx` (novo) | JSON-LD Person/WebSite |

---

### Task 1: Crawl essentials (robots, sitemap, canonical, OG)

**Files:**
- Create: `public/robots.txt`
- Create: `public/sitemap.xml`
- Create: `public/og-image.png` (exportar do branding / screenshot do hero 1200×630)
- Modify: `index.html`
- Modify: `public/favicon/site.webmanifest`

**Interfaces:**
- Consumes: domínio `https://silashenrique.dev`
- Produces: meta tags estáticas no HTML servido pelo GitHub Pages

- [ ] **Step 1: Criar robots.txt**

```txt
User-agent: *
Allow: /

Sitemap: https://silashenrique.dev/sitemap.xml
```

- [ ] **Step 2: Criar sitemap.xml**

```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://silashenrique.dev/</loc>
    <changefreq>monthly</changefreq>
    <priority>1.0</priority>
  </url>
</urlset>
```

- [ ] **Step 3: Completar head em `index.html`**

Adicionar (além do que já existe):

```html
<link rel="canonical" href="https://silashenrique.dev/" />
<meta name="theme-color" content="#f2f1ef" />
<meta property="og:type" content="website" />
<meta property="og:url" content="https://silashenrique.dev/" />
<meta property="og:locale" content="pt_BR" />
<meta property="og:locale:alternate" content="en_US" />
<meta property="og:image" content="https://silashenrique.dev/og-image.png" />
<meta property="og:image:width" content="1200" />
<meta property="og:image:height" content="630" />
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:title" content="Silas Henrique - Desenvolvedor Front-End" />
<meta name="twitter:description" content="Portfólio de Silas Henrique, desenvolvedor front-end com 4+ anos de experiência." />
<meta name="twitter:image" content="https://silashenrique.dev/og-image.png" />
<link rel="preconnect" href="https://api.fontshare.com" crossorigin />
<link rel="preconnect" href="https://cdn.fontshare.com" crossorigin />
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
```

Remover `meta name="keywords"` (ignorado pelo Google; ruído).

- [ ] **Step 4: Corrigir `site.webmanifest`**

```json
{
  "name": "Silas Henrique",
  "short_name": "Silas",
  "icons": [
    {
      "src": "/favicon/web-app-manifest-192x192.png",
      "sizes": "192x192",
      "type": "image/png",
      "purpose": "maskable"
    },
    {
      "src": "/favicon/web-app-manifest-512x512.png",
      "sizes": "512x512",
      "type": "image/png",
      "purpose": "maskable"
    }
  ],
  "theme_color": "#f2f1ef",
  "background_color": "#f2f1ef",
  "display": "standalone",
  "start_url": "/"
}
```

- [ ] **Step 5: Verificar**

```bash
curl -sI https://silashenrique.dev/robots.txt   # após deploy: 200
curl -sI https://silashenrique.dev/sitemap.xml  # 200
curl -sI https://silashenrique.dev/og-image.png # 200
curl -s https://silashenrique.dev/favicon/site.webmanifest | grep Silas
```

Localmente: `npm run build && npm run preview` e checar os mesmos paths.

- [ ] **Step 6: Commit**

```bash
git add public/robots.txt public/sitemap.xml public/og-image.png public/favicon/site.webmanifest index.html
git commit -m "$(cat <<'EOF'
feat(seo): add robots, sitemap, canonical and Open Graph basics

EOF
)"
```

---

### Task 2: Hierarquia de conteúdo e landmarks

**Files:**
- Modify: `src/pages/LabPage.tsx`
- Modify: `src/components/lab/PitchCopy.tsx`
- Modify: `src/components/lab/heroes/MemphisPop.tsx`

**Interfaces:**
- Consumes: `pitch.name`, `t('lab.hero.headline')`
- Produces: um único `h1` com o nome da marca; pitch como texto de apoio

- [ ] **Step 1: Envolver conteúdo em `<main>`**

Em `LabPage.tsx`, trocar o wrapper externo para incluir:

```tsx
return (
  <div className="lab-memphis min-h-dvh">
    {/* toggles fixos permanecem fora do main se forem chrome global */}
    <div className="fixed bottom-4 right-4 z-50 flex flex-col items-end gap-3">
      <LocaleToggle />
      <ThemeToggle />
    </div>
    <main id="conteudo">
      <MemphisPop />
      <MemphisMore />
      <MemphisContact />
    </main>
  </div>
);
```

- [ ] **Step 2: H1 = marca**

Em `PitchCopy.tsx`:

```tsx
<h1 ref={nameRef as Ref<HTMLHeadingElement>} className={`mp-font-display ${nameClassName}`}>
  {pitch.name}
</h1>
<p className={`mp-font-accent ${headlineClassName}`}>{t('lab.hero.headline')}</p>
```

Ajustar o tipo de `nameRef` para `Ref<HTMLHeadingElement>` (ou união) e o uso em `useMemphisPhysics` / `MemphisPop` se tipado como `HTMLParagraphElement`.

- [ ] **Step 3: Floaters decorativos**

Em `MemphisPop.tsx`, nos elementos com `role="img"`, preferir:

```tsx
aria-hidden="true"
```

e remover `role="img"` / `aria-label={b.id}` — são ornamentação, não conteúdo.

- [ ] **Step 4: Verificar hierarquia**

No browser (DevTools → Accessibility tree):

- 1× `h1` = "Silas Henrique"
- 2× `h2` = trabalhos + contato
- existe landmark `main`

- [ ] **Step 5: Commit**

```bash
git add src/pages/LabPage.tsx src/components/lab/PitchCopy.tsx src/components/lab/heroes/MemphisPop.tsx src/components/lab/useMemphisPhysics.ts
git commit -m "$(cat <<'EOF'
feat(a11y): promote brand to h1 and add main landmark

EOF
)"
```

---

### Task 3: Performance de fontes (LCP)

**Files:**
- Modify: `index.html`
- Modify: `src/pages/LabPage.tsx`
- Modify: `src/index.css`

**Interfaces:**
- Consumes: Fontshare Satoshi + Google Inter (ou self-host)
- Produces: fonts disponíveis antes/durante first paint; sem `@import` bloqueante de Martian Mono

- [ ] **Step 1: Remover injeção de fonts no `useEffect` de `LabPage`**

Apagar `FONT_HREFS` e o `useEffect` que cria `<link>` dinamicamente.

- [ ] **Step 2: Declarar fonts no `index.html`**

```html
<link rel="stylesheet" href="https://api.fontshare.com/v2/css?f[]=satoshi@1,400,500,700,900&display=swap" />
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" />
```

(Preferível long-term: baixar woff2 e servir de `/fonts/` com `@font-face` + `font-display: swap`.)

- [ ] **Step 3: Remover Martian Mono morto**

Em `src/index.css`, remover:

```css
@import url('https://fonts.googleapis.com/css2?family=Martian+Mono:wght@100..800&display=swap');
```

e apontar `--font-family` / `body` para Inter ou stack do lab (`var(--mp-font-body)`), já que o site é só lab Memphis.

- [ ] **Step 4: Verificar Lighthouse local**

```bash
npm run build && npm run preview
# em outro terminal, com registry público se necessário:
npm_config_registry=https://registry.npmjs.org npx lighthouse@12 http://127.0.0.1:4173/ \
  --only-categories=performance --form-factor=mobile \
  --chrome-flags="--headless --no-sandbox" --quiet --output=json --output-path=/tmp/lh-local.json
node -e 'const r=require("/tmp/lh-local.json"); console.log(Math.round(r.categories.performance.score*100), r.audits["largest-contentful-paint"].displayValue, r.audits["first-contentful-paint"].displayValue)'
```

Esperado: FCP e LCP menores que o baseline (3.6–3.9s); ideal LCP &lt; 3.0s.

- [ ] **Step 5: Commit**

```bash
git add index.html src/pages/LabPage.tsx src/index.css
git commit -m "$(cat <<'EOF'
perf: load fonts from head and drop unused Martian Mono

EOF
)"
```

---

### Task 4: i18n alinhado a title/description + JSON-LD

**Files:**
- Modify: `src/i18n/pt-BR.ts`
- Modify: `src/i18n/en-US.ts`
- Modify: `src/context/LocaleContext.tsx` (ou hook dedicado)
- Create: `src/components/lab/SeoJsonLd.tsx`
- Modify: `src/pages/LabPage.tsx`

**Interfaces:**
- Consumes: `locale`, `t('seo.title')`, `t('seo.description')`
- Produces: `document.title` e `<meta name="description">` atualizados; script JSON-LD

- [ ] **Step 1: Chaves i18n**

`pt-BR.ts`:

```ts
'seo.title': 'Silas Henrique — Desenvolvedor Front-End',
'seo.description':
  'Portfólio de Silas Henrique: produtos digitais com React, TypeScript, automação e IA.',
```

`en-US.ts`:

```ts
'seo.title': 'Silas Henrique — Front-End Developer',
'seo.description':
  'Silas Henrique portfolio: digital products with React, TypeScript, automation, and AI.',
```

- [ ] **Step 2: Sincronizar head no locale**

Em `LocaleContext` (ou efeito em `LabPage`):

```ts
useEffect(() => {
  document.documentElement.lang = locale;
  document.title = messages[locale]['seo.title']; // ou via t()
  const meta = document.querySelector('meta[name="description"]');
  if (meta) meta.setAttribute('content', messages[locale]['seo.description']);
}, [locale]);
```

Nota: crawlers sociais leem o HTML estático (PT). O efeito serve UX e Google com JS. Não substitui prerender.

- [ ] **Step 3: JSON-LD Person**

```tsx
// SeoJsonLd.tsx
export default function SeoJsonLd() {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Silas Henrique',
    url: 'https://silashenrique.dev/',
    jobTitle: 'Front-End Developer',
    sameAs: [
      'https://www.linkedin.com/in/silashsilva/',
      'https://github.com/silash00',
    ],
    email: 'mailto:silash.silva00@gmail.com',
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
```

Montar em `LabPage` / `App`.

- [ ] **Step 4: Verificar**

Trocar PT/EN → title da aba muda. Validar JSON-LD em https://search.google.com/test/rich-results (após deploy).

- [ ] **Step 5: Commit**

```bash
git add src/i18n src/context/LocaleContext.tsx src/components/lab/SeoJsonLd.tsx src/pages/LabPage.tsx
git commit -m "$(cat <<'EOF'
feat(seo): sync document title with locale and add Person JSON-LD

EOF
)"
```

---

### Task 5 (opcional): Conteúdo de trabalhos + assets

**Files:**
- Modify: `src/components/lab/MemphisMore.tsx`
- Optionally compress/replace `public/profile.png` (561 KB) se passar a ser usado

- [ ] **Step 1:** Substituir blurbs/hrefs placeholder por cases reais (URLs públicas ou case studies internos com path próprio).
- [ ] **Step 2:** Se não houver cases ainda, mudar copy para não prometer “clique no card pra abrir o projeto” quando o destino é LinkedIn genérico.
- [ ] **Step 3:** Commit quando houver conteúdo aprovado pelo autor.

---

### Task 6 (opcional / fase 5): Prerender + Search Console

Só se share social ou indexação JS forem insuficientes:

- Avaliar `vite-plugin-prerender` ou build estático da home com HTML já hidratável
- Registrar propriedade em Google Search Console + Bing Webmaster
- Submeter `sitemap.xml`
- Monitorar Coverage / Core Web Vitals

Não detalhar implementação até a decisão explícita — muda o pipeline de deploy.

---

## Verification checklist (após Tasks 1–4)

```bash
# Produção pós-deploy
npm_config_registry=https://registry.npmjs.org npx lighthouse@12 https://silashenrique.dev/ \
  --only-categories=performance,accessibility,best-practices,seo \
  --form-factor=mobile --chrome-flags="--headless --no-sandbox" --quiet
```

Checks manuais:

- [ ] `robots.txt` e `sitemap.xml` → 200
- [ ] LinkedIn Post Inspector / opengraph.xyz mostram imagem
- [ ] Um `h1` = Silas Henrique; `main` presente
- [ ] Locale EN atualiza `document.title`
- [ ] Lighthouse a11y permanece 100; performance sobe vs 77–78

---

## Self-review

1. **Spec coverage:** Crawl, OG, hierarquia, fonts/LCP, i18n meta, JSON-LD, conteúdo, prerender opcional — todos mapeados.
2. **Placeholders:** `og-image.png` precisa ser gerado na Task 1 (artefato real, não código).
3. **Type consistency:** `nameRef` muda de `HTMLParagraphElement` para heading — Task 2 cobre o ajuste.
