import React, { useState, useEffect, useRef } from "react";
import "./App.css";

// Import button images (you'll need to add these images to your project)
// For now, I'll use SVG icons as placeholders
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

function App() {
  // Game state
  const [gameStarted, setGameStarted] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [gameWon, setGameWon] = useState(false);
  const [gamePaused, setGamePaused] = useState(false);
  const [currentLevel, setCurrentLevel] = useState(1);
  const [currentScore, setCurrentScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);
  const [gridSize, setGridSize] = useState(6); // Start with 6x6
  const [targetScore, setTargetScore] = useState(500); // Level 1 target
  const [gridCells, setGridCells] = useState([]);
  const [selectedCells, setSelectedCells] = useState(new Set());
  const [gameMessage, setGameMessage] = useState("Click Start to begin!");

  // UI state
  const [viewportHeight, setViewportHeight] = useState(0);
  const [adHeight, setAdHeight] = useState(90); // Fixed height for ad section
  const section1Ref = useRef(null);
  const section2Ref = useRef(null);
  const gameContentRef = useRef(null);
  const [gridDimensions, setGridDimensions] = useState({ width: 0, height: 0 });

  // Game interval reference
  const gameIntervalRef = useRef(null);

  // Update viewport height and ad height on resize
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      setViewportHeight(window.innerHeight);

      // Set ad height based on screen width
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

  // Calculate heights based on proportional system
  useEffect(() => {
    if (viewportHeight > 0) {
      const totalFixedHeight = adHeight; // Only ad section is fixed
      const availableHeight = viewportHeight - totalFixedHeight; // For Section 1 + Section 2
      const section1Height = availableHeight * 0.2; // 20% of available
      const section2Height = availableHeight * 0.8; // 80% of available

      // Apply calculated heights
      if (section1Ref.current) {
        section1Ref.current.style.height = `${section1Height}px`;
      }
      if (section2Ref.current) {
        section2Ref.current.style.height = `${section2Height}px`;
      }
    }
  }, [viewportHeight, adHeight]);

  // Update grid dimensions - calculate based on available space for game content
  useEffect(() => {
    const updateGridDimensions = () => {
      if (gameContentRef.current && section2Ref.current) {
        const section2 = section2Ref.current;
        const containerWidth = section2.clientWidth;

        // Get the game content height (grid + message)
        const gameContentHeight = gameContentRef.current.clientHeight;
        const section2Height = section2.clientHeight;

        // If game content is taller than section 2, scale down
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
          // Otherwise, use normal calculation
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
  }, [gridSize]);

  // Initialize the game grid with empty cells
  useEffect(() => {
    const size = gridSize;
    const cells = [];

    for (let i = 0; i < size * size; i++) {
      cells.push({
        id: i,
        value: null, // Start with empty cells
        active: false,
      });
    }

    setGridCells(cells);
    setSelectedCells(new Set());
    setGameMessage("Click Start to begin!");
    setGamePaused(false);
  }, [gridSize]);

  // Game timer: Add a number to a random empty cell every second
  useEffect(() => {
    if (gameStarted && !gameOver && !gameWon && !gamePaused) {
      gameIntervalRef.current = setInterval(() => {
        addNumberToRandomCell();
      }, 1000);

      return () => {
        if (gameIntervalRef.current) {
          clearInterval(gameIntervalRef.current);
        }
      };
    }
  }, [gameStarted, gameOver, gameWon, gamePaused]);

  // Check for win/lose conditions
  useEffect(() => {
    if (!gameStarted || gamePaused) return;

    // Check if player won
    if (currentScore >= targetScore) {
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

    // Check if all cells are filled (game over)
    const allCellsFilled = gridCells.every((cell) => cell.value !== null);
    if (allCellsFilled) {
      setGameOver(true);
      setGameMessage("Nice try! Board is full. 🔄 Click Start to try again!");
      if (gameIntervalRef.current) {
        clearInterval(gameIntervalRef.current);
      }
      return;
    }

    // Update game message based on progress
    const progress = Math.min(
      100,
      Math.floor((currentScore / targetScore) * 100)
    );
    setGameMessage(`Progress: ${progress}% (${currentScore}/${targetScore})`);
  }, [currentScore, targetScore, gridCells, gameStarted, gamePaused]);

  // Add a random number (1-9) to a random empty cell
  const addNumberToRandomCell = () => {
    setGridCells((prevCells) => {
      const emptyCells = prevCells.filter((cell) => cell.value === null);
      if (emptyCells.length === 0) return prevCells;

      const randomCellIndex = Math.floor(Math.random() * emptyCells.length);
      const randomCell = emptyCells[randomCellIndex];
      const randomNumber = Math.floor(Math.random() * 9) + 1; // 1-9

      return prevCells.map((cell) => {
        if (cell.id === randomCell.id) {
          return { ...cell, value: randomNumber };
        }
        return cell;
      });
    });
  };

  // Handle cell click (select/deselect)
  const handleCellClick = (id) => {
    if (!gameStarted || gameOver || gameWon || gamePaused) return;

    const cell = gridCells.find((cell) => cell.id === id);
    if (!cell || cell.value === null) return; // Can't select empty cells

    const newSelectedCells = new Set(selectedCells);

    if (newSelectedCells.has(id)) {
      newSelectedCells.delete(id);
    } else {
      newSelectedCells.add(id);
    }

    setSelectedCells(newSelectedCells);
    checkForTenSum(newSelectedCells);
  };

  // Check if selected cells sum to a multiple of 10
  const checkForTenSum = (selectedSet) => {
    if (selectedSet.size === 0) return;

    let sum = 0;
    const selectedIds = Array.from(selectedSet);

    // Calculate sum of selected cells
    selectedIds.forEach((id) => {
      const cell = gridCells.find((cell) => cell.id === id);
      if (cell && cell.value !== null) {
        sum += cell.value;
      }
    });

    // Check if sum is a multiple of 10
    if (sum > 0 && sum % 10 === 0) {
      // Clear the selected cells and add to score
      const updatedCells = gridCells.map((cell) => {
        if (selectedSet.has(cell.id)) {
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

      // Show feedback message
      setGameMessage(`+${sum} points! Great combo! 🎯`);
    }
  };

  // Start the game - handles both new game and resuming from pause
  const handleStartGame = () => {
    // Clear any existing interval
    if (gameIntervalRef.current) {
      clearInterval(gameIntervalRef.current);
    }

    // If game was paused, resume it without resetting score
    if (gamePaused) {
      setGamePaused(false);
      setGameOver(false);
      setGameStarted(true);
      setGameMessage("Game resumed! Select cells that sum to 10!");
    } else {
      // Otherwise, start a new game
      // First, reset the grid immediately
      const size = gridSize;
      const newCells = [];

      for (let i = 0; i < size * size; i++) {
        newCells.push({
          id: i,
          value: null,
          active: false,
        });
      }

      // Set the empty grid first
      setGridCells(newCells);

      // Then update all other states
      setGameStarted(true);
      setGameOver(false);
      setGameWon(false);
      setGamePaused(false);
      setCurrentScore(0);
      setSelectedCells(new Set());
      setGameMessage("Game started! Select cells that sum to 10!");

      // The timer will start automatically via useEffect
      // It will add the first number after 1 second
    }
  };

  // Deselect all cells
  const handleDeselectAll = () => {
    setSelectedCells(new Set());
    setGameMessage("All cells deselected.");
  };

  // Pause the game - stop immediately, keep board state and score
  const handlePauseGame = () => {
    // Clear the game interval to stop number generation
    if (gameIntervalRef.current) {
      clearInterval(gameIntervalRef.current);
    }

    // Set pause state
    setGamePaused(true);
    setGameOver(true);
    setGameStarted(false);

    // Keep board and score as they are
    // Show pause message
    setGameMessage(
      "Game paused! ✋ Current progress saved. Click Start to continue!"
    );
  };

  // Determine if pause button should be enabled
  const isPauseEnabled = gameStarted && !gameOver && !gameWon && !gamePaused;

  return (
    <div className="app">
      {/* Section 1: Game Header (20% of available height) */}
      <header className="game-header" ref={section1Ref}>
        {/* Top Row: Title and Game Info */}
        <div className="header-top-row">
          <h1 className="game-title">10n</h1>
          <div className="game-info">
            <div className="info-panel">
              <div className="info-content">
                <span className="info-label">Level</span>
                <div className="level-display">{currentLevel}</div>
                <span className="target-score">Target: {targetScore}</span>
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

        {/* Bottom Row: Game Controls */}
        <div className="header-controls-row">
          <div className="game-controls">
            <button
              className={`control-btn start-btn ${
                gameStarted && !gameOver && !gamePaused ? "active" : ""
              }`}
              onClick={handleStartGame}
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
          </div>
        </div>
      </header>

      {/* Section 2: Game Board (80% of available height) */}
      <main className="game-board" ref={section2Ref}>
        <div className="board-container">
          {/* Game Content Container - grid + message centered together */}
          <div className="game-content" ref={gameContentRef}>
            {/* Game Grid */}
            <div className="grid-wrapper">
              <div
                className="grid-container"
                style={{
                  gridTemplateColumns: `repeat(${gridSize}, 1fr)`,
                  gridTemplateRows: `repeat(${gridSize}, 1fr)`,
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
                      <span className="cell-value">{cell.value}</span>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Message Area (directly below grid) */}
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

      {/* Section 3: Advertisement Section (Fixed height) */}
      <footer className="ad-section" style={{ height: `${adHeight}px` }}>
        <div className="ad-container">
          <div className="ad-placeholder">
            <span className="ad-label">Advertisement Space</span>
            <span className="ad-size">728 × 90 (Leaderboard)</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
