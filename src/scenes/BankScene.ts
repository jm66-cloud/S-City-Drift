import * as Phaser from 'phaser';

class BankScene extends Phaser.Scene {
  private escKey!: Phaser.Input.Keyboard.Key;

  constructor() { super({ key: 'BankScene' }); }

  create(): void {
    this.add.rectangle(640, 360, 1280, 720, 0x3a3a3a);

    // 柜台
    this.add.rectangle(640, 300, 800, 60, 0x555566).setDepth(2).setStrokeStyle(2, 0x888888);
    this.add.text(640, 290, '──── 银行柜台 ────', { fontFamily: 'sans-serif', fontSize: '16px', color: '#aaccff' }).setOrigin(0.5).setDepth(3);

    // 服务项目
    const services = ['🏦 开户 / 销户', '💰 贷款申请', '📊 理财产品', '🔐 保险箱'];
    services.forEach((s, i) => {
      this.add.text(300 + i * 180, 450, s, {
        fontFamily: 'sans-serif', fontSize: '14px', color: '#cccccc',
        backgroundColor: '#444455', padding: { x: 10, y: 6 },
      }).setOrigin(0.5).setDepth(3);
    });

    this.add.rectangle(640, 680, 100, 40, 0x3a5a3a).setDepth(2).setStrokeStyle(2, 0xffffff);
    this.add.text(640, 700, '🚪 离开 (ESC)', { fontFamily: 'sans-serif', fontSize: '12px', color: '#ffffff', backgroundColor: '#00000080', padding: { x: 6, y: 3 } }).setOrigin(0.5, 0).setDepth(3);

    this.add.text(640, 40, '🏦 申海银行总部', { fontFamily: 'sans-serif', fontSize: '22px', color: '#aaccff', backgroundColor: '#00000080', padding: { x: 12, y: 6 } }).setOrigin(0.5).setDepth(10);

    this.escKey = this.input.keyboard!.addKey(Phaser.Input.Keyboard.KeyCodes.ESC);
  }

  update(): void { if (Phaser.Input.Keyboard.JustDown(this.escKey)) this.scene.start('CityScene'); }
}

export default BankScene;
