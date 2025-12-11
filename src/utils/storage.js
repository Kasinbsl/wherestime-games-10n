// Utility for storing and retrieving best scores
const STORAGE_KEY = "10n_best_scores";

export const getBestScores = () => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.error("Error reading best scores:", error);
    return [];
  }
};

// Update the saveBestScore function to work with our new structure
export const saveBestScore = (score, gridSize, speed) => {
  try {
    // First, try to get existing best scores from localStorage
    let bestScores = [];
    const existingScores = localStorage.getItem(STORAGE_KEY);

    if (existingScores) {
      try {
        bestScores = JSON.parse(existingScores);
        // Ensure we have an array
        if (!Array.isArray(bestScores)) {
          bestScores = [];
        }
      } catch (error) {
        console.error("Error parsing existing scores:", error);
        bestScores = [];
      }
    }

    // Check if we already have a score for this gridSize and speed
    const existingIndex = bestScores.findIndex(
      (item) => item.gridSize === gridSize && item.speed === speed
    );

    if (existingIndex >= 0) {
      // Update if current score is higher
      if (score > bestScores[existingIndex].score) {
        bestScores[existingIndex] = {
          score,
          gridSize,
          speed,
          timestamp: Date.now(),
        };
      }
    } else {
      // Add new entry
      bestScores.push({
        score,
        gridSize,
        speed,
        timestamp: Date.now(),
      });
    }

    // Save back to localStorage
    localStorage.setItem(STORAGE_KEY, JSON.stringify(bestScores));
    return bestScores;
  } catch (error) {
    console.error("Error saving best score:", error);
    return [];
  }
};

// Update getBestScoreForSettings to match
export const getBestScoreForSettings = (gridSize, speed) => {
  try {
    const bestScores = getBestScores();
    const match = bestScores.find(
      (item) => item.gridSize === gridSize && item.speed === speed
    );
    return match ? match.score : null;
  } catch (error) {
    console.error("Error getting best score:", error);
    return null;
  }
};

export const clearBestScores = () => {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (error) {
    console.error("Error clearing best scores:", error);
  }
};
