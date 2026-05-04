const GameSettings = {
  render(containerId) {
    const el = document.getElementById(containerId);
    if (!el) return;
    el.innerHTML = '<div class="game-settings" style="padding:12px;">'
      + '<div class="set-section"><h4>⚙️ 游戏设置</h4>'
      + '<div class="gs-row"><span>版本</span><span>v1.0.0</span></div>'
      + '<div class="gs-row"><span>游戏时间</span><span>' + TimeEngine.fullDateStr + '</span></div>'
      + '<div class="gs-row"><span>总资产</span><span>' + Format.money(Game.character?.netWorth || 0) + '</span></div>'
      + '<div class="gs-btns">'
      + '<button onclick="SaveEngine.save(0)">💾 保存</button>'
      + '<button onclick="GameSettings.load()">📂 读档</button>'
      + '<button onclick="SaveEngine.exportSave()">📤 导出存档</button>'
      + '<button onclick="GameSettings.importPrompt()">📥 导入存档</button>'
      + '<button onclick="GameSettings.confirmReset()">🗑️ 重置游戏</button>'
      + '<button onclick="window.open(\'https://itch.io\')">💝 支持作者</button>'
      + '</div></div>'
      + '<div class="set-section"><h4>🖥️ 显示</h4>'
      + '<div class="gs-row"><span>大字体模式</span><button onclick="GameSettings.toggleFontSize()">切换</button></div>'
      + '</div>'
      + '<div class="set-section"><h4>💡 快捷键</h4>'
      + '<div style="font-size:12px;color:#808080;">Space: 暂停 | F1: 帮助 | F5: 快速存档 | Ctrl+1~6: 快速打开窗口</div>'
      + '</div>'
      + '</div>';
  },

  load() {
    const slots = SaveEngine.getSlots();
    const html = slots.map(s => s.empty
      ? '<div style="padding:6px;border-bottom:1px solid #333;color:#808080;">槽位 ' + (s.slot + 1) + ': 空</div>'
      : '<div style="padding:6px;border-bottom:1px solid #333;">槽位 ' + (s.slot + 1) + ': 第 ' + s.day + ' 天 | ' + new Date(s.timestamp).toLocaleString() + ' <button onclick="SaveEngine.load(' + s.slot + '); Game.refresh(); Modal.close();">读取</button></div>'
    ).join('');
    Modal.show('读取存档', html);
  },

  importPrompt() {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';
    input.onchange = (e) => {
      if (e.target.files[0]) SaveEngine.importSave(e.target.files[0]);
    };
    input.click();
  },

  confirmReset() {
    Modal.show('确认重置', '确定要重置游戏吗？所有进度将丢失。',
      [{ text: '确认重置', action: () => Game.resetGame() }, { text: '取消', action: () => Modal.close() }]);
  },

  toggleFontSize() {
    const root = document.documentElement;
    const current = getComputedStyle(root).getPropertyValue('--font-size').trim();
    root.style.setProperty('--font-size', current === '16px' ? '20px' : '16px');
    Game.showToast('字体大小已切换', 'success');
  },
};
