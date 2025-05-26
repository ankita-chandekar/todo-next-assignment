import { ToastContainer } from "react-toastify";
import CreateTodo from "./page";

import initTranslations from "@/app/i18n";
import TranslationsProvider from "@/components/TranslationsProvider";

const layout = async ({ params }: { params: { locale: string } }) => {
  const { locale } = await params;
  const { t, resources } = await initTranslations(locale, ["common"]);

  return (
    <TranslationsProvider
      locale={locale}
      resources={resources}
      namespaces={["common"]}
    >
      <CreateTodo />
      <ToastContainer autoClose={3000} />
    </TranslationsProvider>
  );
};

export default layout;
