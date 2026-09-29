# Add interactive 3D solar system hero

**Backlog ID (Legacy):** — (UUID-native item)
**UUID:** `dc0a4fe3-2ec5-4bb3-991f-e7d20940ec11`
**Type:** improvement
**Reported:** 2026-09-29
**Closed:** 2026-09-29

## Input

The user asked to replace the hero's CSS-only solar system with a genuine Three.js 3D model using realistic orbital math, 3D stars and nebulae, and mouse/phone manipulation centered on the Sun. Keep usage lean and scope the larger navigable-universe concept to v0.0.1.

## Investigation

- The hero previously rendered CSS-only decorative orbits in `src/apps/frontend/src/pages/home/components/solar-system.tsx` and marked its card `aria-hidden` in `src/apps/frontend/src/pages/home/components/hero.tsx`.
- Family Game Jam reference: `src/presentation/scene/ChessScene.tsx` uses Three.js through React Three Fiber/Drei, with damped and bounded OrbitControls, disabled pan, and capped DPR.
- Website packages are located in `src/apps/`, while root npm workspace paths still pointed at `apps/`.
- NASA NSSDCA fact sheets provide J2000 mean elements used for all eight planets.

## Options and decision

Kept the website's existing frontend structure and fixed its workspace glob to `src/apps/*`. Used direct Three.js rather than adding Fiber/Drei because one scene did not need the extra render abstraction. Scene code uses NASA J2000 elements, solar gravitational parameter, mean motion, and a Newton iteration solving Kepler's equation; orbit orientation includes eccentricity, inclination, ascending node, and perihelion argument. A shared accelerated clock preserves orbital-period relationships. Display radii and orbital distances are compressed to fit the hero card, so this is a Keplerian educational visualization, not a precision ephemeris.

## Implementation

- Added the lazy-loaded Three.js scene in `src/apps/frontend/src/pages/home/components/solar-scene.ts` and the accessible loader/control wrapper in `src/apps/frontend/src/pages/home/components/solar-system.tsx`.
- Added 540 deterministically randomized 3D stars, a restrained set of 3D additive nebula sprites, eight shaded planets, inclined orbit paths, and a simple glowing Sun. No external textures, post-processing, shadows, or remote assets.
- Added bounded OrbitControls with pan disabled, mouse drag, touch rotate/pinch support, and “Center on Sun.” Scene loads near view, caps DPR at 1.25/rendering at 30 FPS, pauses drawing offscreen or in a hidden tab, respects reduced motion, responds to theme changes, and disposes WebGL resources.
- Made non-link hero copy pass pointer events through so the headline does not steal panel gestures.
- Fixed root workspace, lint, README and logo generator paths for existing `src/apps/` layout; added Three.js and its type package to the frontend workspace.
- Larger free-flight universe, simulated plasma/flaring, precise ephemerides, and touch-device hardware testing remain out of v0.0.1 scope.

## Outcome

Implemented in the working tree. No commit, push, deployment, or release was made. The separate scene chunk is intentionally deferred, not removed: current production build reports the app entry at 249.54 KB raw / 78.74 KB gzip and the Three.js scene at 569.97 KB raw / 141.57 KB gzip.

## Verification

- `npm run check` passed: frontend and backend TypeScript checks, `oxlint src/apps`, and production builds.
- `git diff --check` passed.
- Production preview on temporary local port 4174 returned HTTP 200; API health and projects endpoints on local port 3001 returned HTTP 200.
- Browser preview rendered the 3D canvas and accessible reset button without console warnings/errors. Mouse drag changed the camera/orbit perspective; “Center on Sun” restored the initial view.
- Responsive browser checks at 390 px and 320 px: document `scrollWidth` was 375 and 305 respectively, both below their viewport widths; hero panel remained within the page.
- Touch-specific synthetic dispatch was unavailable in the in-app browser, and no physical phone was tested. Touch handling uses OrbitControls' built-in pointer/touch controls, but a real-device gesture remains unverified.
- Build emits a warning because the separate minimized Three.js chunk is over 500 KB raw; gzip transfer is about 142 KB and deferred until the panel approaches the viewport. This is local production-preview evidence, not deployed performance evidence.
- HAWP validates this item's backlog consistency and close checklist. Repository-wide validation still flags a missing verification/close checklist in the older `7b5feb25` record; link checking also finds an existing broken example link in `.hawp/kit/usage/mcp/README.md`. These unrelated historical/kit issues were left unchanged.

## Close checklist

- [x] Outcome recorded
- [x] Verification evidence recorded
- [x] Remaining uncertainty stated
- [x] Larger-universe follow-up kept out of v0.0.1 scope
