import * as Phaser from 'phaser';

class RestaurantScene extends Phaser.Scene {
  private escKey!: Phaser.Input.Keyboard.Key;

  constructor() { super({ key: 'RestaurantScene' }); }

  create(): void {
    this.cameras.main.setBackgroundColor('#6a4a3a');
    const wall = 0x8a6a4a;
    this.add.rectangle(0, 360, 20, 720, wall); this.add.rectangle(1280, 360, 20, 720, wall);
    this.add.rectangle(640, 0, 1280, 20, wall); this.add.rectangle(640, 720, 1280, 20, wall);

    // 餐桌
    for (let i = 0; i < 5; i++) {
      const x = 180 + i * 200;
      this.add.rectangle(x, 250, 60, 60, 0x886633).setStrokeStyle(1, 0xffffff);
      this.add.text(x, 240, `桌${i + 1}`, { fontFamily: 'sans-serif', fontSize: '11px', color: '#ffffff' }).setOrigin(0.5);
    }

    // 厨房窗口
    this.add.rectangle(1000, 500, 180, 80, 0x996655).setStrokeStyle(2, 0xffffff);
    this.add.text(1000, 510, '🍳 厨房', { fontFamily: 'sans-serif', fontSize: '14px', color: '#ffcc88' }).setOrigin(0.5, 0);

    // 菜单
    const menu = ['🍜 红烧牛肉面 ¥80', '🍛 咖喱饭 ¥65', '🍖 糖醋排骨 ¥120', '🥗 时蔬沙拉 ¥45', '🍵 绿茶 ¥15'];
    menu.forEach((item, i) => {
      this.add.text(150, 500 + i * 28, item, { fontFamily: 'sans-serif', fontSize: '14px', color: '#ffddcc' });
    });

    this.add.text(1000, 550, '点餐 (E)', { fontFamily: 'sans-serif', fontSize: '12px', color: '#ffffff', backgroundColor: '#00000080', padding: { x: 6, y: 3 } }).setOrigin(0.5);

    this.add.rectangle(640, 680, 100, 40, 0x886644).setStrokeStyle(2, 0xffffff);
    this.add.text(640, 700, '🚪 离开 (ESC)', { fontFamily: 'sans-serif', fontSize: '12px', color: '#ffffff', backgroundColor: '#00000080', padding: { x: 6, y: 3 } }).setOrigin(0.5, 0);

    this.add.text(640, 30, '🍜 好味道餐厅', { fontFamily: 'sans-serif', fontSize: '22px', color: '#ffcc88', backgroundColor: '#00000080', padding: { x: 12, y: 6 } }).setOrigin(0.5);

    this.escKey = this.input.keyboard!.addKey(Phaser.Input.Keyboard.KeyCodes.ESC);
  }

  update(): void { if (Phaser.Input.Keyboard.JustDown(this.escKey)) this.scene.start('CommercialScene'); }
}

export default RestaurantScene;
