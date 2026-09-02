# components/ui

Primitivos de presentación: button, card, link, badge, input, icon.

Nada aquí puede referenciar DIRUS, seguros o alguna página específica. Un
primitivo que no pueda integrarse en un producto diferente sin modificaciones
pertenece a `sections/`.

Estos son los componentes que vale la pena probar a fondo — se usan en todas
partes, así que un defecto aquí se multiplica.

## Convenciones de estados interactivos

Todos los elementos interactivos comparten un único lenguaje de foco y hover
definido en `globals.css` y replicado en las clases Tailwind de cada componente:

- **Anillo de foco**: `ring-2 ring-accent-blue ring-offset-2 ring-offset-background`
  vía `:focus-visible` — solo aparece en navegación por teclado, nunca con
  clics del mouse.
- **Hover**: transición de color a 150ms, subrayado elevado para enlaces,
  aclarado de superficie para botones.
- **Active/Presionado**: atenuación ligera para feedback táctil.
- **Disabled**: `pointer-events-none opacity-50` (solo botones — los enlaces
  no pueden desactivarse nativamente).

Usa el componente `Link` para enlaces de navegación. Usa `Button` para
acciones y CTAs.
