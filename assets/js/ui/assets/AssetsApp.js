const AssetsApp = {
  open(bodyEl) {
    bodyEl.innerHTML = '<div style="display:flex;flex-direction:column;height:100%;">'
      + '<div style="padding:4px 8px;background:var(--bg-panel-light);border-bottom:1px solid #000;display:flex;gap:8px;">'
      + '<span style="font-weight:bold;">💰 资产总览</span>'
      + '<span style="margin-left:auto;font-size:12px;color:#808080;">总资产: ' + Format.money(Game.character?.netWorth || 0) + '</span>'
      + '</div><div id="assets-content"></div></div>';
    this.showOverview();
  },

  showOverview() {
    const el = document.getElementById('assets-content');
    if (!el) return;
    const char = Game.character;
    if (!char) return;
    el.innerHTML = '<div style="padding:12px;">'
      + '<h4 style="color:var(--text-bright);margin-bottom:8px;">财务概览</h4>'
      + '<div style="border-bottom:1px solid #333;padding:4px 0;">现金: ' + Format.money(char.cash) + '</div>'
      + '<div style="border-bottom:1px solid #333;padding:4px 0;">证券账户: ' + Format.money(char.securitiesBalance) + '</div>'
      + '<div style="border-bottom:1px solid #333;padding:4px 0;">持仓市值: ' + Format.money(char.portfolio.reduce((s, p) => { const st = StockEngine.getStock(p.code); return s + p.quantity * (st ? st.price : p.costBasis); }, 0)) + '</div>'
      + '<h4 style="color:var(--text-bright);margin:12px 0 8px;">🏠 房产 (' + char.properties.length + ')</h4>'
      + (char.properties.length === 0 ? '<div style="color:#808080;">暂无房产</div>'
        : char.properties.map(p => '<div style="border-bottom:1px solid #333;padding:4px 0;">' + p.name + ' | 估值: ' + Format.money(p.value) + (p.loan > 0 ? ' | 贷款: ' + Format.money(p.loan) : '') + '</div>').join(''))
      + '<h4 style="color:var(--text-bright);margin:12px 0 8px;">🚗 车辆 (' + char.vehicles.length + ')</h4>'
      + (char.vehicles.length === 0 ? '<div style="color:#808080;">暂无车辆</div>'
        : char.vehicles.map(v => '<div style="border-bottom:1px solid #333;padding:4px 0;">' + v.name + ' | 估值: ' + Format.money(v.value) + ' | 状况: ' + v.condition + '%</div>').join(''))
      + '<div style="margin-top:12px;display:flex;gap:8px;flex-wrap:wrap;">'
      + '<button onclick="HousingPanel.render(\'assets-content\')">🏠 房产</button>'
      + '<button onclick="VehiclePanel.render(\'assets-content\')">🚗 车辆</button>'
      + '</div></div>';
  },
};
