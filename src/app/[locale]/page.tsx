import { Navbar } from "@/components/navigation/Navbar";
import { Hero } from "@/components/sections/Hero";
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
      <main className="flex flex-1 flex-col">
        <Hero dictionary={dictionary} />
      </main>
    </>
  );
}
