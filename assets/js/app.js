const Game = {
  character: null,
  initialized: false,

  init() {
    if (this.initialized) return;
    this.initialized = true;
    StockEngine.init();
    BotEngine.init();
    RomanceEngine.init();
    TimeEngine.init();
    TutorialEngine.init();
    AIEngine.init();
    SoundEngine.init();
    WindowManager.init();
    UI.init();
    this.setupKeyboard();
    this.loadDonors();
    MobileDetect.check();
    this.checkSave();
  },

  loadDonors() {
    fetch('/donors.json', { cache: 'no-cache' })
      .then(r => r.ok ? r.json() : [])
      .then(d => { window.donors = d; })
      .catch(() => { window.donors = []; });
  },

  checkSave() {
    const data = Storage.get('save_0', null);
    if (data && data.character) {
      this.character = Object.assign(new Character('', 1), data.character);
      SaveEngine.load(0);
      this.hideNewGame();
      this.startLoop();
      UI.refresh();
      Game.showToast('已加载存档，第 ' + TimeEngine.day + ' 天', 'info');
    } else {
      NewGame.init();
    }
  },

  startNew() {
    const name = document.getElementById('player-name')?.value.trim() || '玩家';
    const diffBtn = document.querySelector('.diff-btn.active');
    const difficulty = parseInt(diffBtn?.dataset?.diff) || 1;
    this.character = new Character(name, difficulty);
    this.hideNewGame();
    TimeEngine.init();
    this.character.playedDays = 1;
    this.startLoop();
    UI.init();
    UI.refresh();
    TutorialEngine.init();
    this.showToast('欢迎来到申海市，' + name + '！', 'success');
    setTimeout(() => { UI.showLifePanel(); }, 500);
    SaveEngine.save(0);
    SoundEngine.play('success');
  },

  hideNewGame() {
    NewGame.hide();
  },

  setDifficulty(d) {
    document.querySelectorAll('.diff-btn').forEach(b => b.classList.remove('active'));
    document.querySelector('.diff-btn[data-diff="' + d + '"]')?.classList.add('active');
  },

  startLoop() {
    GameLoop.onUpdate((gameMinutes) => this.update(gameMinutes));
    GameLoop.start();
  },

  update(gameMinutes) {
    if (GameLoop.paused) return;
    TimeEngine.advance(gameMinutes);
    CharacterEngine.update(gameMinutes);
    if (TimeEngine.marketOpen) {
      StockEngine.update(gameMinutes);
      BotEngine.update(gameMinutes);
    }
    if (TimeEngine.hour === 7 && TimeEngine.minute < 2 && gameMinutes > 0) {
      this.onNewMorning();
    }
    if (TimeEngine.hour === 18 && TimeEngine.minute === 0) {
      StockEngine.closeMarket();
      SaveEngine.autoSave();
    }
    if (TimeEngine.hour === 0 && TimeEngine.minute === 0) {
      RomanceEngine.dailyDecay();
    }
    BotEngine.updateBotPortfolios();
    UI.update();
    Achievements.check();
    this._checkLossConditions(gameMinutes);
  },

  onNewMorning() {
    if (this.character.playedDays > 1) {
      NewsEngine.generate();
      NewsNotification.show();
      EventEngine.checkDaily();
      if (this.character.company) CompanyEngine.monthlyUpdate();
      AssetEngine.monthlyUpdate();
      CriminalEngine.monthlyAudit();
    }
    this.character.playedDays++;
    TutorialEngine.currentDay = Math.min(3, this.character.playedDays);
    if (Random.chance(0.4)) SocialFeed.addSystemMoment();
  },

  checkNewDay() {
    NewsEngine.generate();
    NewsNotification.show();
    EventEngine.checkDaily();
    this.showToast('第 ' + TimeEngine.day + ' 天开始！', 'info');
    this.checkAchievements();
  },

  checkAchievements() {
    const char = this.character;
    if (!char) return;
    if (char.netWorth >= 100000 && !char.hasAchievement('first_pot')) { char.addAchievement('first_pot'); this.showToast('🏆 成就解锁: 第一桶金', 'success'); }
    if (char.trades >= 1000 && !char.hasAchievement('1000_trades')) { char.addAchievement('1000_trades'); this.showToast('🏆 成就解锁: 股市沉浮', 'success'); }
    if (char.properties.length >= 1 && !char.hasAchievement('homeowner')) { char.addAchievement('homeowner'); this.showToast('🏆 成就解锁: 有房一族', 'success'); }
    if (char.marriageCount >= 1 && !char.hasAchievement('married')) { char.addAchievement('married'); this.showToast('🏆 成就解锁: 结婚', 'success'); }
    if (char.company && !char.hasAchievement('company_owner')) { char.addAchievement('company_owner'); this.showToast('🏆 成就解锁: 公司老板', 'success'); }
    if (char.netWorth >= 1000000 && !char.hasAchievement('million')) { char.addAchievement('million'); this.showToast('🏆 成就解锁: 百万富翁', 'success'); }
    if (char.netWorth >= 10000000 && !char.hasAchievement('ten_million')) { char.addAchievement('ten_million'); this.showToast('🏆 成就解锁: 千万富翁', 'success'); }
    if (char.crimeCount >= 5 && !char.hasAchievement('crime_master')) { char.addAchievement('crime_master'); this.showToast('🏆 成就解锁: 偷天换日', 'success'); }
    if (char.vehicles.length >= 1 && !char.hasAchievement('car_owner')) { char.addAchievement('car_owner'); this.showToast('🏆 成就解锁: 有车一族', 'success'); }
    if (char.company?.isPublic && char.netWorth >= CONFIG.ACHIEVE.HUNDRED_MILLION && !char.hasAchievement('victory_ipo')) {
      char.addAchievement('victory_ipo'); Game.victory('ipo');
    }
    if (char.portfolio.length > 0 && char.portfolio.reduce((s, p) => { const st = StockEngine.getStock(p.code); return s + p.quantity * (st ? st.price : 0); }, 0) >= 50000000 && !char.hasAchievement('victory_stock')) {
      char.addAchievement('victory_stock'); Game.victory('stock');
    }
    if (char.properties.length >= 5 && char.properties.reduce((s, p) => s + p.value, 0) >= 30000000 && !char.hasAchievement('victory_estate')) {
      char.addAchievement('victory_estate'); Game.victory('estate');
    }
    char.maxNetWorth = Math.max(char.maxNetWorth, char.netWorth);
  },

  _checkLossConditions(gameMinutes) {
    const char = this.character;
    if (!char) return;
    if (char.hunger <= 0) {
      this.endGame('starve', '你饿死了...');
    }
    if (char.sleep >= 100) {
      this.forceSleep();
    }
    if (char.netWorth < 0 && char.playedDays > CONFIG.NEWBIE.PROTECTION_DAYS) {
      if (!char._bankruptcyProtected) {
        if (char.cash < -10000) {
          this.endGame('bankrupt', '你破产了，流落街头...');
        }
        char._bankruptcyProtected = true;
      }
    }
  },

  endGame(type, message) {
    GameLoop.pause();
    const char = this.character;
    const titles = {
      starve: '⚰️ 过劳死 - 游戏结束',
      bankrupt: '💀 破产 - 游戏结束',
      jail: '⛓️ 铁窗泪 - 游戏结束',
      sick: '🏥 病逝 - 游戏结束',
    };
    Modal.show(titles[type] || '游戏结束',
      message + '\n\n存活: ' + (char ? char.playedDays : 0) + '天 | 总资产: ' + Format.money(char?.netWorth || 0)
      + '\n交易: ' + (char?.trades || 0) + '次 | 盈利: ' + Format.money(char?.totalProfit || 0)
      + '\n\n💝 喜欢这个游戏？请考虑捐赠支持后续更新！',
      [{ text: '重新开始', action: () => { this.resetGame(); } },
      { text: '继续沙盒', action: () => { GameLoop.resume(); Modal.close(); } },
      { text: '捐赠支持', action: () => { window.open('https://itch.io'); } }]
    );
  },

  forceSleep() {
    CharacterEngine.sleep();
    SoundEngine.play('sleep');
    this.showToast('你太困了，自动入睡到次日7:00', 'warn');
  },

  togglePause() {
    if (GameLoop.paused) { GameLoop.resume(); }
    else { GameLoop.pause(); }
    TitleBar.update();
  },

  pauseGame() {
    GameLoop.pause();
    TitleBar.update();
  },

  resumeGame() {
    GameLoop.resume();
    TitleBar.update();
  },

  resetGame() {
    GameLoop.stop();
    this.character = null;
    this.initialized = false;
    StockEngine.init();
    BotEngine.init();
    RomanceEngine.init();
    CriminalEngine.records = [];
    CriminalEngine.accumulatedRisk = 0;
    EventEngine.lastEventDay = 0;
    TutorialEngine.init();
    for (let i = 0; i < CONFIG.SAVE.MAX_SLOTS; i++) { Storage.remove('save_' + i); }
    document.getElementById('new-game-overlay').classList.remove('hidden');
    document.querySelectorAll('.game-window').forEach(w => w.remove());
    WindowManager.windows = [];
    WindowManager._updateTaskbar();
    Modal.close();
    this.showToast('游戏已重置', 'info');
  },

  refresh() {
    UI.refresh();
    TitleBar.update();
    StatusBar.update();
  },

  applyScreenShake() {
    const desktop = document.getElementById('desktop');
    if (desktop) {
      desktop.style.animation = 'none';
      setTimeout(() => { desktop.style.animation = 'shake 0.3s'; }, 10);
    }
  },

  setupKeyboard() {
    document.addEventListener('keydown', (e) => {
      if (e.key === ' ') { e.preventDefault(); this.togglePause(); }
      if (e.key === 'F1') { e.preventDefault(); WindowManager.open('help', '游戏百科', 'HelpApp'); }
      if (e.key === 'F5') { e.preventDefault(); SaveEngine.save(0); this.showToast('快速存档完成', 'success'); }
      if (e.key === 'm' || e.key === 'M') { SoundEngine.toggle(); }
      if (e.ctrlKey && e.shiftKey && e.key === 'D') { e.preventDefault(); DevConsole.toggle(); }
      if (e.ctrlKey && e.key >= '1' && e.key <= '6') {
        e.preventDefault();
        SoundEngine.play('click');
        const apps = ['stock', 'chat', 'news', 'life', 'company', 'settings'];
        const titles = ['股市', '聊天', '新闻', '生活', '公司', '设置'];
        const appMap = { stock: 'StockApp', chat: 'ChatApp', news: 'NewsApp', life: 'LifeApp', company: 'CompanyApp', settings: 'SettingsApp' };
        const idx = parseInt(e.key) - 1;
        WindowManager.open(apps[idx], titles[idx], appMap[apps[idx]]);
      }
    });
  },

  victory(type) {
    GameLoop.pause();
    const char = this.character;
    const titles = {
      ipo: '🏆 申海梦成真 — 公司IPO上市！',
      stock: '🏆 逍遥股神 — 证券资产突破5000万！',
      estate: '🏆 包租公 — 5套房产+市值3000万！',
      happy: '🏆 申海梦圆满 — 家庭事业双丰收！',
      retire: '🏆 退隐江湖 — 归隐田园！',
    };
    SoundEngine.play('success');
    Modal.show(titles[type] || '🏆 胜利！',
      '总资产: ' + Format.money(char?.netWorth || 0) + '\n存活: ' + (char?.playedDays || 0) + '天'
      + '\n交易: ' + (char?.trades || 0) + '次 | 盈利: ' + Format.money(char?.totalProfit || 0)
      + '\n\n💝 喜欢这个游戏？请考虑捐赠支持后续更新！',
      [{ text: '继续沙盒', action: () => { GameLoop.resume(); Modal.close(); } },
      { text: '捐赠支持', action: () => { window.open('https://itch.io'); } }]
    );
  },

  showToast(msg, type = 'info') {
    const container = document.getElementById('toast-container');
    if (!container) return;
    const toast = document.createElement('div');
    toast.className = 'toast ' + type;
    toast.textContent = msg;
    container.appendChild(toast);
    setTimeout(() => { toast.remove(); }, 3000);
  },
};

const UI = {
  init() {
    Desktop.render();
    TitleBar.init();
    StatusBar.init();
  },

  update() {
    TitleBar.update();
    StatusBar.update();
  },

  refresh() {
    Desktop.render();
    TitleBar.render();
    StatusBar.render();
  },

  showLifePanel() {
    WindowManager.open('life', '生活管理', 'LifeApp');
  },

  updateStatusBar() { StatusBar.update(); },
  updateTitleBar() { TitleBar.update(); },
};

const Achievements = {
  list: [
    { id: 'first_pot', name: '第一桶金', desc: '总资产 ≥ 10万', icon: '🥉' },
    { id: '1000_trades', name: '股市沉浮', desc: '交易超过1000笔', icon: '🥉' },
    { id: 'homeowner', name: '有房一族', desc: '购买第一套房产', icon: '🥉' },
    { id: 'car_owner', name: '有车一族', desc: '购买第一辆车', icon: '🥉' },
    { id: 'married', name: '结婚', desc: '完成婚礼', icon: '🥈' },
    { id: 'company_owner', name: '公司老板', desc: '成功创建公司', icon: '🥈' },
    { id: 'million', name: '百万富翁', desc: '总资产 ≥ 100万', icon: '🥇' },
    { id: 'ten_million', name: '千万富翁', desc: '总资产 ≥ 1000万', icon: '🥇' },
    { id: 'crime_master', name: '偷天换日', desc: '成功犯罪5次', icon: '🥇' },
  ],

  check() {
    const char = Game.character;
    if (!char) return;
    for (const a of this.list) {
      if (!char.hasAchievement(a.id)) {
        let earned = false;
        switch (a.id) {
          case 'first_pot': earned = char.netWorth >= 100000; break;
          case '1000_trades': earned = char.trades >= 1000; break;
          case 'homeowner': earned = char.properties.length >= 1; break;
          case 'car_owner': earned = char.vehicles.length >= 1; break;
          case 'married': earned = char.marriageCount >= 1; break;
          case 'company_owner': earned = !!char.company; break;
          case 'million': earned = char.netWorth >= 1000000; break;
          case 'ten_million': earned = char.netWorth >= 10000000; break;
          case 'crime_master': earned = char.crimeCount >= 5; break;
        }
        if (earned) {
          char.addAchievement(a.id);
          Game.showToast(a.icon + ' 成就解锁: ' + a.name, 'success');
        }
      }
    }
  },

  getAll(char) {
    return this.list.map(a => ({ ...a, earned: char?.hasAchievement(a.id) || false }));
  },
};

const HelpApp = {
  open(bodyEl) {
    bodyEl.innerHTML = '<div style="padding:12px;overflow-y:auto;height:100%;">'
      + '<h3 style="color:var(--text-bright);margin-bottom:12px;">📖 游戏百科</h3>'
      + '<div class="set-section"><h4>🎮 基本操作</h4>'
      + '<p>Space: 暂停/继续 | F1: 帮助 | F5: 快速存档</p>'
      + '<p>Ctrl+1~6: 快速打开窗口 | M: 静音切换</p>'
      + '<p>Ctrl+Shift+D: 开发者控制台</p></div>'
      + '<div class="set-section"><h4>📈 交易规则</h4>'
      + '<p>交易时间: 8:00~18:00 | 1手=100股</p>'
      + '<p>佣金: 万三 | 印花税: 千一(卖出) | 最低佣金: ¥5</p>'
      + '<p>涨跌幅限制: ±10%</p></div>'
      + '<div class="set-section"><h4>🏢 公司经营</h4>'
      + '<p>创建公司需要 ¥100万 | 公司有5大管理模块</p>'
      + '<p>每月自动结算营收/利润 | 满足条件可申请IPO上市</p></div>'
      + '<div class="set-section"><h4>💕 恋爱婚姻</h4>'
      + '<p>好感度达到条件可推进关系阶段 | 结婚需要房子</p>'
      + '<p>婚前协议降低离婚财产分割比例</p></div>'
      + '<div class="set-section"><h4>⚠️ 犯罪风险</h4>'
      + '<p>犯罪操作有法律风险 | 金额越大审计概率越高</p>'
      + '<p>可通过销毁证据/找人顶罪/洗钱降低风险</p></div>'
      + '<div class="set-section"><h4>💀 失败条件</h4>'
      + '<p>破产: 总资产<0 | 饿死: 饱食度归零</p>'
      + '<p>坐牢: 犯罪被抓 | 重病: 无钱医治</p></div>'
      + '<div class="set-section"><h4>🏆 胜利条件</h4>'
      + '<p>IPO上市+资产≥1亿 | 证券资产≥5000万</p>'
      + '<p>5套房产+市值≥3000万 | 美满家庭+公司盈利</p></div>'
      + '</div>';
  },
};

document.addEventListener('DOMContentLoaded', () => Game.init());
