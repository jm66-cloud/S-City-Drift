import { ZoneScene } from './ZoneScene';

class CommercialScene extends ZoneScene {
  constructor() {
    super({ key: 'CommercialScene' });
  }

  init(data?: { startX?: number; startY?: number }): void {
    super.init();
    this.worldWidth = 1800;
    this.worldHeight = 1600;
    this.zoneName = '🛍 申海商业街';
    this.zoneColor = 0x5a5a4a;
    this.playerStartX = data?.startX ?? 400;
    this.playerStartY = data?.startY ?? 800;
  }

  create(): void {
    this.exits = [
      { targetScene: 'SuburbScene', targetX: 1800, targetY: 800, x: 0, y: 700, width: 50, height: 200, label: '← 住宅区' },
      { targetScene: 'DowntownScene', targetX: 1600, targetY: 800, x: 0, y: 900, width: 50, height: 200, label: '← 市中心' },
    ];

    this.buildings = [
      { x: 300, y: 300, label: '🏪 便利店', color: 0x45283c, scene: 'StoreScene' },
      { x: 700, y: 300, label: '☕ 咖啡馆', color: 0x8b6914, scene: 'CafeScene' },
      { x: 1100, y: 300, label: '👔 服装店', color: 0x994488, scene: 'CommercialScene' },
      { x: 400, y: 700, label: '🍜 餐厅', color: 0xcc6644, scene: 'CommercialScene' },
      { x: 800, y: 700, label: '💇 理发店', color: 0x4488cc, scene: 'CommercialScene' },
      { x: 1200, y: 700, label: '📱 手机店', color: 0x888888, scene: 'CommercialScene' },
      { x: 600, y: 1100, label: '🍺 酒吧', color: 0x664433, scene: 'CommercialScene' },
      { x: 1100, y: 1100, label: '🎬 电影院', color: 0x334466, scene: 'CommercialScene' },
    ];

    this.npcData = [
      { x: 750, y: 370, color: 0xffccaa, name: '小琳', role: '咖啡馆老板娘', greetings: ['欢迎光临～今天的新豆子刚到。', '最近研究了一个新的拉花图案！', '你的品味一直很好呢...'] },
      { x: 380, y: 370, color: 0x88cc88, name: '小美', role: '便利店店员', greetings: ['欢迎光临～', '今天的特价商品看过了吗？', '需要帮忙找什么吗？'] },
    ];

    super.create();
  }

  protected drawRoads(): void {
    const gfx = this.add.graphics().setDepth(1);
    const road = 0x6a6a7e;

    // 步行街主路
    gfx.fillStyle(0x9a9a8e, 1);
    gfx.fillRect(0, 550, this.worldWidth, 100);

    // 侧路
    gfx.fillStyle(road, 1);
    gfx.fillRect(200, 0, 50, this.worldHeight);
    gfx.fillRect(650, 0, 50, 550);
    gfx.fillRect(1050, 650, 50, 550);
    gfx.fillRect(650, 950, 50, this.worldHeight - 950);
    gfx.fillRect(1500, 0, 50, this.worldHeight);
  }

  protected drawTerrain(): void {
    const gfx = this.add.graphics().setDepth(2);

    // 路灯
    const lamps = [200, 500, 800, 1100, 1500];
    gfx.fillStyle(0xccccaa, 1);
    lamps.forEach(x => {
      gfx.fillRect(x - 2, 540, 4, 20);
      gfx.fillStyle(0xffffaa, 1);
      gfx.fillCircle(x, 535, 6);
      gfx.fillStyle(0xccccaa, 1);
    });

    // 花坛
    gfx.fillStyle(0x3a6e3a, 1);
    gfx.fillRect(50, 600, 100, 40);
    gfx.fillRect(400, 600, 100, 40);
    gfx.fillRect(750, 600, 100, 40);
    gfx.fillRect(1100, 600, 100, 40);
    gfx.fillRect(1450, 600, 100, 40);

    // 喷泉广场
    gfx.fillStyle(0x4488cc, 1);
    gfx.fillCircle(900, 1250, 60);
    gfx.lineStyle(3, 0x66aacc);
    gfx.strokeCircle(900, 1250, 60);

    // 树
    gfx.fillStyle(0x2a5e2a, 1);
    [100, 350, 600, 850, 1350, 1650].forEach(x => {
      gfx.fillCircle(x, 500, 14);
      gfx.fillRect(x - 2, 510, 4, 15);
    });
  }
}

export default CommercialScene;
