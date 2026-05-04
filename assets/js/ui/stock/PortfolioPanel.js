const PortfolioPanel = {
  render(containerId) {
    const el = document.getElementById(containerId);
    if (!el) return;
    const char = Game.character;
    if (!char) return;
    const pf = char.portfolio;
    if (pf.length === 0) { el.innerHTML = '<div style="padding:12px;text-align:center;color:#808080;">暂无持仓</div>'; return; }
    el.innerHTML = '<div class="pf-header"><span style="width:80px;">名称</span><span style="width:60px;text-align:right;">数量</span><span style="width:70px;text-align:right;">成本价</span><span style="width:70px;text-align:right;">现价</span><span style="width:70px;text-align:right;">盈亏</span></div>'
      + pf.map(p => {
        const stock = StockEngine.getStock(p.code);
        const currentPrice = stock ? stock.price : p.costBasis;
        const profit = (currentPrice - p.costBasis) * p.quantity;
        return '<div class="pf-row">'
          + '<span style="width:80px;">' + (stock?.name || p.code) + '</span>'
          + '<span style="width:60px;text-align:right;">' + p.quantity + '</span>'
          + '<span style="width:70px;text-align:right;">' + p.costBasis.toFixed(2) + '</span>'
          + '<span style="width:70px;text-align:right;">' + currentPrice.toFixed(2) + '</span>'
          + '<span style="width:70px;text-align:right;" class="' + (profit >= 0 ? 'text-up' : 'text-down') + '">' + Format.money(profit) + '</span>'
          + '</div>';
      }).join('')
      + '<div style="margin-top:8px;padding:4px;border-top:1px solid #333;font-size:12px;">'
      + '持仓市值: ' + Format.money(pf.reduce((s, p) => { const st = StockEngine.getStock(p.code); return s + p.quantity * (st ? st.price : p.costBasis); }, 0))
      + ' | 证券余额: ' + Format.money(char.securitiesBalance)
      + '</div>';
  },
};
