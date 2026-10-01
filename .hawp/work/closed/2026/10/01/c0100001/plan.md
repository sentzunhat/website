# CORP-01 — Sentzunhat corporate identity cleanup

ID: `c0100001`
Type: improvement
Status: done
Opened: 2026-10-01
Source: Mochilada October 15, 2026 release strategy supplied 2026-10-01

input: |
  Record and sequence the Sentzunhat website and business-email work described in the October release strategy.

context: |
  Website work belongs in this repository. Keep approved branding, theme, solar-system hero, crawlable content, truthful project status, and measured performance. See `.hawp/work/status/2026/10/01/release-strategy-context.md` for shared dates, gates, positioning, and sequencing.

mission: |
  CORP-01 — Sentzunhat corporate identity cleanup.

constraints: |
  This is a recorded work item, not evidence that the proposed state has been implemented or externally verified. Preserve existing active work and do not let corporate-site changes delay the Mochilada App Store submission.

output: |
  A completed and verified change with evidence linked from this plan.

## Intake context

Remove public-facing “Studio” language and align the website with the Sentzunhat Corp. positioning supplied in the October release strategy.

Scope: `README.md` changes “carefully labelled studio research” to “product research and prototypes”; `src/apps/frontend/src/pages/home/components/explorations.tsx` changes “In the studio” to “Research & development” or “In development”; `src/apps/frontend/src/content/project-pages.json` changes Chiwakal’s “Studio exploration” to “Product research” or “Active prototype”; `scripts/render-static-pages.mjs` changes “The rest of the studio…” to “Other Sentzunhat work…”. Search public source and generated content for Studio/studio, experimental studio, and software studio. Rename sections: Current focus → Products; Open source → Foundations; Explorations → Research; How we build → Principles; About → Company. Retain approved brand, solar-system hero, and theme.

Acceptance: no public page describes Sentzunhat Corp. as a studio; project status and copy remain accurate; generated/static output reflects source changes. Strategy positioning to preserve: “Intelligence made useful”; Products · Foundations · Research; digital, physical, and human environments; do not claim machine consciousness.

## Investigation and planning

- [x] Investigate current source and implementation overlap before shaping the plan.
- [x] Record options, risk, touched paths, and verification plan before implementation.
- [x] Verify the result and update this plan/backlog.

### Directly observed source state — 2026-10-01

- `README.md`, `src/apps/frontend/src/pages/home/components/explorations.tsx`, `src/apps/frontend/src/content/project-pages.json`, and `scripts/render-static-pages.mjs` contain the public Studio wording named in the strategy.
- Homepage section labels are in `src/apps/frontend/src/pages/home/components/{focus,about,open-source,explorations,principles}.tsx`; `src/apps/frontend/src/components/header.tsx` contains the About and Work navigation labels.
- `docs/checkpoints/2026-09-29-sentzunhat-website-conversation-checkpoint.md` contains historical wording and is not part of the public page source.
- The working tree already contains the release-strategy work records from the prior task. No product-source edits were present before this item began.

### Decision and implementation plan

- **Option considered:** replace only the four Studio phrases. This would leave the new Products, Foundations, Research, Principles, and Company section language uneven.
- **Chosen:** update the four phrases and the visible section/navigation labels together, while preserving section IDs, page order, project statuses, SEO question headings in the static page, approved hero, and theme.
- **Risk:** low; public copy only. The main risk is a mismatch between React content and generated static HTML.
- **Verification:** search public source for Studio remnants, run the existing production check/build, inspect generated HTML for the revised identity, and confirm the generated links/headings remain present. Do not alter historical checkpoints.


## Outcome — 2026-10-01

Public-facing Studio wording was removed from the README, homepage React components, Chiwakal project metadata, and static page generator. Homepage labels now use Products, Foundations, Research & development, Principles, and Company. The hero layout, section anchors, project status, project-page URLs, and theme were preserved. The existing historical checkpoint remains as a record of prior wording.

## Verification

- `npm run check` passed TypeScript, lint (zero errors; 19 existing warnings), frontend production build, static page generation, and backend build. The existing solar-scene chunk-size warning remains.
- A generated-output inspection found one H1 and zero Studio references on the homepage and all six project pages. The homepage retained six project links. The Chiwakal output contains “Product research”; homepage output contains the revised Sentzunhat work sentence. The client bundle contains the new section labels and no “In the studio” text.
- A focused source search found no Studio or “software company” references in the public source files inspected for this item. `git diff --check` passed.
- No deployment or production browser check was performed; this is local build verification. See the [verification evidence](../../../../../evidence/2026/10/01/c0100001/evidence.md).

## Close Checklist

- [x] Outcome recorded.
- [x] Local build and generated output verified.
- [x] Remaining production check stated.
- [x] Backlog row moved to Recently Closed.
