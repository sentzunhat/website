# Align website workspace and feature structure

**Backlog ID (Legacy):** — (UUID-native item)
**UUID:** `815b752b-ecab-4a69-943f-47e9266a4163`
**Type:** improvement
**Reported:** 2026-09-29

---

## Input (verbatim)

> Clean up and fix the files, folders, and code structure using HAWP standards and Mochilada/Tekit as implementation references.

## Intake Summary

Align the repository with its declared npm-workspace model and make feature
ownership visible without changing the approved corporate content, theme, API
contract, or production-preview behavior.

## Current Context

- The checkout is on `main` at checkpoint `634c6c5`, with the application
  migration intentionally dirty and unreleased.
- The working implementation currently lives under `src/apps/*`, while the
  README and Mochilada reference use root `apps/*` workspace packages.
- The frontend entry component owns application state plus every page section;
  the backend is small but groups project persistence under a generic `models/`
  folder rather than feature ownership.

## Initial Analysis

**Directly verified:**

- Root `package.json` declares npm workspaces and paired frontend/backend tasks.
- `src/apps/frontend/src/App.tsx` is 138 lines with the full page hierarchy in
  one component; `App.css` is 638 lines but remains one cohesive visual system.
- Mochilada's website uses root `apps/frontend` and `apps/backend` packages.
- Tekit and the canonical HAWP Node guidance use feature-owned frontend and
  backend boundaries, while HAWP cautions against splitting by length alone.
- Generated build output, dependencies, and SQLite data are already ignored.

**Inferred (not yet proven):**

- Moving the workspace packages to root `apps/` will reduce path ambiguity and
  make the README, npm metadata, and physical layout agree.
- Co-locating page-section components and project API ownership should lower
  review friction while preserving runtime behavior.

**Scope:**

- Install the HAWP kit and Codex repository guidance.
- Move `src/apps/*` to `apps/*` and `src/public/*` to root `public/`.
- Update npm, Vite, logo-generator, documentation, and ignore paths.
- Extract frontend page sections from `App.tsx` by behavior ownership.
- Keep backend decomposition proportional to its current two-route scope.
- Add focused tests only where they protect behavior introduced or moved here.
- Run logo generation, typechecks, lint, builds, API smoke checks, and
  production-preview endpoint checks.

**Non-goals:** visual redesign, content-strategy changes, API shape changes,
release/deployment, or cleanup of unrelated historical checkpoint documents.

## Risk + Review Gate

**Risk:** medium — folder topology and imports change, but public behavior does
not.
**Gate:** approved by the user's explicit request to clean up files, folders,
and structure using HAWP plus Mochilada/Tekit references.

## Backlog + Plan Link

**Status now:** done
**Plan file:** work/closed/2026/09/29/815b752b/plan.md

## Next Step

- [x] Investigation recorded above
- [x] Scope and evidence written
- [x] User approval for structural cleanup recorded
- [x] Implement the bounded structure change
- [x] Verify the paired production path
- [x] Record outcome and close the work item

## Outcome

- Aligned the npm workspace with root `apps/frontend` and `apps/backend`
  packages, plus root `public/` assets.
- Reduced `App.tsx` to page composition and moved layout/section markup, site
  content, theme state, and project fetching to explicit owners.
- Organized the backend project route and Sequelize model under a project area,
  while avoiding unnecessary DI/service layers for the current read-only scope.
- Installed the HAWP Codex kit/overlay and kept the structural work plus the
  discovered dependency advisory visible in HAWP records.
- Updated README paths, repository map, checks, and paired production-preview
  instructions.

## Verification

See [verification evidence](../../../../../evidence/2026/09/29/815b752b/verification.md).

All scoped typecheck, lint, build, direct API, proxied API, preview, and browser
inspection checks passed. `git diff --check` passed.

## Remaining unproven

- Public deployment behavior and external infrastructure remain unverified.
- The transitive `uuid` advisory requires a separate dependency compatibility
  decision under work item `2a1dc541`.
- The installed HAWP kit contains one upstream broken example link; this does
  not affect project work validation.

## Close checklist

- [x] Outcome recorded
- [x] Verification evidence linked
- [x] Remaining uncertainty stated
- [x] Follow-up dependency work captured separately
