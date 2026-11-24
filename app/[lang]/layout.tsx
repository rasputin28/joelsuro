import type { Metadata } from "next";
import { Inter, Fraunces } from "next/font/google";
import { notFound } from "next/navigation";
import "../globals.css";
import { dictionaries, hasLocale, locales, localePath } from "./dictionaries";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  display: "swap",
});

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export async function generateMetadata({
  params,
}: LayoutProps<"/[lang]">): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const t = dictionaries[lang];
  return {
    metadataBase: new URL("https://joelsuro.com"),
    icons: {
      icon: [],
      apple: [],
      shortcut: [],
    },
    title: t.meta.title,
    description: t.meta.description,
    alternates: {
      canonical: localePath(lang),
      languages: {
        es: "/",
        en: "/en",
        "zh-Hans": "/zh",
        "x-default": "/",
      },
    },
    openGraph: {
      title: t.meta.title,
      description: t.meta.description,
      url: localePath(lang),
      siteName: "Joel Suro",
      locale: t.ogLocale,
      type: "website",
      images: [
        {
          url: "/og.png",
          width: 1200,
          height: 630,
          alt: t.meta.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: t.meta.title,
      description: t.meta.description,
      images: ["/og.png"],
    },
  };
}

export default async function RootLayout({
  children,
  params,
}: LayoutProps<"/[lang]">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  return (
    <html
      lang={dictionaries[lang].htmlLang}
      className={`${inter.variable} ${fraunces.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
