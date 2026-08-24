# components/webgl

Canvas, shader and 3D work, plus the fallbacks shown while it loads or when
it cannot run.

Two rules that are cheap now and expensive later:

- **Always ship a fallback.** WebGL fails on old GPUs, blocked contexts and
  strict privacy settings. A landing page that renders nothing in those cases
  loses the visitor entirely.
- **Respect `prefers-reduced-motion`.** Continuous animation triggers
  vestibular symptoms in some people. Honour the query rather than treating
  it as optional polish.
