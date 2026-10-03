# Status Report: marketing analytics overview and mobile menu handoff

## Intent

Give the owner a usable public-only GA4 overview now and two concrete continuation paths: deeper marketing measurement and the mobile header menu.

## Current State

The [Sentzunhat marketing overview](https://analytics.google.com/analytics/web/?authuser=5#/analysis/a410459516p557072524/edit/ORMDbY0mS0WRv_Zbzn3vuA) is a four-tab GA4 Exploration. The deeper event work is [plan-ready](../../../../active/b317af61-e501-476a-8c44-c88ccc78a358/plan.md), as is the [mobile menu](../../../../active/e499ba73-5323-4284-a26d-f5caac7921df/plan.md). No website UI or analytics code was changed in this pass.

## What Was Inspected

The authenticated GA4 property and Exploration builder; existing analytics emitter and homepage booklet; shared header and CSS; Tekit mobile navigation reference; the dated [GA4 baseline](../../../../status/2026/10/02/a1206037-b80f-409e-a394-fd38c0a4996b/ga4-baseline.md); and dashboard model definitions in the local Neo Financial archive. Within the inspected Neo paths, no reusable marketing dashboard UI was found.

## What Changed

Created four GA4 Exploration tabs, each with **Hostname exactly matches `sentzunhat.com`**: Pages and traffic (page path, users, views), Actions and events (event name, users, event count), Devices and browsers (device category, browser, OS, platform), and Acquisition sources (session source / medium). The viewed range was September 4–October 1, 2026. Added two HAWP plans and their paste-ready handoffs: [analytics](../../../../active/b317af61-e501-476a-8c44-c88ccc78a358/handoff.md) and [mobile menu](../../../../active/e499ba73-5323-4284-a26d-f5caac7921df/handoff.md). Updated the audit plan/backlog. No GA4 Admin definitions were changed.

## What Was Directly Verified

The signed-in GA4 browser showed the four named tabs and exact production hostname filter for each. The existing source sends `page_view` and same-site link `click` events. It does not send section reach, scroll milestones, or non-link button actions. The existing baseline separated local and public traffic and recorded zero custom dimensions at inspection. The Tekit reference contains a translucent mobile menu pattern; the Sentzunhat phone header currently uses a second horizontally scrolling link row.

## What Remains Unproven

Public receipt of the recently deployed page-view fix; destination-level click breakdown; new action/section/scroll signals; how the menu behaves after implementation; and whether low-volume reports stay useful as traffic grows. A `section_view` signal would prove exposure by a stated threshold, not that someone read a section. Archived Neo inspection was scoped to discovered analytics/dashboard paths, not all project files.

## Constraints

Keep usage and implementation lean. Filter the marketing Exploration to the public domain; use the prior baseline for localhost comparison. Respect consent and avoid personal data in events. No paid connector or new Admin settings in this pass.

## Help Wanted

Review the proposed stable event IDs and section-exposure threshold before implementation, and confirm the mobile menu remains usable at narrow widths and with keyboard navigation.

## Suggested Next Step

Start the two handoffs independently. The mobile agent owns the header/CSS. The analytics agent owns the event contract and GA4 overview. Verify source checks, rendered behavior, and production receipt before closing either item.
