const IPOEngine = {
  canApply() {
    const char = Game.character;
    if (!char.company) return { success: false, reason: '没有公司' };
    if (char.company.isPublic) return { success: false, reason: '已上市' };
    if (char.company.month < 6) return { success: false, reason: '公司成立不足6个月' };
    if (char.company.revenue < 500000) return { success: false, reason: '营收不足50万' };
    if (char.cash < CONFIG.FINANCE.IPO_COST) return { success: false, reason: '资金不足支付IPO申请费' };
    return { success: true };
  },

  apply() {
    const check = this.canApply();
    if (!check.success) return check;
    const char = Game.character;
    char.cash -= CONFIG.FINANCE.IPO_COST;
    const success = Random.chance(0.6);
    if (success) {
      char.company.isPublic = true;
      char.company.ipoPrice = char.company.valuation / 1000000;
      char.company.shares = { founder: 51, public: 49 };
      Game.showToast('公司成功IPO上市！发行价¥' + char.company.ipoPrice.toFixed(2), 'success');
      return { success: true };
    } else {
      return { success: false, reason: 'IPO申请被驳回，可再次申请' };
    }
  },

  calculateValuation() {
    const char = Game.character;
    if (!char.company) return 0;
    const base = char.company.revenue * 5;
    const premium = char.company.reputation / 100;
    return Math.floor(base * (1 + premium));
  },
};
