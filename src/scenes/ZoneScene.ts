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

export interface NPCLocalData {
  x: number;
  y: number;
  color: number;
  name: string;
  role: string;
  greetings: string[];
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
  protected npcData: NPCLocalData[] = [];
  protected roadColor = 0x5a5a6e;
  protected sidewalkColor = 0x9a9a8e;
  protected bgmKey = 'bgm-daily1';
  private inTransition = false;
  private currentBGM: Phaser.Sound.BaseSound | null = null;
  private walkers: Phaser.GameObjects.Graphics[] = [];
  private walkerTargets: Array<{ x: number; y: number }> = [];

  init(): void {
    this.inTransition = false;
  }

  create(): void {
    this.exits = [];
    this.buildings = [];
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
    this.createWalkers();
    this.playBGM();

    console.log(`[${this.constructor.name}] ${this.zoneName} 已加载`);
  }

  update(_time: number, _delta: number): void {
    if (this.inTransition) return;
    this.handleMovement();
    this.updateWalkers();
  }

  // ============ 地面 ============
  protected drawGround(): void {
    const gfx = this.add.graphics().setDepth(0);
    // 渐变色块 — 用多个不同明暗的矩形模拟自然地表
    const rows = 8;
    const cols = 8;
    const cw = this.worldWidth / cols;
    const ch = this.worldHeight / rows;
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const shade = 10 + Math.floor(Math.random() * 15);
        const rgb = this.shadeColor(this.zoneColor, shade);
        gfx.fillStyle(rgb, 1);
        gfx.fillRect(c * cw, r * ch, cw + 1, ch + 1);
      }
    }

    // tileset 平铺
    const tileKey = this.textures.exists('ground-tile-clean')
      ? 'ground-tile-clean' : this.textures.exists('ground-tile-roam')
      ? 'ground-tile-roam' : null;
    if (tileKey) {
      const ts = this.add.tileSprite(this.worldWidth / 2, this.worldHeight / 2,
        this.worldWidth, this.worldHeight, tileKey).setDepth(0).setAlpha(0.18);
      ts.setScale(4);
    }

    // 随机斑点
    for (let i = 0; i < this.worldWidth / 8; i++) {
      gfx.fillStyle(this.shadeColor(this.zoneColor, -3 + Math.floor(Math.random() * 6)), 0.5);
      gfx.fillCircle(Math.random() * this.worldWidth, Math.random() * this.worldHeight, 2 + Math.random() * 4);
    }
  }

  // ============ 道路 ============
  protected drawRoads(): void {}
  protected drawTerrain(): void {}

  // ============ 建筑 ============
  protected placeBuildings(): void {
    this.buildings.forEach(b => {
      const gfx = this.add.graphics().setDepth(3);
      // 建筑主体
      gfx.fillStyle(b.color, 1);
      gfx.fillRoundedRect(b.x - 45, b.y - 35, 90, 70, 5);
      // 边框
      gfx.lineStyle(2, this.shadeColor(b.color, 30));
      gfx.strokeRoundedRect(b.x - 45, b.y - 35, 90, 70, 5);
      // 窗户
      gfx.fillStyle(0x334466, 0.8);
      gfx.fillRect(b.x - 20, b.y - 15, 12, 16);
      gfx.fillRect(b.x + 8, b.y - 15, 12, 16);
      // 门
      gfx.fillStyle(0x332211, 1);
      gfx.fillRect(b.x - 6, b.y + 5, 12, 24);
      // 屋顶
      gfx.fillStyle(this.shadeColor(b.color, -15), 1);
      gfx.fillTriangle(
        b.x - 50, b.y - 35,
        b.x + 50, b.y - 35,
        b.x, b.y - 55,
      );

      this.add.text(b.x, b.y + 42, b.label, {
        fontFamily: 'sans-serif', fontSize: '11px', color: '#ffffff',
        backgroundColor: '#000000aa', padding: { x: 4, y: 2 },
      }).setOrigin(0.5, 0).setDepth(4);
    });
  }

  // ============ 出口标记 ============
  protected placeExits(): void {
    this.exits.forEach(exit => {
      const gfx = this.add.graphics().setDepth(2);
      gfx.fillStyle(0x8888cc, 0.25);
      gfx.fillRoundedRect(exit.x, exit.y, exit.width, exit.height, 8);
      gfx.lineStyle(2, 0xaaccff, 0.4);
      gfx.strokeRoundedRect(exit.x, exit.y, exit.width, exit.height, 8);

      this.add.text(exit.x + exit.width / 2, exit.y + exit.height / 2, exit.label, {
        fontFamily: 'sans-serif', fontSize: '11px', color: '#ffffff',
        backgroundColor: '#00000099', padding: { x: 6, y: 3 },
      }).setOrigin(0.5).setDepth(3);
    });
  }

  // ============ NPC ============
  protected placeNPCs(): void {
    this.npcData.forEach(npc => {
      // NPC 人物
      const gfx = this.add.graphics().setDepth(9);
      gfx.fillStyle(npc.color, 1);
      gfx.fillCircle(npc.x, npc.y - 10, 10);
      gfx.fillStyle(this.shadeColor(npc.color, -20), 1);
      gfx.fillRoundedRect(npc.x - 8, npc.y - 2, 16, 22, 4);
      gfx.lineStyle(1, 0xffffff, 0.6);
      gfx.strokeRoundedRect(npc.x - 8, npc.y - 2, 16, 22, 4);

      this.add.text(npc.x, npc.y + 14, npc.name, {
        fontFamily: 'sans-serif', fontSize: '9px', color: '#ffffff',
        backgroundColor: '#000000aa', padding: { x: 2, y: 1 },
      }).setOrigin(0.5, 0).setDepth(10);
    });
  }

  // ============ 玩家 ============
  private createPlayer(): void {
    const gfx = this.add.graphics();
    gfx.fillStyle(0xffec27, 1);
    gfx.fillCircle(12, 8, 8);
    gfx.fillStyle(0xddcc00, 1);
    gfx.fillRoundedRect(4, 14, 16, 20, 3);
    gfx.lineStyle(1, 0x000000, 0.3);
    gfx.strokeRoundedRect(4, 14, 16, 20, 3);
    gfx.generateTexture('player-zone', 24, 34);
    gfx.destroy();

    this.player = this.physics.add.sprite(this.playerStartX, this.playerStartY, 'player-zone');
    this.player.setDepth(10);
    if (this.player.body) {
      this.player.body.setCollideWorldBounds(true);
    }
    this.cameras.main.startFollow(this.player, true, 0.12, 0.12);
  }

  // ============ 输入 ============
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

  // ============ HUD ============
  private createHUD(): void {
    const s: Phaser.Types.GameObjects.Text.TextStyle = {
      fontFamily: 'sans-serif', fontSize: '14px', color: '#ffffff', backgroundColor: '#000000aa', padding: { x: 4, y: 2 },
    };
    this.add.text(10, 10, this.zoneName, { ...s, fontSize: '16px', color: '#ffcc00' }).setScrollFactor(0).setDepth(100);
    this.add.text(10, 34, 'WASD 移动 | E 交互 | ESC 菜单', { ...s, fontSize: '10px', color: '#888888' }).setScrollFactor(0).setDepth(100);
  }

  // ============ 移动 + 交互 ============
  private handleMovement(): void {
    const speed = 150;
    const body = (this.player as Phaser.Physics.Arcade.Sprite).body as Phaser.Physics.Arcade.Body;
    body.setVelocity(0);

    if (this.cursors.left.isDown || this.wasd.left.isDown) body.setVelocityX(-speed);
    else if (this.cursors.right.isDown || this.wasd.right.isDown) body.setVelocityX(speed);
    if (this.cursors.up.isDown || this.wasd.up.isDown) body.setVelocityY(-speed);
    else if (this.cursors.down.isDown || this.wasd.down.isDown) body.setVelocityY(speed);

    if (Phaser.Input.Keyboard.JustDown(this.interactKey)) {
      if (!this.tryExitZone()) {
        if (!this.tryEnterBuilding()) {
          this.tryTalkToNPC();
        }
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

  private tryTalkToNPC(): void {
    const px = this.player.x;
    const py = this.player.y;
    for (const npc of this.npcData) {
      if (Math.abs(px - npc.x) < 50 && Math.abs(py - npc.y) < 40) {
        const greeting = npc.greetings[Math.floor(Math.random() * npc.greetings.length)];
        const dlg = this.add.text(640, 660, `[${npc.name}] ${npc.role}\n"${greeting}"`, {
          fontFamily: 'sans-serif', fontSize: '14px', color: '#ffffff',
          backgroundColor: '#000000ee', padding: { x: 16, y: 10 },
          align: 'center', wordWrap: { width: 600 },
        }).setOrigin(0.5, 0.5).setDepth(50).setScrollFactor(0);
        this.time.delayedCall(3000, () => dlg.destroy());
        return;
      }
    }
  }

  // ============ 辅助方法 ============
  private playBGM(): void {
    try {
      if (this.cache.audio.exists(this.bgmKey)) {
        if (this.currentBGM && this.currentBGM.isPlaying) {
          this.currentBGM.stop();
        }
        this.currentBGM = this.sound.play(this.bgmKey, { loop: true, volume: 0.25 });
      }
    } catch {
      // 静默
    }
  }

  protected shadeColor(color: number, amount: number): number {
    const r = Math.max(0, Math.min(255, ((color >> 16) & 0xff) + amount));
    const g = Math.max(0, Math.min(255, ((color >> 8) & 0xff) + amount));
    const b = Math.max(0, Math.min(255, (color & 0xff) + amount));
    return (r << 16) | (g << 8) | b;
  }

  /** 绘制树丛 */
  protected drawTreeCluster(x: number, y: number, count = 4): void {
    const gfx = this.add.graphics().setDepth(2);
    for (let i = 0; i < count; i++) {
      const tx = x + (Math.random() - 0.5) * 80;
      const ty = y + (Math.random() - 0.5) * 60;
      gfx.fillStyle(0x4a3a1a, 1);
      gfx.fillRect(tx - 2, ty + 8, 4, 16);
      gfx.fillStyle(this.shadeColor(0x3a7a3a, Math.floor(Math.random() * 20) - 10), 1);
      gfx.fillCircle(tx, ty, 14 + Math.random() * 6);
      gfx.fillCircle(tx - 8, ty + 4, 10 + Math.random() * 4);
      gfx.fillCircle(tx + 8, ty + 4, 10 + Math.random() * 4);
    }
  }

  /** 绘制路灯 */
  protected drawLamp(x: number, y: number): void {
    const gfx = this.add.graphics().setDepth(2);
    gfx.fillStyle(0x444444, 1);
    gfx.fillRect(x - 2, y, 4, 28);
    gfx.fillStyle(0xffffbb, 0.6);
    gfx.fillCircle(x, y - 2, 7);
    gfx.lineStyle(1, 0xcccccc, 0.5);
    gfx.strokeCircle(x, y - 2, 7);
  }

  /** 绘制花坛 */
  protected drawFlowerBed(x: number, y: number, w: number, h: number): void {
    const gfx = this.add.graphics().setDepth(2);
    gfx.fillStyle(0x5a4a2a, 1);
    gfx.fillRoundedRect(x, y, w, h, 4);
    gfx.lineStyle(1, 0x7a6a4a);
    gfx.strokeRoundedRect(x, y, w, h, 4);
    for (let i = 0; i < 10; i++) {
      const fx = x + 4 + Math.random() * (w - 8);
      const fy = y + 4 + Math.random() * (h - 8);
      const fc = [0xff6666, 0xffcc66, 0x6666ff, 0xff66ff, 0x66ffff][Math.floor(Math.random() * 5)];
      gfx.fillStyle(fc, 1);
      gfx.fillCircle(fx, fy, 3);
    }
  }

  /** 绘制不规则道路（指定顶点多边形）*/
  protected drawIrregularRoad(points: Array<{ x: number; y: number }>): void {
    const gfx = this.add.graphics().setDepth(1);
    gfx.fillStyle(this.roadColor, 0.9);
    gfx.beginPath();
    gfx.moveTo(points[0].x, points[0].y);
    for (let i = 1; i < points.length; i++) {
      gfx.lineTo(points[i].x, points[i].y);
    }
    gfx.closePath();
    gfx.fillPath();

    // 人行道边线
    gfx.lineStyle(2, this.sidewalkColor, 0.6);
    gfx.beginPath();
    gfx.moveTo(points[0].x, points[0].y);
    for (let i = 1; i < points.length; i++) {
      gfx.lineTo(points[i].x, points[i].y);
    }
    gfx.closePath();
    gfx.strokePath();
  }

  // ============ 背景路人 ============
  private createWalkers(): void {
    const count = Math.floor(this.worldWidth * this.worldHeight / 50000);
    for (let i = 0; i < count; i++) {
      const gfx = this.add.graphics().setDepth(8);
      const x = 100 + Math.random() * (this.worldWidth - 200);
      const y = 100 + Math.random() * (this.worldHeight - 200);
      gfx.fillStyle(0x888888, 0.6);
      gfx.fillCircle(x, y - 6, 6);
      gfx.fillRoundedRect(x - 5, y, 10, 14, 2);
      this.walkers.push(gfx);
      this.walkerTargets.push({ x, y });
    }
  }

  private updateWalkers(): void {
    const speed = 0.3;
    for (let i = 0; i < this.walkers.length; i++) {
      const wt = this.walkerTargets[i];
      const wx = this.walkers[i].x;
      const wy = this.walkers[i].y;

      if (Math.abs(wx - wt.x) < 5 && Math.abs(wy - wt.y) < 5) {
        this.walkerTargets[i] = {
          x: 100 + Math.random() * (this.worldWidth - 200),
          y: 100 + Math.random() * (this.worldHeight - 200),
        };
      }

      const dx = wt.x - wx;
      const dy = wt.y - wy;
      const dist = Math.sqrt(dx * dx + dy * dy) || 1;
      this.walkers[i].setPosition(wx + (dx / dist) * speed, wy + (dy / dist) * speed);
    }
  }
}
