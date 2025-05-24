"use client";
import React from "react";

const LanguageSwitcher = () => {
  return (
    <div className="absolute right-10 bottom-5">
      {/* <h2>{t("app_title")}</h2> */}
      {/* <select onChange={(e) => i18n.changeLanguage(e.target.value)}> */}
      <select>
        <option value="en">English</option>
        <option value="es">Español</option>
      </select>
      {/* </select>  */}
    </div>
  );
};

export default LanguageSwitcher;
