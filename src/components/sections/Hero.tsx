import type { Dictionary } from "@/lib/i18n/dictionaries";

type HeroProps = {
  dictionary: Dictionary;
};

/**
 * Presentational and synchronous on purpose: the route file resolves the
 * locale and passes the dictionary in, which keeps this component unit
 * testable. Vitest cannot render async Server Components.
 */
export function Hero({ dictionary }: HeroProps) {
  return (
    <section className="flex flex-1 flex-col items-center justify-center gap-6 px-6 py-32 text-center">
      <h1 className="max-w-3xl text-4xl font-semibold tracking-tight text-balance">
        {dictionary.home.title}
      </h1>
      <p className="text-foreground/70 max-w-xl text-lg text-pretty">
        {dictionary.home.description}
      </p>
    </section>
  );
}
