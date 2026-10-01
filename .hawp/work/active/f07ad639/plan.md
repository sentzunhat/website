# Prototype sliding page navigation for home and project sections

ID: `f07ad639`
Type: improvement
Status: plan-ready
Opened: 2026-09-29
Updated: 2026-10-01

input: |
  Add a home-page and project-page section experience that feels like turning a book page or opening a sliding door, with swipe navigation and restrained side-arrow controls.

context: |
  The current visual direction is approved as simple, minimal, and timeless. The solar system and light/dark theme are approved and should remain intact. Project IDs and shared page-section structure are defined in the backend Sequelize models; page copy import and SSR integration remain in eb03bd96-c0df-4da0-821b-88717e414f94. SEO/AEO/GEO crawlability depends on server-rendered page HTML and dedicated project URLs, so transitions must preserve semantic content and crawlable links.

mission: |
  Design and implement a progressive-enhancement section transition system shared by the homepage and project pages, with side arrows and touch swipes that work without harming accessibility, crawlability, or performance.

constraints: |
  Keep header and footer continuously available. Use clean, elegant arrow icons placed at the page sides; keep them quiet at rest and glow with the existing theme accent on hover/focus. Preserve all headings, text, links, and project URLs in the DOM. Do not hide primary content from no-JavaScript crawlers. Respect prefers-reduced-motion, keyboard use, touch, ordinary scrolling, and theme selection. Do not modify the solar system or theme. Keep the interaction restrained.

output: |
  A tested shared page-section navigation pattern for the homepage and project pages, with responsive, keyboard, touch, reduced-motion, crawlability, and performance verification.

## Planned sequence

1. Wait for the page-copy import and ordered-section SSR contract in eb03bd96-c0df-4da0-821b-88717e414f94.
2. Prototype the transition around two semantic sections with the header/footer fixed outside the transition area.
3. Add unobtrusive previous/next arrow icons on the sides. At rest they are dim; on hover and keyboard focus they glow using the active theme accent.
4. Verify keyboard, touch, ordinary scroll, reduced-motion, and server-rendered HTML behavior.
5. Extend to other home and project sections only if the two-section prototype remains simple.
6. Re-run SEO/AEO/GEO and performance checks.
7. Decide whether transitions should be identical on home and project pages or simplified on project pages.

## Search-readiness guardrails from the 2026-09-29 audit

- Preserve the build-time crawlable headings, paragraphs, and `<a href>` project links even if sections become swipeable.
- Avoid a large static-to-client layout replacement that could create CLS. The transition shell should progressively enhance content that already occupies its final layout.
- Keep one canonical URL per project and do not move meaningful project content into URL fragments.
- Do not add FAQPage or HowTo markup merely to satisfy third-party checker points. Current Google guidance limits FAQ rich results to authoritative government/health sites and HowTo rich results are deprecated.
- Measure LCP, INP, and CLS after the prototype; target Google's "good" thresholds (LCP <= 2.5 s, INP < 200 ms, CLS < 0.1).


## October 2026 strategy context

The supplied release strategy keeps this as the existing website work item. Treat each section as a semantic, server-rendered page that progressively glides; preserve ordinary scrolling, swipe, keyboard navigation, header/footer, and reduced-motion behavior. Retain HTML-first rendering and do not add hidden SEO text. Sequence this after Mochilada submission (target Oct 10) and after measured search/accessibility checks permit. No implementation or validation is claimed by this context addition.
