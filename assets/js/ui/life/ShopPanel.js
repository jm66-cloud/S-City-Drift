const ShopPanel = {
  items: [
    { name: '面包', price: 8, hunger: 15, desc: '普通的白面包' },
    { name: '矿泉水', price: 3, hunger: 2, desc: '解渴' },
    { name: '方便面', price: 5, hunger: 10, stress: 3, desc: '速食首选' },
    { name: '能量饮料', price: 12, sleep: -10, desc: '提神醒脑' },
    { name: '止痛药', price: 30, desc: '缓解小病痛' },
    { name: '减压球', price: 25, stress: -10, desc: '捏一捏，心情好' },
    { name: '彩票', price: 10, desc: '万一中了呢？（老虎机）', slot: true },
  ],

  render(containerId) {
    const el = document.getElementById(containerId);
    if (!el) return;
    el.innerHTML = '<div style="padding:8px;"><h4 style="color:var(--text-bright);margin-bottom:8px;">🏪 便利店</h4>'
      + '<div style="display:grid;grid-template-columns:1fr 1fr;gap:6px;">'
      + this.items.map((item, i) => '<div style="border:1px solid #333;padding:8px;cursor:pointer;" onclick="ShopPanel.buy(' + i + ')">'
        + '<div>' + item.name + ' — ¥' + item.price + '</div>'
        + '<div style="font-size:11px;color:#808080;">' + item.desc + '</div>'
        + '</div>').join('')
      + '</div><div id="shop-result" style="margin-top:8px;font-size:12px;"></div></div>';
  },

  buy(index) {
    const item = this.items[index];
    const char = Game.character;
    if (!item || char.cash < item.price) { Game.showToast('资金不足', 'warn'); return; }
    char.cash -= item.price;
    if (item.hunger) char.hunger = Math.min(100, char.hunger + item.hunger);
    if (item.sleep) char.sleep = Math.max(0, char.sleep - item.sleep);
    if (item.stress) char.stress = Math.min(100, char.stress + item.stress);
    if (item.stress && item.stress < 0) char.stress = Math.max(0, char.stress + item.stress);
    if (item.slot) {
      if (Random.chance(0.1)) { char.cash += 50; Game.showToast('🎉 刮出¥50！', 'success'); }
      else if (Random.chance(0.02)) { char.cash += 200; Game.showToast('🎉 中了¥200！', 'success'); }
      else { Game.showToast('没中奖', 'info'); }
    }
    const el = document.getElementById('shop-result');
    if (el) { el.textContent = '✅ 购买了 ' + item.name; el.style.color = '#00c853'; }
    LiveLog.add('购物', item.name);
    UI.updateStatusBar();
  },
};
