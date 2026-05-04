const RomanceEngine = {
  chars: [],

  init() {
    this.chars = ROMANCE_CHARS ? ROMANCE_CHARS.map(c => new Romance(c.id, c.name)) : [];
  },

  load(data) {
    if (data && Array.isArray(data)) { this.chars = data.map(c => Object.assign(new Romance(), c)); }
  },

  save() { return this.chars; },

  getChar(id) { return this.chars.find(c => c.charId === id); },
  getAvailable() { return this.chars.filter(c => c.stage < 3); },
  getCurrent() { return Game.character ? Game.character.romance : null; },

  chat(romanceChar, choice) {
    if (!romanceChar) return 0;
    const gain = choice === 'good' ? Random.int(2, 4) : choice === 'bad' ? Random.int(-3, -1) : Random.int(1, 3);
    romanceChar.affection = Math.max(0, Math.min(100, romanceChar.affection + gain));
    romanceChar.dates++;
    this._checkStage(romanceChar);
    return gain;
  },

  date(romanceChar, type) {
    if (!romanceChar) return 0;
    let gain = 0, cost = 0;
    switch (type) {
      case 'dinner': gain = Random.int(5, 10); cost = Random.int(100, 500); break;
      case 'movie': gain = Random.int(5, 8); cost = Random.int(80, 200); break;
      case 'gift': gain = Random.int(8, 20); cost = Random.int(200, 5000); break;
      case 'shopping': gain = Random.int(3, 6); cost = Random.int(200, 1000); break;
      case 'travel': gain = Random.int(15, 30); cost = Random.int(2000, 10000); break;
    }
    const char = Game.character;
    if (char.cash < cost) { Game.showToast('资金不足', 'warn'); return 0; }
    char.cash -= cost;
    romanceChar.affection = Math.max(0, Math.min(100, romanceChar.affection + gain));
    romanceChar.dates++;
    romanceChar.gifts += type === 'gift' ? 1 : 0;
    CharacterEngine.relieveStress('movie');
    this._checkStage(romanceChar);
    this._checkEvent(romanceChar);
    return gain;
  },

  _checkStage(romance) {
    const thresholds = [0, 10, 25, 45, 65, 80, 90, 100];
    for (let i = romance.stage; i < thresholds.length - 1; i++) {
      if (romance.affection >= thresholds[i + 1]) romance.stage = i + 1;
      else break;
    }
  },

  _checkEvent(romance) {
    if (romance.eventsTriggered.length >= 3) return;
    const eventsMap = {
      'xiaolin': ['咖啡店拆迁', '帮忙找新店址', '资助开店'],
      'chenjingli': ['客户骚扰', '出面解决', '报警'],
      'zhouyu': ['创业失败', '借钱', '介绍工作'],
      'zhangxue': ['父母逼婚', '见家长', '拖延'],
    };
    const events = eventsMap[romance.charId];
    if (!events) return;
    const eventKey = romance.charId + '_' + romance.dates;
    if (romance.dates >= 3 && !romance.eventsTriggered.includes(eventKey)) {
      romance.eventsTriggered.push(eventKey);
      Modal.show('恋爱事件', events[0] + '\n' + events[1] + ' / ' + events[2]);
    }
  },

  marry(romance, prenup = false) {
    const char = Game.character;
    if (romance.affection < 90) return { success: false, reason: '好感度不足90' };
    if (romance.stage < 6) return { success: false, reason: '尚未订婚' };
    if (char.properties.length === 0) return { success: false, reason: '至少需要一套住房' };
    const cost = prenup ? CONFIG.ROMANCE.MARRIAGE_COST_BASE + 10000 : CONFIG.ROMANCE.MARRIAGE_COST_BASE;
    if (char.cash < cost) return { success: false, reason: '资金不足' };
    char.cash -= cost;
    romance.married = true;
    romance.prenup = prenup;
    if (prenup) romance.affection = Math.max(0, romance.affection - 10);
    romance.stage = 7;
    char.marriageCount++;
    Game.showToast('恭喜结婚！', 'success');
    return { success: true };
  },

  divorce(romance) {
    if (!romance.married) return { success: false, reason: '尚未结婚' };
    const char = Game.character;
    const dc = CONFIG.DIFFICULTY.CONFIG[char.difficulty || 1];
    const ratio = romance.prenup ? 0.1 : (dc.divorceRatio || 0.4);
    const assetSplit = Math.floor(char.netWorth * ratio);
    char.cash -= assetSplit;
    romance.married = false;
    romance.divorced = true;
    romance.affection = 0;
    char.divorceCount++;
    Game.showToast('离婚，分割财产 ' + Format.money(assetSplit), 'warn');
    return { success: true };
  },

  dailyDecay() {
    for (const c of this.chars) {
      if (c.affection > 0 && !c.married) c.affection = Math.max(0, c.affection - 0.3);
    }
  },
};
