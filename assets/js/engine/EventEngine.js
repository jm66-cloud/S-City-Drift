const EventEngine = {
  lastEventDay: 0,

  init() {},

  load(data) { if (data) this.lastEventDay = data.lastEventDay || 0; },

  save() { return { lastEventDay: this.lastEventDay }; },

  checkDaily() {
    const char = Game.character;
    if (TimeEngine.day - this.lastEventDay < CONFIG.EVENT.COOLDOWN_DAYS) return;
    if (!Random.chance(CONFIG.EVENT.BASE_CHANCE)) return;
    this.lastEventDay = TimeEngine.day;
    const events = [
      { name: '生病', chance: 0.08, effect: () => { char.hunger -= 20; char.sleep += 30; Modal.show('你生病了', '饱食度-20，困意+30，2小时内效率降低。吃点药吧。'); } },
      { name: '房东卖房', chance: 0.02, effect: () => { Modal.show('房东通知', '房东要卖房，7天内需要搬走。找新房或买房吧。'); } },
      { name: '朋友借钱', chance: 0.05, effect: () => { const target = Random.pick(['阿强', '小李']); const amount = Random.int(10000, 50000); Modal.show('借钱', target + '想借' + Format.money(amount) + '，借吗？', [{ text: '借（好感+10）', action: () => { if (char.cash >= amount) { char.cash -= amount; char.totalDonation += amount; if (char.relationships[target]) char.relationships[target] += 10; } } }, { text: '不借（好感-5）', action: () => { if (char.relationships[target]) char.relationships[target] -= 5; } }]); } },
      { name: '电脑蓝屏', chance: 0.01, effect: () => { Modal.show('电脑蓝屏了', '交易记录可能丢失。花¥200修好，或重启（丢数据）。', [{ text: '花¥200修', action: () => { char.cash -= 200; } }, { text: '重启', action: () => { Game.showToast('部分交易记录丢失', 'warn'); } }]); } },
      { name: '中彩票', chance: 0.005, effect: () => { const prize = Random.int(500, 50000); char.cash += prize; Game.showToast('中了彩票¥' + prize + '！', 'success'); } },
      { name: '诈骗电话', chance: 0.03, effect: () => { const loss = Random.int(CONFIG.EVENT.SCAM_LOSS_MIN, CONFIG.EVENT.SCAM_LOSS_MAX); Modal.show('诈骗电话', '冒充银行/券商要求转账。识破或上当？', [{ text: '识破', action: () => { Game.showToast('好险，差点被骗', 'success'); } }, { text: '转账', action: () => { char.cash -= loss; Game.showToast('被骗了' + Format.money(loss), 'error'); } }]); } },
      { name: '生日', chance: 0.033, effect: () => { Game.showToast('生日快乐！联系人发来祝福', 'success'); for (const name in char.relationships) char.relationships[name] += 3; } },
    ];
    for (const evt of events) {
      if (Random.chance(evt.chance / 0.33)) { evt.effect(); break; }
    }
    UI.updateStatusBar();
  },
};
