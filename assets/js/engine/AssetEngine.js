const AssetEngine = {
  init() {},

  buyProperty(property, mortgage = false) {
    const char = Game.character;
    const downPayment = mortgage ? Math.floor(property.price * CONFIG.HOUSING.MORTGAGE_DOWN_PAYMENT_RATIO) : property.price;
    if (char.cash < downPayment) return { success: false, reason: '首付不足，需要 ' + Format.money(downPayment) };
    char.cash -= downPayment;
    if (mortgage) {
      property.loan = property.price - downPayment;
      property.monthlyPayment = Math.floor(property.loan * (CONFIG.HOUSING.MORTGAGE_RATE / 12) * Math.pow(1 + CONFIG.HOUSING.MORTGAGE_RATE / 12, 360) / (Math.pow(1 + CONFIG.HOUSING.MORTGAGE_RATE / 12, 360) - 1));
    }
    property.owned = true;
    property.purchasedAt = TimeEngine.day;
    char.properties.push(property);
    char.propertyCount++;
    Game.showToast('购入 ' + property.name, 'success');
    return { success: true };
  },

  sellProperty(property) {
    const char = Game.character;
    const sellPrice = Math.floor(property.value * 0.9);
    char.cash += sellPrice;
    if (property.loan > 0) {
      char.cash -= property.loan;
      property.loan = 0;
    }
    char.properties = char.properties.filter(p => p !== property);
    Game.showToast('售出 ' + property.name + '，获得 ' + Format.money(sellPrice), 'success');
    return { success: true };
  },

  buyVehicle(vehicle) {
    const char = Game.character;
    if (char.cash < vehicle.price) return { success: false, reason: '资金不足' };
    char.cash -= vehicle.price;
    vehicle.owned = true;
    char.vehicles.push(vehicle);
    char.vehicleCount++;
    Game.showToast('购入 ' + vehicle.name, 'success');
    return { success: true };
  },

  sellVehicle(vehicle) {
    const char = Game.character;
    const sellPrice = Math.floor(vehicle.value * 0.7);
    char.cash += sellPrice;
    char.vehicles = char.vehicles.filter(v => v !== vehicle);
    Game.showToast('售出 ' + vehicle.name + '，获得 ' + Format.money(sellPrice), 'success');
    return { success: true };
  },

  monthlyUpdate() {
    const char = Game.character;
    for (const p of char.properties) {
      p.value = Math.floor(p.value * (1 + Random.float(-0.005, 0.01)));
      if (p.loan > 0) char.cash -= p.monthlyPayment;
    }
    for (const v of char.vehicles) {
      v.value = Math.floor(v.value * 0.98);
      v.condition = Math.max(0, v.condition - Random.int(1, 3));
      char.cash -= v.maintenanceCost;
    }
  },
};
