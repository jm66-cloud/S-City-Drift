import * as Phaser from 'phaser';

class PoliceScene extends Phaser.Scene {
  private escKey!: Phaser.Input.Keyboard.Key;

  constructor() { super({ key: 'PoliceScene' }); }

  create(): void {
    this.cameras.main.setBackgroundColor('#4a4a5a');
    const wall = 0x5a5a6e;
    this.add.rectangle(0, 360, 20, 720, wall); this.add.rectangle(1280, 360, 20, 720, wall);
    this.add.rectangle(640, 0, 1280, 20, wall); this.add.rectangle(640, 720, 1280, 20, wall);

    // 服务柜台
    this.add.rectangle(640, 200, 700, 60, 0x666688).setStrokeStyle(2, 0x8888aa);
    this.add.text(640, 190, '──── 警务大厅 ────', { fontFamily: 'sans-serif', fontSize: '18px', color: '#aaaacc' }).setOrigin(0.5);

    // 服务窗口
    const windows = ['📋 报案登记', '🔍 失物招领', '📞 户籍办理', '👮 巡逻调度'];
    windows.forEach((w, i) => {
      const x = 250 + i * 250;
      this.add.rectangle(x, 400, 180, 100, 0x555577).setStrokeStyle(1, 0x8888aa);
      this.add.text(x, 410, w, { fontFamily: 'sans-serif', fontSize: '14px', color: '#ffffff' }).setOrigin(0.5, 0);
    });

    // 拘留室
    this.add.rectangle(1050, 550, 160, 130, 0x444455).setStrokeStyle(3, 0x666688);
    this.add.text(1050, 560, '🔒 拘留室', { fontFamily: 'sans-serif', fontSize: '14px', color: '#ff6666' }).setOrigin(0.5, 0);

    this.add.rectangle(640, 680, 100, 40, 0x556688).setStrokeStyle(2, 0xffffff);
    this.add.text(640, 700, '🚪 离开 (ESC)', { fontFamily: 'sans-serif', fontSize: '12px', color: '#ffffff', backgroundColor: '#00000080', padding: { x: 6, y: 3 } }).setOrigin(0.5, 0);

    this.add.text(640, 30, '👮 申海市派出所', { fontFamily: 'sans-serif', fontSize: '22px', color: '#aaccff', backgroundColor: '#00000080', padding: { x: 12, y: 6 } }).setOrigin(0.5);

    this.escKey = this.input.keyboard!.addKey(Phaser.Input.Keyboard.KeyCodes.ESC);
  }

  update(): void { if (Phaser.Input.Keyboard.JustDown(this.escKey)) this.scene.start('DowntownScene'); }
}

export default PoliceScene;
