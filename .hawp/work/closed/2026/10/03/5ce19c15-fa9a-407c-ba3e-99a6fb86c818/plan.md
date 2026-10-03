# Center booklet arrows in the viewport

ID: 5ce19c15-fa9a-407c-ba3e-99a6fb86c818
Type: improvement
Status: closed
Opened: 2026-10-03
Updated: 2026-10-03

input: |
  Move the homepage booklet previous/next arrows closer to the middle of the page on both mobile and desktop.

context: |
  The arrows are fixed to the viewport in `src/apps/frontend/src/app/app.css`. Desktop currently places them at 50dvh; mobile switches them to the lower area near the swipe hint. The owner wants the controls vertically centered in the visible web view on both sizes.

mission: |
  Refine the booklet arrow placement so both controls sit at the vertical center of the usable viewport on desktop and mobile.

constraints: |
  Keep them reachable and visually balanced with the sticky header and footer, preserve disabled/focus/hover states and reduced-motion behavior, and avoid overlapping important content or mobile browser safe areas. Keep section movement behavior unchanged.

output: |
  Updated responsive control positioning with rendered checks at phone and desktop sizes; record any safe-area or content collision limits.

## Acceptance

- Both arrows align at the same visual vertical midpoint on phone and desktop viewports.
- The controls remain reachable without covering key text, the swipe hint, menu panel, or browser safe-area insets.
- Existing navigation, disabled states, and keyboard focus behavior remain intact.

Risk: low to medium because the arrows are fixed over interactive panel content. Desktop is already centered at `50dvh`; keep that placement and bring mobile to the same safe-area-adjusted center.

## Implementation — 2026-10-03

Updated the mobile control position from the bottom hint row to the safe-area-adjusted `50dvh` center. The arrows now align vertically with the unchanged desktop placement. Added matching left/right safe-area offsets. Because fixed controls otherwise covered the Company heading at narrow widths, mobile booklet panels reserve a `2.75rem` side gutter, extended by device safe-area insets. This keeps panel copy outside the arrow hit areas while preserving the arrow size and swipe hint position.

`npm run check` passed (19 existing lint warnings; existing solar-scene chunk and dynamic-import build warnings). Local narrow browser inspection showed the arrows centered and the Company heading clear of both controls. The Next arrow advanced the active-section indicator.

Production verification on 2026-10-03 confirmed that the homepage serves `/assets/index-DBG_YeUT.js` and `/assets/index-DggAPqJu.css`, matching the latest local build. The live CSS contains the 50dvh desktop placement, safe-area-adjusted mobile center, and mobile side gutters. The production Next arrow advanced the section indicator to 02/06. The available narrow browser view showed the mobile homepage and controls; exact 320px and 390px device sizes were not separately measured. Desktop positioning remains the existing 50dvh rule and was not changed by this patch.

## Outcome

Mobile arrows now sit at the usable viewport midpoint, with safe-area offsets and panel gutters that keep key copy clear. Desktop arrows remain centered at 50dvh. Navigation behavior is unchanged.

## Verification

- `npm run check` passed with 19 existing lint warnings and existing frontend build warnings.
- Local narrow browser check confirmed clear heading gutters and successful Next navigation.
- Production asset hashes matched the local build; live CSS rules and Next navigation were confirmed.
- Exact 320px/390px viewport dimensions were not available for measurement.

## Close Checklist

- [x] Center arrows on mobile and retain desktop midpoint placement.
- [x] Preserve safe-area clearance and readable panel copy.
- [x] Verify local and production navigation.
- [x] Record viewport-size limitation.
