import React, { useState, useEffect } from "react";
import "./SettingsDialog.css";

const SettingsDialog = ({ isOpen, onClose, onSave, initialSettings = {} }) => {
  const [settings, setSettings] = useState({
    gridSize: 6,
    gameSpeed: 1000,
    targetScore: 500,
  });

  // Initialize with provided settings
  useEffect(() => {
    if (isOpen && initialSettings) {
      setSettings({
        gridSize: initialSettings.gridSize || 6,
        gameSpeed: initialSettings.gameSpeed || 1000,
        targetScore: initialSettings.targetScore || 500,
      });
    }
  }, [isOpen, initialSettings]);

  if (!isOpen) return null;

  const handleGridSizeChange = (size) => {
    setSettings((prev) => ({ ...prev, gridSize: size }));
  };

  const handleSpeedChange = (e) => {
    const value = parseInt(e.target.value);
    setSettings((prev) => ({ ...prev, gameSpeed: value }));
  };

  const handleTargetScoreChange = (e) => {
    const value = parseInt(e.target.value);
    setSettings((prev) => ({ ...prev, targetScore: value }));
  };

  const handleSave = () => {
    onSave(settings);
  };

  // Format milliseconds to seconds with 2 decimal places
  const formatSpeed = (ms) => {
    return (ms / 1000).toFixed(2);
  };

  // Calculate percentage for speed slider (300ms to 1500ms)
  const speedPercentage = ((settings.gameSpeed - 300) / (1500 - 300)) * 100;

  // Calculate percentage for target score slider (200 to 10000)
  const targetPercentage = ((settings.targetScore - 200) / (10000 - 200)) * 100;

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

        {/* Dialog Content - REORDERED as requested */}
        <div className="settings-dialog-content">
          {/* 1. Grid Size Setting - FIRST as requested */}
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

          {/* 2. Game Speed Setting - SECOND as requested */}
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

          {/* 3. Target Score Setting - THIRD as requested with slider */}
          <div className="setting-group">
            <div className="setting-header">
              <h3 className="setting-title">Target Score</h3>
              <div className="setting-value-display">
                {settings.targetScore} points
              </div>
            </div>

            <div className="slider-container">
              <div className="slider-labels">
                <span className="slider-label">Easy (200)</span>
                <span className="slider-label">Hard (10,000)</span>
              </div>

              <input
                type="range"
                min="200"
                max="10000"
                step="100"
                value={settings.targetScore}
                onChange={handleTargetScoreChange}
                className="target-slider"
                style={{ "--slider-percent": `${targetPercentage}%` }}
              />

              <div className="slider-ticks">
                {[200, 2600, 5000, 7400, 10000].map((tick) => (
                  <div key={tick} className="slider-tick">
                    <div className="tick-line"></div>
                    <span className="tick-label">
                      {tick >= 1000 ? `${tick / 1000}k` : tick}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="setting-description">
              Score needed to complete the level
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
