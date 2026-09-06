import { Container } from "@/components/layout/Container";
import type { Dictionary } from "@/lib/i18n/dictionaries";

type ProblemSectionProps = {
  dictionary: Dictionary;
};

export function ProblemSection({ dictionary }: ProblemSectionProps) {
  const { problem } = dictionary.home;

  return (
    <section
      id="el-problema"
      className="py-24 md:py-32 border-t border-white/5 relative"
    >
      <Container>
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <span className="font-mono text-xs uppercase tracking-widest text-accent-indigo-soft block mb-3">
            {problem.eyebrow}
          </span>
          <h2 className="font-sans text-3xl md:text-headline-lg font-bold text-white mb-6">
            {problem.title}
          </h2>
          <p className="text-body-lg text-soft-gray leading-relaxed">
            {problem.description}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
          {/* Card 1 - Pain Point */}
          <div className="bg-graphite-raised/50 backdrop-blur-xl border border-red-500/20 p-8 md:p-10 rounded-xl flex flex-col justify-between relative">
            <div>
              <div className="font-mono text-xs text-red-400 mb-4 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-red-500" />
                <span>{problem.card1.tag}</span>
              </div>
              <h3 className="font-sans text-xl md:text-headline-md font-semibold text-white mb-4">
                {problem.card1.title}
              </h3>
              <p className="text-soft-gray text-body-md leading-relaxed">
                {problem.card1.description}
              </p>
            </div>
            <div className="mt-8 pt-6 border-t border-white/5 flex items-center gap-3 text-xs font-mono text-red-400">
              <svg
                className="w-5 h-5 flex-shrink-0"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                />
              </svg>
              <span>{problem.card1.warning}</span>
            </div>
          </div>

          {/* Card 2 - Solution / Scalability */}
          <div className="bg-graphite-raised/50 backdrop-blur-xl border border-accent-indigo-soft/30 p-8 md:p-10 rounded-xl flex flex-col justify-between relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-accent-indigo/10 to-transparent pointer-events-none" />
            <div className="relative z-10">
              <div className="font-mono text-xs text-accent-indigo-soft mb-4 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-accent-indigo animate-pulse" />
                <span>{problem.card2.tag}</span>
              </div>
              <h3 className="font-sans text-xl md:text-headline-md font-semibold text-white mb-4">
                {problem.card2.title}
              </h3>
              <p className="text-soft-gray text-body-md leading-relaxed">
                {problem.card2.description}
              </p>
            </div>
            <div className="relative z-10 mt-8 pt-6 border-t border-white/5 flex items-center gap-3 text-xs font-mono text-accent-indigo-soft">
              <svg
                className="w-5 h-5 flex-shrink-0"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                />
              </svg>
              <span>{problem.card2.benefit}</span>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
