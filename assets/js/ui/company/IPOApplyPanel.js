const IPOApplyPanel = {
  render(containerId) {
    const el = document.getElementById(containerId);
    if (!el) return;
    el.innerHTML = '<div style="padding:12px;text-align:center;"><p>IPO申请功能已整合到财务面板中。</p></div>';
  },
};
