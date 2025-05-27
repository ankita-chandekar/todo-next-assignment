import initTranslations from "@/app/i18n";
import LanguageChanger from "@/components/LanguageSwitcher";
import TranslationsProvider from "@/components/TranslationsProvider";
import Login from "./page";

const layout = async ({ params }: { params: Promise<{ locale: string }> }) => {
  const { locale } = await params;
  const { resources } = await initTranslations(locale, ["common"]);

  return (
    <TranslationsProvider
      locale={locale}
      resources={resources}
      namespaces={["common"]}
    >
      <div>
        <Login />
        <LanguageChanger />
      </div>
    </TranslationsProvider>
  );
};

export default layout;
