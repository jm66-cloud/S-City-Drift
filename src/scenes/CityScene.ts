import * as Phaser from 'phaser';
import { GameState } from '../core/GameState';
import { sceneManager } from '../core/SceneManager';
import { NPC_DATA, getRandomGreeting } from '../data/NPCData';

interface BuildingInfo {
  x: number;
  y: number;
  label: string;
  color: number;
  scene: string;
}

class CityScene extends Phaser.Scene {
  private player!: Phaser.Physics.Arcade.Sprite;
  private cursors!: Phaser.Types.Input.Keyboard.CursorKeys;
  private wasd!: {
    up: Phaser.Input.Keyboard.Key;
    down: Phaser.Input.Keyboard.Key;
    left: Phaser.Input.Keyboard.Key;
    right: Phaser.Input.Keyboard.Key;
  };
  private interactKey!: Phaser.Input.Keyboard.Key;
  private  escKey!: Phaser.Input.Keyboard.Key;
  private state!: GameState;
  private hudTexts: Phaser.GameObjects.Text[] = [];
  private timeText!: Phaser.GameObjects.Text;
  private buildings: BuildingInfo[] = [];
  private inTransition = false;

  constructor() {
    super({ key: 'CityScene' });
  }

  init(): void {
    this.state = new GameState();
    this.inTransition = false;
  }

  create(): void {
    this.buildings = [];
    this.hudTexts = [];
    this.setupWorldBounds();
    this.createMap();
    this.createPlayer();
    this.createBuildings();
    this.createInput();
    this.createHUD();
    this.createNPCs();

    // 时间流逝定时器
    this.time.addEvent({
      delay: 10000,
      callback: this.onTimeTick,
      callbackScope: this,
      loop: true,
    });

    console.log('[CityScene] 城市地图已加载');
  }

  update(_time: number, _delta: number): void {
    if (this.inTransition) return;

    this.handleMovement();
    this.updateHUD();
  }

  // ==== 地图边界 ====

  private setupWorldBounds(): void {
    this.cameras.main.setBounds(0, 0, 1600, 1200);
    this.physics.world.setBounds(0, 0, 1600, 1200);
  }

  // ==== 城市地图 ====

  private createMap(): void {
    const worldWidth = 1600;
    const worldHeight = 1200;

    // 草地背景
    this.add.rectangle(worldWidth / 2, worldHeight / 2, worldWidth, worldHeight, 0x37946e).setDepth(0);

    // 海面边框
    const sea = 0x2d6a9f;
    this.add.rectangle(20, worldHeight / 2, 40, worldHeight, sea).setDepth(0);
    this.add.rectangle(worldWidth - 20, worldHeight / 2, 40, worldHeight, sea).setDepth(0);
    this.add.rectangle(worldWidth / 2, 20, worldWidth, 40, sea).setDepth(0);
    this.add.rectangle(worldWidth / 2, worldHeight - 20, worldWidth, 40, sea).setDepth(0);

    // 主道路 — 水平主干道
    this.add.rectangle(worldWidth / 2, 400, worldWidth, 64, 0x6b6b7b).setDepth(1);
    this.add.rectangle(worldWidth / 2, 800, worldWidth, 64, 0x6b6b7b).setDepth(1);

    // 垂直主干道
    this.add.rectangle(400, worldHeight / 2, 64, worldHeight, 0x6b6b7b).setDepth(1);
    this.add.rectangle(1200, worldHeight / 2, 64, worldHeight, 0x6b6b7b).setDepth(1);

    // 沙滩区域（右侧）
    this.add.rectangle(1400, worldHeight / 2, 180, worldHeight, 0xd4a96a).setDepth(1);

    // 人行道斑马线标记
    const crosswalk = 0xeeeeff;
    [
      { x: 400, y: 370 }, { x: 400, y: 430 },
      { x: 1200, y: 370 }, { x: 1200, y: 430 },
      { x: 400, y: 770 }, { x: 400, y: 830 },
      { x: 1200, y: 770 }, { x: 1200, y: 830 },
    ].forEach(c => {
      this.add.rectangle(c.x, c.y, 60, 4, crosswalk).setDepth(2);
    });
  }

  // ==== 建筑入口 ====

  private createBuildings(): void {
    this.buildings = [
      { x: 200, y: 200, label: '🏠 公寓', color: 0x663931, scene: 'ApartmentScene' },
      { x: 640, y: 200, label: '📈 交易所', color: 0xdf7126, scene: 'ExchangeScene' },
      { x: 960, y: 200, label: '🏪 便利店', color: 0x45283c, scene: 'StoreScene' },
      { x: 300, y: 600, label: '🏦 银行', color: 0x37946e, scene: 'BankScene' },
      { x: 800, y: 600, label: '☕ 咖啡馆', color: 0x222034, scene: 'CafeScene' },
      { x: 550, y: 600, label: '💼 办公室', color: 0x666633, scene: 'OfficeScene' },
      { x: 300, y: 1000, label: '🏥 医院', color: 0x8899cc, scene: 'HospitalScene' },
      { x: 800, y: 1000, label: '📚 图书馆', color: 0x8b7355, scene: 'CityScene' },
      { x: 1300, y: 400, label: '🏖 沙滩', color: 0xd4a96a, scene: 'CityScene' },
      { x: 1300, y: 1000, label: '📍 灯塔', color: 0xffec27, scene: 'CityScene' },
      { x: 200, y: 1000, label: '⚖️ 证监局', color: 0x666666, scene: 'CityScene' },
    ];

    this.buildings.forEach((b) => {
      const gfx = this.add.graphics();
      gfx.fillStyle(b.color, 1);
      gfx.fillRect(b.x - 50, b.y - 35, 100, 70);
      gfx.lineStyle(2, 0xffffff);
      gfx.strokeRect(b.x - 50, b.y - 35, 100, 70);
      gfx.setDepth(3);

      const label = this.add.text(b.x, b.y + 45, b.label, {
        fontFamily: 'sans-serif',
        fontSize: '12px',
        color: '#ffffff',
        backgroundColor: '#00000080',
        padding: { x: 4, y: 2 },
      });
      label.setOrigin(0.5, 0).setDepth(4);
    });
  }

  // ==== 玩家 ====

  private createPlayer(): void {
    const gfx = this.add.graphics();
    gfx.fillStyle(0xffec27, 1);
    gfx.fillRect(0, 0, 24, 32);
    gfx.generateTexture('player', 24, 32);
    gfx.destroy();

    this.player = this.physics.add.sprite(200, 300, 'player');
    this.player.setDepth(10);
    if (this.player.body) {
      this.player.body.setCollideWorldBounds(true);
    }

    this.cameras.main.startFollow(this.player, true, 0.1, 0.1);
  }

  // ==== NPC 占位 ====

  private createNPCs(): void {
    NPC_DATA.forEach(npc => {
      const marker = this.add.rectangle(npc.x, npc.y, 20, 28, npc.color).setDepth(9);
      marker.setStrokeStyle(1, 0xffffff);

      const label = this.add.text(npc.x, npc.y + 18, npc.name, {
        fontFamily: 'sans-serif', fontSize: '10px', color: '#ffffff',
        backgroundColor: '#00000099', padding: { x: 3, y: 1 },
      }).setOrigin(0.5, 0).setDepth(10);

      // 按E对话
      const dialogPopup = this.add.text(640, 660, '', {
        fontFamily: 'sans-serif', fontSize: '14px', color: '#ffffff',
        backgroundColor: '#000000cc', padding: { x: 12, y: 8 },
        align: 'center',
      }).setOrigin(0.5, 0.5).setDepth(50).setVisible(false).setScrollFactor(0);
    });
  }

  // ==== 输入 ====

  private createInput(): void {
    this.cursors = this.input.keyboard!.createCursorKeys();
    this.wasd = {
      up: this.input.keyboard!.addKey(Phaser.Input.Keyboard.KeyCodes.W),
      down: this.input.keyboard!.addKey(Phaser.Input.Keyboard.KeyCodes.S),
      left: this.input.keyboard!.addKey(Phaser.Input.Keyboard.KeyCodes.A),
      right: this.input.keyboard!.addKey(Phaser.Input.Keyboard.KeyCodes.D),
    };
    this.interactKey = this.input.keyboard!.addKey(Phaser.Input.Keyboard.KeyCodes.E);
    this.escKey = this.input.keyboard!.addKey(Phaser.Input.Keyboard.KeyCodes.ESC);
  }

  // ==== 移动与交互 ====

  private handleMovement(): void {
    const speed = 160;
    const body = this.player.body as Phaser.Physics.Arcade.Body;
    body.setVelocity(0);

    if (this.cursors.left.isDown || this.wasd.left.isDown) body.setVelocityX(-speed);
    else if (this.cursors.right.isDown || this.wasd.right.isDown) body.setVelocityX(speed);
    if (this.cursors.up.isDown || this.wasd.up.isDown) body.setVelocityY(-speed);
    else if (this.cursors.down.isDown || this.wasd.down.isDown) body.setVelocityY(speed);

    // 建筑交互 / NPC对话
    if (Phaser.Input.Keyboard.JustDown(this.interactKey)) {
      if (!this.tryInteractNPC()) {
        this.tryEnterBuilding();
      }
    }

    // ESC 打开菜单
    if (Phaser.Input.Keyboard.JustDown(this.escKey)) {
      this.openPauseMenu();
    }
  }

  private tryInteractNPC(): boolean {
    const px = this.player.x;
    const py = this.player.y;

    for (const npc of NPC_DATA) {
      const dx = Math.abs(px - npc.x);
      const dy = Math.abs(py - npc.y);
      if (dx < 50 && dy < 50) {
        const greeting = getRandomGreeting(npc.id);
        const dialog = this.add.text(640, 660, `[${npc.name}] ${npc.role}\n"${greeting}"`, {
          fontFamily: 'sans-serif', fontSize: '14px', color: '#ffffff',
          backgroundColor: '#000000dd', padding: { x: 16, y: 10 },
          align: 'center', wordWrap: { width: 600 },
        }).setOrigin(0.5, 0.5).setDepth(50).setScrollFactor(0);

        this.time.delayedCall(3000, () => dialog.destroy());
        return true;
      }
    }
    return false;
  }

  private tryEnterBuilding(): void {
    if (this.inTransition) return;

    const px = this.player.x;
    const py = this.player.y;

    for (const building of this.buildings) {
      const dx = Math.abs(px - building.x);
      const dy = Math.abs(py - building.y);
      if (dx < 60 && dy < 50 && building.scene !== 'CityScene') {
        this.inTransition = true;
        this.sound.play('sfx-switch');
        this.cameras.main.fadeOut(400, 0, 0, 0);
        this.cameras.main.once('camerafadeoutcomplete', () => {
          this.scene.start(building.scene);
        });
        break;
      }
    }
  }

  // ==== HUD ====

  private createHUD(): void {
    const style: Phaser.Types.GameObjects.Text.TextStyle = {
      fontFamily: 'sans-serif',
      fontSize: '14px',
      color: '#ffffff',
      backgroundColor: '#00000080',
      padding: { x: 4, y: 2 },
    };

    this.timeText = this.add.text(10, 10, '', style).setScrollFactor(0).setDepth(100);
    this.hudTexts.push(this.timeText);

    const moneyText = this.add.text(10, 32, `¥ ${this.state.save.money.cash.toLocaleString()}`, style).setScrollFactor(0).setDepth(100);
    this.hudTexts.push(moneyText);

    this.add.text(10, 54, '饱食  ████████░░', {
      ...style, color: '#ff9999',
    }).setScrollFactor(0).setDepth(100);

    this.add.text(10, 74, '精力  ████████░░', {
      ...style, color: '#99ff99',
    }).setScrollFactor(0).setDepth(100);

    this.add.text(10, 94, '压力  ██░░░░░░░░', {
      ...style, color: '#ffcc99',
    }).setScrollFactor(0).setDepth(100);

    const hint = this.add.text(1280, 700, 'WASD 移动 | E 进入建筑 | ESC 菜单', {
      ...style, fontSize: '10px', color: '#aaaaaa',
    }).setOrigin(1, 1).setScrollFactor(0).setDepth(100);
    this.hudTexts.push(hint);
  }

  private updateHUD(): void {
    const t = this.state.save.time;
    this.timeText.setText(`第 ${t.day} 天  ${String(t.hour).padStart(2, '0')}:${String(t.minute).padStart(2, '0')}  |  ${t.season}`);
  }

  // ==== 时间 ====

  private onTimeTick(): void {
    const newDay = this.state.tickTime(30);
    this.state.modifyHunger(-2);
    this.state.modifyEnergy(-1);
    this.state.modifyStress(1);
    this.state.saveState();

    if (newDay) {
      console.log('[CityScene] 新的一天开始');
      this.passOutCheck();
    }
  }

  private passOutCheck(): void {
    if (this.state.save.attributes.energy <= 0) {
      console.log('[CityScene] 精力耗尽，回家睡觉');
      this.state.save.attributes.energy = 50;
      this.state.save.attributes.hunger = 50;
      this.state.saveState();
    }
  }

  // ==== 暂停菜单 ====

  private openPauseMenu(): void {
    this.scene.pause();
    this.scene.launch('PauseScene', { returnScene: 'CityScene' });
  }
}

export default CityScene;
