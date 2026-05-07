import * as Phaser from 'phaser';

class BarScene extends Phaser.Scene {
  private escKey!: Phaser.Input.Keyboard.Key;

  constructor() { super({ key: 'BarScene' }); }

  create(): void {
    this.cameras.main.setBackgroundColor('#2a2a1a');
    const wall = 0x4a3a2a;
    this.add.rectangle(0, 360, 20, 720, wall); this.add.rectangle(1280, 360, 20, 720, wall);
    this.add.rectangle(640, 0, 1280, 20, wall); this.add.rectangle(640, 720, 1280, 20, wall);

    // 吧台
    this.add.rectangle(640, 180, 600, 50, 0x664433).setStrokeStyle(2, 0x997766);
    this.add.text(640, 170, '🍺 吧台', { fontFamily: 'sans-serif', fontSize: '16px', color: '#ffcc88' }).setOrigin(0.5);

    // 酒柜
    const bottles = [
      { x: 420, c: 0xffcc44, label: '🍺 啤酒 ¥30' },
      { x: 520, c: 0xff6644, label: '🍷 红酒 ¥80' },
      { x: 620, c: 0xddcc44, label: '🥃 威士忌 ¥120' },
      { x: 720, c: 0x88ddff, label: '🍸 鸡尾酒 ¥95' },
      { x: 820, c: 0xaaddaa, label: '🍵 清酒 ¥60' },
    ];
    bottles.forEach(b => {
      this.add.rectangle(b.x, 210, 50, 80, b.c).setStrokeStyle(1, 0xffffff);
      this.add.text(b.x, 260, b.label, { fontFamily: 'sans-serif', fontSize: '10px', color: '#ffffff' }).setOrigin(0.5, 0);
    });

    // 桌区
    for (let i = 0; i < 4; i++) {
      this.add.rectangle(250 + i * 220, 450, 50, 50, 0x553322).setStrokeStyle(1, 0x776644);
    }

    // 飞镖
    this.add.rectangle(1050, 400, 100, 60, 0x334422).setStrokeStyle(1, 0x88aa66);
    this.add.text(1050, 410, '🎯 飞镖', { fontFamily: 'sans-serif', fontSize: '12px', color: '#aacc88' }).setOrigin(0.5, 0);

    this.add.rectangle(640, 680, 100, 40, 0x553322).setStrokeStyle(2, 0xffffff);
    this.add.text(640, 700, '🚪 离开 (ESC)', { fontFamily: 'sans-serif', fontSize: '12px', color: '#ffffff', backgroundColor: '#00000080', padding: { x: 6, y: 3 } }).setOrigin(0.5, 0);

    this.add.text(640, 30, '🍺 海风酒吧', { fontFamily: 'sans-serif', fontSize: '22px', color: '#ffcc88', backgroundColor: '#00000080', padding: { x: 12, y: 6 } }).setOrigin(0.5);

    this.escKey = this.input.keyboard!.addKey(Phaser.Input.Keyboard.KeyCodes.ESC);
  }

  update(): void { if (Phaser.Input.Keyboard.JustDown(this.escKey)) this.scene.start('CommercialScene'); }
}

export default BarScene;
