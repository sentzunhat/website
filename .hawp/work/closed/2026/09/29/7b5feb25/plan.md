# Repair frontend shape and redesign hero system

**Backlog ID (Legacy):** — (UUID-native item)
**UUID:** `7b5feb25-7e41-4b62-a89a-6d3deec2a505`
**Type:** improvement
**Reported:** 2026-09-29

---

## Input (verbatim)

> Review and repair apps/frontend while preserving the new app/pages/home shape; enforce simple lower-case kebab-case names with at most three words; redesign the hero with minimal Nawat-inspired glowing linework and a theme-colored animated solar system; prepare a Zacatl advisory issue report.

## Intake Summary

Repair the user's partially completed frontend move without reverting its
intended `app/` plus `pages/home/` shape, enforce the requested minimal naming
rules, and replace the hero's decorative math/glass composition with a lighter
solar-system composition and restrained Nawat-inspired geometric line rhythm.

## Current Context

- The branch is `main`, one commit behind `origin/main`, with the existing
  website migration and the user's frontend changes intentionally dirty.
- The user moved the application shell into `src/app/`, home ownership into
  `src/pages/home/`, and public assets into the frontend, but the move left
  broken imports and duplicated section trees.
- The active Vite entry HTML is missing from the package root, `main.tsx`
  imports a missing stylesheet, and `app.tsx` imports missing PascalCase files.
- Existing production services on ports 3001 and 4173 belong to this workspace.

## Initial Analysis

**Directly verified:**

- Root and home section files are byte-identical duplicates.
- `src/public/` is the only remaining source copy of the static assets while
  Vite still points to the removed repository-root `public/` directory.
- Existing hero markup contains decorative equations, a glowing bar, three
  free-floating orbs, and a card-local square grid.
- The Family Game Jam project uses Three.js for an interactive chess scene, but
  this hero only needs decorative orbits and does not justify that bundle/runtime
  cost.
- Smithsonian material describes Pipil-linked regional pottery decoration with
  geometric frets, dots, circles, and wavy lines; UNESCO emphasizes that living
  Nawat heritage belongs to community-led safeguarding. The visual will use an
  abstract geometric rhythm without claiming to reproduce a traditional symbol.

**Inferred (not yet proven):**

- A CSS/SVG composition can deliver the requested depth, glow, and orbit motion
  while remaining smaller, more accessible, and easier to maintain than Three.js.
- The intended home boundary is `pages/home/components`, not the duplicated
  global `components/sections` tree.

**Scope:**

- Keep `src/app/` and `src/pages/home/` as the primary shape.
- Limit directories beneath `src/` to at most three levels and use simple
  lower-case kebab-case file/folder names with no more than three words.
- Consolidate duplicate components and move Vite/public assets to conventional
  package-owned locations.
- Add `solar-system.tsx` as the only new hero-specific component.
- Replace equations/glowing bar/free orbs with a minimal sun and orbiting theme
  planets, full-hero linework, and a simpler floating card.
- Preserve copy, page order, theme behavior, API behavior, and reduced-motion
  support.
- Produce a self-contained Zacatl/Sequelize/uuid issue report; do not patch or
  force-upgrade dependencies in this work item.

## Risk + Review Gate

**Risk:** medium — entry paths, component ownership, and visible hero styling
change, while application contracts remain stable.
**Gate:** approved by the user's explicit request to repair the folder shape and
implement the hero concept.

## Backlog + Plan Link

**Status now:** done
**Plan file:** work/active/7b5feb25/plan.md

## Next Step

- [x] Investigation recorded above
- [x] Scope, naming rules, and cultural boundary recorded
- [x] User approval recorded
- [x] Consolidate and rename the frontend tree
- [x] Implement and visually verify the hero
- [x] Write the Zacatl triage report
- [x] Run production checks and close the work item

## Outcome

- Preserved the user's `app/` and `pages/home/` ownership model while removing
  the duplicated section tree and repairing entry, stylesheet, and public asset
  paths.
- All frontend source file and directory names pass the requested lower-case,
  kebab-case, three-word maximum audit.
- Replaced the equations, glowing bar, square grid, and loose orbs with
  full-hero abstract geometric linework and a CSS/SVG solar system.
- Kept the cultural reference abstract: geometric rhythm informed the design,
  but the site does not label the linework as an authentic Nawat symbol.
- Kept Three.js out of this decorative surface; the result requires no new 3D
  runtime.
- Self-hosted Fira Sans through the frontend bundle to remove the external font
  render-blocking request.
- Post-review refinement: mobile card width now follows the content column;
  fixed orbit ellipses stay still while planets travel on independent, slower
  tracks. Relative periods follow Kepler's `P² ∝ a³` relation, with a zoomed-out
  system, twelve small stars, and a restrained CSS nebula field.
- Prepared `docs/issues/uuid-advisory.md` and moved the dependency decision to
  work item `2a1dc541` at `plan-ready`.
- Verification: `.hawp/work/evidence/2026/09/29/7b5feb25/verification.md`.
