import en from "./en";
import zh from "./zh";

const translations = { en, zh };

export const getTranslations = (lang = "en") => {
  return translations[lang] || translations.en;
};

export const availableLanguages = [
  { code: "en", name: "English" },
  { code: "zh", name: "中文" },
];
