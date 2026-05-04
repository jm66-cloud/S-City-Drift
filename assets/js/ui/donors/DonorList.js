const DonorList = {
  render(containerId) {
    const el = document.getElementById(containerId);
    if (!el) return;
    const donors = window.donors || [];
    if (donors.length === 0) {
      el.innerHTML = '<div style="padding:16px;text-align:center;color:#808080;">'
        + '暂无赞助者名单<br><br>'
        + '💝 如果你喜欢这个游戏，欢迎捐赠支持作者！<br>'
        + '<button style="margin-top:8px;" onclick="window.open(\'https://itch.io\')">支持作者</button>'
        + '</div>';
      return;
    }
    const tiers = { bronze: [], silver: [], gold: [], diamond: [], legend: [] };
    for (const d of donors) {
      let tier = 'bronze';
      if (d.amount >= 500) tier = 'legend';
      else if (d.amount >= 100) tier = 'diamond';
      else if (d.amount >= 50) tier = 'gold';
      else if (d.amount >= 10) tier = 'silver';
      tiers[tier].push(d);
    }
    el.innerHTML = '<div style="padding:8px;overflow-y:auto;">'
      + '<div style="margin-bottom:8px;font-size:12px;color:#808080;">感谢以下赞助者的支持</div>'
      + Object.entries(tiers).map(([tier, list]) => list.length > 0
        ? '<div style="margin-bottom:8px;"><div style="font-weight:bold;">' + tierLabel(tier) + '</div>'
          + list.map(d => '<div style="padding:2px 0;font-size:12px;">' + d.name + ' - ¥' + d.amount + ' (' + d.date + ')</div>').join('')
          + '</div>' : '').join('')
      + '</div>';
    function tierLabel(t) {
      const labels = { bronze: '🥉 铜赞助', silver: '🥈 银赞助', gold: '🥇 金赞助', diamond: '💎 钻石赞助', legend: '🏆 传说赞助' };
      return labels[t] || t;
    }
  },
};
