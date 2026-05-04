const BotEngine = {
  bots: [],

  init() {
    this.bots = [];
    const strategies = ['trend', 'value', 'momentum', 'meanReversion', 'random', 'arbitrage', 'whale'];
    const names = ['量化一号', '趋势猎手', '价值发现', '短线王', '稳健基金', '游资大佬', '北向资金', '机构专用', '社保基金', '保险资管',
      '私募精选', '公募明星', 'QFII通道', '散户联盟', '高频先锋', '指数跟投', '红利策略', '成长精选', '平衡配置', '对冲基金'];
    for (let i = 0; i < CONFIG.BOT.COUNT; i++) {
      const strategy = strategies[i % strategies.length];
      const params = { aggression: Random.float(0.2, 0.8), riskTolerance: Random.float(0.3, 0.9), holdingPeriod: Random.int(1, 30) };
      this.bots.push(new BotTrader(i, names[i] || 'Bot' + i, strategy, params));
    }
  },

  load(data) {
    if (data && Array.isArray(data)) { this.bots = data.map(b => Object.assign(new BotTrader(), b)); }
  },

  save() { return this.bots; },

  update(gameMinutes) {
    if (!TimeEngine.marketOpen) return;
    for (const bot of this.bots) {
      if (Random.chance(0.1 * gameMinutes)) this._botDecision(bot);
    }
  },

  _botDecision(bot) {
    const stocks = StockEngine.stocks;
    if (stocks.length === 0) return;
    switch (bot.strategy) {
      case 'trend': this._trendTrade(bot, stocks); break;
      case 'value': this._valueTrade(bot, stocks); break;
      case 'momentum': this._momentumTrade(bot, stocks); break;
      case 'meanReversion': this._meanReversionTrade(bot, stocks); break;
      case 'whale': this._whaleTrade(bot, stocks); break;
      default: this._randomTrade(bot, stocks); break;
    }
  },

  _trendTrade(bot, stocks) {
    const topTrend = [...stocks].sort((a, b) => b.trend - a.trend).slice(0, 5);
    if (topTrend.length === 0) return;
    const target = Random.pick(topTrend);
    const quantity = Math.floor(bot.cash * 0.1 / target.price / 100) * 100;
    if (quantity > 0 && bot.cash > target.price * quantity) {
      bot.cash -= target.price * quantity;
      bot.portfolio.push({ code: target.code, quantity, entryPrice: target.price, currentPrice: target.price });
      bot.totalTrades++;
    }
  },

  _valueTrade(bot, stocks) {
    const undervalued = stocks.filter(s => s.price < s.fundamentals.score * 0.8);
    if (undervalued.length === 0) return;
    const target = Random.pick(undervalued);
    const quantity = Math.floor(bot.cash * 0.15 / target.price / 100) * 100;
    if (quantity > 0 && bot.cash > target.price * quantity) {
      bot.cash -= target.price * quantity;
      bot.portfolio.push({ code: target.code, quantity, entryPrice: target.price, currentPrice: target.price });
      bot.totalTrades++;
    }
  },

  _momentumTrade(bot, stocks) {
    const sorted = [...stocks].sort((a, b) => b.change - a.change);
    for (const s of sorted) {
      const holding = bot.portfolio.find(p => p.code === s.code);
      if (holding) {
        if (s.change > 0.05) {
          bot.cash += s.price * holding.quantity;
          bot.portfolio = bot.portfolio.filter(p => p.code !== s.code);
          return;
        } else if (s.change < -0.05) {
          bot.cash += s.price * holding.quantity;
          bot.portfolio = bot.portfolio.filter(p => p.code !== s.code);
          return;
        }
      }
    }
    if (sorted.length > 0 && Random.chance(0.3)) {
      const target = sorted[0];
      const quantity = Math.floor(bot.cash * 0.1 / target.price / 100) * 100;
      if (quantity > 0 && bot.cash > target.price * quantity) {
        bot.cash -= target.price * quantity;
        bot.portfolio.push({ code: target.code, quantity, entryPrice: target.price, currentPrice: target.price });
        bot.totalTrades++;
      }
    }
  },

  _meanReversionTrade(bot, stocks) {
    const extreme = [...stocks].sort((a, b) => Math.abs(b.change) - Math.abs(a.change))[0];
    if (!extreme) return;
    const existing = bot.portfolio.find(p => p.code === extreme.code);
    if (existing) {
      bot.cash += extreme.price * existing.quantity;
      bot.portfolio = bot.portfolio.filter(p => p.code !== extreme.code);
      return;
    }
    const quantity = Math.floor(bot.cash * 0.1 / extreme.price / 100) * 100;
    if (quantity > 0 && bot.cash > extreme.price * quantity) {
      bot.cash -= extreme.price * quantity;
      bot.portfolio.push({ code: extreme.code, quantity, entryPrice: extreme.price, currentPrice: extreme.price });
      bot.totalTrades++;
    }
  },

  _whaleTrade(bot, stocks) {
    const target = Random.pick(stocks);
    const quantity = Math.floor(bot.cash * 0.3 / target.price / 100) * 100;
    if (quantity > 0 && bot.cash > target.price * quantity) {
      bot.cash -= target.price * quantity;
      bot.portfolio.push({ code: target.code, quantity, entryPrice: target.price, currentPrice: target.price });
      target.price *= 1.02;
      bot.totalTrades++;
    }
  },

  _randomTrade(bot, stocks) {
    const target = Random.pick(stocks);
    if (!target) return;
    if (Random.chance(0.5)) {
      const quantity = Math.floor(bot.cash * 0.05 / target.price / 100) * 100;
      if (quantity > 0 && bot.cash > target.price * quantity) {
        bot.cash -= target.price * quantity;
        bot.portfolio.push({ code: target.code, quantity, entryPrice: target.price, currentPrice: target.price });
      }
    } else {
      const holding = bot.portfolio.find(p => p.code === target.code);
      if (holding && Random.chance(0.5)) {
        bot.cash += target.price * holding.quantity;
        bot.portfolio = bot.portfolio.filter(p => p.code !== target.code);
      }
    }
    bot.totalTrades++;
  },

  updateBotPortfolios() {
    for (const bot of this.bots) {
      for (const pos of bot.portfolio) {
        const stock = StockEngine.getStock(pos.code);
        if (stock) pos.currentPrice = stock.price;
      }
    }
  },
};
