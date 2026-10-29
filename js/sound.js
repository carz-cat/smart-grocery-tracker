/**
 * Smart Grocery & Budget Safety Tracker
 * Module: Sound (Synthesized UI Mini Sound Effects & Cat Audio Aesthetics via Web Audio API)
 * "Midnight Ocean Blue & Black Cat" audio experience:
 * - Cute kitten meow (frequency modulated formant sweep)
 * - Soothing cat purr (amplitude modulated low-frequency purr)
 * - Cheerful checklist chime
 * - Fanfare welcome login
 * - Budget alert / deficit warning
 * Zero external audio latency, 100% offline capable.
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

  // Lazy initialize AudioContext on user interaction to comply with browser autoplay policies
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
      this.playCatMeow();
    }
    return this.enabled;
  }

  isEnabled() {
    return this.enabled;
  }

  // ==========================================================================
  // CAT THEMED SYNTHESIZED SOUND EFFECTS (Web Audio API)
  // ==========================================================================

  /**
   * 1. Adorable kitten meow (Short, cute, non-annoying formant sweep)
   * Formant trajectory: ~440Hz -> 840Hz -> 520Hz with bandpass resonance
   */
  playCatMeow() {
    if (!this.enabled) return;
    this.initAudio();
    if (!this.audioCtx) return;

    try {
      const now = this.audioCtx.currentTime;
      const osc = this.audioCtx.createOscillator();
      const gain = this.audioCtx.createGain();
      const filter = this.audioCtx.createBiquadFilter();

      osc.type = 'triangle';
      filter.type = 'bandpass';
      filter.Q.setValueAtTime(3.5, now);

      // Meow pitch contour: rise from 450Hz -> 840Hz ("me-"), then glide down to 520Hz ("-ow")
      osc.frequency.setValueAtTime(450, now);
      osc.frequency.exponentialRampToValueAtTime(840, now + 0.09);
      osc.frequency.exponentialRampToValueAtTime(520, now + 0.26);

      // Vowel vocal filter frequency sweep
      filter.frequency.setValueAtTime(750, now);
      filter.frequency.exponentialRampToValueAtTime(1600, now + 0.09);
      filter.frequency.exponentialRampToValueAtTime(650, now + 0.26);

      // Amplitude envelope
      gain.gain.setValueAtTime(0.001, now);
      gain.gain.linearRampToValueAtTime(0.20, now + 0.04);
      gain.gain.setValueAtTime(0.20, now + 0.12);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.26);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(this.audioCtx.destination);

      osc.start(now);
      osc.stop(now + 0.26);
    } catch (_) {}
  }

  /**
   * 2. Soothing cat purr (Warm amplitude modulation ~26Hz)
   */
  playCatPurr() {
    if (!this.enabled) return;
    this.initAudio();
    if (!this.audioCtx) return;

    try {
      const now = this.audioCtx.currentTime;
      const carrier = this.audioCtx.createOscillator();
      const modulator = this.audioCtx.createOscillator();
      const modGain = this.audioCtx.createGain();
      const masterGain = this.audioCtx.createGain();

      carrier.type = 'sine';
      carrier.frequency.setValueAtTime(120, now);

      modulator.type = 'sine';
      modulator.frequency.setValueAtTime(26, now); // ~26Hz cat purring rhythm

      modGain.gain.setValueAtTime(45, now);
      modulator.connect(modGain);
      modGain.connect(carrier.frequency);

      masterGain.gain.setValueAtTime(0.001, now);
      masterGain.gain.linearRampToValueAtTime(0.18, now + 0.05);
      masterGain.gain.exponentialRampToValueAtTime(0.001, now + 0.32);

      carrier.connect(masterGain);
      masterGain.connect(this.audioCtx.destination);

      carrier.start(now);
      modulator.start(now);
      carrier.stop(now + 0.32);
      modulator.stop(now + 0.32);
    } catch (_) {}
  }

  /**
   * 3. Cheerful checklist chime (When checking off an item in Rencana Belanja)
   */
  playChecklistChime() {
    if (!this.enabled) return;
    this.initAudio();
    if (!this.audioCtx) return;

    try {
      const now = this.audioCtx.currentTime;
      const osc = this.audioCtx.createOscillator();
      const gain = this.audioCtx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(659.25, now); // E5
      osc.frequency.exponentialRampToValueAtTime(987.77, now + 0.07); // B5

      gain.gain.setValueAtTime(0.16, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.15);

      osc.connect(gain);
      gain.connect(this.audioCtx.destination);

      osc.start(now);
      osc.stop(now + 0.15);
    } catch (_) {}
  }

  /**
   * 4. Celebratory Login Welcome Fanfare ("Selamat Anda telah login!")
   */
  playLoginWelcome() {
    if (!this.enabled) return;
    this.initAudio();
    if (!this.audioCtx) return;

    try {
      const now = this.audioCtx.currentTime;
      const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
      const duration = 0.08;

      notes.forEach((freq, idx) => {
        const noteStart = now + idx * duration;
        const osc = this.audioCtx.createOscillator();
        const gain = this.audioCtx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, noteStart);

        gain.gain.setValueAtTime(0.15, noteStart);
        gain.gain.exponentialRampToValueAtTime(0.001, noteStart + duration * 1.6);

        osc.connect(gain);
        gain.connect(this.audioCtx.destination);

        osc.start(noteStart);
        osc.stop(noteStart + duration * 1.6);
      });

      // Sweet kitten meow at the end of fanfare
      setTimeout(() => this.playCatMeow(), 360);

      // Friendly speech announcement if supported by browser
      if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        try {
          const utter = new SpeechSynthesisUtterance('Selamat, Anda telah masuk ke Tala!');
          utter.lang = 'id-ID';
          utter.rate = 1.05;
          utter.pitch = 1.25;
          setTimeout(() => window.speechSynthesis.speak(utter), 420);
        } catch (_) {}
      }
    } catch (_) {}
  }

  /**
   * 5. Celebratory Firecracker Pops (Efek suara petasan ringan pendek saat selesai belanja & simpan struk)
   */
  playFirecrackerCelebration() {
    if (!this.enabled) return;
    this.initAudio();
    if (!this.audioCtx) return;

    try {
      const now = this.audioCtx.currentTime;
      // Sequence of rapid crackles / mini-pops
      const popTimes = [0, 0.06, 0.11, 0.16, 0.22, 0.28];
      const frequencies = [950, 1280, 840, 1420, 1100, 1600];

      popTimes.forEach((delay, i) => {
        const t = now + delay;
        const osc = this.audioCtx.createOscillator();
        const gain = this.audioCtx.createGain();

        osc.type = i % 2 === 0 ? 'triangle' : 'square';
        osc.frequency.setValueAtTime(frequencies[i], t);
        osc.frequency.exponentialRampToValueAtTime(140, t + 0.045);

        gain.gain.setValueAtTime(0.20, t);
        gain.gain.exponentialRampToValueAtTime(0.001, t + 0.045);

        osc.connect(gain);
        gain.connect(this.audioCtx.destination);

        osc.start(t);
        osc.stop(t + 0.045);
      });
    } catch (_) {}
  }

  /**
   * 6. Two-Tone Warning Siren ("ni-nu ni-nu" alert saat kondisi over budget)
   */
  playSirenAlarm() {
    if (!this.enabled) return;
    this.initAudio();
    if (!this.audioCtx) return;

    try {
      const now = this.audioCtx.currentTime;
      const tones = [
        { f: 880, start: 0, dur: 0.15 },
        { f: 659.25, start: 0.16, dur: 0.15 },
        { f: 880, start: 0.32, dur: 0.15 },
        { f: 659.25, start: 0.48, dur: 0.18 }
      ];

      tones.forEach(tone => {
        const t = now + tone.start;
        const osc = this.audioCtx.createOscillator();
        const gain = this.audioCtx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(tone.f, t);

        gain.gain.setValueAtTime(0.01, t);
        gain.gain.linearRampToValueAtTime(0.20, t + 0.02);
        gain.gain.setValueAtTime(0.20, t + tone.dur - 0.02);
        gain.gain.exponentialRampToValueAtTime(0.001, t + tone.dur);

        osc.connect(gain);
        gain.connect(this.audioCtx.destination);

        osc.start(t);
        osc.stop(t + tone.dur);
      });
    } catch (_) {}
  }

  /**
   * 7. Budget Deficit / Warning Alarm (Cat Caution alert when approaching budget)
   */
  playBudgetAlarm() {
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
        osc.frequency.setValueAtTime(700, pulseStart);
        osc.frequency.exponentialRampToValueAtTime(300, pulseStart + 0.10);

        gain.gain.setValueAtTime(0.18, pulseStart);
        gain.gain.exponentialRampToValueAtTime(0.001, pulseStart + 0.10);

        osc.connect(gain);
        gain.connect(this.audioCtx.destination);

        osc.start(pulseStart);
        osc.stop(pulseStart + 0.10);
      });
    } catch (_) {}
  }

  // ==========================================================================
  // STANDARD TACTILE MINI SOUND EFFECTS (Backward Compatibility)
  // ==========================================================================

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

  playAdd() {
    // Primary item addition uses cute kitten meow
    this.playCatMeow();
  }

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

      gain.gain.setValueAtTime(0.14, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.12);

      osc.connect(gain);
      gain.connect(this.audioCtx.destination);

      osc.start(now);
      osc.stop(now + 0.12);
    } catch (_) {}
  }

  playSuccess() {
    this.playChime();
  }

  playWarning() {
    this.playBudgetAlarm();
  }
}

export const soundMgr = new SoundManager();
