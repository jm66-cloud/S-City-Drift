const CompanyApp = {
  currentTab: 'dashboard',

  open(bodyEl) {
    const char = Game.character;
    if (!char.company) {
      bodyEl.innerHTML = '<div class="company-app" style="padding:16px;text-align:center;">'
        + '<p style="margin-bottom:16px;">你还没有公司。创建公司需要 ¥' + Format.money(CONFIG.FINANCE.COMPANY_CREATION_COST) + '</p>'
        + '<p style="margin-bottom:12px;font-size:12px;color:#808080;">拥有公司后可以经营业务、申请IPO上市。</p>'
        + '<button onclick="CompanyApp.create()">🏢 创建公司</button></div>';
      return;
    }
    bodyEl.innerHTML = '<div class="company-app">'
      + '<div class="ca-tabs">'
      + '<div class="ca-tab active" data-tab="dashboard" onclick="CompanyApp.switchTab(\'dashboard\')">📊 仪表盘</div>'
      + '<div class="ca-tab" data-tab="hr" onclick="CompanyApp.switchTab(\'hr\')">👥 人事</div>'
      + '<div class="ca-tab" data-tab="rd" onclick="CompanyApp.switchTab(\'rd\')">🔬 研发</div>'
      + '<div class="ca-tab" data-tab="marketing" onclick="CompanyApp.switchTab(\'marketing\')">📢 营销</div>'
      + '<div class="ca-tab" data-tab="production" onclick="CompanyApp.switchTab(\'production\')">🏭 生产</div>'
      + '<div class="ca-tab" data-tab="finance" onclick="CompanyApp.switchTab(\'finance\')">💰 财务</div>'
      + '<div class="ca-tab" data-tab="crime" onclick="CompanyApp.switchTab(\'crime\')">⚠️ 高级</div>'
      + '</div><div id="company-content"></div></div>';
    this.switchTab('dashboard');
  },

  create() {
    Modal.prompt('创建公司', '输入公司名称', (name) => {
      if (!name.trim()) { Game.showToast('请输入公司名称', 'warn'); return; }
      const result = CompanyEngine.createCompany(name.trim(), 'technology');
      if (result.success) {
        Game.showToast('公司 ' + name + ' 成立！', 'success');
        UI.updateStatusBar();
        CompanyApp.open(document.getElementById('win-body-company'));
      } else { Game.showToast(result.reason || '创建失败', 'error'); }
    });
  },

  switchTab(tab) {
    this.currentTab = tab;
    document.querySelectorAll('.company-app .ca-tab').forEach(t => t.classList.remove('active'));
    document.querySelector('.company-app .ca-tab[data-tab="' + tab + '"]')?.classList.add('active');
    const content = document.getElementById('company-content');
    if (!content) return;
    switch (tab) {
      case 'dashboard': CompanyDash.render('company-content'); break;
      case 'hr': HRPanel.render('company-content'); break;
      case 'rd': RDPanel.render('company-content'); break;
      case 'marketing': MarketingPanel.render('company-content'); break;
      case 'production': ProductionPanel.render('company-content'); break;
      case 'finance': FinancePanel.render('company-content'); break;
      case 'crime': CrimePanel.render('company-content'); break;
    }
  },
};
