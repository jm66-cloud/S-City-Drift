const StatusBar = {
  el: null,

  init() {
    this.el = document.getElementById('status-bar');
    this.render();
  },

  render() {
    if (!this.el) return;
    const char = Game.character;
    if (!char) { this.el.innerHTML = ''; return; }
    this.el.innerHTML = '<div class="stat-item stat-hunger">🍚 饱食:<div class="stat-bar-bg"><div class="stat-bar-fill" style="width:' + char.hunger + '%"></div></div>' + Math.floor(char.hunger) + '%</div>'
      + '<div class="stat-item stat-sleep">😴 困意:<div class="stat-bar-bg"><div class="stat-bar-fill" style="width:' + char.sleep + '%"></div></div>' + Math.floor(char.sleep) + '%</div>'
      + '<div class="stat-item stat-stress">😰 压力:<div class="stat-bar-bg"><div class="stat-bar-fill" style="width:' + char.stress + '%"></div></div>' + Math.floor(char.stress) + '%</div>'
      + '<span style="margin-left:auto;">💰 ' + Format.short(char.cash) + '</span>'
      + '<button class="quick-btn" onclick="UI.showLifePanel()">🏠 生活</button>'
      + '<button class="quick-btn" onclick="GameLoop.pause(); GameLoop.paused ? Game.resumeGame() : Game.pauseGame();">⏸</button>';
  },

  update() { this.render(); },
};
