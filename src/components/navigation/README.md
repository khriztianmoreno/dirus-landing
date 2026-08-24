# components/navigation

Menus, navigation links, the language switcher and in-page anchors.

Navigation is where accessibility regressions concentrate: keyboard focus
order, `aria-current` on the active link, visible focus rings, and escape
handling on open menus. Test those behaviours here rather than assuming the
markup is enough.
