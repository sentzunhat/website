# Verification evidence

- Compared the current Sentzunhat backend and exact Tekit backend provider/repository examples. Read the HAWP canonical Node.js project-structure and area-composition guidance plus service-design dependency-composition, layered-composition, and service-boundary standards.
- Provider port/adapter pairs now sit together under their feature folders. Repository port/adapter files are colocated. Zacatl class tokens replace handwritten symbol/factory wiring in the server layer composition; main aggregators supply the registered classes.
- `npm run check` passed frontend/backend typecheck, lint (zero errors and 19 existing frontend warnings), browser/SSR/static builds, and backend build. `git diff --check` passed.
- Fresh local backend smoke: `/api/health`, `/api/projects`, `/`, `/projects/hawp/` returned HTTP 200. Two project rows had 36-character UUID identities. SQLite `integrity_check` returned `ok`; `foreign_key_check` returned no rows.
- Local browser showed analytics consent; Decline worked and the footer settings control reopened the choice. No acceptance was submitted and no Google request was sent.
- The user supplied GA4 ID `G-8TVQJXLW0K` is the source default; `VITE_GA_MEASUREMENT_ID` can override it. Consent is still required before the tag loads. Public deployment/collection remain unverified.
- The Turso compatibility plan was updated separately; no Turso runtime dependency or database was added.
