const SettingsApp = {
  open(bodyEl) {
    bodyEl.innerHTML = '<div class="settings-app" style="display:flex;flex-direction:column;height:100%;">'
      + '<div style="padding:4px 8px;background:var(--bg-panel-light);border-bottom:1px solid #000;display:flex;gap:8px;">'
      + '<span class="nav-link" onclick="SettingsApp.showAI()" style="cursor:pointer;color:var(--highlight);">🤖 AI 配置</span>'
      + '<span class="nav-link" onclick="SettingsApp.showGame()" style="cursor:pointer;color:var(--highlight);">⚙️ 游戏设置</span>'
      + '<span class="nav-link" onclick="SettingsApp.showStats()" style="cursor:pointer;color:var(--highlight);">📊 统计</span>'
      + '</div><div id="settings-content" style="flex:1;overflow-y:auto;"></div></div>';
    this.showGame();
  },

  showAI() {
    AISettings.render('settings-content');
  },

  showGame() {
    GameSettings.render('settings-content');
  },

  showStats() {
    const el = document.getElementById('settings-content');
    if (!el) return;
    const char = Game.character;
    if (!char) return;
    el.innerHTML = '<div style="padding:12px;"><h4 style="color:var(--text-bright);margin-bottom:8px;">📊 生涯统计</h4>'
      + '<div style="border-bottom:1px solid #333;padding:4px 0;">游戏天数: ' + char.playedDays + '天</div>'
      + '<div style="border-bottom:1px solid #333;padding:4px 0;">交易次数: ' + char.trades + '次</div>'
      + '<div style="border-bottom:1px solid #333;padding:4px 0;">总盈利: ' + Format.money(char.totalProfit) + '</div>'
      + '<div style="border-bottom:1px solid #333;padding:4px 0;">总亏损: ' + Format.money(char.totalLoss) + '</div>'
      + '<div style="border-bottom:1px solid #333;padding:4px 0;">结婚次数: ' + char.marriageCount + '</div>'
      + '<div style="border-bottom:1px solid #333;padding:4px 0;">离婚次数: ' + char.divorceCount + '</div>'
      + '<div style="border-bottom:1px solid #333;padding:4px 0;">犯罪次数: ' + char.crimeCount + '</div>'
      + '<div style="border-bottom:1px solid #333;padding:4px 0;">被捕次数: ' + char.arrestCount + '</div>'
      + '<div style="border-bottom:1px solid #333;padding:4px 0;">纳税总额: ' + Format.money(char.totalTax) + '</div>'
      + '<div style="border-bottom:1px solid #333;padding:4px 0;">房产数: ' + char.properties.length + '</div>'
      + '<div style="border-bottom:1px solid #333;padding:4px 0;">车辆数: ' + char.vehicles.length + '</div>'
      + '<div style="border-bottom:1px solid #333;padding:4px 0;">最高单日盈利: ' + Format.money(char.bestDay) + '</div>'
      + '<div style="border-bottom:1px solid #333;padding:4px 0;">最多亏损日: ' + Format.money(char.worstDay) + '</div>'
      + '<div style="border-bottom:1px solid #333;padding:4px 0;">最高资产: ' + Format.money(char.maxNetWorth) + '</div>'
      + '</div>';
  },
};
