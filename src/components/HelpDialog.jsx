import React from "react";
import { getTranslations } from "../locales";
import "./HelpDialog.css";

const HelpDialog = ({ isOpen, onClose, language = "en" }) => {
  const t = getTranslations(language);

  if (!isOpen) return null;

  return (
    <div className="help-dialog-overlay" onClick={onClose}>
      <div className="help-dialog" onClick={(e) => e.stopPropagation()}>
        {/* Dialog Header */}
        <div className="help-dialog-header">
          <h2 className="help-dialog-title">{t.helpInstructions}</h2>
          <button className="help-dialog-close-btn" onClick={onClose}>
            <svg className="close-icon" viewBox="0 0 24 24" fill="currentColor">
              <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
            </svg>
          </button>
        </div>

        {/* Dialog Content */}
        <div className="help-dialog-content">
          <div className="help-section">
            <h3 className="help-section-title">{t.howToPlay}</h3>
            <div className="help-section-content">
              <p dangerouslySetInnerHTML={{ __html: t.howToPlay1 }} />
              <p dangerouslySetInnerHTML={{ __html: t.howToPlay2 }} />
              <p dangerouslySetInnerHTML={{ __html: t.howToPlay3 }} />
              <p dangerouslySetInnerHTML={{ __html: t.howToPlay4 }} />
              <p dangerouslySetInnerHTML={{ __html: t.howToPlay5 }} />
            </div>
          </div>

          <div className="help-section">
            <h3 className="help-section-title">{t.scoringExamples}</h3>
            <div className="help-section-content">
              <p dangerouslySetInnerHTML={{ __html: t.example1 }} />
              <p dangerouslySetInnerHTML={{ __html: t.example2 }} />
              <p dangerouslySetInnerHTML={{ __html: t.example3 }} />
              <p dangerouslySetInnerHTML={{ __html: t.example4 }} />
            </div>
          </div>

          <div className="help-section">
            <h3 className="help-section-title">{t.winLoseConditions}</h3>
            <div className="help-section-content">
              <p dangerouslySetInnerHTML={{ __html: t.winCondition }} />
              <p dangerouslySetInnerHTML={{ __html: t.loseCondition }} />
              <p dangerouslySetInnerHTML={{ __html: t.pauseCondition }} />
            </div>
          </div>

          <div className="help-section">
            <h3 className="help-section-title">{t.gameSettingsTitle}</h3>
            <div className="help-section-content">
              <p>{t.customizeGame}</p>
              <p dangerouslySetInnerHTML={{ __html: t.gridSizeOption }} />
              <p dangerouslySetInnerHTML={{ __html: t.speedOption }} />
              <p dangerouslySetInnerHTML={{ __html: t.targetOption }} />
            </div>
          </div>

          <div className="help-section">
            <h3 className="help-section-title">{t.tipsStrategies}</h3>
            <div className="help-section-content">
              <p>{t.tip1}</p>
              <p>{t.tip2}</p>
              <p>{t.tip3}</p>
              <p>{t.tip4}</p>
              <p>{t.tip5}</p>
            </div>
          </div>
        </div>

        {/* Dialog Footer */}
        <div className="help-dialog-footer">
          <button
            className="help-dialog-btn help-dialog-btn-close"
            onClick={onClose}
          >
            {t.gotIt}
          </button>
        </div>
      </div>
    </div>
  );
};

export default HelpDialog;
