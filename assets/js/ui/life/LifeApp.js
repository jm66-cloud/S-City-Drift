const LifeApp = {
  currentPanel: 'main',

  open(bodyEl) {
    bodyEl.innerHTML = '<div style="display:flex;flex-direction:column;height:100%;">'
      + '<div id="life-status"></div>'
      + '<div style="display:flex;gap:4px;border-top:1px solid #333;border-bottom:1px solid #333;padding:4px 0;margin:6px 0;">'
      + '<button class="quick-btn" onclick="LifeApp.showPanel(\'main\')">主页</button>'
      + '<button class="quick-btn" onclick="LifeApp.showPanel(\'eat\')">🍚 吃饭</button>'
      + '<button class="quick-btn" onclick="LifeApp.showPanel(\'shop\')">🏪 便利店</button>'
      + '<button class="quick-btn" onclick="LifeApp.showPanel(\'stress\')">💆 减压</button>'
      + '</div>'
      + '<div id="life-content" style="flex:1;overflow-y:auto;"></div>'
      + '<div style="border-top:1px solid #333;padding:6px 0;display:flex;gap:4px;">'
      + '<button style="flex:1;font-size:16px;padding:8px;background:var(--title-bar);" onclick="LifeApp.showPanel(\'sleep\')">🛏️ 睡觉</button>'
      + '</div>'
      + '<div id="life-dailylog" style="font-size:11px;color:#808080;border-top:1px solid #333;padding:4px 0;"></div>'
      + '</div>';
    StatusDisplay.render('life-status');
    DailyLog.render('life-dailylog');
    this.showPanel('main');
  },

  showPanel(panel) {
    this.currentPanel = panel;
    const content = document.getElementById('life-content');
    if (!content) return;
    switch (panel) {
      case 'main':
        content.innerHTML = '<div style="padding:8px;text-align:center;color:#808080;">选择上方操作</div>';
        break;
      case 'eat':
        EatPanel.render('life-content');
        break;
      case 'shop':
        ShopPanel.render('life-content');
        break;
      case 'sleep':
        SleepPanel.render('life-content');
        break;
      case 'stress':
        this.showStressRelief();
        break;
    }
  },

  showStressRelief() {
    const content = document.getElementById('life-content');
    if (!content) return;
    content.innerHTML = '<div style="padding:8px;"><h4 style="color:var(--text-bright);margin-bottom:8px;">💆 减压活动</h4>'
      + '<div style="display:grid;grid-template-columns:1fr 1fr;gap:6px;">'
      + '<div style="border:1px solid #333;padding:8px;cursor:pointer;" onclick="LifeApp.doRelieve(\'movie\')">🎬 看电影<br><span style="font-size:11px;color:#808080;">压力-10 ¥60 耗时2h</span></div>'
      + '<div style="border:1px solid #333;padding:8px;cursor:pointer;" onclick="LifeApp.doRelieve(\'shopping\')">🛍️ 逛街<br><span style="font-size:11px;color:#808080;">压力-10 ¥100~500 耗时1h</span></div>'
      + '<div style="border:1px solid #333;padding:8px;cursor:pointer;" onclick="LifeApp.doRelieve(\'fitness\')">🏋️ 健身<br><span style="font-size:11px;color:#808080;">压力-15 精力+10 耗时30分</span></div>'
      + '<div style="border:1px solid #333;padding:8px;cursor:pointer;" onclick="LifeApp.doRelieve(\'massage\')">💆 按摩<br><span style="font-size:11px;color:#808080;">压力-15 ¥80 耗时30分</span></div>'
      + '</div></div>';
  },

  doRelieve(activity) {
    CharacterEngine.relieveStress(activity);
    StatusDisplay.render('life-status');
    LiveLog.add('减压', activity);
  },
};

const LiveLog = {
  add(action, detail) {
    DailyLog.data.logs.push({ action, detail, time: TimeEngine.timeStr });
    DailyLog.render('life-dailylog');
  },
};
