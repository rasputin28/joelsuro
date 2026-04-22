import type { Metadata } from "next";
import { Inter, Instrument_Serif } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument-serif",
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://joelsuro.com"),
  title: "Joel Suro | Consultoría en IA para distribuidoras y fabricantes",
  description:
    "Cofundador de OMNA. 200+ implementaciones en 9 países. Ayudo a dueños de empresas medianas a invertir en IA sin tirar el dinero. Agenda 30 minutos.",
  openGraph: {
    title: "Joel Suro | Consultoría en IA para distribuidoras y fabricantes",
    description:
      "Cofundador de OMNA. 200+ implementaciones en 9 países. Ayudo a dueños de empresas medianas a invertir en IA sin tirar el dinero. Agenda 30 minutos.",
    url: "https://joelsuro.com",
    siteName: "Joel Suro",
    locale: "es_MX",
    type: "website",
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "Joel Suro — Consultoría en IA para distribuidoras y fabricantes",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Joel Suro | Consultoría en IA para distribuidoras y fabricantes",
    description:
      "Cofundador de OMNA. 200+ implementaciones en 9 países. Agenda 30 minutos.",
    images: ["/og.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`${inter.variable} ${instrumentSerif.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
