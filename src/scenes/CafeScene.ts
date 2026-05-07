import * as Phaser from 'phaser';

class CafeScene extends Phaser.Scene {
  private escKey!: Phaser.Input.Keyboard.Key;

  constructor() { super({ key: 'CafeScene' }); }

  create(): void {
    this.add.rectangle(640, 360, 1280, 720, 0x4a3520);
    const wall = 0x6b4f3d;
    this.add.rectangle(0, 360, 20, 720, wall);
    this.add.rectangle(1280, 360, 20, 720, wall);
    this.add.rectangle(640, 0, 1280, 20, wall);
    this.add.rectangle(640, 720, 1280, 20, wall);

    // 咖啡桌
    for (let i = 0; i < 4; i++) {
      const x = 250 + i * 200;
      this.add.rectangle(x, 300, 60, 60, 0x885533).setDepth(2).setStrokeStyle(1, 0xffffff);
      this.add.text(x, 290, '☕', { fontFamily: 'sans-serif', fontSize: '20px' }).setOrigin(0.5).setDepth(3);
    }

    // 吧台
    this.add.rectangle(1000, 400, 200, 80, 0x775533).setDepth(2).setStrokeStyle(2, 0xffffff);
    this.add.text(1000, 410, '☕ 吧台', { fontFamily: 'sans-serif', fontSize: '14px', color: '#ffcc88' }).setOrigin(0.5, 0).setDepth(3);

    // 菜单
    const menu = ['☕ 美式咖啡 ¥80', '🍵 抹茶拿铁 ¥120', '🍰 芝士蛋糕 ¥200'];
    menu.forEach((item, i) => {
      this.add.text(200, 500 + i * 25, item, { fontFamily: 'sans-serif', fontSize: '13px', color: '#ddccaa' }).setDepth(3);
    });

    this.add.rectangle(640, 680, 100, 40, 0x8b6914).setDepth(2).setStrokeStyle(2, 0xffffff);
    this.add.text(640, 700, '🚪 离开 (ESC)', { fontFamily: 'sans-serif', fontSize: '12px', color: '#ffffff', backgroundColor: '#00000080', padding: { x: 6, y: 3 } }).setOrigin(0.5, 0).setDepth(3);

    this.add.text(640, 40, '☕ 海风咖啡馆', { fontFamily: 'sans-serif', fontSize: '22px', color: '#ddccaa', backgroundColor: '#00000080', padding: { x: 12, y: 6 } }).setOrigin(0.5).setDepth(10);

    this.escKey = this.input.keyboard!.addKey(Phaser.Input.Keyboard.KeyCodes.ESC);
  }

  update(): void { if (Phaser.Input.Keyboard.JustDown(this.escKey)) this.scene.start('CityScene'); }
}

export default CafeScene;
