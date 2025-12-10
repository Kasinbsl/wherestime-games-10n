import React from "react";
import "./HelpDialog.css";

const HelpDialog = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="help-dialog-overlay" onClick={onClose}>
      <div className="help-dialog" onClick={(e) => e.stopPropagation()}>
        {/* Dialog Header */}
        <div className="help-dialog-header">
          <h2 className="help-dialog-title">10n Game - Help & Instructions</h2>
          <button className="help-dialog-close-btn" onClick={onClose}>
            <svg className="close-icon" viewBox="0 0 24 24" fill="currentColor">
              <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
            </svg>
          </button>
        </div>

        {/* Dialog Content */}
        <div className="help-dialog-content">
          <div className="help-section">
            <h3 className="help-section-title">🎮 How to Play</h3>
            <div className="help-section-content">
              <p>
                1. <strong>Select numbers</strong> by clicking on them
              </p>
              <p>
                2. <strong>Deselect</strong> by clicking again
              </p>
              <p>
                3. <strong>Clear selected numbers</strong> when their sum is a
                multiple of 10
              </p>
              <p>
                4. <strong>Earn points</strong> equal to the sum cleared
              </p>
              <p>
                5. <strong>Avoid filling the board</strong> before reaching
                target score
              </p>
            </div>
          </div>

          <div className="help-section">
            <h3 className="help-section-title">📊 Scoring Examples</h3>
            <div className="help-section-content">
              <p>
                • Select <strong>1, 2, 7</strong> → Sum = 10 →{" "}
                <strong>+10 points</strong>
              </p>
              <p>
                • Select <strong>7, 7, 7, 9</strong> → Sum = 30 →{" "}
                <strong>+30 points</strong>
              </p>
              <p>
                • Select <strong>5, 5</strong> → Sum = 10 →{" "}
                <strong>+10 points</strong>
              </p>
              <p>
                • Select <strong>9, 8, 3</strong> → Sum = 20 →{" "}
                <strong>+20 points</strong>
              </p>
            </div>
          </div>

          <div className="help-section">
            <h3 className="help-section-title">🏆 Win & Lose Conditions</h3>
            <div className="help-section-content">
              <p>
                ✅ <strong>Win:</strong> Reach the target score before board
                fills up
              </p>
              <p>
                ❌ <strong>Lose:</strong> Board is completely filled with
                numbers
              </p>
              <p>
                ⏸️ <strong>Pause:</strong> Game can be paused and resumed
                anytime
              </p>
            </div>
          </div>

          <div className="help-section">
            <h3 className="help-section-title">⚙️ Game Settings</h3>
            <div className="help-section-content">
              <p>Before starting, customize your game:</p>
              <p>
                • <strong>Grid Size:</strong> 4×4, 5×5, or 6×6 (affects
                difficulty)
              </p>
              <p>
                • <strong>Speed:</strong> How fast new numbers appear (0.3s -
                1.5s)
              </p>
              <p>
                • <strong>Target Score:</strong> Points needed to win (200 -
                10,000)
              </p>
            </div>
          </div>

          <div className="help-section">
            <h3 className="help-section-title">💡 Tips & Strategies</h3>
            <div className="help-section-content">
              <p>• Look for combinations that sum to 10, 20, 30, etc.</p>
              <p>• Clear numbers early to make space for new ones</p>
              <p>• Use the Deselect All button if you make a mistake</p>
              <p>
                • Start with easier settings and increase challenge gradually
              </p>
              <p>• The game gets harder as the board fills up!</p>
            </div>
          </div>
        </div>

        {/* Dialog Footer */}
        <div className="help-dialog-footer">
          <button
            className="help-dialog-btn help-dialog-btn-close"
            onClick={onClose}
          >
            Got It!
          </button>
        </div>
      </div>
    </div>
  );
};

export default HelpDialog;
