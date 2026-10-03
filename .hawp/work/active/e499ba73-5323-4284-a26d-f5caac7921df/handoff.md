# Mobile header menu continuation

Paste this into the next agent conversation from the Sentzunhat website repository:

```text
input: |
  Implement the Sentzunhat mobile navbar menu requested by the owner: a simple Tekit-inspired menu with a translucent background, with the current header links and controls moved into it on phones.

context: |
  Work item e499ba73-5323-4284-a26d-f5caac7921df is planned at .hawp/work/active/e499ba73-5323-4284-a26d-f5caac7921df/plan.md. Read it, AGENTS.md, and .hawp/kit/start-here.md first. Current header: src/apps/frontend/src/components/header.tsx. Styles: src/apps/frontend/src/app/app.css. Tekit reference: ../tekit/src/frontend/app/pages/landing/components/navigation.tsx. Homepage anchors are handled by src/apps/frontend/src/pages/home/components/section-booklet.tsx. The analytics work belongs to another lane.

mission: |
  Implement and verify the compact mobile header and accessible translucent menu, preserving all current navigation destinations and theme choices.

constraints: |
  Inspect git status and current source before edits; preserve unrelated work. Do not copy Tekit's motion stack or add dependencies. Keep desktop layout, site identity, semantic anchors, light/dark/system themes, reduced-motion behavior, and SSR/hydration. Avoid changes to Analytics work. Coordinate overlap with f07ad639.

output: |
  Updated header and styles, passing npm run check, browser evidence at 320px/390px/desktop for open/close, keyboard, anchors, themes, and no overflow; update the owning plan/backlog with observed results and remaining public-deployment limits. Report exact files and any unresolved regression.
```
