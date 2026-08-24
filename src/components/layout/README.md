# components/layout

The page shell: header, footer, page containers and grid wrappers.

Layout components position their children and own no business state. They
receive content through props or `children`, never by reaching for data
themselves — that keeps them reusable across every page.
