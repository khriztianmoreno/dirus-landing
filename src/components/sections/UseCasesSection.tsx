import { Container } from "@/components/layout/Container";
import type { Dictionary } from "@/lib/i18n/dictionaries";

type UseCasesSectionProps = {
  dictionary: Dictionary;
};

export function UseCasesSection({ dictionary }: UseCasesSectionProps) {
  const { useCases } = dictionary.home;

  return (
    <section
      id="casos-de-uso"
      className="py-24 md:py-32 border-t border-white/5"
    >
      <Container>
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="font-mono text-xs uppercase tracking-widest text-accent-indigo-soft block mb-3">
            {useCases.eyebrow}
          </span>
          <h2 className="font-sans text-3xl md:text-headline-lg font-bold text-white mb-4">
            {useCases.title}
          </h2>
          <p className="text-body-md text-soft-gray">{useCases.subtitle}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {useCases.items.map((item, index) => (
            <div
              key={index}
              className={`bg-graphite-raised/40 backdrop-blur-xl border border-white/10 p-8 flex flex-col justify-between rounded-xl hover:border-accent-indigo-soft/40 transition-colors ${
                item.span ?? ""
              }`}
            >
              <div className="flex items-center justify-between mb-6">
                <div className="w-10 h-10 rounded bg-white/5 border border-white/10 flex items-center justify-center text-accent-indigo-soft">
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>
                </div>
                <span className="font-mono text-[11px] text-accent-indigo-soft border border-accent-indigo-soft/30 px-2 py-0.5 rounded uppercase">
                  {item.tag}
                </span>
              </div>
              <div>
                <h3 className="font-sans text-xl font-semibold text-white mb-2">
                  {item.title}
                </h3>
                <p className="text-soft-gray text-sm leading-relaxed">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
