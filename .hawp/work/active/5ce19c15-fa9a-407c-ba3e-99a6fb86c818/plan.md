# Center booklet arrows in the viewport

ID: 5ce19c15-fa9a-407c-ba3e-99a6fb86c818
Type: improvement
Status: plan-ready
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

Risk: low to medium because the arrows are fixed over interactive panel content. Planning only; no arrow code changed with this ticket.
