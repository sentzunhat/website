# Center booklet arrows in the viewport

ID: 5ce19c15-fa9a-407c-ba3e-99a6fb86c818
Type: improvement
Status: in-progress
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

`npm run check` passed (19 existing lint warnings; existing solar-scene chunk and dynamic-import build warnings). Local narrow browser inspection showed the arrows centered and the Company heading clear of both controls. The Next arrow advanced the active-section indicator. Production deployment verification remains pending.
