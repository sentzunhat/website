# Add consent-aware site analytics and simplify Zacatl wiring

ID: `ce64effe-82ce-4182-9346-74c3df18d7a5`
Type: improvement
Status: in-progress
Opened: 2026-10-01
Updated: 2026-10-01

input: |
  Incorporate review feedback that the Zacatl layer setup is too elaborate; add Google Analytics so site traffic can be measured.

context: |
  Zacatl's Layers class auto-registers repository, provider, and route-handler classes from the layer arrays. The application also uses symbol tokens for ports, so the composition root must alias those symbols to registered implementation classes without making upper layers import infrastructure adapters.

mission: |
  Simplify the Zacatl composition to direct port-token class bindings and add optional GA4 pageview tracking with an explicit visitor choice and a way to change that choice later.

constraints: |
  Keep domain/application code independent of infrastructure. Do not transmit analytics unless a visitor opts in. Do not change brand/theme or claim public collection is active.

output: |
  Concise Zacatl composition, optional GA4 tracking with consent controls, configuration instructions, a testable local result, and accurate Turso module guidance.

## Planned sequence

1. Confirm the actual Zacatl Layers and dependency-injection registration contracts.
2. Follow Tekit's provider convention: keep each `port.ts` beside `adapter.ts`, inject Zacatl class tokens, and let its layer arrays register implementations.
3. Implement an isolated frontend GA4 client, controlled pageviews, opt-in/decline choice, persistent settings access, and environment-based measurement ID.
4. Update the separate Turso investigation with an evidence-based recommendation for an optional Zacatl module versus a custom Sequelize dialect.
5. Run lint, typechecks, builds, a local runtime API smoke, and a browser check of analytics consent controls.

## Verification

Completed 2026-10-01. Tekit backend files inspected for its provider/repository layout, class-token injection, and main-layer aggregators. HAWP canonical node project structure and service-design composition/layering/boundary standards reviewed and applied. Provider ports/adapters now share feature folders; the Sequelize repository has its port beside its adapter. Zacatl `Layers` receives only the main route/provider/repository aggregators; its standard class-token registration resolves handlers and providers.

`npm run check` passed frontend/backend typecheck, lint (0 errors; 19 existing frontend warnings), frontend client/SSR/static builds, and backend build. `git diff --check` passed. A fresh local DB runtime smoke returned HTTP 200 from `/api/health`, `/api/projects`, `/`, and `/projects/hawp/`; the two project IDs were UUIDs, SQLite integrity returned `ok`, and no FK violations were returned.

The browser showed the analytics opt-in prompt with Accept/Decline. Decline saved and closed the notice; the footer's Analytics settings control reopened it. No Accept action was taken during this check, so no Google request was sent. The provided measurement ID `G-8TVQJXLW0K` is now the source default, with `VITE_GA_MEASUREMENT_ID` available as an override. Public GA collection/deployment are unverified.

The Turso work item was updated with current official-source research and the recommendation to prototype an optional Zacatl Turso module before attempting a custom Sequelize dialect. That investigation remains open.

## Regression follow-up — Google tag command queue

The owner reported that Analytics still received no data after accepting consent. On the deployed site, the tag loader returned HTTP 200, but the browser emitted no `google-analytics.com/g/collect` request after acceptance. The local gtag shim had queued rest-parameter arrays, while Google's documented bootstrap queues the original `arguments` object. The shim now preserves Google's expected command shape.

Local verification after the change: `npm run check` passed. In a fresh local production preview, accepting consent loaded the Google tag and emitted a `page_view` collection request for `G-8TVQJXLW0K`; Chrome DevTools Protocol blocked the collection endpoints during this check, so no local-preview event was transmitted. Public deployment of this correction and a live-site collection request remain pending.

## Outcome — 2026-10-01

The server uses Zacatl's layer aggregators and class-token dependency registration. Provider/repository ports sit beside their adapters in feature folders. The frontend has GA4 pageview tracking for `G-8TVQJXLW0K`, opt-in consent, and a persistent settings control. It sends no analytics until the visitor accepts.

## Close Checklist

- [x] Tekit provider/repository structure and HAWP canonical layering guidance were inspected and applied.
- [x] Redundant symbol factories were removed while keeping port contracts beside adapters.
- [x] GA4 loading is environment-configured, opt-in, manually pageview-tracked, and settings can be reopened.
- [x] Gtag command shim now queues the original `arguments` object; local preview emitted a page-view request after opt-in.
- [x] Typechecks, lint, builds, diff checks, backend smoke, and browser decline/reopen behavior passed.
- [ ] Push the correction, confirm the production deployment serves it, and verify the live page emits `page_view` after opt-in.
- [x] Turso module recommendation and current pricing source were added to the separate active investigation.
