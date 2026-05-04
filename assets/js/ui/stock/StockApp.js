const StockApp = {
  currentView: '行情',
  selectedStock: null,

  open(bodyEl) {
    bodyEl.innerHTML = '<div class="stock-app">'
      + '<div class="stock-layout">'
      + '<div class="stock-sidebar">'
      + '<div class="nav-item active" data-view="行情" onclick="StockApp.switchView(\'行情\')">📊 行情</div>'
      + '<div class="nav-item" data-view="交易" onclick="StockApp.switchView(\'交易\')">💰 交易</div>'
      + '<div class="nav-item" data-view="持仓" onclick="StockApp.switchView(\'持仓\')">📦 持仓</div>'
      + '<div class="nav-item" data-view="账户" onclick="StockApp.switchView(\'账户\')">🏦 账户</div>'
      + '<div class="nav-item" data-view="自选" onclick="StockApp.switchView(\'自选\')">⭐ 自选</div>'
      + '<div class="nav-item" data-view="委托" onclick="StockApp.switchView(\'委托\')">📋 委托</div>'
      + '</div>'
      + '<div class="stock-main" id="stock-main"><div class="stock-list-panel" id="stock-list-panel"></div></div>'
      + '<div class="stock-right" id="stock-right"></div>'
      + '</div>'
      + '<div style="padding:4px 8px;font-size:12px;border-top:1px solid #000;display:flex;gap:16px;">'
      + '<span id="stock-market-info">大盘: -- | 成交: --</span>'
      + '<input id="stock-search" class="sl-search" style="width:150px;font-size:12px;" placeholder="搜索股票..." oninput="StockApp.search(this.value)">'
      + '</div></div>';
    this.selectedStock = StockEngine.stocks[0] || null;
    this.switchView('行情');
  },

  switchView(view) {
    this.currentView = view;
    document.querySelectorAll('.stock-sidebar .nav-item').forEach(n => n.classList.remove('active'));
    document.querySelector('.stock-sidebar .nav-item[data-view="' + view + '"]')?.classList.add('active');
    const main = document.getElementById('stock-main');
    const right = document.getElementById('stock-right');
    if (!main) return;
    switch (view) {
      case '行情':
        StockListPanel.render('stock-list-panel');
        if (this.selectedStock) {
          right.innerHTML = '<div id="stock-chart-area" class="stock-chart-area" style="height:180px;"><canvas id="kline-canvas"></canvas></div>'
            + '<div id="stock-orderbook"></div>';
          KLineChart.render('kline-canvas', this.selectedStock);
          OrderBook.render('stock-orderbook', this.selectedStock);
        }
        break;
      case '交易':
        StockListPanel.render('stock-list-panel');
        if (this.selectedStock) {
          right.innerHTML = '<div id="trade-form"></div>';
          TradeForm.render('trade-form', this.selectedStock);
        }
        break;
      case '持仓':
        main.innerHTML = '<div id="portfolio-panel" class="portfolio-panel"></div>';
        right.innerHTML = '';
        PortfolioPanel.render('portfolio-panel');
        break;
      case '账户':
        main.innerHTML = '<div id="account-panel" class="account-panel"></div>';
        right.innerHTML = '';
        AccountPanel.render('account-panel');
        break;
      case '自选':
        StockListPanel.render('stock-list-panel', true);
        right.innerHTML = '';
        break;
      case '委托':
        main.innerHTML = '<div id="order-history"></div>';
        right.innerHTML = '';
        OrderHistory.render('order-history');
        break;
    }
    this._updateMarketInfo();
  },

  selectStock(stock) {
    this.selectedStock = stock;
    this.switchView(this.currentView);
  },

  search(query) {
    const panel = document.getElementById('stock-list-panel');
    if (!panel) return;
    StockListPanel.render('stock-list-panel', false, query);
  },

  _updateMarketInfo() {
    const el = document.getElementById('stock-market-info');
    if (!el) return;
    const top = StockEngine.stocks.slice(0, 5);
    const avgChange = top.length > 0 ? top.reduce((s, st) => s + st.change, 0) / top.length : 0;
    el.textContent = '大盘: 上证 ' + (3000 + avgChange * 100).toFixed(2) + ' ' + Format.percentNum(avgChange) + ' | 成交: ' + Format.short(top.reduce((s, st) => s + st.volume, 0)) + '';
  },
};
