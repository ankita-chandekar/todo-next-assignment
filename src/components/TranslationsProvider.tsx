"use client";
import initTranslations from "@/app/i18n";
import { createInstance } from "i18next";
import { I18nextProvider } from "react-i18next";

import React, { ReactNode } from "react";
import type { Resource } from "i18next";

interface TranslationsProvider {
  children: ReactNode;
  locale: string;
  namespaces: string[];
  resources?: Resource;
}

const TranslationsProvider = ({
  children,
  locale,
  namespaces,
  resources,
}: TranslationsProvider) => {
  const i18n = createInstance();
  initTranslations(locale, namespaces, i18n, resources);
  return <I18nextProvider i18n={i18n}>{children}</I18nextProvider>;
};

export default TranslationsProvider;
