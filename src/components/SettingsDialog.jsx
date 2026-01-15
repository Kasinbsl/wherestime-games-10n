// src/components/SettingsDialog.jsx
import React, { useState, useEffect } from "react";
import { getTranslations } from "../locales";
import "./SettingsDialog.css";

const SettingsDialog = ({
  isOpen,
  onClose,
  onSave,
  initialSettings = {},
  language = "en",
}) => {
  const t = getTranslations(language);

  const [settings, setSettings] = useState({
    gridSize: 6,
    gameSpeed: 1000,
    targetScore: 200,
    musicEnabled: true, // Add this
    musicVolume: 0.3, // Add this (30% volume)
  });

  // Initialize with provided settings
  useEffect(() => {
    if (isOpen && initialSettings) {
      setSettings({
        gridSize: initialSettings.gridSize || 6,
        gameSpeed: initialSettings.gameSpeed || 1000,
        targetScore: initialSettings.targetScore || 200,
        musicEnabled: initialSettings.musicEnabled !== false,
        musicVolume: initialSettings.musicVolume || 0.3,
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
          <h2 className="settings-dialog-title">{t.gameSettings}</h2>
          <button className="settings-dialog-close-btn" onClick={onClose}>
            <svg className="close-icon" viewBox="0 0 24 24" fill="currentColor">
              <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
            </svg>
          </button>
        </div>

        {/* Dialog Content */}
        <div className="settings-dialog-content">
          {/* Grid Size Setting */}
          <div className="setting-group">
            <div className="setting-header">
              <h3 className="setting-title">{t.gridSize}</h3>
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

            <div className="setting-description">{t.sizeOfBoard}</div>
          </div>

          {/* Game Speed Setting */}
          <div className="setting-group">
            <div className="setting-header">
              <h3 className="setting-title">{t.newNumberSpeed}</h3>
              <div className="setting-value-display">
                {formatSpeed(settings.gameSpeed)} {t.seconds}
              </div>
            </div>

            <div className="slider-container">
              <div className="slider-labels">
                <span className="slider-label">
                  {t.fastest} (0.30{t.seconds})
                </span>
                <span className="slider-label">
                  {t.slowest} (1.50{t.seconds})
                </span>
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
                      {(tick / 1000).toFixed(1)}
                      {t.seconds}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="setting-description">{t.controlsHowFast}</div>
          </div>

          {/* Target Score Setting */}
          <div className="setting-group">
            <div className="setting-header">
              <h3 className="setting-title">{t.targetScore}</h3>
              <div className="setting-value-display">
                {settings.targetScore} {t.points}
              </div>
            </div>

            <div className="slider-container">
              <div className="slider-labels">
                <span className="slider-label">{t.easy} (200)</span>
                <span className="slider-label">{t.hard} (10,000)</span>
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

            <div className="setting-description">{t.scoreNeeded}</div>
          </div>

          {/* Background Music Setting */}
          <div className="setting-group">
            <div className="setting-header">
              <h3 className="setting-title">{t.backgroundMusic}</h3>
              <div className="setting-value-display">
                {settings.musicEnabled
                  ? t.backgroundMusicOn
                  : t.backgroundMusicOff}
              </div>
            </div>

            <div className="music-controls">
              <div className="music-toggle">
                <button
                  className="music-toggle-btn enabled"
                  onClick={() =>
                    setSettings((prev) => ({
                      ...prev,
                      musicEnabled: !prev.musicEnabled,
                    }))
                  }
                >
                  {settings.musicEnabled
                    ? "🔇 " + t.backgroundMusicOff
                    : "🎵 " + t.backgroundMusicOn}
                </button>
              </div>

              {settings.musicEnabled && (
                <div className="volume-control">
                  <div className="slider-labels">
                    <span className="slider-label">
                      {t.backgroundMusicQuiet}
                    </span>
                    <span className="slider-label">
                      {t.backgroundMusicLoud}
                    </span>
                  </div>

                  <input
                    type="range"
                    min="0"
                    max="100"
                    step="1"
                    value={settings.musicVolume * 100}
                    onChange={(e) =>
                      setSettings((prev) => ({
                        ...prev,
                        musicVolume: parseInt(e.target.value) / 100,
                      }))
                    }
                    className="volume-slider"
                    style={{ "--volume-percent": settings.musicVolume * 100 }}
                  />

                  <div className="volume-percentage">
                    {Math.round(settings.musicVolume * 100)}%
                  </div>
                </div>
              )}
            </div>

            <div className="setting-description">
              {t.backgroundMusicDescription}
            </div>
          </div>

          {/* end Div of Dialog Content */}
        </div>

        {/* Dialog Footer */}
        <div className="settings-dialog-footer">
          <button className="settings-btn settings-btn-close" onClick={onClose}>
            {t.cancel}
          </button>
          <button
            className="settings-btn settings-btn-save"
            onClick={handleSave}
          >
            {t.saveChanges}
          </button>
        </div>
      </div>
    </div>
  );
};

export default SettingsDialog;
