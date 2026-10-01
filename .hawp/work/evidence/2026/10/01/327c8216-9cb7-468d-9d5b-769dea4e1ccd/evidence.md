# UUID project schema and page tables — evidence, 2026-10-01

## Implemented

- Added src/apps/backend/src/infrastructure/migrations/run-migrations.ts with a transactional migration ledger.
- Added migration 001-project-uuids-and-pages to rebuild legacy Projects rows into lowercase projects with TEXT UUID IDs, unique slugs, explicit display order, timestamps, and preserved legacy integer IDs. The original table remains as legacy_projects_v001.
- Added pages and page_sections tables with TEXT UUID primary keys, ordered sections, unique page keys/order, page/project and section/page foreign keys, and cascade rules.
- Updated the Sequelize Project model, seed rows, API list, and SSR payload types to use UUID IDs, slugs, and explicit project order.
- Enabled SQLite foreign-key enforcement after connection.

## Direct checks

- Backend and frontend TypeScript checks passed.
- Backend production build passed.
- git diff --check passed.
- Applying migration 001 to a temporary copy of the legacy SQLite database preserved both project records, prior integer IDs, original facts, and display order. The API returned HTTP 200 with UUID IDs and slugs.
- Applying migration 001 to a fresh temporary SQLite database created the migration ledger and all three content tables, then seeded HAWP and Zacatl with distinct UUIDs and the intended display order. The API returned HTTP 200.
- SQLite integrity checks returned ok on both migrated databases. The page-section foreign-key declaration and cascade behavior were checked using a temporary database.
- The workspace SQLite file was restored to its original Projects integer schema, two original rows, facts, and timestamps; its integrity check returned ok.

## Limits

- No page or page-section content has been imported yet. The pages and page_sections tables are intentionally empty until work item eb03bd96-c0df-4da0-821b-88717e414f94.
- Production deployment, live hosting data, and browser hydration against a migrated production database were not tested.
