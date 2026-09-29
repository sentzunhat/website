# 2026-09-29 — Sentzunhat website progress and production checkpoint

Timeline note: this extends the earlier production-preview milestone with the
frontend/backend structure, interactive solar-system hero, developer tooling,
accessibility correction, and production container completed later on
2026-09-29.

Repository: `sentzunhat/website`
Organization: `sentzunhat`
Branch: `main`

## Before

The website was being refined as a corporate landing page with an approved theme and hero direction, but its section order, icon/font system, loading behavior, and performance evidence still needed work. Development Lighthouse runs were slow and noisy because they measured Vite HMR and development modules. The frontend could also remain available when the API backend was absent, producing `/api/projects` proxy failures. A browser reported `Receiving end does not exist` and `runtime.lastError` messages whose source had not yet been isolated.

At this checkpoint's initial baseline, the repository was in an intentional
migration state from the older root Vite files to the TypeScript React/Vite
frontend and Fastify/Sequelize/SQLite backend under the workspace source tree.
That migration and related changes were later completed and committed together
in `c61a9f41a891912c18b6c8a9ae0cfb0f35834fc0`.

## During

The corporate page hierarchy was reordered to communicate the company in a clearer sequence: hero, current commercial focus, company context, public engineering proof, vision, principles, studio explorations, and founder context. The theme and hero were retained as approved rather than visually imitated from reference sites.

The interface system was standardized around Fira Sans and `react-icons/fa`. The competing Lucide dependency was removed, technical metadata remained semantically distinct, and the existing coastal identity assets, theme controls, responsive behavior, and reduced-motion behavior were preserved.

Performance work distinguished development artifacts from shipped behavior. The page gained a small inline, theme-aware boot shell with the Sentzunhat wordmark and `Loading thoughtfully made tools…`, followed by React project-card skeletons while `/api/projects` resolves. The boot shell is replaced by the full application after React mounts. It uses real text because CSS-only blocks are not meaningful FCP content for Lighthouse.

The local service workflow was made explicit. The root development command pairs frontend and backend processes with `concurrently --kill-others-on-fail`; Vite proxies `/api` to port `3001`. For production-preview validation, the compiled backend runs on port `3001` and the frontend preview runs on port `4173`.

The hero's decorative solar-system concept was advanced into a lazily loaded,
interactive Three.js scene. Planet positions use Keplerian calculations from
NASA J2000 mean orbital elements, including eccentricity, inclination, and
orbital timing; rendered sizes and distances are compressed for the card. The
scene uses seeded three-dimensional stars and nebula-like clouds, caps pixel
ratio, throttles rendering, and renders only while visible. The panel supports
pointer/touch orbit control and a “Center on Sun” control.

Development ports are now pinned to Vite `5174` and production preview `4174`,
both strict. Linting now uses Zacatl's exported ESLint configuration while
retaining React Hooks and Fast Refresh checks.

The user-reported focused-canvas accessibility warning was traced to marking
the pointer-interactive Three.js canvas `aria-hidden`. That attribute was
removed; the canvas now has `role="img"` and an accessible label. The live
browser accessibility tree exposed it as a labelled image after the change.
The separate `runtime.lastError` / “Receiving end does not exist” messages have
no application source match and remain browser-extension messaging noise. Vite
connection and React DevTools messages are development information, not app
errors.

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

The previous development profile of approximately `8.4 MB`, `3.3s` FCP, and
`6.5s` LCP should not be used as shipped-performance evidence. It reflected
Vite development tooling rather than the production bundle.

## Latest state — 2026-09-29

- Repository: `sentzunhat/website`, organization `sentzunhat`, branch `main`.
- The earlier migration and the new website, tooling, accessibility, and
  container work were included in commit
  `c61a9f41a891912c18b6c8a9ae0cfb0f35834fc0` (`feat: ship Sentzunhat website
  and distroless runtime`). The commit was pushed to `origin/main`; local and
  remote `main` matched and the working tree was clean after the push.
- The production image is built from `node:26-trixie-slim` and runs on
  `gcr.io/distroless/nodejs26-debian13:nonroot` as UID `65532`. Fastify serves
  the built frontend only when `NODE_ENV=production`; the API and static site
  share port `3001`. SQLite defaults to `/data/website.sqlite`, with `/data`
  declared as a volume.
- Verification passed: `npm run check`; Docker build as
  `sentzunhat-website:codex-20260929`; container smoke checks for `/`, built
  JavaScript and CSS, `/api/health`, and `/api/projects` returned HTTP `200`.
  The smoke container used temporary `/data` storage and ran as UID `65532`.
- ESLint passed with no errors and 20 Zacatl-convention warnings. Vite's
  production build still reports a Three.js dynamic chunk of about `570 kB`
  minified (`142 kB` gzip); this is not a failed build.
- The full-tree commit includes `.hawp/bin/hawp`, a 21,151,570-byte
  macOS ARM executable. It is present in the public repository; portability to
  other operating systems and architectures is unverified.

## Decisions and constraints to preserve

- Keep the approved Sentzunhat theme, hero, coastal identity, and corporate narrative direction.
- Keep the hierarchy centered on the corporation, current product focus, public engineering foundations, clearly labelled studio work, and founder context.
- Keep Fira Sans as the primary interface font and use `react-icons` for the standardized icon system.
- Keep the quiet, theme-aware boot shell and the API-backed project skeleton; do not replace them with a generic spinner without new evidence.
- Treat the paired frontend/backend workflow as the canonical local development model.
- Use a production build plus both services for performance validation.
- Keep the solar system lazy-loaded, reduced-motion aware, and limited to rendering while visible; preserve orbital math while treating displayed scales as visual compression.
- Keep strict Vite development/preview ports `5174`/`4174` and Zacatl-based ESLint configuration.
- Keep containerized static serving production-only; local development continues to use Vite with its API proxy.
- Do not add an application workaround for extension-originated `runtime.lastError` messages.
- The migration is no longer dirty: it is part of pushed commit `c61a9f4`.

## Unresolved / not proven

- Public deployment, CDN behavior, TLS configuration, external uptime, and production hosting have not been validated.
- The container smoke test used temporary storage; durable `/data` volume behavior after container replacement and the target hosting platform remain unverified.
- Browser-extension `runtime.lastError` messages remain outside the application boundary and were not modified.
- The 20 ESLint warnings and the Three.js chunk-size warning remain. The three moderate npm audit entries are tracked separately in `.hawp/work/active/2a1dc541/plan.md`; no forced downgrade or UUID override was applied.
- That separate dependency-advisory work item remains `plan-ready`; its next
  action is to reproduce the compatibility options in the Zacatl repository.
- `.hawp/bin/hawp` is a committed macOS ARM binary; a portable contributor installation strategy is unresolved.
- `hawp work validate` still reports one pre-existing closed-record completeness issue: `.hawp/work/closed/2026/09/29/7b5feb25/plan.md` lacks Verification and Close Checklist sections. The new work records pass consistency.
- No launch, incorporation, financial, GPU, infrastructure, or product-strategy change occurred.

## Next direction

Resume from pushed commit `c61a9f41a891912c18b6c8a9ae0cfb0f35834fc0` on a clean `main` checkout. Before claiming deployment, choose the hosting target and verify a persistent `/data` mount, then exercise the built container in that target and recheck responsive, reduced-motion, accessibility, and performance behavior.

Resume from: the post-commit `main` state at `c61a9f4`, with the paired React/Vite + Fastify/Sequelize/SQLite application committed, the local distroless Node 26 image smoke-tested, and no deployment target or durable volume yet verified.

Next objective: select and validate the production hosting/storage target for the distroless image, including durable SQLite storage at `/data`, before making any public deployment claim.
