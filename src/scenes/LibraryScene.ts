import * as Phaser from 'phaser';

const BOOKS = ['炒股入门', '管理之道', '社交的艺术', '钓鱼技巧', '商界传奇', '申海市志'];

class LibraryScene extends Phaser.Scene {
  private escKey!: Phaser.Input.Keyboard.Key;
  private msgTxt!: Phaser.GameObjects.Text;

  constructor() { super({ key: 'LibraryScene' }); }

  create(): void {
    this.cameras.main.setBackgroundColor('#5c4a3a');
    const wall = 0x7a6a4a;
    this.add.rectangle(0, 360, 20, 720, wall).setDepth(0);
    this.add.rectangle(1280, 360, 20, 720, wall).setDepth(0);
    this.add.rectangle(640, 0, 1280, 20, wall).setDepth(0);
    this.add.rectangle(640, 720, 1280, 20, wall).setDepth(0);

    // 书架
    for (let c = 0; c < 4; c++) {
      const x = 200 + c * 280;
      this.add.rectangle(x, 180, 100, 200, 0x8b6b4a).setDepth(0).setStrokeStyle(2, 0x5a4a2a);
      this.add.text(x, 90, `书架${c + 1}`, { fontFamily: 'sans-serif', fontSize: '12px', color: '#ccbbaa' }).setOrigin(0.5);
    }

    // 阅读桌
    this.add.rectangle(640, 400, 500, 30, 0x6a5a3a).setDepth(0).setStrokeStyle(1, 0x8b7355);
    this.add.text(640, 390, '📖 阅读区 - 点击书架读书提升技能', {
      fontFamily: 'sans-serif', fontSize: '14px', color: '#ccbbaa',
    }).setOrigin(0.5);

    // 可点击书架(E)
    for (let c = 0; c < 4; c++) {
      const x = 200 + c * 280;
      const btn = this.add.rectangle(x, 180, 100, 200, 0x000000, 0.01).setInteractive({ useHandCursor: true });
      const book = BOOKS[c % BOOKS.length];
      const skills = ['炒股', '管理', '社交', '钓鱼'];
      btn.on('pointerdown', () => {
        this.showMsg(`正在阅读《${book}》... ${skills[c % 4]}技能+5`);
      });
    }

    this.msgTxt = this.add.text(640, 560, '', {
      fontFamily: 'sans-serif', fontSize: '15px', color: '#ffcc00',
    }).setOrigin(0.5).setDepth(5);

    this.add.rectangle(640, 680, 100, 40, 0x6a5a3a).setStrokeStyle(2, 0xffffff);
    this.add.text(640, 700, '🚪 离开 (ESC)', {
      fontFamily: 'sans-serif', fontSize: '12px', color: '#ffffff', backgroundColor: '#00000080', padding: { x: 6, y: 3 },
    }).setOrigin(0.5, 0);

    this.add.text(640, 30, '📚 申海市图书馆', {
      fontFamily: 'sans-serif', fontSize: '22px', color: '#ddccaa', backgroundColor: '#00000080', padding: { x: 12, y: 6 },
    }).setOrigin(0.5);

    this.escKey = this.input.keyboard!.addKey(Phaser.Input.Keyboard.KeyCodes.ESC);
  }

  private showMsg(msg: string): void {
    this.msgTxt.setText(msg);
    this.msgTxt.setAlpha(1);
    this.time.delayedCall(2000, () => this.tweens.add({ targets: this.msgTxt, alpha: 0, duration: 400 }));
  }

  update(): void { if (Phaser.Input.Keyboard.JustDown(this.escKey)) this.scene.start('DowntownScene'); }
}

export default LibraryScene;
