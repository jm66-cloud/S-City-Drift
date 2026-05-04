const DailyLog = {
  data: { spent: 0, calories: 0, meals: [], logs: [] },

  reset() { this.data = { spent: 0, calories: 0, meals: [], logs: [] }; },

  addMeal(name, cost, cal) {
    this.data.meals.push(name);
    this.data.spent += cost;
    this.data.calories += cal;
  },

  add(action, detail) {
    this.data.logs.push({ action, detail, time: TimeEngine.timeStr });
    this.render('life-dailylog');
  },

  render(containerId) {
    const el = document.getElementById(containerId);
    if (!el) return;
    el.innerHTML = '今日花费: ¥' + this.data.spent + ' | 热量: ' + this.data.calories + 'kcal'
      + (this.data.logs.length > 0 ? '<div style="font-size:10px;color:#606060;margin-top:2px;">' + this.data.logs.slice(-3).map(l => l.action + ' ' + l.detail).join(' | ') + '</div>' : '');
  },
};
