import * as Phaser from 'phaser';
import { SHOP_ITEMS } from '../data/items';

class StoreScene extends Phaser.Scene {
  private escKey!: Phaser.Input.Keyboard.Key;
  private selectedIndex = 0;
  private itemTexts: Phaser.GameObjects.Text[] = [];
  private cashText!: Phaser.GameObjects.Text;
  private messageText!: Phaser.GameObjects.Text;
  private inventory: string[] = [];

  constructor() { super({ key: 'StoreScene' }); }

  create(): void {
    this.cameras.main.setBackgroundColor('#e8e8d8');
    this.itemTexts = [];

    // 货架区域
    this.add.rectangle(320, 80, 600, 30, 0x665544).setDepth(0);
    this.add.text(20, 72, '🏪 海风便利店 — 货架', {
      fontFamily: 'sans-serif', fontSize: '18px', color: '#333333',
    }).setDepth(1);

    // 商品列表
    SHOP_ITEMS.forEach((item, index) => {
      const y = 130 + index * 30;
      const bg = this.add.rectangle(200, y, 370, 24, 0xffffff).setDepth(0);
      bg.setStrokeStyle(1, 0xcccccc);

      const text = this.add.text(20, y, `${item.name.padEnd(8, '　')} ¥${item.price.toString().padStart(6)}  ${item.category}`, {
        fontFamily: 'monospace', fontSize: '13px', color: '#333333',
      }).setOrigin(0, 0.5).setDepth(1);
      this.itemTexts.push(text);

      bg.setInteractive({ useHandCursor: true });
      bg.on('pointerdown', () => { this.selectedIndex = index; this.updateSelection(); });
    });

    // 购物篮
    this.add.rectangle(900, 80, 340, 340, 0xffffff).setDepth(0).setStrokeStyle(1, 0xcccccc);
    this.add.text(730, 72, '🛒 购物篮', {
      fontFamily: 'sans-serif', fontSize: '16px', color: '#665544',
    }).setDepth(1);

    this.inventory = [];
    this.cashText = this.add.text(730, 110, '现金: ¥100,000', {
      fontFamily: 'sans-serif', fontSize: '14px', color: '#336633',
    }).setDepth(1);

    // 操作按钮
    const buyBtn = this.add.rectangle(200, 470, 160, 40, 0x336633).setDepth(0).setInteractive({ useHandCursor: true });
    this.add.text(200, 470, '🛍 购买 (B)', { fontFamily: 'sans-serif', fontSize: '16px', color: '#ffffff' }).setOrigin(0.5).setDepth(1);
    buyBtn.on('pointerdown', () => this.buyItem());

    const cookBtn = this.add.rectangle(400, 470, 160, 40, 0x886633).setDepth(0).setInteractive({ useHandCursor: true });
    this.add.text(400, 470, '🍳 烹饪 (C)', { fontFamily: 'sans-serif', fontSize: '16px', color: '#ffffff' }).setOrigin(0.5).setDepth(1);
    cookBtn.on('pointerdown', () => this.cookItem());

    this.updateSelection();

    // 消息
    this.messageText = this.add.text(640, 540, '', {
      fontFamily: 'sans-serif', fontSize: '14px', color: '#336633',
      backgroundColor: '#eeffee', padding: { x: 12, y: 6 },
    }).setOrigin(0.5).setDepth(2);

    // 门
    this.add.rectangle(640, 680, 100, 40, 0x45283c).setDepth(0).setStrokeStyle(2, 0xffffff);
    this.add.text(640, 700, '🚪 离开 (ESC)', {
      fontFamily: 'sans-serif', fontSize: '12px', color: '#ffffff',
      backgroundColor: '#00000080', padding: { x: 6, y: 3 },
    }).setOrigin(0.5, 0).setDepth(1);

    this.escKey = this.input.keyboard!.addKey(Phaser.Input.Keyboard.KeyCodes.ESC);
    this.input.keyboard!.on('keydown-B', () => this.buyItem());
    this.input.keyboard!.on('keydown-C', () => this.cookItem());
  }

  private updateSelection(): void {
    this.itemTexts.forEach((t, i) => {
      t.setColor(i === this.selectedIndex ? '#ff6600' : '#333333');
      t.setFontStyle(i === this.selectedIndex ? 'bold' : 'normal');
    });
  }

  private buyItem(): void {
    const item = SHOP_ITEMS[this.selectedIndex];
    this.inventory.push(item.id);
    this.showMessage(`已购买: ${item.name} -¥${item.price}`);

    // 更新购物篮显示
    const basketItems = this.children.list.filter(c => {
      const text = (c as Phaser.GameObjects.Text).text;
      return text && text.startsWith('  ');
    });
    basketItems.forEach(c => c.destroy());

    const counts: Record<string, number> = {};
    this.inventory.forEach(id => { counts[id] = (counts[id] || 0) + 1; });
    let y = 140;
    Object.entries(counts).forEach(([id, qty]) => {
      const item = SHOP_ITEMS.find(i => i.id === id)!;
      this.add.text(740, y, `  ${item.name} ×${qty}`, {
        fontFamily: 'sans-serif', fontSize: '13px', color: '#333333',
      }).setDepth(1);
      y += 22;
    });
  }

  private cookItem(): void {
    if (this.inventory.length === 0) {
      this.showMessage('购物篮是空的！请先购买食材。');
      return;
    }
    // 检查是否有可烹饪的组合
    if (this.inventory.includes('egg') && this.inventory.includes('tomato')) {
      this.inventory = this.inventory.filter(id => id !== 'egg' && id !== 'tomato');
      this.inventory.push('tomato_egg');
      this.showMessage('🍳 制作了番茄炒蛋！');
    } else if (this.inventory.includes('egg')) {
      const idx = this.inventory.indexOf('egg');
      this.inventory.splice(idx, 1);
      this.inventory.push('fried_egg');
      this.showMessage('🍳 制作了煎蛋！');
    } else {
      this.showMessage('食材不足，无法烹饪。需要鸡蛋+番茄等组合。');
    }
  }

  private showMessage(msg: string): void {
    this.messageText.setText(msg);
    this.messageText.setAlpha(1);
    this.time.delayedCall(2000, () => {
      this.tweens.add({ targets: this.messageText, alpha: 0, duration: 500 });
    });
  }

  update(): void {
    if (Phaser.Input.Keyboard.JustDown(this.escKey)) {
      this.scene.start('CommercialScene');
    }
  }
}

export default StoreScene;
