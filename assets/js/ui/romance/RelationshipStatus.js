const RelationshipStatus = {
  render(containerId) {
    const el = document.getElementById(containerId);
    if (!el) return;
    const char = Game.character;
    const romance = char?.romance ? RomanceEngine.getChar(char.romance) : null;
    el.innerHTML = '<div style="padding:12px;">'
      + (romance ? '<h4 style="color:var(--text-bright);margin-bottom:8px;">当前关系: ' + romance.charName + '</h4>'
        + '<div>好感度: ' + romance.affection + '/100</div>'
        + '<div>阶段: ' + romance.stageName + '</div>'
        + '<div>约会: ' + romance.dates + '次 | 礼物: ' + romance.gifts + '次</div>'
        + (romance.married ? '<div style="color:var(--success);">✅ 已婚' + (romance.prenup ? '(有婚前协议)' : '') + '</div>' : '')
        + (romance.divorced ? '<div style="color:var(--danger);">❌ 已离婚</div>' : '')
        : '<div style="color:#808080;">尚未建立恋爱关系</div>')
      + '</div>';
  },
};
