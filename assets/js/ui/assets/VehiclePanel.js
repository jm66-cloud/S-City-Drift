const VehiclePanel = {
  render(containerId) {
    const el = document.getElementById(containerId);
    if (!el) return;
    const char = Game.character;
    el.innerHTML = '<div style="padding:12px;">'
      + '<button onclick="AssetsApp.showOverview()" style="margin-bottom:8px;">← 返回总览</button>'
      + '<h4 style="color:var(--text-bright);margin-bottom:8px;">🚗 车辆选购</h4>'
      + VEHICLES_DATA.map(v => '<div style="border:1px solid #333;padding:8px;margin-bottom:8px;">'
        + '<div><b>' + v.name + '</b> | ¥' + Format.short(v.price) + '</div>'
        + '<div style="font-size:12px;color:#808080;">速度: ' + '★'.repeat(v.speed) + ' | 舒适: ' + '★'.repeat(v.comfort) + ' | 月维护: ' + Format.money(v.maintenance) + '</div>'
        + '<div style="font-size:11px;color:#808080;">' + v.description + '</div>'
        + '<button style="margin-top:4px;" onclick="VehiclePanel.buy(\'' + v.name + '\',' + v.price + ')">' + (char.cash >= v.price ? '购买' : '资金不足') + '</button>'
        + '</div>').join('')
      + (char.vehicles.length > 0 ? '<h4 style="color:var(--text-bright);margin:12px 0 8px;">已拥有车辆</h4>'
        + char.vehicles.map(v => '<div style="border:1px solid #333;padding:8px;margin-bottom:6px;display:flex;justify-content:space-between;align-items:center;">'
          + '<span>' + v.name + ' | 估值: ' + Format.money(v.value) + ' | 状况: ' + v.condition + '%</span>'
          + '<button onclick="VehiclePanel.sell(\'' + v.name + '\')">出售 (¥' + Format.short(Math.floor(v.value * 0.7)) + ')</button>'
          + '</div>').join('') : '')
      + '</div>';
  },

  buy(name, price) {
    const char = Game.character;
    if (char.cash < price) { Game.showToast('资金不足', 'warn'); return; }
    const v = VEHICLES_DATA.find(x => x.name === name);
    if (!v) return;
    const vehicle = new Vehicle(v.name, v.type, v.price, v.comfort, v.speed);
    const result = AssetEngine.buyVehicle(vehicle);
    if (result.success) { Game.showToast('购车成功！', 'success'); SoundEngine.play('money'); }
    this.render('assets-content');
  },

  sell(name) {
    const char = Game.character;
    const vehicle = char.vehicles.find(v => v.name === name);
    if (!vehicle) return;
    const result = AssetEngine.sellVehicle(vehicle);
    if (result.success) { Game.showToast('出售成功', 'success'); SoundEngine.play('money'); }
    this.render('assets-content');
  },
};
