import { ZoneScene } from './ZoneScene';

class BeachScene extends ZoneScene {
  constructor() {
    super({ key: 'BeachScene' });
  }

  init(data?: { startX?: number; startY?: number }): void {
    super.init();
    this.worldWidth = 2400;
    this.worldHeight = 1400;
    this.zoneName = '🏖 申海东沙滩';
    this.zoneColor = 0xd4a96a; // 沙滩色
    this.playerStartX = data?.startX ?? 1100;
    this.playerStartY = data?.startY ?? 500;
  }

  create(): void {
    this.exits = [
      { targetScene: 'DowntownScene', targetX: 900, targetY: 1500, x: 950, y: 1350, width: 200, height: 50, label: '↑ 返回市区' },
    ];

    this.buildings = [
      { x: 2000, y: 300, label: '📍 灯塔', color: 0xffec27, scene: 'BeachScene' },
      { x: 500, y: 1000, label: '🚢 港口', color: 0x556688, scene: 'BeachScene' },
      { x: 1500, y: 1000, label: '🎣 渔业码头', color: 0x668877, scene: 'BeachScene' },
    ];

    this.npcData = [
      { x: 1800, y: 600, color: 0x88aacc, name: '老渔夫', role: '退休渔民', greetings: ['今天浪不小啊。', '这片海域的鱼可肥了。', '想学钓鱼？我教你。'] },
      { x: 700, y: 700, color: 0xffcc88, name: '游客', role: '游客', greetings: ['这沙滩真漂亮！', '帮我拍张照吧？', '你也是来度假的吗？'] },
    ];

    super.create();
  }

  protected drawGround(): void {
    const gfx = this.add.graphics().setDepth(0);

    // 海面（上半部分）
    gfx.fillStyle(0x2d6a9f, 1);
    gfx.fillRect(0, 0, this.worldWidth, 350);

    // 沙滩
    gfx.fillStyle(0xd4aa6a, 1);
    gfx.fillRect(0, 300, this.worldWidth, 300);
    gfx.fillStyle(0xd4b87a, 1);
    gfx.fillRect(0, 350, this.worldWidth, 200);

    // 海岸线波浪（不规则）
    gfx.fillStyle(0x3d8ac0, 1);
    for (let x = 0; x < this.worldWidth; x += 30) {
      gfx.fillRect(x, 290 + Math.sin(x * 0.05) * 20, 30, 10);
    }

    // 草地（下半部分）
    gfx.fillStyle(0x5a8a4a, 1);
    gfx.fillRect(0, 650, this.worldWidth, this.worldHeight - 650);
  }

  protected drawRoads(): void {
    const gfx = this.add.graphics().setDepth(1);
    const boardwalk = 0x9a8a6a;
    gfx.fillStyle(boardwalk, 1);

    // 海边栈道
    gfx.fillRect(0, 380, this.worldWidth, 8);

    // 码头木板路
    gfx.fillRect(400, 700, 6, 400);
    gfx.fillRect(1400, 700, 6, 400);
  }

  protected drawTerrain(): void {
    const gfx = this.add.graphics().setDepth(2);

    // 棕榈树
    const palms = [
      300, 450, 600, 480, 1000, 470, 1600, 450, 1900, 500, 2200, 460,
      120, 500, 1800, 530,
    ];
    gfx.fillStyle(0x3a7a3a, 1);
    for (let i = 0; i < palms.length; i += 2) {
      gfx.fillCircle(palms[i], palms[i + 1], 18 + Math.random() * 6);
      gfx.fillStyle(0x5a9a3a, 1);
      gfx.fillRect(palms[i] - 4, palms[i + 1] + 15, 8, 30);
      gfx.fillStyle(0x3a7a3a, 1);
      gfx.fillCircle(palms[i] - 10, palms[i + 1] - 5, 12);
      gfx.fillCircle(palms[i] + 10, palms[i + 1] - 5, 12);
      gfx.fillStyle(0x3a7a3a, 1);
    }

    // 礁石
    const rocks = [
      { x: 180, y: 320, w: 30, h: 25 },
      { x: 2100, y: 310, w: 40, h: 20 },
      { x: 1200, y: 340, w: 25, h: 30 },
    ];
    gfx.fillStyle(0x666666, 1);
    rocks.forEach(r => gfx.fillRoundedRect(r.x, r.y, r.w, r.h, 6));

    // 贝壳
    gfx.fillStyle(0xffffff, 0.6);
    for (let i = 0; i < 30; i++) {
      gfx.fillCircle(200 + Math.random() * 2000, 380 + Math.random() * 200, 2 + Math.random() * 2);
    }
  }
}

export default BeachScene;
