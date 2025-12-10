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

export const saveBestScore = (score, gridSize, speed) => {
  try {
    const bestScores = getBestScores();
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
      bestScores.push({ score, gridSize, speed, timestamp: Date.now() });
    }

    localStorage.setItem(STORAGE_KEY, JSON.stringify(bestScores));
    return bestScores;
  } catch (error) {
    console.error("Error saving best score:", error);
    return [];
  }
};

export const getBestScoreForSettings = (gridSize, speed) => {
  const bestScores = getBestScores();
  const match = bestScores.find(
    (item) => item.gridSize === gridSize && item.speed === speed
  );
  return match ? match.score : null;
};

export const clearBestScores = () => {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (error) {
    console.error("Error clearing best scores:", error);
  }
};
