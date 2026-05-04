const DatePanel = {
  render(containerId) {
    const el = document.getElementById(containerId);
    if (!el) return;
    el.innerHTML = '<div style="padding:8px;text-align:center;color:#808080;">选择约会对象进行操作</div>';
  },
};
