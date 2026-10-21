import { Container } from "@/components/layout/Container";
import type { Dictionary } from "@/lib/i18n/dictionaries";

type BenefitsSectionProps = {
  dictionary: Dictionary;
};

function BenefitIcon({ icon }: { icon: string }) {
  switch (icon) {
    case "schedule":
      return (
        <svg
          className="w-6 h-6 text-accent-indigo-soft"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      );
    case "mark_chat_read":
      return (
        <svg
          className="w-6 h-6 text-accent-indigo-soft"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
          />
        </svg>
      );
    case "content_paste_off":
      return (
        <svg
          className="w-6 h-6 text-accent-indigo-soft"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
          />
        </svg>
      );
    case "rule":
      return (
        <svg
          className="w-6 h-6 text-accent-indigo-soft"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
          />
        </svg>
      );
    case "tune":
      return (
        <svg
          className="w-6 h-6 text-accent-indigo-soft"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
          />
        </svg>
      );
    case "group_add":
      return (
        <svg
          className="w-6 h-6 text-accent-indigo-soft"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
          />
        </svg>
      );
    default:
      return (
        <svg
          className="w-6 h-6 text-accent-indigo-soft"
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
      );
  }
}

export function BenefitsSection({ dictionary }: BenefitsSectionProps) {
  const { benefits } = dictionary.home;

  return (
    <section id="beneficios" className="py-24 md:py-32 border-t border-white/5">
      <Container>
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="font-mono text-xs uppercase tracking-widest text-accent-indigo-soft block mb-3">
            {benefits.eyebrow}
          </span>
          <h2 className="font-sans text-3xl md:text-headline-lg font-bold text-white mb-4">
            {benefits.title}
          </h2>
          <p className="text-body-md text-soft-gray">{benefits.subtitle}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {benefits.items.map((item, index) => (
            <div
              key={index}
              className="bg-graphite-raised/40 backdrop-blur-xl border border-white/10 p-8 rounded-xl hover:border-accent-indigo-soft/40 transition-colors"
            >
              <div className="w-10 h-10 rounded bg-accent-indigo/10 border border-accent-indigo-soft/20 flex items-center justify-center mb-6">
                <BenefitIcon icon={item.icon} />
              </div>
              <h3 className="font-sans text-xl font-semibold text-white mb-3">
                {item.title}
              </h3>
              <p className="text-soft-gray text-sm leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
