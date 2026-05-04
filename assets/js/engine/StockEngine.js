const StockEngine = {
  stocks: [],
  marketOpen: false,

  init() {
    this.stocks = [];
    const industries = Object.keys(INDUSTRY_DATA || {});
    for (let i = 0; i < CONFIG.STOCK.COUNT; i++) {
      const ind = industries[i % industries.length] || 'other';
      const indData = (INDUSTRY_DATA || {})[ind] || { name: '其他', baseScore: 50 };
      const fundamentals = {
        score: Random.int(indData.baseScore - 20, indData.baseScore + 20),
        pe: Random.float(10, 40),
        pb: Random.float(0.5, 5),
        revenue: [Random.int(50, 500), Random.int(50, 500), Random.int(50, 500)],
      };
      fundamentals.score = Math.max(10, Math.min(90, fundamentals.score));
      const code = String(600000 + i).slice(0, 6);
      const name = STOCK_NAMES ? (STOCK_NAMES[i] || ind + i) : ind + i;
      const stock = new Stock(code, name, ind, fundamentals);
      stock.price = fundamentals.score * 2 * (0.8 + Math.random() * 0.4);
      stock.prevClose = stock.price;
      this.stocks.push(stock);
    }
  },

  load(data) {
    if (data && Array.isArray(data)) { this.stocks = data.map(s => Object.assign(new Stock(), s)); }
  },

  save() { return this.stocks; },

  getStock(code) { return this.stocks.find(s => s.code === code); },
  getStockByName(name) { return this.stocks.find(s => s.name.includes(name)); },
  getWatchlist() { return this.stocks.filter(s => s.watchlist); },
  getHotStocks(n = 20) { return [...this.stocks].sort((a, b) => Math.abs(b.change) - Math.abs(a.change)).slice(0, n); },

  update(gameMinutes) {
    if (!TimeEngine.marketOpen) return;
    this.marketOpen = true;
    const cycleMul = TimeEngine._economyMultiplier || 1;
    for (const stock of this.stocks) {
      const basePrice = stock.fundamentals.score * 2;
      const drift = (stock.fundamentals.score - 50) * 0.0001 + (cycleMul - 1) * 0.01;
      const noise = Random.normal(0, stock.volatility || 0.005);
      const newsEffect = stock.newsImpact || 0;
      stock.newsImpact = 0;
      const newPrice = stock.price * (1 + drift + noise) * (1 + newsEffect * gameMinutes / 10);
      stock.updatePrice(Math.max(0.01, newPrice));
      stock.volume += Math.floor(Math.abs(stock.price - stock.prevClose) * 10000 * gameMinutes);
      this._synthesizeOrderBook(stock);
    }
  },

  _synthesizeOrderBook(stock) {
    const mid = stock.price;
    const spread = mid * 0.002;
    stock.orderBook = { asks: [], bids: [] };
    for (let i = 0; i < 5; i++) {
      const askPrice = mid + spread * (i + 1) * (0.9 + Math.random() * 0.2);
      const bidPrice = mid - spread * (i + 1) * (0.9 + Math.random() * 0.2);
      stock.orderBook.asks.push({ price: askPrice, volume: Random.int(100, 500) * (i + 1) });
      stock.orderBook.bids.push({ price: bidPrice, volume: Random.int(100, 500) * (i + 1) });
    }
  },

  executeOrder(order) {
    const stock = this.getStock(order.stockCode);
    if (!stock) return { success: false, reason: '股票不存在' };
    const char = Game.character;
    const cost = order.price * order.quantity;
    const commission = Math.max(CONFIG.TRADE.MIN_COMMISSION, cost * CONFIG.TRADE.COMMISSION_RATE);
    const stampDuty = order.direction === 'sell' ? cost * CONFIG.TRADE.STAMP_DUTY_RATE : 0;
    const totalCost = cost + commission + stampDuty;
    if (order.direction === 'buy') {
      if (char.securitiesBalance < totalCost) return { success: false, reason: '资金不足' };
      char.securitiesBalance -= totalCost;
      const existing = char.portfolio.find(p => p.code === order.stockCode);
      if (existing) { existing.quantity += order.quantity; existing.costBasis = (existing.costBasis * existing.quantity + cost) / (existing.quantity + order.quantity); }
      else char.portfolio.push({ code: order.stockCode, name: stock.name, quantity: order.quantity, costBasis: order.price });
    } else {
      const holding = char.portfolio.find(p => p.code === order.stockCode);
      if (!holding || holding.quantity < order.quantity) return { success: false, reason: '持仓不足' };
      const profit = (order.price - holding.costBasis) * order.quantity;
      holding.quantity -= order.quantity;
      if (profit > 0) { char.totalProfit += profit; char._winStreak++; char._loseStreak = 0; }
      else { char.totalLoss += Math.abs(profit); char._loseStreak++; char._winStreak = 0; }
      char.securitiesBalance += cost - commission - stampDuty;
      if (holding.quantity <= 0) char.portfolio = char.portfolio.filter(p => p.code !== order.stockCode);
    }
    char.trades++;
    char.totalTradeAmount += cost;
    order.status = 'filled';
    order.filledAt = Date.now();
    StockEngine._updateBestWorst(char);
    SoundEngine.play('trade');
    return { success: true };
  },

  _updateBestWorst(char) {
    const dailyChange = char.totalProfit - char.totalLoss;
    if (dailyChange > char.bestDay) char.bestDay = dailyChange;
    if (dailyChange < char.worstDay) char.worstDay = dailyChange;
  },

  closeMarket() {
    this.marketOpen = false;
    for (const stock of this.stocks) stock.closeDay();
  },
};
