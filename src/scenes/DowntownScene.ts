import { ZoneScene } from './ZoneScene';

class DowntownScene extends ZoneScene {
  constructor() { super({ key: 'DowntownScene' }); }

  init(data?: { startX?: number; startY?: number }): void {
    super.init();
    this.worldWidth = 1800;
    this.worldHeight = 1600;
    this.zoneName = '🚇 申海市中心 — CBD';
    this.zoneColor = 0x4a5a4a;
    this.bgmKey = 'bgm-trade1';
    this.roadColor = 0x5a5a6e;
    this.sidewalkColor = 0x9a9a8e;
    this.playerStartX = data?.startX ?? 900;
    this.playerStartY = data?.startY ?? 1200;
  }

  create(): void {
    this.exits = [
      { targetScene: 'SuburbScene', targetX: 900, targetY: 1400, x: 800, y: 1530, width: 200, height: 70, label: '↑ 住宅区' },
      { targetScene: 'CommercialScene', targetX: 200, targetY: 800, x: 1730, y: 650, width: 70, height: 200, label: '→ 商业街' },
      { targetScene: 'BeachScene', targetX: 1200, targetY: 200, x: 700, y: 0, width: 300, height: 50, label: '↓ 海滩' },
    ];

    this.buildings = [
      { x: 350, y: 300, label: '📈 交易所', color: 0xdf7126, scene: 'ExchangeScene' },
      { x: 900, y: 300, label: '🏦 银行', color: 0x37946e, scene: 'BankScene' },
      { x: 600, y: 650, label: '⚖️ 证监局', color: 0x666688, scene: 'DowntownScene' },
      { x: 900, y: 650, label: '🏢 CBD大厦', color: 0x5588aa, scene: 'DowntownScene' },
      { x: 350, y: 1000, label: '📰 新闻社', color: 0xaa7744, scene: 'DowntownScene' },
      { x: 1300, y: 900, label: '📚 图书馆', color: 0x8b7355, scene: 'LibraryScene' },
      { x: 200, y: 1200, label: '👮 派出所', color: 0x556688, scene: 'PoliceScene' },
    ];

    this.npcData = [
      { id: 'chen_ya', x: 400, y: 380, color: 0xddaaaa, name: '陈雅', role: '分析师', greetings: ['基本面分析显示这个板块有机会。', '季报马上要出了，建议观望。', '今天大盘情绪不错。'] },
      { id: 'zhao_jingguan', x: 860, y: 380, color: 0xaaaacc, name: '赵警官', role: '民警', greetings: ['最近治安不错。', '注意防范电信诈骗。', '有可疑情况随时来报案。'] },
      { id: 'a_qiang', x: 680, y: 350, color: 0xaaaaff, name: '阿强', role: '炒股伙伴', greetings: ['嘿兄弟！我刚看到一条内幕消息...', '今天这行情，得小心。', '那个600009有动静。'] },
    ];

    this.busStops = [
      { x: 1600, y: 1100, label: '🚌 CBD站', target: 'SuburbScene', targetX: 900, targetY: 700, cost: 10 },
      { x: 1100, y: 420, label: '🚌 市政府站', target: 'BeachScene', targetX: 1100, targetY: 500, cost: 10 },
      { x: 300, y: 420, label: '🚌 金融街站', target: 'CommercialScene', targetX: 900, targetY: 700, cost: 10 },
    ];

    super.create();
  }

  protected drawRoads(): void {
    // 不规则主干道
    this.drawIrregularRoad([
      { x: 480, y: 0 }, { x: 580, y: 0 }, { x: 620, y: 400 }, { x: 540, y: 600 },
      { x: 460, y: 600 }, { x: 420, y: 400 }, { x: 480, y: 0 },
    ]);
    this.drawIrregularRoad([
      { x: 1180, y: 0 }, { x: 1280, y: 0 }, { x: 1320, y: 500 }, { x: 1240, y: 700 },
      { x: 1160, y: 700 }, { x: 1080, y: 500 }, { x: 1180, y: 0 },
    ]);
    this.drawIrregularRoad([
      { x: 0, y: 420 }, { x: 0, y: 500 }, { x: 400, y: 530 }, { x: 600, y: 480 },
      { x: 800, y: 480 }, { x: 1200, y: 530 }, { x: 1800, y: 500 }, { x: 1800, y: 420 },
    ]);
    this.drawIrregularRoad([
      { x: 0, y: 1080 }, { x: 0, y: 1160 }, { x: 500, y: 1140 }, { x: 700, y: 1120 },
      { x: 1200, y: 1140 }, { x: 1800, y: 1160 }, { x: 1800, y: 1080 },
    ]);
  }

  protected drawTerrain(): void {
    // 喷泉
    const gfx = this.add.graphics().setDepth(2);
    gfx.fillStyle(0x4488cc, 1);
    gfx.fillCircle(900, 900, 50);
    gfx.lineStyle(3, 0x66aacc);
    gfx.strokeCircle(900, 900, 50);
    gfx.fillStyle(0x5599dd, 0.6);
    gfx.fillCircle(900, 900, 25);

    // 花坛
    this.drawFlowerBed(80, 500, 120, 40);
    this.drawFlowerBed(80, 1060, 120, 40);
    this.drawFlowerBed(1500, 500, 120, 40);
    this.drawFlowerBed(1500, 1060, 120, 40);

    // 路灯
    this.drawLamp(320, 400);
    this.drawLamp(700, 400);
    this.drawLamp(1050, 400);
    this.drawLamp(1400, 400);

    // 树丛
    this.drawTreeCluster(200, 220);
    this.drawTreeCluster(1400, 220);
    this.drawTreeCluster(160, 700);
    this.drawTreeCluster(1550, 850);
    this.drawTreeCluster(1500, 1250);
    this.drawTreeCluster(220, 1350);
  }
}

export default DowntownScene;
