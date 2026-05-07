import * as Phaser from 'phaser';
import { COOKING_RECIPES } from '../data/items';

class ApartmentScene extends Phaser.Scene {
  private escKey!: Phaser.Input.Keyboard.Key;
  private interactKey!: Phaser.Input.Keyboard.Key;
  private inventory: string[] = [];
  private messageText!: Phaser.GameObjects.Text;

  constructor() { super({ key: 'ApartmentScene' }); }

  create(): void {
    this.cameras.main.setBackgroundColor('#5c3e2e');

    // 墙壁
    const wall = 0x8b7355;
    this.add.rectangle(0, 360, 20, 720, wall);
    this.add.rectangle(1280, 360, 20, 720, wall);
    this.add.rectangle(640, 0, 1280, 20, wall);
    this.add.rectangle(640, 720, 1280, 20, wall);

    // 家具
    this.add.rectangle(150, 180, 80, 120, 0xcc8888).setDepth(0).setStrokeStyle(1, 0xffffff);
    this.add.text(150, 250, '🛏 床', { fontFamily: 'sans-serif', fontSize: '12px', color: '#ffffff' }).setOrigin(0.5, 0);

    this.add.rectangle(350, 180, 60, 50, 0x888888).setDepth(0).setStrokeStyle(1, 0xffffff);
    this.add.text(350, 215, '💻 电脑', { fontFamily: 'sans-serif', fontSize: '12px', color: '#ffffff' }).setOrigin(0.5, 0);

    this.add.rectangle(550, 180, 80, 50, 0x444444).setDepth(0).setStrokeStyle(1, 0xffffff);
    this.add.text(550, 215, '📺 电视', { fontFamily: 'sans-serif', fontSize: '12px', color: '#ffffff' }).setOrigin(0.5, 0);

    this.add.rectangle(250, 450, 120, 50, 0xaa8866).setDepth(0).setStrokeStyle(1, 0xffffff);
    this.add.text(250, 485, '🛋 沙发', { fontFamily: 'sans-serif', fontSize: '12px', color: '#ffffff' }).setOrigin(0.5, 0);

    this.add.rectangle(500, 450, 80, 80, 0xcccccc).setDepth(0).setStrokeStyle(1, 0xffffff);
    this.add.text(500, 500, '🍳 灶台', { fontFamily: 'sans-serif', fontSize: '12px', color: '#ffffff' }).setOrigin(0.5, 0);

    this.add.rectangle(700, 450, 60, 80, 0xaaddff).setDepth(0).setStrokeStyle(1, 0xffffff);
    this.add.text(700, 500, '🧊 冰箱', { fontFamily: 'sans-serif', fontSize: '12px', color: '#ffffff' }).setOrigin(0.5, 0);

    this.add.rectangle(900, 450, 80, 80, 0x996633).setDepth(0).setStrokeStyle(1, 0xffffff);
    this.add.text(900, 500, '🍽 餐桌', { fontFamily: 'sans-serif', fontSize: '12px', color: '#ffffff' }).setOrigin(0.5, 0);

    // 门
    this.add.rectangle(640, 680, 100, 40, 0x663931).setDepth(0).setStrokeStyle(2, 0xffffff);
    this.add.text(640, 700, '🚪 出门 (ESC)', {
      fontFamily: 'sans-serif', fontSize: '12px', color: '#ffffff',
      backgroundColor: '#00000080', padding: { x: 6, y: 3 },
    }).setOrigin(0.5, 0);

    // 消息
    this.messageText = this.add.text(640, 620, '', {
      fontFamily: 'sans-serif', fontSize: '14px', color: '#ffcc88',
      backgroundColor: '#000000cc', padding: { x: 12, y: 6 },
    }).setOrigin(0.5).setDepth(5).setAlpha(0);

    // 初始库存
    this.inventory = ['egg', 'egg', 'rice', 'tomato'];

    this.add.text(640, 40, '🏠 出租屋 — 我的家', {
      fontFamily: 'sans-serif', fontSize: '20px', color: '#ffffff',
      backgroundColor: '#00000080', padding: { x: 12, y: 6 },
    }).setOrigin(0.5);

    this.escKey = this.input.keyboard!.addKey(Phaser.Input.Keyboard.KeyCodes.ESC);
    this.interactKey = this.input.keyboard!.addKey(Phaser.Input.Keyboard.KeyCodes.E);

    console.log('[ApartmentScene] 公寓场景已加载，按E靠近灶台烹饪');
  }

  update(): void {
    if (Phaser.Input.Keyboard.JustDown(this.escKey)) {
      this.scene.start('SuburbScene');
    }
    if (Phaser.Input.Keyboard.JustDown(this.interactKey)) {
      this.tryCook();
    }
  }

  private tryCook(): void {
    if (this.inventory.length === 0) {
      this.showMessage('冰箱是空的！去便利店买点食材吧。');
      return;
    }

    // 尝试匹配食谱
    for (const recipe of COOKING_RECIPES) {
      const hasAll = recipe.ingredients.every(ing => this.inventory.includes(ing));
      if (hasAll) {
        recipe.ingredients.forEach(ing => {
          const idx = this.inventory.indexOf(ing);
          if (idx !== -1) this.inventory.splice(idx, 1);
        });
        this.inventory.push(recipe.id);
        this.showMessage(`🍳 制作了 ${recipe.name}！饱食+${recipe.hungerRestore}`);
        return;
      }
    }

    // 随机煮一个
    const first = this.inventory[0];
    this.inventory.splice(0, 1);
    this.showMessage(`🍳 简单烹饪了食材，快吃吧！`);
  }

  private showMessage(msg: string): void {
    this.messageText.setText(msg);
    this.messageText.setAlpha(1);
    this.time.delayedCall(2500, () => {
      this.tweens.add({ targets: this.messageText, alpha: 0, duration: 400 });
    });
  }
}

export default ApartmentScene;
