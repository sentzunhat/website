# Backlog

Active index for current open work in this repository.
Closed history belongs under `.hawp/work/closed/YYYY/MM/DD/` and should not accumulate forever here.
Each row links to its plan file when one exists.

---

## Status Key

| Status        | Meaning                             |
| ------------- | ----------------------------------- |
| `inbox`       | Received, not yet analyzed          |
| `analyzing`   | Under investigation                 |
| `plan-ready`  | Plan written, awaiting review       |
| `approved`    | Plan approved, ready to implement   |
| `in-progress` | Being implemented                   |
| `parked`      | Deferred without closing            |
| `done`        | Implemented and verified            |
| `blocked`     | Blocked — reason noted in plan file |
| `wont-fix`    | Decided not to fix — reason noted   |

---

## Active Work

| ID | Type | Title | Status | Detail | Updated | Next Action |
| --- | --- | --- | --- | --- | --- | --- |
| `2a1dc541` | improvement | Resolve transitive Sequelize uuid advisory | plan-ready | [plan](active/2a1dc541/plan.md) | 2026-09-29 | Reproduce the scoped compatibility options in Zacatl |

---

## Recently Closed

Keep this section short (for example last 5-10 items or last 14-30 days).

| ID | Type | Title | Closed | Detail |
| --- | --- | --- | --- | --- |
| `5f1b9849` | improvement | Project universe and container simplification | 2026-09-29 | [plan](closed/2026/09/29/5f1b9849/plan.md) |
| `7b5feb25` | improvement | Repair frontend shape and redesign hero system | 2026-09-29 | [plan](closed/2026/09/29/7b5feb25/plan.md) |
| `815b752b` | improvement | Align website workspace and feature structure | 2026-09-29 | [plan](closed/2026/09/29/815b752b/plan.md) |
| `dc0a4fe3` | improvement | Add interactive 3D solar system hero | 2026-09-29 | [plan](closed/2026/09/29/dc0a4fe3/plan.md) |
| `92cf3afa` | improvement | Pin website ports and align ESLint | 2026-09-29 | [plan](closed/2026/09/29/92cf3afa/plan.md) |
| `c4b702be` | improvement | Fix canvas accessibility and add distroless Node 26 image | 2026-09-29 | [plan](closed/2026/09/29/c4b702be/plan.md) |

---

## Archive

- Closed work: `.hawp/work/closed/`
- Status reports: `.hawp/work/status/`
- Evidence: `.hawp/work/evidence/`
- Decisions: `.hawp/work/decisions/`

---

## Notes

- Check this file before starting any new item.
- Each item gets one plan folder under `.hawp/work/active/<ID>/plan.md` - no two agents on the same ID.
- Deferred items can move to `.hawp/work/parked/<ID>/plan.md` without being closed.
- On close, move the plan file to `.hawp/work/closed/YYYY/MM/DD/<ID>/plan.md`.
- Keep Recently Closed capped; do not append completed history forever.
- Work started outside this loop should still get a row added for visibility.
