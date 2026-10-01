# Align backend with Zacatl layers and model structure

ID: `34397672-17e5-4db1-94fa-4a0466f08623`
Type: improvement
Status: done
Opened: 2026-10-01
Updated: 2026-10-01

input: |
  Refactor the website backend to follow its architecture and Zacatl standards. Put Sequelize models in a models folder, break up oversized files, keep the approved frontend design intact, and replace the unpublished UUID/page migration with a clean initial schema.

context: |
  The website is a Zacatl-backed Fastify, Sequelize, and SQLite service. The current backend puts queries in application files, keeps the project model beside a route, builds page HTML in one large root-level file, and invokes migrations directly from server startup. Project UUIDs and page/page-section tables have not been published; the local database may be reset.

mission: |
  Reorganize the backend around explicit application handlers, domain entities and ports/providers, infrastructure models and repositories, and platform composition while preserving current API and SSR behavior.

constraints: |
  Preserve endpoint contracts, UUID project IDs, canonical slugs, ordered page/section schema, production React SSR, and the approved visual theme. Do not add migration machinery for the unpublished local schema. Do not change the frontend appearance. Keep frontend content sourcing in its current state; the existing page-content-to-database work item remains responsible for importing and rendering editorial sections.

output: |
  A standards-aligned, smaller backend module structure; fresh-database initialization without migration history; verified API and SSR smoke checks; and a separate Turso feasibility work item.

## Planned sequence

1. Read canonical Node.js, service-design, and SQL standards and confirm Zacatl's exported composition APIs.
2. Move Sequelize models into `infrastructure/models/`; define project, page, and page-section models there.
3. Add domain project/page entities and repository/provider ports; put Sequelize access in infrastructure repositories.
4. Move API and SSR endpoints into focused Zacatl route-handler classes; keep the SSR renderer/template work in a dedicated adapter.
5. Compose models, database lifecycle, Zacatl layers, and the Fastify server in a platform composition module.
6. Remove the unpublished migration runner and initialize only the current schema on an empty local database; reset the local database only if the old schema prevents a clean start.
7. Verify typecheck, lint, frontend/backend builds, database integrity, `/api/health`, `/api/projects`, `/`, and all project SSR routes.

## Architecture rules applied

- Application handlers translate HTTP requests/responses and call domain providers.
- Domain entities and port contracts do not import Fastify, Sequelize, Zacatl platform wiring, or filesystem code.
- Infrastructure models and repositories own all Sequelize-specific persistence details.
- Platform composition owns database and server lifecycle, asset registration, and adapter wiring.
- Individual files stay focused; the page rendering and database schema definitions are split by responsibility.

## Verification

Completed on 2026-10-01: `npm run check` passed frontend/backend typechecks, lint (0 errors; 19 existing frontend warnings), client/SSR/static-page builds (homepage plus six project pages), and backend build. `git diff --check` passed. Fresh default SQLite startup returned HTTP 200 for health, project API, home, and all six project routes; an unknown project returned 404. Project IDs are UUIDs. SQLite `integrity_check` returned `ok`, and `foreign_key_check` returned no rows. API responses were also checked for health payload and the two seeded project records. Existing frontend visual source was left unchanged.

The prior unpublished local database was copied to a temporary backup and the active local database was reset so the new schema is the initial schema. No migration runner/history remains. Public deployment is unverified and outside scope.

Turso feasibility was researched and recorded separately under `c4253e37-2d77-457b-afa8-2dfeb5887073`; that investigation remains open for a bounded adapter/Sequelize comparison.

## Outcome — 2026-10-01

Reorganized the website backend into Zacatl-style handlers, providers, repositories, models, and platform composition. Removed the unpublished migration machinery and reset the pre-release local SQLite database. Turso feasibility is tracked as a separate open investigation.

## Close Checklist

- [x] Main route/provider/repository aggregators compose the backend layers.
- [x] Project, page, and page-section models are under model folders; old migration runner was removed.
- [x] Typecheck, lint, client/SSR/static builds, backend build, and fresh SQLite runtime checks passed.
- [x] Local database backup was made before reset; public deployment remains explicitly unverified.
- [x] Turso compatibility investigation remains a separate active HAWP item.
