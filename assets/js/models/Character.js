class Character {
  constructor(name, difficulty = 1) {
    this.name = name;
    this.difficulty = difficulty;
    const dc = CONFIG.DIFFICULTY.CONFIG[difficulty];
    this.cash = dc.initCash;
    this.bankBalance = dc.initCash;
    this.securitiesBalance = 0;
    this.hunger = 100;
    this.sleep = 0;
    this.stress = 0;
    this.energy = 100;
    this.notoriety = 0;
    this.hasAccount = false;
    this.portfolio = [];
    this.company = null;
    this.relationships = {};
    this.romance = null;
    this.properties = [];
    this.vehicles = [];
    this.achievements = [];
    this.trades = 0;
    this.totalProfit = 0;
    this.totalLoss = 0;
    this.maxHoldings = 0;
    this.marriageCount = 0;
    this.divorceCount = 0;
    this.crimeCount = 0;
    this.arrestCount = 0;
    this.totalTax = 0;
    this.totalDonation = 0;
    this.propertyCount = 0;
    this.vehicleCount = 0;
    this.bestDay = 0;
    this.worstDay = 0;
    this.longestWinStreak = 0;
    this.longestLoseStreak = 0;
    this._winStreak = 0;
    this._loseStreak = 0;
    this.tutorialDay = 0;
    this.playedDays = 0;
    this.stockWatchlist = [];
    this.guessDailyCount = 0;
    this.investmentSkill = 0;
    this.totalTradeAmount = 0;
    this.maxNetWorth = 0;
  }
  get netWorth() {
    let nw = this.cash + this.bankBalance + this.securitiesBalance;
    if (this.company) nw += this.company.valuation;
    this.properties.forEach(p => nw += p.value - (p.loan || 0));
    this.vehicles.forEach(v => nw += v.value);
    return nw;
  }
  get holdingCount() { return this.portfolio.length; }
  addAchievement(id) { if (!this.achievements.includes(id)) this.achievements.push(id); }
  hasAchievement(id) { return this.achievements.includes(id); }
}
