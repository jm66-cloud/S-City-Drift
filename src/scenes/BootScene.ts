import * as Phaser from 'phaser';

class BootScene extends Phaser.Scene {
  constructor() { super({ key: 'BootScene' }); }

  preload(): void {
    const width = this.cameras.main.width;
    const height = this.cameras.main.height;

    const pb = this.add.graphics();
    pb.fillStyle(0x222034, 0.8);
    pb.fillRect(440, 340, 400, 30);

    const lt = this.add.text(width / 2, height / 2 - 50, '加载中...', {
      fontFamily: 'sans-serif', fontSize: '24px', color: '#ffffff',
    }).setOrigin(0.5, 0.5);

    const pt = this.add.text(width / 2, height / 2 + 50, '0%', {
      fontFamily: 'sans-serif', fontSize: '18px', color: '#ffffff',
    }).setOrigin(0.5, 0.5);

    const bar = this.add.graphics();
    this.load.on('progress', (value: number) => {
      pt.setText(`${Math.round(value * 100)}%`);
      bar.clear();
      bar.fillStyle(0x37946e, 1);
      bar.fillRect(450, 350, 380 * value, 10);
    });

    this.load.on('complete', () => {
      this.generateAllTextures();
      bar.destroy();
      pb.destroy();
      lt.destroy();
      pt.destroy();
      this.scene.start('TitleScene');
    });

    this.load.image('roguelikeCity', 'assets/tiles/city/roguelikeCity.png');
    this.load.image('cleanCity', 'assets/tiles/city/cleanCity.png');
    this.load.image('cleanCityPadded', 'assets/tiles/city/cleanCity_padded.png');
    this.load.image('interiors', 'assets/tiles/indoor/interiors.png');
    this.load.image('roomBuilder', 'assets/tiles/indoor/roomBuilder.png');
    this.load.image('char-adam', 'assets/sprites/characters/adam.png');
    this.load.image('char-alex', 'assets/sprites/characters/alex.png');
    this.load.image('char-amelia', 'assets/sprites/characters/amelia.png');
    this.load.image('char-bob', 'assets/sprites/characters/bob.png');
    this.load.image('vehicle-blue-car', 'assets/sprites/vehicles/sBlueCar.png');
    this.load.image('vehicle-red-car', 'assets/sprites/vehicles/sRedCar.png');
    this.load.image('vehicle-green-pickup', 'assets/sprites/vehicles/sGreenPickup.png');
    this.load.audio('bgm-daily1', 'sounds/日常1.mp3');
    this.load.audio('bgm-daily2', 'sounds/日常2.mp3');
    this.load.audio('bgm-trade1', 'sounds/交易1.mp3');
    this.load.audio('sfx-click', 'assets/sounds/click-a.ogg');
    this.load.audio('sfx-switch', 'assets/sounds/switch-a.ogg');
  }

  // ===== 从 tileset 生成可用的子纹理 =====
  private generateAllTextures(): void {
    this.genTex('cleanCity', 'tile-grass',     0, 0, 16, 16, 64);
    this.genTex('cleanCity', 'tile-road',      16, 0, 16, 16, 64);
    this.genTex('cleanCity', 'tile-building1', 96, 32, 48, 64, 64);
    this.genTex('cleanCity', 'tile-building2', 144, 32, 48, 64, 64);
    this.genTex('cleanCity', 'tile-building3', 192, 32, 48, 64, 64);
    this.genTex('cleanCity', 'tile-tree',      320, 160, 16, 32, 48);
    this.genTex('cleanCity', 'tile-tree2',     336, 160, 16, 32, 48);
    this.genTex('cleanCity', 'tile-lamp',      400, 160, 16, 32, 48);
    this.genTex('cleanCity', 'tile-busStop',   450, 0, 32, 32, 48);
    this.genTex('cleanCity', 'tile-seaside',   500, 100, 32, 32, 64);
    this.genTex('cleanCity', 'tile-sand',      550, 100, 16, 16, 64);
    this.genTex('cleanCity', 'tile-water',     580, 0, 16, 16, 64);

    this.genTex('cleanCity', 'tile-ground-city', 0, 16, 16, 16, 64);
    this.genTex('cleanCity', 'tile-ground-sub',  32, 16, 16, 16, 64);

    // 室内素材
    this.genTex('interiors', 'indoor-bed',    50, 100, 48, 48, 1.5);
    this.genTex('interiors', 'indoor-sofa',   150, 200, 48, 48, 1.5);
    this.genTex('interiors', 'indoor-table',  250, 100, 48, 48, 1.5);
    this.genTex('interiors', 'indoor-fridge', 350, 100, 48, 48, 1.5);
    this.genTex('interiors', 'indoor-stove',  150, 300, 48, 48, 1.5);
    this.genTex('interiors', 'indoor-counter',400, 200, 48, 48, 1.5);
    this.genTex('interiors', 'indoor-floor1', 50, 0, 48, 48, 2);
    this.genTex('interiors', 'indoor-wall1',  100, 0, 48, 48, 2);

    // 角色（从 128×128 的 4×4 spritesheet 截取第一个站立帧）
    this.genTex('char-adam', 'player-tex',   0, 0, 32, 48, 32);
    this.genTex('char-alex', 'npc-alex',     0, 0, 32, 48, 32);
    this.genTex('char-amelia', 'npc-amelia', 0, 0, 32, 48, 32);
    this.genTex('char-bob', 'npc-bob',       0, 0, 32, 48, 32);

    // 车辆
    if (this.textures.exists('vehicle-blue-car')) {
      this.genTex('vehicle-blue-car', 'car-blue', 0, 0, 80, 40, 1);
    }
    if (this.textures.exists('vehicle-red-car')) {
      this.genTex('vehicle-red-car', 'car-red', 0, 0, 80, 40, 1);
    }
    if (this.textures.exists('vehicle-green-pickup')) {
      this.genTex('vehicle-green-pickup', 'pickup-green', 0, 0, 80, 50, 1);
    }
  }

  private genTex(srcKey: string, outKey: string, sx: number, sy: number, sw: number, sh: number, scale: number): void {
    if (!this.textures.exists(srcKey)) return;
    const src = this.textures.get(srcKey);
    const img = src.getSourceImage() as HTMLImageElement;
    const canvas = this.textures.createCanvas(outKey, sw * scale, sh * scale);
    if (canvas) {
      canvas.context.drawImage(img, sx, sy, sw, sh, 0, 0, sw * scale, sh * scale);
      canvas.context.imageSmoothingEnabled = false;
      canvas.refresh();
    }
  }

  create(): void {}
}

export default BootScene;
