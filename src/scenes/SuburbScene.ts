import { ZoneScene } from './ZoneScene';

class SuburbScene extends ZoneScene {
  constructor() { super({ key: 'SuburbScene' }); }

  init(data?: { startX?: number; startY?: number }): void {
    super.init();
    this.worldWidth = 2000;
    this.worldHeight = 1800;
    this.zoneName = '🏘 申海市住宅区';
    this.zoneColor = 0x5a7a4a;
    this.roadColor = 0x7a7a6e;
    this.sidewalkColor = 0xaaaa8e;
    this.playerStartX = data?.startX ?? 400;
    this.playerStartY = data?.startY ?? 800;
  }

  create(): void {
    this.exits = [
      { targetScene: 'DowntownScene', targetX: 900, targetY: 200, x: 800, y: 0, width: 200, height: 50, label: '↓ 市中心' },
      { targetScene: 'CommercialScene', targetX: 200, targetY: 900, x: 1950, y: 700, width: 50, height: 200, label: '→ 商业街' },
    ];

    this.buildings = [
      { x: 320, y: 450, label: '🏠 公寓', color: 0x663931, scene: 'ApartmentScene' },
      { x: 750, y: 320, label: '🏘 王阿姨家', color: 0xcc8866, scene: 'SuburbScene' },
      { x: 1050, y: 900, label: '🏘 老张家', color: 0xbbaa88, scene: 'SuburbScene' },
      { x: 500, y: 1200, label: '🏘 陈叔家', color: 0x99aa77, scene: 'SuburbScene' },
      { x: 1450, y: 450, label: '🏘 小李公寓', color: 0x88aacc, scene: 'SuburbScene' },
    ];

    this.npcData = [
      { id: 'wang_ayi', x: 700, y: 400, color: 0xffaaaa, name: '王阿姨', role: '房东', greetings: ['小王，房租该交了啊！', '来来来，阿姨做了红烧肉！', '今天菜市场鸡蛋便宜。'] },
      { id: 'lao_zhang', x: 1000, y: 980, color: 0xccccaa, name: '老张', role: '退休工人', greetings: ['今天手气不错！赢了王阿姨三把。', '年轻人要多锻炼啊。', '东沙滩那边有大鱼！'] },
      { id: 'xiao_li', x: 1400, y: 520, color: 0x88ccff, name: '小李', role: '程序员', greetings: ['996真的好累...', '要不要一起创业？', '我写了个人工智能炒股模型。'] },
    ];

    this.busStops = [
      { x: 400, y: 1600, label: '🚌 住宅区站', target: 'DowntownScene', targetX: 900, targetY: 1200, cost: 10 },
      { x: 1700, y: 1200, label: '🚌 湖边站', target: 'CommercialScene', targetX: 900, targetY: 1300, cost: 10 },
    ];

    super.create();
  }

  protected drawRoads(): void {
    // 蜿蜒小路
    this.drawIrregularRoad([
      { x: 0, y: 580 }, { x: 150, y: 590 }, { x: 300, y: 560 }, { x: 500, y: 580 },
      { x: 500, y: 700 }, { x: 300, y: 720 }, { x: 150, y: 730 }, { x: 0, y: 720 },
    ]);
    this.drawIrregularRoad([
      { x: 350, y: 780 }, { x: 650, y: 780 }, { x: 1000, y: 800 }, { x: 1300, y: 780 },
      { x: 1300, y: 850 }, { x: 1000, y: 870 }, { x: 650, y: 850 }, { x: 350, y: 850 },
    ]);
    this.drawIrregularRoad([
      { x: 1100, y: 520 }, { x: 1350, y: 500 }, { x: 1650, y: 510 },
      { x: 1650, y: 580 }, { x: 1350, y: 560 }, { x: 1100, y: 580 },
    ]);
  }

  protected drawTerrain(): void {
    // 小池塘
    const gfx = this.add.graphics().setDepth(2);
    gfx.fillStyle(0x3388aa, 1);
    gfx.fillEllipse(1650, 1200, 160, 100);
    gfx.lineStyle(2, 0x5599bb);
    gfx.strokeEllipse(1650, 1200, 160, 100);
    // 水纹
    gfx.lineStyle(1, 0x5599cc, 0.3);
    for (let i = 0; i < 5; i++) {
      gfx.strokeEllipse(1630 + i * 10, 1180 + i * 5, 30 + i * 20, 15 + i * 10);
    }

    // 花园
    this.drawFlowerBed(120, 200, 150, 80);
    this.drawFlowerBed(280, 200, 120, 60);

    // 树丛
    this.drawTreeCluster(180, 480, 6);
    this.drawTreeCluster(800, 200, 5);
    this.drawTreeCluster(1300, 350, 4);
    this.drawTreeCluster(1800, 600, 6);
    this.drawTreeCluster(1800, 900, 4);
    this.drawTreeCluster(800, 1300, 5);
    this.drawTreeCluster(1400, 1300, 4);

    // 路灯
    this.drawLamp(250, 680);
    this.drawLamp(800, 780);
    this.drawLamp(1300, 700);
  }
}

export default SuburbScene;
