# GA4 routes, navigation, and device report

ID: `a1206037-b80f-409e-a394-fd38c0a4996b`
Type: audit
Status: in-progress
Opened: 2026-10-02
Updated: 2026-10-02

input: |
  Use Google Analytics, an MCP, or the authenticated browser to create a simple report for the different routes, page views, clicks, devices, and platform/technology. Clearly distinguish localhost traffic from the public URL.

context: |
  The frontend uses GA4 measurement ID `G-8TVQJXLW0K`. Current source sends page view locations as full URLs and internal click events with `link_url` and `link_domain` parameters. Initial page-view and pushState navigation gaps were corrected under existing item `ce64effe-82ce-4182-9346-74c3df18d7a5` and pushed as `2fcc302`; public receipt after that change remains unverified. The available GSC Wizard GA4 MCP returned `connected: false` because its Google account lacks the Analytics scope; user does not want a paid connector. Google publishes an experimental, Apache-2.0 local GA MCP with read-oriented report tools. Using it requires the Analytics APIs enabled in a Google Cloud project and local Google OAuth/ADC credentials with Analytics read access. No GA MCP was configured in the local Codex config. The authenticated Chrome GA4 property and matching measurement stream were directly confirmed on 2026-10-02.

mission: |
  Produce a compact, source-backed GA4 baseline covering production route views, same-site click destinations, device category, browser/OS/platform, and date range. Show localhost separately from production and identify data-quality or custom-dimension gaps.

constraints: |
  Use read-only Analytics access. Do not change GA4 Admin definitions, filters, retention, or consent settings without explicit approval. Keep localhost and production identifiable by the GA4 hostname/page-location dimensions. Avoid collecting personal identifiers or treating low-volume/thresholded data as exact. Keep the deliverable simple; do not build a dashboard or add a new analytics service.

output: |
  A dated report with the property/stream confirmation, date window, page and click tables, device/technology summary, localhost-versus-production comparison, method, caveats, and the next minimal setup step if reporting dimensions are missing.

## Investigation findings

- Confirmed source: `src/apps/frontend/index.html` loads GA4 `G-8TVQJXLW0K` and sets `send_page_view: false`.
- Confirmed source: `src/apps/frontend/src/analytics/google-analytics.ts` emits same-origin `click` events with path and hostname parameters and was missing an initial `page_view`; the fix is tracked in `ce64effe-82ce-4182-9346-74c3df18d7a5`.
- Confirmed source: `src/apps/frontend/src/pages/home/components/section-booklet.tsx` changes hashes using `history.pushState`, which does not trigger the GA module's prior `popstate` or `hashchange` tracking.
- Confirmed tool result: GA4 property discovery through GSC Wizard is unavailable until its connected Google account receives Analytics scope.
- Direct browser observation: the authenticated GA4 property `557072524` has web stream `15939499111` for `https://sentzunhat.com`, with matching measurement ID `G-8TVQJXLW0K` and active collection in the past 48 hours.
- The dated baseline in `.hawp/work/status/2026/10/02/a1206037-b80f-409e-a394-fd38c0a4996b/ga4-baseline.md` records Sep 4–Oct 1 route, host, event, device, browser, and OS counts. Both historical `click` events were local test traffic; no public click was recorded in the selected window.
- Admin → Custom definitions showed 0 custom dimensions. The historical Events report did not expose click destinations.

## Planned sequence

1. Verify public receipt of the pushed initial and virtual page-view correction under `ce64effe-82ce-4182-9346-74c3df18d7a5` after new GA4 data accumulates.
2. Confirm the open GA4 property ID and its web stream measurement ID match `G-8TVQJXLW0K`.
3. Use Google's official open-source local GA MCP with read-only access, or the authenticated Analytics browser if local OAuth/API setup is unavailable; gather a consistent date range for Pages and screens, Events, Tech details, and devices.
4. Break down page locations by hostname to separate `localhost` from `sentzunhat.com`; report pages/routes and click event destinations separately.
5. Check whether `link_url`/`link_domain` are registered event-scoped custom dimensions. If they are not, document the manual registration required; do not change Admin definitions without approval.
6. Save the dated report and state what low traffic, consent behavior, sampling, or thresholding limits confidence.

## Options and recommendation

- Use Google's official `googleanalytics/google-analytics-mcp` local server: recommended free, self-hosted option for structured reports. It is experimental and requires local Google OAuth/ADC plus Analytics API enablement and read access.
- Use the currently authenticated Google Analytics browser for the same standard reports if local MCP setup is not worthwhile; no connector subscription or new reporting service is needed.
- Build a custom analytics dashboard or data pipeline: defer because the current request is for a simple report and GA4 already has standard page, event, device, browser, and platform reports.

Risk: low for read-only report generation; medium if property Admin settings or collection behavior must change. Can implement now: yes for report gathering once a supported authenticated read path is available. GSC Wizard is unavailable and not preferred due to the user's cost constraint; use the official local MCP or authenticated browser instead. Do not create a Cloud project, change billing, or grant broader permissions as part of setup without checking the existing project's billing and using the narrow read-only scope.

## Verification

Completed: confirmed property/stream identity; retrieved route, click, device, browser, and platform reports; separated public from local hosts; checked custom dimensions; saved the dated baseline. Pending: assess fresh public data after the Oct 2 instrumentation deployment and decide whether to register `link_url`/`link_domain` for destination reporting. No GA4 Admin setting was changed.

## October 2 exploration update

Created [Sentzunhat marketing overview](https://analytics.google.com/analytics/web/?authuser=5#/analysis/a410459516p557072524/edit/ORMDbY0mS0WRv_Zbzn3vuA) in the authenticated GA4 property. Its four tabs are Pages and traffic, Actions and events, Devices and browsers, and Acquisition sources. Each uses **Hostname exactly matches `sentzunhat.com`**; the viewed window was September 4–October 1, 2026. The browser showed the tab names, configured dimensions/metrics, and hostname filters. This is a public-only overview; the earlier baseline remains the source for a separate local/public comparison. New action, scroll-depth, and booklet reach measurement belongs to `b317af61-e501-476a-8c44-c88ccc78a358`. Fresh production receipt and destination-level reporting remain unverified.
