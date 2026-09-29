# Website structure alignment verification

## Scope verified

- Repository packages moved from `src/apps/*` to root `apps/*`.
- Shared static assets moved from `src/public/*` to root `public/*`.
- Frontend composition split into layout, section, content, hook, and type owners.
- Backend project HTTP/persistence ownership moved under
  `apps/backend/src/areas/projects/`.
- Approved page order, copy, theme behavior, logo direction, and API response
  contract were preserved.

## Direct verification

Environment: Node `26.10.0`, npm `11.19.1` from repository `.nvmrc`.

- `npm run logo:generate` passed and regenerated four assets in `public/`.
- `npm run check` passed:
  - frontend TypeScript check
  - backend TypeScript check
  - Oxlint over `apps/`
  - Vite production build
  - backend TypeScript build and `zacatl-fix-esm`
- `git diff --check` passed.
- Fresh paired production processes listened on `127.0.0.1:3001` and
  `127.0.0.1:4173`.
- `GET /api/health` returned HTTP `200`.
- Direct `GET /api/projects` returned HTTP `200` with HAWP and Zacatl rows.
- Preview-proxied `GET /api/projects` returned HTTP `200`.
- Production-preview `/` returned HTTP `200` and retained the meaningful boot
  shell text.
- Browser accessibility inspection showed the full approved hierarchy from
  hero through founder, and the desktop screenshot showed the approved dark
  theme/hero rendering intact.
- `.hawp/bin/hawp work validate` passed with zero issues and warnings before
  closeout.

## Known follow-ups and boundaries

- `npm audit --omit=dev` reports three moderate findings for
  `GHSA-w5hq-g745-h8pq` through `@sentzunhat/zacatl -> sequelize -> uuid`.
  npm's offered force fix changes Sequelize incompatibly, so it was not applied;
  follow-up work item `2a1dc541` records the dependency decision.
- `.hawp/bin/hawp kit validate` reports one broken link inside the installed
  upstream HAWP kit: `usage/mcp/README.md` references the absent
  `examples/mcp-intake-to-work-doc.md`. The same broken reference exists in the
  local HAWP source kit, so the consumer copy was not patched locally.
- No release, deployment, public-network, CDN, TLS, or uptime validation was
  performed.
