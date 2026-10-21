import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { isLocale, locales } from "@/lib/i18n/config";
import { Geist, JetBrains_Mono } from "next/font/google";
import "../globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "DIRUS — El Sistema Operativo Autónomo para corredores de seguros",
    template: "%s | DIRUS",
  },
  description:
    "DIRUS automatiza el trabajo pesado de las agencias de seguros con IA sobre WhatsApp: ingesta de documentos, renovaciones zero-touch y un copiloto para el corredor.",
  keywords: [
    "seguros",
    "corredores de seguros",
    "automatización con IA",
    "WhatsApp",
    "renovaciones",
    "insurtech",
  ],
};

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function RootLayout({
  children,
  params,
}: LayoutProps<"/[locale]">) {
  const { locale } = await params;

  // An unsupported locale is a 404, not a silent fallback to Spanish: a URL
  // like /fr must not quietly serve different content than it names.
  if (!isLocale(locale)) notFound();

  return (
    <html
      lang={locale}
      className={`dark ${geistSans.variable} ${jetbrainsMono.variable} h-full bg-graphite text-ink antialiased`}
    >
      <body className="flex min-h-full flex-col bg-graphite text-ink">
        {children}
      </body>
    </html>
  );
}
