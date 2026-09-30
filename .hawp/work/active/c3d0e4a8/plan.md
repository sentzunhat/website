# Verify production SEO/AEO/GEO after deployment

ID: `c3d0e4a8`
Type: audit
Status: in-progress
Opened: 2026-09-29
Updated: 2026-09-30

input: |
  After the main-branch deployment, re-audit Sentzunhat for SEO, GEO, and AEO improvements, compare against the earlier 47/100 report, identify remaining high-value fixes, and keep the site simple, minimal, timeless, and fast.

context: |
  The earlier report analyzed static HTML and found only 5 words, no H1/H2/H3 headings, no internal links, no llms-full.txt/llms-small.txt, and no .well-known/ai.txt. It also reported 100/100 crawler access and 80/100 technical SEO. The website now build-renders crawlable homepage and project HTML, adds six dedicated project URLs, page-specific metadata and structured data, a sitemap covering those URLs, AI-discovery files, and internal links. The final hero-only visual refinement was pushed directly to main in commit 3a5a5d5281a925367026290e034ab0772a39ba48.

mission: |
  Verify what materially improved in production, separate real search-readiness issues from checker heuristics, and define the next work in priority order without sacrificing the approved design.

constraints: |
  Do not change the solar system or theme. Do not inflate homepage copy solely to hit an arbitrary word target. Do not add FAQPage or HowTo structured data when it does not accurately fit the page or provide current Google Search value. Prefer crawlability, content clarity, page experience, Search Console evidence, and truthful structured data.

output: |
  A production verification report, current indexing/performance evidence, and an ordered fix plan with only high-value work promoted into implementation.

## Source-level comparison completed

Confirmed from the current main branch:

- Homepage build output now includes one H1 and four question-style H2 headings instead of the earlier zero-heading static HTML.
- Homepage build output includes internal links to six dedicated project URLs.
- The static homepage contains substantive company/project copy instead of the earlier 5-word payload.
- `sitemap.xml` includes the homepage plus Mochilada, HAWP, Zacatl, Tekit, Chiwakal, and Noyolo.
- `llms.txt`, `llms-small.txt`, `llms-full.txt`, and `.well-known/ai.txt` are present in source.
- Project pages have unique titles, descriptions, canonicals, breadcrumbs, and project/software/source-code structured data.
- HAWP and Zacatl pages include primary-source links and concrete repository evidence; prototype pages remain explicitly labelled as prototypes/validation.
- UI links use real `<a href>` navigation.
- The hero refinement keeps proportional SVG scaling and does not modify the solar-system or theme files.

## What remains unverified

The current execution environment cannot resolve or fetch `sentzunhat.com` directly, and no deployment status is being published back to the inspected GitHub commit. A web search immediately after deployment also did not yet surface the new domain pages. This is not evidence of a deployment or indexing failure: Google documents that discovery/re-crawling can take several days.

Production verification therefore still needs:

1. Google Search Console URL Inspection for the homepage and each project page.
2. Sitemap submission/last-read confirmation.
3. Live PageSpeed Insights or Lighthouse mobile + desktop metrics.
4. A fresh run of the same AEO/GEO checker after its cache refresh.
5. Rich Results / structured-data validation on representative project pages.
6. A real-browser visual check of the hero on mobile and desktop.

## Remaining priorities

### P0 — Measured accessibility corrections
- Fix low contrast for the sky, aqua, and green exploration links (observed at 1.35:1, 1.23:1, and 3.94:1).
- Align the solar center button's accessible name with its visible label.
- Rerun production accessibility checks without changing the approved theme or 3D universe.

### P1 — Indexing evidence
- Inspect homepage and six project URLs in Search Console; confirm sitemap processing and request indexing where appropriate.
- Compare the same AEO/GEO checker against its earlier 47/100 report when a refreshed run is available.
- Lighthouse SEO/Agentic Browsing categories do not prove search rankings or AI citations.

### P2 — Page experience
- The supplied report records LCP 0.5 s and CLS 0.002, within Google's good thresholds. Preserve them when making changes.
- Keep the Three.js solar system lazy and unchanged unless measurement proves it is a bottleneck.
- Filter browser extension scripts from any JavaScript savings analysis; most measured bytes are outside the site.

### P2 — Content/entity clarity without bloat
- Keep the homepage concise; do not chase an 800-word checker target.
- Improve entity clarity through precise headings, project status labels, primary-source links, and organization/project structured data.
- Put deeper factual content on the dedicated project pages, where it is useful to humans and citation systems.

### P3 — Structured data discipline
- Keep Organization, WebSite, WebPage, Breadcrumb, SoftwareSourceCode/Project/SoftwareApplication markup where it accurately describes visible content.
- Do not add FAQPage merely for score points: Google limits FAQ rich results primarily to authoritative government and health sites.
- Do not add HowTo markup: Google deprecated HowTo rich results and the Sentzunhat homepage is not a how-to page.

## Initial blocker and current state

At intake, a production-capable audit path was unavailable. The user-supplied
2026-09-30 Lighthouse report now clears that blocker for the homepage's
production response, Lighthouse categories, and measured accessibility issues.
Search Console URL Inspection and sitemap processing still need account-level
evidence; do not infer indexing or ranking from this Lighthouse result.


## Production Lighthouse evidence — 2026-09-30

User supplied Lighthouse 13.4.1 JSON for `https://sentzunhat.com/`, fetched at
`2026-09-30T13:33:39.450Z`:

- Performance 100; Accessibility 96; Best Practices 100; SEO 100; Agentic
  Browsing 100.
- FCP 0.4 s; LCP 0.5 s; Speed Index 0.7 s; TBT 10 ms; CLS 0.002; Interactive
  0.8 s; root response 120 ms.
- Accessibility reports exploration link contrast of 1.35:1 (sky), 1.23:1
  (aqua), and 3.94:1 (green), against the 4.5:1 target for the observed text.
  The solar control visibly reads “Center on Sun” but exposes the name “Center
  view on the Sun.” These are application findings for the next fix.
- JavaScript savings include browser extension resources; do not treat their
  bytes as website work. The report attributes 58 KiB unused to the lazy solar
  chunk, which is not currently limiting the 100 Performance score.

This clears the prior blocker for production Lighthouse measurement. It does
not confirm Google indexing/Search Console sitemap processing, search ranking,
or the separate AEO/GEO checker score. Agentic Browsing is a Lighthouse
category, not proof of citations or GEO/AEO results.

## Next actions

1. Fix the concrete contrast and accessible-name findings without changing the
   approved theme or 3D project universe; rerun Lighthouse accessibility.
2. Inspect the homepage and six project URLs in Search Console and confirm
   sitemap processing when access is available.
3. Re-run the same AEO/GEO checker used for the original 47/100 report.
4. Keep user-requested sliding book-page navigation (`f07ad639`) sequenced after
   these checks; protect static HTML, reduced motion, and layout stability.
