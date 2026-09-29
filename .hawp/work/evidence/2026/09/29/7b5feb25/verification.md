# Frontend repair and hero verification

## Scope verified

- Frontend tree consolidation and import repair.
- Requested file/folder naming convention.
- Hero visual behavior on desktop and mobile.
- Light, dark, and system theme behavior.
- Direct and proxied API availability.
- Production build quality and Lighthouse regression boundary.
- Zacatl UUID advisory issue-report handoff.

## Static checks

Command: `npm run check`

Result: pass.

- Frontend TypeScript: pass.
- Backend TypeScript: pass.
- Oxlint across `apps`: pass.
- Vite production build: pass.
- Backend TypeScript emit and `zacatl-fix-esm`: pass.

A recursive frontend naming audit also passed. Every file and folder beneath
`apps/frontend/src` uses lower-case words separated by hyphens with no more than
three words per name.

## Runtime checks

The compiled backend and frontend preview were started from this workspace.

- `GET http://127.0.0.1:3001/api/health`: HTTP `200`.
- `GET http://127.0.0.1:3001/api/projects`: HTTP `200`.
- `GET http://127.0.0.1:4173/api/health`: HTTP `200`.
- `GET http://127.0.0.1:4173/api/projects`: HTTP `200`.

Browser inspection found no warning or error console entries from the
application.

## Visual checks

- Desktop production preview inspected at the browser's normal viewport.
- Mobile production preview inspected at `390 x 844`.
- Browser viewport and document widths matched at `320`, `375`, `390`, `439`,
  and `440` CSS pixels. The hero card remained inside the viewport at each width.
- System-dark and explicit light themes inspected.
- Hero copy remained readable, navigation remained usable, and the solar-system
  card remained contained without horizontal document overflow.
- Orbit outlines remain stationary while planets move at independent speeds;
  reduced-motion rules disable line, planet, and sun animations.
- The hero card has no float or rotation animation. Nebula color and additional
  stars use CSS gradients and small HTML elements, with no canvas or 3D runtime.

## Production Lighthouse

Desktop preset:

- Performance: `100`.
- Accessibility: `100`.
- SEO: `100`.
- FCP: `0.3s`.
- LCP: `0.6s`.
- TBT: `0ms`.
- CLS: `0.002`.
- Transfer: approximately `267 KiB`.

Default mobile simulation:

- Performance: `95`.
- Accessibility: `100`.
- SEO: `100`.
- FCP: `1.4s`.
- LCP: `2.9s`.
- TBT: `0ms`.
- CLS: `0.007`.
- Transfer: approximately `267 KiB`.

The first mobile run exposed a `0.148` layout shift because the decorative card
was bottom-anchored to a content-sized hero. Anchoring the mobile card at a
stable top offset removed that shift. The current refinement still records
mobile CLS below `0.01`. Self-hosting Fira Sans removed the Google Fonts
render-blocking request.

## Dependency boundary

`npm audit --omit=dev` still reports three moderate entries propagated from one
`sequelize@6.37.8 -> uuid@8.3.2` chain. No force fix was applied. Detailed
triage and patch acceptance criteria are in `docs/issues/uuid-advisory.md`; the
follow-up remains open as HAWP item `2a1dc541`.
