# Give projects UUID identity and a page-content schema

ID: 327c8216-9cb7-468d-9d5b-769dea4e1ccd
Type: improvement
Status: done
Opened: 2026-10-01
Updated: 2026-10-01

input: |
  Review the current project database schema. Give projects UUID IDs and make project pages, with their sections, database-backed. Use the same page-section model for the homepage.

context: |
  Projects.id is currently an auto-incrementing SQLite integer. Project stores name, description, version, status, URL, and accent. The current project-page copy, metadata, section arrays, and FAQ are in src/apps/frontend/src/content/project-pages.json; home-page section components and copy are in frontend source. Production SSR reads live project facts from SQLite and joins them to source-owned page content.

mission: |
  Design and implement a data model where projects have stable UUID identity and page sections can be stored, ordered, and rendered from the database, while preserving public slugs and current server-rendered routes.

constraints: |
  Keep slug as a stable, human-readable canonical URL key separate from UUID identity. Preserve existing SQLite data and provide a reversible migration or backup/rollback path. Do not make a destructive sync alter migration. Preserve current routes, project facts, page copy, metadata, structured data, accessibility, and crawlable SSR. Keep secrets out of the repository.

output: |
  A documented schema decision, migration/backfill, and model/repository changes that can represent project pages and ordered sections for both project pages and the homepage.

## Investigation

Directly inspected:

- src/apps/backend/src/areas/projects/infrastructure/project-model.ts defines Project.id as an integer auto-increment primary key and name as unique.
- src/apps/backend/src/server.ts runs sequelize.sync() and seeds project rows with ignoreDuplicates.
- src/apps/backend/src/areas/projects/application/list-projects.ts exposes project rows, excluding Sequelize timestamps.
- src/apps/backend/src/page-routes.ts supplies current project rows to the React SSR renderer.
- src/apps/frontend/src/content/project-pages.json owns project slugs, metadata, prose, ordered sections, lists, FAQs, links, and schema configuration.
- The checked-in src/data/website.sqlite has a Projects table with integer primary key, unique-name index, and no slug or page-section table.

Inference: rebuilding or migrating deployed SQLite files needs an explicit migration path because the runtime currently relies on sequelize.sync() rather than a versioned migration framework.

## Options

1. Put all section arrays and metadata into JSON columns on Project and one singleton homepage row. This is compact but makes ordering constraints, partial editing, and relational checks less explicit.
2. Keep a normalized Project identity/facts row and add Page/PageSection records with ordered content blocks; represent the homepage as a page with a stable key and project pages with a project reference. This supports shared rendering and explicit ordering, with more migration/model code.

## Recommendation

Use option 2 unless the implementation spike finds a hard limitation in the current Sequelize/SQLite adapter. Keep the public slug unique and independent of the UUID. Model sections as ordered records and content blocks as validated, versioned JSON or typed child records, based on which best preserves paragraphs/lists/FAQ without coupling page copy to release facts. The home and project pages can then be joined with their ordered section records for SSR. Keep component behavior and special visual renderers in code; store each section's kind, order, and reviewed content in the database.

## Risk and overlap

- Risk: high. Changing primary keys in a persistent SQLite database and changing the server content source can break seeded or existing installations.
- This item owns database model design and migration/backfill only. eb03bd96-c0df-4da0-821b-88717e414f94 owns moving content and updating SSR queries. f07ad639 owns the transition UI.
- Requires explicit review of migration/rollback approach before implementation. Schema changes are high-risk under the repo HAWP intake guide.

## Acceptance

- Project rows have stable UUID primary keys, independent of unique canonical slugs.
- Project display order is explicit and independent of generated UUID sort order.
- Existing project rows retain their facts and canonical routes through migration.
- The chosen schema can represent ordered sections for a homepage and any project page.
- A backup/rollback path and migration versioning strategy are documented.
- Existing database and empty-database startup behavior are both accounted for.

## Verification

The versioned migration and ORM identity update are implemented locally. The migration keeps the original integer-key table as legacy_projects_v001 for recovery and applies schema changes transactionally. Checks against temporary legacy and fresh databases passed; the workspace database remains on its original integer schema. See the [evidence](../../../../../evidence/2026/10/01/327c8216-9cb7-468d-9d5b-769dea4e1ccd/evidence.md).

## Outcome — 2026-10-01

Added migration 001 and a schema_migrations ledger. Existing project rows receive UUID primary keys, stable slugs, and explicit sort_order values while their prior integer IDs and full original table remain available as legacy_projects_v001. Fresh databases create the same projects schema. Added pages and page_sections tables with UUID primary keys, ordering and uniqueness constraints, and cascading foreign keys. The Project Sequelize model and API now use UUID IDs and slugs, and listing order remains explicit.

Homepage/project page records and their editorial section content have not been imported yet; that is the next dependent work item, eb03bd96-c0df-4da0-821b-88717e414f94.

## Close Checklist

- [x] Migration and schema outcome recorded.
- [x] Existing and fresh database behavior verified using temporary databases.
- [x] Project data preservation, UUID/slug uniqueness, display order, integrity, and foreign-key declarations checked.
- [x] Original local database restored to its pre-migration Projects schema and rows.
- [x] Next dependent work item identified and backlog row moved to Recently Closed.
