# lib

Framework-agnostic logic: no JSX, no React hooks.

| Folder   | Holds                                            |
| -------- | ------------------------------------------------ |
| `i18n/`  | Locale detection, routing and dictionary loading |
| `seo/`   | Metadata, structured data and sitemap helpers    |
| `utils/` | Small shared helpers with no home of their own   |

Everything here is a plain function, which makes it the easiest code in the
repo to test — and the code that most deserves it, since components depend
on it.
