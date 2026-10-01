# CORP-01 local verification — 2026-10-01

## Scope inspected

`README.md`; `scripts/render-static-pages.mjs`; `src/apps/frontend/src/components/header.tsx`; `src/apps/frontend/src/pages/home/components/focus.tsx`, `about.tsx`, `open-source.tsx`, `explorations.tsx`, `principles.tsx`, `hero.tsx`, and `vision.tsx`; `src/apps/frontend/src/content/project-pages.json`; generated `src/apps/frontend/dist/index.html` and `src/apps/frontend/dist/projects/*/index.html`.

## Direct results

- Node `v26.10.0`, npm `11.19.1`.
- `npm run check`: exit 0. TypeScript/frontend/backend build passed; lint had 0 errors and 19 warnings in other files; Vite reported the existing lazy solar-scene chunk size warning.
- Generated homepage and six project pages each had exactly one H1 and zero Studio references. Homepage retained six project links. Chiwakal generated output includes `Product research`.
- Generated client bundle includes `Research & development`, `Products`, `Foundations`, `Company`, and `Principles`, and excludes `In the studio`.
- Focused source search had no Studio or `software company` hits in public source inspected. `git diff --check` passed.

## Limit

This proves the local source/build output. Production deployment and browser rendering were not checked. Historical checkpoint wording was intentionally preserved.
