export const launchConfetti = () => {
  const confettiCount = 150;
  const confetti = [];

  for (let i = 0; i < confettiCount; i++) {
    const confettiEl = document.createElement("div");
    confettiEl.className = "confetti";
    confettiEl.style.cssText = `
      position: fixed;
      width: 10px;
      height: 10px;
      background: hsl(${Math.random() * 360}, 100%, 60%);
      top: -20px;
      left: ${Math.random() * 100}vw;
      border-radius: ${Math.random() > 0.5 ? "50%" : "0"};
      z-index: 9999;
      pointer-events: none;
      animation: confetti-fall ${2 + Math.random() * 3}s linear forwards;
    `;

    document.body.appendChild(confettiEl);
    confetti.push(confettiEl);

    // Remove after animation
    setTimeout(() => confettiEl.remove(), 5000);
  }

  // Add CSS for animation
  if (!document.querySelector("#confetti-styles")) {
    const style = document.createElement("style");
    style.id = "confetti-styles";
    style.textContent = `
      @keyframes confetti-fall {
        0% {
          transform: translateY(0) rotate(0deg);
          opacity: 1;
        }
        100% {
          transform: translateY(100vh) rotate(${360 + Math.random() * 360}deg);
          opacity: 0;
        }
      }
    `;
    document.head.appendChild(style);
  }

  return confetti;
};
