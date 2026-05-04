const StockListPanel = {
  render(containerId, watchlistOnly, query) {
    const el = document.getElementById(containerId);
    if (!el) return;
    let stocks = StockEngine.stocks;
    if (watchlistOnly) stocks = stocks.filter(s => s.watchlist);
    if (query) stocks = stocks.filter(s => s.name.includes(query) || s.code.includes(query));
    el.innerHTML = '<div class="sl-header"><span class="sl-code">代码</span><span class="sl-name">名称</span><span class="sl-price">最新价</span><span class="sl-change">涨幅</span></div>'
      + stocks.slice(0, 50).map(s => '<div class="sl-row" onclick="StockApp.selectStock(StockEngine.getStock(\'' + s.code + '\'))">'
        + '<span class="sl-code">' + s.code + '</span>'
        + '<span class="sl-name">' + s.name + '</span>'
        + '<span class="sl-price">' + s.price.toFixed(2) + '</span>'
        + '<span class="sl-change ' + (s.change >= 0 ? 'text-up' : 'text-down') + '">' + Format.percent(s.change) + '</span>'
        + '</div>').join('');
  },
};
