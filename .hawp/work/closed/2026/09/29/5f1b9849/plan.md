# Project universe and container simplification

**UUID:** `5f1b9849-2c98-44c6-8d5d-0e6680a01e20`
**Type:** improvement
**Reported:** 2026-09-29
**Status now:** done

## Investigation

The site displays Mochilada, the API/fallback open-source projects, and three
explorations: six projects currently. The hero independently hard-codes eight
Solar System planets. Canvas backgrounds, stars and overlays remain dark in
light mode. Docker runtime-prep only creates /data and can use the build stage.

## Plan

Share the displayed project collection with the hero. Derive stable varied
orbits and sizes from project names; use theme tokens for planet colors and a
blue sun with a soft flare. Update stars, nebulae and controls with the selected
or system theme, and fit the camera to the complete system on resize. Keep
reduced motion and lazy loading. Fold /data preparation into the build stage.

An independent hard-coded planet count would drift from the cards. Combining
build and runtime into a single image would retain the build toolchain; retain
the distroless runtime and omit development dependencies after building.

## Authorization

User requested implementation, verification, commit and push. Keep usage lean.

## Verification

- `npm run check` passed typechecks, lint (19 warnings, zero errors), and builds.
- Docker build passed with two stages. UID 65532 can write /data; TypeScript,
  Vite and ESLint are absent from the runtime image.
- Test volume marker and SQLite file survived container replacement. Health
  and projects endpoints returned HTTP 200.
- Chromium: one canvas, no horizontal overflow at 320/390/768/1280px. Light and
  dark canvas screenshots differ; system dark matches explicit dark, and
  explicit light overrides system dark. Reduced-motion frames stabilize after
  the media-query update; enabling motion changes frames. Drag and center
  controls exercised. Screenshots inspected in both themes.
- A temporary API fixture adds a seventh project to the hero; restoring the API
  restores six, with one canvas in either case. No application page errors.
- `git diff --check` passed. Browser warnings were GPU ReadPixels diagnostics.
- Initial HAWP validation has one pre-existing failure: closed record 7b5feb25
  lacks Verification and Close Checklist sections.

## Outcome

Six project planets share the displayed content: Mochilada, HAWP, Zacatl, Tekit,
Chiwakal and Noyolo. Stable name-derived variation controls sizes, spacing and
speeds. Orbit lines and planets now use the same coordinate function. Theme
colors, blue sun and glow, adaptive camera framing, and responsive card layout
work in light and dark modes. Build/prune/data preparation share one stage,
followed by the existing distroless runtime.

## Remaining unproven

External hosting storage and real-device GPU performance were not tested.
The existing large Three.js chunk warning and separate UUID advisory remain.

## Close checklist

- [x] Outcome recorded
- [x] Build, container and browser verification recorded
- [x] Remaining uncertainty stated
- [x] Commit and push authorized by user
