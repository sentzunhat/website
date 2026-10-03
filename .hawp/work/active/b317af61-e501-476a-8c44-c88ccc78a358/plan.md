# Measure marketing actions and homepage section reach

ID: b317af61-e501-476a-8c44-c88ccc78a358
Type: improvement
Status: plan-ready
Opened: 2026-10-02
Updated: 2026-10-02

input: |
  Give Sentzunhat one useful marketing overview for public traffic: routes, views, clicks and button actions, sources, devices, scroll depth, and which homepage sections visitors reached. Keep usage and implementation lean.

context: |
  The GA4 property sentzunhat-corp (557072524), web stream 15939499111, and measurement ID G-8TVQJXLW0K are confirmed. The authenticated browser now has a four-tab Sentzunhat marketing overview with the exact Hostname filter sentzunhat.com on every tab. Existing code sends page_view and same-site link click events, but no section reach, scroll milestones, or non-link button action events. GA4 Admin showed no custom dimensions on October 2. The dated baseline and current audit are under a1206037-b80f-409e-a394-fd38c0a4996b. The Neo Financial archive had dbt dashboard model definitions within the inspected paths, not a reusable marketing report UI.

mission: |
  Add a small, privacy-conscious event contract for meaningful site actions and section/scroll reach, then make those signals usable in the public-only GA4 overview.

constraints: |
  Keep the current GA4 setup and site performance. Do not add a paid analytics service, heavy observer package, visitor identifier, or high-cardinality/PII-bearing URL data. Respect explicit analytics denial. Count section reach as exposure, not reading or comprehension. Keep localhost out of the marketing overview via exact Hostname filter. Coordinate homepage interaction changes with f07ad639 and mobile header changes with e499ba73-5323-4284-a26d-f5caac7921df. Do not change GA4 Admin definitions, consent, or retention without owner approval.

output: |
  A stable event taxonomy, light implementation with meaningful browser verification, updated GA4 overview when data is available, documented definitions and limits, and a checkpoint of production receipt or its remaining gap.

## Current report

[Sentzunhat marketing overview](https://analytics.google.com/analytics/web/?authuser=5#/analysis/a410459516p557072524/edit/ORMDbY0mS0WRv_Zbzn3vuA) has four tabs: Pages and traffic (page path, active users, views), Actions and events (event name, active users, event count), Devices and browsers (device category, browser, operating system, platform), and Acquisition sources (session source / medium). Every tab filters Hostname exactly to `sentzunhat.com`. The report was inspected for September 4–October 1, 2026. Date ranges should be selected explicitly when comparing later windows. The existing [baseline](../../status/2026/10/02/a1206037-b80f-409e-a394-fd38c0a4996b/ga4-baseline.md) separates localhost and public traffic.

## Event contract and sequence

1. Audit the current GA emitter and consent path. Stop putting query strings in internal click destinations if they may carry personal data. Use stable action/section IDs and normalized paths; do not send text contents, arbitrary URLs, user IDs, or free-form search terms.
2. Keep the existing `page_view` and same-site anchor `click` signals. Add `site_action` only for meaningful controls without a link event, such as booklet arrows; use a stable `action_id` and avoid duplicate signals for one activation.
3. Add `section_view` for the hero and each booklet section after sufficient visible exposure (proposed: at least one second while a meaningful portion is visible). Count once per section per page view, including keyboard, arrow, touch, and anchor navigation. Record `section_id` and optionally index. For tall sections, define `section_end` only when its bottom becomes visible; this is a reach proxy.
4. Define useful scroll milestones (for example 25/50/75/90 percent) on the actual document scroll container. GA Enhanced Measurement already has a scroll signal; inspect its behavior and avoid double counting at 90 percent. For horizontal booklet movement, use section events rather than misleading page-scroll percentages.
5. Verify consent-denied behavior, no duplicate SPA events, touch/keyboard access, reduced motion, narrow/short viewports, and minimal listener/observer overhead. Run check/build plus local browser/network verification. Mark public deployment receipt separately.
6. Confirm which event parameters can be used as dimensions in GA4. Register only necessary event-scoped custom dimensions after owner approval if Admin changes are required. Add section/action/scroll breakdowns to the same public-only exploration and verify the exact Hostname filter on every new tab. Document the data lag and low-volume limits.

## Acceptance

- Routes, public traffic source/medium, device category, OS, browser, and platform remain selectable in one GA4 exploration, filtered to the production hostname.
- Stable action IDs, section reach, section end, and scroll milestones are defined and tested locally; consent denial suppresses their collection.
- Destination paths omit query strings and personal data; duplicate activations and navigation do not inflate counts.
- A production check shows receipt of newly deployed events, or a checkpoint states exactly which deployment/data gate remains open.

Risk: medium. Event naming and GA4 custom definitions affect long-lived reporting; section exposure is an approximation. No website instrumentation or GA4 Admin changes were made in this planning pass.

## October 3 research — device object and next measurements

The owner's edited Looker Studio dashboard already uses GA4's built-in country, city, device category, browser, operating system, and screen-resolution dimensions. Google documents these as collected through the web tag; another GA4 property or a custom device payload is not needed for the current marketing questions. The inspected Mictlan `src/backend/areas/passport/domain/entities/auth/device.ts` schema is an authentication/device context with optional tokens, fingerprints, user agent, CPU, memory, graphics, locale, source summaries, and tenancy. Do not send that object, a derivative fingerprint, or a persistent device ID to GA4. Coarse technology data is already available, while high-cardinality identifiers weaken reporting and introduce privacy risk.

Prioritize three bounded measurements on the existing web stream: (1) project-card selection via GA4's recommended `select_content` event with fixed `content_type=project` and a stable, allowlisted project slug as `content_id`; (2) non-link `site_action` with an allowlisted `action_id` for meaningful controls such as booklet arrows, excluding ordinary decoration and avoiding a second event for the same link; (3) `section_view` with a fixed `section_id` after meaningful visible exposure, at most once per section per page view. The existing GA4 enhanced `scroll` event already covers one 90-percent vertical reach signal, so add lower document-scroll milestones only if a decision needs them, and do not duplicate 90 percent. A scene fallback/error event could be considered later only if it answers a concrete 3D reliability question; record a coarse failure type, never hardware details.

Before expanding events, normalize manually sent page locations and link destinations so query strings, fragments, free-form text, and any accidental personal data are excluded. Keep exact production-host filtering in marketing views and explicit analytics denial. Use built-in GA4 dimensions first; register only the small set of event-scoped parameters actually needed in Looker Studio as custom dimensions, after checking current Admin state. Google says custom parameter reporting may take 24–48 hours after registration. The current screenshot has a small audience, so treat geographic and device splits as directional and avoid adding age/gender or finer-grained location merely to fill the dashboard. This is research and a plan update; no collection code or GA4 Admin definitions changed here.

Source references: [GA4 Tech overview](https://support.google.com/analytics/answer/13820344?hl=en), [Enhanced measurement](https://support.google.com/analytics/answer/9216061?hl=en), [Recommended `select_content`](https://developers.google.com/analytics/devguides/collection/ga4/reference/events), [Custom dimensions](https://support.google.com/analytics/answer/14240153?hl=en-EN), [GA4 PII guidance](https://support.google.com/analytics/answer/6366371?hl=en).
