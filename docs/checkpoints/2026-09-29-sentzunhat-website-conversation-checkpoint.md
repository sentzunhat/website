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

## Latest state — 2026-09-30

- Repository: public `sentzunhat/website`, organization `sentzunhat`, branch
  `main`. The 2026-09-30 checkpoint commit `9273885` extended this document;
  current follow-up changes are recorded below and will receive their own
  commit. Verify remote state again after push.
- After the 2026-09-29 container milestone, `979c6b4` added build-time HTML for
  the homepage and six project pages, metadata/canonicals/schema, sitemap and
  AI-discovery files. `3a5a5d5` refined the Nawat/Pipil-inspired energy-line hero
  while retaining proportional geometry and leaving the theme and 3D scene
  alone. `61b3f59` recorded the production SEO/AEO/GEO audit and the proposed
  sliding book-page section-navigation work item `f07ad639`.
- A user-supplied Lighthouse 13.4.1 report for `https://sentzunhat.com/`, fetched
  `2026-09-30T13:33:39Z`, directly confirms production page reachability and
  reports Performance 100, Accessibility 96, Best Practices 100, SEO 100, and
  Agentic Browsing 100. Metrics: FCP 0.4 s, LCP 0.5 s, Speed Index 0.7 s, TBT
  10 ms, CLS 0.002, Interactive 0.8 s, and server response 120 ms.
- Accessibility findings in that report: exploration-card links had contrast
  ratios 1.35:1 (sky), 1.23:1 (aqua), and 3.94:1 (green), below 4.5:1 for the
  reported text; the visible solar control said “Center on Sun” but its
  explicit accessible name was “Center view on the Sun.” The follow-up changed
  light-mode link text colors and matched the button name to its visible text.
- `npm run check` then passed frontend/backend typecheck, ESLint, and both
  production builds (19 existing lint warnings, no errors; the lazy solar chunk
  still triggers the existing >500 kB build warning). Lighthouse 13.5.0 on the
  rebuilt local production preview scored Accessibility 100 and SEO 100.
- Calculated light-card contrast against `#f7fbfc`: 6.17:1 sky, 6.04:1 aqua,
  and 5.78:1 green. The existing bright accents remain in dark mode and solar
  artwork.
- Live `robots.txt`, `sitemap.xml`, and `llms.txt` were fetched successfully.
  The sitemap lists the homepage and six project URLs; `llms.txt` describes the
  company/projects and links to compact and extended context files.
- Unminified/unused JavaScript savings are reported, but the report attributes
  most listed bytes to browser extensions; it also lists 58 KiB unused in the
  lazy solar chunk. Recheck with extensions excluded before treating these
  savings as application work. Production performance scores are already 100.

## Active priorities and unresolved work — 2026-09-30

- `c3d0e4a8` (SEO/AEO/GEO verification) now has a production Lighthouse report;
  its previous “no fresh checker report” blocker is cleared for Lighthouse.
  Search Console indexing and sitemap-read evidence are still unavailable.
  Lighthouse SEO 100 and Agentic Browsing 100 do not prove search ranking,
  indexing, citations, or an AEO/GEO checker score.
- Next: confirm deployment, rerun production Lighthouse, inspect the homepage
  and six project URLs in Search Console, confirm sitemap processing, and
  capture page-by-page structured-data results. Run the same AEO/GEO checker
  used for the earlier 47/100 report when its URL/tool is available.
- `f07ad639` remains plan-ready: prototype sliding book-page navigation
  sequentially, preserving crawlable content, stable layout, reduced motion,
  and persistent header/footer. Do this after or alongside the accessibility
  corrections; keep the theme and approved 3D universe intact.
- The 2026-09-29 `2a1f7bb` project-universe/container work remains pushed. Its
  local named-volume persistence check is not proof of DigitalOcean volume
  persistence. Verify the actual App Platform mount before making that claim.
- UUID advisory `2a1dc541` remains separate. HAWP validation currently reports
  incomplete closed records `7b5feb25`, `8c2e01f4`, and `9508bdf5`; leave these
  separate from the production accessibility/search work.

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

- The supplied Lighthouse run verifies a production document response and page metrics at its fetch time. It does not establish CDN/TLS configuration, uptime, indexing, or search ranking.
- Local named-volume survival was verified after `2a1f7bb`; DigitalOcean App Platform `/data` persistence remains unverified.
- Browser-extension `runtime.lastError` messages remain outside the application boundary and were not modified.
- The 20 ESLint warnings and the Three.js chunk-size warning remain. The three moderate npm audit entries are tracked separately in `.hawp/work/active/2a1dc541/plan.md`; no forced downgrade or UUID override was applied.
- That separate dependency-advisory work item remains `plan-ready`; its next
  action is to reproduce the compatibility options in the Zacatl repository.
- `.hawp/bin/hawp` is a committed macOS ARM binary; a portable contributor installation strategy is unresolved.
- `hawp work validate` reports three existing closed-record completeness omissions: `7b5feb25` lacks Verification/Close Checklist, `8c2e01f4` lacks Outcome/Close Checklist, and `9508bdf5` lacks Outcome. Backlog consistency, evidence integrity, verification clarity, and dead-link checks pass.
- No launch, incorporation, financial, GPU, infrastructure, or product-strategy change occurred.

## Next direction

Resume from the latest pushed `main` commit after this follow-up and the supplied production Lighthouse report dated 2026-09-30. The measured source-level accessibility findings are fixed and local Lighthouse now scores Accessibility/SEO 100. Next objective: confirm deployment, verify production accessibility, then complete Search Console/sitemap verification and the same-checker AEO/GEO comparison. Keep `f07ad639` queued until these checks are captured. Separately, verify DigitalOcean's durable `/data` mount before claiming hosting persistence.
