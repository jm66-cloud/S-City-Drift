import * as Phaser from 'phaser';
import { hasSave, loadGame, createNewSave } from '../data/SaveSystem';

class TitleScene extends Phaser.Scene {
  constructor() { super({ key: 'TitleScene' }); }

  create(): void {
    this.cameras.main.setBackgroundColor('#1a1a2e');

    // 背景装饰
    const gfx = this.add.graphics().setDepth(0);
    gfx.fillStyle(0x2d6a9f, 1);
    gfx.fillRect(0, 500, 1280, 220);
    gfx.fillStyle(0x37946e, 1);
    gfx.fillRect(0, 420, 1280, 80);
    // 建筑剪影
    gfx.fillStyle(0x222034, 1);
    gfx.fillRect(100, 280, 60, 140);
    gfx.fillRect(200, 240, 80, 180);
    gfx.fillRect(340, 300, 50, 120);
    gfx.fillRect(500, 200, 70, 220);
    gfx.fillRect(620, 260, 60, 160);
    gfx.fillRect(750, 220, 90, 200);
    gfx.fillRect(900, 280, 50, 140);
    gfx.fillRect(1000, 240, 70, 180);
    gfx.fillRect(1150, 300, 50, 120);

    // 标题
    this.add.text(640, 100, '申海漂', {
      fontFamily: 'sans-serif', fontSize: '64px', color: '#ffcc00',
    }).setOrigin(0.5).setDepth(1);

    this.add.text(640, 160, 'Shen Hai Piao — 一座海岛，一个机会', {
      fontFamily: 'sans-serif', fontSize: '18px', color: '#aaaacc',
    }).setOrigin(0.5).setDepth(1);

    // 版本
    this.add.text(640, 190, 'v0.1.3', {
      fontFamily: 'sans-serif', fontSize: '12px', color: '#666688',
    }).setOrigin(0.5).setDepth(1);

    // 按钮
    const hasExistingSave = hasSave();
    const buttons = [
      { label: hasExistingSave ? '▶ 继续游戏' : '▶ 新建游戏', y: 320, fn: () => this.startGame() },
      { label: '⚙ 设置', y: 390, fn: () => this.showSettings() },
      { label: '🎵 制作人员', y: 460, fn: () => this.showCredits() },
    ];

    buttons.forEach(({ label, y, fn }) => {
      const btn = this.add.rectangle(640, y, 280, 44, 0x333366).setDepth(1);
      btn.setStrokeStyle(2, 0x6666aa);
      btn.setInteractive({ useHandCursor: true });
      btn.on('pointerover', () => btn.setFillStyle(0x444488));
      btn.on('pointerout', () => btn.setFillStyle(0x333366));
      btn.on('pointerdown', fn);

      this.add.text(640, y, label, {
        fontFamily: 'sans-serif', fontSize: '22px', color: '#ffffff',
      }).setOrigin(0.5).setDepth(2);
    });

    // BGM
    this.tryPlayBGM('bgm-daily1');

    console.log('[TitleScene] 主菜单已加载');
  }

  private startGame(): void {
    this.cameras.main.fadeOut(500, 0, 0, 0);
    this.cameras.main.once('camerafadeoutcomplete', () => {
      this.scene.start('SuburbScene');
    });
  }

  private showSettings(): void {
    const overlay = this.add.rectangle(640, 360, 400, 200, 0x222244).setDepth(10).setStrokeStyle(2, 0x6666aa);
    this.add.text(640, 310, '设置（开发中...）', {
      fontFamily: 'sans-serif', fontSize: '16px', color: '#ffcc00',
    }).setOrigin(0.5).setDepth(11);

    const closeBtn = this.add.rectangle(640, 420, 160, 36, 0x445544).setDepth(11).setInteractive({ useHandCursor: true });
    this.add.text(640, 420, '关闭', {
      fontFamily: 'sans-serif', fontSize: '16px', color: '#ffffff',
    }).setOrigin(0.5).setDepth(12);
    closeBtn.on('pointerdown', () => { overlay.destroy(); closeBtn.destroy(); });

    // 清理所有depth>10的临时对象（简化方案：只用ESC关闭）
    this.input.keyboard!.once('keydown-ESC', () => { overlay.destroy(); closeBtn.destroy(); });
  }

  private showCredits(): void {
    const overlay = this.add.rectangle(640, 360, 500, 300, 0x222244).setDepth(10).setStrokeStyle(2, 0x6666aa);
    this.add.text(640, 280, '🎵 制作人员', {
      fontFamily: 'sans-serif', fontSize: '18px', color: '#ffcc00',
    }).setOrigin(0.5).setDepth(11);

    this.add.text(640, 340, '游戏开发：申海漂制作组\n像素素材：Kenney / LimeZu / GuttyKreum\n音效：Kenney UI Sounds\nBGM：项目自有', {
      fontFamily: 'sans-serif', fontSize: '13px', color: '#cccccc', align: 'center',
    }).setOrigin(0.5).setDepth(11);

    const closeBtn = this.add.rectangle(640, 440, 160, 36, 0x445544).setDepth(11).setInteractive({ useHandCursor: true });
    this.add.text(640, 440, '关闭', {
      fontFamily: 'sans-serif', fontSize: '16px', color: '#ffffff',
    }).setOrigin(0.5).setDepth(12);
    closeBtn.on('pointerdown', () => { overlay.destroy(); closeBtn.destroy(); });
    this.input.keyboard!.once('keydown-ESC', () => { overlay.destroy(); closeBtn.destroy(); });
  }

  private tryPlayBGM(key: string): void {
    try {
      if (this.sound.get(key)) return;
      this.sound.play(key, { loop: true, volume: 0.3 });
    } catch {
      // 音频加载失败时静默
    }
  }
}

export default TitleScene;
