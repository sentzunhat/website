# 2026-09-29 — Sentzunhat website layout, loading, and production validation checkpoint

Repository: `sentzunhat/website`
Organization: `sentzunhat`
Branch: `main`

## Before

The website was being refined as a corporate landing page with an approved theme and hero direction, but its section order, icon/font system, loading behavior, and performance evidence still needed work. Development Lighthouse runs were slow and noisy because they measured Vite HMR and development modules. The frontend could also remain available when the API backend was absent, producing `/api/projects` proxy failures. A browser reported `Receiving end does not exist` and `runtime.lastError` messages whose source had not yet been isolated.

The repository was already in an intentional migration state from the older root Vite files to the TypeScript React/Vite frontend and Fastify/Sequelize/SQLite backend under the workspace source tree. That migration state and unrelated working-tree changes were preserved throughout this conversation.

## During

The corporate page hierarchy was reordered to communicate the company in a clearer sequence: hero, current commercial focus, company context, public engineering proof, vision, principles, studio explorations, and founder context. The theme and hero were retained as approved rather than visually imitated from reference sites.

The interface system was standardized around Fira Sans and `react-icons/fa`. The competing Lucide dependency was removed, technical metadata remained semantically distinct, and the existing coastal identity assets, theme controls, responsive behavior, and reduced-motion behavior were preserved.

Performance work distinguished development artifacts from shipped behavior. The page gained a small inline, theme-aware boot shell with the Sentzunhat wordmark and `Loading thoughtfully made tools…`, followed by React project-card skeletons while `/api/projects` resolves. The boot shell is replaced by the full application after React mounts. It uses real text because CSS-only blocks are not meaningful FCP content for Lighthouse.

The local service workflow was made explicit. The root development command pairs frontend and backend processes with `concurrently --kill-others-on-fail`; Vite proxies `/api` to port `3001`. For production-preview validation, the compiled backend runs on port `3001` and the frontend preview runs on port `4173`.

The browser-console messages were isolated as external extension messaging noise. They are not produced by the application and no product workaround was added.

## After / current state

The latest local production-preview validation is healthy:

- Backend startup: `LOG_LEVEL=info npm run start`
- Frontend preview: `npm run preview --workspace=sentzunhat-website-frontend`
- `/api/health`: HTTP `200`
- `/api/projects`: HTTP `200`, with seeded project records
- Lighthouse Performance: `100`
- Lighthouse Accessibility: `100`
- Lighthouse SEO: `100`
- Lighthouse Agentic Browsing: `100`
- Lighthouse Best Practices: `96`, reduced only by external browser-extension console messages
- FCP: `0.5s`
- LCP: `0.8s`
- Speed Index: `0.5s`
- TBT: `0ms`
- CLS: `0.001`
- Total transferred payload: approximately `262 KiB`

The previous development profile of approximately `8.4 MB`, `3.3s` FCP, and `6.5s` LCP should not be used as shipped-performance evidence. It reflected Vite development tooling rather than the production bundle.

## Decisions and constraints to preserve

- Keep the approved Sentzunhat theme, hero, coastal identity, and corporate narrative direction.
- Keep the hierarchy centered on the corporation, current product focus, public engineering foundations, clearly labelled studio work, and founder context.
- Keep Fira Sans as the primary interface font and use `react-icons` for the standardized icon system.
- Keep the quiet, theme-aware boot shell and the API-backed project skeleton; do not replace them with a generic spinner without new evidence.
- Treat the paired frontend/backend workflow as the canonical local development model.
- Use a production build plus both services for performance validation.
- Do not add an application fix for extension-originated `runtime.lastError` messages.
- Preserve unrelated dirty work; this checkpoint does not claim the website migration is committed or released.

## Unresolved / not proven

- Public deployment, CDN behavior, TLS configuration, external uptime, and production hosting have not been validated by this checkpoint.
- The browser-extension console messages remain present in the Lighthouse environment, although they are outside application scope.
- The source migration and current website changes remain uncommitted in the working tree; only this documentation checkpoint is intended for archival commit.
- No launch, incorporation, financial, GPU, infrastructure, or product-strategy change occurred.

## Next direction

Resume with visual/content refinement on the current source tree, using the production-preview workflow as the performance baseline. Before any release claim, inspect the live working tree, run the Node 26 checks, validate the responsive and reduced-motion states, and separately decide how the in-progress migration should be committed or released.

Resume from: the current `main` checkout after the production-preview Lighthouse milestone, with the backend/frontend pairing understood and the migration changes intentionally still dirty.

Next objective: continue the next scoped corporate-site layout or content improvement, then re-run production-preview checks without conflating them with Vite development metrics.
