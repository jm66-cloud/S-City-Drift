const EatPanel = {
  render(containerId) {
    const el = document.getElementById(containerId);
    if (!el) return;
    el.innerHTML = '<div style="padding:8px;"><h4 style="color:var(--text-bright);margin-bottom:8px;">🍚 选择就餐方式</h4>'
      + '<div style="display:grid;grid-template-columns:1fr 1fr;gap:6px;">'
      + '<div class="food-card" style="border:1px solid #333;padding:8px;cursor:pointer;" onclick="EatPanel.choose(\'cook\')">'
      + '<div>🍳 做饭</div><div style="font-size:11px;color:#808080;">饱食+40 压力-5 耗时45分 ¥10~20</div></div>'
      + '<div class="food-card" style="border:1px solid #333;padding:8px;cursor:pointer;" onclick="EatPanel.choose(\'delivery\')">'
      + '<div>📦 外卖</div><div style="font-size:11px;color:#808080;">饱食+20 耗时15分 ¥20~50</div></div>'
      + '<div class="food-card" style="border:1px solid #333;padding:8px;cursor:pointer;" onclick="EatPanel.choose(\'instant\')">'
      + '<div>🍜 方便面</div><div style="font-size:11px;color:#ff4444;">饱食+10 压力+5 耗时3分</div></div>'
      + '<div class="food-card" style="border:1px solid #333;padding:8px;cursor:pointer;" onclick="EatPanel.choose(\'eatout\')">'
      + '<div>🏪 出去吃</div><div style="font-size:11px;color:#808080;">饱食+30 压力-3 耗时30分 ¥15~50</div></div>'
      + '<div class="food-card" style="border:1px solid #333;padding:8px;cursor:pointer;" onclick="EatPanel.choose(\'coffee\')">'
      + '<div>☕ 喝咖啡</div><div style="font-size:11px;color:#808080;">困意-15 耗时5分 ¥10</div></div>'
      + '</div><div id="eat-result" style="margin-top:8px;font-size:12px;"></div></div>';
  },

  choose(type) {
    CharacterEngine.eat(type);
    const msgs = {
      cook: '自己做了顿饭，省钱又健康。',
      delivery: '外卖到了，味道还行。',
      instant: '泡了碗方便面，凑合一顿。',
      eatout: '去楼下小馆子吃了一顿。',
      coffee: '喝了杯咖啡，精神了点。',
    };
    const el = document.getElementById('eat-result');
    if (el) { el.textContent = '✅ ' + (msgs[type] || '吃完了'); el.style.color = '#00c853'; }
    LiveLog.add('进食', type);
    StatusDisplay.render('life-status');
    DailyLog.render('life-dailylog');
  },
};
