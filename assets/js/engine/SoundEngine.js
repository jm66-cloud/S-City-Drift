const SoundEngine = {
  enabled: true,
  ctx: null,

  init() {
    try {
      this.ctx = new (window.AudioContext || window.webkitAudioContext)();
    } catch { this.ctx = null; }
  },

  toggle() {
    this.enabled = !this.enabled;
    Game.showToast(this.enabled ? '🔊 音效已开启' : '🔇 音效已关闭', 'info');
  },

  _ensureCtx() {
    if (!this.ctx) this.init();
    if (this.ctx && this.ctx.state === 'suspended') this.ctx.resume();
  },

  play(type) {
    if (!this.enabled || !this.ctx) return;
    this._ensureCtx();
    switch (type) {
      case 'click': this._tone(800, 0.05, 'square', 0.1); break;
      case 'trade': this._tone(600, 0.1, 'square', 0.15); this._tone(900, 0.15, 'square', 0.1); break;
      case 'success': this._tone(523, 0.1, 'sine', 0.2); setTimeout(() => this._tone(659, 0.1, 'sine', 0.2), 100); setTimeout(() => this._tone(784, 0.15, 'sine', 0.2), 200); break;
      case 'error': this._tone(200, 0.2, 'sawtooth', 0.15); setTimeout(() => this._tone(150, 0.3, 'sawtooth', 0.15), 150); break;
      case 'alarm': for (let i = 0; i < 3; i++) setTimeout(() => this._tone(880, 0.1, 'square', 0.2), i * 200); break;
      case 'chat': this._tone(440, 0.06, 'sine', 0.1); break;
      case 'sleep': this._tone(300, 0.5, 'sine', 0.1); break;
      case 'money': this._tone(1047, 0.08, 'sine', 0.15); setTimeout(() => this._tone(1319, 0.1, 'sine', 0.15), 80); break;
      case 'crime': this._tone(150, 0.15, 'sawtooth', 0.2); setTimeout(() => this._tone(100, 0.2, 'sawtooth', 0.2), 150); break;
    }
  },

  _tone(freq, duration, type, vol) {
    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = type;
      osc.frequency.value = freq;
      gain.gain.setValueAtTime(vol, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + duration);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(this.ctx.currentTime);
      osc.stop(this.ctx.currentTime + duration);
    } catch {}
  },
};
