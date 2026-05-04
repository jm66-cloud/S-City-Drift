const MarketingPanel = {
  render(containerId) {
    const el = document.getElementById(containerId);
    if (!el) return;
    const company = Game.character?.company;
    if (!company) return;
    el.innerHTML = '<div class="marketing-panel"><h4 style="color:var(--text-bright);margin-bottom:8px;">营销管理</h4>'
      + '<div>营销等级: ' + company.marketingLevel + '</div>'
      + '<div>品牌口碑: ' + company.reputation + '/100</div>'
      + '<div>市场份额: ' + company.marketShare.toFixed(1) + '%</div>'
      + '<button style="margin-top:8px;" onclick="MarketingPanel.upgrade()">提升营销 (¥30,000)</button></div>';
  },

  upgrade() {
    const company = Game.character?.company;
    if (!company || Game.character.cash < 30000) { Game.showToast('资金不足', 'warn'); return; }
    Game.character.cash -= 30000;
    company.marketingLevel++;
    company.reputation = Math.min(100, company.reputation + 5);
    Game.showToast('营销等级提升到' + company.marketingLevel, 'success');
    this.render('company-content');
  },
};
