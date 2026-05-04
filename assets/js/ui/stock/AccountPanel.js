const AccountPanel = {
  render(containerId) {
    const el = document.getElementById(containerId);
    if (!el) return;
    const char = Game.character;
    if (!char) return;
    el.innerHTML = '<div class="account-panel">'
      + '<h4 style="color:var(--text-bright);margin-bottom:8px;">账户信息</h4>'
      + '<div class="ap-row"><span>现金</span><span>' + Format.money(char.cash) + '</span></div>'
      + '<div class="ap-row"><span>银行卡余额</span><span>' + Format.money(char.bankBalance) + '</span></div>'
      + '<div class="ap-row"><span>证券账户</span><span>' + Format.money(char.securitiesBalance) + '</span></div>'
      + '<div class="ap-row"><span>持仓市值</span><span>' + Format.money(PortfolioPanel._calcMarketValue()) + '</span></div>'
      + '<div class="ap-row" style="font-weight:bold;color:var(--text-bright);"><span>总资产</span><span>' + Format.money(char.netWorth) + '</span></div>'
      + '<div style="margin-top:12px;display:flex;gap:8px;">'
      + '<button onclick="AccountPanel.deposit()">充值</button>'
      + '<button onclick="AccountPanel.withdraw()">转出</button>'
      + '<button onclick="AccountPanel.openAccount()">' + (char.hasAccount ? '已开户' : '开户') + '</button>'
      + '</div></div>';
  },

  _calcMarketValue() {
    const char = Game.character;
    if (!char) return 0;
    return char.portfolio.reduce((s, p) => { const st = StockEngine.getStock(p.code); return s + p.quantity * (st ? st.price : p.costBasis); }, 0);
  },

  deposit() {
    Modal.prompt('充值', '输入金额', (val) => {
      const amount = parseInt(val) || 0;
      if (amount <= 0) return;
      const char = Game.character;
      if (char.cash < amount) { Game.showToast('现金不足', 'warn'); return; }
      char.cash -= amount;
      char.securitiesBalance += amount;
      Game.showToast('充值成功', 'success');
      this.render('account-panel');
    });
  },

  withdraw() {
    Modal.prompt('转出到银行卡', '输入金额', (val) => {
      const amount = parseInt(val) || 0;
      if (amount <= 0) return;
      const char = Game.character;
      if (char.securitiesBalance < amount) { Game.showToast('证券余额不足', 'warn'); return; }
      char.securitiesBalance -= amount;
      char.cash += amount;
      Game.showToast('转出成功', 'success');
      this.render('account-panel');
    });
  },

  openAccount() {
    const char = Game.character;
    char.hasAccount = true;
    char.securitiesBalance += char.cash * 0.5;
    char.cash -= char.cash * 0.5;
    Game.showToast('开户成功！证券账户已开通', 'success');
    this.render('account-panel');
  },
};
