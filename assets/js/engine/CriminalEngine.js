const CriminalEngine = {
  records: [],
  accumulatedRisk: 0,

  init() {},

  load(data) {
    if (data) { this.records = data.records || []; this.accumulatedRisk = data.accumulatedRisk || 0; }
  },

  save() { return { records: this.records, accumulatedRisk: this.accumulatedRisk }; },

  embezzle(amount) {
    const char = Game.character;
    if (!char.company) return { success: false, reason: '没有公司' };
    const maxEmbezzle = Math.floor(char.company.cash * CONFIG.CRIME.EMBEZZLE_MAX_RATIO);
    if (amount > maxEmbezzle) return { success: false, reason: '最多挪用 ' + Format.money(maxEmbezzle) };
    char.company.cash -= amount;
    char.cash += amount;
    const crime = new Crime('embezzle', amount, '挪用公款 ¥' + amount);
    crime.risk = this._calcRisk('embezzle', amount);
    this.records.push(crime);
    this.accumulatedRisk += crime.risk;
    char.crimeCount++;
    char.notoriety = Math.min(100, char.notoriety + 10);
    CharacterEngine.stressFrom('crime', CONFIG.CHARACTER.STRESS_CRIME);
    Game.showToast('资金已转移，风险: ' + (crime.risk * 100).toFixed(1) + '%', 'warn');
    return { success: true };
  },

  insiderTrade(stockCode, amount) {
    const char = Game.character;
    if (!char.company || !char.company.isPublic) return { success: false, reason: '需要上市公司' };
    const profit = Math.floor(amount * Random.float(0.2, 0.5));
    char.cash += profit;
    const crime = new Crime('insider', amount, '内幕交易 ' + (StockEngine.getStock(stockCode)?.name || stockCode));
    crime.risk = this._calcRisk('insider', amount) + char.notoriety * 0.001;
    this.records.push(crime);
    this.accumulatedRisk += crime.risk;
    char.crimeCount++;
    char.notoriety = Math.min(100, char.notoriety + 8);
    CharacterEngine.stressFrom('crime', CONFIG.CHARACTER.STRESS_CRIME);
    return { success: true, profit };
  },

  fraud(fraudPercent) {
    const char = Game.character;
    if (!char.company || !char.company.isPublic) return { success: false, reason: '需要上市公司' };
    const savedTax = Math.floor(char.company.profit * CONFIG.COMPANY.TAX_RATE * fraudPercent);
    char.company.cash += savedTax;
    const crime = new Crime('fraud', savedTax, '财务造假 ' + (fraudPercent * 100).toFixed(0) + '%');
    crime.risk = this._calcRisk('fraud', savedTax) + fraudPercent * 0.5;
    this.records.push(crime);
    this.accumulatedRisk += crime.risk;
    char.crimeCount++;
    char.notoriety = Math.min(100, char.notoriety + 15);
    CharacterEngine.stressFrom('crime', CONFIG.CHARACTER.STRESS_CRIME);
    return { success: true };
  },

  bribe(amount) {
    const char = Game.character;
    if (char.cash < amount) return { success: false, reason: '资金不足' };
    char.cash -= amount;
    const crime = new Crime('bribe', amount, '行贿 ¥' + amount);
    crime.risk = this._calcRisk('bribe', amount);
    this.records.push(crime);
    this.accumulatedRisk += crime.risk;
    char.crimeCount++;
    char.notoriety = Math.min(100, char.notoriety + 5);
    return { success: true };
  },

  taxEvasion(hidePercent) {
    const char = Game.character;
    const hiddenIncome = Math.floor(char.totalProfit * hidePercent);
    const saved = Math.floor(hiddenIncome * 0.2);
    char.cash += saved;
    const crime = new Crime('tax', hiddenIncome, '偷税 ¥' + hiddenIncome);
    crime.risk = this._calcRisk('tax', hiddenIncome);
    this.records.push(crime);
    this.accumulatedRisk += crime.risk;
    char.crimeCount++;
    return { success: true, saved };
  },

  _calcRisk(type, amount) {
    const baseRate = CONFIG.CRIME.AUDIT_BASE_RATE;
    const perAction = CONFIG.CRIME.RISK_PER_ACTION;
    const amountFactor = Math.sqrt(amount) * 0.01;
    const dc = CONFIG.DIFFICULTY.CONFIG[Game.character.difficulty || 1];
    const diffFactor = dc.crimeRate || 1;
    return Math.min(0.95, (baseRate + perAction + amountFactor) * diffFactor);
  },

  monthlyAudit() {
    const char = Game.character;
    if (char.playedDays <= CONFIG.NEWBIE.PROTECTION_DAYS) return;
    const totalRisk = this.accumulatedRisk;
    if (Random.chance(totalRisk)) {
      const undiscovered = this.records.filter(r => !r.discovered && !r.settled);
      if (undiscovered.length === 0) return;
      const totalIllegal = undiscovered.reduce((s, r) => s + r.amount, 0);
      Modal.show('审计通知', '证监会/税务局对你展开调查！\n涉及金额: ' + Format.money(totalIllegal));
      if (totalIllegal > CONFIG.CRIME.JAIL_THRESHOLD || Random.chance(0.3)) {
        Game.endGame('jail', '因非法所得' + Format.money(totalIllegal) + '，被判有期徒刑。');
      } else {
        const fine = Math.floor(totalIllegal * 2);
        char.cash -= fine;
        char.totalTax += fine;
        for (const r of undiscovered) r.discovered = true;
        char.arrestCount++;
        this.accumulatedRisk = 0;
        Game.showToast('罚款 ' + Format.money(fine) + '，案件了结', 'error');
      }
    }
  },

  destroyEvidence() {
    const char = Game.character;
    if (char.cash < CONFIG.CRIME.EVIDENCE_DESTROY_COST) return { success: false, reason: '资金不足' };
    char.cash -= CONFIG.CRIME.EVIDENCE_DESTROY_COST;
    this.accumulatedRisk = Math.max(0, this.accumulatedRisk * 0.5);
    return { success: true };
  },

  scapegoat() {
    const char = Game.character;
    if (char.cash < CONFIG.CRIME.SCAPEGOAT_COST) return { success: false, reason: '资金不足' };
    char.cash -= CONFIG.CRIME.SCAPEGOAT_COST;
    this.accumulatedRisk = 0;
    char.notoriety = Math.min(100, char.notoriety + 10);
    return { success: true };
  },

  moneyLaundering(amount) {
    const char = Game.character;
    const fee = Math.floor(amount * 0.2);
    if (char.cash < amount + fee) return { success: false, reason: '资金不足' };
    char.cash -= fee;
    this.accumulatedRisk *= 0.7;
    for (const r of this.records) { if (!r.settled) r.settled = true; }
    return { success: true };
  },
};
