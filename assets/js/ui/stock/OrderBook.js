const OrderBook = {
  render(containerId, stock) {
    const el = document.getElementById(containerId);
    if (!el || !stock) return;
    const ob = stock.orderBook || { asks: [], bids: [] };
    el.innerHTML = '<div class="stock-orderbook"><div style="font-size:12px;font-weight:bold;margin-bottom:4px;">五档盘口</div>'
      + ob.asks.slice(0, 5).reverse().map(a => '<div class="ob-row ask"><span>卖' + '⑤④③②①'[ob.asks.indexOf(a)] + '</span><span>' + a.price.toFixed(2) + '</span><span>' + a.volume + '</span></div>').join('')
      + '<div class="ob-mid">' + stock.price.toFixed(2) + '</div>'
      + ob.bids.slice(0, 5).map(b => '<div class="ob-row bid"><span>买' + '①②③④⑤'[ob.bids.indexOf(b)] + '</span><span>' + b.price.toFixed(2) + '</span><span>' + b.volume + '</span></div>').join('')
      + '</div>';
  },
};
