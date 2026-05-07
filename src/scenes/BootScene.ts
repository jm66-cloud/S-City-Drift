import * as Phaser from 'phaser';

class BootScene extends Phaser.Scene {
  constructor() {
    super({ key: 'BootScene' });
  }

  preload(): void {
    const width = this.cameras.main.width;
    const height = this.cameras.main.height;

    // 进度条
    const progressBox = this.add.graphics();
    progressBox.fillStyle(0x222034, 0.8);
    progressBox.fillRect(440, 340, 400, 30);

    const loadingText = this.add.text(width / 2, height / 2 - 50, '加载中...', {
      fontFamily: 'sans-serif',
      fontSize: '24px',
      color: '#ffffff',
    });
    loadingText.setOrigin(0.5, 0.5);

    const percentText = this.add.text(width / 2, height / 2 + 50, '0%', {
      fontFamily: 'sans-serif',
      fontSize: '18px',
      color: '#ffffff',
    });
    percentText.setOrigin(0.5, 0.5);

    const progressBar = this.add.graphics();

    this.load.on('progress', (value: number) => {
      percentText.setText(`${Math.round(value * 100)}%`);
      progressBar.clear();
      progressBar.fillStyle(0x37946e, 1);
      progressBar.fillRect(450, 350, 380 * value, 10);
    });

    this.load.on('complete', () => {
      progressBar.destroy();
      progressBox.destroy();
      loadingText.destroy();
      percentText.destroy();
      this.scene.start('TitleScene');
    });

    this.loadAssets();
  }

  private loadAssets(): void {
    // 城市瓦片
    this.load.image('roguelikeCity', 'assets/tiles/city/roguelikeCity.png');
    this.load.image('cleanCity', 'assets/tiles/city/cleanCity.png');
    this.load.image('cleanCityPadded', 'assets/tiles/city/cleanCity_padded.png');
    // 室内瓦片
    this.load.image('interiors', 'assets/tiles/indoor/interiors.png');
    this.load.image('roomBuilder', 'assets/tiles/indoor/roomBuilder.png');

    // 角色
    this.load.image('char-adam', 'assets/sprites/characters/adam.png');
    this.load.image('char-alex', 'assets/sprites/characters/alex.png');
    this.load.image('char-amelia', 'assets/sprites/characters/amelia.png');
    this.load.image('char-bob', 'assets/sprites/characters/bob.png');

    // 车辆
    this.load.image('vehicle-blue-car', 'assets/sprites/vehicles/sBlueCar.png');
    this.load.image('vehicle-red-car', 'assets/sprites/vehicles/sRedCar.png');

    // UI
    this.load.image('ui-button', 'assets/ui/buttons/button_rectangle_flat.png');
    this.load.image('ui-button-round', 'assets/ui/buttons/button_round_flat.png');
    this.load.image('ui-check', 'assets/ui/icons/icon_checkmark.png');
    this.load.image('ui-cross', 'assets/ui/icons/icon_cross.png');

    // BGM
    this.load.audio('bgm-daily1', 'sounds/日常1.mp3');
    this.load.audio('bgm-daily2', 'sounds/日常2.mp3');
    this.load.audio('bgm-trade1', 'sounds/交易1.mp3');

    // SFX
    this.load.audio('sfx-click', 'assets/sounds/click-a.ogg');
    this.load.audio('sfx-switch', 'assets/sounds/switch-a.ogg');
  }

  create(): void {
    // 从 citieset 生成地面平铺纹理
    this.generateGroundTexture('roguelikeCity', 'ground-tile-roam', 64);
    this.generateGroundTexture('cleanCity', 'ground-tile-clean', 64);
  }

  private generateGroundTexture(tilesetKey: string, outKey: string, size: number): void {
    if (!this.textures.exists(tilesetKey)) return;
    const src = this.textures.get(tilesetKey);
    const canvas = this.textures.createCanvas(outKey, size, size);
    if (canvas) {
      const ctx = canvas.context;
      ctx.drawImage(src.getSourceImage() as HTMLImageElement, 1, 1, 15, 15, 0, 0, size, size);
      canvas.refresh();
    }
  }
}

export default BootScene;
