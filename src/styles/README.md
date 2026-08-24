# styles

Shared stylesheets beyond the theme.

The Tailwind v4 theme and its design tokens live in `../app/globals.css`,
imported by the root layout — that is the Next.js convention and it stays
there. This folder is for stylesheets that are not the global theme: keyframes,
print styles, or vendor overrides that would bloat the theme file.

Tailwind utilities remain the default. Reach for a stylesheet here only when a
utility genuinely cannot express the rule.
