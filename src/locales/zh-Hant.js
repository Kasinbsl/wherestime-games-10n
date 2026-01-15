// src/locales/zh-Hant.js (Traditional Chinese)
export default {
  // Game UI
  gameTitle: "10n",
  startGame: "開始遊戲",
  pauseGame: "暫停遊戲",
  deselectAll: "取消全選",
  help: "幫助",
  settings: "設置",
  home: "主頁",
  leaderboard: "最佳分數",
  language: "語言",

  // Game Info
  gridSize: "網格大小",
  speed: "速度",
  targetScore: "目標分數",
  cells: "個格子",
  perNumber: "每個數字",
  toWin: "獲勝",
  backgroundMusic: "背景音樂",
  backgroundMusicOn: "啟動",
  backgroundMusicOff: "關閉",
  backgroundMusicQuiet: "靜",
  backgroundMusicLoud: "吵",
  backgroundMusicDescription: "遊戲過程中播放舒緩的背景音樂",

  // Messages
  clickToStart: "點擊開始遊戲！",
  gameStarted: "遊戲開始！選擇總和為10的倍數的格子！",
  gamePaused: "遊戲已暫停！✋ 進度已保存。點擊開始繼續！",
  gameResumed: "遊戲繼續！選擇總和為10的倍數的格子！",
  deselectMessage: "已取消所有選擇。",
  settingsDuringGame: "遊戲進行中無法更改設置。請先完成或重新開始。",
  pointsEarned: "分！漂亮連擊！🎯",

  // Win/Lose messages
  greatJob: "太棒了！關卡完成！🏆 點擊開始再玩一次！",
  niceTry: "你的努力值得欣賞！🔄 點擊開始再試一次！",
  progress: "進度",

  // Settings Dialog
  gameSettings: "遊戲設置",
  newNumberSpeed: "新數字速度",
  controlsHowFast: "控制新數字出現在棋盤上的速度",
  fastest: "最快",
  slowest: "最慢",
  sizeOfBoard: "棋盤大小（影響難度）",
  scoreNeeded: "完成關卡需要的分數",
  easy: "簡單",
  hard: "困難",
  cancel: "取消",
  saveChanges: "保存更改",

  // Help Dialog
  helpInstructions: "10n 遊戲 - 幫助與說明",
  howToPlay: "🎮 如何遊戲",
  howToPlay1: "1. <strong>點擊數字</strong>選擇它們",
  howToPlay2: "2. <strong>再次點擊</strong>取消選擇",
  howToPlay3: "3. <strong>清除選擇的數字</strong>當它們的總和是10的倍數時",
  howToPlay4: "4. <strong>獲得分數</strong>等於清除的總和",
  howToPlay5: "5. <strong>避免棋盤填滿</strong>在達到目標分數之前",
  scoringExamples: "📊 計分示例",
  example1:
    "• 選擇 <strong>1, 2, 7</strong> → 總和 = 10 → <strong>+10 分</strong>",
  example2:
    "• 選擇 <strong>7, 7, 7, 9</strong> → 總和 = 30 → <strong>+30 分</strong>",
  example3:
    "• 選擇 <strong>5, 5</strong> → 總和 = 10 → <strong>+10 分</strong>",
  example4:
    "• 選擇 <strong>9, 8, 3</strong> → 總和 = 20 → <strong>+20 分</strong>",
  winLoseConditions: "🏆 勝負條件",
  winCondition: "✅ <strong>勝利：</strong>在棋盤填滿前達到目標分數",
  loseCondition: "❌ <strong>失敗：</strong>棋盤完全被數字填滿",
  pauseCondition: "⏸️ <strong>暫停：</strong>遊戲可以隨時暫停和繼續",
  gameSettingsTitle: "⚙️ 遊戲設置",
  customizeGame: "開始前，自定義你的遊戲：",
  gridSizeOption: "• <strong>網格大小：</strong>4×4、5×5 或 6×6（影響難度）",
  speedOption: "• <strong>速度：</strong>新數字出現的速度（0.3秒 - 1.5秒）",
  targetOption: "• <strong>目標分數：</strong>獲勝需要的分數（200 - 10,000）",
  tipsStrategies: "💡 技巧與策略",
  tip1: "• 尋找總和為10、20、30等的組合",
  tip2: "• 盡早清除數字為新的數字騰出空間",
  tip3: "• 如果選錯了，使用取消全選按鈕",
  tip4: "• 從簡單設置開始，逐漸增加挑戰",
  tip5: "• 棋盤越滿遊戲越難！",
  gotIt: "明白了！",

  // Congratulations Dialog
  youWin: "🎉 你贏了！🎉",
  newRecord: "🏆 新紀錄！",
  yourScore: "你的分數",
  xTarget: "倍目標",
  previous: "之前",
  current: "現在",
  firstTimeMessage: "🥇 首次使用這些設置！",
  improvedBy: "提高了",
  points: "分",
  tipMessage: "💡 嘗試更小的網格、更快的速度或更高的目標分數以獲得更多挑戰！",
  close: "關閉",
  playAgain: "再玩一次",

  // Failed Dialog
  boardFull: "棋盤已滿！",
  youReached: "你達到了",
  of: "/",
  soClose: "太接近了！你差點就贏了！",
  goodEffort: "不錯的嘗試！試試不同的策略。",
  notBad: "不差！繼續練習。",
  dontGiveUp: "別放棄！每次遊戲都讓你變得更好。",
  quickTips: "💡 快速提示：",
  tipClear: "• 盡早清除數字騰出空間",
  tipCombinations: "• 尋找總和為10、20、30...的組合",
  tipAdjust: "• 如果太難，嘗試更大的網格或更慢的速度",
  tryAgain: "🔄 再試一次",
  changeSettings: "⚙️ 更改設置",

  // Best Scores Dialog
  bestScores: "最佳分數",
  records: "條記錄",
  noScoresYet: "暫無分數",
  playSomeGames: "玩一些遊戲來查看你的最佳分數！",
  grid: "網格",
  best: "最佳",
  highestScore: "最高分數",
  avgScore: "平均分數",
  scoresSaved: "分數保存在你的瀏覽器本地，並與特定的網格大小和速度組合關聯。",
  clearAllScores: "清除所有分數",
  clearAllConfirm: "清除所有分數？",
  clearConfirmMessage: "這將永久刪除你所有的最佳分數，此操作無法撤銷。",

  // Ad section
  adSpace: "廣告位",
  leaderboardAd: "728 × 90 (通欄)",

  // Add these keys to each locale file
  selectLanguage: "選擇語言",
  seconds: "秒",
  points: "分",
  grid: "網格",
  target: "目標",
};
