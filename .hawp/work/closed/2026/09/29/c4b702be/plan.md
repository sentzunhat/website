# Fix canvas accessibility and add distroless Node 26 image

**Backlog ID (Legacy):** — (UUID-native item)
**UUID:** `c4b702be-9d04-4d8a-be61-eb2e2c173ff4`
**Type:** improvement
**Reported:** 2026-09-29

---

## Input (verbatim)

> Fix canvas accessibility and add distroless Node 26 image

## Intake Summary

Correct the application-owned Three.js accessibility console warning, leave
browser-extension messaging noise untouched, add a production container that
serves the built website and API from a non-root distroless Node 26 image, and
verify, commit all current repository work in one commit, then push to `origin`.

## Current Context

The current tree contains the intentionally dirty frontend/backend workspace
migration and the port/ESLint changes completed immediately before this task.
The backend currently exposes only `/api/health` and `/api/projects`; Vite serves
the frontend separately during development. The local dev server and API are
running. The user explicitly asked to commit everything in one commit and push.

## Initial Analysis

**Directly verified:**

- `src/apps/frontend/src/pages/home/components/solar-scene.ts` sets
  `aria-hidden="true"` on an interactive canvas; the supplied browser warning
  confirms that pointer interaction focuses this canvas.
- The `runtime.lastError` messages have no source match in the application and
  are established browser-extension messaging noise; no product workaround is
  appropriate.
- The backend has no production frontend-serving route or container definition.
  Zacatl/Mictlan examples use a Debian-compatible builder with a distroless
  Node 26 non-root runtime; SQLite needs a writable runtime data directory.
- Docker client, daemon, and buildx are available. The installed versions were
  observed directly; no image has yet been built.

**Inferred (not yet proven):**

- Removing `aria-hidden` and giving the canvas an accessible label should remove
  the focus/hidden conflict while preserving the surrounding labeled group.
- A production-only Fastify static registration can serve the Vite build without
  changing local Vite-proxied development behavior.

**Likely scope:**

- Update the canvas accessibility attributes.
- Add a direct Fastify static dependency and serve the frontend build only in
  production.
- Add a root Dockerfile and `.dockerignore` using Node 26/Trixie build tooling
  and `gcr.io/distroless/nodejs26-debian13:nonroot`; provide a writable SQLite
  location for UID 65532.
- Run project checks, build the image, and smoke-test the running image's HTML,
  health, and projects endpoints.
- Stage and inspect all current repository changes, create exactly one commit,
  and push it to `origin/main` without force.

## Risk + Review Gate

**Risk:** medium — production serving and image/runtime configuration change.
**Gate:** explicitly approved by the user's request to implement, build, verify,
commit all work, and push.

## Backlog + Plan Link

**Status now:** done
**Plan file:** work/closed/2026/09/29/c4b702be/plan.md

## Outcome

- Removed the conflicting `aria-hidden` attribute and exposed the WebGL canvas
  as a labelled image. The canvas remains inside the labelled Solar System
  group and does not enter the keyboard tab order.
- Added `@fastify/static` as a direct backend dependency and registered it only
  for production. The development frontend still uses Vite and its `/api`
  proxy.
- Added a Node 26 Trixie builder and non-root Debian 13 distroless Node 26
  runtime. The image serves the built SPA and API together and stores SQLite
  data under the writable, volume-backed `/data` directory.
- Left browser extension `runtime.lastError` messages and Vite/React developer
  information untouched because they are not application defects.
- The user requested one commit containing the whole current working tree and
  a push to `origin/main`; the plan records implementation and test evidence,
  while the final response will report the resulting commit and remote state.

## Verification

- `npm run check` passed all workspace typechecks, lint, and production builds;
  Zacatl ESLint emitted 20 existing convention warnings and no errors.
- `docker build --tag sentzunhat-website:codex-20260929 .` passed.
- The built image ran as UID `65532`; the home page, built JavaScript/CSS,
  `/api/health`, and `/api/projects` returned HTTP 200. The test used temporary
  `/data` storage, and its container was stopped and removed afterward.
- The live browser accessibility tree exposed the Solar System canvas as the
  explicitly labelled image rather than hiding it from accessibility APIs.
- `git diff --check` passed.
- `origin/main` had one unrelated documentation commit not present locally;
  the local branch was safely fast-forwarded before creating the requested
  commit. The push will be non-forced.

## Remaining unproven

- Browser-extension `runtime.lastError` messages are outside the app boundary
  and cannot be corrected in this repository.
- External deployment, platform volume attachment, and persistent-data
  behavior after host/container replacement were not tested.

## Close checklist

- [x] Outcome recorded
- [x] Verification evidence recorded
- [x] Remaining uncertainty stated
- [x] Explicitly approved single-commit and push request captured
