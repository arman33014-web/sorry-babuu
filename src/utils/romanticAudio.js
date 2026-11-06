// High quality Web Audio procedural Romantic Music Box & Sound FX
class RomanticAudio {
  constructor() {
    this.ctx = null;
    this.isPlaying = false;
    this.isMuted = false;
    this.timer = null;
    this.currentStep = 0;
    this.masterGain = null;

    // Romantic music box melody notes (frequencies in Hz)
    // Chords: Cmaj7 -> Am7 -> Fmaj7 -> Gadd9
    this.melody = [
      // Section A - Gentle Promise
      { note: 523.25, time: 0 },    // C5
      { note: 659.25, time: 0.5 },  // E5
      { note: 783.99, time: 1.0 },  // G5
      { note: 987.77, time: 1.5 },  // B5
      { note: 880.00, time: 2.0 },  // A5
      { note: 659.25, time: 2.5 },  // E5
      { note: 523.25, time: 3.0 },  // C5
      { note: 698.46, time: 3.5 },  // F5

      { note: 440.00, time: 4.0 },  // A4
      { note: 523.25, time: 4.5 },  // C5
      { note: 659.25, time: 5.0 },  // E5
      { note: 880.00, time: 5.5 },  // A5
      { note: 783.99, time: 6.0 },  // G5
      { note: 587.33, time: 6.5 },  // D5
      { note: 659.25, time: 7.0 },  // E5
      { note: 493.88, time: 7.5 },  // B4

      { note: 349.23, time: 8.0 },  // F4
      { note: 440.00, time: 8.5 },  // A4
      { note: 523.25, time: 9.0 },  // C5
      { note: 698.46, time: 9.5 },  // F5
      { note: 659.25, time: 10.0 }, // E5
      { note: 523.25, time: 10.5 }, // C5
      { note: 440.00, time: 11.0 }, // A4
      { note: 392.00, time: 11.5 }, // G4

      { note: 392.00, time: 12.0 }, // G4
      { note: 493.88, time: 12.5 }, // B4
      { note: 587.33, time: 13.0 }, // D5
      { note: 783.99, time: 13.5 }, // G5
      { note: 659.25, time: 14.0 }, // E5
      { note: 587.33, time: 14.5 }, // D5
      { note: 523.25, time: 15.0 }, // C5
      { note: 493.88, time: 15.5 }, // B4
    ];

    this.bassNotes = [
      { note: 130.81, time: 0 },    // C3
      { note: 110.00, time: 4.0 },  // A2
      { note: 87.31,  time: 8.0 },  // F2
      { note: 98.00,  time: 12.0 }, // G2
    ];
  }

  init() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      this.ctx = new AudioCtx();
      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.setValueAtTime(0.28, this.ctx.currentTime);
      this.masterGain.connect(this.ctx.destination);
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  playMusicBoxTone(freq, time, duration = 1.8, velocity = 0.5) {
    if (!this.ctx) return;
    const t = this.ctx.currentTime + time;

    // Dual oscillator for rich, warm chime harmonic like a Celesta / Music Box
    const osc1 = this.ctx.createOscillator();
    const osc2 = this.ctx.createOscillator();
    const noteGain = this.ctx.createGain();

    osc1.type = 'sine';
    osc1.frequency.setValueAtTime(freq, t);

    // Subtle chime harmonic 2nd octave overtone
    osc2.type = 'triangle';
    osc2.frequency.setValueAtTime(freq * 2, t);

    const gain1 = this.ctx.createGain();
    const gain2 = this.ctx.createGain();

    gain1.gain.setValueAtTime(velocity, t);
    gain1.gain.exponentialRampToValueAtTime(0.0001, t + duration);

    gain2.gain.setValueAtTime(velocity * 0.25, t);
    gain2.gain.exponentialRampToValueAtTime(0.0001, t + (duration * 0.5));

    osc1.connect(gain1);
    osc2.connect(gain2);

    gain1.connect(noteGain);
    gain2.connect(noteGain);

    noteGain.connect(this.masterGain);

    osc1.start(t);
    osc2.start(t);

    osc1.stop(t + duration);
    osc2.stop(t + duration);
  }

  playBassTone(freq, time) {
    if (!this.ctx) return;
    const t = this.ctx.currentTime + time;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, t);

    gain.gain.setValueAtTime(0.3, t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 3.5);

    osc.connect(gain);
    gain.connect(this.masterGain);

    osc.start(t);
    osc.stop(t + 3.8);
  }

  startMelodyLoop() {
    if (!this.ctx) this.init();
    if (this.isPlaying) return;

    this.isPlaying = true;
    const loopDuration = 16.0; // 16 seconds per cycle

    const scheduleCycle = () => {
      if (!this.isPlaying) return;

      // Schedule melody
      this.melody.forEach(({ note, time }) => {
        this.playMusicBoxTone(note, time, 1.8, 0.4);
      });

      // Schedule bass
      this.bassNotes.forEach(({ note, time }) => {
        this.playBassTone(note, time);
      });

      this.timer = setTimeout(scheduleCycle, (loopDuration - 0.2) * 1000);
    };

    scheduleCycle();
  }

  stopMelodyLoop() {
    this.isPlaying = false;
    if (this.timer) {
      clearTimeout(this.timer);
      this.timer = null;
    }
  }

  toggleMusic() {
    this.init();
    if (this.isPlaying) {
      this.stopMelodyLoop();
      return false;
    } else {
      this.startMelodyLoop();
      return true;
    }
  }

  // Romantic interaction sound effects
  playChime() {
    this.init();
    if (!this.ctx) return;
    const chords = [523.25, 659.25, 783.99, 1046.50];
    chords.forEach((note, i) => {
      this.playMusicBoxTone(note, i * 0.08, 1.4, 0.35);
    });
  }

  playHeartBeat() {
    this.init();
    if (!this.ctx) return;
    const t = this.ctx.currentTime;
    
    // Thump 1
    const osc1 = this.ctx.createOscillator();
    const gain1 = this.ctx.createGain();
    osc1.frequency.setValueAtTime(75, t);
    osc1.frequency.exponentialRampToValueAtTime(40, t + 0.15);
    gain1.gain.setValueAtTime(0.4, t);
    gain1.gain.exponentialRampToValueAtTime(0.001, t + 0.15);
    osc1.connect(gain1);
    gain1.connect(this.ctx.destination);
    osc1.start(t);
    osc1.stop(t + 0.15);

    // Thump 2
    const osc2 = this.ctx.createOscillator();
    const gain2 = this.ctx.createGain();
    osc2.frequency.setValueAtTime(65, t + 0.2);
    osc2.frequency.exponentialRampToValueAtTime(35, t + 0.38);
    gain2.gain.setValueAtTime(0.3, t + 0.2);
    gain2.gain.exponentialRampToValueAtTime(0.001, t + 0.38);
    osc2.connect(gain2);
    gain2.connect(this.ctx.destination);
    osc2.start(t + 0.2);
    osc2.stop(t + 0.38);
  }

  playSparkle() {
    this.init();
    if (!this.ctx) return;
    const notes = [1046.5, 1318.5, 1567.98, 2093.0];
    notes.forEach((freq, i) => {
      this.playMusicBoxTone(freq, i * 0.05, 0.8, 0.2);
    });
  }
}

export const romanticAudio = new RomanticAudio();
