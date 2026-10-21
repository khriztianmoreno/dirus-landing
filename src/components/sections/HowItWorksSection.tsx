import { Container } from "@/components/layout/Container";
import type { Dictionary } from "@/lib/i18n/dictionaries";

type HowItWorksSectionProps = {
  dictionary: Dictionary;
};

export function HowItWorksSection({ dictionary }: HowItWorksSectionProps) {
  const { howItWorks } = dictionary.home;

  return (
    <section
      id="como-funciona"
      className="py-24 md:py-32 border-t border-white/5"
    >
      <Container>
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="font-mono text-xs uppercase tracking-widest text-accent-indigo-soft block mb-3">
            {howItWorks.eyebrow}
          </span>
          <h2 className="font-sans text-3xl md:text-headline-lg font-bold text-white mb-4">
            {howItWorks.title}
          </h2>
          <p className="text-body-md text-soft-gray">{howItWorks.subtitle}</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-6">
          {howItWorks.steps.map((step) => (
            <div
              key={step.number}
              className="bg-graphite-raised/40 backdrop-blur-xl border border-white/10 p-6 rounded-xl flex flex-col justify-between hover:border-accent-indigo-soft/40 transition-colors group"
            >
              <div>
                <div className="font-mono text-accent-indigo-soft text-sm mb-4 flex items-center gap-3">
                  <span>{step.number}</span>
                  <div className="h-px bg-accent-indigo-soft/30 flex-1 group-hover:bg-accent-indigo-soft transition-colors" />
                </div>
                <h3 className="font-sans text-lg font-semibold text-white mb-3">
                  {step.title}
                </h3>
                <p className="text-soft-gray text-sm leading-relaxed">
                  {step.description}
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-white/5 text-[12px] font-mono text-accent-indigo-soft/70">
                {step.tag}
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
