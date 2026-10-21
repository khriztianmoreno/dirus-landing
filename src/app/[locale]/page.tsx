import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/navigation/Navbar";
import { BenefitsSection } from "@/components/sections/BenefitsSection";
import { ComparisonSection } from "@/components/sections/ComparisonSection";
import { DemoCtaSection } from "@/components/sections/DemoCtaSection";
import { FaqSection } from "@/components/sections/FaqSection";
import { Hero } from "@/components/sections/Hero";
import { HowItWorksSection } from "@/components/sections/HowItWorksSection";
import { ProblemSection } from "@/components/sections/ProblemSection";
import { SolutionSection } from "@/components/sections/SolutionSection";
import { TargetAudienceSection } from "@/components/sections/TargetAudienceSection";
import { UseCasesSection } from "@/components/sections/UseCasesSection";
import { isLocale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { notFound } from "next/navigation";

export default async function Home({ params }: PageProps<"/[locale]">) {
  const { locale } = await params;

  if (!isLocale(locale)) notFound();

  const dictionary = getDictionary(locale);

  return (
    <>
      <Navbar locale={locale} copy={dictionary.nav} />
      <main className="flex flex-1 flex-col pt-20">
        <Hero dictionary={dictionary} />
        <ProblemSection dictionary={dictionary} />
        <SolutionSection dictionary={dictionary} />
        <HowItWorksSection dictionary={dictionary} />
        <BenefitsSection dictionary={dictionary} />
        <UseCasesSection dictionary={dictionary} />
        <ComparisonSection dictionary={dictionary} />
        <TargetAudienceSection dictionary={dictionary} />
        <FaqSection dictionary={dictionary} />
        <DemoCtaSection dictionary={dictionary} />
      </main>
      <Footer locale={locale} dictionary={dictionary} />
    </>
  );
}
