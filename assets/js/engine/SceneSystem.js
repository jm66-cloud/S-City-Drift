const SceneSystem = {
  currentScene: 'apartment',
  scenes: {
    apartment: { name: '出租屋', desc: '你的小窝，一张床、一台电脑、一扇窗。', bg: '#2b2b2b' },
    convenience: { name: '便利店', desc: '24小时营业的便利店，货架上摆满了商品。', bg: '#1a1a2e' },
    bank: { name: '银行', desc: '申海银行营业厅，柜台前排着队。', bg: '#1a2a1a' },
    estate: { name: '房产中介', desc: '墙上贴满了房源信息。', bg: '#2a1a1a' },
    dealer4s: { name: '4S店', desc: '崭新的展车在灯光下闪闪发亮。', bg: '#1a1a2e' },
    restaurant: { name: '餐厅', desc: '温馨的小餐厅，适合约会。', bg: '#2a1a1a' },
    company: { name: '公司', desc: '你的公司办公区，员工在忙碌。', bg: '#1a2a2a' },
    court: { name: '法院', desc: '庄严的法庭，气氛凝重。', bg: '#2a1a1a' },
  },

  setScene(sceneId) {
    if (!this.scenes[sceneId]) return;
    this.currentScene = sceneId;
    const scene = this.scenes[sceneId];
    const desktop = document.getElementById('desktop');
    if (desktop) desktop.style.background = scene.bg;
    Game.showToast('📍 ' + scene.name + ' — ' + scene.desc, 'info');
    this._drawScene(sceneId);
  },

  _drawScene(sceneId) {
    const canvas = document.getElementById('scene-canvas') || this._createCanvas();
    const ctx = canvas.getContext('2d');
    const w = canvas.width, h = canvas.height;
    ctx.clearRect(0, 0, w, h);
    switch (sceneId) {
      case 'apartment': this._drawApartment(ctx, w, h); break;
      case 'convenience': this._drawConvenience(ctx, w, h); break;
      case 'bank': this._drawBank(ctx, w, h); break;
      case 'company': this._drawCompany(ctx, w, h); break;
      default: this._drawGeneric(ctx, w, h, sceneId); break;
    }
  },

  _createCanvas() {
    const canvas = document.createElement('canvas');
    canvas.id = 'scene-canvas';
    canvas.style.position = 'absolute';
    canvas.style.top = '30px';
    canvas.style.left = '0';
    canvas.style.width = '200px';
    canvas.style.height = '150px';
    canvas.style.zIndex = '2';
    canvas.style.imageRendering = 'pixelated';
    canvas.style.border = '1px solid #333';
    canvas.style.margin = '4px';
    canvas.width = 400;
    canvas.height = 300;
    document.getElementById('desktop')?.appendChild(canvas);
    return canvas;
  },

  _drawApartment(ctx, w, h) {
    Pixel.drawRect(ctx, 0, 0, w, h, '#2b2b2b');
    Pixel.drawRect(ctx, 10, h - 80, 80, 70, '#5c3a1e');
    Pixel.drawRect(ctx, 15, h - 75, 15, 15, '#8b6914');
    Pixel.drawRect(ctx, 65, h - 75, 15, 15, '#8b6914');
    Pixel.drawRect(ctx, 120, h - 60, 60, 50, '#3a3a3a');
    Pixel.drawRect(ctx, 125, h - 55, 15, 10, '#4488ff');
    Pixel.drawRect(ctx, 155, h - 55, 15, 10, '#4488ff');
    Pixel.drawRect(ctx, 260, 20, 120, 100, '#4a6a8a');
    Pixel.drawRect(ctx, 265, 25, 30, 30, '#6ab0ff');
    Pixel.drawRect(ctx, 310, 25, 30, 30, '#6ab0ff');
    Pixel.drawRect(ctx, 265, 70, 30, 30, '#6ab0ff');
    Pixel.drawRect(ctx, 310, 70, 30, 30, '#6ab0ff');
    Pixel.drawRect(ctx, 310, 150, 10, 100, '#5c3a1e');
    Pixel.drawText(ctx, '🏠 出租屋', 10, 10, '#c0c0c0', 14);
  },

  _drawConvenience(ctx, w, h) {
    Pixel.drawRect(ctx, 0, 0, w, h, '#1a1a2e');
    for (let i = 0; i < 4; i++) {
      Pixel.drawRect(ctx, 20 + i * 90, 30, 70, 90, '#3a3a4a');
      Pixel.drawRect(ctx, 25 + i * 90, 35, 60, 20, '#ff4444');
      Pixel.drawRect(ctx, 25 + i * 90, 60, 60, 20, '#00c853');
      Pixel.drawRect(ctx, 25 + i * 90, 85, 60, 20, '#4488ff');
    }
    Pixel.drawText(ctx, '🏪 便利店', 10, 10, '#c0c0c0', 14);
  },

  _drawBank(ctx, w, h) {
    Pixel.drawRect(ctx, 0, 0, w, h, '#1a2a1a');
    Pixel.drawRect(ctx, 50, 50, 300, 150, '#3a4a3a');
    for (let i = 0; i < 3; i++) {
      Pixel.drawRect(ctx, 80 + i * 90, 80, 70, 90, '#2a3a2a');
      Pixel.drawRect(ctx, 85 + i * 90, 100, 60, 10, '#00ff00');
    }
    Pixel.drawText(ctx, '🏦 银行', 10, 10, '#c0c0c0', 14);
  },

  _drawCompany(ctx, w, h) {
    Pixel.drawRect(ctx, 0, 0, w, h, '#1a2a2a');
    for (let i = 0; i < 4; i++) {
      Pixel.drawRect(ctx, 20 + i * 90, 40, 80, 50, '#3a4a4a');
      Pixel.drawRect(ctx, 25 + i * 90, 45, 40, 15, '#4488ff');
      Pixel.drawRect(ctx, 70 + i * 90, 45, 20, 15, '#00c853');
    }
    Pixel.drawRect(ctx, 50, 150, 300, 10, '#5a5a5a');
    Pixel.drawText(ctx, '🏢 公司', 10, 10, '#c0c0c0', 14);
  },

  _drawGeneric(ctx, w, h, sceneId) {
    Pixel.drawRect(ctx, 0, 0, w, h, '#2b2b2b');
    Pixel.drawText(ctx, '📍 ' + (this.scenes[sceneId]?.name || sceneId), 10, 10, '#c0c0c0', 14);
  },
};
