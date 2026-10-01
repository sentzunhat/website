# CORP-03 — Measure and improve mobile loading

ID: `c0300001`
Type: improvement
Status: done
Opened: 2026-10-01
Source: Mochilada October 15, 2026 release strategy supplied 2026-10-01

input: |
  Record and sequence the Sentzunhat website and business-email work described in the October release strategy.

context: |
  Website work belongs in this repository. Keep approved branding, theme, solar-system hero, crawlable content, truthful project status, and measured performance. See `.hawp/work/status/2026/10/01/release-strategy-context.md` for shared dates, gates, positioning, and sequencing.

mission: |
  CORP-03 — Measure and improve mobile loading.

constraints: |
  This is a recorded work item, not evidence that the proposed state has been implemented or externally verified. Preserve existing active work and do not let corporate-site changes delay the Mochilada App Store submission.

output: |
  A completed and verified change with evidence linked from this plan.

## Intake context

Reduce avoidable mobile loading work based on measured browser/Lighthouse traces. Lazy-load the project route so homepage visitors do not download project-only content and icons before navigating. Preserve the existing IntersectionObserver-based dynamic import of the Three.js solar scene. Measure initial JavaScript, Fira Sans payload, React Icons chunks, unused CSS, hydration, low-end mobile Three.js work, image dimensions, and initial server response; fix bottlenecks shown by evidence rather than package size alone.

Acceptance: route split is present; homepage still renders and navigates correctly; before/after mobile evidence is recorded for the measured bottlenecks; approved hero/theme remain intact.

## Investigation and planning

- [x] Investigate current source and implementation overlap before shaping the plan.
- [x] Record options, risk, touched paths, and verification plan before implementation.
- [x] Verify the result and update this plan/backlog.

### Direct evidence — 2026-10-01

- `src/apps/frontend/src/app/app.tsx` eagerly imports `ProjectPage`; `src/apps/frontend/src/pages/project/project.tsx` imports all project content and route-only icons. The homepage branch does not need these modules.
- `src/apps/frontend/src/pages/home/components/solar-system.tsx` already uses IntersectionObserver and `import('./solar-scene')`; retain that loading behavior.
- Before change, the production build has an initial `index` JS chunk of 283,899 bytes (88,597 bytes transferred in the local mobile audit) and a lazy solar-scene chunk of 569,522 bytes. There is no project-route chunk.
- Lighthouse 13.5.0 against the local production preview at `127.0.0.1:4174` with mobile form factor reported Performance 95, FCP 1.66 s, LCP 2.87 s, TBT 7 ms, CLS 0. This is local simulated mobile evidence, not field data or a production-domain score.

### Decision and plan

- **Option considered:** tune fonts, icons, CSS, and Three.js together. The current trace does not isolate a performance failure in those resources, and the solar scene is already lazy.
- **Chosen:** use React `lazy` and `Suspense` for the project route only. Keep Home immediate and retain the existing server/build-rendered HTML and solar-scene import pattern.
- **Risk:** low to medium. The project page needs a readable loading fallback and route verification; a chunk load failure could leave it stuck without recovery.
- **Verification:** compare build chunk sizes and a repeated local mobile Lighthouse run; verify homepage does not fetch the project chunk, project routes load it and render correctly, static project HTML remains crawlable, and `npm run check` passes. If fonts/CSS/Three.js dominate after the split, keep them as measurement-led follow-up rather than change them speculatively.


## Outcome — 2026-10-01

The homepage no longer loads project-only code/content in its initial JavaScript. The project route loads under Suspense with a readable status fallback. The initial JS transfer in the local mobile audit fell by 8,590 bytes; the project route fetches its own 9,904-byte transferred chunk. Static project HTML and the existing lazy Three.js scene remain intact.

## Verification

`npm run check` passed. Local mobile Lighthouse and route-resource comparisons, client-rendered project DOM, direct HTTP responses, and static page inspection are recorded in the [evidence](../../../../../evidence/2026/10/01/c0300001/evidence.md). The local Lighthouse score was 95 before and 93 in two after runs, with LCP around 2.9 s in all runs. No overall speed-score improvement is claimed. Production behavior remains unverified.

## Close Checklist

- [x] Outcome recorded.
- [x] Route and local build verified.
- [x] Before/after payload and mobile audit evidence recorded.
- [x] Remaining production verification stated.
- [x] Backlog row moved to Recently Closed.
