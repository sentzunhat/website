# Pin website ports and align ESLint

**Backlog ID (Legacy):** — (UUID-native item)
**UUID:** `92cf3afa-2a59-4721-9695-c5d6b07de6b6`
**Type:** improvement
**Reported:** 2026-09-29

## Input

The user asked to change the website port so they can run it, and replace Oxlint with the ESLint used by Zacatl while keeping usage low.

## Investigation

- The frontend uses Vite defaults: development 5173 and preview 4173. README documents both defaults.
- Port 5173 is occupied by the Chiwakal Node development app, and 5175 is occupied by the Mochilada website. Port 5174 is free at investigation time.
- Port 4174 is free at investigation time and was the temporary production-preview port used in the preceding task.
- Zacatl exposes its `recommended` flat ESLint config through `@sentzunhat/zacatl/eslint`, using ESLint 9, typescript-eslint, and eslint-plugin-import. The website additionally needs React hook and refresh rules formerly configured in `.oxlintrc.json`.

## Plan

- Pin website development to strict port 5174 and production preview to strict port 4174; update README URLs. Do not start either server.
- Replace Oxlint with Zacatl's exported ESLint recommendations, preserve React hook/refresh checks, and install only the ESLint/config/runtime dependencies required for those rules.
- Run lint, typecheck, build, and whitespace checks; verify the selected ports remain free.

**Risk:** low — local developer tooling/configuration only; no app runtime behavior or public service contract changes.
**Gate:** explicitly approved by the user's request.

## Outcome

- Replaced the Oxlint script and dependency with ESLint 9 using Zacatl's exported flat configuration. Added the React Hooks and Fast Refresh plugins to preserve the previous frontend-specific checks.
- Scoped the Vite configuration exceptions narrowly so its standard default export and development-only imports do not weaken application-file rules.
- Set the frontend dev server to strict port `5174` and preview to strict port `4174`, and updated the README URLs.
- Corrected import ordering found by ESLint without auto-fixing the existing solar-scene implementation. Zacatl's stricter conventions now surface 20 warnings; there are no lint errors.
- The user started the paired development workflow during this task. The website is listening on `5174` and its API on `3001`; both were left running.

## Verification

- `npm run check` passed: frontend and backend typechecks, ESLint, and frontend/backend production builds.
- `git diff --check` passed.
- The project-owned Vite process was confirmed listening on port `5174`; the backend was confirmed listening on `127.0.0.1:3001`. Production preview was not started; port `4174` was available during the initial port check.
- ESLint reports 20 warnings (no errors), mostly explicit-return-type and function-style conventions in the frontend plus one config naming warning. These are advisory Zacatl rules and were not used as a reason for broad source churn.
- Frontend production build retains the existing Three.js chunk-size warning (`569.97 kB` minified); bundle optimization is outside this port/linter task.
- `hawp work validate` reports one pre-existing closed-plan completeness issue: `7b5feb25` lacks Verification and Close Checklist sections. This task's backlog integrity passed; the older record was not changed.

## Close checklist

- [x] Outcome recorded
- [x] Verification evidence recorded
- [x] Remaining warnings and unrelated validation issue stated
- [x] No service was stopped or replaced
