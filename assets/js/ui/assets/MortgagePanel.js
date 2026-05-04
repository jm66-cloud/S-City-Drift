const MortgagePanel = {
  render(containerId) {
    const el = document.getElementById(containerId);
    if (!el) return;
    const char = Game.character;
    const propertiesWithLoan = char.properties.filter(p => p.loan > 0);
    el.innerHTML = '<div style="padding:12px;">'
      + '<h4 style="color:var(--text-bright);margin-bottom:8px;">贷款管理</h4>'
      + (propertiesWithLoan.length === 0 ? '<div style="color:#808080;">暂无贷款</div>'
        : propertiesWithLoan.map(p => '<div style="border-bottom:1px solid #333;padding:6px 0;">'
          + p.name + ' | 贷款余额: ' + Format.money(p.loan) + ' | 月供: ' + Format.money(p.monthlyPayment)
          + '<button style="margin-left:8px;" onclick="MortgagePanel.payExtra(\'' + p.name + '\')">提前还款</button>'
          + '</div>').join(''))
      + '</div>';
  },

  payExtra(propName) {
    Modal.prompt('提前还款', '金额', (val) => {
      const amt = parseInt(val) || 0;
      const char = Game.character;
      if (amt <= 0 || char.cash < amt) { Game.showToast('资金不足', 'warn'); return; }
      const prop = char.properties.find(p => p.name === propName);
      if (!prop) return;
      prop.loan = Math.max(0, prop.loan - amt);
      char.cash -= amt;
      Game.showToast('还款成功', 'success');
    });
  },
};
