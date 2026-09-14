import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Heading } from "@/components/ui/Heading";
import { Text } from "@/components/ui/Text";
import type { Dictionary } from "@/lib/i18n/dictionaries";

type HeroProps = {
  dictionary: Dictionary;
};

/**
 * Presentational Hero section for DIRUS Brokers landing page (Issue #17).
 * Renders eyebrow badge with pulse node, gradient headline, subtitle,
 * primary CTA button with microcopy, and the operational flow pill.
 *
 * Responsive behavior (Issue #18): the layout stacks on mobile so the
 * headline and CTAs stay above the fold with no horizontal overflow, then
 * opens up at the `md` (768px) desktop breakpoint used across the site.
 */
export function Hero({ dictionary }: HeroProps) {
  const { hero } = dictionary.home;

  return (
    <section className="relative min-h-[92vh] flex items-center justify-center overflow-hidden py-14 md:py-24">
      <Container className="relative z-10 max-w-5xl mx-auto text-center flex flex-col items-center gap-7 md:gap-10 pt-8 pb-16">
        {/* Eyebrow badge */}
        <Eyebrow className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-accent-indigo-soft/30 bg-accent-indigo/10">
          <span className="w-2 h-2 rounded-full bg-accent-indigo animate-pulse" />
          {hero.badge}
        </Eyebrow>

        {/* H1 Headline */}
        <Heading level="display" className="max-w-4xl break-words">
          {hero.titleStart}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-accent-indigo-soft to-accent-indigo-soft/80">
            {hero.titleHighlight}
          </span>
          {hero.titleEnd}
        </Heading>

        {/* Subtitle */}
        <Text variant="lg" muted className="max-w-3xl mx-auto">
          {hero.subtitle}
        </Text>

        {/* CTA & Microcopy */}
        <div className="flex flex-col sm:flex-row items-center gap-3 mt-4 w-full sm:w-auto">
          <Button
            variant="primary"
            as="a"
            href="#solicitar-demo"
            className="w-full sm:w-auto text-center px-9 py-4 text-sm font-mono tracking-wider uppercase shadow-[0_0_25px_rgba(255,255,255,0.18)] group"
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
          <p className="font-mono text-xs text-soft-gray/70 max-w-xl text-center px-4 sm:px-0">
            {hero.microcopy}
          </p>
        </div>

        {/* Operational Flow Pill */}
        <div className="mt-8 w-full max-w-full overflow-x-auto py-2">
          <div className="inline-flex items-center gap-3 font-mono text-xs text-soft-gray bg-graphite-raised/80 backdrop-blur-md px-4 py-3 md:px-5 rounded-full border border-white/10 shadow-lg whitespace-nowrap">
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
