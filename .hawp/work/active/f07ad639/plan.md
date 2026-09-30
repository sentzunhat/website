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

## Search-readiness guardrails from the 2026-09-29 audit

- Preserve the build-time crawlable headings, paragraphs, and `<a href>` project links even if sections become swipeable.
- Avoid a large static-to-client layout replacement that could create CLS. The transition shell should progressively enhance content that already occupies its final layout.
- Keep one canonical URL per project and do not move meaningful project content into URL fragments.
- Do not add FAQPage or HowTo markup merely to satisfy third-party checker points. Current Google guidance limits FAQ rich results to authoritative government/health sites and HowTo rich results are deprecated.
- Measure LCP, INP, and CLS after the prototype; target Google's "good" thresholds (LCP <= 2.5 s, INP < 200 ms, CLS < 0.1).
