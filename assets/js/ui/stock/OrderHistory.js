const OrderHistory = {
  render(containerId) {
    const el = document.getElementById(containerId);
    if (!el) return;
    el.innerHTML = '<div style="padding:8px;text-align:center;color:#808080;">委托/成交记录（本地存储功能）</div>'
      + '<div style="font-size:12px;padding:8px;">订单数据保存在IndexedDB中，可用于审计追踪</div>';
  },
};
