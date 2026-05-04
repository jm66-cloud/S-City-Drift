const RomanceApp = {
  open(bodyEl) {
    bodyEl.innerHTML = '<div style="display:flex;flex-direction:column;height:100%;">'
      + '<div style="padding:4px 8px;background:var(--bg-panel-light);border-bottom:1px solid #000;display:flex;gap:8px;">'
      + '<span class="nav-link" onclick="RomanceApp.showList()" style="cursor:pointer;color:var(--highlight);">💕 可发展对象</span>'
      + '<span class="nav-link" onclick="RomanceApp.showStatus()" style="cursor:pointer;color:var(--highlight);">❤️ 当前关系</span>'
      + '</div><div id="romance-content"></div></div>';
    this.showList();
  },

  showList() {
    const el = document.getElementById('romance-content');
    if (!el) return;
    ProfileList.render('romance-content');
  },

  showStatus() {
    const el = document.getElementById('romance-content');
    if (!el) return;
    RelationshipStatus.render('romance-content');
  },

  selectChar(charId) {
    const romance = RomanceEngine.getChar(charId);
    if (!romance) return;
    const el = document.getElementById('romance-content');
    if (!el) return;
    el.innerHTML = '<div style="padding:12px;">'
      + '<h4 style="color:var(--text-bright);margin-bottom:8px;">' + romance.charName + '</h4>'
      + '<div>好感度: ' + romance.affection + '/100</div>'
      + '<div>关系阶段: ' + romance.stageName + '</div>'
      + '<div>约会次数: ' + romance.dates + '</div>'
      + '<div style="display:flex;gap:4px;margin-top:12px;flex-wrap:wrap;">'
      + '<button onclick="RomanceEngine.date(romance,\'dinner\')">🍽️ 请吃饭</button>'
      + '<button onclick="RomanceEngine.date(romance,\'movie\')">🎬 看电影</button>'
      + '<button onclick="RomanceEngine.date(romance,\'gift\')">🎁 送礼物</button>'
      + '<button onclick="RomanceEngine.date(romance,\'shopping\')">🛍️ 逛街</button>'
      + '<button onclick="RomanceEngine.date(romance,\'travel\')">✈️ 旅游</button>'
      + '</div>'
      + (romance.stage >= 6 ? '<button style="margin-top:8px;" onclick="RomanceApp.doMarry(\'' + charId + '\')">💍 结婚</button>' : '')
      + (romance.married ? '<button style="margin-top:8px;margin-left:8px;" onclick="RomanceApp.doDivorce(\'' + charId + '\')">💔 离婚</button>' : '')
      + '</div>';
  },

  doMarry(charId) {
    const romance = RomanceEngine.getChar(charId);
    if (!romance) return;
    const result = RomanceEngine.marry(romance, false);
    if (result.success) Game.showToast('🎉 恭喜结婚！', 'success');
    else Game.showToast(result.reason || '结婚失败', 'warn');
  },

  doDivorce(charId) {
    const romance = RomanceEngine.getChar(charId);
    if (!romance) return;
    if (confirm('确定要离婚吗？将会分割财产。')) {
      const result = RomanceEngine.divorce(romance);
      if (result.success) Game.showToast('离婚完成', 'warn');
      else Game.showToast(result.reason || '离婚失败', 'warn');
    }
  },
};
