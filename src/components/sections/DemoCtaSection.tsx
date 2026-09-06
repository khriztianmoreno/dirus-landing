"use client";

import { useState } from "react";
import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/Button";
import type { Dictionary } from "@/lib/i18n/dictionaries";

type DemoCtaSectionProps = {
  dictionary: Dictionary;
};

export function DemoCtaSection({ dictionary }: DemoCtaSectionProps) {
  const { demoCta } = dictionary.home;
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section
      id="solicitar-demo"
      className="py-28 text-center relative overflow-hidden border-t border-white/5 bg-near-black/80 backdrop-blur-md"
    >
      <Container className="relative z-10 max-w-3xl">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-accent-indigo-soft/30 bg-accent-indigo/10 font-mono text-xs uppercase tracking-wider text-accent-indigo-soft mb-6">
          <span>{demoCta.badge}</span>
        </div>

        <h2 className="font-sans text-4xl sm:text-5xl md:text-display-lg font-bold text-white mb-6">
          {demoCta.titleStart}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-accent-indigo-soft to-white">
            {demoCta.titleHighlight}
          </span>
          {demoCta.titleEnd}
        </h2>

        <p className="text-body-lg text-soft-gray max-w-2xl mx-auto mb-10 leading-relaxed">
          {demoCta.subtitle}
        </p>

        {/* Lead Form */}
        <div className="max-w-md mx-auto bg-graphite-raised/70 backdrop-blur-xl p-6 sm:p-8 rounded-xl border border-white/10 mb-6 text-left shadow-2xl">
          {submitted ? (
            <div className="p-4 bg-accent-indigo/20 border border-accent-indigo-soft/40 rounded-lg text-center font-mono text-sm text-accent-indigo-soft">
              {demoCta.form.alertSuccess}
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div>
                <label
                  htmlFor="demo-name"
                  className="block font-mono text-xs text-soft-gray mb-1.5 uppercase tracking-wider"
                >
                  {demoCta.form.nameLabel}
                </label>
                <input
                  id="demo-name"
                  type="text"
                  required
                  placeholder={demoCta.form.namePlaceholder}
                  className="w-full bg-graphite border border-white/10 rounded px-4 py-3 text-sm text-white placeholder-soft-gray/40 focus:outline-none focus:border-accent-blue transition-colors"
                />
              </div>

              <div>
                <label
                  htmlFor="demo-phone"
                  className="block font-mono text-xs text-soft-gray mb-1.5 uppercase tracking-wider"
                >
                  {demoCta.form.phoneLabel}
                </label>
                <input
                  id="demo-phone"
                  type="tel"
                  required
                  placeholder={demoCta.form.phonePlaceholder}
                  className="w-full bg-graphite border border-white/10 rounded px-4 py-3 text-sm text-white placeholder-soft-gray/40 focus:outline-none focus:border-accent-blue transition-colors"
                />
              </div>

              <div>
                <label
                  htmlFor="demo-email"
                  className="block font-mono text-xs text-soft-gray mb-1.5 uppercase tracking-wider"
                >
                  {demoCta.form.emailLabel}
                </label>
                <input
                  id="demo-email"
                  type="email"
                  required
                  placeholder={demoCta.form.emailPlaceholder}
                  className="w-full bg-graphite border border-white/10 rounded px-4 py-3 text-sm text-white placeholder-soft-gray/40 focus:outline-none focus:border-accent-blue transition-colors"
                />
              </div>

              <Button
                type="submit"
                variant="primary"
                className="mt-2 w-full justify-center py-4 text-sm font-mono tracking-wider uppercase group"
              >
                <span>{demoCta.form.submitButton}</span>
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
            </form>
          )}
        </div>

        <p className="font-mono text-xs text-soft-gray/60">
          {demoCta.microcopy}
        </p>
      </Container>
    </section>
  );
}
