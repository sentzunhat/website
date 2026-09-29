# Resolve transitive Sequelize uuid advisory

**Backlog ID (Legacy):** — (UUID-native item)
**UUID:** `2a1dc541-2cca-4c2f-b431-7a6535b77040`
**Type:** improvement
**Reported:** 2026-09-29

---

## Input (verbatim)

> npm audit --omit=dev reports three moderate GHSA-w5hq-g745-h8pq findings through @sentzunhat/zacatl -> sequelize -> uuid; the offered force fix is a breaking dependency change and was not applied during the structure cleanup.

## Intake Summary

Triage the moderate `uuid` advisory reported through Sequelize without accepting
the destructive downgrade proposed by `npm audit`. Establish which dependency
owns the vulnerable copy, whether the affected API shape is used, and the proof
required before a Zacatl patch release changes compatibility policy.

## Current Context

- Website runtime: Node `26.10.0`, npm `11.19.1`.
- Direct dependencies: `@sentzunhat/zacatl@0.0.61` and
  `sequelize@6.37.8`.
- Triage report: `docs/issues/uuid-advisory.md`.

## Initial Analysis

**Directly verified:**

- `npm audit --omit=dev` reports three moderate entries representing one chain:
  `@sentzunhat/zacatl -> sequelize -> uuid@8.3.2`.
- Zacatl's own direct `uuid` range is `^14.0.1`; the installed direct copy is
  `14.0.2` and is outside the affected `<11.1.1` range.
- Zacatl declares Sequelize `^6.37.8` as a peer; this website also declares that
  Sequelize version directly. Sequelize installs the affected `uuid@8.3.2`.
- The advisory affects `uuid` v3, v5, and v6 only when a caller supplies an
  output buffer. Inspection of Sequelize 6.37.8 found v1 and v4 calls without
  caller-provided buffers; no matching call was found in the inspected path.
- `npm audit fix --force` proposes downgrading Sequelize to `3.30.0` and Zacatl
  to `0.0.12`. Those are breaking regressions, not acceptable remediations.
- The report is analysis only. No dependency override, patch, or release has
  been applied.

**Inferred (not yet proven):**

- The installed package remains policy-visible even though the website's
  inspected Sequelize call path does not appear to invoke the affected API.
- A scoped override to `uuid@11.1.1` or newer might work, but crosses multiple
  major releases and needs compatibility proof before adoption.

**Likely scope:**

- Reproduce against the Zacatl repository and its supported Sequelize matrix.
- Prefer an upstream Sequelize release that raises its UUID dependency.
- If upstream is unavailable, run a bounded scoped-override experiment and
  prove CommonJS import compatibility, Zacatl tests, SQLite integration, and a
  clean production audit before proposing a patch release.
- If the override is incompatible, record a temporary risk acceptance and
  monitor upstream rather than downgrading frameworks.

## Risk + Review Gate

**Risk:** medium — the advisory appears unreachable in the inspected consumer,
but a transitive major-version override could break Sequelize at runtime.
**Gate:** review the compatibility evidence before any Zacatl dependency policy
or patch release.

## Backlog + Plan Link

**Status now:** plan-ready
**Plan file:** work/active/2a1dc541/plan.md

## Next Step

- [x] Investigation recorded above
- [x] Self-contained issue report written
- [x] Backlog moved to plan-ready
- [ ] Reproduce in the Zacatl repository
- [ ] Choose upstream update, proven override, or documented risk acceptance
