# sentzunhat website

Public landing page for Sentzunhat Corp., its current product, open-source foundations, and clearly labelled product research and prototypes.

## Stack

- React 19 with Vite 8 and strict TypeScript
- Tailwind CSS 4 design tokens and utilities
- Zacatl `0.0.61` framework adapters
- Fastify API
- Sequelize with SQLite
- Node `26.10.0` through `.nvmrc`

The release cards are seeded through the project area in
`src/apps/backend/src/areas/projects/`. The frontend keeps a typed fallback so the
landing page remains useful when the local API is unavailable.

Like Mochilada, this is an npm workspace with separate `src/apps/frontend` and
`src/apps/backend` packages. Like Tekit, behavior is organized by feature ownership:
page sections live with the frontend application, while backend project routes
and persistence live in a project area. Fastify and Sequelize are consumed
through Zacatl's public adapters so framework versions stay aligned.

Like Tekit, backend source uses clean extensionless imports. Production builds compile module-per-file ESM with TypeScript and run Zacatl's `zacatl-fix-esm` over the emitted files so Node 26 receives explicit runtime extensions.

## Development

```bash
nvm use
npm install
npm run dev
```

Open `http://localhost:5174`.

## Repository layout

```text
apps/
  frontend/        React/Vite application and page-section components
  backend/         Fastify/Sequelize API and feature-owned areas
  frontend/public/ Static web and generated brand assets
scripts/           Repository maintenance and asset-generation scripts
data/              Local runtime data (ignored)
docs/              Durable project documentation and checkpoints
.hawp/             HAWP guidance and project-owned work records
```

## Checks

```bash
npm run build
npm run lint
npm run typecheck
npm run check
```

`npm run build` emits the browser bundle and static preview pages to `src/apps/frontend/dist/`, the React server entry to `src/apps/frontend/server-dist/`, and the Node server modules to `src/apps/backend/dist/`. Start the production server with:

```bash
NODE_ENV=production LOG_LEVEL=info npm start
```

The production server at `http://127.0.0.1:3001` serves request-time React HTML for `/` and `/projects/:slug`, with current project status and version from SQLite. The browser hydrates those pages and can refresh data through `/api/projects`. Stable project prose and page metadata remain in source content. The generated pages also support a standalone static preview:

```bash
npm run preview --workspace=sentzunhat-website-frontend
```

The static preview is available at `http://127.0.0.1:4174`. It displays build-time project content and does not serve live database data.
