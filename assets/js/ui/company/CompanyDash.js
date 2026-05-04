const CompanyDash = {
  render(containerId) {
    const el = document.getElementById(containerId);
    if (!el) return;
    const company = Game.character?.company;
    if (!company) { el.innerHTML = ''; return; }
    el.innerHTML = '<div class="company-dash">'
      + '<div class="cd-section"><h4>' + company.name + ' (' + (company.industry || '科技') + ')</h4>'
      + '<div class="cd-row"><span>月营收</span><span>' + Format.money(company.revenue) + '</span></div>'
      + '<div class="cd-row"><span>月利润</span><span class="' + (company.profit >= 0 ? 'text-up' : 'text-down') + '">' + Format.money(company.profit) + '</span></div>'
      + '<div class="cd-row"><span>公司现金</span><span>' + Format.money(company.cash) + '</span></div>'
      + '<div class="cd-row"><span>估值</span><span>' + Format.money(company.valuation) + '</span></div>'
      + '<div class="cd-row"><span>品牌口碑</span><span>' + company.reputation + '/100</span></div>'
      + '<div class="cd-row"><span>市场份额</span><span>' + company.marketShare.toFixed(1) + '%</span></div>'
      + '<div class="cd-row"><span>产品数</span><span>' + company.products.length + '/' + CONFIG.COMPANY.MAX_PRODUCTS + '</span></div>'
      + '<div class="cd-row"><span>员工数</span><span>' + company.employees.length + '</span></div>'
      + '<div class="cd-row"><span>经营月数</span><span>' + company.month + '</span></div>'
      + (company.isPublic ? '<div class="cd-row" style="color:var(--success);"><span>上市状态</span><span>✅ 已上市 (发行价¥' + (company.ipoPrice || 0).toFixed(2) + ')</span></div>' : '')
      + '</div>'
      + (!company.isPublic ? '<button style="margin-top:8px;" onclick="CompanyApp.switchTab(\'finance\')">申请IPO</button>' : '')
      + '</div>';
  },
};
