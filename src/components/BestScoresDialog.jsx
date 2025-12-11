// src/components/BestScoresDialog.jsx
import React, { useState, useEffect } from "react";
import "./BestScoresDialog.css";

const BestScoresDialog = ({ isOpen, onClose }) => {
  const [bestScores, setBestScores] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showClearConfirm, setShowClearConfirm] = useState(false);

  // Load best scores from localStorage
  useEffect(() => {
    if (isOpen) {
      setLoading(true);
      try {
        const savedBestScores = localStorage.getItem("10n_best_scores");
        if (savedBestScores) {
          setBestScores(JSON.parse(savedBestScores));
        } else {
          setBestScores([]);
        }
      } catch (error) {
        console.error("Error loading best scores:", error);
        setBestScores([]);
      } finally {
        setLoading(false);
      }
    }
  }, [isOpen]);

  // Sort scores by gridSize and speed in increasing order
  const sortedScores = [...bestScores].sort((a, b) => {
    if (a.gridSize !== b.gridSize) {
      return a.gridSize - b.gridSize;
    }
    return a.speed - b.speed;
  });

  const formatSpeed = (speed) => {
    return (speed / 1000).toFixed(2) + "s";
  };

  const getScoreColor = (score) => {
    if (score >= 1000) return "score-high";
    if (score >= 500) return "score-medium";
    return "score-low";
  };

  const handleClearScores = () => {
    setShowClearConfirm(true);
  };

  const confirmClearScores = () => {
    localStorage.removeItem("10n_best_scores");
    setBestScores([]);
    setShowClearConfirm(false);
  };

  if (!isOpen) return null;

  return (
    <div className="best-scores-dialog-overlay" onClick={onClose}>
      <div
        className="best-scores-dialog compact"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Dialog Header - More Compact */}
        <div className="best-scores-dialog-header compact">
          <div className="header-content">
            <h2 className="best-scores-dialog-title compact">
              <span className="trophy-icon">🏆</span>
              Best Scores
            </h2>
            <div className="record-count">
              {sortedScores.length} record{sortedScores.length !== 1 ? "s" : ""}
            </div>
          </div>
          <button
            className="best-scores-dialog-close-btn compact"
            onClick={onClose}
          >
            <svg className="close-icon" viewBox="0 0 24 24" fill="currentColor">
              <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
            </svg>
          </button>
        </div>

        {/* Dialog Content - More Compact */}
        <div className="best-scores-dialog-content compact">
          {loading ? (
            <div className="loading-message compact">Loading scores...</div>
          ) : sortedScores.length === 0 ? (
            <div className="no-scores-message compact">
              <div className="empty-icon">📊</div>
              <h3>No scores yet</h3>
              <p>Play some games to see your best scores here!</p>
            </div>
          ) : (
            <div className="scores-table-container compact">
              <div className="table-header compact">
                <div className="header-cell">Grid Size</div>
                <div className="header-cell">Speed</div>
                <div className="header-cell text-right">Best Score</div>
              </div>
              <div className="table-body">
                {sortedScores.slice(0, 8).map((score, index) => (
                  <div
                    key={`${score.gridSize}-${score.speed}-${index}`}
                    className="table-row"
                  >
                    <div className="table-cell">
                      <span className="grid-size-badge compact">
                        {score.gridSize}×{score.gridSize}
                      </span>
                    </div>
                    <div className="table-cell">
                      <span className="speed-badge compact">
                        {formatSpeed(score.speed)}
                      </span>
                    </div>
                    <div className="table-cell text-right">
                      <span
                        className={`score-value compact ${getScoreColor(
                          score.score
                        )}`}
                      >
                        {score.score}
                        {score.score >= 1000 && (
                          <span className="star-icon">⭐</span>
                        )}
                      </span>
                    </div>
                  </div>
                ))}
                {sortedScores.length > 8 && (
                  <div className="more-scores-note">
                    +{sortedScores.length - 8} more records...
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Quick Stats - More Compact */}
          <div className="score-stats compact">
            <div className="stat-item">
              <div className="stat-label">Highest Score</div>
              <div className="stat-value">
                {sortedScores.length > 0
                  ? Math.max(...sortedScores.map((s) => s.score))
                  : 0}
              </div>
            </div>
            <div className="stat-item">
              <div className="stat-label">Avg. Score</div>
              <div className="stat-value">
                {sortedScores.length > 0
                  ? Math.round(
                      sortedScores.reduce((sum, s) => sum + s.score, 0) /
                        sortedScores.length
                    )
                  : 0}
              </div>
            </div>
          </div>

          {/* Clear Confirmation Modal */}
          {showClearConfirm && (
            <div
              className="clear-confirm-overlay"
              onClick={() => setShowClearConfirm(false)}
            >
              <div
                className="clear-confirm-dialog"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="confirm-icon">⚠️</div>
                <h3 className="confirm-title">Clear All Scores?</h3>
                <p className="confirm-message">
                  This will permanently delete all your best scores. This action
                  cannot be undone.
                </p>
                <div className="confirm-buttons">
                  <button
                    className="confirm-btn cancel-btn"
                    onClick={() => setShowClearConfirm(false)}
                  >
                    Cancel
                  </button>
                  <button
                    className="confirm-btn clear-confirm-btn"
                    onClick={confirmClearScores}
                  >
                    Clear All
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Dialog Footer - More Compact */}
        <div className="best-scores-dialog-footer compact">
          {sortedScores.length > 0 && (
            <button
              className="best-scores-btn clear-btn compact"
              onClick={handleClearScores}
            >
              Clear All Scores
            </button>
          )}
          <button
            className="best-scores-btn close-btn compact"
            onClick={onClose}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default BestScoresDialog;
