# CORP-02 — Server-render React pages from live project data

ID: `c0200001`
Type: improvement
Status: done
Opened: 2026-10-01
Source: Mochilada October 15, 2026 release strategy supplied 2026-10-01

input: |
  Record and sequence the Sentzunhat website and business-email work described in the October release strategy.

context: |
  Website work belongs in this repository. Keep approved branding, theme, solar-system hero, crawlable content, truthful project status, and measured performance. See `.hawp/work/status/2026/10/01/release-strategy-context.md` for shared dates, gates, positioning, and sequencing.

mission: |
  CORP-02 — Server-render React pages from live project data.

constraints: |
  Preserve existing active work and do not let corporate-site changes delay the Mochilada App Store submission. Local implementation evidence is linked below; production-domain behavior remains unverified.

output: |
  A completed and verified change with evidence linked from this plan.

## Intake context

Add genuine React server rendering to the existing React 19, Vite, Fastify, Zacatl, Sequelize, and SQLite website without switching to Next.js. Add client hydration and server entry points; make GET / and GET /projects/:slug load project data and metadata on the server, return meaningful first-response HTML, and serialize only the required initial state. Keep /api/projects for later client refreshes. Keep durable corporate prose in typed source/content and use the database for genuinely changing project facts such as status, release/version, canonical URL, availability, or reviewed date. Do not move copy into SQLite solely for SEO.

Acceptance: first HTTP response includes meaningful, route-specific content and metadata/JSON-LD; hydration works; existing API and routes continue to work; source/content remains the home for stable corporate prose.

## Investigation and planning

- [x] Investigate current source and implementation overlap before shaping the plan.
- [x] Record options, risk, touched paths, and verification plan before implementation.
- [x] Verify the result and update this plan/backlog.

### Directly observed architecture — 2026-10-01

- `src/apps/backend/src/app.ts` serves `src/apps/frontend/dist` with `@fastify/static` in production. No request-time page rendering exists.
- `scripts/render-static-pages.mjs` writes homepage and six project HTML files at build time. Its page metadata and JSON-LD are static.
- `src/apps/frontend/src/main.tsx` uses `createRoot`; `src/apps/frontend/src/app/app.tsx` chooses routes using `window.location` and lazy-loads project-only code. `use-theme.ts` reads localStorage during initial render, so it must be made server-safe for hydration.
- `src/apps/backend/src/areas/projects/infrastructure/project-model.ts` persists HAWP and Zacatl summary/status/version data. Six project detail pages live in `src/apps/frontend/src/content/project-pages.json`; their editorial prose stays source-owned.

### Design decision and risk

- **Option considered:** move all page prose into SQLite and render HTML templates in Fastify. This would duplicate the React page, add unnecessary migrations, and make hydration harder.
- **Chosen:** build a Vite SSR entry for the existing React tree, fetch project summaries from Sequelize for each page request, overlay live summary/status/version onto matching project details, and hydrate the same markup with serialized initial data. Keep generated static pages as fallback and preview output.
- **Risk:** high within this site because both serving and hydration change. Main hazards are mismatched server/client markup, wrong metadata, unsafe serialized data, and broken static asset routes. Scope stays within website code and uses a local disposable database for validation.
- **Verification:** typecheck/build, direct first-response HTML and metadata for home/known/unknown projects, dynamic database edit without rebuild, client hydration without console mismatch, API/static assets, and local mobile/desktop behavior. No production deployment claim without live verification.

## Outcome — 2026-10-01

The existing React page tree now renders on production requests through a Vite server entry and hydrates in the browser. Fastify loads current project rows for the homepage and project routes, with source-owned long-form copy and metadata. Static generated pages remain a preview and fallback artifact. The production Docker image includes the SSR bundle.

## Verification

`npm run check`, local first-response/404/API/asset checks, a disposable database edit, browser hydration and mobile viewport checks, and a built-container smoke passed. See the [evidence](../../../../../evidence/2026/10/01/c0200001/evidence.md). Production-domain behavior and field performance remain unverified.

## Close Checklist

- [x] Outcome recorded and linked to evidence.
- [x] Server HTML, metadata, live data, hydration, and container checked locally.
- [x] Remaining external verification stated.
- [x] Backlog row moved to Recently Closed.
