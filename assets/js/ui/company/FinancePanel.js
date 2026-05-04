const FinancePanel = {
  render(containerId) {
    const el = document.getElementById(containerId);
    if (!el) return;
    const company = Game.character?.company;
    if (!company) return;
    const check = IPOEngine.canApply();
    el.innerHTML = '<div class="finance-panel"><h4 style="color:var(--text-bright);margin-bottom:8px;">财务管理</h4>'
      + '<div>公司现金: ' + Format.money(company.cash) + '</div>'
      + '<div>月营收: ' + Format.money(company.revenue) + '</div>'
      + '<div>月利润: ' + Format.money(company.profit) + '</div>'
      + '<div>估值: ' + Format.money(IPOEngine.calculateValuation()) + '</div>'
      + '<div style="margin-top:12px;display:flex;gap:8px;flex-wrap:wrap;">'
      + (company.isPublic ? '' : '<button onclick="FinancePanel.applyIPO()">' + (check.success ? '📋 申请IPO (¥' + Format.money(CONFIG.FINANCE.IPO_COST) + ')' : 'IPO条件不足') + '</button>')
      + '<button onclick="FinancePanel.injectCash()">注入资金</button>'
      + '</div>'
      + (!check.success ? '<div style="margin-top:8px;font-size:11px;color:#ff4444;">IPO条件: ' + (check.reason || '') + '</div>' : '')
      + '</div>';
  },

  applyIPO() {
    const result = IPOEngine.apply();
    if (result.success) { Game.showToast('🎉 公司成功上市！', 'success'); }
    else { Game.showToast('IPO失败: ' + (result.reason || ''), 'error'); }
    this.render('company-content');
  },

  injectCash() {
    Modal.prompt('注入资金', '金额', (val) => {
      const amt = parseInt(val) || 0;
      const char = Game.character;
      if (amt <= 0 || char.cash < amt) { Game.showToast('资金不足', 'warn'); return; }
      char.cash -= amt;
      char.company.cash += amt;
      Game.showToast('注入成功', 'success');
      this.render('company-content');
    });
  },
};
