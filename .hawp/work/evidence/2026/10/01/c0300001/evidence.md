# CORP-03 route splitting and mobile loading evidence — 2026-10-01

## Scope

`src/apps/frontend/src/app/app.tsx` now loads `src/apps/frontend/src/pages/project/project.tsx` as a React lazy route under Suspense. The latter owns `src/apps/frontend/src/content/project-pages.json` and project-only icons. The solar scene remains dynamically imported from `src/apps/frontend/src/pages/home/components/solar-system.tsx`.

## Direct checks

- `npm run check` passed TypeScript, lint with 0 errors and 19 existing warnings, frontend build/static generation, and backend build. The known solar-scene chunk warning remains.
- Build output before: initial JS 283,899 bytes (88,597 transferred in a local mobile audit), solar scene 569,522 bytes (140,741 transferred). No separate project chunk.
- Build output after: initial JS 254,845 bytes (80,007 transferred), project chunk 29,560 bytes (9,904 transferred on the project route), solar scene unchanged. The initial JS reduction is 29,054 raw bytes and 8,590 transferred bytes.
- Lighthouse 13.5.0 against the production preview on `127.0.0.1:4174`, mobile form factor: before Performance 95, FCP 1.66 s, LCP 2.87 s, TBT 7 ms, CLS 0; after Performance 93, FCP 2.26 s, LCP 2.86 s, TBT 6 ms, CLS 0; repeated after Performance 93, FCP 1.96 s, LCP 2.93 s, TBT 0 ms, CLS 0. These local simulated runs show reduced JavaScript transfer but do not establish an overall speed-score gain.
- Homepage audit requested the initial and solar-scene chunks, and did not request the project chunk. Mochilada project audit requested the initial and project chunks, and did not request the solar scene.
- Chrome headless DOM output for `/projects/mochilada/` showed the client-rendered `.project-page`, Mochilada H1, and no lingering loading fallback. Direct local HTTP responses for `/`, `/projects/mochilada/`, and `/api/projects` were 200. The static project page retains crawlable content.
- Five Fira Sans font files transferred about 124 KB in each homepage audit. Lighthouse reported zero unused CSS savings and local server response of 1–7 ms. The solar chunk remained lazy and produced no measured TBT problem in these runs, so those assets were not changed. Home images in the inspected components specify dimensions.

## Limits

Local preview is not a production-domain or field-data measurement. A single before run and two after runs are insufficient to attribute the 2-point score difference to this change. Source/server architecture, font choices, and Three.js were left as follow-up candidates only if future traces show a meaningful bottleneck. No remote deployment was performed.
