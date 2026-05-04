const CompanyEngine = {
  init() {},
  createCompany(name, industry) {
    const char = Game.character;
    if (char.company) return { success: false, reason: '已有公司' };
    if (char.cash < CONFIG.FINANCE.COMPANY_CREATION_COST) return { success: false, reason: '资金不足，需要' + Format.money(CONFIG.FINANCE.COMPANY_CREATION_COST) };
    char.cash -= CONFIG.FINANCE.COMPANY_CREATION_COST;
    char.company = new PlayerCompany(name, industry);
    char.company.cash = char.cash * 0.5;
    char.company.addProduct(name + '基础产品');
    char.company.hireEmployee('员工1', '运营');
    Game.showToast('公司 ' + name + ' 成立！', 'success');
    return { success: true };
  },
  monthlyUpdate() {
    const char = Game.character;
    if (!char.company) return;
    char.company.monthlyUpdate();
    this._triggerRandomEvent(char.company);
    if (char.company.isPublic) {
      const tax = Math.max(0, Math.floor(char.company.profit * CONFIG.COMPANY.TAX_RATE));
      char.totalTax += tax;
    }
  },
  _triggerRandomEvent(company) {
    if (!Random.chance(0.15)) return;
    const events = [
      { name: '核心员工被挖角', desc: '效率-20%，持续15天', cost: 100000, resolve: '加薪留人' },
      { name: '质量丑闻', desc: '品牌口碑-2', cost: 500000, resolve: '召回产品' },
      { name: '专利诉讼', desc: '一次性赔偿', cost: Random.int(200000, 1000000), resolve: '和解' },
      { name: '海外订单', desc: '营收临时+30%', cost: 0, resolve: '接受' },
      { name: '竞争对手倒闭', desc: '市场份额+5%', cost: 0, resolve: '自动' },
    ];
    const evt = Random.pick(events);
    Modal.show('公司事件', evt.name + ': ' + evt.desc + (evt.cost > 0 ? '\n处理费用: ' + Format.money(evt.cost) : ''));
    if (evt.name === '海外订单') {
      if (company.productionLevel >= 2) company.revenue *= 1.3;
      else Game.showToast('产能不足，无法接受海外订单', 'warn');
    } else if (evt.name === '竞争对手倒闭') {
      company.marketShare += 5;
    }
  },
  buyBackShares(percent) {
    const char = Game.character;
    if (!char.company || !char.company.isPublic) return { success: false, reason: '公司未上市' };
    const cost = char.company.valuation * percent / 100;
    if (char.cash < cost) return { success: false, reason: '资金不足' };
    char.cash -= cost;
    char.company.shares.founder += percent;
    return { success: true };
  },
};
