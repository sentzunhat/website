# CORP-02 React SSR evidence — 2026-10-01

## Implemented

- Vite builds a separate React server entry in `src/apps/frontend/server-dist/`. Production Fastify routes render `/` and `/projects/:slug` with current Sequelize project rows, then place safely escaped initial project state into the page for React hydration.
- The homepage and six project pages retain their source-owned prose and metadata. HAWP and Zacatl status/version come from SQLite in the first response; the project JSON-LD version follows the live value. The client keeps `/api/projects` for refreshes.
- The built static pages remain available through Vite preview. The runtime container copies the server bundle separately from public assets.

## Direct checks

- `npm run check` passed frontend/backend TypeScript, lint (0 errors, 19 pre-existing warnings), client build, SSR build, static generation, and backend build. The existing large solar-scene chunk warning and an SSR-only ineffective dynamic import warning remain.
- Local production requests returned HTTP 200 with `data-ssr="true"` and route-specific H1/title for `/`, `/projects/hawp/`, and `/projects/mochilada/`. `/projects/not-real/` returned HTTP 404, a project-not-found H1, and `noindex`. The homepage first response included six project links. `/api/projects` and `/robots.txt` returned 200; `/server-dist/entry-server.js` was not publicly served (404).
- In a disposable SQLite database, changing HAWP status to `Published test` and version to `9.9.9-test` appeared in the next homepage and project HTML responses without rebuilding. The project JSON-LD `version` also changed. Original row values were restored afterward.
- A disposable `description` value containing `</script><script>alert(1)</script>` was preserved when parsing the JSON initial state, while the raw script sequence did not appear in the HTML. Original value was restored afterward.
- In the local browser, the production HAWP page showed its full content and the Dark theme button changed the document theme after hydration. Browser error/warning logs were empty. The System preference was restored. The Mochilada static preview page loaded its content with no browser errors/warnings.
- At a 390 × 844 browser viewport, the production home and Mochilada pages had the expected H1 and no horizontal document overflow. Browser logs were empty. The viewport override was reset.
- `docker build -t sentzunhat-website:corp02-local .` passed. A disposable container returned HTTP 200 for `/`, `/projects/hawp/`, `/api/projects`, and a built JavaScript asset; the HTML responses contained the SSR marker. The container was stopped.

## Limits

These checks used local production mode and a disposable container. The production domain, hosting persistence, Search Console, and field performance were not verified. Four project pages have source-only status because the current SQLite project table contains HAWP and Zacatl. Canonical page URLs and stable editorial copy remain source-owned.
