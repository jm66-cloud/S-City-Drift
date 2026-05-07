import * as Phaser from 'phaser';

class StoreScene extends Phaser.Scene {
  private escKey!: Phaser.Input.Keyboard.Key;

  constructor() {
    super({ key: 'StoreScene' });
  }

  create(): void {
    this.cameras.main.setBounds(0, 0, 1280, 720);

    // 室内地板
    this.add.rectangle(640, 360, 1280, 720, 0xd4d4c8).setDepth(0);

    // 墙
    const wallColor = 0xaaaaaa;
    this.add.rectangle(0, 360, 20, 720, wallColor).setDepth(0);
    this.add.rectangle(1280, 360, 20, 720, wallColor).setDepth(0);
    this.add.rectangle(640, 0, 1280, 20, wallColor).setDepth(0);
    this.add.rectangle(640, 720, 1280, 20, wallColor).setDepth(0);

    // 货架
    for (let i = 0; i < 3; i++) {
      const x = 300 + i * 320;
      this.add.rectangle(x, 250, 120, 300, 0xccccaa).setDepth(2).setStrokeStyle(1, 0x888888);
      this.add.text(x, 120, `货架 ${i + 1}`, {
        fontFamily: 'sans-serif', fontSize: '12px', color: '#444444',
      }).setOrigin(0.5, 0.5).setDepth(3);
    }

    // 收银台
    this.add.rectangle(1000, 550, 120, 60, 0xaa8866).setDepth(2).setStrokeStyle(1, 0xffffff);
    this.add.text(1000, 570, '收银台', {
      fontFamily: 'sans-serif', fontSize: '12px', color: '#ffffff',
    }).setOrigin(0.5, 0).setDepth(3);

    // 出口
    const door = this.add.rectangle(640, 680, 100, 40, 0x45283c).setDepth(2).setStrokeStyle(2, 0xffffff);
    this.add.text(640, 700, '🚪 离开便利店 (ESC)', {
      fontFamily: 'sans-serif', fontSize: '14px', color: '#ffffff',
      backgroundColor: '#00000080', padding: { x: 8, y: 4 },
    }).setOrigin(0.5, 0).setDepth(3);

    // 商品价格牌
    const items = [
      { x: 300, y: 350, name: '🍞 面包', price: '¥15' },
      { x: 620, y: 350, name: '🥤 可乐', price: '¥20' },
      { x: 940, y: 350, name: '🍜 泡面', price: '¥30' },
    ];
    items.forEach(item => {
      this.add.text(item.x, item.y, `${item.name}\n${item.price}`, {
        fontFamily: 'sans-serif', fontSize: '11px', color: '#333333',
        backgroundColor: '#ffffaa', padding: { x: 6, y: 3 }, align: 'center',
      }).setOrigin(0.5, 0.5).setDepth(4);
    });

    // 标题
    this.add.text(640, 40, '🏪 海风便利店', {
      fontFamily: 'sans-serif', fontSize: '22px', color: '#45283c',
      backgroundColor: '#ffffff', padding: { x: 12, y: 6 },
    }).setOrigin(0.5, 0.5).setDepth(10);

    this.escKey = this.input.keyboard!.addKey(Phaser.Input.Keyboard.KeyCodes.ESC);

    console.log('[StoreScene] 便利店场景已加载');
  }

  update(): void {
    if (Phaser.Input.Keyboard.JustDown(this.escKey)) {
      this.scene.start('CityScene');
    }
  }
}

export default StoreScene;
