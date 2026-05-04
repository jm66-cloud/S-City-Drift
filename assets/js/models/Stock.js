class Stock {
  constructor(code, name, industry, fundamentals) {
    this.code = code;
    this.name = name;
    this.industry = industry;
    this.fundamentals = fundamentals || { score: 50, pe: 15, pb: 1.5, revenue: [] };
    this.price = (fundamentals ? fundamentals.score * 2 : 100);
    this.open = this.price;
    this.close = this.price;
    this.high = this.price;
    this.low = this.price;
    this.prevClose = this.price;
    this.volume = 0;
    this.kline = [];
    this.intraday = [];
    this.orderBook = { bids: [], asks: [] };
    this.watchlist = false;
    this.volatility = 0.005;
    this.trend = 0;
    this.newsImpact = 0;
  }
  get change() { return this.prevClose > 0 ? (this.price - this.prevClose) / this.prevClose : 0; }
  get changePercent() { return this.change * 100; }
  updatePrice(newPrice) {
    this.prevClose = this.close;
    this.price = Math.max(0.01, newPrice);
    if (this.price > this.high) this.high = this.price;
    if (this.price < this.low) this.low = this.price;
  }
  closeDay() {
    this.open = this.price;
    this.close = this.price;
    this.high = this.price;
    this.low = this.price;
    this.volume = 0;
    this.kline.push({ open: this.open, close: this.close, high: this.high, low: this.low, volume: this.volume, price: this.price });
    if (this.kline.length > CONFIG.TRIM.MAX_KLINE_DAYS) this.kline.shift();
    this.intraday = [];
  }
  applyNewsImpact(impact) {
    this.newsImpact = impact;
    this.price *= (1 + impact);
    this.price = Math.max(0.01, this.price);
  }
}
