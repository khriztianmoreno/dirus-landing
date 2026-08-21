import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
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

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="es"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
