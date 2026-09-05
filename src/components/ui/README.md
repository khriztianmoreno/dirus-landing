# components/ui

Presentation primitives: button, card, link, badge, input, icon.

Nothing here may reference DIRUS, insurance, or any specific page. A
primitive that cannot be dropped into a different product unchanged belongs
in `sections/`.

These are the components worth testing thoroughly — they are used everywhere,
so a defect here multiplies.

## Interactive state conventions

All interactive elements share a single focus and hover language defined in
`globals.css` and replicated in each component's Tailwind classes:

- **Focus ring**: `outline: 2px solid accent-blue` with `outline-offset: 2px`
  via `:focus-visible` in `@layer base` — only appears on keyboard
  navigation, never on mouse clicks. Survives forced-colors (High Contrast).
- **Hover**: 150ms colour transition, elevated underline for links,
  surface lightening for buttons.
- **Active/Pressed**: subtle dimming for tactile feedback.
- **Disabled**: `pointer-events-none opacity-50` (buttons only — links
  cannot be disabled natively).

Use the `Link` component for navigation links. Use `Button` for actions
and CTAs.
