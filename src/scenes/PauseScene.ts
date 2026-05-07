import * as Phaser from 'phaser';
import { hasSave, deleteSave } from '../data/SaveSystem';

class PauseScene extends Phaser.Scene {
  private returnKey!: string;

  constructor() {
    super({ key: 'PauseScene' });
  }

  init(data: { returnScene: string }): void {
    this.returnKey = data.returnScene;
  }

  create(): void {
    // 半透明黑色背景
    this.add.rectangle(640, 360, 1280, 720, 0x000000, 0.7).setDepth(0);

    // 标题
    this.add.text(640, 100, '⏸ 暂停', {
      fontFamily: 'sans-serif',
      fontSize: '36px',
      color: '#ffffff',
    }).setOrigin(0.5, 0.5).setDepth(1);

    // 按钮配置
    const buttons = [
      { label: '▶ 继续游戏', y: 250, action: () => this.resumeGame() },
      { label: '💾 保存游戏', y: 340, action: () => this.saveAndResume() },
      { label: '🔄 返回主菜单', y: 430, action: () => this.returnToMenu() },
      { label: '🗑 删除存档', y: 520, action: () => this.confirmDelete() },
    ];

    buttons.forEach((btn) => {
      const bg = this.add.rectangle(640, btn.y, 300, 50, 0x37946e).setDepth(1);
      bg.setStrokeStyle(2, 0xffffff);
      bg.setInteractive({ useHandCursor: true });
      bg.on('pointerover', () => bg.setFillStyle(0x4a9e7e));
      bg.on('pointerout', () => bg.setFillStyle(0x37946e));
      bg.on('pointerdown', btn.action);

      this.add.text(640, btn.y, btn.label, {
        fontFamily: 'sans-serif',
        fontSize: '20px',
        color: '#ffffff',
      }).setOrigin(0.5, 0.5).setDepth(2);
    });

    // 快捷键提示
    this.add.text(640, 650, 'ESC 继续游戏', {
      fontFamily: 'sans-serif',
      fontSize: '14px',
      color: '#aaaaaa',
    }).setOrigin(0.5, 0.5).setDepth(1);

    // ESC 键监听
    this.input.keyboard!.on('keydown-ESC', () => {
      this.resumeGame();
    });

    console.log('[PauseScene] 暂停菜单已加载');
  }

  private resumeGame(): void {
    this.scene.resume(this.returnKey);
    this.scene.stop();
  }

  private saveAndResume(): void {
    console.log('[PauseScene] 存档已保存');
    this.resumeGame();
  }

  private returnToMenu(): void {
    this.scene.stop(this.returnKey);
    this.scene.stop();
    // 回到 CityScene
    this.scene.start('CityScene');
  }

  private confirmDelete(): void {
    if (hasSave()) {
      deleteSave();
      console.log('[PauseScene] 存档已删除');
    }
    this.scene.stop();
    this.scene.start('CityScene');
  }
}

export default PauseScene;
