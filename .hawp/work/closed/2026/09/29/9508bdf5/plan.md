# Improve crawlability, project pages, and icon consistency

ID: `9508bdf5`
Type: improvement
Status: done
Opened: 2026-09-29
Closed: 2026-09-29

## Shape

input: |
  Audit the Sentzunhat website against the supplied AEO/GEO report, research current guidance before changing it, add project pages, standardize UI icons on react-icons instead of emoji or Unicode icon glyphs, then commit and push the completed work.

context: |
  The supplied report scored the deployed homepage 47/100 and found that static HTML exposed only five words, no H1/H2/H3 structure, and no internal links even though AI crawlers were allowed. The React application already had strong production Lighthouse evidence, so the main issue was crawlable HTML rather than a demonstrated runtime performance regression. The site already uses react-icons and has six project concepts visible on the homepage.

mission: |
  Make the public site substantially easier for search engines and AI crawlers to understand without inflating claims, while adding useful project detail pages and a single icon convention.

constraints: |
  Research authoritative current guidance first. Keep the approved visual direction. Do not rewrite the homepage more than necessary because a larger homepage revision is planned. Do not publish private repository details merely because they were useful for verification. Do not add FAQ or HowTo structured data only to satisfy a checker when the markup is not a natural fit. Use react-icons for UI iconography instead of emoji or Unicode arrow/crosshair glyphs. Keep project status and scope truthful.

output: |
  Crawlable build-time HTML for the homepage and project pages, per-project metadata and schema, sitemap and AI-discovery files, internal linking, standardized React icons, a documented icon convention, and verification evidence.

## Investigation and research

### Supplied report

- Overall AEO/GEO readiness: 47/100.
- AI crawler access: 100/100.
- Technical SEO: 80/100.
- Content quality: 30/100.
- The report detected JavaScript-rendered content and only five words in initial HTML.
- Static HTML had no H1, no subheadings, and no internal links.
- `llms.txt`, `robots.txt`, and `sitemap.xml` already existed.
- The report suggested FAQ/HowTo schema, but those suggestions were treated as checker heuristics rather than requirements.

### Current guidance checked

- Google Search Central says server-side or pre-rendering remains useful because not all bots execute JavaScript.
- Google recommends crawlable `<a>` links and a distinct URL for each significant piece of JavaScript-app content.
- Google recommends structured data only when it accurately describes the page; current supported search features include Organization, Breadcrumb, and Software App markup.
- Google currently treats dynamic rendering as a workaround and recommends server-side rendering, static rendering, or hydration instead.
- Schema.org provides `Project` and `SoftwareSourceCode` types that fit Noyolo and the public engineering projects more accurately than forcing every page into one schema type.

## Implementation

- Added build-time prerendering after the Vite production build.
- Production `index.html` now contains meaningful crawlable homepage content before JavaScript runs.
- Added dedicated static + React project routes for Mochilada, HAWP, Zacatl, Tekit, Chiwakal, and Noyolo.
- Added unique titles, meta descriptions, canonical URLs, Open Graph/Twitter metadata, WebPage/Breadcrumb structured data, and an appropriate primary entity type for each project.
- Added crawlable internal links from homepage project cards to project pages.
- Updated sitemap coverage for all project URLs.
- Added `llms-small.txt`, `llms-full.txt`, and `.well-known/ai.txt` as supplementary discovery files while keeping `robots.txt` as the actual crawler access control.
- Kept private-project public copy intentionally high level; private implementation and commercial details were not promoted merely because they were available during research.
- Replaced UI arrow/crosshair glyphs with react-icons components and documented the icon rule for future work.
- Did not add HowTo schema because no page contains a genuine step-by-step process.
- Did not add FAQ schema to the homepage merely to chase the checker score; visible question-based headings and truthful entity/page markup were preferred.

## Verification

- Parsed `project-pages.json` successfully.
- Ran `node --check` against the prerender script.
- Executed the prerender script against a representative built index fixture; it generated the homepage plus six project pages.
- Inspected generated pages: each has exactly one H1, multiple H2 headings, internal links, and a unique canonical URL.
- Generated static word counts were approximately 394-557 words per project page and about 450 words on the homepage, replacing the five-word static baseline without forcing an artificial 800-word homepage rewrite.
- TypeScript syntax transpilation was run for the changed TS/TSX sources.
- React UI sources were scanned after the branch write for the replaced Unicode arrow/crosshair glyphs.
- Full `npm run check` was not available in the local execution environment because the repository dependencies are not installed and outbound package access is unavailable; no claim is made that the complete repository build ran locally in this session.

## Close checklist

- [x] Scope implemented.
- [x] Claims kept bounded to verified public information.
- [x] Static crawlability addressed without bot-only dynamic rendering.
- [x] Project URLs and internal links added.
- [x] Metadata and structured data added.
- [x] Icon convention standardized on react-icons.
- [x] Supplementary AI-discovery files added.
- [x] Local generator and syntax checks completed.
- [x] Work record prepared for closure.
