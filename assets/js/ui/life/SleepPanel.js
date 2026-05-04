const SleepPanel = {
  render(containerId) {
    const el = document.getElementById(containerId);
    if (!el) return;
    const char = Game.character;
    if (!char) return;
    const timeUntilSleep = (24 - TimeEngine.hour) * 60 + (0 - TimeEngine.minute);
    el.innerHTML = '<div style="padding:12px;text-align:center;">'
      + '<h4 style="color:var(--text-bright);margin-bottom:12px;">🛏️ 准备睡觉</h4>'
      + '<p>当前时间: ' + TimeEngine.timeStrFull + '</p>'
      + '<p>睡觉后时间跳到: 次日 07:00</p>'
      + '<p style="font-size:12px;color:#808080;margin:8px 0;">'
      + '饱食度 -' + CONFIG.CHARACTER.SLEEP_HUNGER_COST + ' | 困意归零 | 压力 -20</p>'
      + '<div style="display:flex;gap:8px;justify-content:center;margin-top:12px;">'
      + '<button style="font-size:16px;padding:8px 24px;background:var(--title-bar);" onclick="SleepPanel.confirm()">确认睡觉</button>'
      + '<button style="font-size:16px;padding:8px 24px;" onclick="SleepPanel.cancel()">取消</button>'
      + '</div></div>';
  },

  confirm() {
    CharacterEngine.sleep();
  },

  cancel() {
    LifeApp.showPanel('main');
  },
};
