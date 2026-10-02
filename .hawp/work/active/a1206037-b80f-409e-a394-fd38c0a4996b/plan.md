# GA4 routes, navigation, and device report

ID: `a1206037-b80f-409e-a394-fd38c0a4996b`
Type: audit
Status: plan-ready
Opened: 2026-10-02
Updated: 2026-10-02

input: |
  Use Google Analytics, an MCP, or the authenticated browser to create a simple report for the different routes, page views, clicks, devices, and platform/technology. Clearly distinguish localhost traffic from the public URL.

context: |
  The frontend uses GA4 measurement ID `G-8TVQJXLW0K`. Current source sends page view locations as full URLs and internal click events with `link_url` and `link_domain` parameters. Initial page-view and pushState navigation gaps are being fixed under existing item `ce64effe-82ce-4182-9346-74c3df18d7a5`. The available GSC Wizard GA4 MCP currently returns `connected: false` because its Google account lacks the Analytics scope. The authenticated Chrome window is open on a GA4 property whose home page lists Sentzunhat and Mochilada page titles; property-to-measurement-stream identity and full breakdowns still need direct confirmation.

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
- Direct browser observation: the authenticated Analytics home view displays a Sentzunhat title and a Mochilada page title, plus a summary chart and country/channel widgets. This establishes that the open property contains some Sentzunhat-related records, but does not confirm that it is the `G-8TVQJXLW0K` stream or provide route/click/device breakdowns.

## Planned sequence

1. Deploy the initial and virtual page-view correction under `ce64effe-82ce-4182-9346-74c3df18d7a5` and confirm a live event.
2. Confirm the open GA4 property ID and its web stream measurement ID match `G-8TVQJXLW0K`.
3. Use available read-only report tools or the authenticated Analytics browser to gather a consistent date range for Pages and screens, Events, Tech details, and devices.
4. Break down page locations by hostname to separate `localhost` from `sentzunhat.com`; report pages/routes and click event destinations separately.
5. Check whether `link_url`/`link_domain` are registered event-scoped custom dimensions. If they are not, document the manual registration required; do not change Admin definitions without approval.
6. Save the dated report and state what low traffic, consent behavior, sampling, or thresholding limits confidence.

## Options and recommendation

- Use the GSC Wizard GA4 MCP after Analytics scope is connected: recommended for repeatable structured route/device reports and read-only property discovery.
- Use the currently authenticated Google Analytics browser for the same standard reports if MCP access remains disconnected; no new service or code is needed.
- Build a custom analytics dashboard or data pipeline: defer because the current request is for a simple report and GA4 already has standard page, event, device, browser, and platform reports.

Risk: low for read-only report generation; medium if property Admin settings or collection behavior must change. Can implement now: yes for report gathering once a supported authenticated read path is available. The current MCP is not connected to Analytics; continue with available authenticated browser read access where the UI controls permit it.

## Verification

Pending: confirm property/stream identity; retrieve exact route, click, device, browser, and platform reports; verify host separation and event-parameter dimensions; publish a dated report.
