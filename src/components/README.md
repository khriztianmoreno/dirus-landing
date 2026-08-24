# components

UI building blocks, grouped by the role they play rather than by the
technology they use.

| Folder        | Holds                                                 | Does not hold                                |
| ------------- | ----------------------------------------------------- | -------------------------------------------- |
| `layout/`     | Page shell: header, footer, containers, grid wrappers | Anything that fetches or owns business state |
| `navigation/` | Menus, links, language switcher, in-page anchors      | Page sections that happen to contain a link  |
| `sections/`   | Full landing-page bands: hero, pillars, pricing, CTA  | Anything reused outside a page section       |
| `ui/`         | Primitives: button, card, badge, input                | Anything that knows what DIRUS sells         |
| `webgl/`      | Canvas and shader work, and its loading fallbacks     | 2D presentational components                 |

A component belongs in `ui/` when it could be lifted into another product
unchanged. If it mentions insurance, brokers or renewals, it belongs in
`sections/`.
