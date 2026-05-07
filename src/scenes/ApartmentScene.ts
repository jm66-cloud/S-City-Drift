import * as Phaser from 'phaser';
import { COOKING_RECIPES } from '../data/items';

class ApartmentScene extends Phaser.Scene {
  private escKey!: Phaser.Input.Keyboard.Key;
  private interactKey!: Phaser.Input.Keyboard.Key;
  private inventory: string[] = [];
  private messageText!: Phaser.GameObjects.Text;

  constructor() { super({ key: 'ApartmentScene' }); }

  create(): void {
    // 地板纹理
    if (this.textures.exists('indoor-floor1')) {
      this.add.tileSprite(640, 360, 1280, 720, 'indoor-floor1').setDepth(0).setScale(4);
    } else {
      this.add.rectangle(640, 360, 1280, 720, 0x5c3e2e).setDepth(0);
    }

    // 墙壁
    const wallTex = this.textures.exists('indoor-wall1') ? 'indoor-wall1' : null;
    if (wallTex) {
      this.add.tileSprite(0, 360, 24, 720, wallTex).setOrigin(0, 0.5).setDepth(0).setScale(1.5);
      this.add.tileSprite(1280, 360, 24, 720, wallTex).setOrigin(1, 0.5).setDepth(0).setScale(1.5);
      this.add.tileSprite(640, 0, 1280, 20, wallTex).setOrigin(0.5, 0).setDepth(0).setScale(1.5);
      this.add.tileSprite(640, 720, 1280, 20, wallTex).setOrigin(0.5, 1).setDepth(0).setScale(1.5);
    }

    // 家具
    this.placeSprite('indoor-bed',    150, 180, 1.5, '🛏 床');
    this.placeSprite('indoor-table',  350, 180, 1.5, '💻 电脑');
    this.add.rectangle(550, 180, 80, 50, 0x444444).setStrokeStyle(1, 0xffffff);
    this.add.text(550, 215, '📺 电视', { fontFamily: 'sans-serif', fontSize: '12px', color: '#ffffff' }).setOrigin(0.5, 0);
    this.placeSprite('indoor-sofa',   250, 450, 1.5, '🛋 沙发');
    this.placeSprite('indoor-stove',  500, 450, 1.5, '🍳 灶台');
    this.placeSprite('indoor-fridge', 700, 450, 1.5, '🧊 冰箱');
    this.placeSprite('indoor-counter',900, 450, 1.5, '🍽 餐桌');

    // 门
    this.add.rectangle(640, 680, 100, 40, 0x663931).setStrokeStyle(2, 0xffffff);
    this.add.text(640, 700, '🚪 出门 (ESC)', {
      fontFamily: 'sans-serif', fontSize: '12px', color: '#ffffff',
      backgroundColor: '#00000080', padding: { x: 6, y: 3 },
    }).setOrigin(0.5, 0);

    this.messageText = this.add.text(640, 620, '', {
      fontFamily: 'sans-serif', fontSize: '14px', color: '#ffcc88',
      backgroundColor: '#000000cc', padding: { x: 12, y: 6 },
    }).setOrigin(0.5).setDepth(5).setAlpha(0);

    this.inventory = ['egg', 'egg', 'rice', 'tomato'];

    this.add.text(640, 40, '🏠 出租屋 — 我的家', {
      fontFamily: 'sans-serif', fontSize: '20px', color: '#ffffff',
      backgroundColor: '#00000080', padding: { x: 12, y: 6 },
    }).setOrigin(0.5);

    this.escKey = this.input.keyboard!.addKey(Phaser.Input.Keyboard.KeyCodes.ESC);
    this.interactKey = this.input.keyboard!.addKey(Phaser.Input.Keyboard.KeyCodes.E);
  }

  private placeSprite(texKey: string, x: number, y: number, scale: number, label: string): void {
    if (this.textures.exists(texKey)) {
      this.add.image(x, y, texKey).setDepth(0).setScale(scale);
      this.add.text(x, y + 40, label, {
        fontFamily: 'sans-serif', fontSize: '12px', color: '#ffffff',
        backgroundColor: '#00000080', padding: { x: 3, y: 1 },
      }).setOrigin(0.5, 0).setDepth(2);
    } else {
      this.add.rectangle(x, y, 60, 60, 0x888888).setStrokeStyle(1, 0xffffff);
      this.add.text(x, y + 35, label, {
        fontFamily: 'sans-serif', fontSize: '12px', color: '#ffffff',
      }).setOrigin(0.5, 0);
    }
  }

  update(): void {
    if (Phaser.Input.Keyboard.JustDown(this.escKey)) this.scene.start('SuburbScene');
    if (Phaser.Input.Keyboard.JustDown(this.interactKey)) this.tryCook();
  }

  private tryCook(): void {
    if (this.inventory.length === 0) { this.showMessage('冰箱是空的！去便利店买点食材吧。'); return; }
    for (const recipe of COOKING_RECIPES) {
      const hasAll = recipe.ingredients.every(ing => this.inventory.includes(ing));
      if (hasAll) {
        recipe.ingredients.forEach(ing => {
          const idx = this.inventory.indexOf(ing);
          if (idx !== -1) this.inventory.splice(idx, 1);
        });
        this.inventory.push(recipe.id);
        this.showMessage(`🍳 制作了${recipe.name}！饱食+${recipe.hungerRestore}`);
        return;
      }
    }
    const first = this.inventory[0];
    this.inventory.splice(0, 1);
    this.showMessage('🍳 简单烹饪了食材，快吃吧！');
  }

  private showMessage(msg: string): void {
    this.messageText.setText(msg).setAlpha(1);
    this.time.delayedCall(2500, () => this.tweens.add({ targets: this.messageText, alpha: 0, duration: 400 }));
  }
}

export default ApartmentScene;
