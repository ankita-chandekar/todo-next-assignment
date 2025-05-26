import TranslationsProvider from "@/components/TranslationsProvider";
import initTranslations from "./../i18n";
const namespaces = ["common"];

export default async function Home({
  params: { locale },
}: {
  params: { [key: string]: string };
}) {
  const { t, resources } = await initTranslations(locale, namespaces);
  return (
    <TranslationsProvider
      locale={locale}
      resources={resources}
      namespaces={namespaces}
    >
      <div>Home page {t("app_title")}</div>
    </TranslationsProvider>
  );
}
