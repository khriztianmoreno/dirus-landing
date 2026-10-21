import { Container } from "@/components/layout/Container";
import type { Dictionary } from "@/lib/i18n/dictionaries";

type ComparisonSectionProps = {
  dictionary: Dictionary;
};

export function ComparisonSection({ dictionary }: ComparisonSectionProps) {
  const { comparison } = dictionary.home;

  return (
    <section
      id="comparativa"
      className="py-24 md:py-32 border-t border-white/5 bg-near-black/40"
    >
      <Container>
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="font-mono text-xs uppercase tracking-widest text-accent-indigo-soft block mb-3">
            {comparison.eyebrow}
          </span>
          <h2 className="font-sans text-3xl md:text-headline-lg font-bold text-white mb-4">
            {comparison.title}
          </h2>
          <p className="text-body-md text-soft-gray">{comparison.subtitle}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto mb-12">
          {/* Traditional Workflow */}
          <div className="bg-graphite-raised/50 backdrop-blur-xl p-8 rounded-xl border border-red-500/30">
            <div className="flex items-center gap-3 mb-6">
              <span className="w-8 h-8 rounded-full bg-red-500/10 border border-red-500/30 flex items-center justify-center text-red-400 font-bold text-lg">
                ✕
              </span>
              <h3 className="font-sans text-xl font-semibold text-white">
                {comparison.traditional.title}
              </h3>
            </div>
            <ul className="space-y-4 text-sm text-soft-gray">
              {comparison.traditional.items.map((item, idx) => (
                <li key={idx} className="flex items-start gap-3">
                  <span className="text-red-400 mt-0.5">•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* DIRUS Workflow */}
          <div className="bg-graphite-raised/70 backdrop-blur-xl p-8 rounded-xl border border-accent-indigo-soft/60 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 bg-accent-indigo/10 rounded-full blur-2xl pointer-events-none" />
            <div className="flex items-center gap-3 mb-6">
              <span className="w-8 h-8 rounded-full bg-accent-indigo/20 border border-accent-indigo-soft/40 flex items-center justify-center text-accent-indigo-soft font-bold text-lg">
                ✓
              </span>
              <h3 className="font-sans text-xl font-semibold text-white">
                {comparison.dirus.title}
              </h3>
            </div>
            <ul className="space-y-4 text-sm text-soft-gray">
              {comparison.dirus.items.map((item, idx) => (
                <li key={idx} className="flex items-start gap-3">
                  <span className="text-accent-indigo-soft mt-0.5">✓</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="text-center max-w-2xl mx-auto">
          <p className="font-sans text-lg md:text-xl text-white/90 font-normal">
            {comparison.quoteStart}
            <span className="text-accent-indigo-soft font-medium">
              {comparison.quoteHighlight}
            </span>
            {comparison.quoteEnd}
          </p>
        </div>
      </Container>
    </section>
  );
}
