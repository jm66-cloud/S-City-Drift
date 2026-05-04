const SaveEngine = {
  currentSlot: 0,

  save(slot = 0) {
    this.currentSlot = slot;
    const data = this._collectData();
    try {
      Storage.set('save_' + slot, data);
      this._saveToIndexedDB('save_' + slot, data);
    } catch (e) {
      console.error('Save failed:', e);
      Game.showToast('存档失败', 'error');
    }
  },

  load(slot = 0) {
    this.currentSlot = slot;
    const data = Storage.get('save_' + slot, null);
    if (!data) return null;
    this._restoreData(data);
    return data;
  },

  autoSave() {
    if (TimeEngine.hour === 18 && TimeEngine.minute < 2) {
      this.save(0);
      Game.showToast('自动存档完成', 'success');
    }
  },

  _collectData() {
    const char = Game.character;
    return {
      version: '1.0.0',
      timestamp: Date.now(),
      difficulty: char?.difficulty || 1,
      character: char,
      time: TimeEngine.save(),
      stocks: StockEngine.save(),
      bots: BotEngine.save(),
      news: NewsEngine.save(),
      criminal: CriminalEngine.save(),
      romance: RomanceEngine.save(),
      events: EventEngine.save(),
      tutorial: TutorialEngine.save(),
      achievements: char?.achievements || [],
    };
  },

  _restoreData(data) {
    TimeEngine.load(data.time);
    StockEngine.load(data.stocks);
    BotEngine.load(data.bots);
    NewsEngine.load(data.news);
    CriminalEngine.load(data.criminal);
    RomanceEngine.load(data.romance);
    EventEngine.load(data.events);
    TutorialEngine.load(data.tutorial);
    if (data.character) {
      Game.character = Object.assign(new Character('', 1), data.character);
    }
  },

  _saveToIndexedDB(key, data) {
    try {
      Storage.idbPut('saves', { id: key, data: JSON.stringify(data), timestamp: Date.now() });
    } catch (e) {
      console.warn('IndexedDB save skipped:', e);
    }
  },

  exportSave() {
    const data = this._collectData();
    const json = JSON.stringify(data, null, 2);
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url; a.download = 'hupiao_save_' + Date.now() + '.json';
    a.click();
    URL.revokeObjectURL(url);
    Game.showToast('存档已导出', 'success');
  },

  importSave(file) {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const data = JSON.parse(e.target.result);
          if (data.version) {
            this._restoreData(data);
            Game.showToast('存档已导入', 'success');
            resolve(true);
          } else { Game.showToast('无效的存档文件', 'error'); resolve(false); }
        } catch { Game.showToast('存档解析失败', 'error'); resolve(false); }
      };
      reader.readAsText(file);
    });
  },

  trimData() {
    const char = Game.character;
    if (!char) return;
    if (char.portfolio) {
      for (const p of char.portfolio) {
        const stock = StockEngine.getStock(p.code);
        if (stock && stock.kline.length > CONFIG.TRIM.MAX_KLINE_DAYS) stock.kline = stock.kline.slice(-CONFIG.TRIM.MAX_KLINE_DAYS);
      }
    }
    if (char.achievements && char.achievements.length > 200) char.achievements = char.achievements.slice(-200);
  },

  getSlots() {
    const slots = [];
    for (let i = 0; i < CONFIG.SAVE.MAX_SLOTS; i++) {
      const data = Storage.get('save_' + i, null);
      slots.push(data ? { slot: i, timestamp: data.timestamp, day: data.time?.day || 0 } : { slot: i, empty: true });
    }
    return slots;
  },
};
