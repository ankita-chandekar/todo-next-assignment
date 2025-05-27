import React from "react";
import Register from "./page";
import { ToastContainer } from "react-toastify";
import initTranslations from "@/app/i18n";
import TranslationsProvider from "@/components/TranslationsProvider";

const layout = async ({ params }: { params: Promise<{ locale: string }> }) => {
  const { locale } = await params;
  const { resources } = await initTranslations(locale, ["common"]);

  return (
    <TranslationsProvider
      locale={locale}
      resources={resources}
      namespaces={["common"]}
    >
      <Register />
      <ToastContainer autoClose={3000} />
    </TranslationsProvider>
  );
};

export default layout;
