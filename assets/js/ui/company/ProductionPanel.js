const ProductionPanel = {
  render(containerId) {
    const el = document.getElementById(containerId);
    if (!el) return;
    const company = Game.character?.company;
    if (!company) return;
    el.innerHTML = '<div class="production-panel"><h4 style="color:var(--text-bright);margin-bottom:8px;">生产管理</h4>'
      + '<div>生产等级: ' + company.productionLevel + '</div>'
      + '<div>产品列表:</div>'
      + company.products.map(p => '<div>📦 ' + p.name + '</div>').join('')
      + '<button style="margin-top:8px;" onclick="ProductionPanel.upgrade()">提升产能 (¥40,000)</button></div>';
  },

  upgrade() {
    const company = Game.character?.company;
    if (!company || Game.character.cash < 40000) { Game.showToast('资金不足', 'warn'); return; }
    Game.character.cash -= 40000;
    company.productionLevel++;
    Game.showToast('生产等级提升到' + company.productionLevel, 'success');
    this.render('company-content');
  },
};
