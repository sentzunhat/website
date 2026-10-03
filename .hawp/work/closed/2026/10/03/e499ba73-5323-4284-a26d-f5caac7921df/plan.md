# Put mobile header navigation in a translucent menu

ID: e499ba73-5323-4284-a26d-f5caac7921df
Type: improvement
Status: done
Opened: 2026-10-02
Updated: 2026-10-02

input: |
  Give the Sentzunhat mobile navbar a simple menu like Tekit's, with a translucent background and simple buttons. Move the current header menu into it.

context: |
  The shared Header currently shows Projects, Company, Public work, Vision, GitHub, and a three-option theme control. At 640px and below, CSS wraps the section links into a separate horizontally scrolling row. Tekit's landing navigation uses a menu button and a full-viewport translucent, blurred mobile panel. The homepage booklet handles existing hash anchors and adjusts for the measured header height.

mission: |
  Replace the phone header's exposed link row with a compact, accessible menu while retaining every existing header action and destination.

constraints: |
  Keep the Sentzunhat visual identity and desktop navigation. Use Tekit as a behavior/material reference, not a literal copy or a reason to add its animation dependencies. Keep ordinary anchors so section-booklet hash navigation and analytics click tracking continue to work. Preserve light, dark, system, reduced-motion, and SSR/hydration behavior. Coordinate any overlap with f07ad639, which owns the booklet interaction.

output: |
  A single-row mobile header with an obvious menu button; an open menu with readable translucent background and simple section/action buttons; verified access to all current links and theme choices on narrow screens.

## Investigation and decision

**Confirmed from source:** `src/apps/frontend/src/components/header.tsx` renders the four homepage anchors, GitHub, and theme controls. `src/apps/frontend/src/app/app.css` wraps `main > nav` and places `.site-section-links` on a scrollable second row at `max-width: 640px`; `.home-shell > nav` is sticky. `src/apps/frontend/src/pages/home/components/section-booklet.tsx` listens for document anchor clicks and measures `main > nav` when scrolling to a section. Tekit's `src/frontend/app/pages/landing/components/navigation.tsx` uses a header toggle plus a fixed translucent, blurred full-screen mobile nav.

**Inference:** The current second row costs vertical room and makes section links less discoverable at 320px. A menu should simplify the phone header without changing the desktop layout.

**Options:** (1) Keep the horizontal row and add overflow cues. (2) Move the mobile actions into a toggleable overlay. Choose (2), as requested, using the current theme tokens and simple controls.

## Implementation plan

1. Add menu-open state and a labeled toggle to `Header`, visible only at the mobile breakpoint. Put the four section anchors, GitHub, and Light/Dark/System controls in the mobile panel; avoid duplicate focusable controls while it is closed.
2. Add mobile styles in `app.css` for the compact header and a translucent, blurred panel with sufficient text contrast and a solid-color fallback. Keep the panel inside the viewport and usable at 320px and short heights.
3. Close on link selection, Escape, and return to desktop width. Keep focus and scroll behavior predictable. Keep semantic anchors and `aria-expanded`/`aria-controls` state; do not add a new animation package.
4. Verify the menu and existing navigation on homepage and project pages. Adjust header-height/anchor handling only if a real regression is observed, and coordinate with f07ad639.

## Acceptance and verification

- At 320px and 390px, the brand and menu control fit one row with no horizontal page overflow; all existing header links/actions are reachable and clearly named.
- The overlay reads clearly in light and dark themes, opens and closes by pointer and keyboard, closes on Escape and selection, and respects reduced motion. Focus does not disappear behind the panel.
- `/#projects`, `/#about`, `/#opensource`, and `/#vision` still select and reveal the intended homepage sections beneath the sticky header, including when followed from a project page. GitHub and all three theme choices still work.
- Desktop header layout remains intact. Run `npm run check`, then inspect rendered 320px, 390px, and desktop views and interactions in a browser. Record any public deployment check separately.

Risk: medium because the shared header and booklet navigation meet at hash anchors.

## Implementation and verification — 2026-10-03

**Theme check:** confirmed light, explicit dark, and system theme all provide the shared `--surface`, `--line`, `--ink`, `--elevated`, and `--focus-ring` tokens. The mobile panel uses those tokens for its fallback surface, translucent/blurred surface, borders, button states, and visible focus treatment. It follows the selected theme without defining fixed light/dark colors.

**Changed:** `src/apps/frontend/src/components/header.tsx` now has a mobile menu toggle and one shared set of links/theme controls. The menu closes on Escape (returning focus to the toggle), link/theme selection, and desktop-width resize. `src/apps/frontend/src/app/app.css` styles a compact single-row header and the themed translucent panel at the existing 640px breakpoint. No new dependencies.

**Locally verified:** `npm run check` completed successfully (19 existing lint warnings; the frontend retains its large solar-scene chunk warning). In the browser preview, the menu opened by pointer and keyboard, all four homepage anchors and GitHub/theme controls were present, Tab reached Projects, Escape closed and returned focus, theme selection changed Light/Dark and closed the panel, and System was restored. Anchor navigation from the homepage and a HAWP project page returned to the intended homepage hash and closed the menu. Rendered light and dark panel appearances were inspected.

## Outcome — 2026-10-03

The mobile header now uses a single-row logo and toggle with a translucent, theme-aware navigation panel. It retains all homepage section anchors, GitHub, and Light/Dark/System controls. The panel uses existing theme variables and requires no new dependency. Commit `6c3017f` was pushed to `origin/main`.

## Verification

- `npm run check` passed typecheck, lint (zero errors; 19 existing warnings), frontend build/static rendering, and backend build. The existing solar-scene chunk-size and ineffective dynamic-import build warnings remain.
- Local narrow preview: menu opens by pointer and keyboard; links/theme options are present; Tab enters the links; Escape closes and returns focus; theme changes apply and close the panel; System was restored. Homepage and project-page anchor navigation returned to the expected homepage hash and closed the menu.
- Production after the requested two-minute deploy window: homepage returns HTTP 200, and its JS/CSS asset names match the built output (`index-CB62D2IK.js`, `index-DagiAZoH.css`). The narrow preview displayed the hamburger and opened panel; the 1280px production view showed the desktop navigation intact. No horizontal overflow was visible in the narrow preview.
- `git diff --check` passed before commit. HAWP backlog, evidence, and dead-link checks pass; the validator's only failure is three older closed plans missing required closeout sections (`7b5feb25`, `8c2e01f4`, `9508bdf5`).

The browser control did not provide exact 320px and 390px viewport selection, so those exact widths were not separately measured. The production checks confirm deploy and responsive breakpoint behavior in the available narrow and desktop views. See the [status report](../../../../../status/2026/10/03/e499ba73-5323-4284-a26d-f5caac7921df/status.md).

## Close Checklist

- [x] Outcome recorded.
- [x] Typecheck, lint, production build, and local menu interactions verified.
- [x] Production deployment and live assets verified after the deploy window.
- [x] Exact viewport-size limitation stated.
- [x] Backlog row moved to Recently Closed.
