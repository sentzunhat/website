# Prototype sliding page navigation for home and project sections

ID: `f07ad639`
Type: improvement
Status: in-progress
Opened: 2026-09-29
Updated: 2026-10-02

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

## October 2 refinement

Investigation: the shipped homepage rail begins after the hero, so the hero cannot advance with the arrows. The rail has no viewport-height frame, its controls cluster at the top right, and the footer follows all content. On narrow screens, section links in the header are hidden. The dev projects hook aborts its request during React Strict Mode's effect replay, which can display a cancelled request in developer tools; backend availability remains a separate check. These findings are from the current source, not production observation.

Options: retain the current document-height rail and adjust only arrows, or frame the whole homepage (including hero) between the header and footer with independently scrolling panels. Use the second option because it addresses the requested composition and leaves long panels readable. Keep native scroll snap, semantic HTML, and direct anchor links. Share an in-flight projects request during effect replay to avoid an unnecessary cancelled dev request.

Risk: medium, limited to homepage layout/navigation, mobile header links, and the projects refresh hook. Can implement now: yes; the owner explicitly requested this continuation, and the clean tree has no overlapping edits. Verify desktop and narrow viewports, arrows/swipe/anchors, long-panel scrolling, reduced motion, build checks, and paired dev API health. Production behavior remains unverified until deployed.

Implementation: `src/apps/frontend/src/pages/home/home.tsx` puts the hero into the existing rail; `src/apps/frontend/src/pages/home/components/section-booklet.tsx` handles eight panels, direct hashes, side arrows, and history navigation. `src/apps/frontend/src/app/app.css` frames the rail between header and footer, centers short panels, keeps long panels vertically scrollable, and places phone controls in their own bottom strip. `src/apps/frontend/src/components/header.tsx` exposes section links at narrow widths. `src/apps/frontend/src/hooks/use-projects.ts` shares one pending fetch through development Strict Mode effect replay.

Verification: `npm run check` passed frontend/backend typechecks, lint with zero errors and 19 warnings at that run, frontend client/SSR/static builds (homepage plus six project pages), and backend build. A subsequent explicit return type removed two hook warnings; targeted lint on changed TypeScript files and frontend/backend typechecks passed. Browser inspection at 1280×720, 390×844, and 320×700 showed one visible panel, persistent header/footer, working arrow and anchor navigation, vertically scrollable long panels, and no 320px document overflow. The paired local dev frontend, proxied `/api/projects`, and direct backend `/api/projects` returned HTTP 200. Native touch swipe, performance, and public deployment remain unverified. This item stays active because the original scope includes project-page transitions and performance review.

## October 2 follow-up: project categories and document scroll

Investigation: the homepage currently has six known project destinations, split across three separate booklet panels: Mochilada, HAWP/Zacatl, and Tekit/Chiwakal/Noyolo. The fixed-height rail makes tall panels scroll internally. The owner asked for category separation and normal page scrolling while retaining the header/footer positions. No seventh project is present in the inspected source/API contract; do not invent one.

Options: keep three project panels and add labels, or combine them into one Projects panel with three explicit categories. Combine them so all known projects are discoverable in one place. For scrolling, either retain nested panel overflow or size the rail to the active panel and let the document scroll. Use document scroll, with a sticky header and the footer following the content. Preserve horizontal snap and direct category anchors.

Risk: medium; this changes homepage layout and navigation but keeps existing content and URLs. Can implement now: yes; the clean tree has no overlapping work, and the owner requested the follow-up directly. Verify desktop/phone layout, category links, short and long panel heights, arrows, anchor/history behavior, full-page scroll, and API/build checks.

Implementation: `src/apps/frontend/src/pages/home/components/projects.tsx` groups the six current destinations into Commercial product (Mochilada), Public foundations (HAWP/Zacatl), and Research & development (Tekit/Chiwakal/Noyolo). The homepage now has six booklet panels. The rail measures the active panel's natural height; vertical movement scrolls the document, with a sticky header and the footer after the content. Direct category anchors preserve the existing `#focus`, `#opensource`, and `#explorations` destinations. Layout/paint containment and clipped panel decoration prevent taller off-screen panels from extending the document beyond the footer.

Bug verification: the first document-scroll prototype had 586px of empty space after the footer at 1280×720. After the containment fix, the Company panel's document height and footer bottom both measured 720px. The Projects panel expanded to its content; its footer bottom matched document height within one pixel. Phone checks at 390×844 and 320×700 showed no horizontal document overflow, long Projects/Founder panels expanding the document, and zero inner rail/panel vertical scroll during page scrolling. Header, hero, and category anchor links landed the selected content beneath the sticky header.

Checks: `npm run check` passed frontend/backend typecheck, lint (zero errors; 17 existing warnings), client/SSR/static builds (homepage plus six project pages), and backend build. `git diff --check` passed. Proxied dev and direct backend `/api/projects` returned HTTP 200. Public deployment, physical touch swipe, and performance remain unverified; project-page transitions remain outside this completed homepage slice.

## October 2 follow-up: full-width backdrop and softer 3D surfaces

The owner requested full-viewport section backgrounds that change while moving through the booklet, reduced shine on panels, and restrained model lighting with simple texture detail in both themes. This explicit direction updates the earlier constraint to leave the 3D scene unchanged; retain the current identity and light/dark adaptation while tuning its materials.

Implementation: `src/apps/frontend/src/pages/home/components/section-booklet.tsx` exposes the active panel index to a full-viewport backdrop. `src/apps/frontend/src/app/app.css` changes the backdrop accent per section and reduces the brightest card gradients, highlights, shadows, and blur. `src/apps/frontend/src/pages/home/components/solar-scene.ts` uses rough standard materials, low-strength procedural bump textures, softer theme-specific ambient/key lighting, and lower star, nebula, and glow intensity. The lighting and accent colors update when the theme changes.

Verification is pending: no build, test, or browser inspection was run for this follow-up. Confirm full-width transitions, reduced shine, actual WebGL shading and bump texture, theme changes, reduced motion, and performance before treating the visual outcome as verified. Public deployment is also pending.
