### Status Report

#### Intent

Install a detectable GA4 tag, collect page and internal navigation activity, and provide useful device reporting without Mictlan-style visitor fingerprinting.

#### Current State

The owner clarified that the global opt-in prompt blocks useful collection. The implementation now loads the tag from the page head, uses regional Consent Mode defaults, tracks internal navigation clicks and history/hash page views, and provides persistent enable/disable settings. Typecheck, lint, and production build pass. Changes are pushed; production has not rolled out the new bundle yet.

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

#### What Remains Unproven

The commits are pushed, but the latest source has not been deployed. A page-view/click request from the deployed bundle and receipt in GA4 Realtime remain unverified.

#### Constraints

No Analytics event was transmitted from the local preview. No deployment action was available in repository configuration. Google's standard device reports are aggregate browser/device categories, not Mictlan's authenticated device fingerprint data.

#### Help Wanted

Check the GitHub/DigitalOcean deployment status and trigger or repair the `main` deployment if it has not started. Then confirm the live HTML and verify Tag Assistant plus GA4 Realtime.

#### Suggested Next Step

After deployment, open the live site without accepting a prompt and confirm Tag Assistant detects `G-8TVQJXLW0K`, then verify page views and internal link clicks in the browser Network panel and GA4 Realtime. Test the footer opt-out separately.
