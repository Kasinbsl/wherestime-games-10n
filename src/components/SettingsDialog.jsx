// src/components/SettingsDialog.jsx
import React, { useState, useEffect } from "react";
import "./SettingsDialog.css";

const SettingsDialog = ({ isOpen, onClose, onSave, initialSettings = {} }) => {
  const [settings, setSettings] = useState({
    gameSpeed: 1000, // milliseconds between new numbers
    targetScore: 500, // target score
    gridSize: 6, // grid size (4, 5, or 6)
  });

  // Initialize with provided settings
  useEffect(() => {
    if (isOpen && initialSettings) {
      setSettings({
        gameSpeed: initialSettings.gameSpeed || 1000,
        targetScore: initialSettings.targetScore || 500,
        gridSize: initialSettings.gridSize || 6,
      });
    }
  }, [isOpen, initialSettings]);

  if (!isOpen) return null;

  const handleSpeedChange = (e) => {
    const value = parseInt(e.target.value);
    setSettings((prev) => ({ ...prev, gameSpeed: value }));
  };

  const handleTargetScoreChange = (e) => {
    let value = parseInt(e.target.value);
    // Ensure it's a multiple of 10
    if (value < 200) value = 200;
    value = Math.round(value / 10) * 10; // Round to nearest multiple of 10
    setSettings((prev) => ({ ...prev, targetScore: value }));
  };

  const handleGridSizeChange = (size) => {
    setSettings((prev) => ({ ...prev, gridSize: size }));
  };

  const handleSave = () => {
    onSave(settings);
  };

  // Format milliseconds to seconds with 2 decimal places
  const formatSpeed = (ms) => {
    return (ms / 1000).toFixed(2);
  };

  // Calculate percentage for slider (300ms to 1500ms)
  const speedPercentage = ((settings.gameSpeed - 300) / (1500 - 300)) * 100;

  return (
    <div className="settings-dialog-overlay" onClick={onClose}>
      <div className="settings-dialog" onClick={(e) => e.stopPropagation()}>
        {/* Dialog Header */}
        <div className="settings-dialog-header">
          <h2 className="settings-dialog-title">Game Settings</h2>
          <button className="settings-dialog-close-btn" onClick={onClose}>
            <svg className="close-icon" viewBox="0 0 24 24" fill="currentColor">
              <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
            </svg>
          </button>
        </div>

        {/* Dialog Content */}
        <div className="settings-dialog-content">
          {/* Game Speed Setting */}
          <div className="setting-group">
            <div className="setting-header">
              <h3 className="setting-title">New Number Speed</h3>
              <div className="setting-value-display">
                {formatSpeed(settings.gameSpeed)} seconds
              </div>
            </div>

            <div className="slider-container">
              <div className="slider-labels">
                <span className="slider-label">Fastest (0.30s)</span>
                <span className="slider-label">Slowest (1.50s)</span>
              </div>

              <input
                type="range"
                min="300"
                max="1500"
                step="20"
                value={settings.gameSpeed}
                onChange={handleSpeedChange}
                className="speed-slider"
                style={{ "--slider-percent": `${speedPercentage}%` }}
              />

              <div className="slider-ticks">
                {[300, 600, 900, 1200, 1500].map((tick) => (
                  <div key={tick} className="slider-tick">
                    <div className="tick-line"></div>
                    <span className="tick-label">
                      {(tick / 1000).toFixed(1)}s
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="setting-description">
              Controls how fast new numbers appear on the grid
            </div>
          </div>

          {/* Target Score Setting */}
          <div className="setting-group">
            <div className="setting-header">
              <h3 className="setting-title">Target Score</h3>
              <div className="setting-value-display">
                {settings.targetScore} points
              </div>
            </div>

            <div className="number-input-container">
              <div className="number-input-wrapper">
                <button
                  className="number-input-btn minus-btn"
                  onClick={() => {
                    const newValue = Math.max(200, settings.targetScore - 10);
                    setSettings((prev) => ({ ...prev, targetScore: newValue }));
                  }}
                  disabled={settings.targetScore <= 200}
                >
                  −
                </button>

                <input
                  type="number"
                  min="200"
                  step="10"
                  value={settings.targetScore}
                  onChange={handleTargetScoreChange}
                  className="target-score-input"
                />

                <button
                  className="number-input-btn plus-btn"
                  onClick={() => {
                    const newValue = settings.targetScore + 10;
                    setSettings((prev) => ({ ...prev, targetScore: newValue }));
                  }}
                >
                  +
                </button>
              </div>

              <div className="input-hint">
                Must be a multiple of 10 (min: 200)
              </div>
            </div>

            <div className="setting-description">
              Score needed to complete the level
            </div>
          </div>

          {/* Grid Size Setting */}
          <div className="setting-group">
            <div className="setting-header">
              <h3 className="setting-title">Grid Size</h3>
              <div className="setting-value-display">
                {settings.gridSize} × {settings.gridSize}
              </div>
            </div>

            <div className="grid-options">
              {[4, 5, 6].map((size) => (
                <button
                  key={size}
                  className={`grid-option ${
                    settings.gridSize === size ? "selected" : ""
                  }`}
                  onClick={() => handleGridSizeChange(size)}
                >
                  <div className="grid-option-size">
                    {size} × {size}
                  </div>
                  <div className="grid-option-cells">
                    {Array(size * size)
                      .fill(0)
                      .map((_, i) => (
                        <div key={i} className="grid-cell-preview"></div>
                      ))}
                  </div>
                </button>
              ))}
            </div>

            <div className="setting-description">
              Size of the game board (affects difficulty)
            </div>
          </div>
        </div>

        {/* Dialog Footer */}
        <div className="settings-dialog-footer">
          <button className="settings-btn settings-btn-close" onClick={onClose}>
            Cancel
          </button>
          <button
            className="settings-btn settings-btn-save"
            onClick={handleSave}
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default SettingsDialog;
