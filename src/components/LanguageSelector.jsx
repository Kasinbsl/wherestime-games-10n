import React from "react";
import "./LanguageSelector.css";
import { availableLanguages, getTranslations } from "../locales";

const LanguageSelector = ({
  currentLanguage,
  onLanguageChange,
  isOpen,
  onClose,
  language = "en",
}) => {
  const t = getTranslations(language);

  if (!isOpen) return null;

  const handleLanguageSelect = (langCode) => {
    onLanguageChange(langCode);
    onClose();
  };

  return (
    <div className="language-selector-overlay" onClick={onClose}>
      <div
        className="language-selector-dialog"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="language-selector-header">
          <h3 className="language-selector-title">
            🌍 {t.selectLanguage || "Select Language"}
          </h3>
          <button className="language-selector-close-btn" onClick={onClose}>
            <svg className="close-icon" viewBox="0 0 24 24" fill="currentColor">
              <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
            </svg>
          </button>
        </div>

        <div className="language-selector-content">
          {availableLanguages.map((lang) => (
            <button
              key={lang.code}
              className={`language-option ${
                currentLanguage === lang.code ? "selected" : ""
              }`}
              onClick={() => handleLanguageSelect(lang.code)}
            >
              <span className="language-name">{lang.name}</span>
              <span className="language-native">{lang.nativeName}</span>
              {currentLanguage === lang.code && (
                <span className="checkmark">✓</span>
              )}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LanguageSelector;
