import { Container } from "@/components/layout/Container";
import type { Dictionary } from "@/lib/i18n/dictionaries";

type FaqSectionProps = {
  dictionary: Dictionary;
};

export function FaqSection({ dictionary }: FaqSectionProps) {
  const { faq } = dictionary.home;

  return (
    <section
      id="faq"
      className="py-24 md:py-32 border-t border-white/5 bg-near-black/30"
    >
      <Container>
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="font-mono text-xs uppercase tracking-widest text-accent-indigo-soft block mb-3">
            {faq.eyebrow}
          </span>
          <h2 className="font-sans text-3xl md:text-headline-lg font-bold text-white mb-4">
            {faq.title}
          </h2>
          <p className="text-body-md text-soft-gray">{faq.subtitle}</p>
        </div>

        <div className="max-w-3xl mx-auto space-y-4">
          {faq.items.map((item, index) => (
            <details
              key={index}
              className="bg-graphite-raised/50 backdrop-blur-xl p-6 rounded-xl border border-white/10 group focus-within:border-accent-indigo-soft/50 transition-colors"
              {...(index === 0 ? { open: true } : {})}
            >
              <summary className="flex justify-between items-center cursor-pointer font-sans text-lg font-medium text-white list-none select-none focus:outline-none">
                <span>{item.question}</span>
                <svg
                  className="w-5 h-5 text-accent-indigo-soft transform transition-transform duration-200 group-open:rotate-180 flex-shrink-0 ml-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </summary>
              <p className="mt-4 text-sm text-soft-gray leading-relaxed">
                {item.answer}
              </p>
            </details>
          ))}
        </div>
      </Container>
    </section>
  );
}
