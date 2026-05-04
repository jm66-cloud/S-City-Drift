const NewsList = {
  render(containerId) {
    const el = document.getElementById(containerId);
    if (!el) return;
    const news = NewsEngine.getTodaysNews();
    if (news.length === 0) {
      el.innerHTML = '<div style="padding:16px;text-align:center;color:#808080;">今日暂无新闻</div>';
      return;
    }
    el.innerHTML = news.map(n => {
      const isBad = n.impact < 0;
      const icon = n.impact > 0.03 ? '🟢' : n.impact < -0.03 ? '🔴' : '🟡';
      return '<div style="padding:8px;border-bottom:1px solid #333;cursor:pointer;" onclick="NewsApp.showDetail(\'' + n.id + '\')">'
        + '<div>' + icon + ' <span style="font-weight:bold;">' + n.title + '</span></div>'
        + '<div style="font-size:11px;color:#808080;">影响: ' + (n.impact > 0 ? '⬆' : '⬇') + ' ' + Format.percent(n.impact) + '</div>'
        + '</div>';
    }).join('');
  },
};
