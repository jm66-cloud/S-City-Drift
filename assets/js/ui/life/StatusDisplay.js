const StatusDisplay = {
  render(containerId) {
    const el = document.getElementById(containerId);
    if (!el) return;
    const char = Game.character;
    if (!char) return;
    el.innerHTML = '<div style="font-size:13px;">'
      + '<div>🍚 饱食度: ' + bar(char.hunger) + ' ' + Math.floor(char.hunger) + '/100</div>'
      + '<div>😴 困意值: ' + bar(char.sleep) + ' ' + Math.floor(char.sleep) + '/100</div>'
      + '<div>😰 压力值: ' + bar(char.stress) + ' ' + Math.floor(char.stress) + '/100</div>'
      + '<div>⚡ 精力: ' + bar(char.energy) + ' ' + Math.floor(char.energy) + '/100</div>'
      + '</div>';
    function bar(v) {
      const n = Math.floor(v / 10);
      return '<span style="color:' + (v > 70 ? '#ff4444' : v > 40 ? '#ffaa00' : '#00c853') + '">'
        + '█'.repeat(n) + '░'.repeat(10 - n) + '</span>';
    }
  },
};
