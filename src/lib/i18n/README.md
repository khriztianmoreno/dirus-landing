# lib/i18n

Locale detection, locale routing and dictionary loading for `es` and `en`.

Keep the locale list defined once here and derive everything else from it.
When the set of supported languages is written down in several places, they
drift, and the bug shows up as a page that renders half-translated.
