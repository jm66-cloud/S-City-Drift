const TitleBar = {
  el: null,

  init() {
    this.el = document.getElementById('top-bar');
    this.render();
  },

  render() {
    if (!this.el) return;
    const char = Game.character;
    const time = TimeEngine;
    const periodText = time.marketOpen ? '📈 盘中' : '💤 盘后';
    const cycleText = time.cycleStr ? ' | ' + time.cycleStr + '期' : '';
    this.el.innerHTML = '<span class="top-left">'
      + '<span>' + time.dayStr + '</span>'
      + '<span>' + time.timeStrFull + '</span>'
      + '<span>' + periodText + cycleText + '</span>'
      + '<span id="pause-btn" style="cursor:pointer;font-size:13px;" onclick="Game.togglePause()">'
      + (GameLoop.paused ? '▶ 暂停' : '⏸ 暂停')
      + '</span></span>'
      + '<span class="top-right">'
      + '<span>' + (char ? Format.money(char.netWorth) : '') + '</span>'
      + '</span>';
  },

  update() { this.render(); },
};
