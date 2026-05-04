const HRPanel = {
  render(containerId) {
    const el = document.getElementById(containerId);
    if (!el) return;
    const company = Game.character?.company;
    if (!company) return;
    el.innerHTML = '<div class="hr-panel"><h4 style="color:var(--text-bright);margin-bottom:8px;">人事管理</h4>'
      + '<div style="margin-bottom:8px;">员工列表:</div>'
      + (company.employees.length === 0 ? '<div style="color:#808080;">暂无员工</div>'
        : company.employees.map(e => '<div class="hr-item">' + e.name + ' - ' + e.role + ' (薪资: ¥' + e.salary + '/月)</div>').join(''))
      + '<button style="margin-top:8px;" onclick="HRPanel.hire()">招聘员工 (¥10,000)</button></div>';
  },

  hire() {
    const company = Game.character?.company;
    if (!company) return;
    const char = Game.character;
    if (char.cash < 10000) { Game.showToast('资金不足', 'warn'); return; }
    char.cash -= 10000;
    const names = ['张伟', '王芳', '李娜', '刘洋', '陈静', '杨帆', '赵磊', '黄丽'];
    const roles = ['运营', '销售', '技术', '设计', '客服', '管理'];
    company.hireEmployee(Random.pick(names), Random.pick(roles));
    Game.showToast('招聘成功', 'success');
    this.render('company-content');
  },
};
