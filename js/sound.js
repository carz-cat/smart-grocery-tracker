/**
 * Smart Grocery & Budget Safety Tracker
 * Module: Sound (Synthesized UI Mini Sound Effects via Web Audio API)
 * Zero external audio latency, 100% offline capable, high-tech tactile feel
 */

class SoundManager {
  constructor() {
    this.audioCtx = null;
    this.enabled = true;

    // Load sound preference from localStorage
    if (typeof localStorage !== 'undefined') {
      const saved = localStorage.getItem('sgt_sound_enabled');
      this.enabled = saved !== null ? saved === 'true' : true;
    }
  }

  // Lazy initialize AudioContext on user interaction to comply with autoplay policy
  initAudio() {
    if (!this.audioCtx && (typeof window !== 'undefined')) {
      const AudioContextClass = window.AudioContext || window.webkitAudioContext;
      if (AudioContextClass) {
        this.audioCtx = new AudioContextClass();
      }
    }
    if (this.audioCtx && this.audioCtx.state === 'suspended') {
      this.audioCtx.resume();
    }
  }

  // Toggle Mute / Unmute
  toggle() {
    this.enabled = !this.enabled;
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem('sgt_sound_enabled', String(this.enabled));
    }
    if (this.enabled) {
      this.playPop();
    }
    return this.enabled;
  }

  isEnabled() {
    return this.enabled;
  }

  // 1. Subtle tactile pop for general buttons, filter chips, store selector
  playPop() {
    if (!this.enabled) return;
    this.initAudio();
    if (!this.audioCtx) return;

    try {
      const now = this.audioCtx.currentTime;
      const osc = this.audioCtx.createOscillator();
      const gain = this.audioCtx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(540, now);
      osc.frequency.exponentialRampToValueAtTime(220, now + 0.05);

      gain.gain.setValueAtTime(0.12, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.05);

      osc.connect(gain);
      gain.connect(this.audioCtx.destination);

      osc.start(now);
      osc.stop(now + 0.05);
    } catch (_) {}
  }

  // 2. Cheerful two-tone chime when adding an item to the trolley
  playAdd() {
    if (!this.enabled) return;
    this.initAudio();
    if (!this.audioCtx) return;

    try {
      const now = this.audioCtx.currentTime;
      const osc = this.audioCtx.createOscillator();
      const gain = this.audioCtx.createGain();

      osc.type = 'triangle';
      // C5 (523Hz) to E5 (659Hz)
      osc.frequency.setValueAtTime(523.25, now);
      osc.frequency.setValueAtTime(659.25, now + 0.08);

      gain.gain.setValueAtTime(0.18, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.22);

      osc.connect(gain);
      gain.connect(this.audioCtx.destination);

      osc.start(now);
      osc.stop(now + 0.22);
    } catch (_) {}
  }

  // 3. Soft descending swipe when removing / deleting an item
  playDelete() {
    if (!this.enabled) return;
    this.initAudio();
    if (!this.audioCtx) return;

    try {
      const now = this.audioCtx.currentTime;
      const osc = this.audioCtx.createOscillator();
      const gain = this.audioCtx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(380, now);
      osc.frequency.exponentialRampToValueAtTime(130, now + 0.12);

      gain.gain.setValueAtTime(0.15, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.12);

      osc.connect(gain);
      gain.connect(this.audioCtx.destination);

      osc.start(now);
      osc.stop(now + 0.12);
    } catch (_) {}
  }

  // 4. Celebratory arpeggio on checkout / saving grocery receipt
  playSuccess() {
    if (!this.enabled) return;
    this.initAudio();
    if (!this.audioCtx) return;

    try {
      const now = this.audioCtx.currentTime;
      const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
      const duration = 0.09;

      notes.forEach((freq, index) => {
        const noteStart = now + index * duration;
        const osc = this.audioCtx.createOscillator();
        const gain = this.audioCtx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, noteStart);

        gain.gain.setValueAtTime(0.16, noteStart);
        gain.gain.exponentialRampToValueAtTime(0.001, noteStart + duration * 1.5);

        osc.connect(gain);
        gain.connect(this.audioCtx.destination);

        osc.start(noteStart);
        osc.stop(noteStart + duration * 1.5);
      });
    } catch (_) {}
  }

  // 5. Caution double-pulse for budget warning / danger threshold
  playWarning() {
    if (!this.enabled) return;
    this.initAudio();
    if (!this.audioCtx) return;

    try {
      const now = this.audioCtx.currentTime;
      [0, 0.12].forEach((offset) => {
        const pulseStart = now + offset;
        const osc = this.audioCtx.createOscillator();
        const gain = this.audioCtx.createGain();

        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(440, pulseStart);

        gain.gain.setValueAtTime(0.12, pulseStart);
        gain.gain.exponentialRampToValueAtTime(0.001, pulseStart + 0.08);

        osc.connect(gain);
        gain.connect(this.audioCtx.destination);

        osc.start(pulseStart);
        osc.stop(pulseStart + 0.08);
      });
    } catch (_) {}
  }
}

export const soundMgr = new SoundManager();

