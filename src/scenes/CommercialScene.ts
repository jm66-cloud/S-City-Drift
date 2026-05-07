import { ZoneScene } from './ZoneScene';

class CommercialScene extends ZoneScene {
  constructor() { super({ key: 'CommercialScene' }); }

  init(data?: { startX?: number; startY?: number }): void {
    super.init();
    this.worldWidth = 1800;
    this.worldHeight = 1600;
    this.zoneName = '🛍 申海商业街';
    this.zoneColor = 0x5a5a4a;
    this.bgmKey = 'bgm-daily2';
    this.roadColor = 0x6a6a7e;
    this.sidewalkColor = 0x9a9a8e;
    this.playerStartX = data?.startX ?? 400;
    this.playerStartY = data?.startY ?? 800;
  }

  create(): void {
    this.exits = [
      { targetScene: 'SuburbScene', targetX: 1800, targetY: 800, x: 0, y: 700, width: 50, height: 200, label: '← 住宅区' },
      { targetScene: 'DowntownScene', targetX: 1600, targetY: 800, x: 0, y: 900, width: 50, height: 200, label: '← 市中心' },
    ];

    this.buildings = [
      { x: 250, y: 250, label: '🏪 便利店', color: 0x45283c, scene: 'StoreScene' },
      { x: 600, y: 250, label: '☕ 咖啡馆', color: 0x8b6914, scene: 'CafeScene' },
      { x: 950, y: 250, label: '👔 服装店', color: 0x994488, scene: 'CommercialScene' },
      { x: 1300, y: 250, label: '📱 手机店', color: 0x888888, scene: 'CommercialScene' },
      { x: 400, y: 700, label: '🍜 餐厅', color: 0xcc6644, scene: 'CommercialScene' },
      { x: 800, y: 700, label: '💇 理发店', color: 0x4488cc, scene: 'CommercialScene' },
      { x: 1200, y: 700, label: '🍺 酒吧', color: 0x664433, scene: 'CommercialScene' },
      { x: 600, y: 1150, label: '🎬 电影院', color: 0x334466, scene: 'CommercialScene' },
      { x: 1100, y: 1150, label: '🎮 游戏厅', color: 0x663366, scene: 'CommercialScene' },
    ];

    this.npcData = [
      { id: 'xiao_lin', x: 650, y: 320, color: 0xffccaa, name: '小琳', role: '咖啡师', greetings: ['欢迎光临～新豆子刚到。', '最近研究了新拉花！', '你的品味一直很好呢...'] },
      { id: 'zhou_laoban', x: 320, y: 320, color: 0x88cc88, name: '周老板', role: '店主', greetings: ['欢迎光临～', '今天的特价商品看了吗？', '需要帮忙找什么吗？'] },
      { id: 'mei_ling', x: 850, y: 770, color: 0xcc88ff, name: '美玲', role: '护士', greetings: ['工作太累了，来放松一下。', '健康很重要哦。', '你看起来气色不错！'] },
    ];

    this.busStops = [
      { x: 900, y: 1350, label: '🚌 商业街站', target: 'SuburbScene', targetX: 900, targetY: 800, cost: 10 },
      { x: 300, y: 650, label: '🚌 西口站', target: 'DowntownScene', targetX: 1200, targetY: 800, cost: 10 },
    ];

    super.create();
  }

  protected drawRoads(): void {
    // 步行街主路
    this.drawIrregularRoad([
      { x: 0, y: 520 }, { x: 100, y: 510 }, { x: 300, y: 540 }, { x: 600, y: 520 },
      { x: 1000, y: 540 }, { x: 1400, y: 520 }, { x: 1700, y: 530 }, { x: 1800, y: 520 },
      { x: 1800, y: 620 }, { x: 1700, y: 610 }, { x: 1400, y: 620 },
      { x: 1000, y: 600 }, { x: 600, y: 620 }, { x: 300, y: 610 }, { x: 100, y: 620 }, { x: 0, y: 610 },
    ]);
    // 纵向路
    this.drawIrregularRoad([
      { x: 200, y: 0 }, { x: 260, y: 0 }, { x: 270, y: 510 }, { x: 210, y: 510 },
    ]);
    this.drawIrregularRoad([
      { x: 700, y: 620 }, { x: 760, y: 620 }, { x: 770, y: this.worldHeight }, { x: 710, y: this.worldHeight },
    ]);
    this.drawIrregularRoad([
      { x: 1100, y: 620 }, { x: 1160, y: 620 }, { x: 1170, y: this.worldHeight }, { x: 1110, y: this.worldHeight },
    ]);
  }

  protected drawTerrain(): void {
    // 步行街路灯
    [200, 450, 700, 950, 1200, 1450].forEach(x => this.drawLamp(x, 510));

    // 花坛
    this.drawFlowerBed(50, 560, 100, 40);
    this.drawFlowerBed(350, 560, 100, 40);
    this.drawFlowerBed(600, 560, 100, 40);
    this.drawFlowerBed(850, 560, 100, 40);
    this.drawFlowerBed(1100, 560, 100, 40);
    this.drawFlowerBed(1350, 560, 100, 40);
    this.drawFlowerBed(1550, 560, 100, 40);

    // 喷泉广场
    const gfx = this.add.graphics().setDepth(2);
    gfx.fillStyle(0x5599cc, 1);
    gfx.fillCircle(900, 1250, 55);
    gfx.lineStyle(3, 0x77bbdd);
    gfx.strokeCircle(900, 1250, 55);
    gfx.fillStyle(0x66aadd, 0.5);
    gfx.fillCircle(900, 1250, 30);

    // 树
    this.drawTreeCluster(80, 150, 3);
    this.drawTreeCluster(450, 120, 4);
    this.drawTreeCluster(1400, 120, 3);
    this.drawTreeCluster(1600, 400, 3);
    this.drawTreeCluster(160, 950, 4);
    this.drawTreeCluster(1550, 950, 3);
  }
}

export default CommercialScene;
