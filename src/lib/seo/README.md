# lib/seo

Metadata builders, structured data (JSON-LD) and sitemap helpers.

Page-level metadata is composed here and consumed by the App Router `metadata`
exports, so title and description rules live in one place instead of being
retyped per route.

Note that `metadataBase` is still unset while the production domain is
undecided; until it is, relative Open Graph URLs resolve against localhost.
