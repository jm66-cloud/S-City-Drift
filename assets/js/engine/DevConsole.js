const DevConsole = {
  enabled: false,
  el: null,
  history: [],

  toggle() {
    this.enabled = !this.enabled;
    if (this.enabled) this._show();
    else this._hide();
  },

  _show() {
    if (this.el) { this.el.classList.remove('hidden'); return; }
    this.el = document.createElement('div');
    this.el.id = 'dev-console';
    this.el.style.cssText = 'position:absolute;bottom:30px;left:0;right:0;height:200px;background:rgba(0,0,0,0.9);border-top:2px solid #00ff00;z-index:9999;display:flex;flex-direction:column;font-family:monospace;font-size:13px;';
    this.el.innerHTML = '<div style="padding:4px 8px;background:#001a00;color:#00ff00;display:flex;justify-content:space-between;">'
      + '<span>🛠️ 开发者控制台</span><span style="cursor:pointer;" onclick="DevConsole.toggle()">✕</span></div>'
      + '<div id="dev-output" style="flex:1;overflow-y:auto;padding:4px 8px;color:#c0c0c0;"></div>'
      + '<div style="display:flex;border-top:1px solid #333;"><span style="color:#00ff00;padding:4px 8px;">❯</span>'
      + '<input id="dev-input" style="flex:1;background:transparent;border:none;color:#fff;font-family:monospace;font-size:13px;outline:none;padding:4px;" placeholder="输入命令..." onkeydown="if(event.key===\'Enter\') DevConsole.execute()">'
      + '</div>';
    document.getElementById('desktop')?.appendChild(this.el);
    document.getElementById('dev-input')?.focus();
    this._print('🛠️ 开发者控制台已激活。输入 help 查看命令列表。', '#00ff00');
  },

  _hide() {
    if (this.el) this.el.classList.add('hidden');
  },

  execute() {
    const input = document.getElementById('dev-input');
    if (!input || !input.value.trim()) return;
    const cmd = input.value.trim();
    input.value = '';
    this._print('❯ ' + cmd, '#00ff00');
    this.history.push(cmd);
    const args = cmd.split(/\s+/);
    const command = args[0].toLowerCase();
    const val = args[1];
    try {
      switch (command) {
        case 'help':
          this._print('可用命令:', '#ffff00');
          this._print('  help           - 显示此帮助');
          this._print('  addmoney <n>   - 加钱 (如: addmoney 1000000)');
          this._print('  settime <h>    - 设置小时 (如: settime 9)');
          this._print('  news           - 强制生成今日新闻');
          this._print('  audit          - 强制触发犯罪审计');
          this._print('  bots           - 显示所有Bot持仓');
          this._print('  complete       - 跳过新手引导');
          this._print('  achievements   - 显示所有成就');
          this._print('  clear          - 清空控制台');
          break;
        case 'addmoney':
          Game.character.cash += parseInt(val) || 0;
          this._print('💰 已添加 ¥' + (parseInt(val) || 0), '#00ff00');
          break;
        case 'settime':
          TimeEngine.setTime(parseInt(val) || 8, 0, 0);
          this._print('⏰ 时间设置为 ' + TimeEngine.timeStrFull, '#00ff00');
          break;
        case 'news':
          NewsEngine.generate();
          this._print('📰 生成了 ' + NewsEngine.getTodaysNews().length + ' 条新闻', '#00ff00');
          break;
        case 'audit':
          CriminalEngine.monthlyAudit();
          this._print('🔍 犯罪审计已触发', '#00ff00');
          break;
        case 'bots':
          for (const bot of BotEngine.bots) {
            this._print(bot.name + ' | 资产: ' + Format.money(bot.netWorth) + ' | 持仓: ' + bot.portfolio.length + ' | 收益率: ' + Format.percent(bot.totalReturn));
          }
          break;
        case 'complete':
          TutorialEngine.currentDay = 4;
          this._print('✅ 新手引导已跳过', '#00ff00');
          break;
        case 'achievements':
          for (const a of Achievements.list) {
            this._print((Game.character.hasAchievement(a.id) ? '✅' : '⬜') + ' ' + a.icon + ' ' + a.name + ' — ' + a.desc);
          }
          break;
        case 'clear':
          document.getElementById('dev-output').innerHTML = '';
          break;
        default:
          this._print('未知命令: ' + command + '。输入 help 查看列表。', '#ff4444');
      }
    } catch (e) {
      this._print('错误: ' + e.message, '#ff4444');
    }
    document.getElementById('dev-input')?.focus();
  },

  _print(msg, color) {
    const out = document.getElementById('dev-output');
    if (!out) return;
    const line = document.createElement('div');
    line.style.color = color || '#c0c0c0';
    line.style.fontSize = '12px';
    line.style.lineHeight = '1.4';
    line.textContent = msg;
    out.appendChild(line);
    out.scrollTop = out.scrollHeight;
  },
};
