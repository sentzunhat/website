# Refine hero energy geometry

ID: `8c2e01f4`
Type: improvement
Status: done
Opened: 2026-09-29
Closed: 2026-09-29

input: |
  Fix the hero background so its line art no longer looks squished or stretched, keep circular nodes circular, and evolve the animated dotted treatment into a restrained energy-line motif with Nawat/Pipil-inspired stepped geometry.

context: |
  The hero SVG used preserveAspectRatio="none", which distorted its viewBox to the hero container. The solar system and theme are already approved and must not be touched.

mission: |
  Refine only the hero background geometry and motion so it stays proportionally correct, minimal, timeless, and visually connected to Sentzunhat's Mesoamerican/Nawat design language.

constraints: |
  Do not change the solar system component. Do not change theme tokens or theme behavior. Avoid copying a specific sacred or archaeological motif; use abstract stepped geometry as a respectful visual reference. Preserve reduced-motion behavior.

output: |
  A production hero background with proportional SVG scaling, circular nodes that remain circular, subtle stepped geometry, and a moving energy pulse instead of dotted-line animation.

## Implementation

- Changed the hero SVG from distortion-prone `preserveAspectRatio="none"` to proportional `xMidYMid slice`.
- Replaced the prior mix of stretched orthogonal/wave paths with restrained stepped and chevron geometry.
- Added a low-opacity base line plus moving long energy segments rather than animated dots.
- Added circular ring/core nodes that stay circular because the SVG now scales uniformly.
- Kept the solar system and all theme behavior untouched.
- Preserved reduced-motion behavior by disabling the energy animation when requested.

## Verification

- Hero changes are isolated to `hero.tsx` and hero-line CSS.
- No changes were made to `solar-system.tsx`, `solar-scene.ts`, theme tokens, or theme switching.
