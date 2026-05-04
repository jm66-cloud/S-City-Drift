const WeddingPanel = {
  render(containerId) {
    const el = document.getElementById(containerId);
    if (!el) return;
    el.innerHTML = '<div style="padding:12px;text-align:center;color:#808080;">结婚操作在对象详情页面</div>';
  },
};
