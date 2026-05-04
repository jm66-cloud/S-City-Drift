const TimeEngine = {
  day: 1,
  hour: 7,
  minute: 0,
  second: 0,
  totalMinutes: 0,
  marketOpen: false,
  period: 'morning',
  _cycleDay: 0,
  _cycleType: 'recovery',
  _cycleDaysLeft: 60,
  _economyMultiplier: 1.0,

  init() {
    this.day = 1;
    this.hour = 7;
    this.minute = 0;
    this.second = 0;
    this.totalMinutes = 0;
    this.marketOpen = false;
    this.period = 'morning';
    this._cycleDay = 0;
    this._cycleType = 'recovery';
    this._cycleDaysLeft = Random.int(CONFIG.CYCLE.MIN_DAYS, CONFIG.CYCLE.MAX_DAYS);
    this._economyMultiplier = CONFIG.CYCLE.RECOVERY;
    this.updatePeriod();
  },

  load(data) {
    if (!data) return;
    this.day = data.day || 1;
    this.hour = data.hour || 7;
    this.minute = data.minute || 0;
    this.second = data.second || 0;
    this.totalMinutes = data.totalMinutes || 0;
    this._cycleDay = data._cycleDay || 0;
    this._cycleType = data._cycleType || 'recovery';
    this._cycleDaysLeft = data._cycleDaysLeft || 60;
    this._economyMultiplier = data._economyMultiplier || 1.0;
    this.updatePeriod();
  },

  save() {
    return {
      day: this.day, hour: this.hour, minute: this.minute, second: this.second,
      totalMinutes: this.totalMinutes, _cycleDay: this._cycleDay,
      _cycleType: this._cycleType, _cycleDaysLeft: this._cycleDaysLeft,
      _economyMultiplier: this._economyMultiplier,
    };
  },

  advance(gameMinutes) {
    this.totalMinutes += gameMinutes;
    let totalSec = this.second + gameMinutes * 60;
    let extraMin = Math.floor(totalSec / 60);
    this.second = totalSec % 60;
    this.minute += extraMin;
    let extraHour = Math.floor(this.minute / 60);
    this.minute = this.minute % 60;
    this.hour += extraHour;
    let extraDay = Math.floor(this.hour / 24);
    this.hour = this.hour % 24;
    if (extraDay > 0) {
      this.day += extraDay;
      this._cycleDay += extraDay;
      this._cycleDaysLeft -= extraDay;
      if (this._cycleDaysLeft <= 0) this._switchCycle();
    }
    this.updatePeriod();
  },

  setTime(h, m, s) {
    this.hour = h; this.minute = m || 0; this.second = s || 0;
    this.updatePeriod();
  },

  updatePeriod() {
    const h = this.hour;
    this.marketOpen = h >= CONFIG.TIME.MARKET_OPEN_HOUR && h < CONFIG.TIME.MARKET_CLOSE_HOUR;
    if (h >= 5 && h < 8) this.period = 'morning';
    else if (this.marketOpen) this.period = 'trading';
    else if (h >= 18 && h < 23) this.period = 'evening';
    else this.period = 'night';
  },

  get isTradingTime() { return this.marketOpen; },
  get timeStr() { return Format.time(this.hour, this.minute); },
  get timeStrFull() { return Format.timeWithSec(this.hour, this.minute, this.second); },
  get dayStr() { return '第 ' + this.day + ' 天'; },
  get fullDateStr() { return this.dayStr + ' ' + this.timeStrFull; },
  get cycleStr() {
    const names = { boom: '繁荣', recession: '衰退', depression: '萧条', recovery: '复苏' };
    return names[this._cycleType] || '复苏';
  },

  _switchCycle() {
    const cycles = ['boom', 'recession', 'depression', 'recovery'];
    const multipliers = { boom: CONFIG.CYCLE.BOOM, recession: CONFIG.CYCLE.RECESSION, depression: CONFIG.CYCLE.DEPRESSION, recovery: CONFIG.CYCLE.RECOVERY };
    let idx = cycles.indexOf(this._cycleType);
    if (this._cycleType === 'recovery') idx = Random.chance(0.5) ? 0 : 1;
    else if (this._cycleType === 'boom') idx = Random.chance(0.6) ? 1 : 3;
    else if (this._cycleType === 'recession') idx = Random.chance(0.5) ? 2 : 3;
    else idx = 3;
    this._cycleType = cycles[idx];
    this._economyMultiplier = multipliers[this._cycleType];
    this._cycleDaysLeft = Random.int(CONFIG.CYCLE.MIN_DAYS, CONFIG.CYCLE.MAX_DAYS);
    this._cycleDay = 0;
    Modal.show('经济周期切换', '市场进入「' + this.cycleStr + '」期，预计持续 ' + this._cycleDaysLeft + ' 天。');
  },
};
