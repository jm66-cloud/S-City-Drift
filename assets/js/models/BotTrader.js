class BotTrader {
  constructor(id, name, strategy, params) {
    this.id = id;
    this.name = name;
    this.strategy = strategy;
    this.params = params;
    this.cash = CONFIG.FINANCE.BOT_INIT_CASH;
    this.portfolio = [];
    this.totalTrades = 0;
    this.totalProfit = 0;
    this.initialCash = CONFIG.FINANCE.BOT_INIT_CASH;
  }
  get netWorth() {
    let nw = this.cash;
    this.portfolio.forEach(p => nw += p.quantity * p.currentPrice);
    return nw;
  }
  get totalReturn() { return (this.netWorth - this.initialCash) / this.initialCash; }
  get holdings() { return this.portfolio.length; }
}
