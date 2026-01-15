// src/utils/soundManager.js
class SoundManager {
  constructor() {
    this.sounds = {};
    this.isMuted = false;
    this.volume = 0.5;

    // Load this from localStorage
    const savedSettings = localStorage.getItem("10n_sound_settings");
    if (savedSettings) {
      const settings = JSON.parse(savedSettings);
      this.isMuted = settings.muted || false;
      this.volume = settings.volume || 0.5;
    }
  }

  // Load a sound
  load(name, url) {
    this.sounds[name] = new Audio(url);
    this.sounds[name].volume = this.volume;
  }

  // Play a sound
  play(name) {
    if (this.isMuted || !this.sounds[name]) return;

    // Stop and reset if already playing
    if (!this.sounds[name].paused) {
      this.sounds[name].pause();
      this.sounds[name].currentTime = 0;
    }

    this.sounds[name].play().catch((e) => {
      console.log("Audio play failed:", e);
    });
  }

  // Toggle mute
  setMute(muteValue) {
    this.isMuted = muteValue;
    this.saveSettings();
    return this.isMuted;
  }

  // Set volume (0.0 to 1.0)
  setVolume(level) {
    this.volume = Math.max(0, Math.min(1, level));
    Object.values(this.sounds).forEach((sound) => {
      sound.volume = this.volume;
    });
    this.saveSettings();
  }

  // Save settings to localStorage
  saveSettings() {
    localStorage.setItem(
      "10n_sound_settings",
      JSON.stringify({
        muted: this.isMuted,
        volume: this.volume,
      })
    );
  }
}

// Create a singleton instance
export const soundManager = new SoundManager();
