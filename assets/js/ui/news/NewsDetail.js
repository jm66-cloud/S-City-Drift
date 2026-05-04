const NewsDetail = {
  render(containerId, article) {
    const el = document.getElementById(containerId);
    if (!el || !article) return;
    el.innerHTML = '<div style="padding:12px;"><h3 style="color:var(--text-bright);margin-bottom:8px;">' + article.title + '</h3>'
      + '<p style="margin-bottom:12px;line-height:1.6;">' + article.content + '</p>'
      + '<div style="font-size:12px;color:#808080;">类型: ' + article.type + ' | 影响: ' + Format.percent(article.impact) + '</div>'
      + '<button style="margin-top:8px;" onclick="NewsList.render(\'news-list\')">返回列表</button></div>';
  },
};
