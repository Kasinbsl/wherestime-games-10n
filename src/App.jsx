import React, { useState, useEffect, useRef, useCallback } from "react";
import SettingsDialog from "./components/SettingsDialog";
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

function App() {
  // Game state
  const [gameStarted, setGameStarted] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [gameWon, setGameWon] = useState(false);
  const [gamePaused, setGamePaused] = useState(false);
  const [currentLevel, setCurrentLevel] = useState(1);
  const [currentScore, setCurrentScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);
  const [gridCells, setGridCells] = useState([]);
  const [selectedCells, setSelectedCells] = useState(new Set());
  const [gameMessage, setGameMessage] = useState("Click Start to begin!");
  const [cellFontSize, setCellFontSize] = useState("24px");
  const [gridDimensions, setGridDimensions] = useState({ width: 0, height: 0 });
  const [viewportHeight, setViewportHeight] = useState(0);
  const [adHeight, setAdHeight] = useState(90);
  const [showSettings, setShowSettings] = useState(false);
  const [gameSettings, setGameSettings] = useState({
    gameSpeed: 1000, // Default: 1 second
    targetScore: 500, // Default target
    gridSize: 6, // Default grid size
  });

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
    setGameMessage("Click Start to begin!");
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
      setGameWon(true);
      setGameOver(true);
      setGameMessage(
        "Great job! Level completed! 🏆 Click Start for next challenge!"
      );
      if (gameIntervalRef.current) {
        clearInterval(gameIntervalRef.current);
      }
      return;
    }

    const allCellsFilled = gridCells.every((cell) => cell.value !== null);
    if (allCellsFilled) {
      setGameOver(true);
      setGameMessage("Nice try! Board is full. 🔄 Click Start to try again!");
      if (gameIntervalRef.current) {
        clearInterval(gameIntervalRef.current);
      }
      return;
    }

    const progress = Math.min(
      100,
      Math.floor((currentScore / gameSettings.targetScore) * 100)
    );
    setGameMessage(
      `Progress: ${progress}% (${currentScore}/${gameSettings.targetScore})`
    );
  }, [
    currentScore,
    gameSettings.targetScore,
    gridCells,
    gameStarted,
    gamePaused,
  ]);

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

      setGameMessage(`+${sum} points! Great combo! 🎯`);
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
      setGameMessage("Game resumed! Select cells that sum to 10!");
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
      setGameMessage("Game started! Select cells that sum to 10!");
    }
  };

  const handleDeselectAll = () => {
    setSelectedCells(new Set());
    setGameMessage("All cells deselected.");
  };

  const handlePauseGame = () => {
    if (gameIntervalRef.current) {
      clearInterval(gameIntervalRef.current);
    }

    setGamePaused(true);
    setGameOver(true);
    setGameStarted(false);
    setGameMessage(
      "Game paused! ✋ Current progress saved. Click Start to continue!"
    );
  };

  const isPauseEnabled = gameStarted && !gameOver && !gameWon && !gamePaused;

  // Add these handler functions (inside the App function, before return)
  const handleOpenSettings = () => {
    setShowSettings(true);
  };

  const handleCloseSettings = () => {
    setShowSettings(false);
  };

  const handleSaveSettings = (newSettings) => {
    setGameSettings(newSettings);
    setShowSettings(false);
  };

  return (
    <div className="app">
      <header className="game-header" ref={section1Ref}>
        <div className="header-top-row">
          <h1 className="game-title">10n</h1>
          <div className="game-info">
            <div className="info-panel">
              <div className="info-content">
                <span className="info-label">Level</span>
                <div className="level-display">{currentLevel}</div>
                <span className="target-score">
                  Target: {gameSettings.targetScore}
                </span>
              </div>
            </div>
            <div className="info-panel">
              <div className="info-content">
                <span className="info-label">Score</span>
                <div className="score-display">{currentScore}</div>
                <span className="best-score">Best: {bestScore}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="header-controls-row">
          <div className="game-controls">
            <button
              className={`control-btn start-btn ${
                gameStarted && !gameOver && !gamePaused ? "active" : ""
              }`}
              onClick={handleStartGame}
              disabled={gameStarted && !gameOver && !gamePaused} // ADD THIS LINE
              title={gamePaused ? "Resume Game" : "Start Game"}
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
              title="Deselect All"
            >
              <DeselectIcon />
            </button>

            <button
              className="control-btn pause-btn"
              onClick={handlePauseGame}
              disabled={!isPauseEnabled}
              title="Pause Game"
            >
              <PauseIcon />
            </button>

            <button
              className="control-btn settings-btn"
              onClick={handleOpenSettings}
              disabled={isPauseEnabled} // Same as Start button: disabled when game is running
              title="Game Settings"
            >
              <SettingsIcon />
            </button>
          </div>
        </div>
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
                {gameMessage}
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

      {/* Add this at the end of your JSX, before the final closing </div> */}
      <SettingsDialog
        isOpen={showSettings}
        onClose={handleCloseSettings}
        onSave={handleSaveSettings}
        initialSettings={gameSettings}
      />
    </div>
  );
}

export default App;
