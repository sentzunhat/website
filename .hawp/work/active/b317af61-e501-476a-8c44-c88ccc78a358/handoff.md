# Marketing analytics continuation

Paste this into the second agent conversation from the Sentzunhat website repository:

```text
input: |
  Complete a lean public-only Sentzunhat marketing overview that shows page and route traction, acquisition, meaningful clicks/actions, device details, scroll depth, and homepage section reach.

context: |
  Work item b317af61-e501-476a-8c44-c88ccc78a358 is planned at .hawp/work/active/b317af61-e501-476a-8c44-c88ccc78a358/plan.md. Read it, AGENTS.md, and .hawp/kit/start-here.md. GA4 has a four-tab Sentzunhat marketing overview at https://analytics.google.com/analytics/web/?authuser=5#/analysis/a410459516p557072524/edit/ORMDbY0mS0WRv_Zbzn3vuA ; each tab filters Hostname exactly to sentzunhat.com. The earlier local/public baseline is .hawp/work/status/2026/10/02/a1206037-b80f-409e-a394-fd38c0a4996b/ga4-baseline.md. Analytics source is src/apps/frontend/src/analytics/google-analytics.ts; booklet is src/apps/frontend/src/pages/home/components/section-booklet.tsx. Another agent owns the mobile header menu under e499ba73-5323-4284-a26d-f5caac7921df.

mission: |
  Implement and verify a small privacy-conscious action, section reach, and scroll event contract, then extend the existing GA4 public-only exploration once useful data is available.

constraints: |
  Keep usage low and the implementation direct. Inspect git status/current source before edits and preserve other work. Keep exact sentzunhat.com hostname filtering, consent denial, and performance. Do not send PII or arbitrary query strings. Avoid double counting and do not change GA4 Admin definitions, consent, or retention without owner approval. Mark local network receipt separately from public deployment receipt. Coordinate booklet edits with f07ad639 and avoid mobile header files owned by e499ba73-5323-4284-a26d-f5caac7921df.

output: |
  Updated source, check/build and browser evidence, current GA4 exploration with any verified new dimensions, an updated owning plan/backlog, and a compact status report distinguishing observed results from pending production data.
```
