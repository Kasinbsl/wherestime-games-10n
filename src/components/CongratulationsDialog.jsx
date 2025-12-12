// src/components/CongratulationsDialog.jsx
import React, { useEffect, useState } from "react";
import { saveBestScore, getBestScoreForSettings } from "../utils/storage";
import { launchConfetti } from "../utils/confetti";
import { getTranslations } from "../locales";
import "./CongratulationsDialog.css";

const CongratulationsDialog = ({
  isOpen,
  onClose,
  currentScore,
  targetScore,
  gridSize,
  speed,
  onNewGame,
  language = "en",
}) => {
  const t = getTranslations(language);
  const [bestScore, setBestScore] = useState(null);
  const [isNewRecord, setIsNewRecord] = useState(false);

  useEffect(() => {
    if (isOpen) {
      const previousBest = getBestScoreForSettings(gridSize, speed);
      setBestScore(previousBest);

      if (!previousBest || currentScore > previousBest) {
        setIsNewRecord(true);
        saveBestScore(currentScore, gridSize, speed);
      } else {
        setIsNewRecord(false);
      }
    }
  }, [isOpen, currentScore, gridSize, speed]);

  useEffect(() => {
    if (isOpen) {
      const timeout = setTimeout(() => {
        launchConfetti();
      }, 300);

      return () => clearTimeout(timeout);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const formattedSpeed = (speed / 1000).toFixed(2);
  const scoreRatio = (currentScore / targetScore).toFixed(1);

  const getPerformanceEmoji = () => {
    if (scoreRatio >= 1.5) return "🚀";
    if (scoreRatio >= 1.2) return "⭐";
    if (scoreRatio >= 1.0) return "👍";
    return "🎯";
  };

  const handlePlayAgain = () => {
    onClose();
    onNewGame();
  };

  return (
    <div className="congrats-dialog-overlay" onClick={onClose}>
      <div
        className="congrats-dialog compact"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Compact Header */}
        <div className="congrats-dialog-header compact">
          <div className="congrats-header-content">
            <h2 className="congrats-dialog-title">
              <span className="congrats-emoji">🎉</span>
              {t.youWin}
              <span className="congrats-emoji">🎉</span>
            </h2>
            {isNewRecord && (
              <div className="new-record-badge">{t.newRecord}</div>
            )}
          </div>
          <button className="congrats-dialog-close-btn" onClick={onClose}>
            <svg className="close-icon" viewBox="0 0 24 24" fill="currentColor">
              <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
            </svg>
          </button>
        </div>

        {/* Compact Content */}
        <div className="congrats-dialog-content compact">
          {/* Main Score Display */}
          <div className="main-score-display">
            <div className="score-container">
              <div className="score-label">{t.yourScore}</div>
              <div className="score-value">{currentScore}</div>
              <div className="score-multiplier">
                {getPerformanceEmoji()} {scoreRatio}
                {t.xTarget}
              </div>
            </div>
          </div>

          {/* Game Settings Summary */}
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

          {/* Best Score Comparison */}
          <div className="best-score-comparison compact">
            <h3 className="comparison-title">
              <span className="trophy-icon">🏆</span>
              {t.best}
            </h3>

            <div className="comparison-content">
              {bestScore ? (
                <div className="score-comparison-grid">
                  <div className="score-item">
                    <div className="score-type">{t.previous}</div>
                    <div className="score-amount previous">{bestScore}</div>
                  </div>

                  <div className="score-arrow">→</div>

                  <div className="score-item">
                    <div className="score-type">{t.current}</div>
                    <div
                      className={`score-amount current ${
                        isNewRecord ? "new-record" : ""
                      }`}
                    >
                      {currentScore}
                      {isNewRecord && <span className="up-arrow">↑</span>}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="first-time-message">{t.firstTimeMessage}</div>
              )}

              {isNewRecord && bestScore && (
                <div className="improvement-message">
                  {t.improvedBy}{" "}
                  <span className="improvement-amount">
                    +{currentScore - bestScore}
                  </span>{" "}
                  {t.points}!
                </div>
              )}
            </div>
          </div>

          {/* Quick Tip */}
          <div className="quick-tip">
            <span className="tip-icon">💡</span>
            {t.tipMessage}
          </div>
        </div>

        {/* Compact Footer */}
        <div className="congrats-dialog-footer compact">
          <button className="congrats-btn compact-btn" onClick={onClose}>
            {t.close}
          </button>
          <button
            className="congrats-btn compact-btn primary"
            onClick={handlePlayAgain}
          >
            {t.playAgain}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CongratulationsDialog;
