const NewsApp = {
  open(bodyEl) {
    const news = NewsEngine.getTodaysNews();
    bodyEl.innerHTML = '<div style="display:flex;flex-direction:column;height:100%;">'
      + '<div style="padding:4px 8px;background:var(--bg-panel-light);display:flex;gap:8px;border-bottom:1px solid #000;">'
      + '<span style="font-weight:bold;">📰 每日财经</span>'
      + '<span style="color:#808080;font-size:12px;">' + TimeEngine.dayStr + '</span>'
      + '<span style="margin-left:auto;font-size:12px;">' + news.length + '条新闻</span>'
      + '</div>'
      + '<div id="news-list" style="flex:1;overflow-y:auto;"></div></div>';
    NewsList.render('news-list');
  },
};
