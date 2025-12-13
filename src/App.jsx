import React, { useState, useEffect, useRef, useCallback } from "react";
import SettingsDialog from "./components/SettingsDialog";
import HelpDialog from "./components/HelpDialog";
import CongratulationsDialog from "./components/CongratulationsDialog";
import FailedLevelDialog from "./components/FailedLevelDialog";
import BestScoresDialog from "./components/BestScoresDialog";

import {
  getTranslations,
  availableLanguages,
  loadLanguagePreference,
  saveLanguagePreference,
} from "./locales";
import LanguageSelector from "./components/LanguageSelector";

import "./App.css";

// Import button images
const PlayIcon = () => (
  <svg className="button-icon" viewBox="0 0 24 24" fill="currentColor">
    <path d="M8 5v14l11-7z" />
  </svg>
);

const DeselectIcon = () => (
  <svg className="button-icon" viewBox="0 0 24 24" fill="currentColor">
    <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
  </svg>
);

const PauseIcon = () => (
  <svg className="button-icon" viewBox="0 0 24 24" fill="currentColor">
    <rect x="6" y="4" width="4" height="16" />
    <rect x="14" y="4" width="4" height="16" />
  </svg>
);

const SettingsIcon = () => (
  <svg className="button-icon" viewBox="0 0 24 24" fill="currentColor">
    <path d="M19.14 12.94c.04-.3.06-.61.06-.94 0-.32-.02-.64-.07-.94l2.03-1.58c.18-.14.23-.41.12-.61l-1.92-3.32c-.12-.22-.37-.29-.59-.22l-2.39.96c-.5-.38-1.03-.7-1.62-.94l-.36-2.54c-.04-.24-.24-.41-.48-.41h-3.84c-.24 0-.43.17-.47.41l-.36 2.54c-.59.24-1.13.57-1.62.94l-2.39-.96c-.22-.08-.47 0-.59.22L2.74 8.87c-.12.21-.08.47.12.61l2.03 1.58c-.05.3-.09.63-.09.94s.02.64.07.94l-2.03 1.58c-.18.14-.23.41-.12.61l1.92 3.32c.12.22.37.29.59.22l2.39-.96c.5.38 1.03.7 1.62.94l.36 2.54c.05.24.24.41.48.41h3.84c.24 0 .44-.17.47-.41l.36-2.54c.59-.24 1.13-.56 1.62-.94l2.39.96c.22.08.47 0 .59-.22l1.92-3.32c.12-.22.07-.47-.12-.61l-2.01-1.58zM12 15.6c-1.98 0-3.6-1.62-3.6-3.6s1.62-3.6 3.6-3.6 3.6 1.62 3.6 3.6-1.62 3.6-3.6 3.6z" />
  </svg>
);

const HelpIcon = () => (
  <svg className="button-icon" viewBox="0 0 24 24" fill="currentColor">
    <path d="M11 18h2v-2h-2v2zm1-16C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm0-14c-2.21 0-4 1.79-4 4h2c0-1.1.9-2 2-2s2 .9 2 2c0 2-3 1.75-3 5h2c0-2.25 3-2.5 3-5 0-2.21-1.79-4-4-4z" />
  </svg>
);

const HomeIcon = () => (
  <svg className="button-icon" viewBox="0 0 24 24" fill="currentColor">
    <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
  </svg>
);

const LeaderboardIcon = () => (
  <svg className="button-icon" viewBox="0 0 24 24" fill="currentColor">
    <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-4 10h-2v2h2v-2zm-4 0H9v2h2v-2zm4-4h-2v2h2V9zm-4 0H9v2h2V9zm8 8H7v-2h10v2zm0-6h-2v2h2v-2zm0-4h-2v2h2V7z" />
  </svg>
);

const LanguageIcon = () => (
  <svg className="button-icon" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12.87 15.07l-2.54-2.51.03-.03c1.74-1.94 2.98-4.17 3.71-6.53H17V4h-7V2H8v2H1v1.99h11.17C11.5 7.92 10.44 9.75 9 11.35 8.07 10.32 7.3 9.19 6.69 8h-2c.73 1.63 1.73 3.17 2.98 4.56l-5.09 5.02L4 19l5-5 3.11 3.11.76-2.04zM18.5 10h-2L12 22h2l1.12-3h4.75L21 22h2l-4.5-12zm-2.62 7l1.62-4.33L19.12 17h-3.24z" />
  </svg>
);

// In App.jsx, add these SVG icons near the other icon definitions:

// Add these SVG icons after the existing ones:
const MenuIcon = () => (
  <svg className="button-icon" viewBox="0 0 24 24" fill="currentColor">
    <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z" />
  </svg>
);

const CloseMenuIcon = () => (
  <svg className="button-icon" viewBox="0 0 24 24" fill="currentColor">
    <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
  </svg>
);

function App() {
  // Game state
  const [gameStarted, setGameStarted] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [gameWon, setGameWon] = useState(false);
  const [gamePaused, setGamePaused] = useState(false);
  const [currentScore, setCurrentScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);
  const [gridCells, setGridCells] = useState([]);
  const [selectedCells, setSelectedCells] = useState(new Set());
  // const [gameMessage, setGameMessage] = useState("Click Start to begin!");
  const [messageKey, setMessageKey] = useState("clickToStart");
  const [messageData, setMessageData] = useState({});
  //
  const [cellFontSize, setCellFontSize] = useState("24px");
  const [gridDimensions, setGridDimensions] = useState({ width: 0, height: 0 });
  const [viewportHeight, setViewportHeight] = useState(0);
  const [adHeight, setAdHeight] = useState(90);
  const [showSettings, setShowSettings] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  // Update the initial gameSettings to load from localStorage
  const [gameSettings, setGameSettings] = useState(() => {
    // Load from localStorage or use defaults
    const savedSettings = localStorage.getItem("10n_last_game_settings");
    if (savedSettings) {
      try {
        return JSON.parse(savedSettings);
      } catch (error) {
        console.error("Error parsing saved settings:", error);
      }
    }
    // Default settings
    return {
      gameSpeed: 1000, // Default: 1 second
      targetScore: 200, // Default target
      gridSize: 6, // Default grid size
    };
  });

  const [showHelp, setShowHelp] = useState(false);
  const [showCongratulations, setShowCongratulations] = useState(false);
  const [showFailedDialog, setShowFailedDialog] = useState(false);
  const [showBestScores, setShowBestScores] = useState(false);
  // Add language state
  const [showLanguageSelector, setShowLanguageSelector] = useState(false);
  const [language, setLanguage] = useState(() => loadLanguagePreference());
  //
  const t = getTranslations(language);

  // Refs
  const section1Ref = useRef(null);
  const section2Ref = useRef(null);
  const gameContentRef = useRef(null);
  const gridContainerRef = useRef(null);
  const gameIntervalRef = useRef(null);
  const resizeObserverRef = useRef(null);

  // Calculate font size as 80% of cell height
  const calculateFontSize = useCallback(() => {
    if (!gridContainerRef.current) return;

    const gridContainer = gridContainerRef.current;
    const gridHeight = gridContainer.clientHeight;

    if (gridHeight <= 0) return;

    // Calculate cell height and font size (80% of cell height)
    const cellHeight = gridHeight / gameSettings.gridSize;
    const fontSize = cellHeight * 0.7; // adjust fontSize

    setCellFontSize(`${fontSize}px`);
  }, [gameSettings.gridSize]);

  // Set up ResizeObserver for grid container
  useEffect(() => {
    if (!gridContainerRef.current) return;

    // Clean up previous observer
    if (resizeObserverRef.current) {
      resizeObserverRef.current.disconnect();
    }

    // Create and attach new observer
    resizeObserverRef.current = new ResizeObserver(() => {
      calculateFontSize();
    });

    resizeObserverRef.current.observe(gridContainerRef.current);

    // Initial calculation
    setTimeout(calculateFontSize, 100);

    // Cleanup
    return () => {
      if (resizeObserverRef.current) {
        resizeObserverRef.current.disconnect();
      }
    };
  }, [calculateFontSize]);

  // Update viewport height and ad height
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      setViewportHeight(window.innerHeight);

      if (width <= 480) {
        setAdHeight(70);
      } else if (width <= 768) {
        setAdHeight(80);
      } else {
        setAdHeight(90);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Calculate section heights
  useEffect(() => {
    if (viewportHeight > 0) {
      const totalFixedHeight = adHeight;
      const availableHeight = viewportHeight - totalFixedHeight;
      const section1Height = availableHeight * 0.2;
      const section2Height = availableHeight * 0.8;

      if (section1Ref.current) {
        section1Ref.current.style.height = `${section1Height}px`;
      }
      if (section2Ref.current) {
        section2Ref.current.style.height = `${section2Height}px`;
      }
    }
  }, [viewportHeight, adHeight]);

  // Update grid dimensions
  useEffect(() => {
    const updateGridDimensions = () => {
      if (gameContentRef.current && section2Ref.current) {
        const section2 = section2Ref.current;
        const containerWidth = section2.clientWidth;
        const gameContentHeight = gameContentRef.current.clientHeight;
        const section2Height = section2.clientHeight;

        if (gameContentHeight > section2Height * 0.9) {
          const scaleFactor = (section2Height * 0.9) / gameContentHeight;
          const maxWidth = containerWidth * 0.9 * scaleFactor;
          const maxHeight = section2Height * 0.7 * scaleFactor;
          const size = Math.min(maxWidth, maxHeight);

          setGridDimensions({
            width: size,
            height: size,
          });
        } else {
          const maxWidth = containerWidth * 0.9;
          const maxHeight = section2Height * 0.7;
          const size = Math.min(maxWidth, maxHeight);

          setGridDimensions({
            width: size,
            height: size,
          });
        }
      }
    };

    updateGridDimensions();
    window.addEventListener("resize", updateGridDimensions);
    return () => window.removeEventListener("resize", updateGridDimensions);
  }, [gameSettings.gridSize]);

  // Initialize grid
  useEffect(() => {
    const size = gameSettings.gridSize;
    const cells = [];

    for (let i = 0; i < size * size; i++) {
      cells.push({
        id: i,
        value: null,
        active: false,
      });
    }

    setGridCells(cells);
    setSelectedCells(new Set());
    //
    setMessageKey("clickToStart");
    setMessageData({});
    //
    setGamePaused(false);
  }, [gameSettings.gridSize]);

  // Game timer
  useEffect(() => {
    if (gameStarted && !gameOver && !gameWon && !gamePaused) {
      gameIntervalRef.current = setInterval(() => {
        setGridCells((prevCells) => {
          const emptyCells = prevCells.filter((cell) => cell.value === null);
          if (emptyCells.length === 0) return prevCells;

          const randomCellIndex = Math.floor(Math.random() * emptyCells.length);
          const randomCell = emptyCells[randomCellIndex];
          const randomNumber = Math.floor(Math.random() * 9) + 1;

          return prevCells.map((cell) => {
            if (cell.id === randomCell.id) {
              return { ...cell, value: randomNumber };
            }
            return cell;
          });
        });
      }, gameSettings.gameSpeed);

      return () => {
        if (gameIntervalRef.current) {
          clearInterval(gameIntervalRef.current);
        }
      };
    }
  }, [gameStarted, gameOver, gameWon, gamePaused, gameSettings.gameSpeed]);

  // Check win/lose conditions
  useEffect(() => {
    if (!gameStarted || gamePaused) return;

    if (currentScore >= gameSettings.targetScore) {
      setGameStarted(false);
      setGamePaused(false);
      setGameWon(true);
      setGameOver(true);
      //
      setMessageKey("greatJob");
      setMessageData({});

      if (gameIntervalRef.current) {
        clearInterval(gameIntervalRef.current);
      }

      // Show congratulations dialog after a short delay
      setTimeout(() => {
        setShowCongratulations(true);
      }, 500);

      return;
    }

    const allCellsFilled = gridCells.every((cell) => cell.value !== null);
    if (allCellsFilled) {
      setGameStarted(false);
      setGamePaused(false);
      setGameOver(true);
      //
      setMessageKey("niceTry");
      setMessageData({});
      //
      setShowFailedDialog(true); // Show the new dialog
      //
      if (gameIntervalRef.current) {
        clearInterval(gameIntervalRef.current);
      }
      return;
    }

    const progress = Math.min(
      100,
      Math.floor((currentScore / gameSettings.targetScore) * 100)
    );
    //
    setMessageKey("progress");
    setMessageData({});
  }, [
    currentScore,
    gameSettings.targetScore,
    gridCells,
    gameStarted,
    gamePaused,
  ]);

  // Save settings to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem(
      "10n_last_game_settings",
      JSON.stringify(gameSettings)
    );
  }, [gameSettings]);

  // Cell click handler
  const handleCellClick = (id) => {
    if (!gameStarted || gameOver || gameWon || gamePaused) return;

    const cell = gridCells.find((cell) => cell.id === id);
    if (!cell || cell.value === null) return;

    const newSelectedCells = new Set(selectedCells);
    if (newSelectedCells.has(id)) {
      newSelectedCells.delete(id);
    } else {
      newSelectedCells.add(id);
    }

    setSelectedCells(newSelectedCells);

    // Check for sum of 10
    let sum = 0;
    Array.from(newSelectedCells).forEach((id) => {
      const cell = gridCells.find((cell) => cell.id === id);
      if (cell && cell.value !== null) {
        sum += cell.value;
      }
    });

    if (sum > 0 && sum % 10 === 0) {
      const updatedCells = gridCells.map((cell) => {
        if (newSelectedCells.has(cell.id)) {
          return { ...cell, value: null, active: false };
        }
        return cell;
      });

      setGridCells(updatedCells);
      setSelectedCells(new Set());
      setCurrentScore((prev) => {
        const newScore = prev + sum;
        if (newScore > bestScore) {
          setBestScore(newScore);
        }
        return newScore;
      });

      setMessageKey("pointsEarned");
      setMessageData({ points: sum });
    }
  };

  const handleStartGame = () => {
    if (gameIntervalRef.current) {
      clearInterval(gameIntervalRef.current);
    }

    if (gamePaused) {
      setGamePaused(false);
      setGameOver(false);
      setGameStarted(true);
      //
      setMessageKey("gameResumed");
      setMessageData({});
      //
    } else {
      const size = gameSettings.gridSize;
      const newCells = [];

      for (let i = 0; i < size * size; i++) {
        newCells.push({
          id: i,
          value: null,
          active: false,
        });
      }

      setGridCells(newCells);
      setGameStarted(true);
      setGameOver(false);
      setGameWon(false);
      setGamePaused(false);
      setCurrentScore(0);
      setSelectedCells(new Set());

      //
      setMessageKey("gameStarted");
      setMessageData({});
    }
  };

  const handleDeselectAll = () => {
    setSelectedCells(new Set());
    //
    setMessageKey("deselectMessage");
    setMessageData({});
  };

  const handlePauseGame = () => {
    if (gameIntervalRef.current) {
      clearInterval(gameIntervalRef.current);
    }

    setGamePaused(true);
    setGameOver(false);
    setGameStarted(true);

    //
    setMessageKey("gamePaused");
    setMessageData({});
  };

  const isPauseEnabled = gameStarted && !gameOver && !gameWon && !gamePaused;

  const isGameRunning = gameStarted || gamePaused;

  // Settings handlers
  const handleOpenSettings = () => {
    if (isGameRunning) {
      setMessageKey("settingsDuringGame");
      setMessageData({});
      return;
    }
    setShowSettings(true);
  };

  const handleCloseSettings = () => {
    setShowSettings(false);
  };

  const handleSaveSettings = (newSettings) => {
    setGameSettings(newSettings);
    setShowSettings(false);
  };

  // Add a handler function for the Home button
  const handleHome = () => {
    // Open website in new tab
    window.open("https://wherestime.com", "_blank", "noopener,noreferrer");
  };

  const handleHelp = () => {
    setShowHelp(true);
  };

  const handleCloseHelp = () => {
    setShowHelp(false);
  };

  // Add handler functions for congratulation dialog
  const handleCloseCongratulations = () => {
    setShowCongratulations(false);
  };

  const handleNewGame = () => {
    setShowCongratulations(false);
    // Reset game state
    const size = gameSettings.gridSize;
    const newCells = [];
    for (let i = 0; i < size * size; i++) {
      newCells.push({
        id: i,
        value: null,
        active: false,
      });
    }
    setGridCells(newCells);
    setGameStarted(false);
    setGameOver(false);
    setGameWon(false);
    setGamePaused(false);
    setCurrentScore(0);
    setSelectedCells(new Set());
    //
    setMessageKey("clickToStart");
    setMessageData({});
  };

  // Add handler for best scores button
  const handleBestScores = () => {
    setShowBestScores(true);
  };

  // Add handlers
  const handleRetryGame = () => {
    setShowFailedDialog(false);
    handleStartGame();
  };

  const handleFailedSettings = () => {
    setShowFailedDialog(false);
    handleOpenSettings();
  };

  const handleLanguageChange = (newLanguage) => {
    setLanguage(newLanguage);
    saveLanguagePreference(newLanguage);
  };

  //
  // Helper function to get the actual message text
  const getGameMessage = () => {
    const t = getTranslations(language);

    switch (messageKey) {
      case "progress": {
        const progress = Math.min(
          100,
          Math.floor((currentScore / gameSettings.targetScore) * 100)
        );
        return `${t.progress}: ${progress}% (${currentScore}/${gameSettings.targetScore})`;
      }

      case "pointsEarned": {
        const points = messageData.points || 0;
        return `+${points} ${t.pointsEarned}`;
      }

      default:
        return t[messageKey] || messageKey;
    }
  };

  return (
    <div className="app">
      <header className="game-header" ref={section1Ref}>
        <div className="header-top-row">
          <h1 className="game-title">10n</h1>

          <div className="game-info">
            <div className="info-panel">
              <div className="info-content">
                <span className="info-label">{t.gridSize}</span>
                <div className="grid-size-display">
                  {gameSettings.gridSize} × {gameSettings.gridSize}
                </div>
                <span className="grid-size-text">
                  {gameSettings.gridSize * gameSettings.gridSize} {t.cells}
                </span>
              </div>
            </div>

            <div className="info-panel">
              <div className="info-content">
                <span className="info-label">{t.speed}</span>
                <div className="speed-display">
                  {(gameSettings.gameSpeed / 1000).toFixed(2)}s
                </div>
                <span className="speed-text">{t.perNumber}</span>
              </div>
            </div>

            <div className="info-panel">
              <div className="info-content">
                <span className="info-label">{t.targetScore}</span>
                <div className="target-score-display">
                  {gameSettings.targetScore}
                </div>
                <span className="target-text">{t.toWin}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Update the header-controls-row section in the App.jsx: */}
        <div className="header-controls-row">
          <div className="controls-wrapper">
            {/* Home button - left aligned */}
            <div className="left-controls">
              <button
                className="control-btn home-btn"
                onClick={handleHome}
                disabled={isGameRunning}
                title={t.home}
              >
                <HomeIcon />
              </button>
            </div>

            {/* Game controls - centered */}
            <div className="game-controls">
              <button
                className={`control-btn start-btn ${
                  gameStarted && !gameOver && !gamePaused ? "active" : ""
                }`}
                onClick={handleStartGame}
                disabled={gameStarted && !gameOver && !gamePaused}
                title={gamePaused ? t.gameResumed : t.startGame}
              >
                <PlayIcon />
              </button>

              <button
                className="control-btn deselect-btn"
                onClick={handleDeselectAll}
                disabled={
                  !gameStarted ||
                  gameOver ||
                  gamePaused ||
                  selectedCells.size === 0
                }
                title={t.deselectAll}
              >
                <DeselectIcon />
              </button>

              <button
                className="control-btn pause-btn"
                onClick={handlePauseGame}
                disabled={!isPauseEnabled}
                title={t.pauseGame}
              >
                <PauseIcon />
              </button>
            </div>

            {/* Utility controls - right aligned */}
            <div className="utility-controls">
              {/* Mobile menu button - only shown on small screens */}
              <button
                className="control-btn menu-btn mobile-only"
                onClick={() => setShowMobileMenu(!showMobileMenu)}
                title="Menu"
                disabled={isGameRunning}
              >
                {showMobileMenu ? <CloseMenuIcon /> : <MenuIcon />}
              </button>

              {/* Desktop buttons - hidden on mobile */}
              <button
                className="control-btn language-btn desktop-only"
                onClick={() => setShowLanguageSelector(true)}
                title={t.language}
                disabled={isGameRunning}
              >
                <LanguageIcon />
              </button>

              <button
                className="control-btn leaderboard-btn desktop-only"
                onClick={handleBestScores}
                title={t.leaderboard}
                disabled={isGameRunning}
              >
                <LeaderboardIcon />
              </button>

              <button
                className="control-btn help-btn desktop-only"
                onClick={handleHelp}
                title={t.help}
                disabled={isGameRunning}
              >
                <HelpIcon />
              </button>

              <button
                className="control-btn settings-btn desktop-only"
                onClick={handleOpenSettings}
                disabled={isGameRunning}
                title={t.settings}
              >
                <SettingsIcon />
              </button>
            </div>
            {/* above - end of Utility controls - right aligned */}
          </div>
        </div>

        {/* mobile menu overlay --- Start */}

        {showMobileMenu && (
          <div
            className="mobile-menu-overlay"
            onClick={() => setShowMobileMenu(false)}
          >
            <div className="mobile-menu" onClick={(e) => e.stopPropagation()}>
              <button
                className="mobile-menu-item"
                onClick={() => {
                  setShowMobileMenu(false);
                  setShowLanguageSelector(true);
                }}
              >
                <LanguageIcon />
                <span>{t.language}</span>
              </button>
              <button
                className="mobile-menu-item"
                onClick={() => {
                  setShowMobileMenu(false);
                  handleBestScores();
                }}
              >
                <LeaderboardIcon />
                <span>{t.leaderboard}</span>
              </button>
              <button
                className="mobile-menu-item"
                onClick={() => {
                  setShowMobileMenu(false);
                  handleHelp();
                }}
              >
                <HelpIcon />
                <span>{t.help}</span>
              </button>
              <button
                className="mobile-menu-item"
                onClick={() => {
                  setShowMobileMenu(false);
                  handleOpenSettings();
                }}
              >
                <SettingsIcon />
                <span>{t.settings}</span>
              </button>
            </div>
          </div>
        )}

        {/* mobile menu overlay --- end */}
      </header>

      <main className="game-board" ref={section2Ref}>
        <div className="board-container">
          <div className="game-content" ref={gameContentRef}>
            <div className="grid-wrapper">
              <div
                className="grid-container"
                ref={gridContainerRef}
                style={{
                  gridTemplateColumns: `repeat(${gameSettings.gridSize}, 1fr)`,
                  gridTemplateRows: `repeat(${gameSettings.gridSize}, 1fr)`,
                  width: `${gridDimensions.width}px`,
                  height: `${gridDimensions.height}px`,
                }}
              >
                {gridCells.map((cell) => (
                  <div
                    key={cell.id}
                    className={`grid-cell ${
                      cell.value === null ? "empty" : ""
                    } ${selectedCells.has(cell.id) ? "selected" : ""} ${
                      gameOver ? "game-over" : ""
                    } ${gameWon ? "game-won" : ""} ${
                      gamePaused ? "game-paused" : ""
                    }`}
                    onClick={() => handleCellClick(cell.id)}
                  >
                    {cell.value !== null && (
                      <span
                        className="cell-value"
                        style={{ fontSize: cellFontSize }}
                      >
                        {cell.value}
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div className="message-area">
              <div
                className={`game-message ${
                  gameOver || gameWon || gamePaused ? "highlight-message" : ""
                }`}
              >
                {getGameMessage()}
                {/* <br />
                {`game started: ${gameStarted}, game paused: ${gamePaused}, game won: ${gameWon}, gave over: ${gameOver}`} */}
              </div>
            </div>
          </div>
        </div>
      </main>

      <footer className="ad-section" style={{ height: `${adHeight}px` }}>
        <div className="ad-container">
          <div className="ad-placeholder">
            <span className="ad-label">Advertisement Space</span>
            <span className="ad-size">728 × 90 (Leaderboard)</span>
          </div>
        </div>
      </footer>

      {/* Settings Dialog */}
      <SettingsDialog
        isOpen={showSettings}
        onClose={handleCloseSettings}
        onSave={handleSaveSettings}
        initialSettings={gameSettings}
        language={language}
      />

      {/* Help Dialog */}
      <HelpDialog
        isOpen={showHelp}
        onClose={handleCloseHelp}
        language={language}
      />

      {/* Congratulations Dialog */}
      <CongratulationsDialog
        isOpen={showCongratulations}
        onClose={handleCloseCongratulations}
        onNewGame={handleNewGame}
        currentScore={currentScore}
        targetScore={gameSettings.targetScore}
        gridSize={gameSettings.gridSize}
        speed={gameSettings.gameSpeed}
        language={language}
      />

      {/* Best Score Dialog */}
      <BestScoresDialog
        isOpen={showBestScores}
        onClose={() => setShowBestScores(false)}
        language={language}
      />

      {/* Failed level dialog */}
      <FailedLevelDialog
        isOpen={showFailedDialog}
        onClose={() => setShowFailedDialog(false)}
        onRetry={handleRetryGame}
        onSettings={handleFailedSettings}
        currentScore={currentScore}
        targetScore={gameSettings.targetScore}
        gridSize={gameSettings.gridSize}
        speed={gameSettings.gameSpeed}
        language={language}
      />

      {/* Language Selector */}
      <LanguageSelector
        currentLanguage={language}
        onLanguageChange={handleLanguageChange}
        isOpen={showLanguageSelector}
        onClose={() => setShowLanguageSelector(false)}
      />

      {/* The last Div */}
    </div>
  );
}

export default App;
