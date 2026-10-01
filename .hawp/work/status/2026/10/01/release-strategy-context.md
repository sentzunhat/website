# Status Report — October 15, 2026 Mochilada Release Strategy (Sentzunhat website scope)

## Intent

Preserve the website-related work and sequencing from the user-supplied release strategy dated 2026-10-01. Full Mochilada product/release implementation items are recorded in the Mochilada repository.

## Current State

The supplied plan targets Mochilada 1.0 submission by Oct 10 and Canada-only manual release on Oct 15, subject to Apple approval. It treats Oct 7–8 as the effective development cutoff. Before Oct 10, website scope is identity/copy, health, and obvious mobile issues; the site must not delay the binary. Oct 11–14 is the intended window for larger site work. This is a user-provided plan, not verified current release state.

## What Was Inspected

- Website HAWP start guide, backlog alignment policy, backlog, and active plans `f07ad639` and `c3d0e4a8`.
- Mochilada repository HAWP guidance and release backlog, including active `077`/`079` and parked `040`.
- The user-supplied October release strategy text.

## What Changed

- Added website work plans: `c0100001` (CORP-01 identity), `c0200001` (CORP-02 React SSR), `c0300001` (CORP-03 mobile performance), and `c0400001` (business email investigation/setup).
- Extended existing `f07ad639` with HTML-first, progressive-enhancement and sequencing context instead of creating a duplicate.
- Left `c3d0e4a8` active for production SEO/AEO/GEO evidence.

## Strategy Facts Supplied by the User (Not Independently Verified)

The strategy says Mochilada already has Snapchat/Instagram/Facebook archive support; local SQLite and media-in-database storage; gallery, messages, On This Day, data explorer, export, crash/re-index recovery, archive detachment, responsive desktop layout, commercial copy, brand assets and most App Store copy; a successful Wails + Svelte production build; and a frontend reorganization at 4/5. Treat these as the supplied assessment, not current verification.

It calls out four critical release concerns: no App Sandbox baseline; original ZIP paths and recursive relink scans may not work safely inside the sandbox; automatic GitHub update request conflicts with the local-only claim and targets the legacy product; and old 040 describes Developer ID/notarization rather than Mac App Store distribution. It also flags metadata drift: root `wails.json` says `mochila-archive-viewer` while `src/wails.json` says `mochilada`; Go module is `mochila-archive-viewer/src`; company strings differ between `Sentzunhat` and `Sentzunhat Corp.`; App Review notes say `~/Library/Application Support/Mochilada/` while supplied strategy says code currently writes `~/.mochilada/database.sqlite`. These claims need direct code/build review under 080–083.

The proposed listing calls for privacy/support URLs, final copy/keywords, screenshots, category, age rating, review notes and synthetic archive; Canada-only availability and manual release; five proposed 16:10 screenshots. Paid-app readiness includes Apple organization access, Paid Apps Agreement, Canadian banking/tax, explicit App ID, app record, pricing base and a CA$24.99 launch price (or closest allowed). These external states remain unverified.

## What Was Directly Verified

- The referenced website and Mochilada work items exist in their respective repositories after recording.
- Website backlog includes all four new rows and the existing book-navigation item remains the owner for that work.

## What Remains Unproven

- All release dates, Apple account/enrollment, signing, sandbox, App Store Connect, approval, pricing, banking/tax, domain/email provider, and website deployment state require live verification in their respective work items.
- No website implementation, business mailbox, deployment, or Apple submission was performed by this recordkeeping task.

## Constraints

Preserve approved corporate branding/theme/hero; do not claim consciousness; keep useful semantic content visible and crawlable; measure performance; keep corporate website work subordinate to the Oct 10 app-submission target. No secrets in repository.

## Suggested Next Step

Work the website identity intake first while Mochilada release blockers proceed in its repository. Then investigate the business-email provider/domain prerequisites. Resume SSR, route splitting, and book-navigation implementation after app submission if the date sequence still holds.

## Follow-up — 2026-10-01

CORP-01 was implemented and locally verified after this intake checkpoint. Its plan moved to `.hawp/work/closed/2026/10/01/c0100001/plan.md`, with proof in `.hawp/work/evidence/2026/10/01/c0100001/evidence.md`. The remaining CORP-02, CORP-03, and business-email items stay in inbox.

## Mobile follow-up — 2026-10-01

CORP-03 was implemented and locally verified. Its plan moved to `.hawp/work/closed/2026/10/01/c0300001/plan.md`, with before/after mobile and route evidence in `.hawp/work/evidence/2026/10/01/c0300001/evidence.md`. The measured gain is smaller initial JavaScript transfer; local Lighthouse did not show an overall score gain. CORP-02 and business email remain in inbox.

## SSR follow-up — 2026-10-01

CORP-02 was implemented and locally verified. Production-mode Fastify now returns React-rendered HTML for the homepage and project routes using current SQLite project rows; the browser hydrates it. Static preview pages remain available. The plan moved to `.hawp/work/closed/2026/10/01/c0200001/plan.md`, and checks are recorded in `.hawp/work/evidence/2026/10/01/c0200001/evidence.md`. The business-email item remains in inbox. Production-domain behavior and field performance still need external verification under the existing SEO audit work item.

## Business email research follow-up — 2026-10-01

The user supplied a five-provider workplace suite comparison and recommended trialing Zoho Workplace Professional first, with Microsoft 365/Copilot as a second candidate if AI search across company documents dominates. This research has been summarized in work item `c0400001` and `docs/business-email-setup.md`; its listed prices remain estimates until a Canadian checkout is checked. Public authoritative DNS currently uses DigitalOcean nameservers and shows no MX, apex TXT, or DMARC TXT records. Local DigitalOcean CLI access returned HTTP 401. No mailbox or site contact address has been created or published. The staged trial and DNS/authentication checks are recorded for continuation.

## Business email timing decision — 2026-10-01

The user clarified that the future address should cover Sentzunhat contacts and support for Mochilada and other apps. They have DigitalOcean DNS access, have no Zoho organization yet, and will review Zoho Workplace prices. Because current bandwidth is limited, they chose to defer mailbox setup until a contact/reply channel is needed. Work item `c0400001` is parked with the research and setup sequence preserved. The local `doctl` HTTP 401 reflects this machine's session, not the user's account access. Mochilada work item `085` retains the App Store support URL gate; its existing `/support` page still has placeholder contact wording and must be resolved before submission.
