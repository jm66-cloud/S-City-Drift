const CharacterEngine = {
  update(gameMinutes) {
    const char = Game.character;
    if (!char) return;
    const dc = CONFIG.DIFFICULTY.CONFIG[char.difficulty || 1];
    const minutes = gameMinutes;
    const hungerDecay = (dc.hungerDecay || 1) * (minutes / 10);
    const sleepInc = (dc.fatigueInc || 0.5) * (minutes / 10);
    char.hunger = Math.max(0, Math.min(100, char.hunger - hungerDecay));
    char.sleep = Math.max(0, Math.min(100, char.sleep + sleepInc));
    if (char.sleep >= 80) Game.applyScreenShake();
    if (char.sleep >= 100) { Modal.show('困意难挡', '你实在太困了，直接趴在桌上睡着了...'); Game.forceSleep(); }
    if (char.hunger <= 0) {
      char.hunger = 0;
      char.energy = Math.max(0, char.energy - 2 * minutes);
      if (char.hunger <= 0) Game.showToast('你饿了！请尽快进食', 'warn');
    }
    char.energy = Math.max(0, Math.min(100, char.energy));
    if (char.stress > CONFIG.CHARACTER.STRESS_SHAKE_THRESHOLD) Game.applyScreenShake();
    if (char.stress >= CONFIG.CHARACTER.STRESS_BREAKDOWN_THRESHOLD && Random.chance(0.1 * minutes)) {
      Modal.show('心理崩溃', '压力太大了！你需要休息！');
      Game.showToast('压力过大，强制休息中...', 'error');
    }
    if (char.stress >= CONFIG.CHARACTER.STRESS_HOSPITAL_THRESHOLD) {
      Modal.show('住院', '压力过大导致身体崩溃，你被送进了医院。花费¥5000。');
      char.cash -= 5000;
      char.stress = 30;
    }
  },

  eat(mealType) {
    const char = Game.character;
    switch (mealType) {
      case 'cook': char.hunger = Math.min(100, char.hunger + 40); char.stress = Math.max(0, char.stress - 5); char.cash -= Random.int(10, 20); TimeEngine.advance(45); break;
      case 'delivery': char.hunger = Math.min(100, char.hunger + 20); char.cash -= Random.int(20, 50); TimeEngine.advance(15); break;
      case 'instant': char.hunger = Math.min(100, char.hunger + 10); char.stress = Math.min(100, char.stress + 5); TimeEngine.advance(3); break;
      case 'eatout': char.hunger = Math.min(100, char.hunger + 30); char.stress = Math.max(0, char.stress - 3); char.cash -= Random.int(15, 50); TimeEngine.advance(30); break;
      case 'coffee': char.sleep = Math.max(0, char.sleep - 15); char.cash -= 10; TimeEngine.advance(5); break;
    }
    UI.updateStatusBar();
    UI.updateTitleBar();
  },

  sleep() {
    const char = Game.character;
    char.hunger = Math.max(0, char.hunger - CONFIG.CHARACTER.SLEEP_HUNGER_COST);
    char.sleep = 0;
    char.stress = Math.max(0, char.stress - 20);
    TimeEngine.setTime(CONFIG.TIME.WAKE_UP_HOUR, 0, 0);
    TimeEngine.day++;
    char.playedDays++;
    CharacterEngine._dailyReset();
    DailyLog.reset();
    UI.showLifePanel();
    UI.updateStatusBar();
    UI.updateTitleBar();
    Game.checkNewDay();
  },

  _dailyReset() {
    const char = Game.character;
    char.guessDailyCount = 0;
  },

  stressFrom(action, amount) {
    const char = Game.character;
    char.stress = Math.min(100, char.stress + amount);
    if (char.stress > CONFIG.CHARACTER.STRESS_SHAKE_THRESHOLD) Game.applyScreenShake();
  },

  relieveStress(activity) {
    const char = Game.character;
    let reduction = 0;
    switch (activity) {
      case 'movie': reduction = 10; char.cash -= 60; TimeEngine.advance(120); break;
      case 'shopping': reduction = 10; char.cash -= Random.int(100, 500); TimeEngine.advance(60); break;
      case 'fitness': reduction = 15; char.energy = Math.min(100, char.energy + 10); TimeEngine.advance(30); break;
      case 'massage': reduction = 15; char.cash -= 80; TimeEngine.advance(30); break;
      case 'talk': reduction = 8; TimeEngine.advance(15); break;
    }
    char.stress = Math.max(0, char.stress - reduction);
    UI.updateStatusBar();
    Game.showToast('减压 ' + reduction + ' 点', 'success');
  },
};
