# components/sections

Full-width landing-page bands: hero, the three pillars, social proof,
pricing, closing CTA.

A section is composed from `ui/` primitives and receives its copy from
`content/`. Sections may know what DIRUS sells; primitives may not. Keep the
text out of the JSX so the same section renders in Spanish and English.
