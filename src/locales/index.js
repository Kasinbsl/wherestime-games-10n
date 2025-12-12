// src/locales/index.js - Update to export translation utilities
import en from "./en";
import zhHans from "./zh-Hans";
import zhHant from "./zh-Hant";

const translations = {
  en,
  "zh-Hans": zhHans,
  "zh-Hant": zhHant,
};

export const getTranslations = (lang = "en") => {
  return translations[lang] || translations.en;
};

export const t = (lang, key) => {
  const translations = getTranslations(lang);
  return translations[key] || key;
};

export const availableLanguages = [
  { code: "en", name: "English", nativeName: "English" },
  { code: "zh-Hans", name: "简体中文", nativeName: "简体中文" },
  { code: "zh-Hant", name: "繁體中文", nativeName: "繁體中文" },
];

// Helper to detect browser language
export const detectBrowserLanguage = () => {
  const browserLang = navigator.language || navigator.userLanguage;

  if (browserLang.startsWith("zh")) {
    if (browserLang.includes("CN") || browserLang.includes("SG")) {
      return "zh-Hans";
    }
    if (
      browserLang.includes("TW") ||
      browserLang.includes("HK") ||
      browserLang.includes("MO")
    ) {
      return "zh-Hant";
    }
    return "zh-Hans";
  }

  return "en";
};

// Save language preference to localStorage
export const saveLanguagePreference = (lang) => {
  try {
    localStorage.setItem("10n_language", lang);
  } catch (error) {
    console.error("Error saving language preference:", error);
  }
};

// Load language preference from localStorage
export const loadLanguagePreference = () => {
  try {
    const savedLang = localStorage.getItem("10n_language");
    if (savedLang && translations[savedLang]) {
      return savedLang;
    }
    return detectBrowserLanguage();
  } catch (error) {
    console.error("Error loading language preference:", error);
    return "en";
  }
};

// Export a hook for components
export const useTranslations = (lang) => {
  return getTranslations(lang);
};
