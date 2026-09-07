import { Container } from "@/components/layout/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Heading } from "@/components/ui/Heading";
import { Text } from "@/components/ui/Text";
import type { Dictionary } from "@/lib/i18n/dictionaries";

type ProblemProps = {
  dictionary: Dictionary;
};

/**
 * Presentational Problem section for DIRUS Brokers landing page (Issue #19).
 * Renders the eyebrow tag, section headline, the operational pain described
 * in plain copy, and the closing statement that hands the work back to DIRUS.
 *
 * The copy alone must communicate the whole operational problem, without
 * relying on the chaos-to-order visual (which ships separately in Issue #20).
 */
export function Problem({ dictionary }: ProblemProps) {
  const { problem } = dictionary.home;

  return (
    <section className="py-14 md:py-24 overflow-hidden">
      <Container className="relative z-10 text-center flex flex-col items-center gap-7 md:gap-10">
        <Eyebrow>{problem.eyebrow}</Eyebrow>

        <Heading level={2} size={1} className="max-w-4xl mx-auto">
          {problem.title}
        </Heading>

        <Text variant="lg" muted className="max-w-3xl mx-auto">
          {problem.description}
        </Text>

        <Text className="max-w-2xl mx-auto">{problem.closing}</Text>
      </Container>
    </section>
  );
}
