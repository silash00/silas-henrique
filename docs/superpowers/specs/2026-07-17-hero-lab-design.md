# Hero Lab — Design Spec

**Date:** 2026-07-17  
**Branch:** `feat/hero-lab`  
**Status:** Approved for implementation (pending final user review of this doc)

## Goal

Create an isolated experimentation route with five full-viewport hero variations so Silas can compare modern visual/motion directions for the personal portfolio — without changing the existing root experience.

## Decisions (locked)

| Topic | Choice |
|-------|--------|
| Navigation | Single page, vertical scroll; each hero = `100dvh` |
| Content | Same personal pitch in every hero; only visual + motion differ |
| Visual direction | New palettes per hero (not the current cream/terracotta) |
| Approach | Mixed showcase: GSAP, Three.js, Framer Motion across heroes |
| Root `/` | Untouched (`ProfileCard`, Layout, theme) |
| Git | Branch created; **no commits** until explicitly requested |

## Route

- Path: `/lab` (under Vite `basename` `/silas-henrique/` → `http://localhost:5173/silas-henrique/lab`)
- Registered in `src/routes/index.tsx` as a sibling route to `/`, not nested under the cream Layout if that Layout forces palette — use a dedicated `LabPage` shell
- Root index route remains `ProfileCard` only

## Shared content

All heroes render the same pitch (copy may be lightly reformatted for layout, not rewritten per concept):

- **Brand / name (hero-level):** Silas Henrique
- **Headline:** short front-end positioning line
- **Support:** one sentence on craft / product / modern interfaces
- **CTAs:** existing email + LinkedIn URLs from current site

Shared strings live in `src/components/lab/sharedPitch.ts`.

## Heroes

| # | Component | Name | Visual climate | Motion stack |
|---|-----------|------|----------------|--------------|
| 1 | `TypeCascade.tsx` | Type Cascade | Dark typographic, expressive mono | GSAP cascade of letters/lines |
| 2 | `CodeField.tsx` | Code Field | Soft code/matrix field | Three.js floating snippets + mouse parallax |
| 3 | `TerminalIntro.tsx` | Terminal Intro | Terminal green on black | Framer typing + cursor + boot sequence |
| 4 | `SignalMesh.tsx` | Signal Mesh | Electric blue + mesh | GSAP + SVG/canvas connecting lines |
| 5 | `ScrollForge.tsx` | Scroll Forge | Neutral high-contrast industrial | GSAP ScrollTrigger scrub of type/layers |

Each hero is wrapped by `HeroShell` (full viewport + evaluation label `Hero N · Name`).

## File structure

```
src/
  pages/LabPage.tsx
  components/lab/
    HeroShell.tsx
    sharedPitch.ts
    LabNavDots.tsx
    heroes/
      TypeCascade.tsx
      CodeField.tsx
      TerminalIntro.tsx
      SignalMesh.tsx
      ScrollForge.tsx
  routes/index.tsx          # add /lab only
```

## Lab chrome

- `LabPage`: stacks the five heroes in document order
- Fixed side nav dots (or `1/5`) for jump-to-section and active section tracking
- Evaluation labels are lab-only and easy to remove later

## Performance

- Mount / run heavy animations only when the hero is in (or near) the viewport
- Three.js: pause render loop when off-screen; cap `dpr` (e.g. max 1.5)
- Avoid running all five continuous scenes at full cost simultaneously

## Accessibility

- Respect `prefers-reduced-motion: reduce`: show final static layouts; no typing loops, no Three continuous animation, no ScrollTrigger scrub motion
- Preserve readable contrast per hero palette
- CTAs remain real links (keyboard accessible)

## Dependencies

Add only what the lab needs:

- `gsap`
- `@gsap/react`
- `three`
- `@types/three` (dev)

Existing `framer-motion` covers Terminal Intro.

## Out of scope

- Changing `/` or `ProfileCard`
- Replacing the global cream theme for the whole app
- Committing / opening a PR
- Non-hero sections (about, projects, footer) on `/lab`

## Success criteria

- `/lab` loads five distinct full-viewport heroes with shared pitch
- `/` unchanged
- User can scroll and visually pick a preferred direction
- Reduced-motion users get usable static heroes
- Project still builds (`npm run build`)
