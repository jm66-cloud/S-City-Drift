import * as Phaser from 'phaser';

class KTVScene extends Phaser.Scene {
  private escKey!: Phaser.Input.Keyboard.Key;
  private msgTxt!: Phaser.GameObjects.Text;

  constructor() { super({ key: 'KTVScene' }); }

  create(): void {
    this.cameras.main.setBackgroundColor('#2a1a3a');
    const wall = 0x4a2a5a;
    this.add.rectangle(0, 360, 20, 720, wall); this.add.rectangle(1280, 360, 20, 720, wall);
    this.add.rectangle(640, 0, 1280, 20, wall); this.add.rectangle(640, 720, 1280, 20, wall);

    // 舞台
    this.add.rectangle(640, 150, 400, 80, 0x553366).setStrokeStyle(2, 0xaa66cc);
    // 灯光效果点
    for (let i = 0; i < 8; i++) {
      const lx = 440 + i * 50;
      const c = [0xff66ff, 0x66ffff, 0xffcc66, 0xff6666, 0x66ff66, 0x6666ff, 0xff66ff, 0x66ffff][i];
      this.add.rectangle(lx, 130, 20, 10, c, 0.5);
    }
    this.add.text(640, 160, '🎤 舞台', { fontFamily: 'sans-serif', fontSize: '16px', color: '#ffccff' }).setOrigin(0.5);

    // 包间
    for (let i = 0; i < 3; i++) {
      const x = 250 + i * 350;
      this.add.rectangle(x, 400, 200, 150, 0x3a2a4a).setStrokeStyle(1, 0x553366);
      this.add.text(x, 350, `包间 ${i + 1}`, { fontFamily: 'sans-serif', fontSize: '14px', color: '#ccaaee' }).setOrigin(0.5);
      const singBtn = this.add.rectangle(x, 440, 120, 30, 0x663377).setInteractive({ useHandCursor: true });
      this.add.text(x, 440, '🎵 唱歌减压', { fontFamily: 'sans-serif', fontSize: '12px', color: '#ffccff' }).setOrigin(0.5);
      singBtn.on('pointerdown', () => this.showMsg('♪♫♪ 尽情歌唱... 压力-15！'));
    }

    this.msgTxt = this.add.text(640, 560, '', {
      fontFamily: 'sans-serif', fontSize: '15px', color: '#ffccff',
    }).setOrigin(0.5).setDepth(5);

    this.add.rectangle(640, 680, 100, 40, 0x553366).setStrokeStyle(2, 0xffffff);
    this.add.text(640, 700, '🚪 离开 (ESC)', { fontFamily: 'sans-serif', fontSize: '12px', color: '#ffffff', backgroundColor: '#00000080', padding: { x: 6, y: 3 } }).setOrigin(0.5, 0);

    this.add.text(640, 30, '🎤 申海KTV', { fontFamily: 'sans-serif', fontSize: '22px', color: '#ffccff', backgroundColor: '#00000080', padding: { x: 12, y: 6 } }).setOrigin(0.5);

    this.escKey = this.input.keyboard!.addKey(Phaser.Input.Keyboard.KeyCodes.ESC);
  }

  private showMsg(msg: string): void {
    this.msgTxt.setText(msg); this.msgTxt.setAlpha(1);
    this.time.delayedCall(2000, () => this.tweens.add({ targets: this.msgTxt, alpha: 0, duration: 400 }));
  }

  update(): void { if (Phaser.Input.Keyboard.JustDown(this.escKey)) this.scene.start('CommercialScene'); }
}

export default KTVScene;
