### Status Report

#### Intent

Install a detectable GA4 tag, collect page and internal navigation activity, and provide useful device reporting without Mictlan-style visitor fingerprinting.

#### Current State

The owner clarified that the global opt-in prompt blocks useful collection. The implementation now loads the tag from the page head, uses regional Consent Mode defaults, tracks internal navigation clicks and history/hash page views, and provides persistent enable/disable settings. Typecheck, lint, and production build pass. Changes are pushed. The owner supplied GA4 Realtime data showing homepage page views and core visit events; the live homepage loads the Google tag. The production project-page HTML still references the prior bundle, so cross-page/click coverage remains unconfirmed.

#### What Was Inspected

- `src/apps/frontend/index.html`, `src/apps/frontend/src/analytics/google-analytics.ts`, and the analytics settings component.
- Mictlan's device schema and guide; those cover authenticated identity and fingerprinting.
- Google Analytics official documentation for page views, Enhanced Measurement, Tech overview, Consent Mode, and tag verification.
- Browser network activity in the local production preview, plus Google documentation on SPA/history page views.

#### What Changed

The Google tag is now present in initial HTML. The frontend sends page views for document loads and history/hash changes; Enhanced Measurement collects outbound clicks and scrolls; internal navigation emits standard `click` events without URL query strings. Aggregate device/browser/OS reporting uses GA4's built-in dimensions. Regional Consent Mode defaults deny analytics storage in the EEA/UK unless visitors explicitly enable it; ad storage, user data, and ad personalization remain denied. Footer settings provide a persistent opt-out and enable choice.

#### What Was Directly Verified

- The local preview loads `https://www.googletagmanager.com/gtag/js?id=G-8TVQJXLW0K` from HTML before React hydration.
- An earlier local preview check observed a GA4 `page_view`; an internal Products link emitted a GA4 `click` event with `/#focus`, `outbound=false`, and device/browser parameters present on the request. Collection endpoints were blocked by browser DevTools; no local-preview events were transmitted.
- Current build explicitly sends page views on document loads and history/hash changes. Browser events could not be re-inspected in a clean session during this turn; production Tag Assistant/Realtime verification remains required.
- Choosing Disable analytics persisted `denied`; after reload the tag still loaded for detection but no collection request was emitted.
- `npm run check` passed after the page-view adjustment; lint reported 19 existing warnings and no errors, and Vite reported the existing large solar-scene chunk warning.
- Commits `b4ceb24` and `488c3cf` were pushed to `origin/main`.
- At 2026-10-01 21:36 UTC, `https://sentzunhat.com/` still served the previous `index-BYAjL7oE.js` bundle and no Google tag in its HTML; `/projects/mochilada/` also returned old static HTML without the tag. The deployment has not yet rolled out these commits.
- Owner-provided GA4 Realtime snapshot shows 4 active users in the last 30 minutes, 4 homepage views, and `page_view`, `first_visit`, `session_start`, and `user_engagement` events. No project title or `click` event appears in the supplied snapshot.
- At 2026-10-01 21:38 UTC, a fresh production homepage loaded the Google tag; `/projects/mochilada/` rendered its project title and also loaded the tag. The project HTML referenced old bundle `index-BYAjL7oE.js`, which contains the measurement ID and page-view code. This confirms tag availability on that route, but does not establish that the pushed hash/history tracking code is in its deployed asset.
- `git ls-remote origin refs/heads/main` matches local `HEAD` at `3389a1adeb71576ff6c3303e1927d39623062303`.

#### What Remains Unproven

Homepage collection is confirmed by the owner's Realtime snapshot. Live tag loading is confirmed on the homepage and Mochilada route. Whether the latest bundle is deployed, project page views and internal click events are arriving, and device categories are populated remains unproven.

#### Constraints

No Analytics event was transmitted from the local preview. No deployment action was available in repository configuration. Google's standard device reports are aggregate browser/device categories, not Mictlan's authenticated device fingerprint data.

#### Help Wanted

Inspect actual outgoing GA4 requests on the live homepage and project route, then use GA4 Realtime/DebugView to confirm project page views, internal click events, and device dimensions. If the project still serves the older hashed bundle, check DigitalOcean deployment status and trigger/repair the deployment.

#### Suggested Next Step

After deployment, open the live site without accepting a prompt and confirm Tag Assistant detects `G-8TVQJXLW0K`, then verify page views and internal link clicks in the browser Network panel and GA4 Realtime. Test the footer opt-out separately.
