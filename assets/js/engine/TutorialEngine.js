const TutorialEngine = {
  tasks: {
    1: [
      { id: 'eat', text: '打开生活面板 → 吃饭', done: false },
      { id: 'buy', text: '打开股市 → 完成第一笔买入', done: false },
    ],
    2: [
      { id: 'news', text: '阅读晨间新闻', done: false },
      { id: 'sell', text: '根据新闻卖出一笔', done: false },
      { id: 'chat', text: '打开聊天给阿强发消息', done: false },
    ],
    3: [
      { id: 'coffee', text: '喝咖啡提神', done: false },
      { id: 'watchlist', text: '查看自选股', done: false },
      { id: 'company', text: '查看开设公司条件', done: false },
    ],
  },
  currentDay: 1,

  init() {
    for (const day in this.tasks) {
      this.tasks[day].forEach(t => t.done = false);
    }
    this.currentDay = 1;
  },

  load(data) {
    if (data) { for (const day in data) { if (this.tasks[day]) { data[day].forEach((t, i) => { if (this.tasks[day][i]) this.tasks[day][i].done = t.done; }); } } }
  },

  save() { return this.tasks; },

  getTodaysTasks() {
    return this.tasks[this.currentDay] || [];
  },

  completeTask(taskId) {
    const dayTasks = this.tasks[this.currentDay];
    if (!dayTasks) return;
    const task = dayTasks.find(t => t.id === taskId);
    if (task && !task.done) {
      task.done = true;
      Game.showToast('✅ ' + task.text, 'success');
      if (dayTasks.every(t => t.done)) {
        const nextDay = this.currentDay + 1;
        if (nextDay <= 3) {
          this.currentDay = nextDay;
          Modal.show('第' + nextDay + '天任务', '新的一天！' + this.getTodaysTasks().map(t => '\n☐ ' + t.text).join(''));
        } else {
          Modal.show('引导完成', '你已经掌握了基本玩法！祝你游戏愉快！');
        }
      }
    }
  },

  checkProtection() {
    return Game.character && Game.character.playedDays < CONFIG.NEWBIE.PROTECTION_DAYS;
  },

  getTodoList() {
    const char = Game.character;
    if (!char) return [];
    const todos = [];
    if (char.hunger < 50) todos.push({ text: '记得吃饭', icon: '🍚' });
    if (char.sleep > 70) todos.push({ text: '困了，该休息了', icon: '😴' });
    if (char.stress > 60) todos.push({ text: '压力过大，找点娱乐', icon: '😰' });
    if (char.netWorth >= 1000000) todos.push({ text: '可以考虑开公司了', icon: '🏢' });
    if (char.portfolio.some(p => { const s = StockEngine.getStock(p.code); return s && Math.abs(s.change) > 0.1; })) todos.push({ text: '持仓波动大，考虑止损', icon: '📉' });
    return todos;
  },
};
