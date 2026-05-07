import * as Phaser from 'phaser';

class ApartmentScene extends Phaser.Scene {
  private escKey!: Phaser.Input.Keyboard.Key;

  constructor() {
    super({ key: 'ApartmentScene' });
  }

  create(): void {
    this.cameras.main.setBounds(0, 0, 1280, 720);

    // 室内地板
    this.add.rectangle(640, 360, 1280, 720, 0x5c3e2e).setDepth(0);

    // 墙壁
    const wallColor = 0x8b7355;
    this.add.rectangle(0, 360, 20, 720, wallColor).setDepth(0);
    this.add.rectangle(1280, 360, 20, 720, wallColor).setDepth(0);
    this.add.rectangle(640, 0, 1280, 20, wallColor).setDepth(0);
    this.add.rectangle(640, 720, 1280, 20, wallColor).setDepth(0);

    // 家具占位
    const furniture = [
      { x: 150, y: 200, w: 60, h: 100, label: '床', color: 0xcc8888 },
      { x: 350, y: 200, w: 50, h: 40, label: '电脑', color: 0x888888 },
      { x: 500, y: 200, w: 80, h: 40, label: '电视', color: 0x444444 },
      { x: 150, y: 450, w: 100, h: 40, label: '沙发', color: 0xaa8866 },
      { x: 350, y: 500, w: 60, h: 60, label: '灶台', color: 0xcccccc },
      { x: 500, y: 500, w: 50, h: 60, label: '冰箱', color: 0xaaddff },
      { x: 700, y: 450, w: 60, h: 60, label: '餐桌', color: 0x996633 },
    ];

    furniture.forEach((f) => {
      this.add.rectangle(f.x, f.y, f.w, f.h, f.color).setDepth(2).setStrokeStyle(1, 0xffffff);
      this.add.text(f.x, f.y + f.h / 2 + 15, f.label, {
        fontFamily: 'sans-serif', fontSize: '10px', color: '#ffffff',
      }).setOrigin(0.5, 0).setDepth(3);
    });

    // 出口门（底部）
    const door = this.add.rectangle(640, 680, 100, 40, 0x663931).setDepth(2).setStrokeStyle(2, 0xffffff);
    this.add.text(640, 700, '🚪 出门 (E)', {
      fontFamily: 'sans-serif', fontSize: '14px', color: '#ffffff',
      backgroundColor: '#00000080', padding: { x: 8, y: 4 },
    }).setOrigin(0.5, 0).setDepth(3);

    // 场景标题
    this.add.text(640, 40, '出租屋 — 我的家', {
      fontFamily: 'sans-serif', fontSize: '20px', color: '#ffffff',
      backgroundColor: '#00000080', padding: { x: 12, y: 6 },
    }).setOrigin(0.5, 0.5).setDepth(10);

    // 返回提示
    this.add.text(640, 160, '按 W 走到门口 → 按 E 出门', {
      fontFamily: 'sans-serif', fontSize: '12px', color: '#aaaaaa',
      backgroundColor: '#00000080', padding: { x: 6, y: 3 },
    }).setOrigin(0.5, 0.5).setDepth(10);

    this.escKey = this.input.keyboard!.addKey(Phaser.Input.Keyboard.KeyCodes.ESC);

    console.log('[ApartmentScene] 公寓场景已加载');
  }

  update(): void {
    if (Phaser.Input.Keyboard.JustDown(this.escKey)) {
      this.scene.start('CityScene');
    }
  }
}

export default ApartmentScene;
