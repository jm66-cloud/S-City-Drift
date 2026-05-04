const NewsEngine = {
  todayNews: [],
  allNews: [],

  init() {},

  load(data) {
    if (data) { this.allNews = data.allNews || []; this.todayNews = data.todayNews || []; }
  },

  save() { return { allNews: this.allNews, todayNews: this.todayNews }; },

  generate() {
    this.todayNews = [];
    const char = Game.character;
    const watchlist = char.stockWatchlist || [];
    const hotStocks = StockEngine.getHotStocks(10);
    const pool = [];
    for (const code of watchlist) { const s = StockEngine.getStock(code); if (s) pool.push(s); }
    for (const s of hotStocks) { if (!pool.find(p => p.code === s.code)) pool.push(s); }
    if (pool.length === 0) { pool.push(...StockEngine.stocks.slice(0, 10)); }
    const count = Random.int(CONFIG.NEWS.PER_MORNING_MIN, CONFIG.NEWS.PER_MORNING_MAX);
    for (let i = 0; i < count && pool.length > 0; i++) {
      const stock = Random.pick(pool);
      const news = this._generateForStock(stock);
      if (news) this.todayNews.push(news);
    }
    this.allNews.push(...this.todayNews);
    if (this.allNews.length > 500) this.allNews = this.allNews.slice(-500);
    return this.todayNews;
  },

  _generateForStock(stock) {
    const types = Object.keys(NEWS_TEMPLATES || {});
    if (types.length === 0) return null;
    const type = Random.pick(types);
    const templates = NEWS_TEMPLATES[type];
    if (!templates || templates.length === 0) return null;
    const template = Random.pick(templates);
    const title = template.title
      .replace('{company}', stock.name)
      .replace('{industry}', INDUSTRY_DATA?.[stock.industry]?.name || stock.industry)
      .replace('{X}', String(Random.int(10, 90)))
      .replace('{Y}', String(Random.int(5, 50)))
      .replace('{name}', Random.pick(['张', '李', '王', '赵']) + '某');
    let impact = 0;
    switch (type) {
      case 'earnings_good': impact = Random.float(0.03, 0.08); break;
      case 'earnings_bad': impact = Random.float(-0.08, -0.03); break;
      case 'corruption': impact = Random.float(-0.15, -0.05); break;
      case 'war': impact = Random.float(-0.10, -0.02); break;
      case 'policy_good': impact = Random.float(0.03, 0.10); break;
      case 'policy_bad': impact = Random.float(-0.08, -0.03); break;
      case 'contract': impact = Random.float(0.02, 0.06); break;
      case 'accident': impact = Random.float(-0.12, -0.04); break;
      case 'technology': impact = Random.float(0.02, 0.05); break;
      case 'disaster': impact = Random.float(-0.06, -0.02); break;
      case 'merger': impact = Random.float(0.02, 0.05); break;
    }
    impact += Random.float(-0.01, 0.01);
    stock.newsImpact = impact;
    const article = new NewsArticle(type, title, title, impact, [stock.code]);
    return article;
  },

  getTodaysNews() { return this.todayNews; },
  getRecentNews(n = 30) { return this.allNews.slice(-n); },
};
