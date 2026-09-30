# Prototype sliding book-page section navigation

ID: `f07ad639`
Type: improvement
Status: plan-ready
Opened: 2026-09-29
Updated: 2026-09-29

input: |
  Explore a homepage where each major section behaves like a simple book page / sliding door, with a minimal swipe affordance and persistent header/footer. If the interaction works, adapt the same language to project pages.

context: |
  The current visual direction is approved as simple, minimal, and timeless. The solar system and light/dark theme are approved and should remain intact. SEO/AEO/GEO crawlability now depends on build-time static HTML and dedicated project URLs, so any transition system must preserve semantic content and crawlable links.

mission: |
  Design and implement a progressive-enhancement section transition system that feels like turning/sliding through book pages without harming accessibility, crawlability, or performance.

constraints: |
  Keep header and footer continuously available. Use one subtle React Icon as the swipe/advance affordance; no emoji. Preserve all headings, text, links, and project URLs in the DOM. Do not hide primary content from no-JavaScript crawlers. Respect prefers-reduced-motion. Do not modify the solar system or theme. Keep the interaction restrained rather than app-like or gimmicky.

output: |
  A tested homepage section-navigation pattern, followed by a decision on whether to reuse it on project pages, with responsive, keyboard, touch, reduced-motion, and SEO verification.

## Planned sequence

1. Prototype the transition shell around two existing homepage sections without changing their content.
2. Verify keyboard, touch, scroll, reduced-motion, and static-HTML behavior.
3. Extend to the remaining homepage sections only if the prototype remains simple.
4. Keep header/footer outside the transition viewport so they remain continuously available.
5. Re-run SEO/AEO/GEO and performance checks.
6. Decide whether project pages benefit from the same interaction or should stay conventional.
