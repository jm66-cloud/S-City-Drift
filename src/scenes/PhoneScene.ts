import * as Phaser from 'phaser';

class PhoneScene extends Phaser.Scene {
  private inventory: string[] = [];
  private returnScene = 'SuburbScene';

  constructor() { super({ key: 'PhoneScene' }); }

  init(data: { returnScene: string; inventory?: string[] }): void {
    this.returnScene = data.returnScene;
    this.inventory = data.inventory || [];
  }

  create(): void {
    this.add.rectangle(640, 360, 1280, 720, 0x000000, 0.6).setDepth(0);

    // 手机外壳
    const phone = this.add.rectangle(640, 360, 320, 580, 0x222244).setDepth(1).setStrokeStyle(3, 0x444488);
    this.add.text(640, 100, '📱 智能手机', {
      fontFamily: 'sans-serif', fontSize: '18px', color: '#ffcc00',
    }).setOrigin(0.5).setDepth(2);

    // 快捷按钮
    const btns = [
      { y: 150, icon: '🎒', label: '背包', action: () => this.showInventory() },
      { y: 210, icon: '🗺', label: '地图', action: () => this.showMap() },
      { y: 270, icon: '💾', label: '存档', action: () => this.saveGame() },
      { y: 330, icon: '🎵', label: '音乐', action: () => this.toggleMusic() },
      { y: 390, icon: '💤', label: '睡觉', action: () => this.goSleep() },
    ];

    btns.forEach(({ y, icon, label, action }) => {
      const btn = this.add.rectangle(640, y, 260, 44, 0x333366).setDepth(2).setStrokeStyle(1, 0x6666aa).setInteractive({ useHandCursor: true });
      btn.on('pointerover', () => btn.setFillStyle(0x444488));
      btn.on('pointerout', () => btn.setFillStyle(0x333366));
      btn.on('pointerdown', action);
      this.add.text(560, y, `${icon} ${label}`, {
        fontFamily: 'sans-serif', fontSize: '16px', color: '#ffffff',
      }).setOrigin(0, 0.5).setDepth(3);
    });

    // 关闭
    this.add.text(640, 650, '按 Tab 关闭', {
      fontFamily: 'sans-serif', fontSize: '12px', color: '#888888',
    }).setOrigin(0.5).setDepth(2);

    this.input.keyboard!.on('keydown-TAB', () => this.closePhone());
    this.input.keyboard!.on('keydown-ESC', () => this.closePhone());
  }

  private showInventory(): void {
    this.clearExtra();

    this.add.text(640, 160, '🎒 背包', {
      fontFamily: 'sans-serif', fontSize: '18px', color: '#ffcc00',
    }).setOrigin(0.5).setDepth(10);

    if (this.inventory.length === 0) {
      this.add.text(640, 250, '背包空空如也...', {
        fontFamily: 'sans-serif', fontSize: '14px', color: '#888888',
      }).setOrigin(0.5).setDepth(10);
      return;
    }

    const counts: Record<string, number> = {};
    this.inventory.forEach(id => { counts[id] = (counts[id] || 0) + 1; });

    const names: Record<string, string> = {
      'bread': '🍞 面包', 'cola': '🥤 可乐', 'noodle': '🍜 泡面', 'egg': '🥚 鸡蛋',
      'rice': '🍚 米饭', 'tomato': '🍅 番茄', 'coffee': '☕ 咖啡', 'cake': '🍰 蛋糕',
      'medicine': '💊 感冒药', 'fish': '🐟 鲜鱼', 'fried_egg': '🍳 煎蛋', 'tomato_egg': '🥘 番茄炒蛋',
      'rice_plain': '🍚 白米饭', 'noodle_cooked': '🍜 煮泡面', 'fish_rice': '🐟 鱼饭',
    };

    let y = 200;
    Object.entries(counts).forEach(([id, qty]) => {
      const name = names[id] || id;
      const btn = this.add.text(560, y, `  ${name} ×${qty}`, {
        fontFamily: 'sans-serif', fontSize: '13px', color: '#cccccc',
      }).setOrigin(0, 0.5).setDepth(10);
      y += 25;
    });

    const backBtn = this.add.rectangle(640, y + 20, 200, 30, 0x445544).setDepth(10).setInteractive({ useHandCursor: true });
    this.add.text(640, y + 20, '◀ 返回', { fontFamily: 'sans-serif', fontSize: '13px', color: '#ffffff' }).setOrigin(0.5).setDepth(11);
    backBtn.on('pointerdown', () => {
      this.scene.restart({ returnScene: this.returnScene, inventory: this.inventory });
    });
  }

  private showMap(): void {
    this.clearExtra();
    this.add.text(640, 200, '🗺 城市地图', {
      fontFamily: 'sans-serif', fontSize: '16px', color: '#ffcc00',
    }).setOrigin(0.5).setDepth(10);
    this.add.text(640, 260, '🏘 住宅区  🚇 市中心', {
      fontFamily: 'sans-serif', fontSize: '13px', color: '#aaaacc',
    }).setOrigin(0.5).setDepth(10);
    this.add.text(640, 290, '🛍 商业街  🏖 东沙滩', {
      fontFamily: 'sans-serif', fontSize: '13px', color: '#aaaacc',
    }).setOrigin(0.5).setDepth(10);
  }

  private saveGame(): void {
    this.clearExtra();
    localStorage.setItem('shenhai_save', JSON.stringify({ timestamp: Date.now() }));
    this.add.text(640, 250, '✅ 游戏已保存！', {
      fontFamily: 'sans-serif', fontSize: '16px', color: '#88ff88',
    }).setOrigin(0.5).setDepth(10);
  }

  private toggleMusic(): void {
    this.clearExtra();
    this.add.text(640, 250, '🎵 BGM 已切换 (开发中)', {
      fontFamily: 'sans-serif', fontSize: '14px', color: '#ffcc88',
    }).setOrigin(0.5).setDepth(10);
  }

  private goSleep(): void {
    this.clearExtra();
    this.add.text(640, 250, '💤 回家睡觉...明天又是新的一天！', {
      fontFamily: 'sans-serif', fontSize: '14px', color: '#ffcc88',
    }).setOrigin(0.5).setDepth(10);
  }

  private closePhone(): void {
    this.scene.resume(this.returnScene);
    this.scene.stop();
  }

  private clearExtra(): void {
    this.children.list
      .filter(c => (c as Phaser.GameObjects.GameObject).depth >= 10)
      .forEach(c => c.destroy());
  }
}

export default PhoneScene;
