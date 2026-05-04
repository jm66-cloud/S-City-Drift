const HousingPanel = {
  render(containerId) {
    const el = document.getElementById(containerId);
    if (!el) return;
    const char = Game.character;
    const listings = HOUSING_DATA.listings || [];
    const rents = HOUSING_DATA.rentOptions || [];
    el.innerHTML = '<div style="padding:12px;">'
      + '<button onclick="AssetsApp.showOverview()" style="margin-bottom:8px;">← 返回总览</button>'
      + '<h4 style="color:var(--text-bright);margin-bottom:8px;">🏠 出租房源</h4>'
      + rents.map(p => '<div style="border:1px solid #333;padding:8px;margin-bottom:6px;">'
        + '<div><b>' + p.name + '</b> (' + p.area + 'm² ' + p.district + ')</div>'
        + '<div style="font-size:12px;color:#808080;">月租: ' + Format.money(p.price) + ' | ' + p.description + '</div>'
        + '<button style="margin-top:4px;" onclick="HousingPanel.rent(\'' + p.name + '\')">租房</button>'
        + '</div>').join('')
      + '<h4 style="color:var(--text-bright);margin:12px 0 8px;">🏡 出售房源</h4>'
      + listings.map(p => '<div style="border:1px solid #333;padding:8px;margin-bottom:8px;">'
        + '<div><b>' + p.name + '</b> (' + p.area + 'm² ' + p.district + ')</div>'
        + '<div style="font-size:12px;color:#808080;">' + p.description + '</div>'
        + '<div style="font-size:11px;">首付30%: ' + Format.money(Math.floor(p.price * 0.3)) + ' | 月供约: ' + Format.money(Math.floor((p.price * 0.7) * (CONFIG.HOUSING.MORTGAGE_RATE / 12) * Math.pow(1 + CONFIG.HOUSING.MORTGAGE_RATE / 12, 360) / (Math.pow(1 + CONFIG.HOUSING.MORTGAGE_RATE / 12, 360) - 1))) + '</div>'
        + '<button style="margin-top:4px;" onclick="HousingPanel.buy(\'' + p.name + '\',' + p.price + ')">' + (char.cash >= p.price * 0.3 ? '贷款购房' : '首付不足') + '</button>'
        + '</div>').join('')
      + (char.properties.length > 0 ? '<h4 style="color:var(--text-bright);margin:12px 0 8px;">我的房产</h4>'
        + char.properties.map(p => '<div style="border:1px solid #333;padding:8px;margin-bottom:6px;display:flex;justify-content:space-between;align-items:center;">'
          + '<span>' + p.name + ' | 估值: ' + Format.money(p.value) + (p.loan > 0 ? ' | 贷款: ' + Format.money(p.loan) + ' | 月供: ' + Format.money(p.monthlyPayment) : '') + '</span>'
          + '<button onclick="HousingPanel.sell(\'' + p.name + '\')">出售 (¥' + Format.short(Math.floor(p.value * 0.9)) + ')</button>'
          + '</div>').join('') : '')
      + '</div>';
  },

  rent(name) {
    const opt = HOUSING_DATA.rentOptions.find(r => r.name === name);
    if (!opt) return;
    const char = Game.character;
    Modal.show('确认租房', '选择 ' + opt.name + '\n月租: ' + Format.money(opt.price) + '\n面积: ' + opt.area + 'm²',
      [{ text: '确认', action: () => { char.cash -= opt.price; Game.showToast('已入住 ' + opt.name, 'success'); SoundEngine.play('money'); } },
      { text: '取消', action: () => Modal.close() }]);
  },

  buy(name, price) {
    const char = Game.character;
    const downPayment = Math.floor(price * CONFIG.HOUSING.MORTGAGE_DOWN_PAYMENT_RATIO);
    Modal.show('确认购房', name + '\n总价: ' + Format.money(price) + '\n首付: ' + Format.money(downPayment) + '\n贷款: ' + Format.money(price - downPayment),
      [{ text: '确认购买', action: () => {
        if (char.cash < downPayment) { Game.showToast('首付不足', 'warn'); return; }
        const prop = new Property(name, 'buy', price, 0, '浦东');
        const result = AssetEngine.buyProperty(prop, true);
        if (result.success) { Game.showToast('购房成功！月供: ' + Format.money(prop.monthlyPayment), 'success'); SoundEngine.play('money'); }
        HousingPanel.render('assets-content');
      }}, { text: '取消', action: () => Modal.close() }]);
  },

  sell(name) {
    const char = Game.character;
    const prop = char.properties.find(p => p.name === name);
    if (!prop) return;
    Modal.show('确认出售', prop.name + '\n当前估值: ' + Format.money(prop.value) + '\n出售价(90%): ' + Format.money(Math.floor(prop.value * 0.9)),
      [{ text: '确认出售', action: () => {
        AssetEngine.sellProperty(prop);
        SoundEngine.play('money');
        HousingPanel.render('assets-content');
      }}, { text: '取消', action: () => Modal.close() }]);
  },
};
