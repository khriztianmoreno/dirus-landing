# .storybook

Storybook configuration. Stories themselves live next to the components they
document, under `src/`, so a component and its story move and get deleted
together.

| File          | Owns                                                          |
| ------------- | ------------------------------------------------------------- |
| `main.ts`     | Where stories are found, which addons load, which framework   |
| `preview.tsx` | What wraps every story: fonts, global stylesheet, backgrounds |

`preview.tsx` loads `src/app/globals.css` and declares the same two `next/font`
families as the root layout. Without that, the `--font-*` custom properties are
undefined and every component silently falls back to the system stack — the
stories would document a page nobody will ever see.

Run `pnpm storybook` for the dev server, `pnpm build-storybook` for a static
build. The build output is gitignored.
