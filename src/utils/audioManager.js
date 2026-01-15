// src/utils/audioManager.js
class AudioManager {
  constructor() {
    this.backgroundMusic = null;
    this.isMusicEnabled = true;
    this.musicVolume = 0.3; // Keep it low - background music should be subtle
    this.isPlaying = false;
    this.loadSettings();
  }

  loadSettings() {
    try {
      const saved = localStorage.getItem("10n_audio_settings");
      if (saved) {
        const settings = JSON.parse(saved);
        this.isMusicEnabled = settings.musicEnabled || false;
        this.musicVolume = settings.musicVolume || 0.3;
      }
    } catch (error) {
      console.error("Error loading audio settings:", error);
    }
  }

  saveSettings() {
    try {
      localStorage.setItem(
        "10n_audio_settings",
        JSON.stringify({
          musicEnabled: this.isMusicEnabled,
          musicVolume: this.musicVolume,
        })
      );
    } catch (error) {
      console.error("Error saving audio settings:", error);
    }
  }

  // async initialize() --- begin

  // Even better: Use multiple <source> elements
  async initialize() {
    try {
      // Create audio element with multiple sources
      this.backgroundMusic = document.createElement("audio");
      this.backgroundMusic.loop = true;
      this.backgroundMusic.volume = this.musicVolume;
      this.backgroundMusic.preload = "auto";

      // Add OGG source (first choice)
      const sourceOgg = document.createElement("source");
      sourceOgg.src =
        "/games/10n/music/background-music-instrumental-207886.ogg";
      sourceOgg.type = 'audio/ogg; codecs="vorbis"';
      this.backgroundMusic.appendChild(sourceOgg);

      // Add MP3 fallback (for Safari)
      const sourceMp3 = document.createElement("source");
      sourceMp3.src =
        "/games/10n/music/background-music-instrumental-207886.mp3";
      sourceMp3.type = "audio/mp3";
      this.backgroundMusic.appendChild(sourceMp3);

      // Add error handling
      this.backgroundMusic.addEventListener("error", (e) => {
        console.error("Audio error:", e);
        // Try to load MP3 directly as last resort
        if (this.backgroundMusic.src !== sourceMp3.src) {
          this.backgroundMusic.src = sourceMp3.src;
          this.backgroundMusic.load();
        }
      });

      await this.backgroundMusic.load();
      // console.log("Audio initialized with multiple sources");
    } catch (error) {
      console.error("Failed to initialize background music:", error);
    }
  }

  // async initialize() --- end

  playBackgroundMusic() {
    if (!this.isMusicEnabled || !this.backgroundMusic || this.isPlaying) return;

    try {
      // Some browsers require user interaction first
      const playPromise = this.backgroundMusic.play();

      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            this.isPlaying = true;
            // console.log("Background music started");
          })
          .catch((error) => {
            console.log(
              "Autoplay prevented, will play on user interaction:",
              error
            );
            // Music will start on first user interaction
          });
      }
    } catch (error) {
      console.error("Error playing background music:", error);
    }
  }

  pauseBackgroundMusic() {
    if (!this.backgroundMusic || !this.isPlaying) return;

    try {
      this.backgroundMusic.pause();
      this.isPlaying = false;
    } catch (error) {
      console.error("Error pausing background music:", error);
    }
  }

  stopBackgroundMusic() {
    if (!this.backgroundMusic) return;

    try {
      this.backgroundMusic.pause();
      this.backgroundMusic.currentTime = 0;
      this.isPlaying = false;
    } catch (error) {
      console.error("Error stopping background music:", error);
    }
  }

  setMusicVolume(volume) {
    const newVolume = Math.max(0, Math.min(1, volume));
    this.musicVolume = newVolume;

    if (this.backgroundMusic) {
      this.backgroundMusic.volume = newVolume;
    }

    this.saveSettings();
  }

  toggleMusicEnabled() {
    this.isMusicEnabled = !this.isMusicEnabled;

    if (!this.isMusicEnabled) {
      this.pauseBackgroundMusic();
    } else if (this.isPlaying) {
      this.playBackgroundMusic();
    }

    this.saveSettings();
    return this.isMusicEnabled;
  }

  setMusicEnabled(enabled) {
    this.isMusicEnabled = enabled;

    if (!enabled) {
      this.pauseBackgroundMusic();
    }

    this.saveSettings();
  }

  // Handle browser autoplay policies
  handleUserInteraction() {
    // if (this.isMusicEnabled && !this.isPlaying) {
    //   this.playBackgroundMusic();
    // }
  }

  getSettings() {
    return {
      musicEnabled: this.isMusicEnabled,
      musicVolume: this.musicVolume,
    };
  }
}

// Create singleton instance
const audioManager = new AudioManager();

export { audioManager };
