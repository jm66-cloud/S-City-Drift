import * as Phaser from 'phaser';

class ExchangeScene extends Phaser.Scene {
  private escKey!: Phaser.Input.Keyboard.Key;

  constructor() {
    super({ key: 'ExchangeScene' });
  }

  create(): void {
    this.cameras.main.setBounds(0, 0, 1280, 720);

    // 室内地板
    this.add.rectangle(640, 360, 1280, 720, 0x3a3a4a).setDepth(0);

    // 墙壁
    const wallColor = 0x5a5a6e;
    this.add.rectangle(0, 360, 20, 720, wallColor).setDepth(0);
    this.add.rectangle(1280, 360, 20, 720, wallColor).setDepth(0);
    this.add.rectangle(640, 0, 1280, 20, wallColor).setDepth(0);
    this.add.rectangle(640, 720, 1280, 20, wallColor).setDepth(0);

    // 交易大厅柜台
    this.add.rectangle(640, 250, 800, 40, 0x888888).setDepth(2).setStrokeStyle(1, 0xffffff);
    this.add.text(640, 240, '──── 交易柜台 ────', {
      fontFamily: 'sans-serif', fontSize: '16px', color: '#ffff88',
    }).setOrigin(0.5, 0.5).setDepth(3);

    // K线屏（简化占位）
    this.add.rectangle(640, 450, 600, 180, 0x111122).setDepth(2).setStrokeStyle(2, 0x4488cc);
    this.add.text(640, 450, '📈 K线图区域\n（功能开发中...）', {
      fontFamily: 'sans-serif', fontSize: '18px', color: '#88ccff',
      align: 'center',
    }).setOrigin(0.5, 0.5).setDepth(3);

    // 出口门
    const door = this.add.rectangle(640, 680, 100, 40, 0xdf7126).setDepth(2).setStrokeStyle(2, 0xffffff);
    this.add.text(640, 700, '🚪 离开交易所 (ESC)', {
      fontFamily: 'sans-serif', fontSize: '14px', color: '#ffffff',
      backgroundColor: '#00000080', padding: { x: 8, y: 4 },
    }).setOrigin(0.5, 0).setDepth(3);

    // 标题
    this.add.text(640, 40, '📈 申海证券交易所', {
      fontFamily: 'sans-serif', fontSize: '22px', color: '#ffcc00',
      backgroundColor: '#00000080', padding: { x: 12, y: 6 },
    }).setOrigin(0.5, 0.5).setDepth(10);

    this.escKey = this.input.keyboard!.addKey(Phaser.Input.Keyboard.KeyCodes.ESC);

    console.log('[ExchangeScene] 交易所场景已加载');
  }

  update(): void {
    if (Phaser.Input.Keyboard.JustDown(this.escKey)) {
      this.scene.start('CityScene');
    }
  }
}

export default ExchangeScene;
