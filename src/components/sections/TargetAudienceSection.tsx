import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/Button";
import type { Dictionary } from "@/lib/i18n/dictionaries";

type TargetAudienceSectionProps = {
  dictionary: Dictionary;
};

export function TargetAudienceSection({
  dictionary,
}: TargetAudienceSectionProps) {
  const { targetAudience } = dictionary.home;

  return (
    <section className="py-24 md:py-32 border-t border-white/5">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <span className="font-mono text-xs uppercase tracking-widest text-accent-indigo-soft block mb-3">
              {targetAudience.eyebrow}
            </span>
            <h2 className="font-sans text-3xl md:text-headline-lg font-bold text-white mb-6">
              {targetAudience.title}
            </h2>
            <p className="text-body-lg text-soft-gray leading-relaxed mb-6">
              {targetAudience.paragraph1}
            </p>
            <p className="text-body-md text-soft-gray/80 leading-relaxed mb-8">
              {targetAudience.paragraph2}
            </p>
            <Button
              variant="primary"
              as="a"
              href="#solicitar-demo"
              className="px-6 py-3"
            >
              <span>{targetAudience.cta}</span>
              <svg
                className="w-4 h-4 ml-2"
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
          </div>

          {/* Checklist Panel */}
          <div className="bg-graphite-raised/50 backdrop-blur-xl p-8 md:p-10 rounded-2xl border border-white/10">
            <h3 className="font-sans text-xl font-semibold text-white mb-6 flex items-center gap-2">
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
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span>{targetAudience.checklistTitle}</span>
            </h3>
            <ul className="space-y-5 text-body-md text-sm text-soft-gray">
              {targetAudience.checklistItems.map((item, idx) => (
                <li key={idx} className="flex items-start gap-4">
                  <span className="w-5 h-5 rounded-full bg-accent-indigo/20 text-accent-indigo-soft flex items-center justify-center text-xs flex-shrink-0 mt-0.5">
                    ✓
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Container>
    </section>
  );
}
