import { Container } from "@/components/layout/Container";
import type { Dictionary } from "@/lib/i18n/dictionaries";

type SolutionSectionProps = {
  dictionary: Dictionary;
};

export function SolutionSection({ dictionary }: SolutionSectionProps) {
  const { solution } = dictionary.home;

  return (
    <section className="py-24 md:py-32 relative border-t border-white/5 bg-near-black/50 backdrop-blur-sm">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <span className="font-mono text-xs uppercase tracking-widest text-accent-indigo-soft block mb-3">
              {solution.eyebrow}
            </span>
            <h2 className="font-sans text-3xl md:text-headline-lg font-bold text-white mb-6">
              {solution.title}
            </h2>
            <p className="text-body-lg text-soft-gray mb-8 leading-relaxed">
              {solution.description}
            </p>

            {/* Highlighted Quote */}
            <div className="bg-graphite-raised/50 backdrop-blur-md p-6 rounded-lg border-l-2 border-l-accent-indigo-soft mb-8">
              <p className="font-body-md italic text-white/95 leading-relaxed">
                {solution.quote}
              </p>
            </div>

            {/* Bullets */}
            <ul className="space-y-4 font-mono text-soft-gray text-sm">
              {solution.bullets.map((bullet, index) => (
                <li key={index} className="flex items-center gap-3">
                  <svg
                    className="w-5 h-5 text-accent-indigo-soft flex-shrink-0"
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
                  <span>{bullet}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* 3D Multimodal Stack Graphic */}
          <div className="relative h-[480px] w-full flex items-center justify-center">
            <div className="relative w-full max-w-sm flex flex-col gap-6">
              {/* Top Layer */}
              <div className="border border-white/10 bg-graphite-raised/80 backdrop-blur-md rounded-xl p-6 shadow-xl hover:border-white/20 transition-colors">
                <div className="text-center">
                  <div className="font-mono text-xs text-white tracking-widest mb-3 uppercase">
                    {solution.architecture.topTitle}
                  </div>
                  <div className="flex gap-3 justify-center items-center mb-3">
                    <span className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-emerald-400">
                      💬
                    </span>
                    <span className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-white/80">
                      🎙️
                    </span>
                    <span className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-white/80">
                      🖼️
                    </span>
                    <span className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-white/80">
                      📄
                    </span>
                  </div>
                  <span className="font-mono text-xs text-soft-gray/70">
                    {solution.architecture.topSubtitle}
                  </span>
                </div>
              </div>

              {/* Arrow Connector */}
              <div className="flex justify-center -my-2 z-10">
                <svg
                  className="w-6 h-6 text-accent-indigo-soft animate-bounce"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 14l-7 7m0 0l-7-7m7 7V3"
                  />
                </svg>
              </div>

              {/* Middle Layer (Engine) */}
              <div className="border border-accent-indigo-soft/50 bg-graphite/90 backdrop-blur-xl rounded-xl p-6 shadow-[0_0_40px_rgba(54,38,206,0.3)] relative">
                <div className="text-center relative z-10">
                  <div className="font-sans text-xl font-bold text-white tracking-wider">
                    {solution.architecture.midTitle}
                  </div>
                  <div className="text-xs uppercase tracking-widest text-accent-indigo-soft mt-1 font-mono">
                    {solution.architecture.midSubtitle}
                  </div>
                </div>
                <div className="absolute -right-2 -top-2 w-4 h-4 bg-accent-indigo rounded-full animate-ping" />
              </div>

              {/* Arrow Connector */}
              <div className="flex justify-center -my-2 z-10">
                <svg
                  className="w-6 h-6 text-accent-indigo-soft animate-bounce"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 14l-7 7m0 0l-7-7m7 7V3"
                  />
                </svg>
              </div>

              {/* Bottom Layer (Output) */}
              <div className="border border-white/10 bg-near-black/90 backdrop-blur-md rounded-xl p-6 shadow-xl">
                <div className="text-center">
                  <div className="font-mono text-xs text-soft-gray tracking-widest mb-3 uppercase">
                    {solution.architecture.botTitle}
                  </div>
                  <div className="flex justify-around gap-2 font-mono text-xs text-soft-gray/90 bg-black/50 px-3 py-2 rounded">
                    {solution.architecture.botChecks.map((check, idx) => (
                      <span key={idx}>{check}</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
