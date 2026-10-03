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
| `b317af61-e501-476a-8c44-c88ccc78a358` | improvement | Measure marketing actions and homepage section reach | plan-ready | [plan](active/b317af61-e501-476a-8c44-c88ccc78a358/plan.md) | 2026-10-02 | Add lean events, verify consent and production receipt, then extend the GA4 overview |
| `e499ba73-5323-4284-a26d-f5caac7921df` | improvement | Put mobile header navigation in a translucent menu | plan-ready | [plan](active/e499ba73-5323-4284-a26d-f5caac7921df/plan.md) | 2026-10-02 | Implement menu and verify phone/desktop navigation |
| `a1206037-b80f-409e-a394-fd38c0a4996b` | audit | GA4 routes, navigation, and device report | in-progress | [plan](active/a1206037-b80f-409e-a394-fd38c0a4996b/plan.md) | 2026-10-02 | Recheck fresh public data in the four-tab GA4 exploration |
| `ce64effe-82ce-4182-9346-74c3df18d7a5` | improvement | Install detectable GA4 with navigation analytics | in-progress | [plan](active/ce64effe-82ce-4182-9346-74c3df18d7a5/plan.md) | 2026-10-02 | Push initial and virtual page-view fix; confirm live GA4 receipt |
| `c4253e37-2d77-457b-afa8-2dfeb5887073` | investigation | Assess Turso database support in Zacatl | plan-ready | [plan](active/c4253e37-2d77-457b-afa8-2dfeb5887073/plan.md) | 2026-10-01 | Prototype a standalone Zacatl Turso module first; keep Sequelize as a conditional alternative |
| `eb03bd96-c0df-4da0-821b-88717e414f94` | improvement | Move homepage and project page content into SQLite | plan-ready | [plan](active/eb03bd96-c0df-4da0-821b-88717e414f94/plan.md) | 2026-10-01 | Seed ordered pages/sections, then render them from SQLite through SSR |
| `f07ad639` | improvement | Prototype sliding page navigation for home and project sections | in-progress | [plan](active/f07ad639/plan.md) | 2026-10-02 | Verify deployed category/document-scroll refinement, then review project-page scope and performance |
| `2a1dc541` | improvement | Resolve transitive Sequelize uuid advisory | plan-ready | [plan](active/2a1dc541/plan.md) | 2026-09-29 | Reproduce the scoped compatibility options in Zacatl |
| `c3d0e4a8` | audit | Verify production SEO/AEO/GEO after deployment | in-progress | [plan](active/c3d0e4a8/plan.md) | 2026-09-30 | Confirm deployment, then verify Search Console indexing and rerun the same AEO/GEO checker |

---

## Blocked / Parked

| ID | Type | Title | Status | Detail | Updated | Next Action |
| --- | --- | --- | --- | --- | --- | --- |
| `c0400001` | task | Shared Sentzunhat contact and app support email | parked | [plan](parked/c0400001/plan.md) | 2026-10-01 | Resume before a public support channel or company-domain outreach is required |

---

## Recently Closed

Keep this section short (for example last 5-10 items or last 14-30 days).

| ID | Type | Title | Closed | Detail |
| --- | --- | --- | --- | --- |
| `34397672-17e5-4db1-94fa-4a0466f08623` | improvement | Align backend with Zacatl layers and model structure | 2026-10-01 | [plan](closed/2026/10/01/34397672-17e5-4db1-94fa-4a0466f08623/plan.md) |
| `327c8216-9cb7-468d-9d5b-769dea4e1ccd` | improvement | Give projects UUID identity and a page-content schema | 2026-10-01 | [plan](closed/2026/10/01/327c8216-9cb7-468d-9d5b-769dea4e1ccd/plan.md) |
| `c0200001` | improvement | CORP-02 — Server-render React pages from live project data | 2026-10-01 | [plan](closed/2026/10/01/c0200001/plan.md) |
| `c0300001` | improvement | CORP-03 — Measure and improve mobile loading | 2026-10-01 | [plan](closed/2026/10/01/c0300001/plan.md) |
| `c0100001` | improvement | CORP-01 — Sentzunhat corporate identity cleanup | 2026-10-01 | [plan](closed/2026/10/01/c0100001/plan.md) |
| `8c2e01f4` | improvement | Refine hero energy geometry | 2026-09-29 | [plan](closed/2026/09/29/8c2e01f4/plan.md) |
| `9508bdf5` | improvement | Improve crawlability, project pages, and icon consistency | 2026-09-29 | [plan](closed/2026/09/29/9508bdf5/plan.md) |
| `5f1b9849` | improvement | Project universe and container simplification | 2026-09-29 | [plan](closed/2026/09/29/5f1b9849/plan.md) |
| `7b5feb25` | improvement | Repair frontend shape and redesign hero system | 2026-09-29 | [plan](closed/2026/09/29/7b5feb25/plan.md) |

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
