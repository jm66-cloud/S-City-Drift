import * as Phaser from 'phaser';

class HospitalScene extends Phaser.Scene {
  private escKey!: Phaser.Input.Keyboard.Key;

  constructor() { super({ key: 'HospitalScene' }); }

  create(): void {
    this.add.rectangle(640, 360, 1280, 720, 0xeeeeff);

    // 病床区
    for (let i = 0; i < 4; i++) {
      this.add.rectangle(200 + i * 200, 250, 80, 160, 0xffffff).setDepth(2).setStrokeStyle(1, 0xcccccc);
      this.add.text(200 + i * 200, 260, `病床 ${i + 1}`, { fontFamily: 'sans-serif', fontSize: '11px', color: '#666666' }).setOrigin(0.5, 0).setDepth(3);
    }

    // 护士站
    this.add.rectangle(1000, 250, 160, 100, 0xccddff).setDepth(2).setStrokeStyle(2, 0x8888cc);
    this.add.text(1000, 260, '🏥 护士站', { fontFamily: 'sans-serif', fontSize: '14px', color: '#334488' }).setOrigin(0.5, 0).setDepth(3);

    // 药房
    this.add.rectangle(1000, 500, 160, 80, 0xddeeff).setDepth(2).setStrokeStyle(1, 0x8888cc);
    this.add.text(1000, 510, '💊 药房', { fontFamily: 'sans-serif', fontSize: '14px', color: '#334488' }).setOrigin(0.5, 0).setDepth(3);

    this.add.rectangle(640, 680, 100, 40, 0x8899cc).setDepth(2).setStrokeStyle(2, 0xffffff);
    this.add.text(640, 700, '🚪 离开 (ESC)', { fontFamily: 'sans-serif', fontSize: '12px', color: '#333333', backgroundColor: '#ffffffaa', padding: { x: 6, y: 3 } }).setOrigin(0.5, 0).setDepth(3);

    this.add.text(640, 40, '🏥 申海市立医院', { fontFamily: 'sans-serif', fontSize: '22px', color: '#334488', backgroundColor: '#ffffffcc', padding: { x: 12, y: 6 } }).setOrigin(0.5).setDepth(10);

    this.escKey = this.input.keyboard!.addKey(Phaser.Input.Keyboard.KeyCodes.ESC);
  }

  update(): void { if (Phaser.Input.Keyboard.JustDown(this.escKey)) this.scene.start('CityScene'); }
}

export default HospitalScene;
