import * as Phaser from 'phaser';

export interface ZoneExit {
  targetScene: string;
  targetX: number;
  targetY: number;
  x: number;
  y: number;
  width: number;
  height: number;
  label: string;
}

export interface BuildingData {
  x: number;
  y: number;
  label: string;
  color: number;
  scene: string;
}

export class ZoneScene extends Phaser.Scene {
  protected player!: Phaser.Physics.Arcade.Sprite;
  protected cursors!: Phaser.Types.Input.Keyboard.CursorKeys;
  protected wasd!: Record<string, Phaser.Input.Keyboard.Key>;
  protected interactKey!: Phaser.Input.Keyboard.Key;
  protected escKey!: Phaser.Input.Keyboard.Key;
  protected exits: ZoneExit[] = [];
  protected buildings: BuildingData[] = [];
  protected playerStartX = 400;
  protected playerStartY = 400;
  protected worldWidth = 2000;
  protected worldHeight = 1600;
  protected zoneName = 'Zone';
  protected zoneColor = 0x37946e;
  protected npcData: Array<{ x: number; y: number; color: number; name: string; role: string; greetings: string[] }> = [];
  private inTransition = false;
  private dialogTexts: Phaser.GameObjects.Text[] = [];

  init(): void {
    this.inTransition = false;
  }

  create(): void {
    this.exits = [];
    this.buildings = [];
    this.dialogTexts = [];
    this.physics.world.setBounds(0, 0, this.worldWidth, this.worldHeight);
    this.cameras.main.setBounds(0, 0, this.worldWidth, this.worldHeight);

    this.drawGround();
    this.drawRoads();
    this.drawTerrain();
    this.placeBuildings();
    this.placeExits();
    this.placeNPCs();
    this.createPlayer();
    this.createInput();
    this.createHUD();

    console.log(`[${this.constructor.name}] ${this.zoneName} 已加载`);
  }

  update(_time: number, _delta: number): void {
    if (this.inTransition) return;
    this.handleMovement();
  }

  protected drawGround(): void {
    // 主色调背景
    this.add.rectangle(this.worldWidth / 2, this.worldHeight / 2, this.worldWidth, this.worldHeight, this.zoneColor).setDepth(0);

    // 用 tileset 平铺地面纹理
    const tileKey = this.textures.exists('ground-tile-clean') ? 'ground-tile-clean'
      : this.textures.exists('ground-tile-roam') ? 'ground-tile-roam' : null;
    if (tileKey) {
      this.add.tileSprite(this.worldWidth / 2, this.worldHeight / 2, this.worldWidth, this.worldHeight, tileKey).setDepth(0).setAlpha(0.2);
    }

    // 添加地面噪声纹理
    const gfx = this.add.graphics().setDepth(0);
    const noiseCount = Math.floor(this.worldWidth * this.worldHeight / 1200);
    for (let i = 0; i < noiseCount; i++) {
      const x = Math.random() * this.worldWidth;
      const y = Math.random() * this.worldHeight;
      const shade = (Math.random() - 0.5) * 0.2;
      const r = ((this.zoneColor >> 16) & 0xff) + shade * 255;
      const g = ((this.zoneColor >> 8) & 0xff) + shade * 255;
      const b = (this.zoneColor & 0xff) + shade * 255;
      const color = (Math.max(0, Math.min(255, Math.floor(r))) << 16)
        | (Math.max(0, Math.min(255, Math.floor(g))) << 8)
        | Math.max(0, Math.min(255, Math.floor(b)));
      gfx.fillStyle(color, 0.4);
      gfx.fillCircle(x, y, 1 + Math.random() * 3);
    }
  }

  protected drawRoads(): void {}

  protected drawTerrain(): void {}

  protected placeBuildings(): void {
    this.buildings.forEach(b => {
      const gfx = this.add.graphics().setDepth(3);
      gfx.fillStyle(b.color, 1);
      gfx.fillRoundedRect(b.x - 45, b.y - 35, 90, 70, 6);
      gfx.lineStyle(2, 0xffffff);
      gfx.strokeRoundedRect(b.x - 45, b.y - 35, 90, 70, 6);

      this.add.text(b.x, b.y + 42, b.label, {
        fontFamily: 'sans-serif',
        fontSize: '12px',
        color: '#ffffff',
        backgroundColor: '#00000099',
        padding: { x: 4, y: 2 },
      }).setOrigin(0.5, 0).setDepth(4);
    });
  }

  protected placeExits(): void {
    this.exits.forEach(exit => {
      const marker = this.add.rectangle(exit.x + exit.width / 2, exit.y + exit.height / 2,
        exit.width, exit.height, 0x8888cc, 0.3).setDepth(2);
      this.add.text(exit.x + exit.width / 2, exit.y + exit.height / 2, exit.label, {
        fontFamily: 'sans-serif', fontSize: '12px', color: '#ffffff',
        backgroundColor: '#00000099', padding: { x: 6, y: 3 },
      }).setOrigin(0.5).setDepth(3);
    });
  }

  protected placeNPCs(): void {
    this.npcData.forEach(npc => {
      this.add.rectangle(npc.x, npc.y, 18, 26, npc.color).setDepth(9).setStrokeStyle(1, 0xffffff);
      this.add.text(npc.x, npc.y + 16, npc.name, {
        fontFamily: 'sans-serif', fontSize: '10px', color: '#ffffff',
        backgroundColor: '#000000aa', padding: { x: 2, y: 1 },
      }).setOrigin(0.5, 0).setDepth(10);
    });
  }

  private createPlayer(): void {
    const gfx = this.add.graphics();
    gfx.fillStyle(0xffec27, 1);
    gfx.fillRect(0, 0, 24, 32);
    gfx.generateTexture('player-zone', 24, 32);
    gfx.destroy();

    this.player = this.physics.add.sprite(this.playerStartX, this.playerStartY, 'player-zone');
    this.player.setDepth(10);
    if (this.player.body) {
      this.player.body.setCollideWorldBounds(true);
    }
    this.cameras.main.startFollow(this.player, true, 0.12, 0.12);
  }

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

  private createHUD(): void {
    const style: Phaser.Types.GameObjects.Text.TextStyle = {
      fontFamily: 'sans-serif', fontSize: '13px', color: '#ffffff', backgroundColor: '#000000aa', padding: { x: 4, y: 2 },
    };

    this.add.text(10, 10, `${this.zoneName}`, { ...style, fontSize: '16px', color: '#ffcc00' }).setScrollFactor(0).setDepth(100);
    this.add.text(10, 34, 'WASD 移动 | E 交互 | ESC 菜单', { ...style, fontSize: '10px', color: '#888888' }).setScrollFactor(0).setDepth(100);
  }

  private handleMovement(): void {
    const speed = 150;
    const body = (this.player as Phaser.Physics.Arcade.Sprite).body as Phaser.Physics.Arcade.Body;
    body.setVelocity(0);

    if (this.cursors.left.isDown || this.wasd.left.isDown) body.setVelocityX(-speed);
    else if (this.cursors.right.isDown || this.wasd.right.isDown) body.setVelocityX(speed);
    if (this.cursors.up.isDown || this.wasd.up.isDown) body.setVelocityY(-speed);
    else if (this.cursors.down.isDown || this.wasd.down.isDown) body.setVelocityY(speed);

    if (Phaser.Input.Keyboard.JustDown(this.interactKey)) {
      if (!this.tryExitZone() && !this.tryEnterBuilding() && !this.tryTalkToNPC()) {
        // 什么都没交互
      }
    }

    if (Phaser.Input.Keyboard.JustDown(this.escKey)) {
      this.scene.pause();
      this.scene.launch('PauseScene', { returnScene: this.scene.key });
    }
  }

  private tryExitZone(): boolean {
    const px = this.player.x;
    const py = this.player.y;
    for (const exit of this.exits) {
      if (px > exit.x && px < exit.x + exit.width && py > exit.y && py < exit.y + exit.height) {
        this.inTransition = true;
        this.cameras.main.fadeOut(500, 0, 0, 0);
        this.cameras.main.once('camerafadeoutcomplete', () => {
          this.scene.start(exit.targetScene, { startX: exit.targetX, startY: exit.targetY });
        });
        return true;
      }
    }
    return false;
  }

  private tryEnterBuilding(): boolean {
    const px = this.player.x;
    const py = this.player.y;
    for (const b of this.buildings) {
      if (Math.abs(px - b.x) < 55 && Math.abs(py - b.y) < 45 && b.scene !== this.scene.key) {
        this.inTransition = true;
        this.cameras.main.fadeOut(400, 0, 0, 0);
        this.cameras.main.once('camerafadeoutcomplete', () => {
          this.scene.start(b.scene);
        });
        return true;
      }
    }
    return false;
  }

  private tryTalkToNPC(): boolean {
    const px = this.player.x;
    const py = this.player.y;
    for (const npc of this.npcData) {
      if (Math.abs(px - npc.x) < 50 && Math.abs(py - npc.y) < 40) {
        const greeting = npc.greetings[Math.floor(Math.random() * npc.greetings.length)];
        const dialog = this.add.text(640, 660,
          `[${npc.name}] ${npc.role}\n"${greeting}"`, {
          fontFamily: 'sans-serif', fontSize: '14px', color: '#ffffff',
          backgroundColor: '#000000ee', padding: { x: 16, y: 10 },
          align: 'center', wordWrap: { width: 600 },
        }).setOrigin(0.5, 0.5).setDepth(50).setScrollFactor(0);
        this.time.delayedCall(3000, () => dialog.destroy());
        return true;
      }
    }
    return false;
  }
}
