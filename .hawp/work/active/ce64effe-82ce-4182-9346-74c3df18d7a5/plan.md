# Install detectable GA4 with navigation analytics

ID: `ce64effe-82ce-4182-9346-74c3df18d7a5`
Type: improvement
Status: in-progress
Opened: 2026-10-01
Updated: 2026-10-02

input: |
  Google Tag Assistant does not detect the tag before a visitor accepts the site's opt-in prompt. Install the supplied GA4 tag in the page head, collect page and internal navigation activity, and report device categories.

context: |
  Zacatl's Layers class auto-registers repository, provider, and route-handler classes from the layer arrays. The application also uses symbol tokens for ports, so the composition root must alias those symbols to registered implementation classes without making upper layers import infrastructure adapters. Google Analytics uses stream `G-8TVQJXLW0K`; Enhanced Measurement is enabled. Mictlan device handling is authenticated device identity, not public web audience analytics.

mission: |
  Keep the existing concise Zacatl composition and expose the Google tag in the initial HTML. Track page views, internal navigation links, and GA4's standard device/browser/OS categories while retaining an opt-out and regional consent defaults.

constraints: |
  Keep domain/application code independent of infrastructure. Do not collect device fingerprints or advertising data. Default analytics on outside the configured EEA/UK regions, preserve explicit opt-outs, and do not claim production collection until a live event is verified.

output: |
  Concise Zacatl composition, detectable GA4 tag, page and click events, aggregate device reporting, opt-out settings, configuration instructions, and accurate Turso module guidance.

## Planned sequence

1. Confirm the actual Zacatl Layers and dependency-injection registration contracts.
2. Follow Tekit's provider convention: keep each `port.ts` beside `adapter.ts`, inject Zacatl class tokens, and let its layer arrays register implementations.
3. Place the supplied Google tag in the HTML head; explicitly send page views for document loads, SPA history changes, and hash navigation, plus internal-link click events.
4. Add regional Consent Mode defaults and persistent enable/disable controls. Keep ad storage, user data, Google signals, and ad personalization disabled; do not fingerprint visitors.
5. Update the separate Turso investigation with an evidence-based recommendation for an optional Zacatl module versus a custom Sequelize dialect.
6. Run lint, typechecks, builds, a local runtime API smoke, and browser checks for tag detection, page/click requests, and opt-out persistence.

## Verification

Completed 2026-10-01. Tekit backend files inspected for its provider/repository layout, class-token injection, and main-layer aggregators. HAWP canonical node project structure and service-design composition/layering/boundary standards reviewed and applied. Provider ports/adapters now share feature folders; the Sequelize repository has its port beside its adapter. Zacatl `Layers` receives only the main route/provider/repository aggregators; its standard class-token registration resolves handlers and providers.

`npm run check` passed frontend/backend typecheck, lint (0 errors; 19 existing frontend warnings), frontend client/SSR/static builds, and backend build. `git diff --check` passed. A fresh local DB runtime smoke returned HTTP 200 from `/api/health`, `/api/projects`, `/`, and `/projects/hawp/`; the two project IDs were UUIDs, SQLite integrity returned `ok`, and no FK violations were returned.

At the initial implementation, the browser showed an analytics opt-in prompt with Accept/Decline. The provided measurement ID `G-8TVQJXLW0K` was initially configured in the frontend analytics module. The later owner clarification below replaces the global prompt with a static head tag and persistent opt-out settings.

The Turso work item was updated with current official-source research and the recommendation to prototype an optional Zacatl Turso module before attempting a custom Sequelize dialect. That investigation remains open.

## Regression follow-up — Google tag command queue

The owner reported that Analytics still received no data after accepting consent. On the deployed site, the tag loader returned HTTP 200, but the browser emitted no `google-analytics.com/g/collect` request after acceptance. The local gtag shim had queued rest-parameter arrays, while Google's documented bootstrap queues the original `arguments` object. The shim now preserves Google's expected command shape.

Local verification after the change: `npm run check` passed. In a fresh local production preview, accepting consent loaded the Google tag and emitted a `page_view` collection request for `G-8TVQJXLW0K`; Chrome DevTools Protocol blocked the collection endpoints during this check, so no local-preview event was transmitted. Public deployment of this correction and a live-site collection request remain pending.

## Owner clarification — richer collection without the global opt-in barrier

The owner clarified that analytics needs to be detectable immediately and should cover page views, clicked pages, and device information. The global opt-in prompt was removed. The tag now loads from the initial HTML head; the frontend explicitly sends page views for document loads and SPA history/hash changes, emits standard `click` events for same-site links without query strings, and Enhanced Measurement handles outbound clicks and scrolls. GA4's aggregate browser, OS, screen, and device-category reports supply the device view; Mictlan's authenticated fingerprint model is deliberately not copied.

Consent Mode defaults analytics on outside the EEA/UK, applies denied analytics storage to those regions until an explicit choice, and leaves advertising-related consent denied. Footer settings allow a persistent explicit opt-out or enable choice. Earlier local preview checks confirmed the tag request and page-view request, the internal-link click request, and that a saved opt-out survives reload while suppressing collection. Collection requests were blocked at the browser during those tests. Explicit document/SPA pageview tracking was added after inspecting Google's SPA guidance; production rollout and GA4 Realtime receipt remain pending.

## Outcome — 2026-10-01

The server uses Zacatl's layer aggregators and class-token dependency registration. Provider/repository ports sit beside their adapters in feature folders. The frontend now installs GA4 `G-8TVQJXLW0K` in the HTML head, tracks page views and internal links, uses Enhanced Measurement for outbound clicks/scrolls, reports aggregate device categories, and exposes regional consent and persistent opt-out settings.

## October 2 regression follow-up — initial and virtual page views

Investigation: `src/apps/frontend/index.html` configures the tag with `send_page_view: false`. Before this follow-up, `installAnalyticsClickTracking()` registered `popstate` and `hashchange` listeners but did not send an initial page view. The homepage booklet updates section hashes with `history.pushState`, which emits neither event. Therefore a normal document load and in-app booklet navigation could be absent from GA4 despite the tag being installed. The existing click event does include destination path and hostname; GA4 reporting of those event parameters may require registering custom dimensions.

Implementation: send one initial `page_view` unless the visitor has explicitly opted out; send a virtual page view after same-origin links change the URL through `pushState`; retain native `popstate` and `hashchange` tracking and suppress duplicate reports for the same URL. Production page views retain the full `page_location`, so GA4's hostname dimension can separate `localhost` from `sentzunhat.com` without introducing a custom hostname parameter.

Verification: `npm run check` passed frontend/backend typecheck, lint, and frontend client/SSR/static plus backend builds (19 existing lint warnings). In a clean production preview, the initial `page_view` included the local full page URL; selecting `Why Sentzunhat` emitted an internal `click` and a second `page_view` for `/#about`. The GA collection endpoint returned HTTP 204. Live production receipt remains unverified. HAWP MCP inspection found the connected GSC Wizard account lacks Google Analytics scope. The authenticated Chrome Analytics home view showed Sentzunhat and Mochilada page titles, but route, click-parameter, and technology breakdowns have not yet been retrieved.

## Close Checklist

- [x] Tekit provider/repository structure and HAWP canonical layering guidance were inspected and applied.
- [x] Redundant symbol factories were removed while keeping port contracts beside adapters.
- [x] GA4 tag is present in the initial HTML head, with page views, internal link clicks, and persistent preferences.
- [x] Gtag command shim now queues the original `arguments` object; local preview emitted a page-view request after opt-in.
- [x] Local browser preview emitted a page-view and internal click request; explicit opt-out persisted and suppressed collection after reload. Requests were blocked during verification.
- [x] Typechecks, lint, builds, diff checks, backend smoke, and browser decline/reopen behavior passed.
- [x] Push the head tag and interaction tracking (`b4ceb24`, `488c3cf`) and confirm the push succeeded.
- [ ] Confirm the production deployment serves the new tag and verify live page/click events in GA4 Realtime. The live site still serves the old bundle as of 2026-10-01 21:36 UTC.
- [x] Turso module recommendation and current pricing source were added to the separate active investigation.

## Follow-on homepage booklet — 2026-10-02

The owner asked to proceed with the sliding-door sections once project data and sections were in place. The current homepage already has a data-backed commercial focus, database-backed HAWP/Zacatl cards, and configured exploration cards. The shared `SectionBooklet` now wraps the seven existing sections after the hero, with one-panel horizontal snap scrolling, swipe/scroll support, dimmed/glowing previous/next controls, a section count hint, anchor-aware navigation, and reduced-motion styling. Local preview verified a next-button panel advance and the `#about` link moving to its panel. Frontend typecheck, focused lint, production frontend build, and `git diff --check` passed. This follow-on is not yet committed or deployed.
