// src/components/FailedLevelDialog.jsx
import React, { useEffect } from "react";
import { getTranslations } from "../locales";
import "./FailedLevelDialog.css";

const FailedLevelDialog = ({
  isOpen,
  onClose,
  currentScore,
  targetScore,
  gridSize,
  speed,
  onRetry,
  onSettings,
  language = "en",
}) => {
  const t = getTranslations(language);

  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => {
        const dialog = document.querySelector(".failed-dialog");
        if (dialog) {
          dialog.classList.add("shake");
          setTimeout(() => dialog.classList.remove("shake"), 500);
        }
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const progressPercentage = Math.min(100, (currentScore / targetScore) * 100);
  const formattedSpeed = (speed / 1000).toFixed(2);

  const getEncouragement = () => {
    if (progressPercentage >= 80) return t.soClose;
    if (progressPercentage >= 60) return t.goodEffort;
    if (progressPercentage >= 40) return t.notBad;
    return t.dontGiveUp;
  };

  return (
    <div className="failed-dialog-overlay" onClick={onClose}>
      <div className="failed-dialog" onClick={(e) => e.stopPropagation()}>
        {/* Header with dramatic X icon */}
        <div className="failed-dialog-header">
          <div className="failed-icon-container">
            <div className="failed-icon">✗</div>
          </div>
          <h2 className="failed-dialog-title">{t.boardFull}</h2>
          <button className="failed-dialog-close-btn" onClick={onClose}>
            <svg className="close-icon" viewBox="0 0 24 24" fill="currentColor">
              <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="failed-dialog-content">
          {/* Progress display */}
          <div className="progress-display">
            <div className="progress-label">
              {t.youReached}{" "}
              <span className="score-highlight">{currentScore}</span> {t.of}{" "}
              <span className="target-highlight">{targetScore}</span>
            </div>
            <div className="progress-bar-container">
              <div
                className="progress-bar"
                style={{ width: `${progressPercentage}%` }}
              ></div>
            </div>
            <div className="progress-percentage">
              {progressPercentage.toFixed(0)}%
            </div>
          </div>

          {/* Encouragement message */}
          <div className="encouragement-message">
            <div className="encouragement-icon">💪</div>
            <p>{getEncouragement()}</p>
          </div>

          {/* Game settings summary */}
          <div className="settings-summary">
            <div className="setting-item">
              <span className="setting-label">{t.grid}:</span>
              <span className="setting-value">
                {gridSize}×{gridSize}
              </span>
            </div>
            <div className="setting-item">
              <span className="setting-label">{t.speed}:</span>
              <span className="setting-value">{formattedSpeed}s</span>
            </div>
            <div className="setting-item">
              <span className="setting-label">{t.target}:</span>
              <span className="setting-value">{targetScore}</span>
            </div>
          </div>

          {/* Tips section */}
          <div className="tips-section">
            <h3 className="tips-title">{t.quickTips}</h3>
            <ul className="tips-list">
              <li>{t.tipClear}</li>
              <li>{t.tipCombinations}</li>
              <li>{t.tipAdjust}</li>
            </ul>
          </div>
        </div>

        {/* Footer with action buttons */}
        <div className="failed-dialog-footer">
          <button className="failed-btn retry-btn" onClick={onRetry} autoFocus>
            {t.tryAgain}
          </button>
          <button className="failed-btn settings-btn" onClick={onSettings}>
            {t.changeSettings}
          </button>
        </div>
      </div>
    </div>
  );
};

export default FailedLevelDialog;
