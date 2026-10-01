# Move homepage and project page content into SQLite

ID: eb03bd96-c0df-4da0-821b-88717e414f94
Type: improvement
Status: plan-ready
Opened: 2026-10-01
Updated: 2026-10-01

input: |
  Project pages should load from the database row with their sections. The homepage should use the same section model so its sections can support page-like navigation.

context: |
  Current project facts are stored in SQLite while detailed project content remains in src/apps/frontend/src/content/project-pages.json and homepage components. The unpublished UUID/page schema is now defined by Sequelize models in the backend; no migration history is needed. The existing SSR path renders / and /projects/:slug/ from the server.

mission: |
  Move the homepage and project-page content into the database schema, seed it from the reviewed current source content, and render the same crawlable pages through the existing SSR routes.

constraints: |
  Depend on and do not duplicate the schema work in 327c8216-9cb7-468d-9d5b-769dea4e1ccd. Preserve current factual copy and status qualifiers, canonical slugs, SEO metadata, JSON-LD, links, list content, FAQ, and section order. Keep HTML-first SSR and hydration. Do not create a hidden SEO-only copy or weaken reduced-motion and accessibility behavior. Preserve reliable seed/update semantics so deployment does not overwrite operator-edited content unexpectedly.

output: |
  Homepage and all project pages load their page structure and sections from SQLite-backed repositories, remain server-rendered and crawlable, and no longer require the frontend JSON file as runtime content source.

## Investigation

Directly inspected:

- src/apps/frontend/src/content/project-pages.json contains project copy and section arrays for all current projects.
- src/apps/frontend/src/pages/project/project-metadata.ts reads this JSON for metadata, project lookup, and structured-data generation.
- src/apps/frontend/src/pages/home/home.tsx composes home sections from individual components.
- src/apps/backend/src/page-routes.ts already calls renderPage(path, projects) for SSR.
- Project and page schema models live in `src/apps/backend/src/areas/*/infrastructure/models/` and initialize on a fresh database.

## Planned sequence

1. Confirm the page/section content contract in the current Sequelize models.
2. Create an idempotent import/seed from the existing reviewed page JSON and home-page copy.
3. Add backend repositories/queries that return ordered pages and sections, including home.
4. Pass server-loaded content to React SSR; keep client hydration on the same initial payload.
5. Remove the JSON file from runtime reads after parity checks; retain it only as a migration fixture if useful.
6. Verify all canonical routes, metadata/schema, section anchors, project status/version, and no-JavaScript HTML.

## Risk and overlap

- Risk: medium-high. Stale or partial migration could change public claims or leave some page sections missing.
- This item owns content migration, page queries, and SSR integration. The dependency item owns schema/UUID design. f07ad639 owns the interactive navigation treatment and should consume the stable section identifiers created here.
- Do not duplicate work in existing project SSR route implementation; extend it to read page content from the planned repository.

## Acceptance

- Homepage and project pages share the same page/ordered-section rendering contract.
- All current content is imported with parity for headings, paragraphs, lists, FAQs, links, metadata, and structured data.
- Direct requests return complete HTML before JavaScript runs.
- Project UUID identifies the record while public slug continues to identify its canonical URL.
- Seeds can be rerun safely without replacing reviewed content unexpectedly.

## Verification

Planned: compare source and database section inventories; inspect every rendered route headings, metadata, schema, anchors, and project facts; verify browser hydration and empty-database bootstrap. No content migration has been implemented or verified by this planning item.
