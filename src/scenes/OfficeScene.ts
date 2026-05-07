import * as Phaser from 'phaser';

class OfficeScene extends Phaser.Scene {
  private escKey!: Phaser.Input.Keyboard.Key;

  constructor() { super({ key: 'OfficeScene' }); }

  create(): void {
    this.add.rectangle(640, 360, 1280, 720, 0x3a4a3a);
    const wall = 0x5a5a4a;
    this.add.rectangle(0, 360, 20, 720, wall).setDepth(0);
    this.add.rectangle(1280, 360, 20, 720, wall).setDepth(0);
    this.add.rectangle(640, 0, 1280, 20, wall).setDepth(0);
    this.add.rectangle(640, 720, 1280, 20, wall).setDepth(0);

    // 办公桌区域
    for (let i = 0; i < 3; i++) {
      const y = 200 + i * 150;
      this.add.rectangle(300, y, 120, 60, 0x666666).setDepth(2).setStrokeStyle(1, 0xffffff);
      this.add.text(300, y, `工位 ${i + 1}`, { fontFamily: 'sans-serif', fontSize: '12px', color: '#ffffff' }).setOrigin(0.5).setDepth(3);
      this.add.rectangle(700, y, 120, 60, 0x666666).setDepth(2).setStrokeStyle(1, 0xffffff);
      this.add.text(700, y, `工位 ${i + 4}`, { fontFamily: 'sans-serif', fontSize: '12px', color: '#ffffff' }).setOrigin(0.5).setDepth(3);
    }

    // 经理办公室
    this.add.rectangle(900, 550, 180, 100, 0x885522).setDepth(2).setStrokeStyle(2, 0xffffff);
    this.add.text(900, 560, '经理办公室', { fontFamily: 'sans-serif', fontSize: '14px', color: '#ffcc88' }).setOrigin(0.5, 0).setDepth(3);

    // 门
    this.add.rectangle(640, 680, 100, 40, 0x666633).setDepth(2).setStrokeStyle(2, 0xffffff);
    this.add.text(640, 700, '🚪 离开 (ESC)', { fontFamily: 'sans-serif', fontSize: '12px', color: '#ffffff', backgroundColor: '#00000080', padding: { x: 6, y: 3 } }).setOrigin(0.5, 0).setDepth(3);

    this.add.text(640, 40, '💼 办公室', { fontFamily: 'sans-serif', fontSize: '22px', color: '#ffffff', backgroundColor: '#00000080', padding: { x: 12, y: 6 } }).setOrigin(0.5).setDepth(10);

    this.escKey = this.input.keyboard!.addKey(Phaser.Input.Keyboard.KeyCodes.ESC);
  }

  update(): void { if (Phaser.Input.Keyboard.JustDown(this.escKey)) this.scene.start('CityScene'); }
}

export default OfficeScene;
