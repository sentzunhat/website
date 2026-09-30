# UI iconography

Sentzunhat's website uses `react-icons` as the single UI icon source.

## Rules

- Use icons from `react-icons/fa` for controls, links, status affordances, and other interface iconography.
- Do not use emoji or Unicode arrow/crosshair glyphs as UI icons. Text punctuation such as the copyright symbol or a middle dot used as punctuation is not an icon and may remain text.
- Do not add a second icon library for one-off symbols when an equivalent `react-icons` icon exists.
- Keep icon meaning secondary to text whenever possible. A link labelled `Explore project` should remain understandable if the icon is removed.
- When an icon is decorative beside visible text, set `aria-hidden="true"`.
- For an icon-only control, give the control an accessible `aria-label`; the icon itself should still be hidden from assistive technology.

## Shared classes

- `.ui-icon` — default inline interface icon.
- `.brand-icon` — brand/provider icon such as GitHub.
- `.project-icon` — project-card icon.
- `.action-icon` — directional or control icon used inside an action.
- `.external-icon` / `.link-trailing-icon` — secondary external-link indicators.

Size icons at the component when the visual hierarchy needs it, but keep the semantic class so spacing and alignment stay consistent.

## Examples

```tsx
<a href="/projects/mochilada/">
  Explore Mochilada
  <FaArrowRight className="ui-icon action-icon" aria-hidden="true" />
</a>
```

```tsx
<button type="button" aria-label="Center view on the Sun">
  <FaCrosshairs className="ui-icon action-icon" aria-hidden="true" />
</button>
```

Avoid:

```tsx
<span aria-hidden="true">↗</span>
<span aria-hidden="true">◎</span>
```
