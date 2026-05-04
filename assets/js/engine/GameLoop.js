const GameLoop = {
  lastTime: 0,
  running: false,
  paused: false,
  speedMultiplier: 1,
  frameId: null,
  updateCallbacks: [],

  start() {
    this.lastTime = performance.now();
    this.running = true;
    this.tick(this.lastTime);
  },
  stop() {
    this.running = false;
    if (this.frameId) cancelAnimationFrame(this.frameId);
  },
  pause() { this.paused = true; },
  resume() { this.paused = false; this.lastTime = performance.now(); },
  setSpeed(s) { this.speedMultiplier = s; },
  onUpdate(cb) { this.updateCallbacks.push(cb); },

  tick(now) {
    if (!this.running) return;
    const deltaMs = now - this.lastTime;
    this.lastTime = now;
    if (!this.paused) {
      const gameMinutes = (deltaMs / 1000) * this.speedMultiplier;
      if (gameMinutes > 0) {
        for (const cb of this.updateCallbacks) {
          try { cb(gameMinutes); } catch (e) { console.error('GameLoop callback error:', e); }
        }
      }
    }
    this.frameId = requestAnimationFrame((t) => this.tick(t));
  },
};
