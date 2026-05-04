const RDPanel = {
  render(containerId) {
    const el = document.getElementById(containerId);
    if (!el) return;
    const company = Game.character?.company;
    if (!company) return;
    el.innerHTML = '<div class="rd-panel"><h4 style="color:var(--text-bright);margin-bottom:8px;">研发管理</h4>'
      + '<div>研发等级: ' + company.rdLevel + '</div>'
      + '<div>产品数: ' + company.products.length + '/' + CONFIG.COMPANY.MAX_PRODUCTS + '</div>'
      + '<div style="margin-top:8px;display:flex;gap:4px;flex-wrap:wrap;">'
      + '<button onclick="RDPanel.upgradeRD()">提升研发 (¥50,000)</button>'
      + '<button onclick="RDPanel.newProduct()">新产品研发 (¥30,000)</button>'
      + '</div></div>';
  },

  upgradeRD() {
    const company = Game.character?.company;
    if (!company || Game.character.cash < 50000) { Game.showToast('资金不足', 'warn'); return; }
    Game.character.cash -= 50000;
    company.rdLevel++;
    Game.showToast('研发等级提升到' + company.rdLevel, 'success');
    this.render('company-content');
  },

  newProduct() {
    const company = Game.character?.company;
    if (!company || Game.character.cash < 30000) { Game.showToast('资金不足', 'warn'); return; }
    if (company.products.length >= CONFIG.COMPANY.MAX_PRODUCTS) { Game.showToast('产品已达上限', 'warn'); return; }
    Game.character.cash -= 30000;
    const names = ['高端产品', '经济型产品', '旗舰产品', '入门产品', '增值服务'];
    company.addProduct(Random.pick(names) + (company.products.length + 1));
    Game.showToast('新产品研发成功', 'success');
    this.render('company-content');
  },
};
