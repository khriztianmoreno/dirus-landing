import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/Button";
import type { Dictionary } from "@/lib/i18n/dictionaries";

type HeroProps = {
  dictionary: Dictionary;
};

/**
 * Presentational Hero section for DIRUS Brokers landing page (Issue #17).
 * Renders eyebrow badge with pulse node, gradient headline, subtitle,
 * primary CTA button with microcopy, and the operational flow pill.
 */
export function Hero({ dictionary }: HeroProps) {
  const { hero } = dictionary.home;

  return (
    <section className="relative min-h-[92vh] flex items-center justify-center px-4 md:px-16 overflow-hidden py-16 md:py-24">
      <Container className="relative z-10 max-w-5xl mx-auto text-center flex flex-col items-center gap-8 pt-8 pb-16">
        {/* Eyebrow badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-accent-indigo-soft/30 bg-accent-indigo/10 font-mono text-xs tracking-wider uppercase text-accent-indigo-soft">
          <span className="w-2 h-2 rounded-full bg-accent-indigo animate-pulse" />
          <span>{hero.badge}</span>
        </div>

        {/* H1 Headline */}
        <h1 className="font-sans text-4xl sm:text-5xl md:text-display-lg text-white font-bold tracking-tight max-w-4xl leading-tight">
          {hero.titleStart}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-accent-indigo-soft to-accent-indigo-soft/80">
            {hero.titleHighlight}
          </span>
          {hero.titleEnd}
        </h1>

        {/* Subtitle */}
        <p className="font-sans text-lg md:text-body-lg text-soft-gray max-w-3xl mx-auto leading-relaxed">
          {hero.subtitle}
        </p>

        {/* CTA & Microcopy */}
        <div className="flex flex-col items-center gap-3 mt-4">
          <Button
            variant="primary"
            as="a"
            href="#solicitar-demo"
            className="px-9 py-4 text-sm font-mono tracking-wider uppercase shadow-[0_0_25px_rgba(255,255,255,0.18)] group"
          >
            <span>{hero.cta}</span>
            <svg
              className="w-4 h-4 ml-2 transition-transform duration-200 group-hover:translate-x-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M14 5l7 7m0 0l-7 7m7-7H3"
              />
            </svg>
          </Button>
          <p className="font-mono text-xs text-soft-gray/70 max-w-xl text-center">
            {hero.microcopy}
          </p>
        </div>

        {/* Operational Flow Pill */}
        <div className="mt-8 max-w-full overflow-x-auto py-2">
          <div className="inline-flex items-center gap-3 font-mono text-xs text-soft-gray bg-graphite-raised/80 backdrop-blur-md px-5 py-3 rounded-full border border-white/10 shadow-lg whitespace-nowrap">
            <div className="flex items-center gap-1.5 text-white font-medium">
              <svg
                className="w-4 h-4 text-emerald-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                />
              </svg>
              <span>{hero.flowPill.step1}</span>
            </div>

            <svg
              className="w-4 h-4 text-accent-indigo-soft"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>

            <div className="flex items-center gap-1.5 text-accent-indigo-soft font-medium">
              <svg
                className="w-4 h-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 10V3L4 14h7v7l9-11h-7z"
                />
              </svg>
              <span>{hero.flowPill.step2}</span>
            </div>

            <svg
              className="w-4 h-4 text-accent-indigo-soft"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>

            <div className="flex items-center gap-1.5 text-ink">
              <svg
                className="w-4 h-4 text-accent-indigo-soft"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span>{hero.flowPill.step3}</span>
            </div>

            <svg
              className="w-4 h-4 text-accent-indigo-soft"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>

            <div className="flex items-center gap-1 text-white font-semibold">
              <svg
                className="w-4 h-4 text-accent-indigo-soft"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
              <span>{hero.flowPill.step4}</span>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
