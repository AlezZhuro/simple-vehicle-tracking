import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import languageDetectorPlugin from "../utils/languageDetectorPlugin";
import { config } from "./app.config";


i18n
  .use(initReactI18next)
  .use(languageDetectorPlugin)
  .init({
    ...config.i18n ,
    compatibilityJSON: "v3",
    interpolation: {
      escapeValue: false,
    },
    react: {
      useSuspense: false,
    },
  });

export default i18n;
