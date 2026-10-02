# Status Report

## Intent

Establish a simple GA4 baseline for Sentzunhat routes, clicks, devices, and platform, separating public from local traffic.

## Current State

The authenticated Analytics browser yielded a dated baseline for Sep 4–Oct 1, 2026. The report is saved in `.hawp/work/status/2026/10/02/a1206037-b80f-409e-a394-fd38c0a4996b/ga4-baseline.md`. The work item remains active for a fresh post-change public read and a decision on click destination dimensions.

## What Was Inspected

- GA4 Admin: property picker, web stream details, Custom definitions.
- GA4 Reports: Pages and screens with Hostname, Events with Hostname, and Tech details with Browser, Device category, Platform / device category, and Operating system.
- Existing site analytics source and `.hawp/work/active/a1206037-b80f-409e-a394-fd38c0a4996b/plan.md`.

## What Changed

Saved the baseline report and updated the active plan and backlog. No GA4 Admin setting was changed.

## What Was Directly Verified

- Property `sentzunhat-corp` (`557072524`) has web stream `15939499111` for `https://sentzunhat.com`; measurement ID `G-8TVQJXLW0K` matches the site's source.
- Sep 4–Oct 1: 8 page views (5 public, 3 local), 36 total events, 7 active users. Both `click` events were on local hosts, with no public `click` in the selected range.
- The property had 0 custom dimensions. Click destinations were not available in the historical Events report.
- Property-wide technology counts: 6 desktop and 2 mobile active users; browser Chrome 7; OS Macintosh 6, Android 1, iOS 1. Category counts overlap.

## What Remains Unproven

- Public receipt and trend of the Oct 2 initial/virtual page-view change. The selected date range ends Oct 1.
- Historic click destinations and any future destination breakdown until the relevant event parameters are exposed in reporting.
- Whether low engagement measures reflect visitor behavior or the tiny, mixed local/public sample.

## Constraints

Browser inspection was read-only. The previous GSC Wizard MCP lacks Analytics scope and is not preferred by the user due to cost. No new service or Cloud project was added.

## Help Wanted

Decide whether destination-level click reporting is worth registering the existing `link_url` and `link_domain` event parameters as event-scoped custom dimensions.

## Suggested Next Step

After new public traffic accumulates, rerun the same date-ranged host breakdown and compare it with this baseline. Check the deployed click payload before changing GA4 definitions.
