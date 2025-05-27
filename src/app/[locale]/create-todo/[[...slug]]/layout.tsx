import { ToastContainer } from "react-toastify";
import CreateTodo from "./page";

import initTranslations from "@/app/i18n";
import TranslationsProvider from "@/components/TranslationsProvider";
import { ReactNode } from "react";

type LayoutProps = {
  params: Promise<{ locale: string }>;
  children: ReactNode;
};

export default async function Layout({ children, params }: LayoutProps) {
  const { locale } = await params;
  const { resources } = await initTranslations(locale, ["common"]);

  return (
    <TranslationsProvider
      locale={locale}
      resources={resources}
      namespaces={["common"]}
    >
      <CreateTodo />
      {children}
      <ToastContainer autoClose={3000} />
    </TranslationsProvider>
  );
}
