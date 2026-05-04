const TradeForm = {
  render(containerId, stock) {
    const el = document.getElementById(containerId);
    if (!el || !stock) return;
    el.innerHTML = '<div class="trade-form"><div style="font-size:13px;font-weight:bold;margin-bottom:6px;">' + stock.name + ' (' + stock.code + ')</div>'
      + '<div class="tf-row">现价: <span class="' + (stock.change >= 0 ? 'text-up' : 'text-down') + '">¥' + stock.price.toFixed(2) + '</span></div>'
      + '<div class="tf-row">数量: <input type="number" id="trade-qty" value="100" min="100" step="100" style="width:80px;"> 股</div>'
      + '<div class="tf-row">金额: <span id="trade-amount">¥' + (stock.price * 100).toFixed(2) + '</span></div>'
      + '<div class="tf-btns"><button onclick="TradeForm.buy()" style="background:#cc3333;">买入</button><button onclick="TradeForm.sell()" style="background:#33aa33;">卖出</button></div>'
      + '<div id="trade-result" style="margin-top:6px;font-size:12px;"></div>'
      + '<div style="margin-top:6px;font-size:11px;color:#808080;">佣金万三 | 印花税千一 | 1手=100股</div></div>';
    document.getElementById('trade-qty')?.addEventListener('input', () => {
      const qty = parseInt(document.getElementById('trade-qty')?.value) || 0;
      document.getElementById('trade-amount').textContent = '¥' + (stock.price * qty).toFixed(2);
    });
  },

  buy() {
    const stock = StockApp.selectedStock;
    if (!stock) return;
    const qty = parseInt(document.getElementById('trade-qty')?.value) || 100;
    if (qty % 100 !== 0 || qty <= 0) { TradeForm._result('数量必须是100的倍数', 'error'); return; }
    const order = new Order(stock.code, 'market', 'buy', stock.price, qty);
    const result = StockEngine.executeOrder(order);
    if (result.success) {
      TradeForm._result('买入成功: ' + stock.name + ' ' + qty + '股，价格¥' + stock.price.toFixed(2), 'success');
      UI.updateStatusBar();
      PortfolioPanel.render('portfolio-panel');
    } else {
      TradeForm._result('买入失败: ' + (result.reason || '未知错误'), 'error');
    }
  },

  sell() {
    const stock = StockApp.selectedStock;
    if (!stock) return;
    const qty = parseInt(document.getElementById('trade-qty')?.value) || 100;
    if (qty % 100 !== 0 || qty <= 0) { TradeForm._result('数量必须是100的倍数', 'error'); return; }
    const order = new Order(stock.code, 'market', 'sell', stock.price, qty);
    const result = StockEngine.executeOrder(order);
    if (result.success) {
      TradeForm._result('卖出成功: ' + stock.name + ' ' + qty + '股，价格¥' + stock.price.toFixed(2), 'success');
      UI.updateStatusBar();
      PortfolioPanel.render('portfolio-panel');
    } else {
      TradeForm._result('卖出失败: ' + (result.reason || '未知错误'), 'error');
    }
  },

  _result(msg, type) {
    const el = document.getElementById('trade-result');
    if (el) { el.textContent = msg; el.style.color = type === 'error' ? '#ff4444' : '#00c853'; }
  },
};
