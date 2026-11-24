import { notFound } from "next/navigation";
import Landing from "./landing";
import { dictionaries, hasLocale } from "./dictionaries";

export default async function Page({ params }: PageProps<"/[lang]">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  return <Landing lang={lang} t={dictionaries[lang]} />;
}
